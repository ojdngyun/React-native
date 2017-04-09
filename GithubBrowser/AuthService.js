// dependencies
import {
  AsyncStorage,
} from 'react-native';
import _ from 'lodash';
import buffer from './buffer';

// consts
const authKey = 'auth';
const userKey = 'user';

class AuthService {
  getAuthInfo(callBack) {
    AsyncStorage.multiGet([authKey, userKey], (err, val) => {
      val.map((result, index, store) => {
        var key_1 = store[index][0];
        var value_1 = store[index][1];
        console.log(index, key_1, value_1);
      });
      console.log(val);

      if (err) {
        return callBack(err);
      }

      if (!val) {
        return callBack();
      }

      // 'val' object returned is nested array
      // it needs to be converted a object using lodash library
      var zippedObj = _.zipObject([val[0][0], val[1][0]], [val[0][1], val[1][1]]);
      // var zippedObj = _.zipObject(val);
      console.log(zippedObj);

      // checking if zippedObj contains the authKey
      if (!zippedObj[authKey]) {
        return callBack();
      }

      var authInfo = {
        header: {
          Authorization: 'Basic ' + zippedObj[authKey]
        },
        user: zippedObj[userKey],
        // user: JSON.parse(zippedObj[userKey])
      };

      console.log(authInfo);
      return callBack(null, authInfo);
    });
  }

  login(credentials, callBack) {
    var credentialString = new buffer.Buffer(credentials.username +
      ':' + credentials.password);
    const encodedAuth = (credentialString.toString('base64'));

    fetch('https:api.github.com/user', {
      headers: {
        'Authorization' : 'Basic ' + encodedAuth
      },
    })
    .then((response) => {
      if (response.status >= 200 && response.status <= 300) {
        return response;
      }
      throw {
        badCredentials: response.status === 401,
        unknownError: response.status !== 401,
      };
    })
    .then((response) => {
      return response.json();
    })
    .then((results) => {
      console.log(encodedAuth + JSON.stringify(results));
      // storing authentication
      const multiSetPairs = [[authKey, JSON.stringify(encodedAuth)],
        [userKey, JSON.stringify(results)],
      ];
      AsyncStorage.multiSet(multiSetPairs, (err) => {
        if (err) {
          throw err;
        }
        // returning successful login callBack
        return callBack({ success: true });
      });
    })
    .catch((err) => {
      return callBack(err);
    });
  }
}

module.exports = new AuthService();
