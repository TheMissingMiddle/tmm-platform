<template>
  <div ref="accordion" class="ui styled accordion">
    <slot></slot>
  </div>
</template>

<style>
  .ui.styled.accordion {
    width: 100%;
  }
</style>

<script>
  export default {
    mounted() {
      if(!$(this.$refs.accordion).parents('.ui.accordion').length){
        $(this.$refs.accordion).accordion({
          exclusive: false
        });
      }
    }
  }
</script>