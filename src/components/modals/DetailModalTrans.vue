<template>
  <div
    class="modal modal-lg fade"
    id="detailModal"
    tabindex="-1"
    aria-labelledby="detailModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="detailModalLabel">Detail Transaksi</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            No Transaksi: <b>{{ selectedTransaction.kode }}</b>
          </p>
          <p>
            Nama Customer: <b>{{ selectedTransaction.customer?.name }}</b>
          </p>
          <div v-if="selectedTransaction.details && selectedTransaction.details.length > 0">
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>Kode Barang</th>
                    <th>Nama Barang</th>
                    <th>Harga Bandrol</th>
                    <th>Harga Diskon</th>
                    <th>Diskon</th>
                    <th>Biaya Ongkir</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(items, index) in selectedTransaction.details" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ items.barang.kode }}</td>
                    <td>{{ items.barang.nama }}</td>
                    <td>{{ formatRupiah(items.harga_bandrol) }}</td>
                    <td>{{ formatRupiah(items.harga_diskon) }}</td>
                    <td>{{ formatRupiah(selectedTransaction.diskon) }}</td>
                    <td>{{ formatRupiah(selectedTransaction.ongkir) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p class="my-5">(Harga Diskon Barang - Diskon) + Biaya Ongkir</p>
          <!-- <p class="my-5">
            (<b> {{ formatRupiah(selectedTransaction.subtotal) }}</b> -
            <b>{{ formatRupiah(selectedTransaction.diskon) }}</b
            >) + <b>{{ formatRupiah(selectedTransaction.ongkir) }}</b>
          </p> -->
          <p class="mt-5">
            Harga Total : <b>{{ formatRupiah(selectedTransaction.total_bayar) }}</b>
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatRupiah } from '@/utils/currency'

export default {
  name: 'DetailModalTrans',
  props: {
    selectedTransaction: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const formatRupiahMethod = (value) => formatRupiah(value)

    return {
      formatRupiah: formatRupiahMethod
    }
  }
}
</script>
