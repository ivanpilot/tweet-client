class Client {
  constructor(){
    this.useLocalStorage = (typeof localStorage !== 'undefined');
    if(this.useLocalStorage){
      this.token = localStorage.getItem  ('Authorization')
    }
  }

  setToken(token) {
    this.token = token;
    // debugger
    if (this.useLocalStorage) {
      localStorage.setItem('Authorization', this.token);
    }
  }

  currentUser() {
    if (this.useLocalStorage) {
      this.token = localStorage.getItem('Authorization');
    }
    return JSON.parse(this.token)
  }

  removeToken() {
    this.token = null;

    if (this.useLocalStorage) {
      localStorage.removeItem('Authorization');
    }
  }

  login(user) {
    const newUser = {
      username: user.username,
      email: user.email,
      password: user.password,
      password_confirmation: user.passwordConfirmation
    }
    return fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser)
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
