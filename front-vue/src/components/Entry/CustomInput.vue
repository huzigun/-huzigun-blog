<template>
  <div :class="{ on: isFocus }" class="input_box">
    <input
      :id="id"
      :type="type"
      :value="value"
      @input="$emit('change', $event.target.value)"
      @focus="toggleFocus(true)"
      @blur="toggleFocus(false)"
      class="input"
    />
    <label v-show="label" :for="id" :class="{ on: isFocus }" class="label">{{ label }}</label>
    <div v-show="isError">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'custom-input',
  setup() {
    return {};
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    type: {
      type: String,
      default: 'text',
    },
    id: {
      type: String,
      default: '',
    },
    isError: Boolean,
    errorMessage: String,
    label: String,
    value: String,
  },
  data() {
    return {
      isFocus: false,
    } as {
      isFocus: boolean;
    };
  },
  methods: {
    toggleFocus(flag: boolean) {
      this.isFocus = flag;
    },
  },
});
</script>

<style scoped lang="scss">
.input_box {
  position: relative;
  padding-top: 16px;
  border-bottom: 1px solid #ddd;
  margin-top: 20px;

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background-color: #01956a;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    transition: width 0.5s;
    margin-bottom: -1px;
  }

  .input {
    border: none;
    width: 100%;
    border-radius: 0;
    padding: 0;
    line-height: 36px;
    font-size: 1rem;
  }
  .label {
    font-size: 16px;
    color: #999;
    position: absolute;
    left: 0;
    top: 10px;
    transition: all 0.5s;
    padding: 9px 0;
    font-weight: 500;
  }

  &.on {
    .label {
      top: 0;
      font-size: 11px;
      padding-top: 0;
      color: #01956a;
    }

    &::after {
      width: 100%;
    }
  }
}
</style>
