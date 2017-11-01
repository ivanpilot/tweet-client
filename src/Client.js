class Client {
  constructor(){
    this.useLocalStorage = (typeof localStorage !== 'undefined');
    if(this.useLocalStorage){
      this.token = localStorage.getItem  ('Authorization')
    }
  }

  setToken(token) {
    this.token = JSON.stringify(token);

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

  isLoggedIn(){
    return !!this.token
  }

  logout(){
    this.removeToken();
  }
}

export const client = new Client();
