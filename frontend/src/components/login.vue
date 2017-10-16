<template>
  <div class="container container-table">
    <div>
      <div>
        <h1 id="title">Meili</h1>
      </div>
      <button class="btn-login btn log" @click="handleLogin()">Log In With Facebook</button>

    </div>
  </div>
</template>
<script>

import { isLoggedIn, login } from '../../utils/auth';

export default {
  name: 'login',
  beforeRouteEnter(to, from, next) {
    if (isLoggedIn()) {
      next('/trip');
    } else {
      next();
    }
  },
  methods: {
    handleLogin() {
      login();
    },
  },
};
</script>

<style scoped>
.container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

#title {
  margin-bottom: 50px;
  font-size: 145px;
}

.btn-login {
  padding: 15px 40px;
  font-size: 25px;
  background-color: gray;
  color: white;
}
</style>
