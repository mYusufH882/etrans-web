<template>
  <div :class="['spinner-border', sizeLoadingClass, colorLoadingClass, 'mx-2']" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Loading',
  props: {
    sizeLoading: {
      type: String,
      required: true
    },
    colorLoading: {
      type: String
    }
  },
  setup({ sizeLoading, colorLoading }) {
    const sizeLoadingClass = computed(() => {
      return `spinner-border-${sizeLoading}`
    })

    const colorLoadingClass = computed(() => {
      return `text-${colorLoading}`
    })

    return {
      sizeLoadingClass,
      colorLoadingClass
    }
  }
}
</script>
