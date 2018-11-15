<template>
  <div :class="computedClasses" class="material-input__component">
    <div>
      <label class="material-label">
        <slot/>
      </label>
      <input
        v-if="type === 'email'"
        :name="name"
        :placeholder="fillPlaceHolder"
        v-model="currentValue"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :required="required"
        type="email"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput">
      <input
        v-if="type === 'url'"
        :name="name"
        :placeholder="fillPlaceHolder"
        v-model="currentValue"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :required="required"
        type="url"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput">
      <input
        v-if="type === 'number'"
        :name="name"
        :placeholder="fillPlaceHolder"
        v-model="currentValue"
        :step="step"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :max="max"
        :min="min"
        :minlength="minlength"
        :maxlength="maxlength"
        :required="required"
        type="number"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput">
      <input
        v-if="type === 'password'"
        :name="name"
        :placeholder="fillPlaceHolder"
        v-model="currentValue"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :max="max"
        :min="min"
        :required="required"
        type="password"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput">
      <input
        v-if="type === 'tel'"
        :name="name"
        :placeholder="fillPlaceHolder"
        v-model="currentValue"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :required="required"
        type="tel"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput">
      <input
        v-if="type === 'text'"
        :name="name"
        v-model="currentValue"
        :readonly="readonly"
        :disabled="disabled"
        :autoComplete="autoComplete"
        :minlength="minlength"
        :maxlength="maxlength"
        :required="required"
        type="text"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput">
      <span class="material-input-bar"/>

      <div class="placeholder" v-if="!currentValue">{{placeholder}}</div>
      <div class="input-after">
        <span class="mint-field-state is-error" v-if="currentValue" @click="handleClearVal"><i class="mintui mintui-field-error"></i></span>
        <slot name="button"></slot>
      </div>
      <div class="err-msg" v-if="!valid && errMsg">{{errMsg}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MdInput',
  props: {
    name: String,
    type: {
      type: String,
      default: 'text'
    },
    value: [String, Number],
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    min: String,
    max: String,
    step: String,
    minlength: Number,
    maxlength: Number,
    required: {
      type: Boolean,
      default: true
    },
    autoComplete: {
      type: String,
      default: 'off'
    },
    rules: [Object, Array]
  },
  data() {
    return {
      valid: true,
      currentValue: this.value,
      focus: false,
      fillPlaceHolder: null,
      errMsg: ''
    }
  },
  computed: {
    computedClasses() {
      return {
        'material--active': this.focus,
        'material--disabled': this.disabled,
        'material--raised': Boolean(this.focus || this.currentValue), // has value
        'material--has-errors': !this.valid
      }
    }
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue
    }
  },
  methods: {
    handleModelInput(event) {
      const value = event.target.value
      this.$emit('input', value)
      this.$emit('change', value)
      this.validate('input')
    },
    handleMdFocus(event) {
      this.focus = true
      this.$emit('focus', event)
      if (this.placeholder && this.placeholder !== '') {
        this.fillPlaceHolder = this.placeholder
      }
    },
    handleMdBlur(event) {
      this.focus = false
      this.$emit('blur', event)
      this.fillPlaceHolder = null
      this.validate('blur')
    },

    handleClearVal() {
      this.$emit('input', '')
      this.$nextTick(() => {
        this.validate('input')
      })
    },

    isValid() {
      let rules = this.rules || []
      rules = Array.isArray(rules) ? rules : [rules]

      for(let i = 0; i < rules.length; i++) {
        if(rules[i].required && (this.currentValue === '' || typeof this.currentValue === 'undefined')) {
          return false
        } else if(this.currentValue && rules[i].pattern && !rules[i].pattern.test(this.currentValue)) {
          return false
        } else if(this.currentValue && rules[i].validator && !rules[i].validator()) {
          return false
        } else if(this.currentValue && rules[i].min && this.currentValue.length < rules[i].min) {
          return false
        }
      }

      return true
    },

    validate(trigger) {
      let rules = this.rules || []
      rules = Array.isArray(rules) ? rules : [rules]

      for(let i = 0; i < rules.length; i++) {
        if(rules[i].trigger && trigger && rules[i].trigger !== trigger) continue
        if(rules[i].required && (this.currentValue === '' || typeof this.currentValue === 'undefined')) {
          this.valid = false
          this.$emit('validate', this.errMsg = rules[i].message)
          return rules[i].message
        } else if(this.currentValue && rules[i].pattern && !rules[i].pattern.test(this.currentValue)) {
          this.valid = false
          this.$emit('validate', this.errMsg = rules[i].message)
          return rules[i].message
        } else if(this.currentValue && rules[i].validator && !rules[i].validator()) {
          this.valid = false
          this.$emit('validate', this.errMsg = rules[i].message)
          return rules[i].message
        } else if(this.currentValue && rules[i].min && this.currentValue.length < rules[i].min) {
          this.valid = false
          this.$emit('validate', this.errMsg = rules[i].message)
          return rules[i].message
        }
      }

      this.valid = true
      this.$emit('validate', '')
      return ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  // Fonts:
  $font-size-base: 16px;
  $font-size-small: 18px;
  $font-size-smallest: 12px;
  $font-weight-normal: normal;
  $font-weight-bold: bold;
  $apixel: 1px;
  // Utils
  $spacer: 12px;
  $transition: 0.2s ease all;
  $index: 0px;
  // Theme:
  $color-white: white;
  $color-grey: #000;
  $color-grey-light: #BCBCBC;
  $color-blue: #2196F3;
  $color-red: #F44336;
  $color-black: black;
  // Base clases:
  %base-bar-pseudo {
    content: '';
    height: 1px;
    width: 0;
    bottom: 0;
    position: absolute;
    transition: $transition;
  }

  // Component:
  .material-input__component {
    position: relative;
    text-align: left;
    & + .material-input__component {
      margin-top: 54px;
    }
    * {
      box-sizing: border-box;
    }
    .material-input {
      position: relative;
      z-index: 100;
      font-size: $font-size-base;
      padding: $spacer $spacer $spacer - $apixel * 10 $spacer / 2;
      display: block;
      width: 100%;
      border: none;
      line-height: 1;
      border-radius: 0;
      &:focus {
        outline: none;
        border: none;
        border-bottom: 1px solid transparent; // fixes the height issue
      }
    }
    .material-label {
      font-weight: $font-weight-normal;
      transition: $transition;
      font-size: $font-size-small;
    }
    .material-input-bar {
      position: absolute;
      top: 64px;
      display: block;
      width: 100%;
      &:before {
        @extend %base-bar-pseudo;
        left: 50%;
      }
      &:after {
        @extend %base-bar-pseudo;
        right: 50%;
      }
    }
    // Disabled state:
    &.material--disabled {
      .material-input {
        border-bottom-style: dashed;
      }
    }
    // Active state:
    &.material--active {
      .material-input-bar {
        &:before,
        &:after {
          width: 50%;
        }
      }
    }
  }

  .material-input__component {
    background: $color-white;
    .material-input {
      margin-top: 10px;
      padding: 0 0 9px 0;
      line-height: 24px;
      font-size: 17px;
      height: 33px;
      background: none;
      color: $color-black;
      text-indent: $index;
      border-bottom: 1px solid $color-grey-light;
    }
    .material-label {
      color: $color-grey;
      font-size: 15px;
      line-height: 21px;
      font-weight: bold;
    }
    .material-input-bar {
      &:before,
      &:after {
        background: $color-blue;
      }
    }
    .input-after {
      position: absolute;
      right: 0;
      bottom: 3px;
      display: flex;
      align-items: center;
    }
    .mint-field-state {
      margin-right: 5px;
      position: relative;
      z-index: 200;
      &.is-error {
        color: #D0D0D0;
      }
    }
    .err-msg {
      font-size: 12px;
      color: #F44336;
      position: absolute;
      top: 65px;
      left: 0;
      z-index: 300;
    }
    // Errors:
    &.material--has-errors {
      .material-input {
        border-bottom-color: $color-red;
      }
      // &.material--active 
      // .material-label {
      //   color: $color-red;
      // }
      .material-input-bar {
        &:before,
        &:after {
          background: transparent;
        }
      }
    }
    .placeholder {
      position: absolute;
      top: 31px;
      left: 0;
      line-height: 24px;
      font-size: 17px;
      color: #BCBCBC;
    }
  }
</style>
