import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (id, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl+"user/"+id,
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },

        })
            .then(response => {
                var data = response;
                console.log("response while get user -- > ", data);
                callback(data);
                dispatch({
                    type: "GET_USER_BY_ID_SUCCESS",
                    getUserByIdSuccess: data
                });
            }).catch(error => {
                dispatch({ type: "GET_USER_BY_ID_REJECTED", getUserByIdFailure: error });
            });
    }


}