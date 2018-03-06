import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.DPIARestUrl + "projects"

        })
            .then(response => {
                var data = response;
                callback(data);
                dispatch({
                    type: "GET_ALL_PROJECT_SUCCESS",
                    getSarByIdSuccess: data
                });
            }).catch(error => {
                callback(error);
                dispatch({ type: "GET_ALL_PROJECT_REJECTED", getSarByIdFailure: error });
            });
    }
}