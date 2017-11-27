<template>
  <div class="container">
    <app-nav></app-nav>
    <div class="content">
      <div><h1>meili</h1></div>
      <div class="not-found">Oops! This page doesn't exist. Head back <a src="/">home</a>.</div>
    </div>
  </div>
</template>

<script>
import AppNav from '../components/AppNav';

export default {
  name: 'notFound',
  components: { AppNav },
};
</script>

<style scoped>
.navbar-brand {
  font-weight: 600;
}

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
}

h1 {
  font-size: 80px;
  color: white;
}

.not-found {
  box-sizing: border-box;
  position: relative;
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: center;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
  font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;
  text-shadow: 0 -1px 0 #354C8C;
}

</style>
