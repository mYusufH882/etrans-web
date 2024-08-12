<template>
  <div class="col-xxl">
    <div class="card mb-6">
      <div class="card-header d-flex align-items-center justify-content-between">
        <h5 class="mb-0">Master Barang</h5>
        <small class="text-muted float-end">Buat Data Master Barang Baru</small>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="row mb-6">
            <label class="col-sm-2 col-form-label" for="kode">Kode Barang</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="kode"
                v-model="form.kode"
                placeholder="Masukkan Kode Barang ..."
              />
              <small v-if="errors.kode" class="text-danger">{{ errors.kode[0] }}</small>
            </div>
          </div>
          <div class="row mb-6">
            <label class="col-sm-2 col-form-label" for="nama">Nama Barang</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="nama"
                v-model="form.nama"
                placeholder="Masukkan Nama Barang ..."
              />
              <small v-if="errors.nama" class="text-danger">{{ errors.nama[0] }}</small>
            </div>
          </div>
          <div class="row mb-6">
            <label class="col-sm-2 col-form-label" for="harga">Harga Barang</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="harga"
                v-model="formattedHarga"
                @input="updateHarga"
                placeholder="Masukkan Harga Barang ..."
              />
              <small v-if="errors.harga" class="text-danger">{{ errors.harga[0] }}</small>
            </div>
          </div>
          <div class="row justify-content-end">
            <div class="col-sm-10">
              <button
                type="submit"
                class="mx-2 btn"
                :class="isEdit ? 'btn-warning' : 'btn-primary'"
              >
                {{ isEdit ? 'Ubah' : 'Simpan' }}
              </button>
              <a href="/barang" class="btn btn-secondary">Kembali</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { formatRupiah, parseRupiah } from '@/utils/currency'

export default {
  name: 'BarangForm',
  props: {
    form: {
      type: Object,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    formattedHarga: {
      get() {
        return formatRupiah(this.form.harga)
      },
      set(value) {
        this.form.harga = parseRupiah(value)
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit', { ...this.form })
    },
    updateHarga(event) {
      this.form.harga = parseRupiah(event.target.value)
      event.target.value = formatRupiah(this.form.harga)
    }
  }
}
</script>
