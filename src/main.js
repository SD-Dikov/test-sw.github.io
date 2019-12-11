import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import PeopleList from './components/PeopleList.vue'
import Header from './components/header.vue'

Vue.config.productionTip = false

Vue.component('app-people-list', PeopleList)
Vue.component('app-header', Header)


function debounce(fn, delay = 300) {
  var timeoutID = null;

    return function () {
    clearTimeout(timeoutID);

        var args = arguments;
        var that = this;

        timeoutID = setTimeout(function () {
          fn.apply(that, args);
        }, delay);
    }
}
Vue.directive('debounce', (el, binding) => {
  if (binding.value !== binding.oldValue) {
    el.oninput = debounce(ev => {
      el.dispatchEvent(new Event('change'));
    }, parseInt(binding.value) || 300);
  }
})


new Vue({
  render: h => h(App),
}).$mount('#app')
