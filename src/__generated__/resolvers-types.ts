import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  body?: Maybe<Scalars['String']['output']>;
  commentId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  user: User;
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Me = {
  __typename?: 'Me';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  info?: Maybe<Scalars['String']['output']>;
  isVerified: Scalars['Boolean']['output'];
  photo?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  checkUserExists: Scalars['Boolean']['output'];
  createComment: Comment;
  createStory: Story;
  deleteComment: Comment;
  deleteStory: Story;
  dislikeStory: Reaction;
  likeStory: Reaction;
  postPhoto: Me;
  requestReset?: Maybe<RequestReset>;
  resetPassword: Me;
  signIn: Me;
  signOut?: Maybe<SuccessMessage>;
  signUp: Me;
  updateComment: Comment;
  updateStory: Story;
  updateUser: Me;
  verifyUser: Me;
  viewStory: View;
};


export type MutationCheckUserExistsArgs = {
  login: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  body: Scalars['String']['input'];
  commentId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['Int']['input'];
};


export type MutationCreateStoryArgs = {
  body: Scalars['String']['input'];
  genreId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationDeleteCommentArgs = {
  commentId?: InputMaybe<Scalars['ID']['input']>;
  hasChildren: Scalars['Boolean']['input'];
  id: Scalars['Int']['input'];
};


export type MutationDeleteStoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDislikeStoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLikeStoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationPostPhotoArgs = {
  file: Scalars['Upload']['input'];
  height: Scalars['Float']['input'];
  width: Scalars['Float']['input'];
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
};


export type MutationRequestResetArgs = {
  login: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateCommentArgs = {
  body: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};


export type MutationUpdateStoryArgs = {
  body: Scalars['String']['input'];
  genreId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  info?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};


export type MutationVerifyUserArgs = {
  token: Scalars['String']['input'];
};


export type MutationViewStoryArgs = {
  id: Scalars['Int']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
};

export type PageInfoStories = {
  __typename?: 'PageInfoStories';
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  genres?: Maybe<Array<Maybe<Genre>>>;
  me?: Maybe<Me>;
  reactions: Array<Reaction>;
  stories: StoryConnection;
  story: Story;
  user?: Maybe<User>;
};


export type QueryCommentsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  storyId: Scalars['Int']['input'];
};


export type QueryReactionsArgs = {
  storyId: Scalars['Int']['input'];
};


export type QueryStoriesArgs = {
  genres?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  isLiked?: InputMaybe<Scalars['Boolean']['input']>;
  length?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mostCommented?: InputMaybe<Scalars['Boolean']['input']>;
  mostLiked?: InputMaybe<Scalars['Boolean']['input']>;
  mostViewed?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryStoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type Reaction = {
  __typename?: 'Reaction';
  id: Scalars['Int']['output'];
  state: Scalars['String']['output'];
  storyId: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type RequestReset = {
  __typename?: 'RequestReset';
  email: Scalars['String']['output'];
};

export type Stats = {
  __typename?: 'Stats';
  comments: Scalars['Int']['output'];
  dislikes: Array<User>;
  likes: Array<User>;
  views: Array<Maybe<User>>;
};

export type Story = {
  __typename?: 'Story';
  body: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  genre?: Maybe<Genre>;
  id: Scalars['Int']['output'];
  length: Scalars['Int']['output'];
  stats: Stats;
  title: Scalars['String']['output'];
  user: User;
};

export type StoryConnection = {
  __typename?: 'StoryConnection';
  edges: Array<Maybe<Story>>;
  pageInfo: PageInfoStories;
};

export type SuccessMessage = {
  __typename?: 'SuccessMessage';
  message?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int']['output'];
  info?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type View = {
  __typename?: 'View';
  id: Scalars['Int']['output'];
  storyId: Scalars['Int']['output'];
  userId?: Maybe<Scalars['ID']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Comment: ResolverTypeWrapper<Comment>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Genre: ResolverTypeWrapper<Genre>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Me: ResolverTypeWrapper<Me>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PageInfoStories: ResolverTypeWrapper<PageInfoStories>;
  Query: ResolverTypeWrapper<{}>;
  Reaction: ResolverTypeWrapper<Reaction>;
  RequestReset: ResolverTypeWrapper<RequestReset>;
  Stats: ResolverTypeWrapper<Stats>;
  Story: ResolverTypeWrapper<Story>;
  StoryConnection: ResolverTypeWrapper<StoryConnection>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SuccessMessage: ResolverTypeWrapper<SuccessMessage>;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
  View: ResolverTypeWrapper<View>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Comment: Comment;
  Date: Scalars['Date']['output'];
  Float: Scalars['Float']['output'];
  Genre: Genre;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Me: Me;
  Mutation: {};
  PageInfo: PageInfo;
  PageInfoStories: PageInfoStories;
  Query: {};
  Reaction: Reaction;
  RequestReset: RequestReset;
  Stats: Stats;
  Story: Story;
  StoryConnection: StoryConnection;
  String: Scalars['String']['output'];
  SuccessMessage: SuccessMessage;
  Upload: Scalars['Upload']['output'];
  User: User;
  View: View;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  commentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GenreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Genre'] = ResolversParentTypes['Genre']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Me'] = ResolversParentTypes['Me']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  photo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  checkUserExists?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCheckUserExistsArgs, 'login'>>;
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'body' | 'id'>>;
  createStory?: Resolver<ResolversTypes['Story'], ParentType, ContextType, RequireFields<MutationCreateStoryArgs, 'body' | 'genreId' | 'title'>>;
  deleteComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'hasChildren' | 'id'>>;
  deleteStory?: Resolver<ResolversTypes['Story'], ParentType, ContextType, RequireFields<MutationDeleteStoryArgs, 'id'>>;
  dislikeStory?: Resolver<ResolversTypes['Reaction'], ParentType, ContextType, RequireFields<MutationDislikeStoryArgs, 'id'>>;
  likeStory?: Resolver<ResolversTypes['Reaction'], ParentType, ContextType, RequireFields<MutationLikeStoryArgs, 'id'>>;
  postPhoto?: Resolver<ResolversTypes['Me'], ParentType, ContextType, RequireFields<MutationPostPhotoArgs, 'file' | 'height' | 'width' | 'x' | 'y'>>;
  requestReset?: Resolver<Maybe<ResolversTypes['RequestReset']>, ParentType, ContextType, RequireFields<MutationRequestResetArgs, 'login'>>;
  resetPassword?: Resolver<ResolversTypes['Me'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'password' | 'passwordConfirmation' | 'token'>>;
  signIn?: Resolver<ResolversTypes['Me'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'login' | 'password'>>;
  signOut?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType>;
  signUp?: Resolver<ResolversTypes['Me'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'email' | 'password' | 'username'>>;
  updateComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationUpdateCommentArgs, 'body' | 'id'>>;
  updateStory?: Resolver<ResolversTypes['Story'], ParentType, ContextType, RequireFields<MutationUpdateStoryArgs, 'body' | 'genreId' | 'id' | 'title'>>;
  updateUser?: Resolver<ResolversTypes['Me'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'username'>>;
  verifyUser?: Resolver<ResolversTypes['Me'], ParentType, ContextType, RequireFields<MutationVerifyUserArgs, 'token'>>;
  viewStory?: Resolver<ResolversTypes['View'], ParentType, ContextType, RequireFields<MutationViewStoryArgs, 'id'>>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoStoriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfoStories'] = ResolversParentTypes['PageInfoStories']> = {
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryCommentsArgs, 'limit' | 'storyId'>>;
  genres?: Resolver<Maybe<Array<Maybe<ResolversTypes['Genre']>>>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['Me']>, ParentType, ContextType>;
  reactions?: Resolver<Array<ResolversTypes['Reaction']>, ParentType, ContextType, RequireFields<QueryReactionsArgs, 'storyId'>>;
  stories?: Resolver<ResolversTypes['StoryConnection'], ParentType, ContextType, RequireFields<QueryStoriesArgs, 'isLiked' | 'limit' | 'mostCommented' | 'mostLiked' | 'mostViewed' | 'offset'>>;
  story?: Resolver<ResolversTypes['Story'], ParentType, ContextType, RequireFields<QueryStoryArgs, 'id'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type ReactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reaction'] = ResolversParentTypes['Reaction']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storyId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RequestResetResolvers<ContextType = any, ParentType extends ResolversParentTypes['RequestReset'] = ResolversParentTypes['RequestReset']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stats'] = ResolversParentTypes['Stats']> = {
  comments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  dislikes?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  likes?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  views?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Story'] = ResolversParentTypes['Story']> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  genre?: Resolver<Maybe<ResolversTypes['Genre']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  length?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stats?: Resolver<ResolversTypes['Stats'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['StoryConnection'] = ResolversParentTypes['StoryConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['Story']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfoStories'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SuccessMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuccessMessage'] = ResolversParentTypes['SuccessMessage']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  photo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ViewResolvers<ContextType = any, ParentType extends ResolversParentTypes['View'] = ResolversParentTypes['View']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  storyId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Genre?: GenreResolvers<ContextType>;
  Me?: MeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PageInfoStories?: PageInfoStoriesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reaction?: ReactionResolvers<ContextType>;
  RequestReset?: RequestResetResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  Story?: StoryResolvers<ContextType>;
  StoryConnection?: StoryConnectionResolvers<ContextType>;
  SuccessMessage?: SuccessMessageResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  View?: ViewResolvers<ContextType>;
};

