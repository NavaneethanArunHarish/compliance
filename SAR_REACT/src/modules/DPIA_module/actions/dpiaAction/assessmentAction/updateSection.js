import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (id, data, callback) => {
    return dispatch => {
        axios({
            method: 'put',
            url: BaseUrl.DPIARestUrl + "section/"+id,
            data: data
        })
            .then(response => {
            var data = response;
                callback(data);
                dispatch({
                    type: "DELETE_SECTION_SUCCESS",
                    getAllAssessment: data
                });
            }).catch(error => {
                callback(error);
                dispatch({ type: "DELETE_SECTION_REJECTED", getAllAssessmentErr: error });
            });
    }
}