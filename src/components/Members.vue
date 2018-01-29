<template>
  <div>
    <h1>Members</h1>

    <div v-for="m in members">
      <p v-if="m.fullname == undefined">Sorry, there is no friends here !</p>
       <div v-if="verifMembers(m._id)" class="button">
         <p>{{m.fullname}}</p>
       </div>
       <div v-else class="inline">
               <p>{{m.fullname}}</p>
               <p><img v-on:click="exclude(m)" class="imgDelete" src="../images/logo_delete.png"></img></p>
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

  .button{
      width : 100%;
      height : 50px;
      padding-top : 1%;
      background-color: #4CAF50; /* Green */
      border: none;
      color: white;
      text-align: center;
      text-decoration: none;
      font-size: 16px;
  }
</style>
