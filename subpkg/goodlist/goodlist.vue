<template>
  <view>
    <view class="goodlist">
      <view class="goodlist-item" v-for="good in goodList" :key="good.goods_id">
        <gooditem :good="good"></gooditem>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodList: [],
        // 总共的页数
        total: 0,
        isloading:false,
        queryObj: {
          // 关键词
          query: '',
          // 当前页码
          pagenum : 1,
          // 每页有多少条数据
          pagesize: 10,
          // 商品id
          cid: '',
        }
      }
    },
    // 下拉刷新，数据清空
    onPullDownRefresh(){
      // console.log("@2",this._data,this.$options.data());
      // 利用object.assign方法清空数据
    // 因为关键词和cid不能清空，刷新的数据是基于这两项的。
      // Object.assign(this._data,this.$options.data());
        this.queryObj.pagenum = 1;
        this.total = 0;
        this.isloading = false;
        this.goodList = [];
      this.getGoodsList(()=>uni.stopPullDownRefresh())
    },
    // 触底钩子
    onReachBottom(){
      // 触底当前页数加一，数据是否加载完毕
     if(this.isloading == false&&this.queryObj.pagenum *this.queryObj.pagesize<this.total){
       this.queryObj.pagenum ++;
       this.getGoodsList();
     }else{
       console.log("没数据了")  
     }
     
    },
    onLoad(value) {
      this.queryObj.query = value.query || "";
      this.queryObj.cid = value.cid || "";
      this.getGoodsList();
    },
    methods: {
      async getGoodsList(callback) {
        // 使用节流阀防止请求没结束继续发请求。
        this.isloading = true;
        const {
          data,
          statusCode
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj);
        if (statusCode != 200) {
          return uni.$showMsg();
        }
        // 如果有callback这个参数就执行此函数。
        callback&&callback();
        this.goodList = [...this.goodList,...data.message.goods];
        // 使用解构赋值连接新旧数据。
        this.total = data.message.total;
        console.log("@", this.goodList, this.total);
        this.isloading = false;
      }
    }
  }
</script>

<style lang="scss">
  .goodlist {
    padding: 0 10rpx;

    .goodlist-item {
      padding: 20rpx 0;
      height: 240rpx;
    }
  }
</style>