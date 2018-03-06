import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (data,id,callback) => {
    return dispatch => {
        axios({
            method: 'put',
            url: BaseUrl.DPIARestUrl+'answer/'+id,
            headers: {
                'Content-Type': "application/json"
            },
            data :data
          
        })
        .then(response => {
            var data = response;
             callback(data);
            dispatch({
                type: "Question_UPDATED",
                questionUpdated: data
            });
        }).catch(error => {
           callback(error);
            dispatch({ type: "Question_UPDATED", questionUpdated: error });
        });
    }
}