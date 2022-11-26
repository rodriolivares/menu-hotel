import axios from 'axios'

const clienteAxios = axios.create({
   baseURL : process.env.REACT_APP_LOGIN_URL
})

export default clienteAxios
