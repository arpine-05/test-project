import axios from 'axios';

const URL = 'https://test-company-users.herokuapp.com/'

const DEFAULT_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}


const axiosInstance = axios.create({
    baseURL: URL
})

const makeRequest = ({url=URL, body={}, method='GET',endPoint='/', headers={}}) => {
    let config = {
        method,
        url: `${url}${endPoint}`,
        data: body
    }

    config.headers = {
        ...DEFAULT_HEADERS,
        headers
    }

    return axiosInstance(config)
}

export { makeRequest };