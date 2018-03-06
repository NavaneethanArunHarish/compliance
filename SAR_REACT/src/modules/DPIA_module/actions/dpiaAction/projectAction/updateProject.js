import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (id, data, callback) => {
    return dispatch => {
        axios({
            method: 'put',
            url: BaseUrl.DPIARestUrl + "projects/"+id,
            data: data
        })
            .then(response => {
            var data = response;
                callback(data);
                dispatch({
                    type: "PROJECT_UPDATED_SUCCESS",
                    updateProject: data
                });
            }).catch(error => {
                callback(error);
                dispatch({ type: "PROJECT_UPDATED_REJECTED", updateProjectErr: error });
            });
    }
}