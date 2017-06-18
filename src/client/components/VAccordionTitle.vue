<template>
  <div class="title" :class="{active: isActive}">
    <i class="dropdown icon"></i>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      isActive: {
        type: Boolean
      }
    }
  }
</script>