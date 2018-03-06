import axios from 'axios';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';

export default (file, id, callback) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('question_id', id);
    return dispatch => {
        axios.post(BaseUrl.DPIARestUrl + "add/attachment", formData)
            .then(response => {
                callback(response.data, id);
            }).catch(error => {

            });
    }
}