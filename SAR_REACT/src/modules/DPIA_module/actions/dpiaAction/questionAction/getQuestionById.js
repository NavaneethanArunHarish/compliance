import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (id, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.DPIARestUrl+'question/'+id,
            headers: {
                'Content-Type': "application/json"
            }
        })
        .then(response => {
            var data = response;
            callback(data);
            dispatch({
                type: "Question_BY_ID",
                questionByIdSuccess: data
            });
        }).catch(error => {
           // callback(error);
            dispatch({ type: "Question_BY_ID", questionByIdSuccess: error });
        });
    }
}