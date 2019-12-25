<template>
<div>
  <heads>

  </heads>
</div>
</template>

<script>
  import heads from './public/heads'
    export default {
    components:{heads},
        name: "Index",
      data(){
      return{
        msg:''
      }
      },
      methods:{

      },
      created() {
         this.$axios.get('http://127.0.0.1:3001/').then(res=>{
           let is_login=res.data;
           console.log(is_login)
           // if(is_login===-1){
           //   this.$router.push({ name: 'login'})
           // }
         })
      }
    }
</script>

<style scoped>

</style>
