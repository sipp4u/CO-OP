<template>
  <div>
  <div class="hello">
    PAGE CO

    <h1>PAGE CO</h1>
    <div class="profLogout">
      <button v-on:click="profile()"> Profile </button>
      <button v-on:click="logOut()">Se deconnecter</button>
    </div>


  </div>

  <members :members="members" class="members">

  </members>

  <channels :channels="channels" class ="channels">

  </channels>

  </div>
</template>

<script>
  import confApi from '../configApi'
  import router from '../router'
  import Members from './Members'
  import Channels from './Channels'
  export default {

    name: 'PageCo',
    components: {
      Members,
      Channels
    },
    data (){
      return {
        members: [],
        channels: []
      }
    },
    created() {
      confApi.get('/members').then((response) =>{
        this.members= response.data;
      }).catch((error)=> {
        console.log(error);
      })

      confApi.get('/channels').then((response) =>{
        this.channels= response.data;
      }).catch((error)=> {
        console.log(error);
      })


    },
    methods: {
      profile(){
        router.push('Profile')
      },
      logOut(){
        console.log('ok')
        confApi.delete('members/signout')
          .then((response)=> {
          console.log(response);
          alert('Vous etes deconnecté');
            router.push({name: 'Home'})
            sessionStorage.clear()
        })

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  .profLogout{

    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
  }
  button {
    margin-left: 2px;
    background-color: cornflowerblue; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;

  }
  .hello{
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  div {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
  }




</style>
