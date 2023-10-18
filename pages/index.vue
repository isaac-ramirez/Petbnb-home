<template>
  <div id="app"><Finder /></div>
</template>

<script setup>
import Finder from '@/components/home/Finder.vue';
</script>

<style lang="scss" scoped>
#app {
  @include flex(row, center, center);
  height: 100vh;
}
</style>
