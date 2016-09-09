var buffer = require('./buffer');

class AuthService{
  login(creds, cb){
    var bufferString = new buffer.Buffer(creds.username + ':' + creds.password);
    var encodedAuth1 = bufferString.toString('base64');

    fetch('https://api.github.com/user', {
      headers: {
        'Authorization' : 'Basic ' + encodedAuth1
      }
    })
    .then((response) => {
      if(response.status >= 200 && response.status < 300){
        return response;
      }
      throw {
        // console.log('error occured');
        badCredentials: response.status == 401,
        unknownError: response.status != 401
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((results) => {
      return cb({success: true});
      // this.setState({success: true});
      // console.log(results);
    })
    .catch((err) => {
      return cb(err);
      // console.log(err);
      // this.setState(err);
    })
    .finally(() => {
      this.setState({showProgress: false});
    });
  }
}

module.exports = new AuthService();
