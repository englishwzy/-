<template>
  <view>
    <login v-if="token==''"></login>
    <userInfo v-else></userInfo>
  </view>
</template>

<script>
  import {mapState} from "vuex"
  import tabbar from "@/mixins/tabbar-badge.js"
  export default {
    mixins:[tabbar],
    data() {
      return {
      };
    },
    computed:{
      ...mapState("user",['userInfo','token','redirect']),
    },
    watch:{
      token(newValue,old){
        if(newValue!=''){
          console.log(this.redirect);
          if(this.redirect.opentype=="reLaunch"){
            uni.reLaunch({
              url:this.redirect.url,
            })
          }
        }
      }
    }
  }
</script>

<style lang="scss">

</style>
