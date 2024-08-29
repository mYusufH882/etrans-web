<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="mb">Edit Barang</h5>
          </div>
          <div class="card-body">
            <!-- Pastikan komponen BarangForm menerima props dan event yang benar -->
            <BarangForm :isEdit="true" :form="form" @submit="updateBarang" :errors="errors" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarangForm from '@/components/forms/BarangForm.vue'
import apiClient from '@/plugins/axios'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'EditBarang',
  components: {
    BarangForm
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const form = reactive({
      kode: '',
      nama: '',
      harga: 0
    })
    const errors = ref({})

    const fetchBarang = async (id) => {
      try {
        const response = await apiClient.get(`/barang/${id}`)
        const barangData = response.data.data

        form.kode = barangData.kode
        form.nama = barangData.nama
        form.harga = barangData.harga
      } catch (error) {
        console.error(error)
      }
    }

    const updateBarang = async () => {
      try {
        const id = route.params.id
        await apiClient.put(`/barang/${id}`, form)
        router.push({ name: 'Barang' })
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
      fetchBarang(id)
    })

    return {
      form,
      errors,
      updateBarang
    }
  }
}
</script>
