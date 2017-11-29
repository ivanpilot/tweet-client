class ApiComment {
  constructor(){
    this.domain = 'http://localhost:3000'
  }

  fetchComments(postId, success){
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

  createComment(comment){
    const url = this.domain + `/api/posts/${comment.activeTweetId}/comments`
    debugger
    const newComment = {
      comment: {
        react_id: comment.id,
        description: comment.description,
        post_id: comment.activeTweetId,
        commenter_id: 1 //to b replaced with currentUser.id
      }
    }
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
