<template>
  <div id="app"> <!--shapkakepka-->
    <a-row>
      <a-col :span="12">
        <div style="margin: 20px;text-align: center;">
          Курс: <a-input prefix="₽" @blur="updateCourse" :value="course" style="width: 100px;" />
        </div>
        <StoreCatalog />
      </a-col>
      <a-col :span="12">
        <div style="align-items: center;padding: 20px;display: flex;justify-content: center;">
          <a-statistic-countdown title="Обновление через:" :value="deadline" format="ss" @finish="onFinish" />
          <a-button style="margin-left: 10px;" shape="circle" icon="sync" @click="onFinish" />
        </div>
        <StoreCart />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import StoreCatalog from './components/StoreCatalog.vue';
import StoreCart from './components/StoreCart.vue';
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "App",
  components: {
    StoreCatalog,
    StoreCart
  },
  data() {
    return {
      time: 15,
      deadline: Date.now() + 15000
    }
  },
  computed: {
    ...mapGetters(['course'])
  },
  methods: {
    ...mapActions([
      'updateCourse', 'getProductList', 'reloadData'
    ]),
    onFinish() {
      this.reloadData()
      this.deadline = Date.now() + 15000;
    }
  },
  mounted() {
    this.getProductList();
  }
};
</script>

<style>
.ant-statistic {
  display: flex;
  align-items: center;
}

.ant-statistic-title {
  padding-right: 10px;
}
</style>
