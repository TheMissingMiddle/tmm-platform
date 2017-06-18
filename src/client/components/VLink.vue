<template>
  <a :href="href" :class="{active: isActive}">
    <slot></slot>
  </a>
</template>

<script>
  export default {
    props: {
      href: String
    },
    computed: {
      isActive () {
        return this.href === window.location.pathname;
      }
    }
  }
</script>

<style scoped>
  .active {
    background: #2185d0
  }
</style>
