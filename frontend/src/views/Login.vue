<template>
  <div class="container">
    <div class="content">
      <div><h1>meili</h1></div>
      <button class="btn-login" @click="handleLogin()">Login with Facebook</button>
    </div>
  </div>
</template>

<script>
import { isLoggedIn, login } from '../../utils/auth';

export default {
  name: 'login',
  beforeRouteEnter(to, from, next) {
    if (isLoggedIn()) {
      next('/trips');
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
  background-color: transparent;
  position: relative;
}

.content {
  width: 500px;
  height: 300px;
  padding: 50px 0;
  margin: 30vh 0 0 -250px;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #d63865;
  /*border: 1px solid #bce8f1;*/
}

h1 {
  font-size: 80px;
  color: white;
}

.btn-login {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
  background-color: #4C69BA;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
}

.btn-login:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
  border-right: #364e92 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
}

.btn-login:focus {
  outline: none;
}

.btn-login:hover, .btn-login:focus {
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);
}

.btn-login:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}
</style>
