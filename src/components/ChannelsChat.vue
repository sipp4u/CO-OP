<template>
  <div>
    <h1>channelsChat</h1>

    <div class="PostWindow">
        <p v-if="channelsChat.info.label == undefined">Choose your tchat</p>
        <p v-else>{{channelsChat.info.label}} {{channelsChat.info.topic}}</p>
    </div>

    <div  class="TchatWindow">
      <div v-for="c in channelsChat.posts">
        <p v-if="c == undefined">There is no Posts here...</p>
        <p v-else> {{c.message}} </p>
      </div>

      <p v-if="channelsChat.info.label == undefined"></p>
      <form v-else @submit.prevent="createPosts()">
        <label for="post">Posts</label>
        <input type="text" v-model="post.message" id="message" name="message" placeholder="You're message" required>
        <input type="submit" value="Submit">
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
          router.go()
        })
      }
    }

  }

</script>
<style>

</style>
