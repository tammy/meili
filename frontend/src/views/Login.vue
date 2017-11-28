<template>
  <background-slideshow>
    <div class="container">
      <div class="content">
        <div><h1>meili</h1></div>
        <div class="tagline"><p>Plan your adventure <em>together</em>.</p></div>
        <button class="btn-login" @click="handleLogin()">Login with Facebook</button>
      </div>
    </div>
  </background-slideshow>
</template>

<script>
import { isLoggedIn, login } from '../../utils/auth';
import BackgroundSlideshow from '../components/BackgroundSlideshow';

export default {
  name: 'login',
  components: {
    BackgroundSlideshow,
  },
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
  position: relative;
}

.content {
  width: 500px;
  height: 300px;
  padding: 0px 0;
  margin: 30vh 0 0 -250px;
  position: absolute;
  top: 50%;
  left: 50%;
  /* TODO: Figure out if we should use a background */
  /*background-color: rgba(214, 56, 101, 0.8);*/
  /*border: 1px solid #bce8f1;*/
}

h1, p {
  color: white;
}

h1 {
  font-size: 110px;
  text-shadow: 3px 3px 5px rgba(0,0,0,0.7);
}

p {
  font-size: 30px;
  text-shadow: 2px 2px 2px rgba(0,0,0,0.7);
}

/* Space out children of .content except for the first element */
.content > * {
    margin-top: 15px;
}
.content > *:first-child {
    margin-top: 0px;
}

.btn-login {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
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
