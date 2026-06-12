var _="abrp-vehicle-card",R="abrp";var V=globalThis,W=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ee=Symbol(),me=new WeakMap,T=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==ee)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(W&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=me.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&me.set(t,e))}return e}toString(){return this.cssText}},fe=o=>new T(typeof o=="string"?o:o+"",void 0,ee),U=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new T(t,o,ee)},ge=(o,e)=>{if(W)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=V.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,o.appendChild(i)}},te=W?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return fe(t)})(o):o;var{is:je,defineProperty:Ie,getOwnPropertyDescriptor:Be,getOwnPropertyNames:Fe,getOwnPropertySymbols:Ve,getPrototypeOf:We}=Object,q=globalThis,_e=q.trustedTypes,qe=_e?_e.emptyScript:"",Ke=q.reactiveElementPolyfillSupport,N=(o,e)=>o,ie={toAttribute(o,e){switch(e){case Boolean:o=o?qe:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},$e=(o,e)=>!je(o,e),ve={attribute:!0,type:String,converter:ie,reflect:!1,useDefault:!1,hasChanged:$e};Symbol.metadata??=Symbol("metadata"),q.litPropertyMetadata??=new WeakMap;var b=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ve){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Ie(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:r}=Be(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){let l=s?.call(this);r?.call(this,n),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ve}static _$Ei(){if(this.hasOwnProperty(N("elementProperties")))return;let e=We(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(N("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(N("properties"))){let t=this.properties,i=[...Fe(t),...Ve(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(te(s))}else e!==void 0&&t.push(te(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ge(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:ie).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:ie;this._$Em=s;let l=n.fromAttribute(t,r.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(e,t,i,s=!1,r){if(e!==void 0){let n=this.constructor;if(s===!1&&(r=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??$e)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),r!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:n}=r,l=this[s];n!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,r,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[N("elementProperties")]=new Map,b[N("finalized")]=new Map,Ke?.({ReactiveElement:b}),(q.reactiveElementVersions??=[]).push("2.1.2");var le=globalThis,be=o=>o,K=le.trustedTypes,xe=K?K.createPolicy("lit-html",{createHTML:o=>o}):void 0,Ee="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,Ce="?"+y,Ye=`<${Ce}>`,S=document,z=()=>S.createComment(""),D=o=>o===null||typeof o!="object"&&typeof o!="function",de=Array.isArray,Ge=o=>de(o)||typeof o?.[Symbol.iterator]=="function",se=`[ 	
\f\r]`,L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ye=/-->/g,we=/>/g,A=RegExp(`>|${se}(?:([^\\s"'>=/]+)(${se}*=${se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ae=/'/g,ke=/"/g,Pe=/^(?:script|style|textarea|title)$/i,he=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),a=he(1),mt=he(2),ft=he(3),E=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Se=new WeakMap,k=S.createTreeWalker(S,129);function Me(o,e){if(!de(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return xe!==void 0?xe.createHTML(e):e}var Je=(o,e)=>{let t=o.length-1,i=[],s,r=e===2?"<svg>":e===3?"<math>":"",n=L;for(let l=0;l<t;l++){let c=o[l],d,p,h=-1,m=0;for(;m<c.length&&(n.lastIndex=m,p=n.exec(c),p!==null);)m=n.lastIndex,n===L?p[1]==="!--"?n=ye:p[1]!==void 0?n=we:p[2]!==void 0?(Pe.test(p[2])&&(s=RegExp("</"+p[2],"g")),n=A):p[3]!==void 0&&(n=A):n===A?p[0]===">"?(n=s??L,h=-1):p[1]===void 0?h=-2:(h=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?A:p[3]==='"'?ke:Ae):n===ke||n===Ae?n=A:n===ye||n===we?n=L:(n=A,s=void 0);let g=n===A&&o[l+1].startsWith("/>")?" ":"";r+=n===L?c+Ye:h>=0?(i.push(d),c.slice(0,h)+Ee+c.slice(h)+y+g):c+y+(h===-2?l:g)}return[Me(o,r+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},H=class o{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,n=0,l=e.length-1,c=this.parts,[d,p]=Je(e,t);if(this.el=o.createElement(d,i),k.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=k.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Ee)){let m=p[n++],g=s.getAttribute(h).split(y),f=/([.?@])?(.*)/.exec(m);c.push({type:1,index:r,name:f[2],strings:g,ctor:f[1]==="."?re:f[1]==="?"?ne:f[1]==="@"?ae:P}),s.removeAttribute(h)}else h.startsWith(y)&&(c.push({type:6,index:r}),s.removeAttribute(h));if(Pe.test(s.tagName)){let h=s.textContent.split(y),m=h.length-1;if(m>0){s.textContent=K?K.emptyScript:"";for(let g=0;g<m;g++)s.append(h[g],z()),k.nextNode(),c.push({type:2,index:++r});s.append(h[m],z())}}}else if(s.nodeType===8)if(s.data===Ce)c.push({type:2,index:r});else{let h=-1;for(;(h=s.data.indexOf(y,h+1))!==-1;)c.push({type:7,index:r}),h+=y.length-1}r++}}static createElement(e,t){let i=S.createElement("template");return i.innerHTML=e,i}};function C(o,e,t=o,i){if(e===E)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,r=D(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=C(o,s._$AS(o,e.values),s,i)),e}var oe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??S).importNode(t,!0);k.currentNode=s;let r=k.nextNode(),n=0,l=0,c=i[0];for(;c!==void 0;){if(n===c.index){let d;c.type===2?d=new j(r,r.nextSibling,this,e):c.type===1?d=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(d=new ce(r,this,e)),this._$AV.push(d),c=i[++l]}n!==c?.index&&(r=k.nextNode(),n++)}return k.currentNode=S,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},j=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=C(this,e,t),D(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ge(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=H.createElement(Me(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let r=new oe(s,this),n=r.u(this.options);r.p(t),this.T(n),this._$AH=r}}_$AC(e){let t=Se.get(e.strings);return t===void 0&&Se.set(e.strings,t=new H(e)),t}k(e){de(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let r of e)s===t.length?t.push(i=new o(this.O(z()),this.O(z()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=be(e).nextSibling;be(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},P=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}_$AI(e,t=this,i,s){let r=this.strings,n=!1;if(r===void 0)e=C(this,e,t,0),n=!D(e)||e!==this._$AH&&e!==E,n&&(this._$AH=e);else{let l=e,c,d;for(e=r[0],c=0;c<r.length-1;c++)d=C(this,l[i+c],t,c),d===E&&(d=this._$AH[c]),n||=!D(d)||d!==this._$AH[c],d===u?e=u:e!==u&&(e+=(d??"")+r[c+1]),this._$AH[c]=d}n&&!s&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},re=class extends P{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}},ne=class extends P{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}},ae=class extends P{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=C(this,e,t,0)??u)===E)return;let i=this._$AH,s=e===u&&i!==u||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==u&&(i===u||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ce=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){C(this,e)}};var Xe=le.litHtmlPolyfillSupport;Xe?.(H,j),(le.litHtmlVersions??=[]).push("3.3.3");var Oe=(o,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let r=t?.renderBefore??null;i._$litPart$=s=new j(e.insertBefore(z(),r),r,void 0,t??{})}return s._$AI(o),s};var pe=globalThis,v=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Oe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};v._$litElement$=!0,v.finalized=!0,pe.litElementHydrateSupport?.({LitElement:v});var Ze=pe.litElementPolyfillSupport;Ze?.({LitElement:v});(pe.litElementVersions??=[]).push("4.2.2");var Qe={sensor:["soc","range","reference_consumption","battery_capacity","odometer","speed_factor","max_speed","charging_power","elevation","last_update","data_source","vehicle_name","source_last_refresh","obd_last_refresh"],number:["arrival_soc","min_charger_stalls","extra_weight"],select:["charge_stops","drive_profile"],switch:["avoid_tolls","avoid_motorways","avoid_ferries","avoid_borders","realtime_traffic","realtime_weather","adjust_speed"],binary_sensor:["charging"],image:["car_image"],device_tracker:["location"]};function Re(o){return Object.values(o.entities||{}).filter(e=>e.platform===R)}function et(o){if(o.translation_key)return o.translation_key;let e=o.entity_id.split(".")[1],t=e.lastIndexOf("_");return t>=0?e.slice(t+1):e}function I(o){let e=new Map;for(let i of Re(o))i.device_id&&(e.has(i.device_id)||e.set(i.device_id,[]),e.get(i.device_id).push(i));let t=[];for(let[i,s]of e)s.some(r=>et(r)==="soc")&&t.push({deviceId:i,device:o.devices?.[i],ents:s});return t}function Y(o){let e=new Set(I(o).map(t=>t.deviceId));return Re(o).filter(t=>!e.has(t.device_id))}function M(o,e){let t={};for(let i of e){let[s,r]=i.entity_id.split(".");i.translation_key&&(t[`${s}.${i.translation_key}`]=i.entity_id);for(let n of Qe[s]||[])!t[`${s}.${n}`]&&r.endsWith(`_${n}`)&&(t[`${s}.${n}`]=i.entity_id)}return t}function G(o){if(!o)return null;let e=(Date.now()-new Date(o).getTime())/1e3;return Number.isNaN(e)?null:e<90?"just now":e<5400?`${Math.round(e/60)} min ago`:e<129600?`${Math.round(e/3600)} h ago`:`${Math.round(e/86400)} d ago`}function B(o){return o&&o.charAt(0).toUpperCase()+o.slice(1)}function $(o,e=0){let t=Number(o?.state);return Number.isFinite(t)?t.toFixed(e):null}function x(o){return typeof o=="string"&&/\{[{%]/.test(o)}function w(o){return typeof o=="string"&&/^[a-z_]+\.[a-zA-Z0-9_]+$/.test(o)}var Te=!1;async function J(){if(!Te){Te=!0;try{await(await window.loadCardHelpers?.())?.importMoreInfoControl?.("light")}catch{}}}var Ue=U`
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
  .confirm-text {
    color: var(--primary-text-color);
    padding: 4px 4px 0;
  }
  .confirm-actions {
    display: flex;
    gap: 12px;
    margin-top: 20px;
  }
  .btn.primary {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
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
`;function Ne(o){let e=o._vs("sensor.data_source")?.attributes?.providers||{},t=(c,d="ABRP Estimate")=>B(e[c])||d,i=(c,d)=>o._vs(c)?.attributes?.unit_of_measurement??d,s=Number(o._vs("sensor.speed_factor")?.state),r=[["SoC",$(o._vs("sensor.soc")),"%",t("soc"),"sensor.soc"],["Range",$(o._vs("sensor.range")),i("sensor.range","km"),t("est_battery_range"),"sensor.range"],["Calibrated reference consumption",$(o._vs("sensor.reference_consumption")),i("sensor.reference_consumption","Wh/km"),t("calib_ref_cons"),"sensor.reference_consumption"],["Battery capacity",$(o._vs("sensor.battery_capacity")),"kWh",t("battery_capacity",t("capacity")),"sensor.battery_capacity"],["Odometer",$(o._vs("sensor.odometer")),i("sensor.odometer","km"),t("odometer"),"sensor.odometer"],["Location",o._vs("device_tracker.location")?.state,"",t("lat",""),"device_tracker.location"],["Reference speed",Number.isFinite(s)?Math.round(s*100):null,"%",t("speed_factor"),"sensor.speed_factor"],["Maximum speed",$(o._vs("sensor.max_speed")),i("sensor.max_speed","km/h"),t("max_speed"),"sensor.max_speed"],["Elevation",$(o._vs("sensor.elevation")),i("sensor.elevation","m"),t("elevation",""),"sensor.elevation"]],l=[[B(o._vs("sensor.data_source")?.state),o._vs("sensor.source_last_refresh")?.state,"sensor.source_last_refresh"],["Obdble",o._vs("sensor.obd_last_refresh")?.state,"sensor.obd_last_refresh"]].filter(([c,d])=>c&&d&&d!=="unknown"&&d!=="unavailable");return a`<div class="grid">
      ${r.map(([c,d,p,h,m])=>a`<div
          class="tile clickable"
          @click=${()=>o._moreInfo(m)}
        >
          <div class="tile-title">${c}</div>
          <div class="tile-value">
            ${d??"\u2013"}<span class="tile-unit"> ${p}</span>
          </div>
          ${h?a`<div class="tile-prov">${h}</div>`:""}
        </div>`)}
    </div>
    ${l.length?a`<div class="sources">
          ${l.map(([c,d,p])=>a`<span
              class="seen clickable"
              @click=${()=>o._moreInfo(p)}
            >
              <span class="dot"></span>${c}
              <span class="src-time">${G(d)}</span>
            </span>`)}
        </div>`:""}`}var tt={optimal:"Optimal",fewer:"Fewer",least:"Fewest"},it=[["switch.avoid_tolls","mdi:cash-multiple","Tolls"],["switch.avoid_motorways","mdi:highway","Highways"],["switch.avoid_ferries","mdi:ferry","Ferries and car trains"],["switch.avoid_borders","mdi:boom-gate","Borders"]],st=[["switch.realtime_traffic","mdi:traffic-light","Realtime traffic"],["switch.realtime_weather","mdi:weather-partly-cloudy","Realtime weather"],["switch.adjust_speed","mdi:speedometer","Adjust speed to limits"]],F=(o,e)=>a`<div class="section"><ha-icon icon=${o}></ha-icon>${e}</div>`;function Le(o){let e=o._as("select.charge_stops"),t=o._vs("select.drive_profile");return a`
    ${e?ot(o,e):""}
    ${ue(o,"Destination arrival SoC","mdi:battery-low",o._as("number.arrival_soc"),"%")}
    ${F("mdi:cancel","Avoid on route")}
    <div class="chips">
      ${it.map(([i,s,r])=>rt(o,i,s,r))}
    </div>
    ${F("mdi:update","Realtime")}
    ${st.map(([i,s,r])=>nt(o,i,s,r))}
    ${ue(o,"Minimum charger stalls","mdi:counter",o._as("number.min_charger_stalls"),"")}
    ${ue(o,"Extra weight","mdi:weight-kilogram",o._as("number.extra_weight")," kg")}
    ${at(o,t)}
  `}function ot(o,e){return a`${F("mdi:ev-station","Charge stops")}
    <div class="segments">
      ${(e.attributes.options||[]).map(t=>a`<button
          class="segment ${e.state===t?"on":""}"
          @click=${()=>o._call("select","select_option",e,{option:t})}
        >
          ${tt[t]||B(t)}
        </button>`)}
    </div>`}function ue(o,e,t,i,s){if(!i)return"";let r=i.attributes,n=Number(i.state);return a`${F(t,e)}
    <div class="slider-row">
      <span class="slider-value"
        >${Number.isFinite(n)?n:"\u2013"}${s}</span
      >
      <ha-slider
        pin
        min=${r.min??0}
        max=${r.max??100}
        step=${r.step??1}
        .value=${n}
        @change=${l=>{o._call("number","set_value",i,{value:Number(l.target.value)}),l.target.closest(".slider-row").querySelector(".slider-value").textContent=`${l.target.value}${s}`}}
      ></ha-slider>
    </div>`}function rt(o,e,t,i){let s=o._as(e);if(!s)return"";let r=s.state==="on";return a`<button
    class="chip ${r?"on":""}"
    @click=${()=>o._call("switch","toggle",s)}
  >
    <ha-icon icon="${t}"></ha-icon>${i}
  </button>`}function nt(o,e,t,i){let s=o._as(e);return s?a`<div class="switch-row">
    <span class="switch-label"><ha-icon icon=${t}></ha-icon>${i}</span>
    <ha-switch
      .checked=${s.state==="on"}
      @change=${()=>o._call("switch","toggle",s)}
    ></ha-switch>
  </div>`:""}function at(o,e){return e?.attributes?.options?.length?a`${F("mdi:car-cog","Drive profile")}
    <ha-select
      naturalMenuWidth
      fixedMenuPosition
      .value=${e.state}
      @selected=${t=>{let i=t.target.value;i&&i!==e.state&&o._requestProfileChange(e,i)}}
      @closed=${t=>t.stopPropagation()}
    >
      ${e.attributes.options.map(t=>a`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
    </ha-select>`:""}var X=class extends v{static styles=Ue;static get properties(){return{hass:{},_config:{},_dialog:{state:!0},_profileMenu:{state:!0},_confirmProfile:{state:!0}}}constructor(){super(),this._dialog=null,this._profileMenu=!1,this._confirmProfile=null}connectedCallback(){super.connectedCallback(),J()}setConfig(e){this._config=e||{}}static getConfigElement(){return document.createElement(`${_}-editor`)}static getStubConfig(){return{}}getCardSize(){return 5}get _vehicle(){let e=I(this.hass);return e.length?this._config.device&&e.find(t=>t.deviceId===this._config.device)||e[0]:null}_resolve(e,t){let i=this._config.entities?.[e];if(i){if(x(i)){let r=this._templateResults?.[i];return{state:r===void 0?"unknown":String(r),attributes:{}}}return w(i)?this.hass.states[i]:{state:i,attributes:{}}}let s=t?.[e];return s?this.hass.states[s]:void 0}_vs(e){return this._resolve(e,this._vmap)}_as(e){return this._resolve(e,this._amap)}updated(e){super.updated(e),(e.has("hass")||e.has("_config"))&&this._syncTemplates()}disconnectedCallback(){super.disconnectedCallback();for(let e of Object.values(this._tmplUnsub||{}))typeof e=="function"&&e();this._tmplUnsub={}}async _syncTemplates(){if(!this.hass?.connection)return;this._tmplUnsub=this._tmplUnsub||{},this._templateResults=this._templateResults||{};let e=[...Object.values(this._config.entities||{}),this._config.title].filter(t=>x(t));for(let t of e)if(!this._tmplUnsub[t]){this._tmplUnsub[t]=!0;try{this._tmplUnsub[t]=await this.hass.connection.subscribeMessage(i=>{this._templateResults[t]=i.result,this.requestUpdate()},{type:"render_template",template:t})}catch{this._templateResults[t]="error",this.requestUpdate()}}for(let t of Object.keys(this._tmplUnsub))if(!e.includes(t)){let i=this._tmplUnsub[t];typeof i=="function"&&i(),delete this._tmplUnsub[t],delete this._templateResults[t]}}_moreInfo(e){let t=this._config.entities?.[e],i=t&&w(t)&&!x(t)?t:this._vmap?.[e]||this._amap?.[e];!i||t&&!w(t)||this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:i},bubbles:!0,composed:!0}))}_call(e,t,i,s={}){this.hass.callService(e,t,{entity_id:i.entity_id,...s})}render(){if(!this.hass)return a``;let e=this._vehicle;return e?(this._vmap=M(this.hass,e.ents),this._amap=M(this.hass,Y(this.hass)),a`<ha-card>
      ${this._renderMain(e)}
      ${this._dialog==="options"?this._dialogFrame("Plan options",Le(this)):""}
      ${this._dialog==="live"?this._dialogFrame("Live data",Ne(this)):""}
      ${this._confirmProfile?this._renderConfirmProfile():""}
    </ha-card>`):a`<ha-card>
        <div class="empty">
          No ABRP vehicle found — set up the ABRP integration first.
        </div>
      </ha-card>`}_renderMain(e){let t=this._vs("sensor.vehicle_name")?.state,i=this._config.title,r=(i&&x(i)?String(this._templateResults?.[i]??""):i)||(t&&t!=="unknown"&&t!=="unavailable"?t:null)||e.device?.name_by_user||e.device?.name||"Vehicle",n=this._vs("sensor.soc"),l=$(n),c=this._vs("image.car_image"),d=c?.attributes?.entity_picture||(typeof c?.state=="string"&&(c.state.startsWith("http")||c.state.startsWith("/"))?c.state:null),p=G(this._vs("sensor.last_update")?.state),h=this._vs("binary_sensor.charging")?.state==="on",m=Number(this._vs("sensor.charging_power")?.state),g=h&&Number.isFinite(m)&&m>0?`${m<10?m.toFixed(1):Math.round(m)} kW`:null,f=Q=>this._config[Q]!==!1;return a`<div class="main">
      <div class="head">
        <div class="head-left">
          <div class="name">${r}</div>
          ${f("show_profile")?this._renderProfile():""}
        </div>
        ${f("show_image")&&d?a`<img
              class="car clickable"
              src="${d}"
              alt="${r}"
              @click=${()=>this._moreInfo("image.car_image")}
            />`:""}
      </div>
      <div class="soc-row clickable" @click=${()=>this._moreInfo("sensor.soc")}>
        ${n?a`<ha-state-icon
              .hass=${this.hass}
              .stateObj=${n}
            ></ha-state-icon>`:a`<ha-icon icon="mdi:battery"></ha-icon>`}
        <span class="soc">${l??"\u2013"}%</span>
        ${f("show_charge_speed")&&g?a`<span
              class="charge-speed clickable"
              @click=${Q=>{Q.stopPropagation(),this._moreInfo("sensor.charging_power")}}
            >
              <ha-icon icon="mdi:flash"></ha-icon>${g}
            </span>`:f("show_charge_speed")&&h?a`<span class="charge-speed">
                <ha-icon icon="mdi:flash"></ha-icon>Charging
              </span>`:""}
      </div>
      <div class="bar clickable" @click=${()=>this._moreInfo("sensor.soc")}>
        <div class="fill ${h?"charging":""}" style="width:${l??0}%"></div>
      </div>
      ${f("show_last_seen")||f("show_live_data")?a`<div class="meta">
            ${f("show_last_seen")?a`<span
                  class="seen clickable"
                  @click=${()=>this._moreInfo("sensor.last_update")}
                >
                  <span class="dot"></span>
                  ${p?`Last seen ${p}`:"Never seen"}
                </span>`:a`<span></span>`}
            ${f("show_live_data")?a`<a class="link" @click=${()=>this._dialog="live"}
                  >Live data</a
                >`:""}
          </div>`:""}
      ${f("show_options")||this._config.show_live_data_button===!0?a`<div class="buttons">
            ${f("show_options")?a`<button
                  class="btn"
                  @click=${()=>this._dialog="options"}
                >
                  <ha-icon icon="mdi:tune-variant"></ha-icon>Options
                </button>`:""}
            ${this._config.show_live_data_button===!0?a`<button class="btn" @click=${()=>this._dialog="live"}>
                  <ha-icon icon="mdi:chart-box-outline"></ha-icon>Live data
                </button>`:""}
          </div>`:""}
    </div>`}_renderProfile(){let e=this._vs("select.drive_profile"),t=e?.state;if(!t||t==="unknown")return"";let i=e.attributes?.options||[];return a`<div
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
              ${i.map(s=>a`<button
                  class="menu-item ${s===t?"on":""}"
                  @click=${()=>this._selectProfile(e,s)}
                >
                  ${s}
                  ${s===t?a`<ha-icon icon="mdi:check"></ha-icon>`:""}
                </button>`)}
            </div>`:""}`}_selectProfile(e,t){this._profileMenu=!1,this._requestProfileChange(e,t)}_requestProfileChange(e,t){t!==e.state&&(this._config.confirm_profile_change===!1?this._call("select","select_option",e,{option:t}):this._confirmProfile={state:e,option:t})}_renderConfirmProfile(){let{state:e,option:t}=this._confirmProfile;return a`<ha-dialog
      open
      hideActions
      .heading=${"Switch drive profile?"}
      @closed=${()=>this._confirmProfile=null}
    >
      <div slot="heading" class="dlg-head">
        <span class="dlg-title">Switch drive profile?</span>
      </div>
      <div class="confirm-text">
        Switch the drive profile from "${e.state}" to "${t}"?
      </div>
      <div class="confirm-actions">
        <button class="btn" @click=${()=>this._confirmProfile=null}>
          Cancel
        </button>
        <button
          class="btn primary"
          @click=${()=>{this._call("select","select_option",e,{option:t}),this._confirmProfile=null}}
        >
          <ha-icon icon="mdi:check"></ha-icon>Switch
        </button>
      </div>
    </ha-dialog>`}_dialogFrame(e,t){return a`<ha-dialog
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
    </ha-dialog>`}};var ct=[{name:"device",selector:{device:{integration:R,entity:[{integration:R,domain:"device_tracker"}]}}}],ze={illustration:[["show_image","Show car image",!0,"mdi:image-outline"]],profile:[["show_profile","Show drive profile selector",!0,"mdi:car-cog"],["confirm_profile_change","Confirm before changing",!0,"mdi:shield-check-outline"]],battery:[["show_charge_speed","Show charging speed badge",!0,"mdi:flash"]],status:[["show_last_seen","Show last seen",!0,"mdi:clock-outline"],["show_live_data","Show Live data link",!0,"mdi:link-variant"]],buttons:[["show_options","Show Options button",!0,"mdi:tune-variant"],["show_live_data_button","Show Live data button",!1,"mdi:chart-box-outline"]]},De={illustration:[["image.car_image","Car image","mdi:image-outline"]],profile:[["select.drive_profile","Drive profile","mdi:car-cog"]],battery:[["sensor.soc","State of charge","mdi:battery-high"],["binary_sensor.charging","Charging","mdi:battery-charging"],["sensor.charging_power","Charging power","mdi:flash"]],status:[["sensor.last_update","Last update","mdi:clock-outline"]],livedata:[["sensor.soc","State of charge","mdi:battery-high"],["sensor.range","Range","mdi:map-marker-distance"],["sensor.reference_consumption","Reference consumption","mdi:lightning-bolt-outline"],["sensor.battery_capacity","Battery capacity","mdi:battery"],["sensor.odometer","Odometer","mdi:counter"],["device_tracker.location","Location","mdi:map-marker"],["sensor.speed_factor","Speed factor","mdi:speedometer"],["sensor.max_speed","Maximum speed","mdi:speedometer-medium"],["sensor.elevation","Elevation","mdi:image-filter-hdr"],["sensor.data_source","Data source","mdi:database-outline"],["sensor.source_last_refresh","Cloud last refresh","mdi:cloud-outline"],["sensor.obd_last_refresh","OBD last refresh","mdi:car-connected"]]},He=[{id:"title",icon:"mdi:format-title",label:"Title"},{id:"illustration",icon:"mdi:image-outline",label:"Vehicle illustration"},{id:"profile",icon:"mdi:car-cog",label:"Drive profile"},{id:"battery",icon:"mdi:battery-charging",label:"Battery & charging"},{id:"status",icon:"mdi:clock-outline",label:"Status line"},{id:"buttons",icon:"mdi:gesture-tap-button",label:"Buttons"},{id:"livedata",icon:"mdi:chart-box-outline",label:"Live data"}],O="sensor.vehicle_name",Z=class extends v{static get properties(){return{hass:{},_config:{},_page:{state:!0},_modes:{state:!0}}}constructor(){super(),this._page=null,this._modes={}}connectedCallback(){super.connectedCallback(),J()}setConfig(e){this._config=e||{}}render(){if(!this.hass)return a``;let e=He.find(t=>t.id===this._page);return e?this._renderSubpage(e):this._renderRoot()}_defaults(){let e=I(this.hass),t=this._config.device&&e.find(i=>i.deviceId===this._config.device)||e[0];return{...t?M(this.hass,t.ents):{},...M(this.hass,Y(this.hass))}}_renderRoot(){return a`<ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ct}
        .computeLabel=${()=>"Vehicle (empty = first ABRP vehicle)"}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="nav">
        ${He.map(e=>a`<button
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
      </div>`}_summary(e){if(e==="title")return this._config.title||(this._config.entities?.[O]??"ABRP vehicle name");let t=(De[e]||[]).filter(([n])=>this._config.entities?.[n]).length,i=t?` \xB7 ${t} overridden`:"",s=ze[e]||[];if(!s.length)return t?i.slice(3):"Automatic";let r=s.filter(([n,,l])=>this._config[n]??l);return r.length?r.length===s.length&&s.length===1?`Shown${i}`:r.map(([,n])=>n.replace(/^Show /,"")).join(", ")+i:`Nothing shown${i}`}_renderSubpage(e){return a`<div class="subpage-head">
        <button class="back" @click=${()=>this._page=null}>
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </button>
        <span class="subpage-title">${e.label}</span>
      </div>
      ${(ze[e.id]||[]).map(([t,i,s,r])=>this._renderToggle(t,i,s,r))}
      ${e.id==="title"?this._renderTitleSlot():(De[e.id]||[]).map(([t,i,s])=>this._renderSlot(t,i,s))}`}_renderToggle(e,t,i,s){return a`<div class="row">
      <ha-icon icon=${s}></ha-icon>
      <span class="row-label">${t}</span>
      <ha-switch
        .checked=${this._config[e]??i}
        @change=${r=>this._toggleDisplay(e,i,r.target.checked)}
      ></ha-switch>
    </div>`}_slotMode(e,t){return this._modes[e]?this._modes[e]:t?w(t)&&!x(t)?"entity":"custom":"auto"}_renderModeChips(e,t,i){return a`<div class="modes">
      ${[["auto","Automatic"],["entity","Entity"],["custom","Custom"]].map(([s,r])=>a`<button
          class="mode ${t===s?"on":""}"
          @click=${()=>i(s)}
        >
          ${r}
        </button>`)}
    </div>`}_renderSlot(e,t,i){let s=this._config.entities?.[e]||"",r=this._slotMode(e,s),n=this._defaults()[e];return a`<div class="section">
        <ha-icon icon=${i}></ha-icon>${t}
      </div>
      ${this._renderModeChips(e,r,l=>{this._modes={...this._modes,[e]:l},l==="auto"&&this._setOverride(e,"")})}
      ${r==="auto"?a`<div class="hint">Automatic: ${n||"not found"}</div>`:r==="entity"?a`<ha-form
              .hass=${this.hass}
              .data=${{value:w(s)&&!x(s)?s:""}}
              .schema=${[{name:"value",selector:{entity:{}}}]}
              .computeLabel=${()=>"Entity"}
              @value-changed=${l=>{l.stopPropagation(),this._setOverride(e,l.detail.value.value||"")}}
            ></ha-form>`:a`<ha-form
              .hass=${this.hass}
              .data=${{value:w(s)&&!x(s)?"":s}}
              .schema=${[{name:"value",selector:{template:{}}}]}
              .computeLabel=${()=>"Value or template"}
              @value-changed=${l=>{l.stopPropagation(),this._setOverride(e,l.detail.value.value||"")}}
            ></ha-form>`}`}_renderTitleSlot(){let e=this._config.entities?.[O]||"",t=this._config.title||"",i=this._modes.__title||(t?"custom":e?"entity":"auto"),s=this._defaults()[O];return a`<div class="section">
        <ha-icon icon="mdi:format-title"></ha-icon>Name
      </div>
      ${this._renderModeChips("__title",i,r=>{this._modes={...this._modes,__title:r},r==="auto"?this._dispatch(this._withoutTitle(this._withOverride(O,""))):r==="entity"?this._dispatch(this._withoutTitle(this._config)):r==="custom"&&this._dispatch(this._withOverride(O,""))})}
      ${i==="auto"?a`<div class="hint">
            Automatic: ${s||"ABRP vehicle name"}
          </div>`:i==="entity"?a`<ha-form
              .hass=${this.hass}
              .data=${{value:e}}
              .schema=${[{name:"value",selector:{entity:{}}}]}
              .computeLabel=${()=>"Entity"}
              @value-changed=${r=>{r.stopPropagation(),this._setOverride(O,r.detail.value.value||"")}}
            ></ha-form>`:a`<ha-form
              .hass=${this.hass}
              .data=${{value:t}}
              .schema=${[{name:"value",selector:{template:{}}}]}
              .computeLabel=${()=>"Custom name or template"}
              @value-changed=${r=>{r.stopPropagation();let n={...this._config,type:`custom:${_}`};r.detail.value.value?n.title=r.detail.value.value:delete n.title,this._dispatch(n)}}
            ></ha-form>`}`}_withOverride(e,t){let i={...this._config.entities||{}};t?i[e]=t:delete i[e];let s={...this._config,entities:i,type:`custom:${_}`};return Object.keys(i).length||delete s.entities,s}_withoutTitle(e){let t={...e};return delete t.title,t}_setOverride(e,t){this._dispatch(this._withOverride(e,t))}_toggleDisplay(e,t,i){let s={...this._config,type:`custom:${_}`};i===t?delete s[e]:s[e]=i,this._dispatch(s)}_valueChanged(e){e.stopPropagation();let t={...this._config,...e.detail.value,type:`custom:${_}`};t.device||delete t.device,this._dispatch(t)}_dispatch(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}static get styles(){return U`
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
        position: sticky;
        top: 0;
        z-index: 2;
        background: var(--card-background-color, var(--ha-card-background));
        padding: 8px 0;
        margin-top: -8px;
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
      .section {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        margin: 18px 0 8px;
        color: var(--primary-text-color);
      }
      .section ha-icon {
        --mdc-icon-size: 18px;
        color: var(--secondary-text-color);
      }
      .modes {
        display: flex;
        background: var(--secondary-background-color);
        border-radius: 10px;
        padding: 3px;
        margin-bottom: 10px;
      }
      .mode {
        flex: 1;
        border: none;
        background: transparent;
        color: var(--primary-text-color);
        padding: 8px 0;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.9em;
        transition: background-color 0.15s ease, color 0.15s ease;
      }
      .mode:hover:not(.on) {
        background: rgba(127, 127, 127, 0.18);
      }
      .mode.on {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        font-weight: 600;
      }
      .hint {
        color: var(--secondary-text-color);
        font-size: 0.85em;
        margin: 4px 4px 12px;
      }
      ha-form {
        display: block;
        margin-bottom: 12px;
      }
    `}};customElements.define(_,X);customElements.define(`${_}-editor`,Z);window.customCards=window.customCards||[];window.customCards.push({type:_,name:"ABRP Vehicle Card",description:"ABRP-style vehicle card with battery state, live data and plan options.",preview:!0,documentationURL:"https://github.com/MichelFR/ha-abrp"});
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
