<template>
  <div>
  <div class="hello">
    <div classe="header">
      <div classe="img">
        <img src="../images/co-op.jpg" alt="CO-OP">
      </div>
    </div>

    <div class="profLogout">
      <button v-on:click="profile()"> Profile </button>
      <button v-on:click="logOut()">Se deconnecter</button>
    </div>
  </div>

  <div class="home">
    <channels :members="members" :channels="channels" @event='showChannels' class ="channels">

    </channels>

    <members :members="members" @event='showMembers' class="members">

    </members>
  </div>

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

      },
      showMembers(){
        confApi.get('/members').then((response) =>{
          this.members= response.data;
        }).catch((error)=> {
          console.log(error);
        })
      },
      showChannels(){
        confApi.get('/channels').then((response) =>{
          this.channels= response.data;
        }).catch((error)=> {
          console.log(error);
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
    background-color: #4CAF50; /* Green */
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
    height: 50%;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;
  }

  div {
    border-radius: 5px;
    background-color: white;
    padding: 20px;
  }

  .home{
    display: flex;
    background-color: 	#b3ffb3;

  }

  .channels{
    width : 100%;
  }

  .members{
    width :200px;
    background-color:	#b3ffb3;
  }




</style>
