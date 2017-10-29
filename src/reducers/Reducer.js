import {combineReducers} from 'redux';
import {activeThreadId} from './ActiveThreadId'
import {activeEditableTweetId} from './ActiveEditableTweetId'
import {threads} from './Threads'

export const reducer = combineReducers({
  activeThreadId,
  activeEditableTweetId,
  threads
})
