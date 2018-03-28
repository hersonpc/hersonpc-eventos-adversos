
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import VueFire from 'vuefire'

window.Vue = require('vue');
window.firebase = require('./firebase');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('notificacoes', require('./components/Notificacoes.vue'));
Vue.component('nisp-cadastro-unidades', require('./components/nisp/CadastroUnidades.vue'));
Vue.component('nisp-cadastro-incidentes', require('./components/nisp/CadastroIncidentes.vue'));
Vue.component('nisp-cadastro-deteccao', require('./components/nisp/CadastroDeteccao.vue'));
Vue.component('nisp-cadastro-grau-dano', require('./components/nisp/CadastroGrauDano.vue'));
Vue.component('nisp-cadastro-caracterizacao', require('./components/nisp/CadastroCaracterizacao.vue'));

const app = new Vue({
    el: '#app'
});
