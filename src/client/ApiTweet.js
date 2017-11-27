class ApiTweet {
  constructor(){
    this.domain = 'http://localhost:3000'
  }

  fetchTweets(success){
    const url = this.domain + '/api/posts'
    return fetch(url, {
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then((response) => {
        // console.log(response)
        // debugger
        return response
      })
      .then(success)
  }

  createTweet(tweet){
    const url = this.domain + '/api/posts'
    // debugger
    const newTweet = {
      post:{
        title: tweet.title,
        body: tweet.body,
        react_id: tweet.id,
        author_id: 1 //to be replace by currentUser.id
      }
    }
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newTweet)
    }).then(this.checkStatus)
      .then((response) => {
        // console.log('CREATING TWEET...', response)
        return response
      })
  }

  fetchTweetByReactId(reactId){
    const url = this.domain + '/api/posts/search?term=' + reactId
    return fetch(url, {
      headers: {
        'Content-Type':'application/json'
      }
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then((response) => {
        // console.log('RETRIEVING LATEST TWEET', response)
        return response
      })
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
      // debugger
      throw error
    }
  }

}

export const apiTweet = new ApiTweet();
