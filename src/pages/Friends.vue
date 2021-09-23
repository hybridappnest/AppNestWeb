<template>
  <q-layout vie="hHh lpr fFf" class="bg-grey-11">

    <!-- 页头 -->
    <q-header class="bg-grey-12 text-dark">
      <div class="row items-center no-wrap q-px-md q-py-sm">
        <span class="text-caption text-secondary">
          <template v-for="(path, index) in current.path">
            <span v-show="path.id != root.id" class="q-mx-xs text-caption text-secondary">/</span>
            <q-btn flat dense size="sm" color="primary" @click="gotoDpt(current.path.slice(0, index + 1))"
                   :disable="index == current.path.length - 1"
                   :label="path.name"></q-btn>
          </template>
        </span>
      </div>
    </q-header>

    <!-- 页脚 -->
    <q-footer class="bg-white nest-box-shadow-up text-dark">
      <div class="row items-center no-wrap">
        <q-btn stretch flat color="blue" class="full-width" style="height: 50px;" label="邀请新用户"></q-btn>
      </div>
    </q-footer>

    <!-- 页面容器 -->
    <q-page-container>
      <!-- 页面 -->
      <q-page>
        <q-list separator class="bg-white">
          <template v-show="current.children && current.children.length" v-for="dpt in current.children">
            <q-item clickable v-ripple @click="gotoDpt(dpt.path)">
              <q-item-section thumbnail class="q-pl-md">
                <q-avatar rounded icon="folder" color="blue" text-color="white">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ dpt.name }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label caption>
                  <q-icon name="chevron_right" size="xs"></q-icon>
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-show="current.members && current.members.length" v-for="member in current.members">
            <q-item clickable v-ripple>
              <q-item-section thumbnail class="q-pl-md">
                <q-avatar>
                  <img :src="member.avatar">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ member.realname + (member.nickname ? `(${member.nickname})` : '') }}
                </q-item-label>
                <q-item-label caption v-show="member.position">
                  {{ member.position }}
                </q-item-label>
              </q-item-section>
              <q-item-section v-show="member.summit" side>
                <q-item-label caption>
                  <q-chip size="sm" color="grey-12">
                    主管
                  </q-chip>
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import mock from "assets/mock";

const hybrid = {
  announce: null,
  events: []
};

/**
 * 示例事件注册
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
  name: "Friends",
  data() {
    return {
      loading: false,
      payload: null,
      root: {},
      current: {}
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
      let _ = this,
        department = this.generatePath(mock.department);

      this.root = department;
      this.current = department;
    },
    generatePath(node, parent) {
      let path = [].concat(parent && parent.path || []);
      path.push({
        id: node.id,
        name: node.name
      });
      node.path = path;
      if (node.children && node.children.length) {
        node.children.map(c => this.generatePath(c, node));
      }

      return node;
    },
    gotoDpt(path) {
      if (!path || !path.length) {
        return;
      }

      let route = [].concat(path), node = this.root, target = route.shift();
      while (node && route.length) {
        target = route.shift();
        node = node.children && node.children.length && node.children.find(c => c.id == target.id);
      }

      this.current = node || this.root;
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
        if (_.hasOwnProperty(l) && _[l] && typeof _[l] == 'function') {
          window[l] = _[l];
        }
      })
    }

    document.title = '通讯录';
    if(_.isApp){
      _.mpaasSetTitle(document.title);
    }
  }
}
</script>

<style scoped>

</style>
