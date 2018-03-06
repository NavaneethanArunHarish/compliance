import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (mailData, callback) => {
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.RestUrl+'send_email/assessment',
            headers: {
                'Content-Type': "application/json"
            },
            data: mailData
        })
        .then(response => {
            var data = response;
            callback(data);
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