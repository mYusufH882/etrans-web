<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header d-flex align-items-center justify-content-between">
            <h5 class="mb-0">Daftar Barang</h5>
            <a href="/create-barang" class="btn btn-success">
              <i class="menu-icon tf-icons bx bx-plus"></i>Tambah
            </a>
          </div>
          <div class="card-body">
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

export default {
  name: 'BarangList',
  components: {
    DeleteModal
  },
  data() {
    return {
      table: null
    }
  },
  mounted() {
    this.initializeDataTable()
    this.fetchBarang()
  },
  beforeUnmount() {
    if (this.table) {
      this.table.destroy()
    }
  },
  methods: {
    async fetchBarang() {
      try {
        const response = await apiClient.get('/barang')
        const data = response.data.data.map((item) => ({
          ...item,
          harga: formatRupiah(item.harga)
        }))
        this.updateDataTable(data)
      } catch (error) {
        console.error('Error fetching barang:', error)
      }
    },
    initializeDataTable() {
      this.$nextTick(() => {
        this.table = $('#barangTable').DataTable({
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
      })

      $('#barangTable').on('click', '.edit-btn', (event) => {
        const id = $(event.currentTarget).data('id')
        this.editBarang(id)
      })

      $('#barangTable').on('click', '.delete-btn', (event) => {
        const id = $(event.currentTarget).data('id')
        this.showDeleteModal(id)
      })
    },
    updateDataTable(data) {
      if (this.table) {
        this.table.clear().rows.add(data).draw()
      }
    },
    showDeleteModal(id) {
      this.barangToDelete = id
      const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'))
      deleteModal.show()
    },
    async confirmDelete() {
      try {
        await apiClient.delete(`/barang/${this.barangToDelete}`)
        this.barangToDelete = null
        const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'))
        deleteModal.hide()
        this.fetchBarang()
      } catch (error) {
        console.error('Error deleting barang:', error)
      }
    },
    editBarang(id) {
      this.$router.push({ name: 'EditBarang', params: { id } })
    }
  }
}
</script>
