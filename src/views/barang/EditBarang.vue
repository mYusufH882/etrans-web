<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="mb">Edit Barang</h5>
          </div>
          <div class="card-body">
            <BarangForm :isEdit="true" :form="form" @submit="updateBarang" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarangForm from '@/components/forms/BarangForm.vue'
import apiClient from '@/plugins/axios'

export default {
  name: 'EditBarang',
  components: {
    BarangForm
  },
  data() {
    return {
      form: {
        kode: '',
        nama: '',
        harga: 0
      }
    }
  },
  async mounted() {
    const id = this.$route.params.id
    await this.fetchBarang(id)
  },
  methods: {
    async fetchBarang(id) {
      try {
        const response = await apiClient.get(`/barang/${id}`)
        this.form = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async updateBarang() {
      try {
        const id = this.$route.params.id
        await apiClient.put(`/barang/${id}`, this.form)
        this.$router.push({ name: 'Barang' })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
