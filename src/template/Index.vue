<template>
  <q-layout vie="hHh lpr fFf" class="bg-grey-11">

    <!-- 页头 -->
    <q-header class="bg-grey-12 nest-box-shadow text-dark">
      <div class="row items-center no-wrap">
        <!-- type your code here ... -->
      </div>
    </q-header>

    <!-- 页脚 -->
    <q-footer class="bg-white nest-box-shadow-up text-dark">
      <div class="row items-center no-wrap">
        <!-- type your code here ... -->
      </div>
    </q-footer>

    <!-- 页面容器 -->
    <q-page-container>
      <!-- 页面 -->
      <q-page>
        <!-- type your code here ... -->
      </q-page>
    </q-page-container>

  </q-layout>
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
    if ((!e.restrict || data.announce == hybrid.announce) && window.hasOwnProperty(callback) && typeof window[callback] == "function") {
      window[callback](data);
    }
  }, false);
});

export default {
  name: "Template",
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
      "updateProperty",
      "updateData"
    ]),
    loadData(){

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
          window[f] = _[f];
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
