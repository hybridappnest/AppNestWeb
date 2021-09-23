<template>
  <q-page>
    <q-inner-loading :showing="loading">
      <q-spinner-oval size="2.4em" color="primary"></q-spinner-oval>
    </q-inner-loading>

    <template v-show="!loading">
      <div class="column no-wrap">

        <div class="column no-wrap bg-white nest-box-shadow q-py-md">
          <q-item>
            <q-item-section avatar>
              <q-avatar rounded size="xl">
                <img src="https://cdn.quasar.dev/img/avatar.png">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <span class="text-h6">
                  依山观月
                </span>
              </q-item-label>
              <q-item-label caption>
                全栈工程师
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn round size="sm" flat color="primary" icon="edit" @click="$utils.pushWindow('/edit', {}, $router)"></q-btn>
            </q-item-section>
          </q-item>
        </div>

        <q-list separator class="bg-white q-mt-md nest-box-shadow">
          <q-item>
            <q-item-section class="q-pl-md" thumbnail>
              <q-icon size="xs" name="fas fa-clipboard-list" color="blue"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                我的工单
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                <q-icon size="sm" name="chevron_right"></q-icon>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="q-pl-md" thumbnail>
              <q-icon size="xs" name="fas fa-star" color="negative"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                我的收藏
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                <q-icon size="sm" name="chevron_right"></q-icon>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-list separator class="bg-white q-mt-md nest-box-shadow">
          <q-item>
            <q-item-section class="q-pl-md" thumbnail>
              <q-icon size="xs" name="fas fa-cog" color="primary"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                系统设置
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                <q-icon size="sm" name="chevron_right"></q-icon>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="q-pl-md" thumbnail>
              <q-icon size="xs" name="fas fa-envelope" color="positive"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                意见反馈
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                <q-icon size="sm" name="chevron_right"></q-icon>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="q-pl-md" thumbnail>
              <q-icon size="xs" name="fas fa-info-circle" color="cyan"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                关于我们
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                <q-icon size="sm" name="chevron_right"></q-icon>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

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
  name: "Profile",
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
    optionMenu(data) {
      if (this.isApp) {
        hybrid.announce = Math.floor(Math.random() * 1000000);
        this.mpaasPostNotification(apis.scan.action, {}, hybrid.announce);
      }
    },
    scanCallback(data) {
      console.log("扫描完成", data);
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

    document.title = '个人中心';
    if(_.isApp){
      _.mpaasSetTitle(document.title);
      _.mpaasSetRightMenuWithIcon("https://dbx-assets.oss-cn-shanghai.aliyuncs.com/scan.png")
    }
  }
}
</script>

<style scoped>

</style>
