<template>
  <q-page>
    <q-inner-loading :showing="loading">
      <q-spinner-oval size="2.4em" color="primary"></q-spinner-oval>
    </q-inner-loading>

    <template v-show="!loading">
      <div class="column no-wrap">

        <q-input dense filled square input-class="text-caption" model="search" class="q-ma-md" @click="$utils.pushWindow('/search', {}, $router)">
          <template v-slot:prepend>
            <q-icon name="search" size="xs"></q-icon>
          </template>
        </q-input>

        <q-list class="bg-white" separator>
          <q-item>
            <q-item-section avatar>
              <q-avatar rounded icon="fas fa-user-plus" color="positive" text-color="white"></q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                添加同事/客户
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                <q-icon name="chevron_right" size="sm"></q-icon>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="$utils.pushWindow('/friends', {}, $router)">
            <q-item-section avatar>
              <q-avatar rounded icon="fas fa-users" color="blue" text-color="white"></q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                企业通讯录
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                <q-icon name="chevron_right" size="sm"></q-icon>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-avatar rounded icon="fas fa-people-arrows" color="blue" text-color="white"></q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                客户群组
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                <q-icon name="chevron_right" size="sm"></q-icon>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="q-mt-md row items-center q-mx-md q-mb-sm">
          <span class="text-caption text-secondary">
            常用联系人
          </span>
        </div>

        <q-list class="bg-white" separator>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://dbx-assets.oss-cn-shanghai.aliyuncs.com/userheader/2100a90c97c357bfa7e3842058045fff/50ba6a57-0f2f-44de-be22-b120801e3470.jpeg">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                夏洛克·福尔摩斯
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                柯南·道尔
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://dbx-assets.oss-cn-shanghai.aliyuncs.com/userheader/b5acfa27528ac1309726608a95737263/07b3bc12-c67f-4b6b-8d86-58243b9867af.jpeg">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                金田一
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                约翰·H·华生
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

export default {
  name: "Contacts",
  data() {
    return {
      loading: false,
      payload: null,

      search: null,
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
    _.payload && _.payload.token && _.$utils.getUserInfo(_.payload.token);
  },
  mounted() {
    document.title = '通讯录';
    if(this.isApp){
      this.mpaasSetTitle(document.title);
    }
  }
}
</script>

<style scoped>

</style>
