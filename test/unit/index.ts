import Vue from 'vue'
import VueRouter from 'vue-router';
import componentTests from './components/index';

Vue.config.productionTip = false

componentTests.register();

// // require all test files (files that end .ts)
// const testsContext = require.context('./', true, /\.ts$/);
// testsContext.keys().forEach(testsContext);
