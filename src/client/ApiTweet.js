class ApiTweet {
  constructor(){
    this.domain = 'http://localhost:3000'
  }

  loadRawTweets(success){
    const url = this.domain + '/api/posts'
    return fetch(url, {
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then((response) => {
        console.log(response)
        // debugger
        return response
      })
      .then(success)
  }

  createTweet(tweet){
    // debugger
    const url = this.domain + '/api/posts'
    const newTweet = {
      post:{
        title: tweet.title,
        body: tweet.body,
        author_id: '1'
      }
    }
    // debugger
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newTweet)
    }).then(this.checkStatus)
      .then((response) => {
        console.log('HEY MAN LOOK AT THAT', response)
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
      throw error
    }
  }

}

export const apiTweet = new ApiTweet();
