import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (id, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.DPIARestUrl+"qassigned?uid="+id,
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },

        })
            .then(response => {
                var data = response;
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