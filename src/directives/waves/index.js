import waves from './waves'

const install = function(Vue) {
  Vue.directive('waves', waves)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.waves = waves
  Vue.use(install); // eslint-disable-line
}

waves.install = install
export default waves
