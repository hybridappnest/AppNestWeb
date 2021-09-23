<template>
  <q-layout view="hHh lpr fFf" class="bg-grey-11">

    <q-page-container>
      <q-page>
        <q-inner-loading :showing="loading">
          <q-spinner-oval size="2.4em" color="primary"></q-spinner-oval>
        </q-inner-loading>

        <template v-show="!loading">
          <div class="column no-wrap">

            <q-input dense filled square input-class="text-caption" model="search" class="q-ma-md">
              <template v-slot:prepend>
                <q-icon name="search" size="xs"></q-icon>
              </template>
            </q-input>

            <div class="row items-center q-mx-md q-mb-sm justify-between">
              <span class="text-caption text-secondary">
                历史搜索
              </span>
              <q-btn round icon="delete" flat size="xs" color="secondary"></q-btn>
            </div>

            <div class="row wrap q-mx-sm q-gutter-sm">
              <q-chip size="md" color="grey-12">
                张艳芳
              </q-chip>
              <q-chip size="md" color="grey-12">
                周烈
              </q-chip>
              <q-chip size="md" color="grey-12">
                大成消防
              </q-chip>
              <q-chip size="md" color="grey-12">
                张怀涛
              </q-chip>
              <q-chip size="md" color="grey-12">
                国家博物馆
              </q-chip>
            </div>

          </div>
        </template>
      </q-page>
    </q-page-container>

  </q-layout>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Search",
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
    document.title = '搜索';
    if(this.isApp){
      this.mpaasSetTitle(document.title);
    }
  }
}
</script>

<style scoped>

</style>
