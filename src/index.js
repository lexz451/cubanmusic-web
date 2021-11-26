import { createApp } from 'vue';
import router from './router';
import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faExclamation, faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { fab, faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import App from "./app.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import clickOutsideDirective from './directives/clickoutside';

import './styles.scss';

library.add(
    faSearch, 
    faChevronDown, 
    faSlidersH, 
    faExclamation,
    fab);
dom.watch();

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.directive('click-outside', clickOutsideDirective)
.use(router)
.mount('#app');

navigator.serviceWorker.register(
    new URL('service-worker.js', import.meta.url),
    { type: "module" }
)