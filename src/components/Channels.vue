<template>
  <div>
    <div class="all">
        <div class="menu">
          <h1>Channels</h1>
          <p v-if="(Object.keys(channels).length)==0">Sorry, there is no channels here !</p>
          <div v-for="c in channels">

            <div class="ChanelItem">


                <h4 v-on:click="showChannel(c._id)"> {{c.label}}</h4>
                <div style="margin: 1% 4%">
                  <img v-on:click="deleteChannel(c)" class="imgDelete" src="../images/logo_delete.png" alt="delete"/>
                </div>

              </div>

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
          info: [], posts: [], member: []
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
          router.go()
        })
      },
      showChannel(channel_id){
        confApi.get('channels/'+ channel_id ).then((response)=> {
          this.channelsChat.info = response.data
          console.log("test")

          confApi.get('channels/'+ channel_id + '/posts').then((response)=> {
            this.channelsChat.posts = response.data;

            confApi.get('/members/'+ response.data.member_id + '/signedin').then((response)=>{

              this.channelsChat.member = response.data.fullname;
              var post =document.getElementById("post");
              var lastPost =post.lastChild(-1);
              console.log(lastPost)
              lastPost.style.backgroundColor = "blue"

              console.log(response.data)

            })

          })
        })
        console.log( this.channelsChat)
        return this.channelsChat
      },
      showModal(){
        this.isDisplay = true;
      },
      hideModal(){
        this.isDisplay = false;
      },
      deletePost(p){
        confApi.delete('channels/'+ p.channel_id +/posts/+ p._id).then((response) =>{
          console.log(this.response);
          alert('Votre post est supprimer')
        })
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
    background-color:	#b3ffb3;
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
  .ChanelItem{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .imgDelete{
    width: 40px ;
    height: 40px;
    margin: 2% 1%;
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
</style>
