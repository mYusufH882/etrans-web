<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header d-flex align-items-center justify-content-between">
            <h5 class="mb-0">Daftar <span class="text-primary">Transaksi</span></h5>
            <a href="/create-transaksi" class="btn btn-success">
              <i class="menu-icon tf-icons bx bx-plus"></i> Tambah
            </a>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table id="transaksiTable" class="table table-striped">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>No Transaksi</th>
                    <th>Tanggal</th>
                    <th>Nama Customer</th>
                    <th>Jumlah Barang</th>
                    <th>Sub Total</th>
                    <th>Diskon</th>
                    <th>Ongkir</th>
                    <th>Total</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th colspan="9" class="text-end">Grand Total:</th>
                    <th id="grandTotalFooter" class="total-column"></th>
                  </tr>
                </tfoot>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading-overlay d-flex justify-content-center align-items-center">
      <Loading sizeLoading="lg" colorLoading="secondary" />
    </div>

    <DetailModalTrans :selectedTransaction="selectedTransaction" />
  </div>
</template>

<script>
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import apiClient from '@/plugins/axios'
import { formatRupiah } from '@/utils/currency'
import { formatDate } from '@/utils/date'
import DetailModalTrans from '@/components/modals/DetailModalTrans.vue'
import Loading from '@/components/Loading.vue'
import { onBeforeMount, onMounted, ref } from 'vue'

export default {
  name: 'TransaksiList',
  components: {
    DetailModalTrans,
    Loading
  },
  setup() {
    const loading = ref(false)
    const table = ref(null)
    const selectedTransaction = ref({})

    const fetchTransaksi = async () => {
      try {
        const response = await apiClient.get('/transactions')
        const data = response.data.data
        console.log(data)
        updateDataTable(data)
      } catch (error) {
        console.error(error)
      }
    }

    const initializeDataTable = () => {
      table.value = $('#transaksiTable').DataTable({
        columns: [
          { data: 'no' },
          { data: 'no_transaksi' },
          {
            data: 'tanggal',
            createdCell: (td, cellData) => {
              $(td).text(formatDate(cellData))
            }
          },
          { data: 'nama_customer' },
          { data: 'jumlah_barang' },
          {
            data: 'subtotal',
            createdCell: (td, cellData) => {
              $(td).text(formatRupiah(cellData))
            }
          },
          {
            data: 'diskon',
            createdCell: (td, cellData) => {
              $(td).text(formatRupiah(cellData))
            }
          },
          {
            data: 'ongkir',
            createdCell: (td, cellData) => {
              $(td).text(formatRupiah(cellData))
            }
          },
          {
            data: 'total',
            createdCell: (td, cellData) => {
              $(td).text(formatRupiah(cellData))
            }
          },
          {
            data: null,
            createdCell: (td, rowData) => {
              const detailButton = $('<button>')
                .text('Detail')
                .addClass('btn btn-info btn-sm')
                .on('click', () => {
                  showDetailModal(rowData)
                })

              $(td).empty().append(detailButton)
            }
          }
        ],
        footerCallback: function (row, data, start, end, display) {
          let api = this.api()

          let grandTotal = api
            .column(8, { page: 'current' })
            .data()
            .reduce(function (a, b) {
              return parseFloat(a) + parseFloat(b)
            }, 0)

          $(api.column(8).footer()).html(formatRupiah(grandTotal))
        }
      })
    }

    const updateDataTable = (data) => {
      if (table.value) {
        const formattedData = formatData(data)
        table.value.clear().rows.add(formattedData).draw()
      }
    }

    const showDetailModal = async (rowData) => {
      try {
        loading.value = true
        const dTrans = await apiClient.get(`transactions-detail/${rowData.id}`)
        selectedTransaction.value = dTrans.data.data
        console.log(dTrans.data.data)

        const detailModal = new bootstrap.Modal(document.getElementById('detailModal'))
        detailModal.show()
      } catch (error) {
        console.error('error response : ', error)
      } finally {
        loading.value = false
      }
    }

    const formatData = (data) => {
      const formatted = []
      let no = 1
      data.forEach((transaksi) => {
        let totalJumlahBarang = 0,
          totalSubTotal = 0

        transaksi.details.forEach((detail) => {
          let JumlahBarang = parseInt(detail.jumlah_barang, 10) || 0
          let SubTotal = parseFloat(detail.total) || 0

          totalJumlahBarang += JumlahBarang
          totalSubTotal += SubTotal
        })

        formatted.push({
          id: transaksi.id,
          no: no++,
          no_transaksi: transaksi.no_transaksi,
          tanggal: transaksi.tanggal,
          nama_customer: transaksi.nama_customer,
          jumlah_barang: totalJumlahBarang + ' Barang',
          subtotal: totalSubTotal,
          diskon: transaksi.diskon,
          ongkir: transaksi.ongkir,
          total: transaksi.total
        })
      })

      return formatted
    }

    onMounted(() => {
      fetchTransaksi()
      initializeDataTable()
    })

    onBeforeMount(() => {
      if (table.value) {
        table.value.destroy()
      }
    })

    return {
      loading,
      table,
      selectedTransaction,
      showDetailModal
    }
  }
}
</script>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8); /* Background semi-transparan */
  z-index: 1050; /* Pastikan overlay di atas konten lain */
}
</style>
