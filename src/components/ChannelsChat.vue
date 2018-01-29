<template>
  <div>
    <h1>channelsChat</h1>

    <div class="PostWindow">
        <p v-if="channelsChat.info.label == undefined">Choose your tchat</p>
        <p v-else>Channel : {{channelsChat.info.label}} </br> Topic : {{channelsChat.info.topic}} </br><img v-on:click="showModalBis(channelsChat.info)" class="imgDelete" src="../images/modif.png" alt="modificattion"></p>
    </div>

    <div id="post" class="chatWindow">
      <p v-if="(Object.keys(channelsChat.posts).length)==0">There is no Posts here...</p>
      <div  v-for="p in channelsChat.posts" class='post'>

        <div id="msg"> {{memberOfPost(p)}}</div>
        <p  class="message"> {{p.message}} </p>
        <div class="btnDeleteChanel">
          <img v-on:click="deletePost(p)" class="imgDelete" src="../images/logo_delete.png" alt="delete">
          <img v-on:click="showModal(p)" class="imgDelete" src="../images/modif.png" alt="modificattion">
        </div>

      </div>

      <div  v-if="isDisplay" class="modal">
        <div class="modalWindow">
          <form @submit.prevent="modifPost()">
            <label for="label">Message</label>
            <input type="text" v-model="editedPost.message" id="label" name="label" placeholder="you're message" required>

            <input type="submit" value="Submit">
          </form>
          <button v-on:click="hideModal()" class="hide">Hide</button>
        </div>
      </div>

      <div  v-if="isDisplayBis" class="modal">
        <div class="modalWindow">
          <form @submit.prevent="modifChannel()">
            <label for="label">Message</label>
            <input type="text" v-model="editedChannel.label" id="label" name="label" placeholder="you're topic" required>
            <input type="text" v-model="editedChannel.topic" id="label" name="label" placeholder="you're label" required>

            <input type="submit" value="Submit">
          </form>
          <button v-on:click="hideModalBis()" class="hide">Hide</button>
        </div>
      </div>

      <p v-if="channelsChat.info.label == undefined"></p>
      <form v-else @submit.prevent="createPosts()">
        <input type="textbox" v-model="post.message" id="message" name="message" placeholder="You're message" required class="textbox">
        <input type="submit" value="Submit" class="button">
      </form>

    </div>

  </div>
</template>
<script>
  import confApi from '../configApi'
  import router from '../router'

  export default {
    name: 'channelsChat',
    props: ['channelsChat','members'],
    data () {
      return {
          post:{
            message: ''
          },
          editedPost: {},
          editedChannel: {
            label: '',
            topic : ''
          },
        isDisplay: false,
        isDisplayBis: false
      }
    },
    methods :{
      memberOfPost(p){
        for(var i = 0; i< this.members.length; i++){
          if(this.members[i]._id == p.member_id){

            return this.members[i].fullname;
          }
        }

      },
      createPosts(){
        confApi.post('/channels/' + this.channelsChat.info._id + '/posts', this.post).then((response)=> {
          this.$emit('event', response.data.channel_id)
        })
      },
      deletePost(p){
        confApi.delete('channels/'+ p.channel_id +/posts/+ p._id).then((response) =>{
          this.$emit('event', p.channel_id)
          alert('You re post is delete !')
        })
      },
      modifPost(){
        confApi.put('channels/'+ this.editedPost.channel_id +/posts/+ this.editedPost._id,  this.editedPost).then((response) =>{
          alert('youre post has changed')
          this.editedPost = {};
          this.hideModal();
        })
      },
      modifChannel(){
          confApi.put('channels/'+ this.editedChannel._id, this.editedChannel).then((response) =>{
            alert('youre channel has changed')
            this.editedChannel = {};
            this.hideModalBis();
          })
        },
      showModal(p){
        this.isDisplay = true;
        this.editedPost = p;
      },
      hideModal(){
        this.isDisplay = false;
      },
      showModalBis(p){
        this.isDisplayBis = true;
        this.editedChannel = p;
      },
      hideModalBis(){
        this.isDisplayBis = false;
      }
    }

  }

</script>
<style scoped>

  .post p{
    background-color :  #4CAF50;
    width : 80%;
    height : 30px;
    padding : 20px;
    margin: auto;
    margin-top : 20px;
    margin-bottom : 20px;
  }
.post{
  display: flex;

}
  .textbox{
    width : 80%;
    height : 50px;
  }

  .button{
    height : 50px;
 }
  .btnDeleteChanel{
margin: 1% 1%;
  }
  .imgDelete{
    width: 40px ;
    height: 40px;
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
