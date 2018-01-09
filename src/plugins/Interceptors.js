import router from '../router'

const MyPlugin = {

   install(Vue, options) {

    Vue.login = function (members) {
      confApi.post('/members/signin', members).then((response)=> {
        console.log(response.data)
        //mettre dans le local storage
        /*
        this.$store.dispatch('nom de la methode', this.members)
         */
      }).catch((error)=> {
        console.log(error);
      })
    }
  }
}

export default MyPlugin;
