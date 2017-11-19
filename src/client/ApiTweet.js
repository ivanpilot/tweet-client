class ApiTweet {
  constructor(){
    this.domain = 'http://localhost:3000'
  }

  loadRawTweets(success){
    const url = this.domain + '/api/posts'
    fetch(url, {
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then(success)
      // .then((json) => {
      //   console.log(json)
      // })
  }

  addNewTweet(tweet){
    const url = this.domain + '/api/posts'
    const newTweet = {
      post:{
        title: tweet.title,
        body: tweet.body,
        user_id: parseInt(tweet.userId, 10)
      }
    }
    // debugger
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newTweet)
    }).then(this.checkStatus)
      .then((response) => console.log(response))
  }

  parseJson(response){
    return response.json();
  }

  checkStatus(response){
    if(response.status >= 200 && response.status < 300){
      return response
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error
    }
  }

}

export const apiTweet = new ApiTweet();
