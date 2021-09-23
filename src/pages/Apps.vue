<template>
  <q-page>
    <q-inner-loading :showing="loading">
      <q-spinner-oval size="2.4em" color="primary"></q-spinner-oval>
    </q-inner-loading>

    <template v-show="!loading">

    </template>
  </q-page>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Apps",
  data() {
    return {
      loading: false,
      payload: null
    }
  },
  computed: {
    ...mapGetters([
      "isApp"
    ])
  },
  methods: {
    ...mapActions([
      "updateData",
      "updateProperty"
    ])
  },
  created() {
    let _ = this, query = _.$route.query || {}, params = _.$route.params || {};
    _.payload = Object.assign(query, params);
  },
  mounted() {
    document.title = '应用中心';
    if(this.isApp){
      this.mpaasSetTitle(document.title);
    }
  }
}
</script>

<style scoped>

</style>
