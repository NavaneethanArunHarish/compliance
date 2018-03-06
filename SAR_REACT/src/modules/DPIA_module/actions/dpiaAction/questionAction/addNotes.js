import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (postData, callback) => {
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.DPIARestUrl+'action',
            headers: {
                'Content-Type': "application/json"
            },
            data: postData
        })
        .then(response => {
            var data = response;
            callback(data,postData.question_id);
            dispatch({
                type: "Question_CREATED",
                questionCreated: data
            });
        }).catch(error => {
            callback(error);
            dispatch({ type: "Question_CREATED", questionCreated: error });
        });
    }
}