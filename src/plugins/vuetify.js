import 'font-awesome/css/font-awesome.min.css' // Ensure you are using css-loader
import Vue from "vue";
import Vuetify from "vuetify/lib";
import '@mdi/font/css/materialdesignicons.css';


Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'fa4',
  }
});
