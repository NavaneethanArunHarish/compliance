import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (id,obj, callback) => {
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.RestUrl+"sar/escalate/"+id,
            data: obj,
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
                    type: "CREATE_ESCALATED_SUCCESS",
                    createsar: data
                });
            }).catch(error => {
                dispatch({ type: "CREATE_ESCALATED_REJECTED", createsar: error});
            });
    }


} 