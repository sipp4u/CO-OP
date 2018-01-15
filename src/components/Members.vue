<template>
  <div>
    <h1>Members</h1>

    <div  v-for="(m, key, index) in members" :key="m.id">
      <p v-if="(Object.keys(members).length)<0">Vous n'avez pas d'amis !</p>
      <p v-else> {{m.fullname}}</p>

    </div>
  </div>

</template>
<script>
  export default {
    name: 'members',
    props: ['members']
  }
</script>
<style>

</style>
