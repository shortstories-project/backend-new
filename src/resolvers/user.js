import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import nanoid from 'nanoid'
import { Op } from 'sequelize'
import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated } from './authorization'
import { uploadPhoto, removePhoto } from '../utils/photo'
import { transport, makeANiceEmail } from '../utils/mail'

export default {
  Query: {
    me: (parent, args, ctx) => {
      if (ctx.request.user) return ctx.request.user
      return {
        id: -1,
        username: '',
        photo: '',
        info: '',
        email: '',
        isVerified: false,
      }
    },

    user: async (parent, args, ctx) => await ctx.models.User.findByPk(args.id),
  },

  Mutation: {
    async signUp(parent, args, ctx) {
      args.email = args.email.toLowerCase()
      const verifyToken = nanoid(20)
      const user = await ctx.models.User.create({
        ...args,
        verifyToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour from now
      })
      const token = jwt.sign({ userId: user.id }, process.env.SECRET)
      ctx.response.cookie('token', token, {
        httpOnly: true,
        maxAge: 100 * 60 * 60 * 24 * 365, // 1 year cookie
      })
      await transport.sendMail({
        from: `Shortstories <${process.env.MAIL_USER}>`,
        to: user.email,
        subject: 'Подтвердите аккаунт',
        html: makeANiceEmail(`Добро пожаловать на Shortstories! Подтвердите электронную почту, кликнув по ссылке ниже:
        \n\n
        <br />
        <a href="${
          process.env.FRONTEND_URL
        }/verify?verifyToken=${verifyToken}">Кликни для подтверждения</a>`),
      })
      return user
    },

    async signIn(parent, { login, password }, ctx) {
      const user = await ctx.models.User.findByLogin(login)
      if (!user) {
        throw new Error(`Такого юзера не существует ${login}`)
      }
      const isValid = await user.validatePassword(password)
      if (!isValid) {
        throw new Error('Неправильный пароль')
      }
      const token = jwt.sign({ userId: user.id }, process.env.SECRET)
      ctx.response.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      })
      return user
    },

    signOut(parent, args, ctx) {
      ctx.response.clearCookie('token')
      return {
        message: 'Пока!',
      }
    },

    async verifyUser(parent, args, ctx) {
      const user = await ctx.models.User.findOne({
        where: {
          verifyToken: args.token,
          verifyTokenExpiry: {
            [Op.gte]: Date.now() - 3600000,
          },
        },
      })
      if (!user) {
        throw new Error('Токен не действителен!')
      }
      const verifiedUser = await user.update({
        isVerified: true,
        verifyToken: null,
        verifyTokenExpiry: null,
      })
      return verifiedUser
    },

    async requestReset(parent, args, ctx) {
      const user = await ctx.models.User.findByLogin(args.login)
      if (!user) {
        throw new Error(`Не существует пользователя с логином: ${args.login}`)
      }
      const resetToken = nanoid(20)
      const resetTokenExpiry = Date.now() + 3600000
      await user.update({
        resetToken,
        resetTokenExpiry,
      })
      await transport.sendMail({
        from: `Shortstories <${process.env.MAIL_USER}>`,
        to: user.email,
        subject: 'Сброс пароля',
        html: makeANiceEmail(`Нажмите на ссылку ниже для сброса пароля
        \n\n
        <br />
        <a href="${
          process.env.FRONTEND_URL
        }/reset?resetToken=${resetToken}">Кликни сюда</a>`),
      })
      return {
        email: user.get('email'),
      }
    },

    async resetPassword(parent, args, ctx) {
      if (args.password !== args.passwordConfirmation) {
        throw new Error('Пароли не совпадают')
      }
      const user = await ctx.models.User.findOne({
        where: {
          resetToken: args.token,
          resetTokenExpiry: {
            [Op.gte]: Date.now() - 3600000,
          },
        },
      })
      if (!user) {
        throw new Error('Токен не действителен!')
      }
      const updatedUser = await user.update({
        password: await bcrypt.hash(args.password, 10),
        resetToken: null,
        resetTokenExpiry: null,
      })
      const token = jwt.sign({ userId: updatedUser.id }, process.env.SECRET)
      ctx.response.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      })
      return updatedUser
    },

    updateUser: combineResolvers(
      isAuthenticated,
      async (parent, args, ctx) => await ctx.request.user.update(args)
    ),

    postPhoto: combineResolvers(isAuthenticated, async (parent, args, ctx) => {
      const me = ctx.request.user
      if (me.photo) {
        removePhoto(me.photo)
      }
      const { createReadStream, filename } = await args.file
      const url = await uploadPhoto(createReadStream, filename, {
        width: args.width,
        height: args.height,
        x: args.x,
        y: args.y,
      })
      return await me.update({ photo: url })
    }),

    checkUserExist: async (parent, args, ctx) => {
      const user = await ctx.models.User.findByLogin(args.login)
      return !!user
    },
  },
}
