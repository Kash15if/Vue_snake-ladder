<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import db from "./components/firebaseinit";

export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  created() {},
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin: 10px;
}
</style>
