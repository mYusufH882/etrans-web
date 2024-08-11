<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="pb-1 mb-6">
      <div class="row">
        <div class="col-xxl">
          <div class="card mb-6">
            <div class="card-header d-flex align-items-center justify-content-between">
              <h5 class="mb-0">Transaksi Form</h5>
              <small class="text-muted float-end">Buat Transaksi Baru</small>
            </div>
            <div class="card-body">
              <a href="/transaksi" class="btn btn-warning">Kembali</a>
              <div class="row g-6">
                <div class="col-md-6">
                  <div class="card">
                    <h5 class="card-header">Transaksi</h5>
                    <div class="card-body">
                      <div class="mb-4">
                        <label for="exampleFormControlReadOnlyInput1" class="form-label">No</label>
                        <input
                          class="form-control"
                          type="text"
                          id="exampleFormControlReadOnlyInput1"
                          placeholder=""
                          readonly
                          v-model="transaksi.kode"
                        />
                      </div>
                      <div class="mb-4">
                        <label for="html5-date-input" class="form-label">Tanggal</label>
                        <input
                          class="form-control"
                          type="date"
                          id="html5-date-input"
                          v-model="transaksi.tanggal"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card">
                    <h5 class="card-header">Customer</h5>
                    <div class="card-body">
                      <div class="mb-4">
                        <label for="defaultSelect" class="form-label">Kode</label>
                        <select
                          id="defaultSelect"
                          class="form-select"
                          v-model="customer.kode"
                          @change="updateCustomerDetails"
                        >
                          <option value="0">Pilih Kode</option>
                          <option v-for="cust in customers" :key="cust.id" :value="cust.id">
                            {{ cust.kode }} - {{ cust.name }}
                          </option>
                        </select>
                      </div>
                      <div class="mb-4">
                        <label for="defaultFormControlInput" class="form-label">Nama</label>
                        <input
                          type="text"
                          class="form-control"
                          id="defaultFormControlInput"
                          placeholder="John Doe"
                          v-model="customer.nama"
                          readonly
                        />
                      </div>
                      <div class="mb-4">
                        <label for="defaultFormControlInputTel" class="form-label">No. telp</label>
                        <input
                          type="text"
                          class="form-control"
                          id="defaultFormControlInputTel"
                          placeholder="08123456789"
                          v-model="customer.telepon"
                          readonly
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="card">
                    <h5 class="card-header">Pilih Barang</h5>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th>Hapus</th>
                              <th>No</th>
                              <th>Kode Barang</th>
                              <th>Nama Barang</th>
                              <th>Qty</th>
                              <th>Harga Bandrol</th>
                              <th>(%)</th>
                              <th>(Rp)</th>
                              <th>Harga Diskon</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in items" :key="index">
                              <td>
                                <button class="btn btn-danger" @click="deleteItem(index)">
                                  Hapus
                                </button>
                              </td>
                              <td>{{ index + 1 }}</td>
                              <td>
                                <select
                                  class="form-select fixed-width"
                                  v-model="item.barang_id"
                                  @change="updateItemTable(item)"
                                >
                                  <option value="0">Pilih Barang</option>
                                  <option
                                    v-for="barang in barangs"
                                    :key="barang.id"
                                    :value="barang.id"
                                  >
                                    {{ barang.kode }} - {{ barang.nama }}
                                  </option>
                                </select>
                              </td>
                              <td>
                                <input
                                  class="form-control fixed-width"
                                  type="text"
                                  :value="item.namaBarang"
                                  readonly
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  class="form-control short-width"
                                  v-model.number="item.qty"
                                  @input="calculateTotal(item)"
                                />
                              </td>
                              <td>
                                <input
                                  class="form-control fixed-width"
                                  :value="formattedHargaBandrol(item)"
                                  @input="updateHargaBandrol($event, item)"
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  class="form-control fixed-width"
                                  v-model.number="item.diskonPersen"
                                  @input="calculateTotal(item)"
                                />
                              </td>
                              <td>
                                <input
                                  class="form-control fixed-width"
                                  :value="formattedTotal(item)"
                                />
                              </td>
                              <td>{{ formatCurrency(item.hargaDiskon) }}</td>
                              <td>{{ formatCurrency(item.total) }}</td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colspan="9" class="text-end">Sub Total:</td>
                              <td colspan="2">{{ formatCurrency(subTotal) }}</td>
                            </tr>
                            <tr>
                              <td colspan="9" class="text-end">Diskon:</td>
                              <td colspan="2">
                                <input
                                  class="form-control fixed-width"
                                  :value="formattedDiskonAll"
                                  @input="updateDiskonAll"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td colspan="9" class="text-end">Ongkir:</td>
                              <td colspan="2">
                                <input
                                  class="form-control fixed-width"
                                  :value="formattedOngkirAll"
                                  @input="updateOngkirAll"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td colspan="9" class="text-end">Total Bayar:</td>
                              <td colspan="2">{{ formatCurrency(grandTotal) }}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                    <div class="card-footer">
                      <button class="btn btn-primary mx-2" @click="addItem">Tambah</button>
                      <button class="btn btn-success mx-2" @click="save">Simpan</button>
                      <button class="btn btn-secondary mx-2" @click="cancel">Batal</button>
                      <a href="/transaksi" class="btn btn-warning mx-2">Kembali</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/plugins/axios'
import { formatRupiah, parseRupiah } from '@/utils/currency'
import { formatPhoneNumber } from '@/utils/phoneHelper'

