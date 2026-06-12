var $="abrp-vehicle-card",k="abrp";var D=globalThis,z=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,q=Symbol(),ce=new WeakMap,C=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(z&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=ce.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&ce.set(t,e))}return e}toString(){return this.cssText}},le=i=>new C(typeof i=="string"?i:i+"",void 0,q),P=(i,...e)=>{let t=i.length===1?i[0]:e.reduce((s,o,r)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+i[r+1],i[0]);return new C(t,i,q)},de=(i,e)=>{if(z)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),o=D.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=t.cssText,i.appendChild(s)}},Y=z?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return le(t)})(i):i;var{is:Ne,defineProperty:Te,getOwnPropertyDescriptor:Ue,getOwnPropertyNames:Le,getOwnPropertySymbols:He,getPrototypeOf:De}=Object,I=globalThis,he=I.trustedTypes,ze=he?he.emptyScript:"",Ie=I.reactiveElementPolyfillSupport,M=(i,e)=>i,K={toAttribute(i,e){switch(e){case Boolean:i=i?ze:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},ue=(i,e)=>!Ne(i,e),pe={attribute:!0,type:String,converter:K,reflect:!1,useDefault:!1,hasChanged:ue};Symbol.metadata??=Symbol("metadata"),I.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=pe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),o=this.getPropertyDescriptor(e,s,t);o!==void 0&&Te(this.prototype,e,o)}}static getPropertyDescriptor(e,t,s){let{get:o,set:r}=Ue(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:o,set(n){let h=o?.call(this);r?.call(this,n),this.requestUpdate(e,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??pe}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;let e=De(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){let t=this.properties,s=[...Le(t),...He(t)];for(let o of s)this.createProperty(o,t[o])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,o]of t)this.elementProperties.set(s,o)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let o=this._$Eu(t,s);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let o of s)t.unshift(Y(o))}else e!==void 0&&t.push(Y(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return de(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,s);if(o!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:K).toAttribute(t,s.type);this._$Em=e,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,t){let s=this.constructor,o=s._$Eh.get(e);if(o!==void 0&&this._$Em!==o){let r=s.getPropertyOptions(o),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:K;this._$Em=o;let h=n.fromAttribute(t,r.type);this[o]=h??this._$Ej?.get(o)??h,this._$Em=null}}requestUpdate(e,t,s,o=!1,r){if(e!==void 0){let n=this.constructor;if(o===!1&&(r=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??ue)(r,t)||s.useDefault&&s.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:o,wrapped:r},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),r!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[o,r]of s){let{wrapped:n}=r,h=this[o];n!==!0||this._$AL.has(o)||h===void 0||this.C(o,void 0,r,h)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[M("elementProperties")]=new Map,g[M("finalized")]=new Map,Ie?.({ReactiveElement:g}),(I.reactiveElementVersions??=[]).push("2.1.2");var te=globalThis,me=i=>i,j=te.trustedTypes,fe=j?j.createPolicy("lit-html",{createHTML:i=>i}):void 0,ye="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,xe="?"+b,je=`<${xe}>`,w=document,R=()=>w.createComment(""),N=i=>i===null||typeof i!="object"&&typeof i!="function",se=Array.isArray,Be=i=>se(i)||typeof i?.[Symbol.iterator]=="function",G=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_e=/-->/g,ge=/>/g,y=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ve=/'/g,$e=/"/g,we=/^(?:script|style|textarea|title)$/i,ie=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),c=ie(1),lt=ie(2),dt=ie(3),A=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),be=new WeakMap,x=w.createTreeWalker(w,129);function Ae(i,e){if(!se(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return fe!==void 0?fe.createHTML(e):e}var Fe=(i,e)=>{let t=i.length-1,s=[],o,r=e===2?"<svg>":e===3?"<math>":"",n=O;for(let h=0;h<t;h++){let a=i[h],d,p,l=-1,m=0;for(;m<a.length&&(n.lastIndex=m,p=n.exec(a),p!==null);)m=n.lastIndex,n===O?p[1]==="!--"?n=_e:p[1]!==void 0?n=ge:p[2]!==void 0?(we.test(p[2])&&(o=RegExp("</"+p[2],"g")),n=y):p[3]!==void 0&&(n=y):n===y?p[0]===">"?(n=o??O,l=-1):p[1]===void 0?l=-2:(l=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?y:p[3]==='"'?$e:ve):n===$e||n===ve?n=y:n===_e||n===ge?n=O:(n=y,o=void 0);let v=n===y&&i[h+1].startsWith("/>")?" ":"";r+=n===O?a+je:l>=0?(s.push(d),a.slice(0,l)+ye+a.slice(l)+b+v):a+b+(l===-2?h:v)}return[Ae(i,r+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},T=class i{constructor({strings:e,_$litType$:t},s){let o;this.parts=[];let r=0,n=0,h=e.length-1,a=this.parts,[d,p]=Fe(e,t);if(this.el=i.createElement(d,s),x.currentNode=this.el.content,t===2||t===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(o=x.nextNode())!==null&&a.length<h;){if(o.nodeType===1){if(o.hasAttributes())for(let l of o.getAttributeNames())if(l.endsWith(ye)){let m=p[n++],v=o.getAttribute(l).split(b),H=/([.?@])?(.*)/.exec(m);a.push({type:1,index:r,name:H[2],strings:v,ctor:H[1]==="."?X:H[1]==="?"?Z:H[1]==="@"?Q:S}),o.removeAttribute(l)}else l.startsWith(b)&&(a.push({type:6,index:r}),o.removeAttribute(l));if(we.test(o.tagName)){let l=o.textContent.split(b),m=l.length-1;if(m>0){o.textContent=j?j.emptyScript:"";for(let v=0;v<m;v++)o.append(l[v],R()),x.nextNode(),a.push({type:2,index:++r});o.append(l[m],R())}}}else if(o.nodeType===8)if(o.data===xe)a.push({type:2,index:r});else{let l=-1;for(;(l=o.data.indexOf(b,l+1))!==-1;)a.push({type:7,index:r}),l+=b.length-1}r++}}static createElement(e,t){let s=w.createElement("template");return s.innerHTML=e,s}};function E(i,e,t=i,s){if(e===A)return e;let o=s!==void 0?t._$Co?.[s]:t._$Cl,r=N(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),r===void 0?o=void 0:(o=new r(i),o._$AT(i,t,s)),s!==void 0?(t._$Co??=[])[s]=o:t._$Cl=o),o!==void 0&&(e=E(i,o._$AS(i,e.values),o,s)),e}var J=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,o=(e?.creationScope??w).importNode(t,!0);x.currentNode=o;let r=x.nextNode(),n=0,h=0,a=s[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new U(r,r.nextSibling,this,e):a.type===1?d=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(d=new ee(r,this,e)),this._$AV.push(d),a=s[++h]}n!==a?.index&&(r=x.nextNode(),n++)}return x.currentNode=w,o}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},U=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,o){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=E(this,e,t),N(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Be(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,o=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=T.createElement(Ae(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(t);else{let r=new J(o,this),n=r.u(this.options);r.p(t),this.T(n),this._$AH=r}}_$AC(e){let t=be.get(e.strings);return t===void 0&&be.set(e.strings,t=new T(e)),t}k(e){se(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,o=0;for(let r of e)o===t.length?t.push(s=new i(this.O(R()),this.O(R()),this,this.options)):s=t[o],s._$AI(r),o++;o<t.length&&(this._$AR(s&&s._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=me(e).nextSibling;me(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},S=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,o,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(e,t=this,s,o){let r=this.strings,n=!1;if(r===void 0)e=E(this,e,t,0),n=!N(e)||e!==this._$AH&&e!==A,n&&(this._$AH=e);else{let h=e,a,d;for(e=r[0],a=0;a<r.length-1;a++)d=E(this,h[s+a],t,a),d===A&&(d=this._$AH[a]),n||=!N(d)||d!==this._$AH[a],d===u?e=u:e!==u&&(e+=(d??"")+r[a+1]),this._$AH[a]=d}n&&!o&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},X=class extends S{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}},Z=class extends S{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}},Q=class extends S{constructor(e,t,s,o,r){super(e,t,s,o,r),this.type=5}_$AI(e,t=this){if((e=E(this,e,t,0)??u)===A)return;let s=this._$AH,o=e===u&&s!==u||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==u&&(s===u||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ee=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){E(this,e)}};var We=te.litHtmlPolyfillSupport;We?.(T,U),(te.litHtmlVersions??=[]).push("3.3.3");var Ee=(i,e,t)=>{let s=t?.renderBefore??e,o=s._$litPart$;if(o===void 0){let r=t?.renderBefore??null;s._$litPart$=o=new U(e.insertBefore(R(),r),r,void 0,t??{})}return o._$AI(i),o};var oe=globalThis,f=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ee(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};f._$litElement$=!0,f.finalized=!0,oe.litElementHydrateSupport?.({LitElement:f});var Ve=oe.litElementPolyfillSupport;Ve?.({LitElement:f});(oe.litElementVersions??=[]).push("4.2.2");var qe={sensor:["soc","range","reference_consumption","battery_capacity","odometer","speed_factor","max_speed","charging_power","elevation","last_update","data_source","vehicle_name","source_last_refresh","obd_last_refresh"],number:["arrival_soc","min_charger_stalls","extra_weight"],select:["charge_stops","drive_profile"],switch:["avoid_tolls","avoid_motorways","avoid_ferries","avoid_borders","realtime_traffic","realtime_weather","adjust_speed"],binary_sensor:["charging"],image:["car_image"],device_tracker:["location"]};function Se(i){return Object.values(i.entities||{}).filter(e=>e.platform===k)}function Ye(i){if(i.translation_key)return i.translation_key;let e=i.entity_id.split(".")[1],t=e.lastIndexOf("_");return t>=0?e.slice(t+1):e}function re(i){let e=new Map;for(let s of Se(i))s.device_id&&(e.has(s.device_id)||e.set(s.device_id,[]),e.get(s.device_id).push(s));let t=[];for(let[s,o]of e)o.some(r=>Ye(r)==="soc")&&t.push({deviceId:s,device:i.devices?.[s],ents:o});return t}function ke(i){let e=new Set(re(i).map(t=>t.deviceId));return Se(i).filter(t=>!e.has(t.device_id))}function ne(i,e){let t={};for(let s of e){let[o,r]=s.entity_id.split(".");s.translation_key&&(t[`${o}.${s.translation_key}`]=s.entity_id);for(let n of qe[o]||[])!t[`${o}.${n}`]&&r.endsWith(`_${n}`)&&(t[`${o}.${n}`]=s.entity_id)}return t}function B(i){if(!i)return null;let e=(Date.now()-new Date(i).getTime())/1e3;return Number.isNaN(e)?null:e<90?"just now":e<5400?`${Math.round(e/60)} min ago`:e<129600?`${Math.round(e/3600)} h ago`:`${Math.round(e/86400)} d ago`}function L(i){return i&&i.charAt(0).toUpperCase()+i.slice(1)}function _(i,e=0){let t=Number(i?.state);return Number.isFinite(t)?t.toFixed(e):null}var Ce=!1;async function Pe(){if(!Ce){Ce=!0;try{await(await window.loadCardHelpers?.())?.importMoreInfoControl?.("light")}catch{}}}var Me=P`
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
    font-weight: 600;
    margin: 16px 0 8px;
    color: var(--primary-text-color);
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
`;function Oe(i){let e=i._vs("sensor.data_source")?.attributes?.providers||{},t=(a,d="ABRP Estimate")=>L(e[a])||d,s=(a,d)=>i._vs(a)?.attributes?.unit_of_measurement??d,o=Number(i._vs("sensor.speed_factor")?.state),r=[["SoC",_(i._vs("sensor.soc")),"%",t("soc"),"sensor.soc"],["Range",_(i._vs("sensor.range")),s("sensor.range","km"),t("est_battery_range"),"sensor.range"],["Calibrated reference consumption",_(i._vs("sensor.reference_consumption")),s("sensor.reference_consumption","Wh/km"),t("calib_ref_cons"),"sensor.reference_consumption"],["Battery capacity",_(i._vs("sensor.battery_capacity")),"kWh",t("battery_capacity",t("capacity")),"sensor.battery_capacity"],["Odometer",_(i._vs("sensor.odometer")),s("sensor.odometer","km"),t("odometer"),"sensor.odometer"],["Location",i._vs("device_tracker.location")?.state,"",t("lat",""),"device_tracker.location"],["Reference speed",Number.isFinite(o)?Math.round(o*100):null,"%",t("speed_factor"),"sensor.speed_factor"],["Maximum speed",_(i._vs("sensor.max_speed")),s("sensor.max_speed","km/h"),t("max_speed"),"sensor.max_speed"],["Elevation",_(i._vs("sensor.elevation")),s("sensor.elevation","m"),t("elevation",""),"sensor.elevation"]],h=[[L(i._vs("sensor.data_source")?.state),i._vs("sensor.source_last_refresh")?.state,"sensor.source_last_refresh"],["Obdble",i._vs("sensor.obd_last_refresh")?.state,"sensor.obd_last_refresh"]].filter(([a,d])=>a&&d&&d!=="unknown"&&d!=="unavailable");return c`<div class="grid">
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
              <span class="src-time">${B(d)}</span>
            </span>`)}
        </div>`:""}`}var Ke={optimal:"Optimal",fewer:"Fewer",least:"Fewest"},Ge=[["switch.avoid_tolls","mdi:cash-multiple","Tolls"],["switch.avoid_motorways","mdi:highway","Highways"],["switch.avoid_ferries","mdi:ferry","Ferries and car trains"],["switch.avoid_borders","mdi:boom-gate","Borders"]],Je=[["switch.realtime_traffic","Realtime traffic"],["switch.realtime_weather","Realtime weather"],["switch.adjust_speed","Adjust speed to limits"]];function Re(i){let e=i._as("select.charge_stops"),t=i._vs("select.drive_profile");return c`
    ${e?Xe(i,e):""}
    ${ae(i,"Destination arrival SoC",i._as("number.arrival_soc"),"%")}
    <div class="section">Avoid on route</div>
    <div class="chips">
      ${Ge.map(([s,o,r])=>Ze(i,s,o,r))}
    </div>
    <div class="section">Realtime</div>
    ${Je.map(([s,o])=>Qe(i,s,o))}
    ${ae(i,"Minimum charger stalls",i._as("number.min_charger_stalls"),"")}
    ${ae(i,"Extra weight",i._as("number.extra_weight")," kg")}
    ${et(i,t)}
  `}function Xe(i,e){return c`<div class="section">Charge stops</div>
    <div class="segments">
      ${(e.attributes.options||[]).map(t=>c`<button
          class="segment ${e.state===t?"on":""}"
          @click=${()=>i._call("select","select_option",e,{option:t})}
        >
          ${Ke[t]||L(t)}
        </button>`)}
    </div>`}function ae(i,e,t,s){if(!t)return"";let o=t.attributes,r=Number(t.state);return c`<div class="section">${e}</div>
    <div class="slider-row">
      <span class="slider-value"
        >${Number.isFinite(r)?r:"\u2013"}${s}</span
      >
      <ha-slider
        pin
        min=${o.min??0}
        max=${o.max??100}
        step=${o.step??1}
        .value=${r}
        @change=${n=>{i._call("number","set_value",t,{value:Number(n.target.value)}),n.target.closest(".slider-row").querySelector(".slider-value").textContent=`${n.target.value}${s}`}}
      ></ha-slider>
    </div>`}function Ze(i,e,t,s){let o=i._as(e);if(!o)return"";let r=o.state==="on";return c`<button
    class="chip ${r?"on":""}"
    @click=${()=>i._call("switch","toggle",o)}
  >
    <ha-icon icon="${t}"></ha-icon>${s}
  </button>`}function Qe(i,e,t){let s=i._as(e);return s?c`<div class="switch-row">
    <span>${t}</span>
    <ha-switch
      .checked=${s.state==="on"}
      @change=${()=>i._call("switch","toggle",s)}
    ></ha-switch>
  </div>`:""}function et(i,e){return e?.attributes?.options?.length?c`<div class="section">Drive profile</div>
    <ha-select
      naturalMenuWidth
      fixedMenuPosition
      .value=${e.state}
      @selected=${t=>{let s=t.target.value;s&&s!==e.state&&i._call("select","select_option",e,{option:s})}}
      @closed=${t=>t.stopPropagation()}
    >
      ${e.attributes.options.map(t=>c`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
    </ha-select>`:""}var F=class extends f{static styles=Me;static get properties(){return{hass:{},_config:{},_dialog:{state:!0},_profileMenu:{state:!0}}}constructor(){super(),this._dialog=null,this._profileMenu=!1}connectedCallback(){super.connectedCallback(),Pe()}setConfig(e){this._config=e||{}}static getConfigElement(){return document.createElement(`${$}-editor`)}static getStubConfig(){return{}}getCardSize(){return 5}get _vehicle(){let e=re(this.hass);return e.length?this._config.device&&e.find(t=>t.deviceId===this._config.device)||e[0]:null}_vs(e){let t=this._vmap?.[e];return t?this.hass.states[t]:void 0}_as(e){let t=this._amap?.[e];return t?this.hass.states[t]:void 0}_moreInfo(e){let t=this._vmap?.[e]||this._amap?.[e];t&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}_call(e,t,s,o={}){this.hass.callService(e,t,{entity_id:s.entity_id,...o})}render(){if(!this.hass)return c``;let e=this._vehicle;return e?(this._vmap=ne(this.hass,e.ents),this._amap=ne(this.hass,ke(this.hass)),c`<ha-card>
      ${this._renderMain(e)}
      ${this._dialog==="options"?this._dialogFrame("Plan options",Re(this)):""}
      ${this._dialog==="live"?this._dialogFrame("Live data",Oe(this)):""}
    </ha-card>`):c`<ha-card>
        <div class="empty">
          No ABRP vehicle found — set up the ABRP integration first.
        </div>
      </ha-card>`}_renderMain(e){let t=this._vs("sensor.vehicle_name")?.state,s=this._config.title||(t&&t!=="unknown"&&t!=="unavailable"?t:null)||e.device?.name_by_user||e.device?.name||"Vehicle",o=this._vs("sensor.soc"),r=_(o),n=this._vs("image.car_image"),h=B(this._vs("sensor.last_update")?.state),a=this._vs("binary_sensor.charging")?.state==="on",d=Number(this._vs("sensor.charging_power")?.state),p=a&&Number.isFinite(d)&&d>0?`${d<10?d.toFixed(1):Math.round(d)} kW`:null,l=m=>this._config[m]!==!1;return c`<div class="main">
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
      ${l("show_options")?c`<div class="buttons">
            <button class="btn" @click=${()=>this._dialog="options"}>
              <ha-icon icon="mdi:tune-variant"></ha-icon>Options
            </button>
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
    </ha-dialog>`}};var tt=[{name:"title",selector:{text:{}}},{name:"device",selector:{device:{integration:k,entity:[{integration:k,domain:"device_tracker"}]}}}],W=[["show_image","Car image"],["show_profile","Drive profile selector"],["show_charge_speed","Charging speed badge"],["show_last_seen","Last seen line"],["show_live_data","Live data link"],["show_options","Options button"]],st=W.map(([i])=>({name:i,selector:{boolean:{}}})),it={title:"Title (empty = ABRP vehicle name)",device:"Vehicle (empty = first ABRP vehicle)",...Object.fromEntries(W)},V=class extends f{static get properties(){return{hass:{},_config:{},_tab:{state:!0}}}constructor(){super(),this._tab="general"}setConfig(e){this._config=e||{}}render(){if(!this.hass)return c``;let e=this._tab==="general";return c`<div class="tabs">
        <button
          class="tab ${e?"on":""}"
          @click=${()=>this._tab="general"}
        >
          General
        </button>
        <button
          class="tab ${e?"":"on"}"
          @click=${()=>this._tab="display"}
        >
          Display
        </button>
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${e?this._config:this._displayData()}
        .schema=${e?tt:st}
        .computeLabel=${t=>it[t.name]??t.name}
        @value-changed=${this._valueChanged}
      ></ha-form>`}_displayData(){return Object.fromEntries(W.map(([e])=>[e,this._config[e]!==!1]))}_valueChanged(e){e.stopPropagation();let t={...this._config,...e.detail.value,type:`custom:${$}`};t.device||delete t.device,t.title||delete t.title;for(let[s]of W)t[s]!==!1&&delete t[s];this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}static get styles(){return P`
      .tabs {
        display: flex;
        border-bottom: 1px solid var(--divider-color);
        margin-bottom: 16px;
      }
      .tab {
        flex: 1;
        border: none;
        background: transparent;
        color: var(--secondary-text-color);
        font-size: 1em;
        padding: 10px 0;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        transition: color 0.15s ease, border-color 0.15s ease;
      }
      .tab:hover {
        color: var(--primary-text-color);
      }
      .tab.on {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
        font-weight: 600;
      }
    `}};customElements.define($,F);customElements.define(`${$}-editor`,V);window.customCards=window.customCards||[];window.customCards.push({type:$,name:"ABRP Vehicle Card",description:"ABRP-style vehicle card with battery state, live data and plan options.",preview:!0,documentationURL:"https://github.com/MichelFR/ha-abrp"});
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
