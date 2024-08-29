<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <h5 class="pb-1 mb-6">Customer Form</h5>
    <div class="row">
      <CustomerForm :form="customer" @submit="handleSubmit" :errors="errors" />
    </div>
  </div>
</template>

<script>
import CustomerForm from '@/components/forms/CustomerForm.vue'
import apiClient from '@/plugins/axios'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AddCustomer',
  components: {
    CustomerForm
  },
  setup() {
    const router = useRouter()
    const customer = reactive({
      customer: {
        kode: '',
        name: '',
        telp: ''
      }
    })
    const errors = ref({})
    const isSubmitting = ref(false)

    const handleSubmit = async (customerData) => {
      if (isSubmitting.value) return
      isSubmitting.value = true

      try {
        const response = await apiClient.post('/customer', customerData)
        if (response) {
          router.push({ name: 'Customer' })
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
      customer,
      errors,
      isSubmitting,
      handleSubmit
    }
  }
}
</script>
