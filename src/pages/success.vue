<template>
  <div class="success-page">
    <img src="../assets/ok@2x.png">
    <div class="title">提交成功！</div>
    <div class="tip">正在呼叫您的手机，请注意接听</div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted() {
    document.title = '体验中心'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .success-page {
    img {
      width: 94px;
      height: 94px;
      margin: 170px auto 0;
    }
    .title {
      height: 28px;
      margin-top: 33px;
      line-height: 28px;
      font-size: 20px;
      color: #000;
      text-align: center;
    }
    .tip {
      height: 21px;
      margin-top: 17px;
      line-height: 21px;
      font-size: 15px;
      color: #888;
      text-align: center;
    }
  }
</style>
