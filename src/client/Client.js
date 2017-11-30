class Client {
  constructor(){
    this.useLocalStorage = (typeof localStorage !== 'undefined');
    if(this.useLocalStorage){
      this.token = localStorage.getItem('Authorization')
    }
    this.route = 'http://localhost:3000'
    this.currentUserId = null
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

  setCurrentUserId(){
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
      return this.currentUserId = response
    })
  }

  getCurrentUserId(){
    return this.currentUserId.id
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
      throw error
    }
  }

  parseJson(response){
    return response.json();
  }
}

export const client = new Client();
