<template>
  <div>
    <h1>Channels</h1>

    <div  v-for="c in channels">
      <!-- Le if ne marche pas -->
      <p v-if="c == undefined">Sorry, there is no channels here !</p>
      <p v-on:click="showChannel(c)"  v-else> {{c.label}} <button v-on:click="deleteChannel(c)"> Delete channel </button></p>
    </div>

    <form @submit.prevent="createChannel()">
      <label for="label">Label</label>
      <input type="text" v-model="created.label" id="label" name="label" placeholder="Channel name..." required>

      <label for="topic">Topic</label>
      <input type="text" v-model="created.topic" id="topic" name="topic" placeholder="Channel topic..." required>

      <input type="submit" value="Submit">
    </form>


    <channelsChat :channelsChat="channelsChat" class ="channelsChat">

    </channelsChat>

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
        }
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
      showChannel(channel){
        confApi.get('channels/'+ channel._id ).then((response)=> {
          this.channelsChat.info = response.data

          confApi.get('channels/'+ channel._id + '/posts').then((response)=> {
            this.channelsChat.posts = response.data
          })
        })
        return this.channelsChat
      }
    }
  }
</script>
<style>

</style>
