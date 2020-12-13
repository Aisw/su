<template>
  <div id="app" class="wrapper">
    <main-tab-bar/>
  </div>
</template>

<script>

import MainTabBar from "@/components/components/content/mainTabbar/MainTabBar";

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
