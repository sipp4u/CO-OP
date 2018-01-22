<template>
  <div>
    <div class="all">
        <div class="menu">
          <h1>Menu</h1>
          <div  v-for="c in channels">
            <!-- Le if ne marche pas -->
            <p v-if="c == undefined">Sorry, there is no channels here !</p>
            <p v-on:click="showChannel(c._id)" v-else> {{c.label}} <button v-on:click="deleteChannel(c)"> Delete channel </button></p>
          </div>
          <button v-on:click="showModal()">Create Channel</button>
        </div>

        <channelsChat :channelsChat="channelsChat" class ="channelsChat"  @event="showChannel">

        </channelsChat>

    </div>

      <div  v-if="isDisplay" class="modal">
        <div class="modalWindow">
          <form @submit.prevent="createChannel()">
            <label for="label">Label</label>
            <input type="text" v-model="created.label" id="label" name="label" placeholder="Channel name..." required>

            <label for="topic">Topic</label>
            <input type="text" v-model="created.topic" id="topic" name="topic" placeholder="Channel topic..." required>

            <input type="submit" value="Submit">
          </form>
          <button v-on:click="hideModal()" class="hide">Hide</button>
        </div>
      </div>
  </div>

</template>
<script>
  import confApi from '../configApi'
  import router from '../router'
  import channelsChat from './channelsChat'

  export default {
    name: 'channels',
    props: ['channels'],
    components: {
       channelsChat
     },
    data () {
      return {
        created:{
          label: '',
          topic:''
        },
        channelsChat : {
          info: [], posts: []
        },
        isDisplay: false
      }
    },
    methods:{
      createChannel(){
        confApi.post('/channels', this.created).then((response)=> {
          router.go()
        })
      },
      deleteChannel(channel){
        confApi.delete('channels/'+ channel._id).then((response)=> {
          alert('You just delete ' + channel.label)
          alert('You fucked up')
          router.go()
        })
      },
      showChannel(channel_id){
        confApi.get('channels/'+ channel_id ).then((response)=> {
          this.channelsChat.info = response.data
          console.log("test")

          confApi.get('channels/'+ channel_id + '/posts').then((response)=> {
            this.channelsChat.posts = response.data
          })
        })
        return this.channelsChat
      },
      showModal(){
        this.isDisplay = true;
      },
      hideModal(){
        this.isDisplay = false;
      }
    }
  }
</script>
<style  scoped>

  .all{
    display: flex;
  }

  .menu{
    width : 200px;
    background-color: lightgrey;
  }

  .channelsChat{
    width : 100%;
    text-align: center;
    align-self: flex-start;
  }

  .modal{
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    padding-top : 150px;
  }

  .modalWindow{
    background-color: white;
    width : 50%;
    margin :auto;
    padding : 50px;
  }

  .hide{
    position: absolute;
    top : 0;
    right : 0;
  }

</style>
