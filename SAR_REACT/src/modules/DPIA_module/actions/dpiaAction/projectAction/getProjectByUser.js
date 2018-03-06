import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (id, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.DPIARestUrl + "getprojectbyuser?uid=" + id

        })
            .then(response => {
                var data = response;
                callback(data);
                dispatch({
                    type: "GET_PROJECT_BY_USER_SUCCESS",
                    getAllProject: data
                });
            }).catch(error => {
                callback(error);
                dispatch({ type: "GET_PROJECT_BY_USER_REJECTED", getAllProjectErr: error });
            });
    }
}