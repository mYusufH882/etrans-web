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
                    <h1>Login</h1>
                  </div>
                  <h4 class="mb-1">Welcome to E-Trans ! 👋</h4>
                  <p class="mb-6">The greatest app for manage your transactions !!!</p>
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
                      <button type="submit" class="btn btn-primary">Login</button>
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
import { mapActions } from 'vuex'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      try {
        await this.login({ email: this.email, password: this.password })
        this.$router.push({ name: 'Dashboard' })
      } catch (error) {
        console.error('Login error:', error)
      }
    }
  }
}
</script>
