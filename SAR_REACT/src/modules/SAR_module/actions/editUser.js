import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (obj, id, callback) => {
    console.log("data in action --->"+obj)
    return dispatch => {
        axios({
            method: 'put',
            url: BaseUrl.RestUrl+"user/"+id,
            data: obj,
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer "+localStorage.getItem("token")
            },
        })
            .then(response => {
                var data = response;
                console.log("response while edit user -- > ", data);
                callback(data);
                dispatch({
                    type: "EDIT_USER_SUCCESS",
                    editUser: data
                });
            }).catch(error => {
                dispatch({ type: "EDIT_USER_REJECTED", editUser: error});
            });
    }


}