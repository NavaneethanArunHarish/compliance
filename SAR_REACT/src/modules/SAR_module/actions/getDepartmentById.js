import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (id,ticket, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl+"department/"+id,
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },

        })
            .then(response => {
                var data = response;
                console.log("response while get department -- > ", data);
                callback(data,ticket);
                dispatch({
                    type: "GET_DEPARTMENT_BY_ID",
                    getDepartmentByd: data
                });
            }).catch(error => {
                dispatch({ type: "GET_DEPARTMENT_BY_SAR_ID", getDepartmentById: error });
            });
    }


}