<template>
  <h1 @click="onClick">about_b页面 {{ name }}</h1>
</template>

<script>
export default {
  data() {
    return {
      name: "yctang",
    };
  },
  methods: {
    onClick() {
      alert(this.name);
    },
  },
};
</script>

<style>
</style>