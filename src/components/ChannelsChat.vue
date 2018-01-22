<template>
  <div>
    <h1>channelsChat</h1>

    <div class="PostWindow">
        <p v-if="channelsChat.info.label == undefined">Choose your tchat</p>
        <p v-else>Channel : {{channelsChat.info.label}} </br> Topic : {{channelsChat.info.topic}}</p>
    </div>

    <div  class="chatWindow">
      <div v-for="c in channelsChat.posts" class='post'>
        <p v-if="c.message == undefined">There is no Posts here...</p>
        <p v-else> {{c.message}} </p>
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
      }
    }

  }

</script>
<style scoped>

  .post p{
    background-color : lightgrey;
    width : 80%;
    height : 30px;
    padding : 20px;
    margin: auto;
    margin-top : 20px;
    margin-bottom : 20px;
  }

  .textbox{
    width : 80%;
    height : 50px;
  }

  .button{
    height : 50px;
  }

</style>
