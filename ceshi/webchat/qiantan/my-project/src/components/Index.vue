<template>
<div>
  <heads/>
  <h1>Index</h1>
  <footers/>
</div>
</template>

<script>
  import heads from './public/heads'
  import footers from "./public/footers";
    export default {
      components: {heads, footers},
      name: "Index",
      data() {
        return {
          msg: ''
        }
      },
      methods: {},
      created() {

      }
    }
</script>

<style scoped>

</style>
