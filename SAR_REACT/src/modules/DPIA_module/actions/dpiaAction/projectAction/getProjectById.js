import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (id ,callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.DPIARestUrl + "projects/"+id
           
        })
            .then(response => {
            var data = response;
                callback(data);
                dispatch({
                    type: "GET_PROJECT_ID_SUCCESS",
                    getProjectByIdSuccess: data
                });
            }).catch(error => {
                callback(error);
                dispatch({ type: "GET_PROJECT_ID_REJECTED", getProjectByIdErr: error });
            });
    }
}