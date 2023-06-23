<template>
  <div class="app">
    <el-container>
      <el-header>
        <nav-bar></nav-bar>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import NavBar from "@/components/UI/NavBar.vue";
import {mapActions, mapGetters, mapState} from "vuex";
import router from "@/router";

export default {
    components: {NavBar},
    mounted() {
        if (!this.token) {
            router.push({ path: '/signin' })
        }
    },
    methods: {
        ...mapActions({
            getProfile: "profile/getProfile",
        }),
    },
    computed: {
        ...mapState({
            isAuthenticated: state => state.profile.isAuthenticated
        }),
        ...mapGetters({
            token: "profile/getToken"
        })
    }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;

  font-size: 16px;
  font-family: "Arial", serif;
}
.app {
  width: 80%;
  margin: 0 auto;
}

hr {
  background-color: rgba(50, 50, 50, .3);
  height: 1px;
  margin: 10px 0;
}
</style>