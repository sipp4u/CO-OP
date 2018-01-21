<template>
  <div>
    <h1>Members</h1>

    <div  v-for="(m, key, index) in members" :key="m.id">
      <p v-if="Object.keys(members).length<0">Sorry, there is no friends here !</p>
      <!-- regarder si on peut encore v-if m.fullname =sessionstorage fullname pour pas s'exclure soit meme mdr -->
      <p v-else> {{m.fullname}} <button v-on:click="exclude(m)"> Exclude Membre </button></p>

    </div>
  </div>

</template>
<script>
  import confApi from '../configApi'
  import router from '../router'

  export default {
    name: 'members',
    props: ['members'],
    methods: {
      exclude(member){
        confApi.delete('members/'+ member._id).then((response)=> {
          alert('you exclude ' + member.fullname)
          alert('Well done NILS, you wrecked it')
          router.go()
        })
      }
    }

  }
</script>
<style>

</style>
