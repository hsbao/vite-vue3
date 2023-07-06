<template>
  <svg v-bind="$attrs" class="svg-icon" :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup name="SvgIcon">
  import { computed, type CSSProperties } from 'vue'

  const props = defineProps({
    prefix: {
      type: String,
      default: 'svg-icon',
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      default: 16,
    },
    sizeArray: {
      type: Array,
      default: () => [],
    },
  })
  const symbolId = computed(() => `#${props.prefix}-${props.name}`)
  const getStyle = computed((): CSSProperties => {
    const { size, sizeArray } = props
    const s = `${size}`.replace('px', '').concat('px')
    // 针对svg 长宽不一致的问题
    if (sizeArray.length == 2) {
      return {
        width: `${sizeArray[0]}`.replace('px', '').concat('px'),
        height: `${sizeArray[1]}`.replace('px', '').concat('px'),
      }
    }
    return {
      width: s,
      height: s,
    }
  })
</script>

<style lang="scss" scoped>
  .svg-icon {
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentcolor;
  }
</style>
