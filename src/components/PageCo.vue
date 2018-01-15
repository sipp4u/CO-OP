<template>
  <div class="hello">
    PAGE CO
    <button v-on:click="profile()"> Profile </button>
  </div>
</template>

<script>
  import confApi from '../configApi'
  export default {
    name: 'PageCo',
    methods: {
      profile(){

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


  div {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
  }
</style>
