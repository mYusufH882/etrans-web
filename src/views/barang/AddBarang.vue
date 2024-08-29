<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <h5 class="pb-1 mb-6">Barang Form</h5>
    <div class="row">
      <BarangForm :form="barang" @submit="handleSubmit" :errors="errors" />
    </div>
  </div>
</template>

<script>
import BarangForm from '@/components/forms/BarangForm.vue'
import apiClient from '@/plugins/axios'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AddBarang',
  components: {
    BarangForm
  },
  setup() {
    const router = useRouter()
    const barang = reactive({
      barang: {
        kode: '',
        nama: '',
        harga: 0
      }
    })
    const errors = ref({})
    const isSubmitting = ref(false)

    const handleSubmit = async (barangData) => {
      if (isSubmitting.value) return
      isSubmitting.value = true

      try {
        const response = await apiClient.post('/barang', barangData)
        if (response) {
          router.push({ name: 'Barang' })
        }
      } catch (error) {
        if (error) {
          errors.value = error.response.data.error || {}
        } else {
          console.error(error)
        }
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      barang,
      errors,
      isSubmitting,
      handleSubmit
    }
  }
}
</script>
