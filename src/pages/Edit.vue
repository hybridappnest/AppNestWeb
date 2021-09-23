<template>
  <q-layout vie="hHh lpr fFf" class="bg-grey-11">

    <!-- 页面容器 -->
    <q-page-container>
      <!-- 页面 -->
      <q-page>

        <q-item clickable v-ripple class="bg-white" @click="postNotification($apis.choseImg.action, {needVideo: 0, maxnum: 1})">
          <q-item-section>
            <q-item-label>
              头像
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-avatar rounded size="lg">
              <img :src="user.avatar">
            </q-avatar>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>
              <q-icon size="sm" name="chevron_right"></q-icon>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-list separator class="bg-white q-mt-md">
          <q-item>
            <q-item-section>
              <q-item-label>
                昵称
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                {{ user.nickname }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                <q-icon size="sm" name="chevron_right"></q-icon>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>
                手机号
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                {{ user.phone }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                <q-icon size="sm" name="chevron_right"></q-icon>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import apis from "../apis";

const hybrid = {
  announce: null,
  events: [
    apis.choseImg
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
  name: "Edit",
  data() {
    return {
      loading: false,
      payload: null,

      user: null
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
    loadData() {
      this.user = {
        nickname: '依山观月',
        avatar: 'https://cdn.quasar.dev/img/avatar.png',
        phone: '18688886666'
      };
    },
    postNotification(name, data) {
      if (this.isApp) {
        hybrid.announce = Math.floor(Math.random() * 1000000);
        this.mpaasPostNotification(name, data, hybrid.announce);
      }
    },
    choseImgCallback(rst) {
      let _ = this, images = rst.data;
      console.log("接收到数据 ...", images);
      images && images.length && this.$set(this.user, 'avatar', images[0].url);
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

    document.title = '编辑个人资料';
    if(_.isApp){
      _.mpaasSetTitle(document.title);
    }
  }
}
</script>

<style scoped>

</style>
