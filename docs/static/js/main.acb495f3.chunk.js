(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],[,,,,,,,,function(e,a,t){e.exports=t(22)},,,,,function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},,function(e,a,t){},function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(6),c=t.n(l),s=t(1),u=t(7);t(13);function i(e){var a=e.name,t=e.label,n=e.value,l=e.onChange,c=e.min,s=e.max,u=Boolean(l);return r.a.createElement("label",{className:"number-input"},t,r.a.createElement("input",{name:a,type:"number",value:n,onChange:l,min:c,max:s,disabled:!u}))}i.defaultProps={name:null,onChange:null,min:null,max:null};var o=i,m=(t(14),Object.freeze({width:10,height:10,mines:15}));function f(e){var a=e.restart,t=Object(n.useState)(m),l=Object(s.a)(t,2),c=l[0],i=l[1],f=function(e){var a=e.currentTarget;if(""!==a.value){var t=parseInt(a.value);if(!(t<a.min||t>a.max)){var n=Object(u.a)({},c);n[a.name]=t,i(n)}}},g=Math.min(c.width*c.height-1,999);return r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),a(c)},className:"restart-config"},r.a.createElement(o,{name:"width",label:"Width",value:c.width,onChange:f,min:1,max:300}),r.a.createElement(o,{name:"height",label:"Height",value:c.height,onChange:f,min:1,max:300}),r.a.createElement(o,{name:"mines",label:"Mines",value:c.mines,onChange:f,min:1,max:g}),r.a.createElement("label",null,"Restart",r.a.createElement("button",{type:"submit",className:"restart embossed"},r.a.createElement("span",{className:"smiley"}))))}t(15);var g=function(e){var a=e.cell,t=e.xray,n=e.onClick,l=a.flagged,c=a.value,s=a.pressed;return r.a.createElement("button",{className:s?-1===c?"flat mine":"flat":null,onClick:n},function(){if(l)return r.a.createElement("span",{className:"flag"},"f");if(!t&&!s)return r.a.createElement(r.a.Fragment,null);switch(c){case-1:return r.a.createElement("span",{className:"mine"},"X");case 0:return r.a.createElement(r.a.Fragment,null);default:return r.a.createElement("span",{className:"color-".concat(c)},c)}}())},v=t(4);function d(e,a,t,n){[-1,0,1].forEach((function(r){[-1,0,1].forEach((function(l){if(r||l){var c=a+r,s=t+l;e[c]&&e[c][s]&&-1!==e[c][s].value&&n(e[c][s],c,s)}}))}))}function b(e,a,t){var n=function(e,a){return Array(e).fill().map(a)},r=n(a,(function(){return n(e,(function(){return{pressed:!1,value:0,flagged:!1}}))}));return Object(v.a)(Array(t)).forEach((function(){for(;;){var t=Math.floor(Math.random()*a),n=Math.floor(Math.random()*e);if(-1!==r[t][n].value){r[t][n].value=-1,d(r,t,n,(function(e){e.value+=1}));break}}})),r}function h(e,a,t,n,r,l){var c=null===r?e[a][t].value:r,s=Object(v.a)(e);return s[a]=Object(v.a)(e[a]),s[a][t]={pressed:n,value:c,flagged:l},s}t(16);var p=Object.freeze({ongoing:"ongoing",won:"won",lost:"lost"});function E(e){var a=e.restartFlag,t=e.width,l=e.height,c=e.mines,u=e.xray,i=e.flags,o=e.setFlags,m=e.setAlert,f=e.gameState,v=e.setGameState,E=Object(n.useState)(b(t,l,c)),j=Object(s.a)(E,2),O=j[0],y=j[1],w=function(e,a){return"".concat(e,"_").concat(a)};Object(n.useEffect)((function(){y(b(t,l,c))}),[a,t,l,c]);var N=function(e,a){var t=O[e][a],n=t.flagged,r=t.pressed,l=t.value;if(!n&&!r)switch(l){case-1:v(p.lost),y(h(O,e,a,!0,null,!1)),m("game over");break;case 0:y(function(e,a,t){for(var n=function(e){return e.map((function(e){return e.map((function(e){return{pressed:e.pressed,value:e.value,flagged:e.flagged}}))}))}(e),r=[[a,t]];r.length;){var l=r.shift(),c=Object(s.a)(l,2),u=c[0],i=c[1];n[u][i].pressed||(n[u][i].pressed=!0,d(n,u,i,(function(e,a,t){e.flagged||(e.value>0&&(e.pressed=!0),0===e.value&&r.push([a,t]))})))}return n}(O,e,a));break;default:y(h(O,e,a,!0,null,!1))}},S=function(e,a){return r.a.createElement(g,{key:w(e,a),cell:O[e][a],xray:u,onClick:function(t){f===p.ongoing&&(t.shiftKey?function(e,a){var t=O[e][a],n=t.flagged;if(!t.pressed)if(!n&&c<=i)m("no more flags");else{m("");var r=i+(n?-1:1);o(r);var l=h(O,e,a,!1,null,!n);y(l),r===c&&function(e){var a=function(e){var a=e.flagged,t=e.value;return-1!==t||-1===t&&a};return e.every((function(e){return e.every(a)}))}(l)&&(v(p.won),m("game won"))}}(e,a):N(e,a))}})};return r.a.createElement("div",{className:"board debossed"},O.map((function(e,a){return r.a.createElement("div",{key:a,className:"row"},e.map((function(e,t){return S(a,t)})))})))}t(17);var j=function(e){var a=e.label,t=e.pressed,n=e.setPressed,l=t?"debossed":"embossed";return r.a.createElement("button",{className:"sticky-button ".concat(l),onClick:function(){return n(!t)}},a)};t(18);function O(e){var a=e.flags,t=e.mines,n=e.xray,l=e.setXray,c=e.alert,s=t-a;return r.a.createElement("section",{className:"stats"},r.a.createElement(o,{label:"Flags",value:s}),r.a.createElement(j,{label:"X-ray",pressed:n,setPressed:l}),r.a.createElement("p",{className:"alert"},c))}t(19);var y=function(){var e=Object(n.useState)(!1),a=Object(s.a)(e,2),t=a[0],l=a[1],c=Object(n.useState)(m),u=Object(s.a)(c,2),i=u[0],o=u[1],g=Object(n.useState)(0),v=Object(s.a)(g,2),d=v[0],b=v[1],h=Object(n.useState)(""),j=Object(s.a)(h,2),y=j[0],w=j[1],N=Object(n.useState)(p.ongoing),S=Object(s.a)(N,2),x=S[0],k=S[1],C=Object(n.useState)(!1),F=Object(s.a)(C,2),M=F[0],A=F[1];return r.a.createElement("section",{className:"app embossed ".concat(x)},r.a.createElement("header",null,r.a.createElement("div",{className:"debossed settings"},r.a.createElement(f,{restart:function(e){l(!t),o(e),b(0),w(""),k(p.ongoing)}}),r.a.createElement(O,{flags:d,mines:i.mines,xray:M,setXray:A,alert:y,gameState:x}))),r.a.createElement(E,{restartFlag:t,width:i.width,height:i.height,mines:i.mines,xray:M,flags:d,setFlags:b,setAlert:w,gameState:x,setGameState:k}))};t(20),t(21);c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,null)),document.getElementById("root"))}],[[8,1,2]]]);
//# sourceMappingURL=main.acb495f3.chunk.js.map