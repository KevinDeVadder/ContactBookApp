import axios from 'axios'

//Create main API configuration
export default () =>{
    return axios.create({
        baseURL: 'http://localhost:5050/api/v1/'
    })
}