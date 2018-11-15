<template>
  <button class="confirm-btn" :class="disabled || loading ? 'disabled' : ''" :disabled="disabled || loading">
    <mt-spinner v-if="loading" class="mr5" type="snake"></mt-spinner>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .confirm-btn {
    width: 100%;
    height: 47px;
    margin-top: 64px;
    line-height: 47px;
    border-radius: 5px;
    font-size: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
