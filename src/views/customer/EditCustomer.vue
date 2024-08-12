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

export default {
  name: 'EditCustomer',
  components: {
    CustomerForm
  },
  data() {
    return {
      form: {
        kode: '',
        name: '',
        telp: ''
      },
      errors: {}
    }
  },
  async mounted() {
    const id = this.$route.params.id
    await this.fetchCustomer(id)
  },
  methods: {
    async fetchCustomer(id) {
      try {
        const response = await apiClient.get(`/customer/${id}`)
        console.log(response.data.data)
        this.form = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async updateCustomer() {
      try {
        const id = this.$route.params.id
        await apiClient.put(`/customer/${id}`, this.form)
        this.$router.push({ name: 'Customer' })
      } catch (error) {
        if (error.response.status == 422) {
          this.errors = error.response.data.error || {}
        } else {
          console.error(error)
        }
      }
    }
  }
}
</script>
