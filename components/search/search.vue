<template>
  <view>
   <view class="my-search-container" :style="'background-color:'+bgcolor+';'">
       <!-- 使用 view 组件模拟 input 输入框的样式 -->
       <view class="my-search-box" :style="'border-radius:'+radius+'rpx;'" @click="gotosearch">
         <uni-icons type="search" size="17"></uni-icons>
         <text class="placeholder">搜索</text>
       </view>
     </view>
  </view>
</template>

<script>
  export default {
    name:"search",
    data() {
      return {
        
      };
    },
    methods:{
      gotosearch(){
        this.$emit("click");
      }
    },
    // 自定义圆角和背景颜色
    props:{
      bgcolor:{
        type:String,
        default:'#C00000',
      },
      radius:{
        type:Number,
        default:100,
      }
    }
  }
</script>

<style lang="scss">
  .my-search-container{
    // width:100%;
    height:100rpx;
    padding:0 20rpx;
    display: flex;
    align-items: center;
    // background-color: #C00000;
    text-align: center;
    .my-search-box{
      width:100%;
      height:72rpx;
      // border-radius: 100rpx;
      background-color:#ffffff;
      display: flex;
      justify-content: center;
      align-items:center;
      font-size:30rpx;
    }
  }
</style>