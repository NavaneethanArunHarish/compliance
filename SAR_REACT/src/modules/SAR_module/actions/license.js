import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (obj, callback) => {
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.RestUrl + "license",
            data: obj,
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },
        })
            .then(response => {
                var data = response;
                console.log("response while create ticket -- > ", data);
                callback(data);
                dispatch({
                    type: "CREATE_TICKET_SUCCESS",
                    createsar: data
                });
            }).catch(error => {
                dispatch({ type: "CREATE_TICKET_REJECTED", createsar: error });
            });
    }

}