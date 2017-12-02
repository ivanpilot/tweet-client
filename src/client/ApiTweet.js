import * as api from './ApiRoute';
import { client } from './Client';

class ApiTweet {
  constructor(){
    this.domain = api.API_ROUTE
  }

  fetchTweets(success){
    const url = this.domain + '/api/posts'
    return fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': client.getToken()
      }
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then((response) => {
        return response
      })
      .then(success)
  }

  createTweet(tweet){
    const url = this.domain + '/api/posts'
    const newTweet = {
      post:{
        title: tweet.title,
        body: tweet.body,
        react_id: tweet.id,
        author_id: client.getCurrentUser().id //to be replace by currentUser.id
      }
    }
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': client.getToken()
      },
      body: JSON.stringify(newTweet)
    }).then(this.checkStatus)
  }

  updateTweet(tweet){
    const url = this.domain + '/api/posts/' + tweet.id
    const updateTweet = {
      post:{
        title: tweet.title,
        body: tweet.body,
      }
    }
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'Authorization': client.getToken()
      },
      body: JSON.stringify(updateTweet)
    }).then(this.checkStatus)
  }

  deleteTweet(id){
    const url = this.domain + '/api/posts/' + id
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
        'Authorization': client.getToken()
      },
    }).then(this.checkStatus)
  }

  fetchTweetByReactId(reactId){
    const url = this.domain + '/api/posts/search?term=' + reactId
    return fetch(url, {
      headers: {
        'Content-Type':'application/json',
        'Authorization': client.getToken()
      }
    }).then(this.checkStatus)
      .then(this.parseJson)
  }

  parseJson(response){
    return response.json();
  }

  checkStatus(response){
    if(response.status >= 200 && response.status < 300){
      return response
    } else {
      const error = new Error();
      error.response = response;
      throw error
    }
  }
}

export const apiTweet = new ApiTweet();
