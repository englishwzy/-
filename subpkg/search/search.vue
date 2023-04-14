<template>
  <view>
    <view class="container">
      <view class="search-box">
        <uni-search-bar @input="input" :radius="100" cancel-button="none" :focus="true">
        </uni-search-bar>
      </view>
      <view id="bg">
        <!-- 渲染列表 -->
        <view class="list" v-show="flag">
          <view class="list-item" v-for="item in searchResults" :key="item.goods_id" @click="gotoDetail(item)">
            <view class="title">{{item.goods_name}}</view>
            <uni-icons type="forward"></uni-icons>
          </view>
        </view>
       <view class="history" v-show="!flag">
        <view class="history-item">
          <view class="info">
            <view>搜索历史</view>
              <uni-icons type="trash-filled" @click="deleteHistory"></uni-icons>
          </view>
         <view class="box">
           <view class="history-item" v-for="(h,index) in searchHistory" :key="index" @click="gotoGoodList(h)">
             {{h}}
           </view>
         </view>
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
        timer: null,
        searchHistory: [],
        keyword: '',
        searchResults: [],
        flag: false,
      };
    },
    onLoad(){
      this.searchHistory = uni.getStorageSync("historyList") || [];
    },
    methods: {
      input(e) {
        // 实现防抖，2秒内再次输入则不执行，2秒后再执行操作。
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          // console.log(e);
          if (e.trim() != '') {
            this.flag = true;
            this.keyword = e;
            // 数组去重,更新顺序
            this.searchHistory = this.searchHistory.filter((item)=>{
              return item!=e;
            })
            this.searchHistory.unshift(e);
            uni.setStorageSync("historyList",this.searchHistory);
            this.searchResults = [];
            this.getSearchList();
          } else {
            this.flag = false;
          }
          console.log(this.searchHistory)
        }, 1000)
      },
      async getSearchList() {
        const {
          statusCode,
          data
        } = await uni.$http.get("/api/public/v1/goods/qsearch", {
          query: this.keyword
        });
        if (statusCode != 200) {
          return uni.$showMsg();
        }
        this.searchResults = data.message;
        console.log(this.searchResults);
      },
      gotoDetail(item) {
        // console.log(item);
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id,
        })
      }
    ,
    deleteHistory(){
      uni.showModal({
        content:"确认要清空搜索记录吗？",
        success:(confirm)=>{
          if(confirm){
            // 确定删除
            uni.clearStorageSync();
            uni.navigateTo({
              url:"/subpkg/search/search",
            })
          }
        }
        
      })
    }
    ,
    gotoGoodList(h){
      console.log(h);
      uni.navigateTo({
          url: '/subpkg/goodlist/goodlist?query=' + h
      })
    }
    }
  }
</script>

<style lang="scss">
  .search-box {
    background-color: #C00000;
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .list {
    padding: 0 20rpx;

    .list-item {
      display: flex;
      padding: 26rpx 0;
      font-size: 24rpx;
      border-bottom: 1px solid #efefef;

      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 6rpx;
      }
    }
  }

  .history {
    // background-color:pink;
    .history-item{
     
      .info{
        padding:0 20rpx;
        display: flex;
        height:80rpx;
        align-items: center;
        justify-content: space-between;
      }
        
      .box{
        margin-top:20rpx;
        border-top:1px solid #f8f8f8;
        display: flex;
        flex-wrap: wrap;
        .history-item {
          border-radius: 10rpx;
          text-align: center;
          line-height: 60rpx;
          padding:0 32rpx;
          height: 60rpx;
          border:1px solid #f8f8f8 ;
          background-color: #f8f8f8;
          margin-top:10rpx;
          margin-right:10rpx;
        }
      }
    }
  }
</style>