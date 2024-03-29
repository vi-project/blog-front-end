import axios from 'axios';
import { config } from '../server/config';

const Request = axios.create({
    baseURL: config.api_host,
    timeout: 30000
});

Request.interceptors.response.use(response => {
    if (response.status === 200 || response.status === 201) {
        return Promise.resolve(response);
    }
});

const request = {
    get(url: string, params = {}) {
        return Request({
            method: 'get',
            url,
            params,
            headers: {
                client_id: 'vincent.cy@foxmail.com'
            }
        });
    }
};



export default request;
