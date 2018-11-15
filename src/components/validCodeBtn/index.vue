<template>
  <button :disabled="disabled" :class="disabled ? 'disabled' : ''" @click="handleClick">{{text}}</button>
</template>

<script>
export default {
  props: {
  },
  data () {
    return {
      interval: null,
      timeLast: 0
    }
  },
  computed: {
    text() {
      return '获取验证码' + (this.timeLast ? '（' + this.timeLast + '）' : '')
    },
    disabled() {
      return !!this.timeLast
    }
  },
  methods: {
    handleClick() {
      if(this.timeLast === 0) {
        this.timeLast = 60
        this.interval = setInterval(() => {
          if(--this.timeLast <= 0) {
            clearInterval(this.interval)
            this.interval = null
          }
        }, 1000)

        this.$emit('click')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .disabled {
    pointer-events: none;
  }
</style>
