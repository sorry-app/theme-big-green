/*! Modernizr 3.0.0pre (Custom Build) | MIT */
(function(e,n,t){var o,i,r,Modernizr,s,l,f,u,a,p,c,d,y;function m(e,n){return typeof e===n}function h(){var e,n,t,r,s,l,f,u;for(u in i){if(e=[],n=i[u],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;n.options.aliases.length>t;t++)e.push(n.options.aliases[t].toLowerCase());for(r=m(n.fn,"function")?n.fn():n.fn,s=0;e.length>s;s++)l=e[s],f=l.split("."),1===f.length?Modernizr[f[0]]=r:2===f.length&&(Modernizr[f[0]][f[1]]=r),o.push((r?"":"no-")+f.join("-"))}}function g(e){var n,t,o;n=s.className,t=Modernizr._config.classPrefix||"",o=RegExp("(^|\\s)"+t+"no-js(\\s|$)"),n=n.replace(o,"$1"+t+"js$2"),Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),s.className=n)}function v(e,n){return!!~(""+e).indexOf(n)}function x(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function C(e,n,t){var o,i;for(i in e)if(e[i]in n)return t===!1?e[i]:(o=n[e[i]],m(o,"function")&&"bind"in o?o.bind(t||n):o);return!1}function b(){var e=n.body;return e||(e=a("body"),e.fake=!0),e}function _(e,n,t,o){var i,r,l,f,u,p,c;if(i="modernizr",p=a("div"),c=b(),parseInt(t,10))for(;t--;)f=a("div"),f.id=o?o[t]:i+(t+1),p.appendChild(f);return r=["­",'<style id="s',i,'">',e,"</style>"].join(""),p.id=i,(c.fake?c:p).innerHTML+=r,c.appendChild(p),c.fake&&(c.style.background="",c.style.overflow="hidden",u=s.style.overflow,s.style.overflow="hidden",s.appendChild(c)),l=n(p,e),c.fake?(c.parentNode.removeChild(c),s.style.overflow=u,s.offsetHeight):p.parentNode.removeChild(p),!!l}function w(n,o){var i,r;if(i=n.length,"CSS"in e&&"supports"in e.CSS){for(;i--;)if(e.CSS.supports(x(n[i]),o))return!0;return!1}if("CSSSupportsRule"in e){for(r=[];i--;)r.push("("+x(n[i])+":"+o+")");return r=r.join(" or "),_("@supports ("+r+") { #modernizr { position: absolute; } }",function(n){return"absolute"==(e.getComputedStyle?getComputedStyle(n,null):n.currentStyle).position})}return t}function S(e,n,o,i){var r,s,l,f,u;function p(){s&&(delete c.style,delete c.modElem)}if(i=m(i,"undefined")?!1:i,!m(o,"undefined")&&(r=w(e,o),!m(r,"undefined")))return r;c.style||(s=!0,c.modElem=a("modernizr"),c.style=c.modElem.style);for(l in e)if(f=e[l],u=c.style[f],!v(f,"-")&&c.style[f]!==t){if(i||m(o,"undefined"))return p(),"pfx"==n?f:!0;try{c.style[f]=o}catch(d){}if(c.style[f]!=u)return p(),"pfx"==n?f:!0}return p(),!1}function j(e,n,t,o,i){var r=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+f.join(r+" ")+r).split(" ");return m(n,"string")||m(n,"undefined")?S(s,n,o,i):(s=(e+" "+u.join(r+" ")+r).split(" "),C(s,n,t))}function P(e,n,o){return j(e,t,t,n,o)}for(o=[],i=[],r={_version:"v3.0.0pre",_config:{classPrefix:"",enableClasses:!0,usePrefixes:!0},_q:[],on:function(e,n){setTimeout(function(){n(this[e])},0)},addTest:function(e,n,t){i.push({name:e,fn:n,options:t})},addAsyncTest:function(e){i.push({name:null,fn:e})}},Modernizr=function(){},Modernizr.prototype=r,Modernizr=new Modernizr,s=n.documentElement,l="Webkit Moz O ms",f=r._config.usePrefixes?l.split(" "):[],r._cssomPrefixes=f,u=r._config.usePrefixes?l.toLowerCase().split(" "):[],r._domPrefixes=u,a=function(){return n.createElement.apply(n,arguments)},p={elem:a("modernizr")},Modernizr._q.push(function(){delete p.elem}),c={style:p.elem.style},Modernizr._q.unshift(function(){delete c.style}),d=o.slice,Function.prototype.bind||(Function.prototype.bind=function(e){var n,t,o;if(n=this,"function"!=typeof n)throw new TypeError;return t=d.call(arguments,1),o=function(){var i,r,s;return this instanceof o?(i=function(){},i.prototype=n.prototype,r=new i,s=n.apply(r,t.concat(d.call(arguments))),Object(s)===s?s:r):n.apply(e,t.concat(d.call(arguments)))}}),r.testAllProps=j,r.testAllProps=P,Modernizr.addTest("flexbox",P("flexBasis","1px",!0)),Modernizr.addTest("flexboxlegacy",P("boxDirection","reverse",!0)),h(),g(o),delete r.addTest,delete r.addAsyncTest,y=0;Modernizr._q.length>y;y++)Modernizr._q[y]();e.Modernizr=Modernizr})(this,document);