<template>
  <q-layout view="hHh lpr fFf" class="bg-grey-11">

    <q-footer v-show="!isApp" class="nest-box-shadow-up bg-white text-dark">
      <q-tabs
        v-model="tab"
        align="justify"
        class="text-caption text-secondary"
        style="height: 50px;"
        active-color="primary"
        indicator-color="transparent"
        :breakpoint="0"
      >
        <q-route-tab name="im" to="im" icon="forum"/>
        <q-route-tab name="contacts" to="contacts" icon="contacts" content-class="text-caption no-padding"/>
        <q-route-tab name="apps" to="apps" icon="widgets" content-class="text-caption no-paddings"/>
        <q-route-tab name="profile" to="profile" icon="account_circle" content-class="text-caption no-padding"/>
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'MainLayout',
  data() {
    return {
      tab: 'im'
    }
  },
  computed:{
    ...mapGetters([
      "isApp"
    ])
  }
}
</script>
