<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header d-flex align-items-center justify-content-between">
            <h5 class="mb-0">Daftar Transaksi</h5>
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
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th colspan="8" class="text-end">Grand Total:</th>
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
  </div>
</template>

<script>
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import apiClient from '@/plugins/axios'
import { formatRupiah } from '@/utils/currency'
import { formatDate } from '@/utils/date'

export default {
  name: 'TransaksiList',
  data() {
    return {
      table: null
    }
  },
  mounted() {
    this.fetchTransaksi()
    this.intializeDataTable()
  },
  beforeUnmount() {
    if (this.table) {
      this.table.destroy()
    }
  },
  methods: {
    async fetchTransaksi() {
      try {
        const response = await apiClient.get('/transactions')
        const data = response.data.data
        this.updateDataTable(data)
      } catch (error) {
        console.error(error)
      }
    },
    intializeDataTable() {
      this.$nextTick(() => {
        this.table = $('#transaksiTable').DataTable({
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
      })
    },
    updateDataTable(data) {
      if (this.table) {
        const formattedData = this.formatData(data)
        this.table.clear().rows.add(formattedData).draw()
      }
    },
    formatData(data) {
      const formatted = []
      let no = 1
      data.forEach((transaksi) => {
        transaksi.details.forEach((detail) => {
          formatted.push({
            no: no++,
            no_transaksi: transaksi.no_transaksi,
            tanggal: transaksi.tanggal,
            nama_customer: transaksi.nama_customer,
            jumlah_barang: detail.jumlah_barang,
            subtotal: transaksi.subtotal,
            diskon: transaksi.diskon,
            ongkir: transaksi.ongkir,
            total: detail.total
          })
        })
      })

      return formatted
    }
  }
}
</script>
