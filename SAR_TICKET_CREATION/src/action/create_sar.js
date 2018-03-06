import axios from 'axios';
import { BaseUrl } from '../serviceurl';

export default (obj, callback) => {
    console.log("data in action --->"+obj)
    return dispatch => {
        axios({
            method: 'post',
            url: BaseUrl.RestUrl+"sar/create",
            data: obj
        })
            .then(response => {
                var data = response;
                console.log("response while create sar -- > ", data);
                callback(data);
                dispatch({
                    type: "CREATE_SAR_SUCCESS",
                    createsar: data
                });
            }).catch(error => {
                console.log("got error while updating---> ", JSON.stringify(error));
                dispatch({ type: "CREATE_SAR_REJECTED", createsar: error});
            });
    }


}