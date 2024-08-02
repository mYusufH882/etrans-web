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
                  <h4 class="mb-1">Welcome to TodoList Yusuf ! 👋</h4>
                  <p class="mb-6">
                    The greatest app for make better todo activities and increase your productivity
                    !!!
                  </p>
                  <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                      <label for="email" class="form-label">Email : </label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        v-model="email"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        v-model="password"
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
export default {
  name: 'LoginView'
}
</script>
