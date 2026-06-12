var g="abrp-vehicle-card",R="abrp";var F=globalThis,V=F.ShadowRoot&&(F.ShadyCSS===void 0||F.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),ue=new WeakMap,M=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(V&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=ue.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&ue.set(t,e))}return e}toString(){return this.cssText}},me=o=>new M(typeof o=="string"?o:o+"",void 0,Z),O=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((s,i,n)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[n+1],o[0]);return new M(t,o,Z)},fe=(o,e)=>{if(V)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),i=F.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,o.appendChild(s)}},Q=V?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return me(t)})(o):o;var{is:He,defineProperty:ze,getOwnPropertyDescriptor:je,getOwnPropertyNames:Ie,getOwnPropertySymbols:Be,getPrototypeOf:Fe}=Object,W=globalThis,ge=W.trustedTypes,Ve=ge?ge.emptyScript:"",We=W.reactiveElementPolyfillSupport,T=(o,e)=>o,ee={toAttribute(o,e){switch(e){case Boolean:o=o?Ve:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},ve=(o,e)=>!He(o,e),_e={attribute:!0,type:String,converter:ee,reflect:!1,useDefault:!1,hasChanged:ve};Symbol.metadata??=Symbol("metadata"),W.litPropertyMetadata??=new WeakMap;var $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_e){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&ze(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){let{get:i,set:n}=je(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:i,set(r){let d=i?.call(this);n?.call(this,r),this.requestUpdate(e,d,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_e}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;let e=Fe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){let t=this.properties,s=[...Ie(t),...Be(t)];for(let i of s)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let i of s)t.unshift(Q(i))}else e!==void 0&&t.push(Q(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return fe(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:ee).toAttribute(t,s.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){let s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:ee;this._$Em=i;let d=r.fromAttribute(t,n.type);this[i]=d??this._$Ej?.get(i)??d,this._$Em=null}}requestUpdate(e,t,s,i=!1,n){if(e!==void 0){let r=this.constructor;if(i===!1&&(n=this[e]),s??=r.getPropertyOptions(e),!((s.hasChanged??ve)(n,t)||s.useDefault&&s.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:r}=n,d=this[i];r!==!0||this._$AL.has(i)||d===void 0||this.C(i,void 0,n,d)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[T("elementProperties")]=new Map,$[T("finalized")]=new Map,We?.({ReactiveElement:$}),(W.reactiveElementVersions??=[]).push("2.1.2");var ae=globalThis,$e=o=>o,q=ae.trustedTypes,be=q?q.createPolicy("lit-html",{createHTML:o=>o}):void 0,Se="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,ke="?"+b,qe=`<${ke}>`,w=document,N=()=>w.createComment(""),L=o=>o===null||typeof o!="object"&&typeof o!="function",ce=Array.isArray,Ke=o=>ce(o)||typeof o?.[Symbol.iterator]=="function",te=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ye=/-->/g,xe=/>/g,y=RegExp(`>|${te}(?:([^\\s"'>=/]+)(${te}*=${te}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),we=/'/g,Ae=/"/g,Ce=/^(?:script|style|textarea|title)$/i,le=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),a=le(1),ut=le(2),mt=le(3),A=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),Ee=new WeakMap,x=w.createTreeWalker(w,129);function Pe(o,e){if(!ce(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return be!==void 0?be.createHTML(e):e}var Ye=(o,e)=>{let t=o.length-1,s=[],i,n=e===2?"<svg>":e===3?"<math>":"",r=U;for(let d=0;d<t;d++){let c=o[d],l,p,h=-1,u=0;for(;u<c.length&&(r.lastIndex=u,p=r.exec(c),p!==null);)u=r.lastIndex,r===U?p[1]==="!--"?r=ye:p[1]!==void 0?r=xe:p[2]!==void 0?(Ce.test(p[2])&&(i=RegExp("</"+p[2],"g")),r=y):p[3]!==void 0&&(r=y):r===y?p[0]===">"?(r=i??U,h=-1):p[1]===void 0?h=-2:(h=r.lastIndex-p[2].length,l=p[1],r=p[3]===void 0?y:p[3]==='"'?Ae:we):r===Ae||r===we?r=y:r===ye||r===xe?r=U:(r=y,i=void 0);let f=r===y&&o[d+1].startsWith("/>")?" ":"";n+=r===U?c+qe:h>=0?(s.push(l),c.slice(0,h)+Se+c.slice(h)+b+f):c+b+(h===-2?d:f)}return[Pe(o,n+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},D=class o{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let n=0,r=0,d=e.length-1,c=this.parts,[l,p]=Ye(e,t);if(this.el=o.createElement(l,s),x.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=x.nextNode())!==null&&c.length<d;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(Se)){let u=p[r++],f=i.getAttribute(h).split(b),B=/([.?@])?(.*)/.exec(u);c.push({type:1,index:n,name:B[2],strings:f,ctor:B[1]==="."?ie:B[1]==="?"?oe:B[1]==="@"?ne:S}),i.removeAttribute(h)}else h.startsWith(b)&&(c.push({type:6,index:n}),i.removeAttribute(h));if(Ce.test(i.tagName)){let h=i.textContent.split(b),u=h.length-1;if(u>0){i.textContent=q?q.emptyScript:"";for(let f=0;f<u;f++)i.append(h[f],N()),x.nextNode(),c.push({type:2,index:++n});i.append(h[u],N())}}}else if(i.nodeType===8)if(i.data===ke)c.push({type:2,index:n});else{let h=-1;for(;(h=i.data.indexOf(b,h+1))!==-1;)c.push({type:7,index:n}),h+=b.length-1}n++}}static createElement(e,t){let s=w.createElement("template");return s.innerHTML=e,s}};function E(o,e,t=o,s){if(e===A)return e;let i=s!==void 0?t._$Co?.[s]:t._$Cl,n=L(e)?void 0:e._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(o),i._$AT(o,t,s)),s!==void 0?(t._$Co??=[])[s]=i:t._$Cl=i),i!==void 0&&(e=E(o,i._$AS(o,e.values),i,s)),e}var se=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??w).importNode(t,!0);x.currentNode=i;let n=x.nextNode(),r=0,d=0,c=s[0];for(;c!==void 0;){if(r===c.index){let l;c.type===2?l=new H(n,n.nextSibling,this,e):c.type===1?l=new c.ctor(n,c.name,c.strings,this,e):c.type===6&&(l=new re(n,this,e)),this._$AV.push(l),c=s[++d]}r!==c?.index&&(n=x.nextNode(),r++)}return x.currentNode=w,i}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},H=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=E(this,e,t),L(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ke(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==m&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=D.createElement(Pe(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{let n=new se(i,this),r=n.u(this.options);n.p(t),this.T(r),this._$AH=n}}_$AC(e){let t=Ee.get(e.strings);return t===void 0&&Ee.set(e.strings,t=new D(e)),t}k(e){ce(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,i=0;for(let n of e)i===t.length?t.push(s=new o(this.O(N()),this.O(N()),this,this.options)):s=t[i],s._$AI(n),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=$e(e).nextSibling;$e(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},S=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=m}_$AI(e,t=this,s,i){let n=this.strings,r=!1;if(n===void 0)e=E(this,e,t,0),r=!L(e)||e!==this._$AH&&e!==A,r&&(this._$AH=e);else{let d=e,c,l;for(e=n[0],c=0;c<n.length-1;c++)l=E(this,d[s+c],t,c),l===A&&(l=this._$AH[c]),r||=!L(l)||l!==this._$AH[c],l===m?e=m:e!==m&&(e+=(l??"")+n[c+1]),this._$AH[c]=l}r&&!i&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ie=class extends S{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}},oe=class extends S{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==m)}},ne=class extends S{constructor(e,t,s,i,n){super(e,t,s,i,n),this.type=5}_$AI(e,t=this){if((e=E(this,e,t,0)??m)===A)return;let s=this._$AH,i=e===m&&s!==m||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==m&&(s===m||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},re=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){E(this,e)}};var Ge=ae.litHtmlPolyfillSupport;Ge?.(D,H),(ae.litHtmlVersions??=[]).push("3.3.3");var Re=(o,e,t)=>{let s=t?.renderBefore??e,i=s._$litPart$;if(i===void 0){let n=t?.renderBefore??null;s._$litPart$=i=new H(e.insertBefore(N(),n),n,void 0,t??{})}return i._$AI(o),i};var he=globalThis,_=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Re(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};_._$litElement$=!0,_.finalized=!0,he.litElementHydrateSupport?.({LitElement:_});var Je=he.litElementPolyfillSupport;Je?.({LitElement:_});(he.litElementVersions??=[]).push("4.2.2");var Xe={sensor:["soc","range","reference_consumption","battery_capacity","odometer","speed_factor","max_speed","charging_power","elevation","last_update","data_source","vehicle_name","source_last_refresh","obd_last_refresh"],number:["arrival_soc","min_charger_stalls","extra_weight"],select:["charge_stops","drive_profile"],switch:["avoid_tolls","avoid_motorways","avoid_ferries","avoid_borders","realtime_traffic","realtime_weather","adjust_speed"],binary_sensor:["charging"],image:["car_image"],device_tracker:["location"]};function Me(o){return Object.values(o.entities||{}).filter(e=>e.platform===R)}function Ze(o){if(o.translation_key)return o.translation_key;let e=o.entity_id.split(".")[1],t=e.lastIndexOf("_");return t>=0?e.slice(t+1):e}function z(o){let e=new Map;for(let s of Me(o))s.device_id&&(e.has(s.device_id)||e.set(s.device_id,[]),e.get(s.device_id).push(s));let t=[];for(let[s,i]of e)i.some(n=>Ze(n)==="soc")&&t.push({deviceId:s,device:o.devices?.[s],ents:i});return t}function K(o){let e=new Set(z(o).map(t=>t.deviceId));return Me(o).filter(t=>!e.has(t.device_id))}function k(o,e){let t={};for(let s of e){let[i,n]=s.entity_id.split(".");s.translation_key&&(t[`${i}.${s.translation_key}`]=s.entity_id);for(let r of Xe[i]||[])!t[`${i}.${r}`]&&n.endsWith(`_${r}`)&&(t[`${i}.${r}`]=s.entity_id)}return t}var de=[["sensor.vehicle_name","Vehicle name"],["image.car_image","Car image"],["select.drive_profile","Drive profile"],["sensor.soc","State of charge"],["binary_sensor.charging","Charging"],["sensor.charging_power","Charging power"],["sensor.last_update","Last update"],["sensor.range","Range"],["sensor.reference_consumption","Reference consumption"],["sensor.battery_capacity","Battery capacity"],["sensor.odometer","Odometer"],["device_tracker.location","Location"],["sensor.speed_factor","Speed factor"],["sensor.max_speed","Maximum speed"],["sensor.elevation","Elevation"],["sensor.data_source","Data source"],["sensor.source_last_refresh","Cloud last refresh"],["sensor.obd_last_refresh","OBD last refresh"]];function Y(o){if(!o)return null;let e=(Date.now()-new Date(o).getTime())/1e3;return Number.isNaN(e)?null:e<90?"just now":e<5400?`${Math.round(e/60)} min ago`:e<129600?`${Math.round(e/3600)} h ago`:`${Math.round(e/86400)} d ago`}function j(o){return o&&o.charAt(0).toUpperCase()+o.slice(1)}function v(o,e=0){let t=Number(o?.state);return Number.isFinite(t)?t.toFixed(e):null}function C(o){return typeof o=="string"&&/\{[{%]/.test(o)}function P(o){return typeof o=="string"&&/^[a-z_]+\.[a-zA-Z0-9_]+$/.test(o)}var Oe=!1;async function G(){if(!Oe){Oe=!0;try{await(await window.loadCardHelpers?.())?.importMoreInfoControl?.("light")}catch{}}}var Te=O`
  ha-card {
    padding: 20px;
  }
  .empty {
    padding: 8px;
    color: var(--secondary-text-color);
  }
  .clickable {
    cursor: pointer;
  }
  .seen.clickable {
    border-radius: 6px;
    padding: 2px 6px;
    margin: -2px -6px;
    transition: background-color 0.15s ease;
  }
  .seen.clickable:hover {
    background: var(--secondary-background-color);
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    min-height: 96px;
  }
  .head-left {
    position: relative;
  }
  .name {
    font-size: 1.5em;
    font-weight: 700;
  }
  .profile {
    color: var(--secondary-text-color);
    margin-top: 2px;
  }
  .profile.selectable {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    cursor: pointer;
    border-radius: 8px;
    padding: 2px 6px;
    margin-left: -6px;
    transition: background-color 0.15s ease, color 0.15s ease;
  }
  .profile.selectable:hover {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }
  .profile.selectable ha-icon {
    --mdc-icon-size: 18px;
  }
  .menu-backdrop {
    position: fixed;
    inset: 0;
    z-index: 4;
  }
  .menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 5;
    min-width: 180px;
    background: var(--card-background-color);
    border-radius: 12px;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.4);
    border: 1px solid var(--divider-color);
    padding: 6px;
    display: flex;
    flex-direction: column;
  }
  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    border: none;
    background: transparent;
    color: var(--primary-text-color);
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.95em;
    text-align: left;
    transition: background-color 0.15s ease;
  }
  .menu-item:hover {
    background: var(--secondary-background-color);
  }
  .menu-item:active {
    filter: brightness(1.2);
  }
  .menu-item.on {
    font-weight: 600;
  }
  .menu-item ha-icon {
    --mdc-icon-size: 17px;
    color: var(--primary-color);
  }
  .car {
    max-width: 58%;
    max-height: 130px;
    object-fit: contain;
    margin: -8px -8px 0 0;
  }
  .soc-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
  }
  .soc {
    font-size: 1.9em;
    font-weight: 700;
  }
  .bar {
    height: 6px;
    border-radius: 3px;
    background: var(--divider-color);
    margin: 10px 0 12px;
  }
  .fill {
    height: 100%;
    border-radius: 3px;
    background: var(--state-sensor-battery-high-color, #43a047);
    transition: width 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .fill.charging::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.45) 50%,
      transparent 100%
    );
    width: 45%;
    animation: charge-sweep 1.6s linear infinite;
  }
  @keyframes charge-sweep {
    from {
      transform: translateX(-110%);
    }
    to {
      transform: translateX(330%);
    }
  }
  .charge-speed {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    margin-left: auto;
    padding: 4px 10px;
    border-radius: 14px;
    background: color-mix(
      in srgb,
      var(--state-sensor-battery-high-color, #43a047) 18%,
      transparent
    );
    color: var(--state-sensor-battery-high-color, #43a047);
    font-weight: 600;
    font-size: 0.95em;
  }
  .charge-speed ha-icon {
    --mdc-icon-size: 16px;
  }
  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--secondary-text-color);
    font-size: 0.95em;
  }
  .dot {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--secondary-text-color);
    margin-right: 7px;
    vertical-align: middle;
  }
  .link {
    color: var(--primary-color);
    cursor: pointer;
    font-weight: 500;
    border-radius: 6px;
    padding: 2px 6px;
    margin: -2px -6px;
    transition: background-color 0.15s ease;
  }
  .link:hover {
    background: var(--secondary-background-color);
    text-decoration: underline;
  }
  .buttons {
    display: flex;
    gap: 12px;
    margin-top: 16px;
  }
  .btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 13px 0;
    border: none;
    border-radius: 14px;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    font-size: 1em;
    cursor: pointer;
    transition: filter 0.15s ease, transform 0.1s ease;
  }
  .btn:hover {
    filter: brightness(1.18);
  }
  .btn:active {
    transform: scale(0.985);
  }
  .btn ha-icon,
  .chip ha-icon {
    --mdc-icon-size: 18px;
  }
  /* dialogs */
  ha-dialog {
    --mdc-dialog-min-width: min(420px, 95vw);
    --mdc-dialog-max-width: 480px;
  }
  .dlg-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px 0;
  }
  .dlg-title {
    font-size: 1.2em;
    font-weight: 700;
    flex: 1;
    text-align: center;
    margin-left: 34px;
  }
  .dlg-body {
    padding: 0 4px 8px;
  }
  .section {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    margin: 16px 0 8px;
    color: var(--primary-text-color);
  }
  .section ha-icon {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
  }
  .segments {
    display: flex;
    background: var(--secondary-background-color);
    border-radius: 12px;
    padding: 4px;
  }
  .segment {
    flex: 1;
    border: none;
    background: transparent;
    color: var(--primary-text-color);
    padding: 10px 0;
    border-radius: 9px;
    cursor: pointer;
    font-size: 0.95em;
    transition: background-color 0.15s ease, color 0.15s ease;
  }
  .segment:hover:not(.on) {
    background: rgba(127, 127, 127, 0.18);
  }
  .segment.on {
    background: var(--primary-text-color);
    color: var(--card-background-color);
    font-weight: 600;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .chip {
    display: flex;
    align-items: center;
    gap: 6px;
    border: none;
    border-radius: 20px;
    padding: 9px 14px;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    cursor: pointer;
    font-size: 0.92em;
    transition: filter 0.15s ease, background-color 0.15s ease,
      transform 0.1s ease;
  }
  .chip:hover {
    filter: brightness(1.18);
  }
  .chip:active {
    transform: scale(0.96);
  }
  .chip.on {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
  }
  .switch-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 0;
    color: var(--primary-text-color);
  }
  .switch-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .switch-label ha-icon {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
  }
  .slider-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .slider-row ha-slider {
    flex: 1;
  }
  .slider-value {
    font-size: 1.3em;
    font-weight: 700;
    min-width: 64px;
  }
  ha-select {
    width: 100%;
  }
  /* live data */
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0 14px;
  }
  .tile {
    padding: 12px 6px;
    margin: 0 -6px;
    border-bottom: 1px solid var(--divider-color);
    border-radius: 8px;
    transition: background-color 0.15s ease;
  }
  .tile:hover {
    background: var(--secondary-background-color);
  }
  .tile-title {
    color: var(--secondary-text-color);
    font-size: 0.85em;
    min-height: 2.4em;
  }
  .tile-value {
    font-size: 1.35em;
    font-weight: 700;
    margin-top: 2px;
    color: var(--primary-text-color);
  }
  .tile-unit {
    font-size: 0.7em;
    font-weight: 500;
  }
  .tile-prov {
    color: var(--secondary-text-color);
    font-size: 0.8em;
    margin-top: 4px;
  }
  .sources {
    display: flex;
    gap: 18px;
    margin-top: 14px;
    color: var(--secondary-text-color);
    font-size: 0.9em;
  }
  .src-time {
    opacity: 0.75;
    margin-left: 4px;
  }
  @media (max-width: 460px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;function Ue(o){let e=o._vs("sensor.data_source")?.attributes?.providers||{},t=(c,l="ABRP Estimate")=>j(e[c])||l,s=(c,l)=>o._vs(c)?.attributes?.unit_of_measurement??l,i=Number(o._vs("sensor.speed_factor")?.state),n=[["SoC",v(o._vs("sensor.soc")),"%",t("soc"),"sensor.soc"],["Range",v(o._vs("sensor.range")),s("sensor.range","km"),t("est_battery_range"),"sensor.range"],["Calibrated reference consumption",v(o._vs("sensor.reference_consumption")),s("sensor.reference_consumption","Wh/km"),t("calib_ref_cons"),"sensor.reference_consumption"],["Battery capacity",v(o._vs("sensor.battery_capacity")),"kWh",t("battery_capacity",t("capacity")),"sensor.battery_capacity"],["Odometer",v(o._vs("sensor.odometer")),s("sensor.odometer","km"),t("odometer"),"sensor.odometer"],["Location",o._vs("device_tracker.location")?.state,"",t("lat",""),"device_tracker.location"],["Reference speed",Number.isFinite(i)?Math.round(i*100):null,"%",t("speed_factor"),"sensor.speed_factor"],["Maximum speed",v(o._vs("sensor.max_speed")),s("sensor.max_speed","km/h"),t("max_speed"),"sensor.max_speed"],["Elevation",v(o._vs("sensor.elevation")),s("sensor.elevation","m"),t("elevation",""),"sensor.elevation"]],d=[[j(o._vs("sensor.data_source")?.state),o._vs("sensor.source_last_refresh")?.state,"sensor.source_last_refresh"],["Obdble",o._vs("sensor.obd_last_refresh")?.state,"sensor.obd_last_refresh"]].filter(([c,l])=>c&&l&&l!=="unknown"&&l!=="unavailable");return a`<div class="grid">
      ${n.map(([c,l,p,h,u])=>a`<div
          class="tile clickable"
          @click=${()=>o._moreInfo(u)}
        >
          <div class="tile-title">${c}</div>
          <div class="tile-value">
            ${l??"\u2013"}<span class="tile-unit"> ${p}</span>
          </div>
          ${h?a`<div class="tile-prov">${h}</div>`:""}
        </div>`)}
    </div>
    ${d.length?a`<div class="sources">
          ${d.map(([c,l,p])=>a`<span
              class="seen clickable"
              @click=${()=>o._moreInfo(p)}
            >
              <span class="dot"></span>${c}
              <span class="src-time">${Y(l)}</span>
            </span>`)}
        </div>`:""}`}var Qe={optimal:"Optimal",fewer:"Fewer",least:"Fewest"},et=[["switch.avoid_tolls","mdi:cash-multiple","Tolls"],["switch.avoid_motorways","mdi:highway","Highways"],["switch.avoid_ferries","mdi:ferry","Ferries and car trains"],["switch.avoid_borders","mdi:boom-gate","Borders"]],tt=[["switch.realtime_traffic","mdi:traffic-light","Realtime traffic"],["switch.realtime_weather","mdi:weather-partly-cloudy","Realtime weather"],["switch.adjust_speed","mdi:speedometer","Adjust speed to limits"]],I=(o,e)=>a`<div class="section"><ha-icon icon=${o}></ha-icon>${e}</div>`;function Ne(o){let e=o._as("select.charge_stops"),t=o._vs("select.drive_profile");return a`
    ${e?st(o,e):""}
    ${pe(o,"Destination arrival SoC","mdi:battery-low",o._as("number.arrival_soc"),"%")}
    ${I("mdi:cancel","Avoid on route")}
    <div class="chips">
      ${et.map(([s,i,n])=>it(o,s,i,n))}
    </div>
    ${I("mdi:update","Realtime")}
    ${tt.map(([s,i,n])=>ot(o,s,i,n))}
    ${pe(o,"Minimum charger stalls","mdi:counter",o._as("number.min_charger_stalls"),"")}
    ${pe(o,"Extra weight","mdi:weight-kilogram",o._as("number.extra_weight")," kg")}
    ${nt(o,t)}
  `}function st(o,e){return a`${I("mdi:ev-station","Charge stops")}
    <div class="segments">
      ${(e.attributes.options||[]).map(t=>a`<button
          class="segment ${e.state===t?"on":""}"
          @click=${()=>o._call("select","select_option",e,{option:t})}
        >
          ${Qe[t]||j(t)}
        </button>`)}
    </div>`}function pe(o,e,t,s,i){if(!s)return"";let n=s.attributes,r=Number(s.state);return a`${I(t,e)}
    <div class="slider-row">
      <span class="slider-value"
        >${Number.isFinite(r)?r:"\u2013"}${i}</span
      >
      <ha-slider
        pin
        min=${n.min??0}
        max=${n.max??100}
        step=${n.step??1}
        .value=${r}
        @change=${d=>{o._call("number","set_value",s,{value:Number(d.target.value)}),d.target.closest(".slider-row").querySelector(".slider-value").textContent=`${d.target.value}${i}`}}
      ></ha-slider>
    </div>`}function it(o,e,t,s){let i=o._as(e);if(!i)return"";let n=i.state==="on";return a`<button
    class="chip ${n?"on":""}"
    @click=${()=>o._call("switch","toggle",i)}
  >
    <ha-icon icon="${t}"></ha-icon>${s}
  </button>`}function ot(o,e,t,s){let i=o._as(e);return i?a`<div class="switch-row">
    <span class="switch-label"><ha-icon icon=${t}></ha-icon>${s}</span>
    <ha-switch
      .checked=${i.state==="on"}
      @change=${()=>o._call("switch","toggle",i)}
    ></ha-switch>
  </div>`:""}function nt(o,e){return e?.attributes?.options?.length?a`${I("mdi:car-cog","Drive profile")}
    <ha-select
      naturalMenuWidth
      fixedMenuPosition
      .value=${e.state}
      @selected=${t=>{let s=t.target.value;s&&s!==e.state&&o._call("select","select_option",e,{option:s})}}
      @closed=${t=>t.stopPropagation()}
    >
      ${e.attributes.options.map(t=>a`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
    </ha-select>`:""}var J=class extends _{static styles=Te;static get properties(){return{hass:{},_config:{},_dialog:{state:!0},_profileMenu:{state:!0}}}constructor(){super(),this._dialog=null,this._profileMenu=!1}connectedCallback(){super.connectedCallback(),G()}setConfig(e){this._config=e||{}}static getConfigElement(){return document.createElement(`${g}-editor`)}static getStubConfig(){return{}}getCardSize(){return 5}get _vehicle(){let e=z(this.hass);return e.length?this._config.device&&e.find(t=>t.deviceId===this._config.device)||e[0]:null}_resolve(e,t){let s=this._config.entities?.[e];if(s){if(C(s)){let n=this._templateResults?.[s];return{state:n===void 0?"unknown":String(n),attributes:{}}}return P(s)?this.hass.states[s]:{state:s,attributes:{}}}let i=t?.[e];return i?this.hass.states[i]:void 0}_vs(e){return this._resolve(e,this._vmap)}_as(e){return this._resolve(e,this._amap)}updated(e){super.updated(e),(e.has("hass")||e.has("_config"))&&this._syncTemplates()}disconnectedCallback(){super.disconnectedCallback();for(let e of Object.values(this._tmplUnsub||{}))typeof e=="function"&&e();this._tmplUnsub={}}async _syncTemplates(){if(!this.hass?.connection)return;this._tmplUnsub=this._tmplUnsub||{},this._templateResults=this._templateResults||{};let e=Object.values(this._config.entities||{}).filter(t=>C(t));for(let t of e)if(!this._tmplUnsub[t]){this._tmplUnsub[t]=!0;try{this._tmplUnsub[t]=await this.hass.connection.subscribeMessage(s=>{this._templateResults[t]=s.result,this.requestUpdate()},{type:"render_template",template:t})}catch{this._templateResults[t]="error",this.requestUpdate()}}for(let t of Object.keys(this._tmplUnsub))if(!e.includes(t)){let s=this._tmplUnsub[t];typeof s=="function"&&s(),delete this._tmplUnsub[t],delete this._templateResults[t]}}_moreInfo(e){let t=this._config.entities?.[e],s=t&&P(t)&&!C(t)?t:this._vmap?.[e]||this._amap?.[e];!s||t&&!P(t)||this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:s},bubbles:!0,composed:!0}))}_call(e,t,s,i={}){this.hass.callService(e,t,{entity_id:s.entity_id,...i})}render(){if(!this.hass)return a``;let e=this._vehicle;return e?(this._vmap=k(this.hass,e.ents),this._amap=k(this.hass,K(this.hass)),a`<ha-card>
      ${this._renderMain(e)}
      ${this._dialog==="options"?this._dialogFrame("Plan options",Ne(this)):""}
      ${this._dialog==="live"?this._dialogFrame("Live data",Ue(this)):""}
    </ha-card>`):a`<ha-card>
        <div class="empty">
          No ABRP vehicle found — set up the ABRP integration first.
        </div>
      </ha-card>`}_renderMain(e){let t=this._vs("sensor.vehicle_name")?.state,s=this._config.title||(t&&t!=="unknown"&&t!=="unavailable"?t:null)||e.device?.name_by_user||e.device?.name||"Vehicle",i=this._vs("sensor.soc"),n=v(i),r=this._vs("image.car_image"),d=r?.attributes?.entity_picture||(typeof r?.state=="string"&&(r.state.startsWith("http")||r.state.startsWith("/"))?r.state:null),c=Y(this._vs("sensor.last_update")?.state),l=this._vs("binary_sensor.charging")?.state==="on",p=Number(this._vs("sensor.charging_power")?.state),h=l&&Number.isFinite(p)&&p>0?`${p<10?p.toFixed(1):Math.round(p)} kW`:null,u=f=>this._config[f]!==!1;return a`<div class="main">
      <div class="head">
        <div class="head-left">
          <div class="name">${s}</div>
          ${u("show_profile")?this._renderProfile():""}
        </div>
        ${u("show_image")&&d?a`<img
              class="car clickable"
              src="${d}"
              alt="${s}"
              @click=${()=>this._moreInfo("image.car_image")}
            />`:""}
      </div>
      <div class="soc-row clickable" @click=${()=>this._moreInfo("sensor.soc")}>
        ${i?a`<ha-state-icon
              .hass=${this.hass}
              .stateObj=${i}
            ></ha-state-icon>`:a`<ha-icon icon="mdi:battery"></ha-icon>`}
        <span class="soc">${n??"\u2013"}%</span>
        ${u("show_charge_speed")&&h?a`<span
              class="charge-speed clickable"
              @click=${f=>{f.stopPropagation(),this._moreInfo("sensor.charging_power")}}
            >
              <ha-icon icon="mdi:flash"></ha-icon>${h}
            </span>`:u("show_charge_speed")&&l?a`<span class="charge-speed">
                <ha-icon icon="mdi:flash"></ha-icon>Charging
              </span>`:""}
      </div>
      <div class="bar clickable" @click=${()=>this._moreInfo("sensor.soc")}>
        <div class="fill ${l?"charging":""}" style="width:${n??0}%"></div>
      </div>
      ${u("show_last_seen")||u("show_live_data")?a`<div class="meta">
            ${u("show_last_seen")?a`<span
                  class="seen clickable"
                  @click=${()=>this._moreInfo("sensor.last_update")}
                >
                  <span class="dot"></span>
                  ${c?`Last seen ${c}`:"Never seen"}
                </span>`:a`<span></span>`}
            ${u("show_live_data")?a`<a class="link" @click=${()=>this._dialog="live"}
                  >Live data</a
                >`:""}
          </div>`:""}
      ${u("show_options")||this._config.show_live_data_button===!0?a`<div class="buttons">
            ${u("show_options")?a`<button
                  class="btn"
                  @click=${()=>this._dialog="options"}
                >
                  <ha-icon icon="mdi:tune-variant"></ha-icon>Options
                </button>`:""}
            ${this._config.show_live_data_button===!0?a`<button class="btn" @click=${()=>this._dialog="live"}>
                  <ha-icon icon="mdi:chart-box-outline"></ha-icon>Live data
                </button>`:""}
          </div>`:""}
    </div>`}_renderProfile(){let e=this._vs("select.drive_profile"),t=e?.state;if(!t||t==="unknown")return"";let s=e.attributes?.options||[];return a`<div
        class="profile selectable"
        @click=${()=>this._profileMenu=!this._profileMenu}
      >
        ${t}
        <ha-icon
          icon="mdi:chevron-${this._profileMenu?"up":"down"}"
        ></ha-icon>
      </div>
      ${this._profileMenu?a`<div
              class="menu-backdrop"
              @click=${()=>this._profileMenu=!1}
            ></div>
            <div class="menu">
              ${s.map(i=>a`<button
                  class="menu-item ${i===t?"on":""}"
                  @click=${()=>this._selectProfile(e,i)}
                >
                  ${i}
                  ${i===t?a`<ha-icon icon="mdi:check"></ha-icon>`:""}
                </button>`)}
            </div>`:""}`}_selectProfile(e,t){this._profileMenu=!1,t!==e.state&&this._call("select","select_option",e,{option:t})}_dialogFrame(e,t){return a`<ha-dialog
      open
      hideActions
      .heading=${e}
      @closed=${()=>this._dialog=null}
    >
      <div slot="heading" class="dlg-head">
        <span class="dlg-title">${e}</span>
        <a class="link" @click=${()=>this._dialog=null}>Done</a>
      </div>
      <div class="dlg-body">${t}</div>
    </ha-dialog>`}};var rt=[{name:"device",selector:{device:{integration:R,entity:[{integration:R,domain:"device_tracker"}]}}}],at=[{name:"title",selector:{text:{}}}],Le={illustration:[["show_image","Show car image",!0,"mdi:image-outline"]],profile:[["show_profile","Show drive profile selector",!0,"mdi:car-cog"]],battery:[["show_charge_speed","Show charging speed badge",!0,"mdi:flash"]],status:[["show_last_seen","Show last seen",!0,"mdi:clock-outline"],["show_live_data","Show Live data link",!0,"mdi:link-variant"]],buttons:[["show_options","Show Options button",!0,"mdi:tune-variant"],["show_live_data_button","Show Live data button",!1,"mdi:chart-box-outline"]]},De=[{id:"title",icon:"mdi:format-title",label:"Title"},{id:"entities",icon:"mdi:shape-outline",label:"Entities"},{id:"illustration",icon:"mdi:image-outline",label:"Vehicle illustration"},{id:"profile",icon:"mdi:car-cog",label:"Drive profile"},{id:"battery",icon:"mdi:battery-charging",label:"Battery & charging"},{id:"status",icon:"mdi:clock-outline",label:"Status line"},{id:"buttons",icon:"mdi:gesture-tap-button",label:"Buttons"}],X=class extends _{static get properties(){return{hass:{},_config:{},_page:{state:!0}}}constructor(){super(),this._page=null}connectedCallback(){super.connectedCallback(),G()}setConfig(e){this._config=e||{}}render(){if(!this.hass)return a``;if(this._page?.startsWith("entity:"))return this._renderEntityDetail(this._page.slice(7));if(this._page==="entities")return this._renderEntities();let e=De.find(t=>t.id===this._page);return e?this._renderSubpage(e):this._renderRoot()}_defaults(){let e=z(this.hass),t=this._config.device&&e.find(s=>s.deviceId===this._config.device)||e[0];return{...t?k(this.hass,t.ents):{},...k(this.hass,K(this.hass))}}_renderRoot(){return a`<ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${rt}
        .computeLabel=${()=>"Vehicle (empty = first ABRP vehicle)"}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="nav">
        ${De.map(e=>a`<button
            class="nav-row"
            @click=${()=>this._page=e.id}
          >
            <ha-icon class="nav-icon" icon=${e.icon}></ha-icon>
            <span class="nav-labels">
              <span class="nav-label">${e.label}</span>
              <span class="nav-secondary">${this._summary(e.id)}</span>
            </span>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>`)}
      </div>`}_summary(e){if(e==="title")return this._config.title||"ABRP vehicle name";if(e==="entities"){let i=Object.keys(this._config.entities||{}).length;return i?`${i} overridden`:"Automatic"}let t=Le[e]||[],s=t.filter(([i,,n])=>this._config[i]??n);return s.length?s.length===t.length&&t.length===1?"Shown":s.map(([,i])=>i.replace(/^Show /,"")).join(", "):"Nothing shown"}_renderSubpage(e){return a`${this._subpageHead(e.label,()=>this._page=null)}
      ${e.id==="title"?a`<ha-form
            .hass=${this.hass}
            .data=${this._config}
            .schema=${at}
            .computeLabel=${()=>"Title (empty = ABRP vehicle name)"}
            @value-changed=${this._valueChanged}
          ></ha-form>`:(Le[e.id]||[]).map(([t,s,i,n])=>this._renderToggle(t,s,i,n))}`}_renderToggle(e,t,s,i){return a`<div class="row">
      <ha-icon icon=${i}></ha-icon>
      <span class="row-label">${t}</span>
      <ha-switch
        .checked=${this._config[e]??s}
        @change=${n=>this._toggleDisplay(e,s,n.target.checked)}
      ></ha-switch>
    </div>`}_renderEntities(){let e=this._defaults(),t=this._config.entities||{};return a`${this._subpageHead("Entities",()=>this._page=null)}
      <div class="nav">
        ${de.map(([s,i])=>a`<button
            class="nav-row"
            @click=${()=>this._page=`entity:${s}`}
          >
            <ha-icon
              class="nav-icon"
              icon=${t[s]?"mdi:pencil-circle":"mdi:circle-small"}
            ></ha-icon>
            <span class="nav-labels">
              <span class="nav-label">${i}</span>
              <span class="nav-secondary"
                >${t[s]||e[s]||"not found"}</span
              >
            </span>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>`)}
      </div>`}_renderEntityDetail(e){let t=de.find(([r])=>r===e)?.[1]||e,s=this._config.entities?.[e]||"",i=!!s&&P(s)&&!C(s),n=this._defaults();return a`${this._subpageHead(t,()=>this._page="entities")}
      <div class="hint">
        Default: ${n[e]||"none discovered"}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${{entity:i?s:""}}
        .schema=${[{name:"entity",selector:{entity:{}}}]}
        .computeLabel=${()=>"Entity"}
        @value-changed=${r=>{r.stopPropagation(),this._setOverride(e,r.detail.value.entity||"")}}
      ></ha-form>
      <ha-form
        .hass=${this.hass}
        .data=${{custom:i?"":s}}
        .schema=${[{name:"custom",selector:{text:{}}}]}
        .computeLabel=${()=>"Custom value or template"}
        @value-changed=${r=>{r.stopPropagation(),this._setOverride(e,r.detail.value.custom||"")}}
      ></ha-form>
      <div class="hint">
        Pick an entity, enter a fixed value, or a template like
        <code>{{ states('sensor.example') }}</code>. Leave both empty for
        the automatic entity.
      </div>`}_setOverride(e,t){let s={...this._config.entities||{}};t?s[e]=t:delete s[e];let i={...this._config,entities:s,type:`custom:${g}`};Object.keys(s).length||delete i.entities,this._dispatch(i)}_subpageHead(e,t){return a`<div class="subpage-head">
      <button class="back" @click=${t}>
        <ha-icon icon="mdi:chevron-left"></ha-icon>
      </button>
      <span class="subpage-title">${e}</span>
    </div>`}_toggleDisplay(e,t,s){let i={...this._config,type:`custom:${g}`};s===t?delete i[e]:i[e]=s,this._dispatch(i)}_valueChanged(e){e.stopPropagation();let t={...this._config,...e.detail.value,type:`custom:${g}`};t.device||delete t.device,t.title||delete t.title,this._dispatch(t)}_dispatch(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}static get styles(){return O`
      .nav {
        display: flex;
        flex-direction: column;
        margin-top: 16px;
      }
      .nav-row {
        display: flex;
        align-items: center;
        gap: 14px;
        border: none;
        background: transparent;
        padding: 12px 6px;
        cursor: pointer;
        text-align: left;
        border-radius: 10px;
        color: var(--primary-text-color);
        transition: background-color 0.15s ease;
      }
      .nav-row:hover {
        background: var(--secondary-background-color);
      }
      .nav-row ha-icon {
        color: var(--secondary-text-color);
        --mdc-icon-size: 20px;
      }
      .nav-labels {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .nav-label {
        font-size: 1em;
      }
      .nav-secondary {
        font-size: 0.85em;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 280px;
      }
      .subpage-head {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
      }
      .back {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: transparent;
        color: var(--primary-text-color);
        cursor: pointer;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        transition: background-color 0.15s ease;
      }
      .back:hover {
        background: var(--secondary-background-color);
      }
      .subpage-title {
        font-size: 1.1em;
        font-weight: 600;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 4px;
      }
      .row ha-icon {
        --mdc-icon-size: 20px;
        color: var(--secondary-text-color);
      }
      .row-label {
        flex: 1;
        color: var(--primary-text-color);
      }
      .hint {
        color: var(--secondary-text-color);
        font-size: 0.85em;
        margin: 8px 4px 12px;
      }
      .hint code {
        background: var(--secondary-background-color);
        border-radius: 4px;
        padding: 1px 5px;
      }
      ha-form {
        display: block;
        margin-bottom: 12px;
      }
    `}};customElements.define(g,J);customElements.define(`${g}-editor`,X);window.customCards=window.customCards||[];window.customCards.push({type:g,name:"ABRP Vehicle Card",description:"ABRP-style vehicle card with battery state, live data and plan options.",preview:!0,documentationURL:"https://github.com/MichelFR/ha-abrp"});
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
