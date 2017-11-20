import { schema } from 'normalizr';

const user = new schema.Entity('users')

const comment = new schema.Entity('comments', {
  commenter: user
})

const tweetSchema = new schema.Entity('tweets', {
  author: user,
  comments: [comment]
})

export const normalizedTweet = new schema.Array(tweetSchema)
export const normalizedComment = new schema.Array(comment)
