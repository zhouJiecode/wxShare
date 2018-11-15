<template>
  <div class="submit">
    <template v-if="type === 1">
      <md-input ref="phone" v-model="phone" :rules="rules.phone" @validate="handleValidate" placeholder="请输入手机号">手机号</md-input>
      <md-input ref="jiaoyan" v-model="jiaoyan" :rules="rules.jiaoyan" @validate="handleValidate" placeholder="请输入验证码">
        <slot>验证码</slot>
        <valid-code-btn slot="button" :disabled="!phoneValid" :class="!phoneValid ? 'disabled' : ''" class="get-validation-code" @click="getValidCode"></valid-code-btn>
      </md-input>
    </template>

    <template v-if="type === 2">
      <md-input ref="username" :rules="rules.username" @validate="handleValidate" v-model="username" placeholder="请输入您的姓名">姓名</md-input>
      <mt-radio
        class="sex-radio"
        v-model="sex"
        :options="sexList">
      </mt-radio>
    </template>

    <template v-if="type === 3">
      <md-input ref="companyName" :rules="rules.companyName" @validate="handleValidate" v-model="companyName" placeholder="请输入您的公司名称">公司名称</md-input>
      <md-input ref="industry" :rules="rules.industry" @validate="handleValidate" v-model="industry" placeholder="请输入您的公司所属行业">所属行业</md-input>
    </template>

    <confirm-btn :disabled="disabled && type !== 3" :loading="loading" class="confirm-btn" :class="'_' + type" @click.native="handleSubmit">{{btnText}}</confirm-btn>
    <div class="tip" v-if="type === 3">您今日还可以免费体验{{freeExpTimes}}次</div>
  </div>
</template>

<script>
import MdInput from '@/components/MDinput'
import ConfirmBtn from '@/components/ConfirmBtn'
import validCodeBtn from '@/components/validCodeBtn'
import { phoneNumberregex } from '@/utils/regExp'
import request from '@/utils/request'

export default {
  components: {
    MdInput,
    ConfirmBtn,
    validCodeBtn
  },
  data () {
    const validCode =() => {
      return this.jiaoyan === this.rightCode
    }

    return {
      phone: '',
      username: '',
      jiaoyan: '',
      sex: 'MALE',
      companyName: '',
      industry: '',
      rightCode: '',
      phoneValid: false,
      disabled: true,
      freeExpTimes: 1,
      type: 1,
      loading: false,
      sexList: [{
        label: '先生',
        value: 'MALE'
      }, {
        label: '女士',
        value: 'FEMALE'
      }],
      rules: {
        phone: [
          { required: true, message: '请输入手机号' }, 
          { pattern: phoneNumberregex, message: '手机号格式错误' }
        ],
        jiaoyan: [
          { required: true, message: '请输入校验码' }, 
          { validator: validCode, message: '校验码错误' }
        ],
        username: [
          { required: true, message: '请输入您的姓名' },
          { pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/, message: '请输入中文或英文' },
          { min: 2, message: '至少输入2个字符' }
        ],
        companyName: [
          // { required: true, message: '请输入您的公司名称' },
          { pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/, message: '请输入中文或英文' },
          { min: 2, message: '至少输入2个字符' }
        ],
        industry: [
          // { required: true, message: '请输入您的公司所属行业' }
        ]
      }
    }
  },
  computed: {
    btnText() {
      return this.type === 3 ? '提交' : '下一步'
    }
  },
  methods: {
    async handleSubmit() {
      if(this.type === 1) {
        if(this.$refs.phone.isValid() && this.$refs.jiaoyan.isValid()) {
          this.type = 2
          this.disabled = true
        }
      } else if(this.type === 2) {
        if(this.$refs.username.isValid()) {
          this.type = 3
        }
      } else if(this.type === 3) {
        if(this.$refs.companyName.isValid() && this.$refs.industry.isValid()) {
          // todo提交表单
          this.loading = true
          await request({
            url: '/apiMiniApp/freeuser/call',
            method: 'get',
            params: {
              phoneNumber: this.phone,
              name: encodeURIComponent(this.username),
              gender: this.sex,
              companyName: encodeURIComponent(this.companyName),
              industry: encodeURIComponent(this.industry),
              dialogFlowType: this.$route.params.id
            }
          }).then(() => {
            this.loading = false
            this.$router.push('/success')
          }).catch(() => {
            this.loading = false
          })
        }
      }
    },
    handleValidate() {
      if(this.type === 1) {
        this.phoneValid = this.$refs.phone.isValid()
        this.disabled = !(this.$refs.phone.isValid() && this.$refs.jiaoyan.isValid())
      } else if(this.type === 2) {
        this.disabled = !this.$refs.username.isValid()
      } else if(this.type === 3) {
        this.disabled = false// !(this.$refs.companyName.isValid() && this.$refs.industry.isValid())
      }
    },
    async getValidCode() {
      // 获取验证码
      const { data } = await request({
        url: '/apiMiniApp/verificationCode/send',
        method: 'get',
        params: {
          phoneNumber: this.phone
        }
      })
      this.rightCode = data.data
      this.$refs.jiaoyan.validate()
    },
    async getFreeExpTimes() {
      // todo获取次数
      const { data } = await request({
        url: '/apiMiniApp/freeuser/getFreeTimes',
        method: 'get'
      })
      this.freeExpTimes = data.data
    }
  },
  mounted() {
    document.title = '填写信息'
    this.getFreeExpTimes()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .submit {
    padding: 45px 17px 0;
    .get-validation-code {
      // width: 107px;
      padding: 0 16px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 15px;
      position: relative;
      // right: 0;
      // bottom: 3px;
      z-index: 200;
    }

    .confirm-btn {
      &._2 {
        margin-top: 118px;
      }
      /deep/ .mint-spinner-snake {
        height: 14px !important;
        width: 14px !important;
      }
    }
    
    .sex-radio {
      /deep/ .mint-cell {
        width: 50%;
        text-align: left;
        /deep/ .mint-cell-wrapper {
          margin-top: 16px;
        }
      }
    }

    .tip {
      height: 21px;
      line-height: 21px;
      margin-top: 22px;
      color: #666;
      font-size: 15px;
      font-weight: bold;
    }
  }
</style>
