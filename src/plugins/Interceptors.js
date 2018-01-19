import Vue from 'vue'
import router from '../router'
import confApi from '../configApi'

const MyPlugin = {

   install(Vue, options) {
         // Add a request interceptor
    confApi.interceptors.request.use( (config) => {
        // Do something before request is sent
        if(localStorage.getItem('isConnected') == 'Connect'){
          if(!config.params){
            config.params = {}
          }
          config.params.token = localStorage.getItem('token');
        }
        //on verifie connecté
        //si y'a pas de param on vide
        //on mets en params le token
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });

      // Add a response interceptor
    confApi.interceptors.response.use((response) =>{
        // Do something with response data
        return response;
      }, function (error) {
        // Do something with response error
        if(error.response.status === 400){
          alert("Mauvais Login ou Mot de passe");
        }
        return Promise.reject(error);
      });

  }
}

export default MyPlugin;
