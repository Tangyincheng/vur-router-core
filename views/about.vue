<template>
  <div>
    <h1>about-页面</h1>
    <router-link to="/about/a">去a-</router-link>
    <router-link to="/about/b">-去b</router-link>
    <router-view a="1"></router-view>
  </div>
</template>

<script>
export default {
  name: "about",
};
</script>

<style>
</style>