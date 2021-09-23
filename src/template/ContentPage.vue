<template>
  <q-page>
    <q-inner-loading :showing="loading">
      <q-spinner-oval size="2.4em" color="primary"></q-spinner-oval>
    </q-inner-loading>

    <template v-show="!loading">
      <!-- coding here ... -->
    </template>
  </q-page>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

const hybrid = {
  announce: null,
  events: []
};

/**
 * 批量注册event
 */
hybrid.events && hybrid.events.length && hybrid.events.forEach(e => {
  document.addEventListener(e.callback, evt => {
    console.log(`${e.callback} message received ...`, evt);

    let callback = e.callback, {data} = evt;
    if (e.restrict && !data.announce) {
      return;
    }
    if ((!e.restrict || data.announce == hybrid.announce) && hybrid.hasOwnProperty(callback) && typeof hybrid[callback] == "function") {
      hybrid[callback](data);
    }
  }, false);
});

export default {
  name: "ContentPage",
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
    ]),
    loadData() {

    }
  },
  created() {
    let _ = this,
      query = _.$route.query || {},
      params = _.$route.params || {};

    _.payload = Object.assign(query, params);
    _.loadData();

    _.payload && _.payload.token && _.$utils.getUserInfo(_.payload.token);
  },
  mounted() {
    let _ = this;
    // 注册Hybrid事件监听
    if (hybrid.events && hybrid.events.length) {
      hybrid.events.forEach(l => {
        let f = l.callback;
        if (_.hasOwnProperty(f) && _[f] && typeof _[f] == 'function') {
          hybrid[f] = _[f];
        }
      })
    }

    document.title = '页面名称';
    if(_.isApp){
      _.mpaasSetTitle(document.title);
    }
  }
}
</script>

<style scoped>

</style>
