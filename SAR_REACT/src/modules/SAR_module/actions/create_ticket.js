import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (data,department_id,callback) => {
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.RestUrl+'ticket',
            headers: {
                'Content-Type': "application/json",
                "Authorization": "Bearer "+localStorage.getItem("token")
            },
            data: data
           

        })
            .then(response => {
                var data = response;
                console.log("response while create ticket  -- > ", data);
                callback(data,department_id);
                dispatch({
                    type: "CREATE_TICKET",
                    create_ticket: data
                });
            }).catch(error => {
                dispatch({ type: "CREATE_TICKET", create_ticket: error });
            });
    }


}