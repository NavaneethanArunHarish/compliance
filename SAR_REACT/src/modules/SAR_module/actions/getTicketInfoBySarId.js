import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (id, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl+"ticket_info/"+id,
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },

        })
            .then(response => {
                var data = response;
                console.log("response while get sar -- > ", data);
                callback(data);
                dispatch({
                    type: "GET_TICKET_INFO_BY_SAR_ID_SUCCESS",
                    getTicketInfoBySarIdSuccess: data
                });
            }).catch(error => {
                dispatch({ type: "GET_TICKET_INFO_BY_SAR_ID_REJECTED", getTicketInfoBySarIdFailure: error });
            });
    }


}