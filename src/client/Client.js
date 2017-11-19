class Client {
  constructor(){
    this.useLocalStorage = (typeof localStorage !== 'undefined');
    if(this.useLocalStorage){
      this.token = localStorage.getItem  ('Authorization')
    }
    this.route = 'http://localhost:3000'
  }

  setToken(token) {
    this.token = token;
    // debugger
    if (this.useLocalStorage) {
      localStorage.setItem('Authorization', this.token);
    }
  }

  currentUser() {
    // if (this.useLocalStorage) {
    //   this.token = localStorage.getItem('Authorization');
    // }
    // return JSON.parse(this.token)
    return{
      id: 1
    }
  }

  removeToken() {
    this.token = null;

    if (this.useLocalStorage) {
      localStorage.removeItem('Authorization');
    }
  }

  login(user) {
    const path = Object.keys(user).length === 2 ? '/auth/login' : '/signup'
    const url = this.route + path
    // debugger
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    }).then(this.checkStatus)
      .then(this.parseJson)
      .then((json) => this.setToken(json.auth_token))
  }

  isLoggedIn(){
    return !!this.token
  }

  logout(){
    this.removeToken();
  }

  displayResponse(response){
    console.log(response);
  }

  loadData(success){
    const url = 'http://localhost:3000/api/posts'
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

  parseJson(response){
    return response.json();
  }
}

export const client = new Client();
