import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';
import { browserHistory } from 'react-router';

export default (form, callback) => {
  return dispatch => {
    axios({
      method: 'post',
      url: BaseUrl.RestUrl+"user/administrator/create",
      data: form,
      headers: {
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin': '*'
      }

    })
      .then(response => {
        var data = response;
        alert("User is Registered Successfully");
        browserHistory.push('/');
        console.log("response while updating -- > ", data);
        dispatch({
          type: "SIGNUP_SUCCESS",
          signup: data
        });
      }).catch(error => {
        alert("User Already Exist!");
      });
  }


}