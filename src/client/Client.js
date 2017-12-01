class Client {
  constructor(){
    this.useLocalStorage = (typeof localStorage !== 'undefined');
    if(this.useLocalStorage){
      this.token = localStorage.getItem('Authorization')
      this.currentUser = localStorage.getItem('User')
    }
    this.route = 'http://localhost:3000'
  }

  setToken(token) {
    this.token = token;
    if (this.useLocalStorage) {
      localStorage.setItem('Authorization', this.token);
    }
  }

  getToken() {
    if (this.useLocalStorage) {
      this.token = localStorage.getItem('Authorization');
    }
    return this.token
  }

  setCurrentUser(){
    const url = this.route + '/currentuser'
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      }
    })
    .then(this.checkStatus)
    .then(this.parseJson)
    .then((response) => {
      if (this.useLocalStorage) {
        localStorage.setItem('User', JSON.stringify(response.user));
      }
    })
  }

  getCurrentUser(){
    if (this.useLocalStorage) {
      this.currentUser = JSON.parse(localStorage.getItem('User'));
    }
    return this.currentUser
  }

  removeToken() {
    this.token = null;
    this.currentUser = null
    if (this.useLocalStorage) {
      localStorage.removeItem('Authorization');
      localStorage.removeItem('User');
    }
  }

  login(user) {
    const path = Object.keys(user).length === 2 ? '/auth/login' : '/signup'
    const url = this.route + path
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

  parseJson(response){
    return response.json();
  }
}

export const client = new Client();
