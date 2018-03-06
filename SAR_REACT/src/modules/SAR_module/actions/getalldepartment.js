import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl + 'department',
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })
            .then(response => {
                var data = response;
                console.log("response while getting all department -- > ", data);
                callback(data);
                dispatch({
                    type: "DEPARTMENT",
                    department: data
                });
            }).catch(error => {
                dispatch({ type: "DEPARTMENT", department: error });
            });
    }


}