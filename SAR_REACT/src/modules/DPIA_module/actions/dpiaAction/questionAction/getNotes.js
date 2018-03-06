import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (id, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.DPIARestUrl+'action_pro?qid='+id,
            headers: {
                'Content-Type': "application/json"
            },
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