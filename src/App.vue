<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'App',
  data() {
    return {}
  },
  methods: {
    ...mapActions([
      "updateData"
    ])
  },
  created() {
  }
}
</script>
