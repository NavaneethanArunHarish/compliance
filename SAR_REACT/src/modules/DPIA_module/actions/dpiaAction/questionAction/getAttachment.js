import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (id, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.DPIARestUrl + "attachment_pro?qid="+id

        })
            .then(response => {
            var data = response;
                callback(data);
                dispatch({
                    type: "GET_ANS_BY_QUESID_SUCCESS",
                    getAllAssessment: data
                });
            }).catch(error => {
                dispatch({ type: "GET_ANS_BY_QUESID_REJECTED", getAllAssessmentErr: error });
            });
    }
}