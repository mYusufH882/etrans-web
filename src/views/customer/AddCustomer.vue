<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <h5 class="pb-1 mb-6">Customer Form</h5>
    <div class="row">
      <CustomerForm :form="customer" @submit="handleSubmit" />
    </div>
  </div>
</template>

<script>
import CustomerForm from '@/components/forms/CustomerForm.vue'
import apiClient from '@/plugins/axios'

export default {
  name: 'AddCustomer',
  components: {
    CustomerForm
  },
  data() {
    return {
      customer: {
        kode: '',
        name: '',
        telp: ''
      }
    }
  },
  methods: {
    async handleSubmit(customerData) {
      try {
        const response = await apiClient.post('/customer', customerData)
        console.log('Barang berhasil ditambahkan:', response.data.data)
        this.$router.push({ name: 'Customer' })
      } catch (error) {
        console.error('Create Customer Error:', error)
      }
    }
  }
}
</script>
