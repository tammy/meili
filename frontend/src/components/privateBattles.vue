<template>
  <div>
    <app-nav></app-nav>
    <h3 class="text-center">Secret Startup Battles</h3>
    <hr/>

    <div class="col-sm-4" v-for="event in plan">
      <div class="panel panel-danger">
        <div class="panel-heading">
          <h3 class="panel-title"> {{ event.name }} </h3>
        </div>
        <div class="panel-body text-left">
          <p><span class="badge alert-info"> Location: </span> 
            {{ event.sponsor }} 
          </p>
          <p><span class="badge alert-danger"> Time: </span>
            <strong> {{ event.seedFund }} </strong>
          </p>
          <p>
            <span class="badge"> Description </span>
            Lorem ipsum
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppNav from './appNav';
// import { isLoggedIn } from '../../utils/auth';
import { getPrivateStartupBattles } from '../../utils/api';

export default {
  name: 'plan',
  components: {
    AppNav,
  },
  data() {
    return {
      plan: '',
    };
  },
  methods: {
    isLoggedIn() {
      return true;
      // return isLoggedIn();
    },
    getItinierary() {
      getPrivateStartupBattles().then((battles) => {
        this.plan = battles;
      });
    },
  },
  mounted() {
    this.getItinierary();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>