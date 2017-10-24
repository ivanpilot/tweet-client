class Client {
  constructor(){
    this.useLocalStorage = (typeof localStorage !== 'undefined');
    if(this.useLocalStorage){
      localStorage.getItem  ('Authorization')
    }
    // debugger
  }

  setToken(token) {
    this.token = JSON.stringify(token);

    if (this.useLocalStorage) {
      localStorage.setItem('Authorization', this.token);
    }
  }

  removeToken() {
    this.token = null;

    if (this.useLocalStorage) {
      localStorage.removeItem('Authorization');
    }
  }

  currentUser(){
    if(this.token) return JSON.parse(this.token)
  }

  isLoggedIn(){
    !!this.token
  }
}

export const client = new Client();
