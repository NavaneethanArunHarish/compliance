import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl+'sar/page/',
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },
        })
            .then(response => {
                var data = response;
                console.log("response while goes to last page -- > ", data);
                callback(data);
                dispatch({
                    type: "LAST_PAGE",
                    last_page: data
                });
            }).catch(error => {
                dispatch({ type: "LAST_PAGE", last_page: error });
            });
    }


}