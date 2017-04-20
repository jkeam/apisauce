"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var axios=_interopDefault(require("axios")),ramda=require("ramda"),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};Function.prototype.$asyncbind=function e(t,n){function r(){return a.apply(t,arguments)}Function.prototype.$asyncbind||Object.defineProperty(Function.prototype,"$asyncbind",{value:e,enumerable:!1,configurable:!0,writable:!0}),e.trampoline||(e.trampoline=function(e,t,n,r,a){return function i(o){for(;o;){if(o.then)return o=o.then(i,r),a?void 0:o;try{if(o.pop){if(o.length)return o.pop()?t.call(e):o;o=n}else o=o.call(e)}catch(e){return r(e)}}}}),e.LazyThenable||(e.LazyThenable=function(){function e(e){return e&&e instanceof Object&&"function"==typeof e.then}function t(n,r,a){try{var i=a?a(r):r;if(n===i)return n.reject(new TypeError("Promise resolution loop"));e(i)?i.then(function(e){t(n,e)},function(e){n.reject(e)}):n.resolve(i)}catch(e){n.reject(e)}}function n(){}function r(e){}function a(e,t){this.resolve=e,this.reject=t}function i(r,a){var i=new n;try{this._resolver(function(n){return e(n)?n.then(r,a):t(i,n,r)},function(e){t(i,e,a)})}catch(e){t(i,e,a)}return i}function o(e){this._resolver=e,this.then=i}return n.prototype={resolve:r,reject:r,then:a},o.resolve=function(e){return o.isThenable(e)?e:{then:function(t){return t(e)}}},o.isThenable=e,o}(),e.EagerThenable=e.Thenable=(e.EagerThenableFactory=function(e){function t(e){if(e){var t=this;e(function(e){t.resolve(e)},function(e){t.reject(e)})}}function n(e,t){if("function"==typeof e.y)try{var n=e.y.call(void 0,t);e.p.resolve(n)}catch(t){e.p.reject(t)}else e.p.resolve(t)}function r(e,t){if("function"==typeof e.n)try{var n=e.n.call(void 0,t);e.p.resolve(n)}catch(t){e.p.reject(t)}else e.p.reject(t)}e=e||"object"===("undefined"==typeof process?"undefined":_typeof(process))&&process.nextTick||"function"==typeof setImmediate&&setImmediate||function(e){setTimeout(e,0)};var a=function(){function t(){for(;n.length-r;){try{n[r]()}catch(e){}n[r++]=void 0,r===a&&(n.splice(0,a),r=0)}}var n=[],r=0,a=1024;return function(a){n.push(a),n.length-r==1&&e(t)}}();return t.prototype={resolve:function(e){if(void 0===this.state){if(e===this)return this.reject(new TypeError("Attempt to resolve promise with self"));var t=this;if(e&&("function"==typeof e||"object"===(void 0===e?"undefined":_typeof(e))))try{var r=0,i=e.then;if("function"==typeof i)return void i.call(e,function(e){r++||t.resolve(e)},function(e){r++||t.reject(e)})}catch(e){return void(r||this.reject(e))}this.state=n,this.v=e,t.c&&a(function(){for(var r=0,a=t.c.length;r<a;r++)n(t.c[r],e)})}},reject:function(e){if(void 0===this.state){this.state=r,this.v=e;var t=this.c;t&&a(function(){for(var n=0,a=t.length;n<a;n++)r(t[n],e)})}},then:function(e,n){var r=new t,i={y:e,n:n,p:r};if(void 0===this.state)this.c?this.c.push(i):this.c=[i];else{var o=this.state,s=this.v;a(function(){o(i,s)})}return r}},t.resolve=function(e){if(e&&e instanceof t)return e;var n=new t;return n.resolve(e),n},t.reject=function(e){if(e&&e instanceof t)return e;var n=new t;return n.reject(e),n},t.version="2.3.3-nodent",t})());var a=this;switch(n){case!0:return new e.Thenable(r);case 0:return new e.LazyThenable(r);case void 0:return r.then=r,r;default:return function(){try{return a.apply(t,arguments)}catch(e){return n(e)}}}};var toNumber=ramda.cond([[ramda.isNil,ramda.identity],[ramda.is(Number),ramda.identity],[ramda.T,function(e){return Number(e)}]]),isWithin=ramda.curry(function(e,t,n){var r=ramda.is(Number);return r(e)&&r(t)&&r(n)&&ramda.gte(n,e)&&ramda.gte(t,n)}),isInvalidConfig=ramda.anyPass([ramda.isNil,ramda.isEmpty,ramda.complement(ramda.has("baseURL")),ramda.complement(ramda.propIs(String,"baseURL")),ramda.propSatisfies(ramda.isEmpty,"baseURL")]),isPromise=function(e){return!!e&&("object"===(void 0===e?"undefined":_typeof(e))||"function"==typeof e)&&"function"==typeof e.then},DEFAULT_HEADERS={Accept:"application/json","Content-Type":"application/json"},DEFAULT_CONFIG={timeout:0},NONE=null,CLIENT_ERROR="CLIENT_ERROR",SERVER_ERROR="SERVER_ERROR",TIMEOUT_ERROR="TIMEOUT_ERROR",CONNECTION_ERROR="CONNECTION_ERROR",NETWORK_ERROR="NETWORK_ERROR",UNKNOWN_ERROR="UNKNOWN_ERROR",CANCEL_ERROR="CANCEL_ERROR",TIMEOUT_ERROR_CODES=["ECONNABORTED"],NODEJS_CONNECTION_ERROR_CODES=["ENOTFOUND","ECONNREFUSED","ECONNRESET"],in200s=isWithin(200,299),in400s=isWithin(400,499),in500s=isWithin(500,599),create=function(e){if(isInvalidConfig(e))throw new Error("config must have a baseURL");var t=ramda.merge(DEFAULT_HEADERS,e.headers||{}),n=ramda.merge(DEFAULT_CONFIG,ramda.dissoc("headers",e)),r=axios.create(n),a=[],i=function(e){a.push(e)},o=[],s=[],u=[],c=function(e){return o.push(e)},R=function(e){return s.push(e)},f=function(e){return u.push(e)},E=function(e,n){return t[e]=n,r},l=function(e){return ramda.forEach(function(t){return E(t,e[t])},ramda.keys(e)),r},d=function(e){return delete t[e],r},p=function(e){return r.defaults.baseURL=e,r},O=function(){return r.defaults.baseURL},h=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return N(ramda.merge({url:t,params:n,method:e},r))},m=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return N(ramda.merge({url:t,method:e,data:n},r))},N=function(e){return new Promise(function(n,a){function i(){function t(){return u}return f<s.length?(E=s[f](e),isPromise(E)?E.then(function(e){return t.call(this)}.$asyncbind(this,a),a):E(e).then(function(e){return t.call(this)}.$asyncbind(this,a),a)):[1]}function u(){return f++,i}function c(){return R.call(this)}function R(){return l=ramda.pipe(ramda.partial(y,[toNumber(new Date)]),_),n(r.request(e).then(l).catch(l))}var f,E,l;return e.headers=_extends({},t,e.headers),o.length>0&&ramda.forEach(function(t){return t(e)},o),s.length>0?(f=0,Function.$asyncbind.trampoline(this,c,u,a,!0)(i)):R.call(this)}.$asyncbind(this))},_=function(e){return a.forEach(function(t){try{t(e)}catch(e){}}),e},y=function(e,t){var n=toNumber(new Date),r=n-e,a=t instanceof Error||axios.isCancel(t),i=a?t.response:t,o=i&&i.status||null,s=a?T(t):v(o),c=in200s(o),R=t.config||null,f=i&&i.headers||null,E=i&&i.data||null,l={duration:r,problem:s,ok:c,status:o,headers:f,config:R,data:E};return u.length>0&&ramda.forEach(function(e){return e(l)},u),l},T=function(e){return"Network Error"===e.message?NETWORK_ERROR:axios.isCancel(e)?CANCEL_ERROR:ramda.cond([[ramda.isNil,function(){return v(e.response.status)}],[ramda.contains(ramda.__,TIMEOUT_ERROR_CODES),ramda.always(TIMEOUT_ERROR)],[ramda.contains(ramda.__,NODEJS_CONNECTION_ERROR_CODES),ramda.always(CONNECTION_ERROR)],[ramda.T,ramda.always(UNKNOWN_ERROR)]])(e.code)},v=function(e){return ramda.cond([[ramda.isNil,ramda.always(UNKNOWN_ERROR)],[in200s,ramda.always(NONE)],[in400s,ramda.always(CLIENT_ERROR)],[in500s,ramda.always(SERVER_ERROR)],[ramda.T,ramda.always(UNKNOWN_ERROR)]])(e)};return{axiosInstance:r,monitors:a,addMonitor:i,requestTransforms:o,asyncRequestTransforms:s,responseTransforms:u,addRequestTransform:c,addAsyncRequestTransform:R,addResponseTransform:f,setHeader:E,setHeaders:l,deleteHeader:d,headers:t,setBaseURL:p,getBaseURL:O,get:ramda.partial(h,["get"]),delete:ramda.partial(h,["delete"]),head:ramda.partial(h,["head"]),post:ramda.partial(m,["post"]),put:ramda.partial(m,["put"]),patch:ramda.partial(m,["patch"]),link:ramda.partial(h,["link"]),unlink:ramda.partial(h,["unlink"])}},apisauce={DEFAULT_HEADERS:DEFAULT_HEADERS,NONE:NONE,CLIENT_ERROR:CLIENT_ERROR,SERVER_ERROR:SERVER_ERROR,TIMEOUT_ERROR:TIMEOUT_ERROR,CONNECTION_ERROR:CONNECTION_ERROR,NETWORK_ERROR:NETWORK_ERROR,UNKNOWN_ERROR:UNKNOWN_ERROR,create:create};exports.DEFAULT_HEADERS=DEFAULT_HEADERS,exports.NONE=NONE,exports.CLIENT_ERROR=CLIENT_ERROR,exports.SERVER_ERROR=SERVER_ERROR,exports.TIMEOUT_ERROR=TIMEOUT_ERROR,exports.CONNECTION_ERROR=CONNECTION_ERROR,exports.NETWORK_ERROR=NETWORK_ERROR,exports.UNKNOWN_ERROR=UNKNOWN_ERROR,exports.CANCEL_ERROR=CANCEL_ERROR,exports.create=create,exports.default=apisauce;
