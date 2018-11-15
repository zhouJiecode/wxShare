<template>
  <div class="home-page">
    <img src="../assets/banner.png">
    <div class="content">
      <router-link to="/submitPhone/HOUSE" tag="div" class="content-item item1">
        <div class="title">房产电销</div>
        <div class="tip">洞察需求，意向筛选</div>
      </router-link>
      <router-link to="/submitPhone/FINANCE" tag="div" class="content-item">
        <div class="title">金融催缴</div>
        <div class="tip">催收提醒，产品推荐</div>
      </router-link>
      <router-link to="/submitPhone/FITMENT" tag="div" class="content-item">
        <div class="title">装饰装修</div>
        <div class="tip">产品邀约，售后服务</div>
      </router-link>
    </div>

    <img class="qrCode" src="../assets/erweima@2x.png">
    <div class="bottom-tip">长按识别二维码，关注“探意机器人”公众号</div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data () {
    return {}
  },
  mounted() {
    document.title = '体验中心'

    // 本地模拟登陆代码，服务器上不需要
    if(process.env.NODE_ENV === 'development') {
      request({
        url: '/apiMiniApp/simulate/login',
        method: 'post',
        params: {
          openId: 'oc8RR1vXZKWtOE22mBKmJF60lLCw'
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .home-page {
    position: absolute;
    top: 0;
    bottom: 0;
    font-size: 0;
    left: 0;
    right: 0;
    img {
      width: 100%;
    }
    .content {
      padding: 20px 20px 0 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .content-item {
        width: 163px;
        height: 99px;
        border: 1px solid #1890FF;
        background: #ECF6FF;
        font-weight: bold;
        &.item1 {
          width: 336px;
          margin: 0 auto 10px;
        }
        .title {
          font-size: 20px;
          line-height: 28px;
          margin: 26px auto 0;
          color: #1890FF;
        }
        .tip {
          font-size: 13px;
          line-height: 18px;
          margin: 3px auto 0;
          color: #3E63A0;
        }
      }
    }
    .qrCode {
      position: absolute;
      bottom: 34px;
      width: 132px;
      height: 132px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .bottom-tip {
      position: absolute;
      bottom: 12px;
      color: #000;
      font-size: 13px;
      // width: 100%;
      height: 16px;
      line-height: 16px;
      margin-top: 6px;
      left: 0;
      right: 0;
      text-align: center;
    }
  }
</style>
