<template>
  <div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y">
      <div class="authentication-inner">
        <div class="container mt-5 justify-content-center align-items-center">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="card px-sm-6 px-0">
                <div class="card-body">
                  <div class="app-brand justify-content-center">
                    <h1>Login E-Trans</h1>
                  </div>
                  <h4 class="mb-1">Welcome to E-<span class="text-primary">Trans</span> ! 👋</h4>
                  <p class="mb-6">The greatest app for manage your transactions !!!</p>

                  <div v-if="errors.general" class="alert alert-danger">
                    {{ errors.general }}
                  </div>

                  <form @submit.prevent="handleLogin">
                    <div class="mb-3">
                      <label for="email" class="form-label">Email :</label>
                      <input
                        v-model="email"
                        type="email"
                        class="form-control"
                        id="email"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">Password</label>
                      <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        id="password"
                        required
                      />
                    </div>

                    <div class="d-grid">
                      <button type="submit" class="btn btn-primary" :disabled="loading">
                        <div v-if="loading">
                          <Loading sizeLoading="sm" colorLoading="danger" />
                        </div>
                        Login
                      </button>
                    </div>
                  </form>
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
import Loading from '@/components/Loading.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'LoginView',
  components: {
    Loading
  },
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const errors = ref({})
    const loading = ref(false)
    const store = useStore()

    const handleLogin = async () => {
      try {
        errors.value = {}
        loading.value = true
        await store.dispatch('login', { email: email.value, password: password.value })
        router.push({ name: 'Dashboard' })
      } catch (error) {
        if (error.isAxiosError) {
          if (error.response && error.response.status === 422) {
            errors.value = error.response.data.message
          } else if (error.response && error.response.status === 401) {
            errors.value.general = 'Email atau password tidak valid.'
          }
        }
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      errors,
      loading,
      handleLogin
    }
  }
}
</script>
