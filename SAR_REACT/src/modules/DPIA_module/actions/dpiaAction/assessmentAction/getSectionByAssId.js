import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (id, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.DPIARestUrl + "section_pro?assid="+id

        })
            .then(response => {
            var data = response;
                callback(data);
                dispatch({
                    type: "GET_SECTION_ASSESSMENTID_SUCCESS",
                    getAllAssessment: data
                });
            }).catch(error => {
                dispatch({ type: "GET_SECTION_ASSESSMENTID_REJECTED", getAllAssessmentErr: error });
            });
    }
}