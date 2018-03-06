import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (data,callback) => {
    console.log("in action----",data)
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.RestUrl+'ticket-info',
            headers: {
                'Content-Type': "application/json",
                "Authorization": "Bearer "+localStorage.getItem("token")
            },
            data: data
           

        })
            .then(response => {
                var data = response;
                console.log("response while create ticket info  -- > ", data);
                callback(data);
                dispatch({
                    type: "CREATE_TICKET_INFO",
                    create_ticket_info: data
                });
            }).catch(error => {
                dispatch({ type: "CREATE_TICKET_INFO", create_ticket_info: error });
            });
    }


}