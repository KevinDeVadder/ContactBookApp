<template>
  <v-app>
    <!-- Insert Custom Header -->
    <app-header/>
    <!-- TOSO: Add transitions to Router -->
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import appHeader from '@/components/general/header'
export default {
  name: 'App',
  components: {
    appHeader
  }
};
</script>
