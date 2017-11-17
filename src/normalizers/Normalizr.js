import { normalize, schema } from 'normalizr';
import { apiTweet } from '../client/ApiTweet';



const user = new schema.Entity('users')
const comment = new schema.Entity('comments', {
  commenter: user
})
const tweetSchema = new schema.Entity('tweets', {
  author: user,
  comments: [comment]
})
export const normalizedTweet = new schema.Array(tweetSchema)
