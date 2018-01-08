import axios from 'axios'

const confApi = axios.create({
  baseURL: 'http://coop.api.netlor.fr/api',
  headers: {
    'Authorization' : 'Token token=1977460be1ea4a2097ba58ce0e491544'
  }
})
export default confApi
