import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (id, callback) => {
    return dispatch => {
        axios({
            method: 'delete',
            url: BaseUrl.DPIARestUrl + "question/"+id

        })
            .then(response => {
            var data = response;
                callback(data);
                dispatch({
                    type: "DELETE_QUESTION_SUCCESS",
                    getAllQuestion: data
                });
            }).catch(error => {
                callback(error);
                dispatch({ type: "DELETE_QUESTION_REJECTED", getAllQuestionErr: error });
            });
    }
}