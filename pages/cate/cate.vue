<template>
  <view class="">
    <!-- 自定义组件的背景颜色和圆角大小 -->
  <!-- <search :bgcolor="'skyblue'"></search>   -->
  <view class="search">
    <search @click="gotoSearch"></search>  
  </view>
  <view class="cate">
    <scroll-view scroll-y="true" class="side" show-scrollbar :style="'height:'+wh+'px;'">
      <view class="cate-item" v-for="sideitem in cateList" :key="sideitem.cat_id" @click="changeActive(sideitem)" :class="{active:activeID==sideitem.cat_id}">
        {{sideitem.cat_name}}
      </view>
      <hr>
    </scroll-view>
    <view class="right">
      <Catedetail :activeID = "activeID" :activeItem ="activeItem" ref="goodsdetail"></Catedetail>
    </view>
  </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        cateList:[],
        wh:0,
        activeID:1,
        activeItem:{},
      };
    },
    onLoad(){
      this.getcateSide();
      // 	windowHeight	可使用窗口高度,用于设置滚动的高度
     const systeminfo =  uni.getSystemInfoSync();
      this.wh = systeminfo.windowHeight-50;
    },
    methods:{
      async getcateSide(){
       const {data,statusCode} = await uni.$http.get("/api/public/v1/categories");
       
       if(statusCode!=200){
         return uni.$showMsg();
       }
       this.cateList = data.message;
       this.activeItem =this.cateList[0];
       console.log(this.cateList);
      }
      // 点击改变左侧导航的颜色
      ,changeActive(item){
        console.log(item);
        this.activeID = item.cat_id;
        this.activeItem = item;
         // 3.在左侧切换的时候，动态的给scrollTop赋值，值在 -1 和 0 之间来回切换。因为此处如果一直改为0 ，scroll-top 滚动条赋值为 0 是不会被触发的，因此需要在 0 和 -1 之间来回切换
        this.$refs.goodsdetail.scrollTop = this.$refs.goodsdetail.scrollTop==0?1:0;
       
      }
      ,gotoSearch(){
        uni.navigateTo({
          url:"/subpkg/search/search",
        })
      }
    }
  }
</script>

<style lang="scss">
  .search{
    position:sticky;
    top:0;
    z-index:999;
  }
  .cate{
    width:100%;
    // background-color: pink;
    display: flex;
    .side{
      text-align: center;
      width:180rpx;
      background-color: #f7f7f7;
      .cate-item{
        line-height: 120rpx;
        width:100%;
        height:120rpx;
      }
    }
    .right{
      flex:1;
      background-color: #ffffff;
    }
  }
  
  .active{
    background-color: #FFFFFF;
  }
</style>
