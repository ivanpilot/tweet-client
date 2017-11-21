class ApiComment {
  constructor(){
    this.domain = 'http://localhost:3000'
  }

  loadRawComments(postId, success){
    const url = this.domain + `/api/posts/${postId}/comments`
    // debugger
    return fetch(url, {
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then(success)
  }


  parseJson(response){
    return response.json();
  }

  checkStatus(response){
    if(response.status >= 200 && response.status < 300){
      return response
    } else {
      // debugger
      const error = new Error();
      error.response = response;
      throw error
    }
  }

}

export const apiComment = new ApiComment();
