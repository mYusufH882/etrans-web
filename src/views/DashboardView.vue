<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="row">
      <div class="col-xxl-8 mb-6 order-0">
        <div class="card">
          <div class="d-flex align-items-start row">
            <div class="col-sm-7">
              <div class="card-body">
                <h5 class="card-title text-primary mb-3">Welcome to the Dashboard page ! 🎉</h5>
                <p class="mb-6">
                  <span v-if="loading"><Loading sizeLoading="sm" colorLoading="secondary" /></span>
                  <span v-else> Have a great day {{ user.name }} !!! </span>
                </p>
              </div>
            </div>
            <div class="col-sm-5 text-center text-sm-left">
              <div class="card-body pb-0 px-0 px-md-6">
                <img
                  src="/assets/img/illustrations/man-with-laptop.png"
                  height="175"
                  class="scaleX-n1-rtl"
                  alt="View Badge User"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Card -->
      <div class="col-lg-6 col-md-4">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="card-title d-flex align-items-start justify-content-between mb-4">
                  <div class="avatar flex-shrink-0">
                    <img
                      src="/assets/img/icons/unicons/chart-success.png"
                      alt="chart success"
                      class="rounded"
                    />
                  </div>
                </div>
                <p class="mb-1">Barang</p>
                <span v-if="loading">
                  <Loading sizeLoading="sm" colorLoading="secondary" />
                </span>
                <span v-else>
                  <h4 class="card-title mb-3">{{ responseData.cards.jumlah_barang || 0 }}</h4>
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="card-title d-flex align-items-start justify-content-between mb-4">
                  <div class="avatar flex-shrink-0">
                    <img
                      src="/assets/img/icons/unicons/wallet-info.png"
                      alt="wallet info"
                      class="rounded"
                    />
                  </div>
                </div>
                <p class="mb-1">Customer</p>
                <span v-if="loading">
                  <Loading sizeLoading="sm" colorLoading="secondary" />
                </span>
                <span v-else>
                  <h4 class="card-title mb-3">{{ responseData.cards.jumlah_customer || 0 }}</h4>
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="card-title d-flex align-items-start justify-content-between mb-4">
                  <div class="avatar flex-shrink-0">
                    <img
                      src="/assets/img/icons/unicons/wallet-info.png"
                      alt="wallet info"
                      class="rounded"
                    />
                  </div>
                </div>
                <p class="mb-1">Transaksi</p>
                <span v-if="loading">
                  <Loading sizeLoading="sm" colorLoading="secondary" />
                </span>
                <span v-else>
                  <h4 class="card-title mb-3">{{ responseData.cards.jumlah_transaksi || 0 }}</h4>
                </span>
              </div>
            </div>
          </div>
          <!-- <div class="col-lg-6 col-md-12 col-6 mb-6">
            <div class="card h-100">
              <div class="card-body">
                <div class="card-title d-flex align-items-start justify-content-between mb-4">
                  <div class="avatar flex-shrink-0">
                    <img
                      src="/assets/img/icons/unicons/wallet-info.png"
                      alt="wallet info"
                      class="rounded"
                    />
                  </div>
                  <div class="dropdown">
                    <button
                      class="btn p-0"
                      type="button"
                      id="cardOpt6"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="bx bx-dots-vertical-rounded text-muted"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                      <a class="dropdown-item" href="javascript:void(0);">View More</a>
                      <a class="dropdown-item" href="javascript:void(0);">Delete</a>
                    </div>
                  </div>
                </div>
                <p class="mb-1">Sales</p>
                <h4 class="card-title mb-3">$4,679</h4>
                <small class="text-success fw-medium"
                  ><i class="bx bx-up-arrow-alt"></i> +28.42%</small
                >
              </div>
            </div>
          </div> -->
        </div>
      </div>
      <!-- End Card -->
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import apiClient from '@/plugins/axios'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'DashboardView',
  components: {
    Loading
  },
  setup() {
    const store = useStore()

    const loading = ref(false)
    const responseData = ref({
      cards: {
        jumlah_barang: 0,
        jumlah_customer: 0,
        jumlah_transaksi: 0
      },
      statistic: null
    })

    const user = computed(() => store.state.auth.user)

    const fetchDashboard = () => {
      loading.value = true

      apiClient
        .get('/dashboard')
        .then((response) => {
          responseData.value = response.data.data
          console.log(response.data.data)
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          loading.value = false
        })
    }

    onMounted(() => {
      fetchDashboard()
    })

    return {
      loading,
      responseData,
      user
    }
  }
}
</script>
