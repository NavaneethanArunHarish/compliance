import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';
import { browserHistory } from 'react-router';

export default (form, callback) => {
  return dispatch => {
    axios({
      method: 'post',
      url: BaseUrl.RestUrl+"charge",
      data: form,
      headers: {
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin': '*',
        "Authorization": "Bearer "+localStorage.getItem("token")
    },
    })
      .then(response => {
        var data = response;
        callback(data)
        console.log("paid ", data);
        dispatch({
          type: "PAID_SUCCESS",
          signup: data
        });
      }).catch(error => {
        // dispatch({ type: "PAID_REJECTED", signup: error.response.data });
      });
  }
}