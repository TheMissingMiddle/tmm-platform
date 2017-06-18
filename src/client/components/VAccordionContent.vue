<template>
  <div class="content" :class="{active: isActive}">
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