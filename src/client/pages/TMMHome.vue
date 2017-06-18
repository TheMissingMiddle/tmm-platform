<template>
  <main-layout>
  	<template slot="navigation-bar">
      <v-link href="/tmm-organizations" class="item">Organizations</v-link>
      <v-link href="/tmm-experts" class="item">Experts</v-link>
    </template>
    <p>Welcome home</p>
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue';
  import VLink from '../components/VLink.vue';

  export default {
    components: {
      MainLayout,
      VLink
    }
  }
</script>
