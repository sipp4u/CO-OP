<template>
  <div>
    <h1>Members</h1>

    <div v-for="m in members">
      <p v-if="m.fullname == undefined">Sorry, there is no friends here !</p>
      <div class="inline" v-else>
              <p>{{m.fullname}}</p>
              <p v-if="verifMembers(m._id)"></p>
              <p v-else><img v-on:click="exclude(m)" class="imgDelete" src="../images/logo_delete.png"></img></p>
      </div>


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

  .inline {
    display : flex;
    align-items: center;
  }

  .inline p {
    margin-left : 10px;
  }

  .imgDelete{
    width: 40px ;
    height: 40px;
    margin: 2% 1%;
  }

</style>
