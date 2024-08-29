<template>
  <div class="col-xxl">
    <div class="card mb-6">
      <div class="card-header d-flex align-items-center justify-content-between">
        <h5 class="mb-0">Master Customer</h5>
        <small class="text-muted float-end">Buat Data Master Customer Baru</small>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="row mb-6">
            <label class="col-sm-2 col-form-label" for="kode">Kode Customer</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="kode"
                v-model="form.kode"
                placeholder="Masukkan Kode Customer ..."
              />
              <small v-if="errors.kode" class="text-danger">{{ errors.kode[0] }}</small>
            </div>
          </div>
          <div class="row mb-6">
            <label class="col-sm-2 col-form-label" for="name">Nama Customer</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="form.name"
                placeholder="Masukkan Nama Customer ..."
              />
              <small v-if="errors.name" class="text-danger">{{ errors.name[0] }}</small>
            </div>
          </div>
          <div class="row mb-6">
            <label class="col-sm-2 col-form-label" for="telp">Telepon Customer</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="telp"
                v-model="formattedTelp"
                @input="updatePhoneNumber"
                placeholder="Masukkan Nomor Telepon Customer ..."
              />
              <small v-if="errors.telp" class="text-danger">{{ errors.telp[0] }}</small>
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
              <a href="/customer" class="btn btn-secondary">Kembali</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { formatPhoneNumber, parsePhoneNumber } from '@/utils/phoneHelper'
import { computed, toRefs } from 'vue'

export default {
  name: 'CustomerForm',
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
  setup(props, { emit }) {
    const { form, isEdit, errors } = toRefs(props)

    const formattedTelp = computed({
      get() {
        return formatPhoneNumber(form.value.telp)
      },
      set(value) {
        form.value.telp = parsePhoneNumber(value)
      }
    })

    const submitForm = () => {
      const parsedPhone = parsePhoneNumber(form.value.telp)
      emit('submit', { ...form.value, parsedPhone })
    }

    return {
      form,
      isEdit,
      formattedTelp,
      submitForm
    }
  }
}
</script>
