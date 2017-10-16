<template>
	<div>
    Meili
	  <button class="btn btn-info log" @click="handleLogin()">Log In With Facebook</button>

  </div>
</template>
<script>

import { isLoggedIn, login } from '../../utils/auth';

export default {
  name: 'login',
  beforeRouteEnter (to, from, next) {
    if (isLoggedIn()) {
      next('/cards');
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