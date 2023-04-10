<template>
  <view>
    <!-- 1.轮播图 -->
    <swiper class="swiper" indicator-dots indicator-color="#fff" indicator-active-color="#cc0003" autoplay
      interval="5000" circular>
      <swiper-item v-for="swiperitem in  swiperList" :key="swiperitem.goods_id">
        <navigator class="swiperitem" :url="`/subpkg/goods_detail/goods_detail?good_id=${swiperitem.goods_id}`">
          <image :src="swiperitem.image_src" mode=""></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 2.分类导航区域 -->
    <view class="nav">
      <view class="navlist" v-for="(list,index) in navList" :key="index" @click="navClickHandle(list)">
        <view class="pic">
          <image :src="list.image_src" :mode="list.open_type"></image>
        </view>
      </view>
    </view>
    <!-- 楼层区域 -->

    <!-- 楼层区域 -->
    <view class="floor" v-for="(flist,index) in floor" :key="index">
      <view class="title">
        <image :src="flist.floor_title.image_src" mode=""></image>
      </view>
      
      <view class="floor-content">
        <view class="left">
          <image :src="flist.product_list[0].image_src" mode=""></image>
        </view>
        <view class="right">
          <view class="right-item" v-for="(rightItem,index) in flist.product_list" :key="index" v-if="index!=0">
            <image :src="rightItem.image_src" mode=""></image>
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floor: [],
      };
    },

    onLoad() {

      this.getswiper();
      this.getnav();
      this.getLay();
    },
    methods: {
      // 请求轮播图数据
      async getswiper() {
        const {
          data,
          statusCode
        } = await uni.$http.get('/api/public/v1/home/swiperdata');
        // 请求失败
        if (statusCode != 200) {
          return uni.$showMsg();
        } else {
          this.swiperList = data.message;
          // console.log(this.swiperList);
        }
      },
      // 请求分类导航数据
      async getnav() {
        const {
          data,
          statusCode
        } = await uni.$http.get('/api/public/v1/home/catitems');
        if (statusCode !== 200) {
          return uni.$showMsg();
        }
        this.navList = data.message;
        // console.log(this.navList);

      },
      // 点击跳转分类页面

      navClickHandle(item) {
        console.log(item);
        uni.reLaunch({
          url: "/pages/cate/cate",
        })
      },
      // 请求楼层数据
      async getLay() {
        const {
          data,
          statusCode
        } = await uni.$http.get('/api/public/v1/home/floordata');
        // console.log(data,statusCode);
        if (statusCode !== 200) {
          uni.$showMsg();
        }
        this.floor = data.message;
        console.log(this.floor);

      }
    }
  }
</script>

<style lang="scss">
  .swiper {
    height: 330rpx;

    .swiperitem {
      width: 100%;
      height: 100%;

      image {
        width: 100%;
        height: 100%;
      }
    }
  }

  // 分类导航
  .nav {
    width: 100%;
    display: flex;
    padding: 20rpx;
    .navlist {
      width: 100%;
      height: 200rpx;
      .pic {
        width: 100%;
        height: 100%;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  // 楼层区域
  .floor {
    margin-bottom: 20rpx;
    width: 100%;
    .title {
      width: 100%;
      height: 60rpx;
      image {
        width: 100%;
        height:100%;
      }
    }
    .floor-content{
      display: flex;
      padding:20rpx;
      .left{
        width: 260rpx;
        height:400rpx;
        padding-right:20rpx;
        image{
          width:100%;
          height: 100%;
        }
      }
      .right{
         flex:1;
         display: flex;
         flex-wrap: wrap;
        height:400rpx;
        .right-item{
          width: 200rpx;
          height:190rpx;
          &:nth-child(2n+1){
            margin-bottom:20rpx;
            margin-right:20rpx;
          }
          &:nth-child(2n){
            margin-bottom:20rpx;
            margin-left:20rpx;
          }
          
          image{
            width:100%;
            height:100%;
          }
        }
      }
    }
  }
</style>