import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (pageno, callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl+'sar/page/'+pageno,
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },
        })
            .then(response => {
                var data = response;
                console.log("response while goes to next page -- > ", data);
                callback(data);
                dispatch({
                    type: "NEXT_PAGE",
                    next_page: data
                });
            }).catch(error => {
                dispatch({ type: "NEXT_PAGE", next_page: error });
            });
    }
}