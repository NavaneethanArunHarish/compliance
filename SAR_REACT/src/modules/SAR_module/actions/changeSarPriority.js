import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (id, obj, callback) => {
    console.log("assigned actions-----------> ", obj.assignedTo);
    return dispatch => {
        axios({
            method: 'POST',
            url: BaseUrl.RestUrl+'sar/priority/'+id,
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },
            // need to change
            data: obj

        })
            .then(response => {
                var data = response;
                console.log("response while ASSIGN_SAR sar -- > ", data);
                callback(data);
                dispatch({
                    type: "CHANGE_PRIORITY_SAR",
                    change_priority: data
                });
            }).catch(error => {
                dispatch({ type: "CHANGE_PRIORITY_SAR_ERR", change_priority_err: error });
            });
    }


}