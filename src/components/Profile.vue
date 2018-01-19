<template>
  <div>
    <div class="hello">
      Profile
    </div>

    <div class="profile">
      <img src="http://lorempixel.com/400/400" />
      <li v-for="value in profile">
       {{ value }}
      </li>
    </div>
  </div>
</template>

<script>
  import confApi from '../configApi'
  export default {
    name: 'Profile',
    data(){
      return {
        profile :{fullname : '',
        email : ''}
      }
    },
    created(){
      confApi.get('/members/'+sessionStorage.getItem("id")+"/signedin").then((response)=> {
        this.profile.fullname = response.data.fullname
        this.profile.email = response.data.email
      })
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  input[type=text], input[type=email], select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  input[type=password], select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  input[type=submit] {
    width:50%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  input[type=submit]:hover {
    background-color: #45a049;
  }

  div {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
  }

  .profile{
    text-align: center;
  }

  .profile img{
    width : 100px;
  }

  .profile li {
    display : block;
  }

</style>
