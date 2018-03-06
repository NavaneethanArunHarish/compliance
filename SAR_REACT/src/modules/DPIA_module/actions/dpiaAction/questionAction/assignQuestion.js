import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (data, callback) => {
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.DPIARestUrl+'quesassigned',
            headers: {
                'Content-Type': "application/json"
            },
            data: data
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