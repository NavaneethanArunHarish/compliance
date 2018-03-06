import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (obj,callback) => {
    console.log("data in action --->"+obj)
    return dispatch => {
        axios({
            method: 'put',
            url: BaseUrl.RestUrl+"update/user_type/"+obj.user_id,
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
                    type: "EDIT_USER_TYP_SUCCESS",
                    editUser: data
                });
            }).catch(error => {
                dispatch({ type: "EDIT_USER_TYP_REJECTED", editUser: error});
            });
    }


}