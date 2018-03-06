import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (callback) => {
    return dispatch => {
        axios({
            method: 'get',
            url: BaseUrl.RestUrl+'sar/page/1',
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },
        })
            .then(response => {
                var data = response;
                console.log("response while goes to inital page -- > ", data);
                callback(data);
                dispatch({
                    type: "INITIAL_PAGE",
                    inital_page: data
                });
            }).catch(error => {
                dispatch({ type: "INITIAL_PAGE", inital_page: error });
            });
    }


}