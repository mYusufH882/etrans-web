<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header d-flex align-items-center justify-content-between">
            <h5 class="mb-0">Daftar <span class="text-primary">Barang</span></h5>
            <a href="/create-barang" class="btn btn-success">
              <i class="menu-icon tf-icons bx bx-plus"></i>Tambah
            </a>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table id="barangTable" class="table table-striped">
                <thead>
                  <tr>
                    <th>Kode Barang</th>
                    <th>Nama Barang</th>
                    <th>Harga Barang</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody @editBarang="editBarang" @deleteBarang="deleteBarang"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DeleteModal @confirm="confirmDelete" />
  </div>
</template>

<script>
import apiClient from '@/plugins/axios'
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import { formatRupiah } from '@/utils/currency'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'BarangList',
  components: {
    DeleteModal
  },
  setup() {
    const router = useRouter()
    const table = ref(null)
    const barangToDelete = ref(null)

    const fetchBarang = async () => {
      try {
        const response = await apiClient.get('/barang')
        const data = response.data.data.map((item) => ({
          ...item,
          harga: formatRupiah(item.harga)
        }))

        updateDataTable(data)
      } catch (error) {
        console.error(error)
      }
    }

    const initializeDataTable = () => {
      table.value = $('#barangTable').DataTable({
        columns: [
          { data: 'kode' },
          { data: 'nama' },
          { data: 'harga' },
          {
            data: null,
            render: (data) => `
              <button class="btn btn-warning btn-sm edit-btn" data-id="${data.id}">Edit</button>
              <button class="btn btn-danger delete-btn btn-sm" data-id="${data.id}">Delete</button>
            `
          }
        ]
      })

      $('#barangTable').on('click', '.edit-btn', (event) => {
        const id = $(event.currentTarget).data('id')
        editBarang(id)
      })

      $('#barangTable').on('click', '.delete-btn', (event) => {
        const id = $(event.currentTarget).data('id')
        showDeleteModal(id)
      })
    }

    const updateDataTable = (data) => {
      if (table.value) {
        table.value.clear().rows.add(data).draw()
      }
    }

    const showDeleteModal = (id) => {
      barangToDelete.value = id
      const deleteModal = new bootstrap.Modal($('#deleteModal'))
      deleteModal.show()
    }

    const confirmDelete = async () => {
      try {
        await apiClient.delete(`/barang/${barangToDelete.value}`)
        barangToDelete.value = null
        const deleteModal = bootstrap.Modal.getInstance($('#deleteModal'))
        deleteModal.hide()
        fetchBarang()
      } catch (error) {
        console.error('Error deleting barang:', error)
      }
    }

    const editBarang = (id) => {
      router.push({ name: 'EditBarang', params: { id } })
    }

    onMounted(() => {
      initializeDataTable()
      fetchBarang()
    })

    onBeforeUnmount(() => {
      if (table.value) {
        table.value.destroy()
      }
    })

    return {
      table,
      barangToDelete,
      showDeleteModal,
      confirmDelete,
      editBarang
    }
  }
}
</script>
