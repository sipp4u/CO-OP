<template>
  <div>
    <h1>channelsChat</h1>

    <div class="PostWindow">
        <p v-if="channelsChat.info.label == undefined">Choose your tchat</p>
        <p v-else>Channel : {{channelsChat.info.label}} </br> Topic : {{channelsChat.info.topic}}</p>
    </div>

    <div  class="chatWindow">
      <p v-if="(Object.keys(channelsChat.posts).length)==0">There is no Posts here...</p>
      <div v-for="p in channelsChat.posts" class='post'>


        <p class="message"> {{p.message}} </p>
        <div class="btnDeleteChanel">
          <img v-on:click="deletePost(p)" class="imgDelete" src="../images/logo_delete.png" alt="delete">
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
    props: ['channelsChat'],
    data () {
      return {
        post:{
          message: ''
        }
      }
    },
    methods : {
      createPosts(){
        confApi.post('/channels/' + this.channelsChat.info._id + '/posts', this.post).then((response)=> {
          this.$emit('event', response.data.channel_id)
          console.log("child")
        })
      },
      deletePost(p){
        confApi.delete('channels/'+ p.channel_id +/posts/+ p._id).then((response) =>{
          this.$emit('event', p.channel_id)
          console.log(response.data);
          alert('Votre post est supprimé !')
        })
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
margin: 4% 1%;
  }
  .imgDelete{
    width: 40px ;
    height: 40px;
  }
</style>
