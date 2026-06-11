var $="abrp-vehicle-card",ae="abrp";var D=globalThis,z=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,q=Symbol(),ce=new WeakMap,C=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(z&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=ce.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&ce.set(t,e))}return e}toString(){return this.cssText}},le=i=>new C(typeof i=="string"?i:i+"",void 0,q),L=(i,...e)=>{let t=i.length===1?i[0]:e.reduce((s,r,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[o+1],i[0]);return new C(t,i,q)},de=(i,e)=>{if(z)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),r=D.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}},K=z?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return le(t)})(i):i;var{is:Oe,defineProperty:Te,getOwnPropertyDescriptor:Ue,getOwnPropertyNames:He,getOwnPropertySymbols:De,getPrototypeOf:ze}=Object,j=globalThis,he=j.trustedTypes,Le=he?he.emptyScript:"",je=j.reactiveElementPolyfillSupport,k=(i,e)=>i,Y={toAttribute(i,e){switch(e){case Boolean:i=i?Le:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},ue=(i,e)=>!Oe(i,e),pe={attribute:!0,type:String,converter:Y,reflect:!1,useDefault:!1,hasChanged:ue};Symbol.metadata??=Symbol("metadata"),j.litPropertyMetadata??=new WeakMap;var _=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=pe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(e,s,t);r!==void 0&&Te(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){let{get:r,set:o}=Ue(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){let h=r?.call(this);o?.call(this,n),this.requestUpdate(e,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??pe}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;let e=ze(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){let t=this.properties,s=[...He(t),...De(t)];for(let r of s)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,r]of t)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let r=this._$Eu(t,s);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let r of s)t.unshift(K(r))}else e!==void 0&&t.push(K(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return de(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(r!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:Y).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){let s=this.constructor,r=s._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let o=s.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:Y;this._$Em=r;let h=n.fromAttribute(t,o.type);this[r]=h??this._$Ej?.get(r)??h,this._$Em=null}}requestUpdate(e,t,s,r=!1,o){if(e!==void 0){let n=this.constructor;if(r===!1&&(o=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??ue)(o,t)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:r,wrapped:o},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,o]of s){let{wrapped:n}=o,h=this[r];n!==!0||this._$AL.has(r)||h===void 0||this.C(r,void 0,o,h)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[k("elementProperties")]=new Map,_[k("finalized")]=new Map,je?.({ReactiveElement:_}),(j.reactiveElementVersions??=[]).push("2.1.2");var te=globalThis,me=i=>i,B=te.trustedTypes,fe=B?B.createPolicy("lit-html",{createHTML:i=>i}):void 0,ye="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,xe="?"+b,Be=`<${xe}>`,A=document,M=()=>A.createComment(""),R=i=>i===null||typeof i!="object"&&typeof i!="function",se=Array.isArray,Ie=i=>se(i)||typeof i?.[Symbol.iterator]=="function",J=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,_e=/>/g,y=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ve=/'/g,$e=/"/g,Ae=/^(?:script|style|textarea|title)$/i,ie=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),c=ie(1),nt=ie(2),at=ie(3),w=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),be=new WeakMap,x=A.createTreeWalker(A,129);function we(i,e){if(!se(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return fe!==void 0?fe.createHTML(e):e}var Fe=(i,e)=>{let t=i.length-1,s=[],r,o=e===2?"<svg>":e===3?"<math>":"",n=P;for(let h=0;h<t;h++){let a=i[h],l,p,d=-1,g=0;for(;g<a.length&&(n.lastIndex=g,p=n.exec(a),p!==null);)g=n.lastIndex,n===P?p[1]==="!--"?n=ge:p[1]!==void 0?n=_e:p[2]!==void 0?(Ae.test(p[2])&&(r=RegExp("</"+p[2],"g")),n=y):p[3]!==void 0&&(n=y):n===y?p[0]===">"?(n=r??P,d=-1):p[1]===void 0?d=-2:(d=n.lastIndex-p[2].length,l=p[1],n=p[3]===void 0?y:p[3]==='"'?$e:ve):n===$e||n===ve?n=y:n===ge||n===_e?n=P:(n=y,r=void 0);let v=n===y&&i[h+1].startsWith("/>")?" ":"";o+=n===P?a+Be:d>=0?(s.push(l),a.slice(0,d)+ye+a.slice(d)+b+v):a+b+(d===-2?h:v)}return[we(i,o+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},N=class i{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let o=0,n=0,h=e.length-1,a=this.parts,[l,p]=Fe(e,t);if(this.el=i.createElement(l,s),x.currentNode=this.el.content,t===2||t===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=x.nextNode())!==null&&a.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let d of r.getAttributeNames())if(d.endsWith(ye)){let g=p[n++],v=r.getAttribute(d).split(b),H=/([.?@])?(.*)/.exec(g);a.push({type:1,index:o,name:H[2],strings:v,ctor:H[1]==="."?Z:H[1]==="?"?G:H[1]==="@"?Q:E}),r.removeAttribute(d)}else d.startsWith(b)&&(a.push({type:6,index:o}),r.removeAttribute(d));if(Ae.test(r.tagName)){let d=r.textContent.split(b),g=d.length-1;if(g>0){r.textContent=B?B.emptyScript:"";for(let v=0;v<g;v++)r.append(d[v],M()),x.nextNode(),a.push({type:2,index:++o});r.append(d[g],M())}}}else if(r.nodeType===8)if(r.data===xe)a.push({type:2,index:o});else{let d=-1;for(;(d=r.data.indexOf(b,d+1))!==-1;)a.push({type:7,index:o}),d+=b.length-1}o++}}static createElement(e,t){let s=A.createElement("template");return s.innerHTML=e,s}};function S(i,e,t=i,s){if(e===w)return e;let r=s!==void 0?t._$Co?.[s]:t._$Cl,o=R(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(i),r._$AT(i,t,s)),s!==void 0?(t._$Co??=[])[s]=r:t._$Cl=r),r!==void 0&&(e=S(i,r._$AS(i,e.values),r,s)),e}var X=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,r=(e?.creationScope??A).importNode(t,!0);x.currentNode=r;let o=x.nextNode(),n=0,h=0,a=s[0];for(;a!==void 0;){if(n===a.index){let l;a.type===2?l=new O(o,o.nextSibling,this,e):a.type===1?l=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(l=new ee(o,this,e)),this._$AV.push(l),a=s[++h]}n!==a?.index&&(o=x.nextNode(),n++)}return x.currentNode=A,r}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},O=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,r){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),R(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==w&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ie(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&R(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=N.createElement(we(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(t);else{let o=new X(r,this),n=o.u(this.options);o.p(t),this.T(n),this._$AH=o}}_$AC(e){let t=be.get(e.strings);return t===void 0&&be.set(e.strings,t=new N(e)),t}k(e){se(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,r=0;for(let o of e)r===t.length?t.push(s=new i(this.O(M()),this.O(M()),this,this.options)):s=t[r],s._$AI(o),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=me(e).nextSibling;me(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,r,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(e,t=this,s,r){let o=this.strings,n=!1;if(o===void 0)e=S(this,e,t,0),n=!R(e)||e!==this._$AH&&e!==w,n&&(this._$AH=e);else{let h=e,a,l;for(e=o[0],a=0;a<o.length-1;a++)l=S(this,h[s+a],t,a),l===w&&(l=this._$AH[a]),n||=!R(l)||l!==this._$AH[a],l===u?e=u:e!==u&&(e+=(l??"")+o[a+1]),this._$AH[a]=l}n&&!r&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Z=class extends E{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}},G=class extends E{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}},Q=class extends E{constructor(e,t,s,r,o){super(e,t,s,r,o),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??u)===w)return;let s=this._$AH,r=e===u&&s!==u||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==u&&(s===u||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ee=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}};var We=te.litHtmlPolyfillSupport;We?.(N,O),(te.litHtmlVersions??=[]).push("3.3.3");var Se=(i,e,t)=>{let s=t?.renderBefore??e,r=s._$litPart$;if(r===void 0){let o=t?.renderBefore??null;s._$litPart$=r=new O(e.insertBefore(M(),o),o,void 0,t??{})}return r._$AI(i),r};var re=globalThis,m=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Se(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};m._$litElement$=!0,m.finalized=!0,re.litElementHydrateSupport?.({LitElement:m});var Ve=re.litElementPolyfillSupport;Ve?.({LitElement:m});(re.litElementVersions??=[]).push("4.2.2");var qe={sensor:["soc","range","reference_consumption","battery_capacity","odometer","speed_factor","max_speed","charging_power","elevation","last_update","data_source","source_last_refresh","obd_last_refresh"],number:["arrival_soc","min_charger_stalls","extra_weight"],select:["charge_stops","drive_profile"],switch:["avoid_tolls","avoid_motorways","avoid_ferries","avoid_borders","realtime_traffic","realtime_weather","adjust_speed"],binary_sensor:["charging"],image:["car_image"],device_tracker:["location"]};function Ee(i){return Object.values(i.entities||{}).filter(e=>e.platform===ae)}function Ke(i){if(i.translation_key)return i.translation_key;let e=i.entity_id.split(".")[1],t=e.lastIndexOf("_");return t>=0?e.slice(t+1):e}function T(i){let e=new Map;for(let s of Ee(i))s.device_id&&(e.has(s.device_id)||e.set(s.device_id,[]),e.get(s.device_id).push(s));let t=[];for(let[s,r]of e)r.some(o=>Ke(o)==="soc")&&t.push({deviceId:s,device:i.devices?.[s],ents:r});return t}function Ce(i){let e=new Set(T(i).map(t=>t.deviceId));return Ee(i).filter(t=>!e.has(t.device_id))}function oe(i,e){let t={};for(let s of e){let[r,o]=s.entity_id.split(".");s.translation_key&&(t[`${r}.${s.translation_key}`]=s.entity_id);for(let n of qe[r]||[])!t[`${r}.${n}`]&&o.endsWith(`_${n}`)&&(t[`${r}.${n}`]=s.entity_id)}return t}function I(i){if(!i)return null;let e=(Date.now()-new Date(i).getTime())/1e3;return Number.isNaN(e)?null:e<90?"just now":e<5400?`${Math.round(e/60)} min ago`:e<129600?`${Math.round(e/3600)} h ago`:`${Math.round(e/86400)} d ago`}function U(i){return i&&i.charAt(0).toUpperCase()+i.slice(1)}function f(i,e=0){let t=Number(i?.state);return Number.isFinite(t)?t.toFixed(e):null}var ke=!1;async function F(){if(!ke){ke=!0;try{await(await window.loadCardHelpers?.())?.importMoreInfoControl?.("light")}catch{}}}var Pe=L`
  ha-card {
    padding: 20px;
  }
  .empty {
    padding: 8px;
    color: var(--secondary-text-color);
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
`,Me=L`
  ha-select {
    width: 100%;
    margin-top: 8px;
  }
`;function Re(i){let e=i._vs("sensor.data_source")?.attributes?.providers||{},t=(a,l="ABRP Estimate")=>U(e[a])||l,s=(a,l)=>i._vs(a)?.attributes?.unit_of_measurement??l,r=Number(i._vs("sensor.speed_factor")?.state),o=[["SoC",f(i._vs("sensor.soc")),"%",t("soc")],["Range",f(i._vs("sensor.range")),s("sensor.range","km"),t("est_battery_range")],["Calibrated reference consumption",f(i._vs("sensor.reference_consumption")),s("sensor.reference_consumption","Wh/km"),t("calib_ref_cons")],["Battery capacity",f(i._vs("sensor.battery_capacity")),"kWh",t("battery_capacity",t("capacity"))],["Odometer",f(i._vs("sensor.odometer")),s("sensor.odometer","km"),t("odometer")],["Location",i._vs("device_tracker.location")?.state,"",t("lat","")],["Reference speed",Number.isFinite(r)?Math.round(r*100):null,"%",t("speed_factor")],["Maximum speed",f(i._vs("sensor.max_speed")),s("sensor.max_speed","km/h"),t("max_speed")],["Elevation",f(i._vs("sensor.elevation")),s("sensor.elevation","m"),t("elevation","")]],h=[[U(i._vs("sensor.data_source")?.state),i._vs("sensor.source_last_refresh")?.state],["Obdble",i._vs("sensor.obd_last_refresh")?.state]].filter(([a,l])=>a&&l&&l!=="unknown"&&l!=="unavailable");return c`<div class="grid">
      ${o.map(([a,l,p,d])=>c`<div class="tile">
          <div class="tile-title">${a}</div>
          <div class="tile-value">
            ${l??"\u2013"}<span class="tile-unit"> ${p}</span>
          </div>
          ${d?c`<div class="tile-prov">${d}</div>`:""}
        </div>`)}
    </div>
    ${h.length?c`<div class="sources">
          ${h.map(([a,l])=>c`<span class="seen">
              <span class="dot"></span>${a}
              <span class="src-time">${I(l)}</span>
            </span>`)}
        </div>`:""}`}var Ye={optimal:"Optimal",fewer:"Fewer",least:"Fewest"},Je=[["switch.avoid_tolls","mdi:cash-multiple","Tolls"],["switch.avoid_motorways","mdi:highway","Highways"],["switch.avoid_ferries","mdi:ferry","Ferries and car trains"],["switch.avoid_borders","mdi:boom-gate","Borders"]],Xe=[["switch.realtime_traffic","Realtime traffic"],["switch.realtime_weather","Realtime weather"],["switch.adjust_speed","Adjust speed to limits"]];function Ne(i){let e=i._as("select.charge_stops"),t=i._vs("select.drive_profile");return c`
    ${e?Ze(i,e):""}
    ${ne(i,"Destination arrival SoC",i._as("number.arrival_soc"),"%")}
    <div class="section">Avoid on route</div>
    <div class="chips">
      ${Je.map(([s,r,o])=>Ge(i,s,r,o))}
    </div>
    <div class="section">Realtime</div>
    ${Xe.map(([s,r])=>Qe(i,s,r))}
    ${ne(i,"Minimum charger stalls",i._as("number.min_charger_stalls"),"")}
    ${ne(i,"Extra weight",i._as("number.extra_weight")," kg")}
    ${et(i,t)}
  `}function Ze(i,e){return c`<div class="section">Charge stops</div>
    <div class="segments">
      ${(e.attributes.options||[]).map(t=>c`<button
          class="segment ${e.state===t?"on":""}"
          @click=${()=>i._call("select","select_option",e,{option:t})}
        >
          ${Ye[t]||U(t)}
        </button>`)}
    </div>`}function ne(i,e,t,s){if(!t)return"";let r=t.attributes,o=Number(t.state);return c`<div class="section">${e}</div>
    <div class="slider-row">
      <span class="slider-value"
        >${Number.isFinite(o)?o:"\u2013"}${s}</span
      >
      <ha-slider
        pin
        min=${r.min??0}
        max=${r.max??100}
        step=${r.step??1}
        .value=${o}
        @change=${n=>{i._call("number","set_value",t,{value:Number(n.target.value)}),n.target.closest(".slider-row").querySelector(".slider-value").textContent=`${n.target.value}${s}`}}
      ></ha-slider>
    </div>`}function Ge(i,e,t,s){let r=i._as(e);if(!r)return"";let o=r.state==="on";return c`<button
    class="chip ${o?"on":""}"
    @click=${()=>i._call("switch","toggle",r)}
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
    </ha-select>`:""}var W=class extends m{static styles=Pe;static get properties(){return{hass:{},_config:{},_dialog:{state:!0},_profileMenu:{state:!0}}}constructor(){super(),this._dialog=null,this._profileMenu=!1}connectedCallback(){super.connectedCallback(),F()}setConfig(e){this._config=e||{}}static getConfigElement(){return document.createElement(`${$}-editor`)}static getStubConfig(){return{}}getCardSize(){return 5}get _vehicle(){let e=T(this.hass);return e.length?this._config.device?e.find(t=>t.deviceId===this._config.device)||null:e[0]:null}_vs(e){let t=this._vmap?.[e];return t?this.hass.states[t]:void 0}_as(e){let t=this._amap?.[e];return t?this.hass.states[t]:void 0}_call(e,t,s,r={}){this.hass.callService(e,t,{entity_id:s.entity_id,...r})}render(){if(!this.hass)return c``;let e=this._vehicle;return e?(this._vmap=oe(this.hass,e.ents),this._amap=oe(this.hass,Ce(this.hass)),c`<ha-card>
      ${this._renderMain(e)}
      ${this._dialog==="options"?this._dialogFrame("Plan options",Ne(this)):""}
      ${this._dialog==="live"?this._dialogFrame("Live data",Re(this)):""}
    </ha-card>`):c`<ha-card>
        <div class="empty">
          No ABRP vehicle found — set up the ABRP integration first.
        </div>
      </ha-card>`}_renderMain(e){let t=e.device?.name_by_user||e.device?.name||"Vehicle",s=this._vs("sensor.soc"),r=f(s),o=this._vs("image.car_image"),n=I(this._vs("sensor.last_update")?.state),h=this._vs("binary_sensor.charging")?.state==="on",a=Number(this._vs("sensor.charging_power")?.state),l=h&&Number.isFinite(a)&&a>0?`${a<10?a.toFixed(1):Math.round(a)} kW`:null;return c`<div class="main">
      <div class="head">
        <div class="head-left">
          <div class="name">${t}</div>
          ${this._renderProfile()}
        </div>
        ${o?.attributes?.entity_picture?c`<img
              class="car"
              src="${o.attributes.entity_picture}"
              alt="${t}"
            />`:""}
      </div>
      <div class="soc-row">
        ${s?c`<ha-state-icon
              .hass=${this.hass}
              .stateObj=${s}
            ></ha-state-icon>`:c`<ha-icon icon="mdi:battery"></ha-icon>`}
        <span class="soc">${r??"\u2013"}%</span>
        ${l?c`<span class="charge-speed">
              <ha-icon icon="mdi:flash"></ha-icon>${l}
            </span>`:h?c`<span class="charge-speed">
                <ha-icon icon="mdi:flash"></ha-icon>Charging
              </span>`:""}
      </div>
      <div class="bar">
        <div class="fill ${h?"charging":""}" style="width:${r??0}%"></div>
      </div>
      <div class="meta">
        <span class="seen">
          <span class="dot"></span>
          ${n?`Last seen ${n}`:"Never seen"}
        </span>
        <a class="link" @click=${()=>this._dialog="live"}>Live data</a>
      </div>
      <div class="buttons">
        <button class="btn" @click=${()=>this._dialog="options"}>
          <ha-icon icon="mdi:tune-variant"></ha-icon>Options
        </button>
      </div>
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
              ${s.map(r=>c`<button
                  class="menu-item ${r===t?"on":""}"
                  @click=${()=>this._selectProfile(e,r)}
                >
                  ${r}
                  ${r===t?c`<ha-icon icon="mdi:check"></ha-icon>`:""}
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
    </ha-dialog>`}};var V=class extends m{static styles=Me;static get properties(){return{hass:{},_config:{}}}connectedCallback(){super.connectedCallback(),F()}setConfig(e){this._config=e||{}}render(){if(!this.hass)return c``;let e=T(this.hass);return c`<ha-select
      label="Vehicle"
      naturalMenuWidth
      fixedMenuPosition
      .value=${this._config.device||""}
      @selected=${this._deviceChanged}
      @closed=${t=>t.stopPropagation()}
    >
      <mwc-list-item value="">Automatic (first ABRP vehicle)</mwc-list-item>
      ${e.map(t=>c`<mwc-list-item .value=${t.deviceId}>
            ${t.device?.name_by_user||t.device?.name||t.deviceId}
          </mwc-list-item>`)}
    </ha-select>`}_deviceChanged(e){let t={...this._config,type:`custom:${$}`};e.target.value?t.device=e.target.value:delete t.device,t.device!==this._config.device&&(this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0})))}};customElements.define($,W);customElements.define(`${$}-editor`,V);window.customCards=window.customCards||[];window.customCards.push({type:$,name:"ABRP Vehicle Card",description:"ABRP-style vehicle card with battery state, live data and plan options.",preview:!0,documentationURL:"https://github.com/MichelFR/ha-abrp"});
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