export default {
  data() {
    return {
      transaksi: {
        kode: '',
        tanggal: ''
      },
      customer: {
        kode: '',
        nama: '',
        telepon: ''
      },
      items: [],
      subTotal: 0,
      diskon: 0,
      ongkir: 0,
      grandTotal: 0,
      customers: [],
      barangs: []
    }
  },
  created() {
    this.fetchCustomers()
    this.fetchBarangs()
    this.generateTransactionNumber()
  },
  computed: {
    formattedHargaBandrol() {
      return (item) => formatRupiah(item.hargaBandrol)
    },
    formattedDiskonAll() {
      return formatRupiah(this.diskon)
    },
    formattedOngkirAll() {
      return formatRupiah(this.ongkir)
    },
    formattedTotal() {
      return (item) => formatRupiah(item.total)
    }
  },
  methods: {
    updateDiskonAll(event) {
      const value = parseRupiah(event.target.value)
      this.diskon = parseInt(value, 10)
      event.target.value = formatRupiah(this.diskon)
      this.calculateSubTotal()
    },
    updateOngkirAll(event) {
      const value = parseRupiah(event.target.value)
      this.ongkir = parseInt(value, 10)
      event.target.value = formatRupiah(this.ongkir)
      this.calculateSubTotal()
    },
    updateHargaBandrol(event, item) {
      const value = this.parseRupiah(event.target.value)
      item.hargaBandrol = parseInt(value, 10)
      this.calculateTotal(item)
      event.target.value = formatRupiah(item.hargaBandrol)
    },
    async fetchCustomers() {
      try {
        const response = await apiClient.get('/customer')
        this.customers = response.data.data
      } catch (error) {
        console.error('Error fetching customers:', error)
      }
    },
    async fetchLastTransactionNumber() {
      try {
        const response = await apiClient.get('/last-transaction-number')
        return response.data.data
      } catch (error) {
        console.error('Error fetching last transaction number:', error)
        return null
      }
    },
    async fetchBarangs() {
      try {
        const response = await apiClient.get('/barang')
        this.barangs = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async generateTransactionNumber() {
      const lastNumber = await this.fetchLastTransactionNumber()
      if (lastNumber) {
        const [yearMonth, serial] = lastNumber.split('-')
        const nextSerialNumber = (parseInt(serial, 10) + 1).toString().padStart(4, '0')
        this.transaksi.kode = `${yearMonth}-${nextSerialNumber}`
      } else {
        // lastNumber is null
        const currentDate = new Date()
        const yearMonth = `${currentDate.getFullYear().toString().slice(2)}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`
        this.transaksi.kode = `${yearMonth}-0001`
      }
    },
    updateCustomerDetails() {
      const selectedCustomer = this.customers.find(
        (cust) => cust.id === parseInt(this.customer.kode)
      )
      if (selectedCustomer) {
        this.customer.nama = selectedCustomer.name
        this.customer.telepon = formatPhoneNumber(selectedCustomer.telp)
      } else {
        this.customer.nama = ''
        this.customer.telepon = ''
      }
    },
    updateItemTable(item) {
      const selectedBarang = this.barangs.find((barang) => barang.id === item.barang_id)
      if (selectedBarang) {
        item.namaBarang = selectedBarang.nama
      } else {
        item.namaBarang = ''
      }
    },
    addItem() {
      this.items.push({
        barang_id: '',
        namaBarang: '',
        qty: 1,
        hargaBandrol: 0,
        diskonPersen: 0,
        diskonRupiah: 0,
        hargaDiskon: 0,
        total: 0
      })
    },
    deleteItem(index) {
      this.items.splice(index, 1)
      this.calculateGrandTotal()
    },
    calculateTotal(item) {
      item.diskonRupiah = (item.hargaBandrol * item.diskonPersen) / 100
      item.hargaDiskon = item.hargaBandrol - item.diskonRupiah
      item.total = item.qty * item.hargaDiskon
      this.calculateSubTotal()
    },
    calculateSubTotal() {
      this.subTotal = this.items.reduce((acc, item) => acc + item.total, 0)
      this.calculateGrandTotal()
    },
    calculateGrandTotal() {
      this.grandTotal = this.subTotal - (this.diskon + this.ongkir)
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
    },
    parseRupiah(value) {
      return value.replace(/[^\d]/g, '')
    },
    async save() {
      const payload = {
        kode: this.transaksi.kode,
        tgl: this.transaksi.tanggal,
        cust_id: parseInt(this.customer.kode),
        details: this.items.map((item) => ({
          barang_id: parseInt(item.barang_id),
          harga_bandrol: item.hargaBandrol,
          qty: item.qty,
          diskon_pct: item.diskonPersen,
          diskon_nilai: item.diskonRupiah,
          harga_diskon: item.hargaDiskon,
          total: item.total
        })),
        subtotal: this.subTotal,
        diskon: this.diskon,
        ongkir: this.ongkir,
        total_bayar: this.grandTotal
      }

      //Debug payload
      // console.log(payload)

      try {
        const response = await apiClient.post('/transactions', payload)
        //Debug response
        console.log('Transaction saved successfully:', response.data.data)
        this.$router.push({ name: 'Transaksi' })
      } catch (error) {
        console.error('Error saving transaction:', error)
      }
    },
    cancel() {
      this.transaksi = {
        tanggal: ''
      }
      this.customer = {
        name: '',
        telepon: ''
      }
      this.items = []
      this.subTotal = 0
      this.diskon = 0
      this.ongkir = 0
      this.grandTotal = 0
    }
  }
}
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}
.table {
  min-width: 1200px;
}
.text-end {
  text-align: right;
}
.fixed-width {
  min-width: 150px;
}
.short-width {
  width: 80px;
}
</style>
