<template>
  <div ref="modal" class="ui modal">
    <i class="close icon"></i>
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="actions">
      <div class="ui deny button">
        Cancel
      </div>
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      $(this.$refs.modal).modal();
    },
    methods: {
      show() {
        $(this.$refs.modal).modal('show');
      },
      hide() {
        $(this.$refs.modal).modal('hide');
      }
    }
  }
</script>