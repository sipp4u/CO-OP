<template>
  <div class="hello">
    <h1>CO-OP Sign up</h1>
    <form @submit.prevent="signin()">
      <label for="fname">Full Name</label>
      <input type="text" v-model="members.fullname" id="fname" name="firstname" placeholder="Your name..">

      <label for="email">Email</label>
      <input type="text" v-model="members.email" id="email" name="email" placeholder="Your email ..">

      <label for="password">Password</label>
      <input type="password" v-model="members.password" id="password" name="password" placeholder="Your password..">

      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
  import confApi from '../configApi'
  export default {
    name: 'Signin',
    data () {
      return {
        members:{fullname:'',
          email: '',
          password:''
        }

      }
    },

    methods: {
      signin(){
        confApi.post('/members', this.members).then((response)=> {
          console.log(response.data)
        }).catch((error)=> {
          console.log(error);
        })
      }
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
  input[type=text], select {
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
</style>
