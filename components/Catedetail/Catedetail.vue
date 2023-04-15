<template>
  <scroll-view :scroll-y="true" class="content" :scroll-top="scrollTop">
    <view class="section" v-for="children in activeItem.children" :key="children.cat_id">
      <h4>/{{children.cat_name}}/</h4>
      <view class="goods">
        <view class="good-item" v-for="good in children.children" :key="good.cat_id" @click="gotoGoodsList(good)">
          <image :src="good.cat_icon| handleImage" mode=""></image>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
  export default {
    name: "Catedetail",
    data() {
      return {
        scrollTop: 0,
      };
    },
    methods: {
      gotoGoodsList(item3) {
        console.log(item3);
        uni.navigateTo({
          url: "/subpkg/goodlist/goodlist?cid=" + item3.cat_id,
        })
      }
    },
    props: ["activeID", "activeItem"],
    filters: {
      // 处理图片错误的问题
      handleImage(img) {
        // console.log(img);
        const rex = /^https:\/\/api-ugo-dev.itheima.net/;
        const image = img.replace(rex, "https://api-hmugo-web.itheima.net");
        return image;
      }
    }
  }
</script>

<style lang="scss">
  .content {
    height: 100%;

    .section {
      text-align: center;

      h4 {
        margin: 30rpx 0;
      }

      .goods {
        display: flex;
        flex-wrap: wrap;

        .good-item {
          text-align: center;
          width: 180rpx;
          padding-left: 10rpx;
          margin-bottom: 10rpx;

          image {
            width: 120rpx;
            height: 120rpx;
          }

        }
      }

    }

  }
</style>