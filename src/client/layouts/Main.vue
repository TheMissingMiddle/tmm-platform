<template>
  <div class="ui container">
    <div class="ui top attached stackable menu">
      <a href="/" class="item">
        <img src="assets/logo.png">
      </a>
      <slot name="navigation-bar"></slot>
      <div class="right item">
        <span class="text"><b>Welcome,</b> {{ user.email }}</span>
      </div>
      <div class="right menu">
        <div ref="settings-menu" class="ui simple dropdown icon item">
          <i class="settings icon"></i>
          <div class="menu">
            <div class="item" @click="doLogout">Logout</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ui segment">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .ui.menu  .right.menu {
    margin: 0 !important;
  }
</style>

<script>
  import page from 'page';

  export default {
    data() {
      return {
        user: {}
      };
    },
    mounted() {
      app.authenticate().then(() => this.user = JSON.parse(window.localStorage.getItem('tmm-user')))
        .catch((error) => console.log(error));
    },
    methods: {
      doLogout() {
        app.logout().then(() => {
          window.localStorage.removeItem('tmm-user');
          page('/login');
        }).catch((error) => console.log(error));
      }
    }
  }
</script>
