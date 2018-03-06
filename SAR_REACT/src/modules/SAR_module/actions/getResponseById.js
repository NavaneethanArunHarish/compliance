import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (id, callback) => dispatch => {
  axios({
    method: 'get',
    url: BaseUrl.RestUrl + "sar/response/" + id,
    headers: {
      'Content-Type': "application/json",
      'Access-Control-Allow-Origin': '*',
      "Authorization": "Bearer " + localStorage.getItem("token")
    },

  })
    .then(response => {
      var data = response;
      console.log("Response -- > ", data);
      callback(data);
      dispatch({
        type: "GET_RESPONSE_BY_SAR_BY_ID_SUCCESS",
        getResponseSarSuccess: data
      });
    }).catch(error => {
      dispatch({ type: 'GET_SAR_BY_ID_REJECTED', getSarByIdFailure: error });
    });
};
