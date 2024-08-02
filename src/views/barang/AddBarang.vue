<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <h5 class="pb-1 mb-6">Barang Form</h5>
    <div class="row">
      <BarangForm :form="barang" @submit="handleSubmit" />
    </div>
  </div>
</template>

<script>
import BarangForm from '@/components/forms/BarangForm.vue'
import apiClient from '@/plugins/axios'

export default {
  name: 'AddBarang',
  components: {
    BarangForm
  },
  data() {
    return {
      barang: {
        kode: '',
        nama: '',
        harga: 0
      }
    }
  },
  methods: {
    async handleSubmit(barangData) {
      try {
        const response = await apiClient.post('/barang', barangData)
        console.log('Barang berhasil ditambahkan:', response.data.data)
        this.$router.push({ name: 'Barang' })
      } catch (error) {
        console.error('Create Barang Error : ', error)
      }
    }
  }
}
</script>
