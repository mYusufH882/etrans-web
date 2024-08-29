<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <h5 class="pb-1 mb-6">Edit Customer</h5>
    <div class="row">
      <CustomerForm :isEdit="true" :form="form" @submit="updateCustomer" :errors="errors" />
    </div>
  </div>
</template>

<script>
import CustomerForm from '@/components/forms/CustomerForm.vue'
import apiClient from '@/plugins/axios'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'EditCustomer',
  components: {
    CustomerForm
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const form = reactive({
      kode: '',
      name: '',
      telp: ''
    })
    const errors = ref({})

    const fetchCustomer = async (id) => {
      try {
        const response = await apiClient.get(`/customer/${id}`)
        const customerData = response.data.data

        form.kode = customerData.kode
        form.name = customerData.name
        form.telp = customerData.telp
      } catch (error) {
        console.error(error)
      }
    }

    const updateCustomer = async () => {
      try {
        const id = route.params.id
        await apiClient.put(`/customer/${id}`, form)
        router.push({ name: 'Customer' })
      } catch (error) {
        if (error.response && error.response.status === 422) {
          errors.value = error.response.data.error || {}
        } else {
          console.error(error)
        }
      }
    }

    onMounted(() => {
      const id = route.params.id
      fetchCustomer(id)
    })

    return {
      form,
      errors,
      updateCustomer
    }
  }
}
</script>
