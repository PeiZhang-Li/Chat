<template>
  <img :src="imgs" alt="">
</template>

<script>
    import error from '../../../static/img/404.jpg'

    export default {
        name: "Error",
        data() {
            return {
                imgs: error
            }
        }
    }
</script>

<style scoped>
  img {
    display: block;
    width: 1200px;
    height: 800px;
    margin: 0 auto;
  }
</style>
