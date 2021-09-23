<template>
  <q-page>
    <q-inner-loading :showing="loading">
      <q-spinner-oval size="2.4em" color="primary"></q-spinner-oval>
    </q-inner-loading>

    <template v-show="!loading">
      <div class="fullscreen flex flex-center">
        {{ scan_result || '请点击右上角的图标启动扫码' }}
      </div>
    </template>
  </q-page>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import apis from "../apis";

const hybrid = {
  announce: null,
  events: [
    apis.scan,
    apis.optionMenu
  ]
};

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
  name: "Index",
  data() {
    return {
      loading: false,
      payload: null,

      scan_result: null
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
    optionMenu(data) {
      if (this.isApp) {
        hybrid.announce = Math.floor(Math.random() * 1000000);
        this.mpaasPostNotification(apis.scan.action, {}, hybrid.announce);
      }
    },
    scanCallback(data) {
      console.log('扫码返回 ', data);
      this.scan_result = data && data.data;
    }
  },
  created() {
    let _ = this, query = _.$route.query || {}, params = _.$route.params || {};
    _.payload = Object.assign(query, params);
    _.payload && _.payload.token && _.$utils.getUserInfo(_.payload.token);
  },
  mounted() {
    let _ = this;
    // 注册Hybrid事件监听
    hybrid.events && hybrid.events.length && hybrid.events.forEach(e => {
      let {callback: f} = e;
      if (_.hasOwnProperty(f) && _[f] && typeof _[f] == 'function') {
        hybrid[f] = _[f];
      }
    })

    document.title = '首页';
    if(_.isApp){
      _.mpaasSetTitle(document.title);
      _.mpaasSetRightMenuWithIcon("https://dbx-assets.oss-cn-shanghai.aliyuncs.com/scan.png")
    }
  }
}
</script>

<style scoped>

</style>
