var f="abrp-vehicle-card",S="abrp";var z=globalThis,I=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),le=new WeakMap,C=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(I&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=le.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&le.set(t,e))}return e}toString(){return this.cssText}},de=i=>new C(typeof i=="string"?i:i+"",void 0,K),P=(i,...e)=>{let t=i.length===1?i[0]:e.reduce((s,o,r)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+i[r+1],i[0]);return new C(t,i,K)},he=(i,e)=>{if(I)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),o=z.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=t.cssText,i.appendChild(s)}},Y=I?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return de(t)})(i):i;var{is:Oe,defineProperty:Te,getOwnPropertyDescriptor:Le,getOwnPropertyNames:Ue,getOwnPropertySymbols:De,getPrototypeOf:He}=Object,j=globalThis,pe=j.trustedTypes,ze=pe?pe.emptyScript:"",Ie=j.reactiveElementPolyfillSupport,M=(i,e)=>i,G={toAttribute(i,e){switch(e){case Boolean:i=i?ze:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},me=(i,e)=>!Oe(i,e),ue={attribute:!0,type:String,converter:G,reflect:!1,useDefault:!1,hasChanged:me};Symbol.metadata??=Symbol("metadata"),j.litPropertyMetadata??=new WeakMap;var v=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ue){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),o=this.getPropertyDescriptor(e,s,t);o!==void 0&&Te(this.prototype,e,o)}}static getPropertyDescriptor(e,t,s){let{get:o,set:r}=Le(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:o,set(n){let h=o?.call(this);r?.call(this,n),this.requestUpdate(e,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ue}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;let e=He(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){let t=this.properties,s=[...Ue(t),...De(t)];for(let o of s)this.createProperty(o,t[o])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,o]of t)this.elementProperties.set(s,o)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let o=this._$Eu(t,s);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let o of s)t.unshift(Y(o))}else e!==void 0&&t.push(Y(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return he(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,s);if(o!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:G).toAttribute(t,s.type);this._$Em=e,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,t){let s=this.constructor,o=s._$Eh.get(e);if(o!==void 0&&this._$Em!==o){let r=s.getPropertyOptions(o),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:G;this._$Em=o;let h=n.fromAttribute(t,r.type);this[o]=h??this._$Ej?.get(o)??h,this._$Em=null}}requestUpdate(e,t,s,o=!1,r){if(e!==void 0){let n=this.constructor;if(o===!1&&(r=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??me)(r,t)||s.useDefault&&s.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:o,wrapped:r},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),r!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[o,r]of s){let{wrapped:n}=r,h=this[o];n!==!0||this._$AL.has(o)||h===void 0||this.C(o,void 0,r,h)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[M("elementProperties")]=new Map,v[M("finalized")]=new Map,Ie?.({ReactiveElement:v}),(j.reactiveElementVersions??=[]).push("2.1.2");var se=globalThis,ge=i=>i,B=se.trustedTypes,_e=B?B.createPolicy("lit-html",{createHTML:i=>i}):void 0,ye="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,we="?"+b,je=`<${we}>`,w=document,N=()=>w.createComment(""),O=i=>i===null||typeof i!="object"&&typeof i!="function",ie=Array.isArray,Be=i=>ie(i)||typeof i?.[Symbol.iterator]=="function",J=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fe=/-->/g,ve=/>/g,x=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$e=/'/g,be=/"/g,Ae=/^(?:script|style|textarea|title)$/i,oe=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),c=oe(1),lt=oe(2),dt=oe(3),A=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),xe=new WeakMap,y=w.createTreeWalker(w,129);function ke(i,e){if(!ie(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return _e!==void 0?_e.createHTML(e):e}var Fe=(i,e)=>{let t=i.length-1,s=[],o,r=e===2?"<svg>":e===3?"<math>":"",n=R;for(let h=0;h<t;h++){let a=i[h],d,p,l=-1,m=0;for(;m<a.length&&(n.lastIndex=m,p=n.exec(a),p!==null);)m=n.lastIndex,n===R?p[1]==="!--"?n=fe:p[1]!==void 0?n=ve:p[2]!==void 0?(Ae.test(p[2])&&(o=RegExp("</"+p[2],"g")),n=x):p[3]!==void 0&&(n=x):n===x?p[0]===">"?(n=o??R,l=-1):p[1]===void 0?l=-2:(l=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?x:p[3]==='"'?be:$e):n===be||n===$e?n=x:n===fe||n===ve?n=R:(n=x,o=void 0);let $=n===x&&i[h+1].startsWith("/>")?" ":"";r+=n===R?a+je:l>=0?(s.push(d),a.slice(0,l)+ye+a.slice(l)+b+$):a+b+(l===-2?h:$)}return[ke(i,r+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},T=class i{constructor({strings:e,_$litType$:t},s){let o;this.parts=[];let r=0,n=0,h=e.length-1,a=this.parts,[d,p]=Fe(e,t);if(this.el=i.createElement(d,s),y.currentNode=this.el.content,t===2||t===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(o=y.nextNode())!==null&&a.length<h;){if(o.nodeType===1){if(o.hasAttributes())for(let l of o.getAttributeNames())if(l.endsWith(ye)){let m=p[n++],$=o.getAttribute(l).split(b),H=/([.?@])?(.*)/.exec(m);a.push({type:1,index:r,name:H[2],strings:$,ctor:H[1]==="."?Z:H[1]==="?"?Q:H[1]==="@"?ee:E}),o.removeAttribute(l)}else l.startsWith(b)&&(a.push({type:6,index:r}),o.removeAttribute(l));if(Ae.test(o.tagName)){let l=o.textContent.split(b),m=l.length-1;if(m>0){o.textContent=B?B.emptyScript:"";for(let $=0;$<m;$++)o.append(l[$],N()),y.nextNode(),a.push({type:2,index:++r});o.append(l[m],N())}}}else if(o.nodeType===8)if(o.data===we)a.push({type:2,index:r});else{let l=-1;for(;(l=o.data.indexOf(b,l+1))!==-1;)a.push({type:7,index:r}),l+=b.length-1}r++}}static createElement(e,t){let s=w.createElement("template");return s.innerHTML=e,s}};function k(i,e,t=i,s){if(e===A)return e;let o=s!==void 0?t._$Co?.[s]:t._$Cl,r=O(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),r===void 0?o=void 0:(o=new r(i),o._$AT(i,t,s)),s!==void 0?(t._$Co??=[])[s]=o:t._$Cl=o),o!==void 0&&(e=k(i,o._$AS(i,e.values),o,s)),e}var X=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,o=(e?.creationScope??w).importNode(t,!0);y.currentNode=o;let r=y.nextNode(),n=0,h=0,a=s[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new L(r,r.nextSibling,this,e):a.type===1?d=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(d=new te(r,this,e)),this._$AV.push(d),a=s[++h]}n!==a?.index&&(r=y.nextNode(),n++)}return y.currentNode=w,o}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},L=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,o){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=k(this,e,t),O(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Be(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,o=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=T.createElement(ke(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(t);else{let r=new X(o,this),n=r.u(this.options);r.p(t),this.T(n),this._$AH=r}}_$AC(e){let t=xe.get(e.strings);return t===void 0&&xe.set(e.strings,t=new T(e)),t}k(e){ie(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,o=0;for(let r of e)o===t.length?t.push(s=new i(this.O(N()),this.O(N()),this,this.options)):s=t[o],s._$AI(r),o++;o<t.length&&(this._$AR(s&&s._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=ge(e).nextSibling;ge(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,o,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(e,t=this,s,o){let r=this.strings,n=!1;if(r===void 0)e=k(this,e,t,0),n=!O(e)||e!==this._$AH&&e!==A,n&&(this._$AH=e);else{let h=e,a,d;for(e=r[0],a=0;a<r.length-1;a++)d=k(this,h[s+a],t,a),d===A&&(d=this._$AH[a]),n||=!O(d)||d!==this._$AH[a],d===u?e=u:e!==u&&(e+=(d??"")+r[a+1]),this._$AH[a]=d}n&&!o&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Z=class extends E{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}},Q=class extends E{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}},ee=class extends E{constructor(e,t,s,o,r){super(e,t,s,o,r),this.type=5}_$AI(e,t=this){if((e=k(this,e,t,0)??u)===A)return;let s=this._$AH,o=e===u&&s!==u||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==u&&(s===u||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},te=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){k(this,e)}};var We=se.litHtmlPolyfillSupport;We?.(T,L),(se.litHtmlVersions??=[]).push("3.3.3");var Ee=(i,e,t)=>{let s=t?.renderBefore??e,o=s._$litPart$;if(o===void 0){let r=t?.renderBefore??null;s._$litPart$=o=new L(e.insertBefore(N(),r),r,void 0,t??{})}return o._$AI(i),o};var re=globalThis,g=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ee(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};g._$litElement$=!0,g.finalized=!0,re.litElementHydrateSupport?.({LitElement:g});var Ve=re.litElementPolyfillSupport;Ve?.({LitElement:g});(re.litElementVersions??=[]).push("4.2.2");var qe={sensor:["soc","range","reference_consumption","battery_capacity","odometer","speed_factor","max_speed","charging_power","elevation","last_update","data_source","vehicle_name","source_last_refresh","obd_last_refresh"],number:["arrival_soc","min_charger_stalls","extra_weight"],select:["charge_stops","drive_profile"],switch:["avoid_tolls","avoid_motorways","avoid_ferries","avoid_borders","realtime_traffic","realtime_weather","adjust_speed"],binary_sensor:["charging"],image:["car_image"],device_tracker:["location"]};function Se(i){return Object.values(i.entities||{}).filter(e=>e.platform===S)}function Ke(i){if(i.translation_key)return i.translation_key;let e=i.entity_id.split(".")[1],t=e.lastIndexOf("_");return t>=0?e.slice(t+1):e}function ne(i){let e=new Map;for(let s of Se(i))s.device_id&&(e.has(s.device_id)||e.set(s.device_id,[]),e.get(s.device_id).push(s));let t=[];for(let[s,o]of e)o.some(r=>Ke(r)==="soc")&&t.push({deviceId:s,device:i.devices?.[s],ents:o});return t}function Ce(i){let e=new Set(ne(i).map(t=>t.deviceId));return Se(i).filter(t=>!e.has(t.device_id))}function ae(i,e){let t={};for(let s of e){let[o,r]=s.entity_id.split(".");s.translation_key&&(t[`${o}.${s.translation_key}`]=s.entity_id);for(let n of qe[o]||[])!t[`${o}.${n}`]&&r.endsWith(`_${n}`)&&(t[`${o}.${n}`]=s.entity_id)}return t}function F(i){if(!i)return null;let e=(Date.now()-new Date(i).getTime())/1e3;return Number.isNaN(e)?null:e<90?"just now":e<5400?`${Math.round(e/60)} min ago`:e<129600?`${Math.round(e/3600)} h ago`:`${Math.round(e/86400)} d ago`}function U(i){return i&&i.charAt(0).toUpperCase()+i.slice(1)}function _(i,e=0){let t=Number(i?.state);return Number.isFinite(t)?t.toFixed(e):null}var Pe=!1;async function W(){if(!Pe){Pe=!0;try{await(await window.loadCardHelpers?.())?.importMoreInfoControl?.("light")}catch{}}}var Me=P`
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
`;function Re(i){let e=i._vs("sensor.data_source")?.attributes?.providers||{},t=(a,d="ABRP Estimate")=>U(e[a])||d,s=(a,d)=>i._vs(a)?.attributes?.unit_of_measurement??d,o=Number(i._vs("sensor.speed_factor")?.state),r=[["SoC",_(i._vs("sensor.soc")),"%",t("soc"),"sensor.soc"],["Range",_(i._vs("sensor.range")),s("sensor.range","km"),t("est_battery_range"),"sensor.range"],["Calibrated reference consumption",_(i._vs("sensor.reference_consumption")),s("sensor.reference_consumption","Wh/km"),t("calib_ref_cons"),"sensor.reference_consumption"],["Battery capacity",_(i._vs("sensor.battery_capacity")),"kWh",t("battery_capacity",t("capacity")),"sensor.battery_capacity"],["Odometer",_(i._vs("sensor.odometer")),s("sensor.odometer","km"),t("odometer"),"sensor.odometer"],["Location",i._vs("device_tracker.location")?.state,"",t("lat",""),"device_tracker.location"],["Reference speed",Number.isFinite(o)?Math.round(o*100):null,"%",t("speed_factor"),"sensor.speed_factor"],["Maximum speed",_(i._vs("sensor.max_speed")),s("sensor.max_speed","km/h"),t("max_speed"),"sensor.max_speed"],["Elevation",_(i._vs("sensor.elevation")),s("sensor.elevation","m"),t("elevation",""),"sensor.elevation"]],h=[[U(i._vs("sensor.data_source")?.state),i._vs("sensor.source_last_refresh")?.state,"sensor.source_last_refresh"],["Obdble",i._vs("sensor.obd_last_refresh")?.state,"sensor.obd_last_refresh"]].filter(([a,d])=>a&&d&&d!=="unknown"&&d!=="unavailable");return c`<div class="grid">
      ${r.map(([a,d,p,l,m])=>c`<div
          class="tile clickable"
          @click=${()=>i._moreInfo(m)}
        >
          <div class="tile-title">${a}</div>
          <div class="tile-value">
            ${d??"\u2013"}<span class="tile-unit"> ${p}</span>
          </div>
          ${l?c`<div class="tile-prov">${l}</div>`:""}
        </div>`)}
    </div>
    ${h.length?c`<div class="sources">
          ${h.map(([a,d,p])=>c`<span
              class="seen clickable"
              @click=${()=>i._moreInfo(p)}
            >
              <span class="dot"></span>${a}
              <span class="src-time">${F(d)}</span>
            </span>`)}
        </div>`:""}`}var Ye={optimal:"Optimal",fewer:"Fewer",least:"Fewest"},Ge=[["switch.avoid_tolls","mdi:cash-multiple","Tolls"],["switch.avoid_motorways","mdi:highway","Highways"],["switch.avoid_ferries","mdi:ferry","Ferries and car trains"],["switch.avoid_borders","mdi:boom-gate","Borders"]],Je=[["switch.realtime_traffic","mdi:traffic-light","Realtime traffic"],["switch.realtime_weather","mdi:weather-partly-cloudy","Realtime weather"],["switch.adjust_speed","mdi:speedometer","Adjust speed to limits"]],D=(i,e)=>c`<div class="section"><ha-icon icon=${i}></ha-icon>${e}</div>`;function Ne(i){let e=i._as("select.charge_stops"),t=i._vs("select.drive_profile");return c`
    ${e?Xe(i,e):""}
    ${ce(i,"Destination arrival SoC","mdi:battery-low",i._as("number.arrival_soc"),"%")}
    ${D("mdi:cancel","Avoid on route")}
    <div class="chips">
      ${Ge.map(([s,o,r])=>Ze(i,s,o,r))}
    </div>
    ${D("mdi:update","Realtime")}
    ${Je.map(([s,o,r])=>Qe(i,s,o,r))}
    ${ce(i,"Minimum charger stalls","mdi:counter",i._as("number.min_charger_stalls"),"")}
    ${ce(i,"Extra weight","mdi:weight-kilogram",i._as("number.extra_weight")," kg")}
    ${et(i,t)}
  `}function Xe(i,e){return c`${D("mdi:ev-station","Charge stops")}
    <div class="segments">
      ${(e.attributes.options||[]).map(t=>c`<button
          class="segment ${e.state===t?"on":""}"
          @click=${()=>i._call("select","select_option",e,{option:t})}
        >
          ${Ye[t]||U(t)}
        </button>`)}
    </div>`}function ce(i,e,t,s,o){if(!s)return"";let r=s.attributes,n=Number(s.state);return c`${D(t,e)}
    <div class="slider-row">
      <span class="slider-value"
        >${Number.isFinite(n)?n:"\u2013"}${o}</span
      >
      <ha-slider
        pin
        min=${r.min??0}
        max=${r.max??100}
        step=${r.step??1}
        .value=${n}
        @change=${h=>{i._call("number","set_value",s,{value:Number(h.target.value)}),h.target.closest(".slider-row").querySelector(".slider-value").textContent=`${h.target.value}${o}`}}
      ></ha-slider>
    </div>`}function Ze(i,e,t,s){let o=i._as(e);if(!o)return"";let r=o.state==="on";return c`<button
    class="chip ${r?"on":""}"
    @click=${()=>i._call("switch","toggle",o)}
  >
    <ha-icon icon="${t}"></ha-icon>${s}
  </button>`}function Qe(i,e,t,s){let o=i._as(e);return o?c`<div class="switch-row">
    <span class="switch-label"><ha-icon icon=${t}></ha-icon>${s}</span>
    <ha-switch
      .checked=${o.state==="on"}
      @change=${()=>i._call("switch","toggle",o)}
    ></ha-switch>
  </div>`:""}function et(i,e){return e?.attributes?.options?.length?c`${D("mdi:car-cog","Drive profile")}
    <ha-select
      naturalMenuWidth
      fixedMenuPosition
      .value=${e.state}
      @selected=${t=>{let s=t.target.value;s&&s!==e.state&&i._call("select","select_option",e,{option:s})}}
      @closed=${t=>t.stopPropagation()}
    >
      ${e.attributes.options.map(t=>c`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
    </ha-select>`:""}var V=class extends g{static styles=Me;static get properties(){return{hass:{},_config:{},_dialog:{state:!0},_profileMenu:{state:!0}}}constructor(){super(),this._dialog=null,this._profileMenu=!1}connectedCallback(){super.connectedCallback(),W()}setConfig(e){this._config=e||{}}static getConfigElement(){return document.createElement(`${f}-editor`)}static getStubConfig(){return{}}getCardSize(){return 5}get _vehicle(){let e=ne(this.hass);return e.length?this._config.device&&e.find(t=>t.deviceId===this._config.device)||e[0]:null}_vs(e){let t=this._vmap?.[e];return t?this.hass.states[t]:void 0}_as(e){let t=this._amap?.[e];return t?this.hass.states[t]:void 0}_moreInfo(e){let t=this._vmap?.[e]||this._amap?.[e];t&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}_call(e,t,s,o={}){this.hass.callService(e,t,{entity_id:s.entity_id,...o})}render(){if(!this.hass)return c``;let e=this._vehicle;return e?(this._vmap=ae(this.hass,e.ents),this._amap=ae(this.hass,Ce(this.hass)),c`<ha-card>
      ${this._renderMain(e)}
      ${this._dialog==="options"?this._dialogFrame("Plan options",Ne(this)):""}
      ${this._dialog==="live"?this._dialogFrame("Live data",Re(this)):""}
    </ha-card>`):c`<ha-card>
        <div class="empty">
          No ABRP vehicle found — set up the ABRP integration first.
        </div>
      </ha-card>`}_renderMain(e){let t=this._vs("sensor.vehicle_name")?.state,s=this._config.title||(t&&t!=="unknown"&&t!=="unavailable"?t:null)||e.device?.name_by_user||e.device?.name||"Vehicle",o=this._vs("sensor.soc"),r=_(o),n=this._vs("image.car_image"),h=F(this._vs("sensor.last_update")?.state),a=this._vs("binary_sensor.charging")?.state==="on",d=Number(this._vs("sensor.charging_power")?.state),p=a&&Number.isFinite(d)&&d>0?`${d<10?d.toFixed(1):Math.round(d)} kW`:null,l=m=>this._config[m]!==!1;return c`<div class="main">
      <div class="head">
        <div class="head-left">
          <div class="name">${s}</div>
          ${l("show_profile")?this._renderProfile():""}
        </div>
        ${l("show_image")&&n?.attributes?.entity_picture?c`<img
              class="car clickable"
              src="${n.attributes.entity_picture}"
              alt="${s}"
              @click=${()=>this._moreInfo("image.car_image")}
            />`:""}
      </div>
      <div class="soc-row clickable" @click=${()=>this._moreInfo("sensor.soc")}>
        ${o?c`<ha-state-icon
              .hass=${this.hass}
              .stateObj=${o}
            ></ha-state-icon>`:c`<ha-icon icon="mdi:battery"></ha-icon>`}
        <span class="soc">${r??"\u2013"}%</span>
        ${l("show_charge_speed")&&p?c`<span
              class="charge-speed clickable"
              @click=${m=>{m.stopPropagation(),this._moreInfo("sensor.charging_power")}}
            >
              <ha-icon icon="mdi:flash"></ha-icon>${p}
            </span>`:l("show_charge_speed")&&a?c`<span class="charge-speed">
                <ha-icon icon="mdi:flash"></ha-icon>Charging
              </span>`:""}
      </div>
      <div class="bar clickable" @click=${()=>this._moreInfo("sensor.soc")}>
        <div class="fill ${a?"charging":""}" style="width:${r??0}%"></div>
      </div>
      ${l("show_last_seen")||l("show_live_data")?c`<div class="meta">
            ${l("show_last_seen")?c`<span
                  class="seen clickable"
                  @click=${()=>this._moreInfo("sensor.last_update")}
                >
                  <span class="dot"></span>
                  ${h?`Last seen ${h}`:"Never seen"}
                </span>`:c`<span></span>`}
            ${l("show_live_data")?c`<a class="link" @click=${()=>this._dialog="live"}
                  >Live data</a
                >`:""}
          </div>`:""}
      ${l("show_options")||this._config.show_live_data_button===!0?c`<div class="buttons">
            ${l("show_options")?c`<button
                  class="btn"
                  @click=${()=>this._dialog="options"}
                >
                  <ha-icon icon="mdi:tune-variant"></ha-icon>Options
                </button>`:""}
            ${this._config.show_live_data_button===!0?c`<button class="btn" @click=${()=>this._dialog="live"}>
                  <ha-icon icon="mdi:chart-box-outline"></ha-icon>Live data
                </button>`:""}
          </div>`:""}
    </div>`}_renderProfile(){let e=this._vs("select.drive_profile"),t=e?.state;if(!t||t==="unknown")return"";let s=e.attributes?.options||[];return c`<div
        class="profile selectable"
        @click=${()=>this._profileMenu=!this._profileMenu}
      >
        ${t}
        <ha-icon
          icon="mdi:chevron-${this._profileMenu?"up":"down"}"
        ></ha-icon>
      </div>
      ${this._profileMenu?c`<div
              class="menu-backdrop"
              @click=${()=>this._profileMenu=!1}
            ></div>
            <div class="menu">
              ${s.map(o=>c`<button
                  class="menu-item ${o===t?"on":""}"
                  @click=${()=>this._selectProfile(e,o)}
                >
                  ${o}
                  ${o===t?c`<ha-icon icon="mdi:check"></ha-icon>`:""}
                </button>`)}
            </div>`:""}`}_selectProfile(e,t){this._profileMenu=!1,t!==e.state&&this._call("select","select_option",e,{option:t})}_dialogFrame(e,t){return c`<ha-dialog
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
    </ha-dialog>`}};var tt=[{name:"title",selector:{text:{}}},{name:"device",selector:{device:{integration:S,entity:[{integration:S,domain:"device_tracker"}]}}}],st={title:"Title (empty = ABRP vehicle name)",device:"Vehicle (empty = first ABRP vehicle)"},it=[["show_image","Car image",!0,"mdi:image-outline"],["show_profile","Drive profile selector",!0,"mdi:car-cog"],["show_charge_speed","Charging speed badge",!0,"mdi:flash"],["show_last_seen","Last seen line",!0,"mdi:clock-outline"],["show_live_data","Live data link",!0,"mdi:link-variant"],["show_options","Options button",!0,"mdi:tune-variant"],["show_live_data_button","Live data button (alternative to the link)",!1,"mdi:chart-box-outline"]],q=class extends g{static get properties(){return{hass:{},_config:{},_tab:{state:!0}}}constructor(){super(),this._tab="general"}connectedCallback(){super.connectedCallback(),W()}setConfig(e){this._config=e||{}}render(){if(!this.hass)return c``;let e=this._tab==="general";return c`<div class="segments">
        <button
          class="segment ${e?"on":""}"
          @click=${()=>this._tab="general"}
        >
          <ha-icon icon="mdi:tune"></ha-icon>General
        </button>
        <button
          class="segment ${e?"":"on"}"
          @click=${()=>this._tab="display"}
        >
          <ha-icon icon="mdi:eye-outline"></ha-icon>Display
        </button>
      </div>
      ${e?this._renderGeneral():this._renderDisplay()}`}_renderGeneral(){return c`<ha-form
      .hass=${this.hass}
      .data=${this._config}
      .schema=${tt}
      .computeLabel=${e=>st[e.name]??e.name}
      @value-changed=${this._valueChanged}
    ></ha-form>`}_renderDisplay(){return c`${it.map(([e,t,s,o])=>c`<div class="row">
        <ha-icon icon=${o}></ha-icon>
        <span class="row-label">${t}</span>
        <ha-switch
          .checked=${this._config[e]??s}
          @change=${r=>this._toggleDisplay(e,s,r.target.checked)}
        ></ha-switch>
      </div>`)}`}_toggleDisplay(e,t,s){let o={...this._config,type:`custom:${f}`};s===t?delete o[e]:o[e]=s,this._dispatch(o)}_valueChanged(e){e.stopPropagation();let t={...this._config,...e.detail.value,type:`custom:${f}`};t.device||delete t.device,t.title||delete t.title,this._dispatch(t)}_dispatch(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}static get styles(){return P`
      .segments {
        display: flex;
        background: var(--secondary-background-color);
        border-radius: 12px;
        padding: 4px;
        margin-bottom: 16px;
      }
      .segment {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
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
      .segment ha-icon {
        --mdc-icon-size: 18px;
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
    `}};customElements.define(f,V);customElements.define(`${f}-editor`,q);window.customCards=window.customCards||[];window.customCards.push({type:f,name:"ABRP Vehicle Card",description:"ABRP-style vehicle card with battery state, live data and plan options.",preview:!0,documentationURL:"https://github.com/MichelFR/ha-abrp"});
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
