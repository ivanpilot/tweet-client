import { schema } from 'normalizr';

const user = new schema.Entity('users')

const comment = new schema.Entity('comments', {
  commenter: new schema.Object(user),
})

// const author = new schema.Entity('author', {
//   author: new schema.Object(user)
// })

const tweetSchema = new schema.Entity('tweets', {
  author: new schema.Object(user),
  comments: [comment]
})

export const normalizedTweet = new schema.Array(tweetSchema)
export const normalizedComment = new schema.Array(comment)


// const responseUser = new schema.Object({ users: new schema.Array(user) });
// const normalizedData = normalize(data, responseSchema);
