import axios from 'axios';
import { BaseUrl } from '../../../serviceUrl/serviceUrl';

export default (file, id, name,responsetext, callback) => {
    console.log("the response text---->",responsetext)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sar_id', id);
    formData.append('user', name);
    formData.append('responsetext', responsetext);
    return dispatch => {
        axios.post(BaseUrl.RestUrl + "sar/upload", formData)
            .then(response => {
                callback(response.data);
            }).catch(error => {

            });
    }
}