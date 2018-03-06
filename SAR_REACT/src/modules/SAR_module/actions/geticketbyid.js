import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (id,ticket, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl+"ticket/"+id,
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },

        })
            .then(response => {
                var data = response;
                console.log("response while get ticket -- > ", data);
                callback(data,ticket);
                dispatch({
                    type: "GET_TICKET_BY_ID",
                    getticketbyid: data
                });
            }).catch(error => {
                dispatch({ type: "GET_TICKET_BY_ID", getticketbyid: error });
            });
    }


}