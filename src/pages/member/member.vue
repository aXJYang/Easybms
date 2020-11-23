<template>
  <div class="vip">
    <v-table :info="info" @edit="edit"></v-table>
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import vTable from "./components/table";
import vForm from "./components/form";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
  },
  components: {
    vTable,
    vForm,
  },
  data() {
    return {
      info: {
        isShow: false,
      },
    };
  },
  methods: {
    edit(uid) {
      this.info.isShow = true;
      this.$refs.form.getOne(uid);
    },
  },
};
</script>

<style>
</style>