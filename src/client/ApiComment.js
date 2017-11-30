import { client } from './Client';

class ApiComment {
  constructor(){
    this.domain = 'http://localhost:3000'
  }

  fetchComments(postId, success){
    const url = this.domain + `/api/posts/${postId}/comments`
    return fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': client.getToken()
      }
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then(success)
  }

  fetchComment(comment, success){
    const url = this.domain + `/api/posts/${comment.activeTweetId}/comments/search?term=${comment.id}`
    return fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': client.getToken()
      }
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then(success)
  }


  createComment(comment){
    const url = this.domain + `/api/posts/${comment.activeTweetId}/comments`
    const newComment = {
      comment: {
        react_id: comment.id,
        description: comment.description,
        post_id: comment.activeTweetId,
        commenter_id: client.getCurrentUserId() //to b replaced with currentUser.id
      }
    }
    return fetch(url, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': client.getToken()
      },
      body: JSON.stringify(newComment)
    }).then(this.checkStatus)
  }

  updateComment(comment){
    const url = this.domain + `/api/posts/${comment.activeTweetId}/comments/${comment.id}`
    const updateComment = {
      comment: {
        description: comment.description,
      }
    }
    return fetch(url, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': client.getToken()
      },
      body: JSON.stringify(updateComment)
    }).then(this.checkStatus)
  }

  deleteComment(id, activeTweetId){
    const url = this.domain + `/api/posts/${activeTweetId}/comments/${id}`
    return fetch(url, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': client.getToken()
      },
    }).then(this.checkStatus)
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

export const apiComment = new ApiComment();
