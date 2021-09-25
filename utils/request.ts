import axios from 'axios';
import { config } from '../server/config';

const Request = axios.create({
    baseURL: config.api_host,
    timeout: 30000
});

const request = {
    post(url: string, data = {}) {
        return Request({
            method: 'post',
            url,
            data,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
    },
    get(url: string, params = {}) {
        return Request({
            method: 'get',
            url,
            params,
        });
    },

    delete(url: string, params = {}) {
        return Request({
            method: 'delete',
            url,
            params,
        });
    },
    put(url: string, params = {}) {
        return Request({
            method: 'put',
            url,
            data: params,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
    }
};



export default request;
