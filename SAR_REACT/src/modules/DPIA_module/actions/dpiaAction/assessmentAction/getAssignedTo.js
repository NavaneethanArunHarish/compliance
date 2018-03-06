import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (id, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.DPIARestUrl + "getassignedtoass/"+id

        })
            .then(response => {
            var data = response;
                callback(data);
                dispatch({
                    type: "GET_SECTION_ASSESSMENTID_SUCCESS",
                    getAllAssessment: data
                });
            }).catch(error => {
                callback(error);
                dispatch({ type: "GET_SECTION_ASSESSMENTID_REJECTED", getAllAssessmentErr: error });
            });
    }
}