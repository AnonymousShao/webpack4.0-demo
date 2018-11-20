const a = require('./a.js');
import './index.css';
// import './style.less';
console.log('a', a);
console.log('index');
document.getElementById('app').innerHTML = a;

if (module.hot) {
  module.hot.accept();
}
