import crypto from 'node:crypto'
import nodemailer from 'nodemailer'

export async function generatePasswordHash(password: string) {
  const saltRounds = 10

  return new Promise<string>(resolve => {
    crypto.randomBytes(saltRounds, (_, salt) => {
      crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (_, derivedKey) => {
        resolve(derivedKey.toString('hex'))
      })
    })
  })
}

export async function validatePassword(
  password: string,
  hashedPassword: string,
) {
  const [salt, derivedKey] = hashedPassword.split(':')

  return new Promise<boolean>(resolve => {
    crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (_, key) => {
      resolve(key.toString('hex') === derivedKey)
    })
  })
}

export const transport = nodemailer.createTransport({
  auth: {
    pass: process.env.SMTP_API_KEY,
    user: process.env.SMTP_USER,
  },
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
})

export const makeNiceEmail = (text: string) => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Привет!</h2>
    <p>${text}</p>
    <p>😘, команда Shortstories</p>
  </div>
`
