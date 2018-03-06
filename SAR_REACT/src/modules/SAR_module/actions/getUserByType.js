import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (usertype, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl+"user/type/"+usertype,
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },

        })
            .then(response => {
                var data = response;
                console.log("response while get usertypes -- > ", data);
                callback(data);
                dispatch({
                    type: "GET_USER_BY_TYPE_SUCCESS",
                    getUserByIdSuccess: data
                });
            }).catch(error => {
                dispatch({ type: "GET_USER_BY_TYPE_REJECTED", getUserByIdFailure: error });
            });
    }


}