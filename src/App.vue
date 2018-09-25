<template lang="pug">
    #app
        home
</template>

<script>
    import Home from './pages/Home.vue';
    export default {
      name: 'app',
      data () {
        return {
          
        }
      },
      components: {
          Home
      }
    }
</script>

<style lang="scss">
html, body {
  height: 100%;
}
* {
    margin: 0;
    padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f7f7f7;
  height: 100%;
}

</style>
