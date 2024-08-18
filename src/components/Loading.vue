<template>
  <div :class="['spinner-border', sizeLoadingClass, colorLoadingClass, 'mx-2']" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script>
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
  computed: {
    sizeLoadingClass() {
      return `spinner-border-${this.sizeLoading}`
    },
    colorLoadingClass() {
      return `text-${this.colorLoading}`
    }
  }
}
</script>
