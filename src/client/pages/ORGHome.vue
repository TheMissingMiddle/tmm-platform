<template>
  <main-layout>
  	<template slot="navigation-bar">
      <v-link href="/org-firms" class="item">Firms</v-link>
      <v-link href="/org-experts" class="item">Experts</v-link>
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
