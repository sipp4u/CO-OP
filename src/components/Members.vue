<template>
  <div>
    <h1>Members</h1>

    <div  v-for="m in members">
      <p v-if="m.fullname == undefined">Sorry, there is no friends here !</p>
      <p v-else> {{m.fullname}}
              <p v-if="verifMembers(m._id)">
              <p v-else><button v-on:click="exclude(m)"> Exclude Membre </button></p>
      </p>


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
          this.$emit('event')
        })
      },
      verifMembers(m_id){
        if(sessionStorage.getItem('id') == m_id){
          return true
        }else{
          return false
        }
      }
    }

  }
</script>
<style scoped>

  div{
    background-color: lightgrey;
  }

</style>
