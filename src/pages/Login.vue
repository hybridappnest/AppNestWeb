<template>
  <q-layout view="hHh lpr fFf" class="bg-grey-11">

    <q-header class="bg-transparent text-dark q-pa-lg">
      <div class="column no-wrap">
        <q-avatar class="q-mb-sm" rounded v-show="user.avatar">
          <img :src="user.avatar">
        </q-avatar>
        <div class="row items-center">
          <span class="text-h5">您好</span>
          <span class="text-h5" v-show="user.name">{{ `，${user.name}` }}</span>
        </div>
      </div>
    </q-header>

    <q-footer class="bg-transparent text-dark q-px-lg q-py-xl">
      <div class="row items-center justify-around">
        <div class="column flex-center">
          <q-btn icon="fas fa-mobile" size="sm" flat round color="dark"
                 @click="postNotification($apis.socialLogin.action, {channel: 'phone'})"></q-btn>
          <span class="text-caption text-secondary q-mt-sm">
            一键登录
          </span>
        </div>
        <div class="column flex-center no-wrap">
          <q-btn icon="fab fa-weixin" size="sm" flat round color="positive"
                 @click="postNotification($apis.socialLogin.action, {channel: 'wechat'})"></q-btn>
          <span class="text-caption text-secondary q-mt-sm">
            微信登录
          </span>
        </div>
      </div>
    </q-footer>

    <q-page-container>
      <q-page class="q-pa-lg">

        <div class="column no-wrap">
          <q-input
            dense
            v-model="phone"
            square
            filled
            color="primary"
            class="full-width"
            input-class="text-caption"
            placeholder="手机号"
          >
            <template v-slot:prepend>
              <span class="text-secondary text-caption">
                +86
              </span>
            </template>
          </q-input>
          <q-input
            dense
            v-model="code"
            square
            filled
            color="primary"
            class="full-width q-mt-md"
            input-class="text-caption"
          >
            <template v-slot:append>
              <span :class="`text-caption ${loading ? 'text-secondary' : 'nest-href'}`">
                {{ `${loading ? (timer + '秒后重新获取') : '获取验证码'}` }}
              </span>
            </template>
          </q-input>

          <div class="row text-caption items-center q-mt-md justify-between">
            <a class="nest-href" href="#">忘记密码</a>
          </div>

          <q-btn size="md" class="full-width q-mt-xl no-border-radius" color="primary" text-color="white"
                 label="登录"></q-btn>

          <div class="row no-wrap items-start q-mt-md">
            <q-checkbox size="xs" v-model="policyAccepted" color="positive"
                        style="margin-left: -8px; margin-top: -6px;"></q-checkbox>
            <span class="text-caption text-secondary ">
              我已阅读并同意<a class="nest-href" href="#">服务协议</a>、<a class="nest-href" href="#">隐私保护协议</a>、<a
              class="nest-href" href="#">法律声明</a>。
            </span>
          </div>

        </div>

      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
import {mapGetters} from "vuex";
import apis from "../apis";

const hybrid = {
  announce: null,
  events: [
    apis.socialLogin
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
  name: "Login",
  data() {
    return {
      user: {
        name: '依山观月',
        avatar: 'https://cdn.quasar.dev/img/avatar.png'
      },
      phone: null,
      password: null,
      code: null,
      loading: false,
      timer: 60,
      policyAccepted: false
    }
  },
  computed: {
    ...mapGetters([
      'isApp'
    ])
  },
  methods: {
    postNotification(name, data) {
      if (this.isApp) {
        hybrid.announce = Math.floor(Math.random() * 1000000);
        this.mpaasPostNotification(name, data, hybrid.announce);
      }
    },
    socialLoginCallback(resp) {
      let data = resp && resp.data;
      if (!data || !data.channel) {
        return;
      }

      if(data.status == 2){
        this.$utils.getUserInfo(data.token);
        // this.$api('java', '/login', {
        //   data
        // });
      }
    }
  },
  created() {
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

    document.title = '登录';
    if(_.isApp){
      _.mpaasSetTitle(document.title);
    }
  }
}
</script>

<style scoped>

</style>
