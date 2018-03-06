import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (data, id) => {
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.RestUrl + 'sar/create/new/' + id,
            data: data
        })
            .then(response => {
                var data = response;
                dispatch({
                    type: "CREATE_NEW_SAR_SUCCESS",
                    createNewSAR: data
                });
            }).catch(error => {
                dispatch({ type: "CREATE_NEW_SAR_ERROR", createNewSAR: error });
            });
    }
}