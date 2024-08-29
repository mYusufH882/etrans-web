<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header d-flex align-items-center justify-content-between">
            <h5 class="mb-0">Daftar <span class="text-primary">Customer</span></h5>
            <a href="/create-customer" class="btn btn-success">
              <i class="menu-icon tf-icons bx bx-plus"></i>Tambah
            </a>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table id="customerTable" class="table table-striped">
                <thead>
                  <tr>
                    <th>Kode Customer</th>
                    <th>Nama Customer</th>
                    <th>Telepon Customer</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody @editCustomer="editCustomer" @deleteCustomer="deleteCustomer"></tbody>
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
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import apiClient from '@/plugins/axios'
import { formatPhoneNumber } from '@/utils/phoneHelper'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'CustomerList',
  components: {
    DeleteModal
  },
  setup() {
    const router = useRouter()
    const table = ref(null)
    const customerToDelete = ref(null)

    const fetchCustomer = async () => {
      try {
        const response = apiClient.get('/customer')
        const data = (await response).data.data.map((item) => ({
          ...item,
          telp: formatPhoneNumber(item.telp)
        }))

        updateDataTable(data)
      } catch (error) {
        console.error(error)
      }
    }

    const initializeDataTable = () => {
      table.value = $('#customerTable').DataTable({
        columns: [
          { data: 'kode' },
          { data: 'name' },
          { data: 'telp' },
          {
            data: null,
            render: (data) =>
              `
              <button class="btn btn-warning btn-sm edit-btn" data-id="${data.id}">Edit</button>
              <button class="btn btn-danger delete-btn btn-sm" data-id="${data.id}">Delete</button>
            `
          }
        ]
      })

      $('#customerTable').on('click', '.edit-btn', (event) => {
        const id = $(event.currentTarget).data('id')
        editCustomer(id)
      })

      $('#customerTable').on('click', '.delete-btn', (event) => {
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
      customerToDelete.value = id
      const deleteModal = new bootstrap.Modal($('#deleteModal'))
      deleteModal.show()
    }

    const confirmDelete = async () => {
      try {
        await apiClient.delete(`/customer/${customerToDelete.value}`)
        customerToDelete.value = null
        const deleteModal = bootstrap.Modal.getInstance($('#deleteModal'))
        deleteModal.hide()
        fetchCustomer()
      } catch (error) {
        console.error(error)
      }
    }

    const editCustomer = (id) => {
      router.push({ name: 'EditCustomer', params: { id } })
    }

    onMounted(() => {
      initializeDataTable()
      fetchCustomer()
    })

    onBeforeUnmount(() => {
      if (table.value) {
        table.value.destroy()
      }
    })

    return {
      confirmDelete,
      showDeleteModal,
      customerToDelete
    }
  }
}
</script>
