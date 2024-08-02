<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header d-flex align-items-center justify-content-between">
            <h5 class="mb-0">Daftar Customer</h5>
            <a href="/create-customer" class="btn btn-success">
              <i class="menu-icon tf-icons bx bx-plus"></i>Tambah
            </a>
          </div>
          <div class="card-body">
            <table id="customerTable" class="table table-striped">
              <thead>
                <th>Kode Customer</th>
                <th>Nama Customer</th>
                <th>Telepon Customer</th>
                <th>Aksi</th>
              </thead>
              <tbody @editCustomer="editCustomer" @deleteCustomer="deleteCustomer"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <DeleteModal @confirm="confirmDelete" />
  </div>
</template>

<script>
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import apiClient from '@/plugins/axios'
import { formatPhoneNumber } from '@/utils/phoneHelper'

export default {
  name: 'CustomerList',
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
    this.fetchCustomer()
  },
  beforeUnmount() {
    if (this.table) {
      this.table.destroy()
    }
  },
  methods: {
    async fetchCustomer() {
      try {
        const response = await apiClient.get('/customer')
        const data = response.data.data.map((item) => ({
          ...item,
          telp: formatPhoneNumber(item.telp)
        }))
        console.log(data)

        this.updateDataTable(data)
      } catch (error) {
        console.error(error)
      }
    },
    initializeDataTable() {
      this.$nextTick(() => {
        this.table = $('#customerTable').DataTable({
          columns: [
            { data: 'kode' },
            { data: 'name' },
            { data: 'telp' },
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

      $('#customerTable').on('click', '.edit-btn', (event) => {
        const id = $(event.currentTarget).data('id')
        this.editCustomer(id)
      })

      $('#customerTable').on('click', '.delete-btn', (event) => {
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
      this.customerToDelete = id
      const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'))
      deleteModal.show()
    },
    async confirmDelete() {
      try {
        await apiClient.delete(`/customer/${this.customerToDelete}`)
        this.customerToDelete = null
        const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'))
        deleteModal.hide()
        this.fetchCustomer()
      } catch (error) {
        console.error(error)
      }
    },
    editCustomer(id) {
      this.$router.push({ name: 'EditCustomer', params: { id } })
    }
  }
}
</script>
