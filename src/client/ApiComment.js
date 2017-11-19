class ApiComment {
  constructor(){
    this.domain = 'http://localhost:3000'
  }

  loadRawComments(postId, success){
    const url = this.domain + `/api/posts/${postId}/comments`
    return fetch(url, {
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then(success)
      // .then((data) => {
      //   debugger
      //   return data
      // })
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

export const apiComment = new ApiComment();
