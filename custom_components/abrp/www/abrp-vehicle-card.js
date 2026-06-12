var $="abrp-vehicle-card",k="abrp";var L=globalThis,D=L.ShadowRoot&&(L.ShadyCSS===void 0||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),ae=new WeakMap,C=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(D&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=ae.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&ae.set(t,e))}return e}toString(){return this.cssText}},ce=i=>new C(typeof i=="string"?i:i+"",void 0,W),V=(i,...e)=>{let t=i.length===1?i[0]:e.reduce((s,r,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[o+1],i[0]);return new C(t,i,W)},le=(i,e)=>{if(D)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),r=L.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}},q=D?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return ce(t)})(i):i;var{is:Ne,defineProperty:Oe,getOwnPropertyDescriptor:Te,getOwnPropertyNames:Ue,getOwnPropertySymbols:He,getPrototypeOf:Le}=Object,z=globalThis,de=z.trustedTypes,De=de?de.emptyScript:"",ze=z.reactiveElementPolyfillSupport,P=(i,e)=>i,K={toAttribute(i,e){switch(e){case Boolean:i=i?De:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},pe=(i,e)=>!Ne(i,e),he={attribute:!0,type:String,converter:K,reflect:!1,useDefault:!1,hasChanged:pe};Symbol.metadata??=Symbol("metadata"),z.litPropertyMetadata??=new WeakMap;var _=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=he){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(e,s,t);r!==void 0&&Oe(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){let{get:r,set:o}=Te(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){let h=r?.call(this);o?.call(this,n),this.requestUpdate(e,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??he}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let e=Le(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let t=this.properties,s=[...Ue(t),...He(t)];for(let r of s)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,r]of t)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let r=this._$Eu(t,s);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let r of s)t.unshift(q(r))}else e!==void 0&&t.push(q(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return le(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(r!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:K).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){let s=this.constructor,r=s._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let o=s.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:K;this._$Em=r;let h=n.fromAttribute(t,o.type);this[r]=h??this._$Ej?.get(r)??h,this._$Em=null}}requestUpdate(e,t,s,r=!1,o){if(e!==void 0){let n=this.constructor;if(r===!1&&(o=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??pe)(o,t)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:r,wrapped:o},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,o]of s){let{wrapped:n}=o,h=this[r];n!==!0||this._$AL.has(r)||h===void 0||this.C(r,void 0,o,h)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[P("elementProperties")]=new Map,_[P("finalized")]=new Map,ze?.({ReactiveElement:_}),(z.reactiveElementVersions??=[]).push("2.1.2");var ee=globalThis,ue=i=>i,j=ee.trustedTypes,me=j?j.createPolicy("lit-html",{createHTML:i=>i}):void 0,be="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,ye="?"+b,je=`<${ye}>`,A=document,R=()=>A.createComment(""),N=i=>i===null||typeof i!="object"&&typeof i!="function",te=Array.isArray,Ie=i=>te(i)||typeof i?.[Symbol.iterator]=="function",Y=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fe=/-->/g,ge=/>/g,y=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_e=/'/g,ve=/"/g,xe=/^(?:script|style|textarea|title)$/i,se=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),l=se(1),nt=se(2),at=se(3),w=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),$e=new WeakMap,x=A.createTreeWalker(A,129);function Ae(i,e){if(!te(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return me!==void 0?me.createHTML(e):e}var Be=(i,e)=>{let t=i.length-1,s=[],r,o=e===2?"<svg>":e===3?"<math>":"",n=M;for(let h=0;h<t;h++){let a=i[h],c,p,d=-1,m=0;for(;m<a.length&&(n.lastIndex=m,p=n.exec(a),p!==null);)m=n.lastIndex,n===M?p[1]==="!--"?n=fe:p[1]!==void 0?n=ge:p[2]!==void 0?(xe.test(p[2])&&(r=RegExp("</"+p[2],"g")),n=y):p[3]!==void 0&&(n=y):n===y?p[0]===">"?(n=r??M,d=-1):p[1]===void 0?d=-2:(d=n.lastIndex-p[2].length,c=p[1],n=p[3]===void 0?y:p[3]==='"'?ve:_e):n===ve||n===_e?n=y:n===fe||n===ge?n=M:(n=y,r=void 0);let v=n===y&&i[h+1].startsWith("/>")?" ":"";o+=n===M?a+je:d>=0?(s.push(c),a.slice(0,d)+be+a.slice(d)+b+v):a+b+(d===-2?h:v)}return[Ae(i,o+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},O=class i{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let o=0,n=0,h=e.length-1,a=this.parts,[c,p]=Be(e,t);if(this.el=i.createElement(c,s),x.currentNode=this.el.content,t===2||t===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=x.nextNode())!==null&&a.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let d of r.getAttributeNames())if(d.endsWith(be)){let m=p[n++],v=r.getAttribute(d).split(b),H=/([.?@])?(.*)/.exec(m);a.push({type:1,index:o,name:H[2],strings:v,ctor:H[1]==="."?X:H[1]==="?"?Z:H[1]==="@"?G:S}),r.removeAttribute(d)}else d.startsWith(b)&&(a.push({type:6,index:o}),r.removeAttribute(d));if(xe.test(r.tagName)){let d=r.textContent.split(b),m=d.length-1;if(m>0){r.textContent=j?j.emptyScript:"";for(let v=0;v<m;v++)r.append(d[v],R()),x.nextNode(),a.push({type:2,index:++o});r.append(d[m],R())}}}else if(r.nodeType===8)if(r.data===ye)a.push({type:2,index:o});else{let d=-1;for(;(d=r.data.indexOf(b,d+1))!==-1;)a.push({type:7,index:o}),d+=b.length-1}o++}}static createElement(e,t){let s=A.createElement("template");return s.innerHTML=e,s}};function E(i,e,t=i,s){if(e===w)return e;let r=s!==void 0?t._$Co?.[s]:t._$Cl,o=N(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(i),r._$AT(i,t,s)),s!==void 0?(t._$Co??=[])[s]=r:t._$Cl=r),r!==void 0&&(e=E(i,r._$AS(i,e.values),r,s)),e}var J=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,r=(e?.creationScope??A).importNode(t,!0);x.currentNode=r;let o=x.nextNode(),n=0,h=0,a=s[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new T(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new Q(o,this,e)),this._$AV.push(c),a=s[++h]}n!==a?.index&&(o=x.nextNode(),n++)}return x.currentNode=A,r}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},T=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,r){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=E(this,e,t),N(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==w&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ie(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=O.createElement(Ae(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(t);else{let o=new J(r,this),n=o.u(this.options);o.p(t),this.T(n),this._$AH=o}}_$AC(e){let t=$e.get(e.strings);return t===void 0&&$e.set(e.strings,t=new O(e)),t}k(e){te(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,r=0;for(let o of e)r===t.length?t.push(s=new i(this.O(R()),this.O(R()),this,this.options)):s=t[r],s._$AI(o),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=ue(e).nextSibling;ue(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},S=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,r,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(e,t=this,s,r){let o=this.strings,n=!1;if(o===void 0)e=E(this,e,t,0),n=!N(e)||e!==this._$AH&&e!==w,n&&(this._$AH=e);else{let h=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=E(this,h[s+a],t,a),c===w&&(c=this._$AH[a]),n||=!N(c)||c!==this._$AH[a],c===u?e=u:e!==u&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}n&&!r&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},X=class extends S{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}},Z=class extends S{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}},G=class extends S{constructor(e,t,s,r,o){super(e,t,s,r,o),this.type=5}_$AI(e,t=this){if((e=E(this,e,t,0)??u)===w)return;let s=this._$AH,r=e===u&&s!==u||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==u&&(s===u||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Q=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){E(this,e)}};var Fe=ee.litHtmlPolyfillSupport;Fe?.(O,T),(ee.litHtmlVersions??=[]).push("3.3.3");var we=(i,e,t)=>{let s=t?.renderBefore??e,r=s._$litPart$;if(r===void 0){let o=t?.renderBefore??null;s._$litPart$=r=new T(e.insertBefore(R(),o),o,void 0,t??{})}return r._$AI(i),r};var ie=globalThis,f=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=we(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};f._$litElement$=!0,f.finalized=!0,ie.litElementHydrateSupport?.({LitElement:f});var We=ie.litElementPolyfillSupport;We?.({LitElement:f});(ie.litElementVersions??=[]).push("4.2.2");var Ve={sensor:["soc","range","reference_consumption","battery_capacity","odometer","speed_factor","max_speed","charging_power","elevation","last_update","data_source","vehicle_name","source_last_refresh","obd_last_refresh"],number:["arrival_soc","min_charger_stalls","extra_weight"],select:["charge_stops","drive_profile"],switch:["avoid_tolls","avoid_motorways","avoid_ferries","avoid_borders","realtime_traffic","realtime_weather","adjust_speed"],binary_sensor:["charging"],image:["car_image"],device_tracker:["location"]};function Ee(i){return Object.values(i.entities||{}).filter(e=>e.platform===k)}function qe(i){if(i.translation_key)return i.translation_key;let e=i.entity_id.split(".")[1],t=e.lastIndexOf("_");return t>=0?e.slice(t+1):e}function re(i){let e=new Map;for(let s of Ee(i))s.device_id&&(e.has(s.device_id)||e.set(s.device_id,[]),e.get(s.device_id).push(s));let t=[];for(let[s,r]of e)r.some(o=>qe(o)==="soc")&&t.push({deviceId:s,device:i.devices?.[s],ents:r});return t}function Se(i){let e=new Set(re(i).map(t=>t.deviceId));return Ee(i).filter(t=>!e.has(t.device_id))}function oe(i,e){let t={};for(let s of e){let[r,o]=s.entity_id.split(".");s.translation_key&&(t[`${r}.${s.translation_key}`]=s.entity_id);for(let n of Ve[r]||[])!t[`${r}.${n}`]&&o.endsWith(`_${n}`)&&(t[`${r}.${n}`]=s.entity_id)}return t}function I(i){if(!i)return null;let e=(Date.now()-new Date(i).getTime())/1e3;return Number.isNaN(e)?null:e<90?"just now":e<5400?`${Math.round(e/60)} min ago`:e<129600?`${Math.round(e/3600)} h ago`:`${Math.round(e/86400)} d ago`}function U(i){return i&&i.charAt(0).toUpperCase()+i.slice(1)}function g(i,e=0){let t=Number(i?.state);return Number.isFinite(t)?t.toFixed(e):null}var ke=!1;async function Ce(){if(!ke){ke=!0;try{await(await window.loadCardHelpers?.())?.importMoreInfoControl?.("light")}catch{}}}var Pe=V`
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
`;function Me(i){let e=i._vs("sensor.data_source")?.attributes?.providers||{},t=(a,c="ABRP Estimate")=>U(e[a])||c,s=(a,c)=>i._vs(a)?.attributes?.unit_of_measurement??c,r=Number(i._vs("sensor.speed_factor")?.state),o=[["SoC",g(i._vs("sensor.soc")),"%",t("soc"),"sensor.soc"],["Range",g(i._vs("sensor.range")),s("sensor.range","km"),t("est_battery_range"),"sensor.range"],["Calibrated reference consumption",g(i._vs("sensor.reference_consumption")),s("sensor.reference_consumption","Wh/km"),t("calib_ref_cons"),"sensor.reference_consumption"],["Battery capacity",g(i._vs("sensor.battery_capacity")),"kWh",t("battery_capacity",t("capacity")),"sensor.battery_capacity"],["Odometer",g(i._vs("sensor.odometer")),s("sensor.odometer","km"),t("odometer"),"sensor.odometer"],["Location",i._vs("device_tracker.location")?.state,"",t("lat",""),"device_tracker.location"],["Reference speed",Number.isFinite(r)?Math.round(r*100):null,"%",t("speed_factor"),"sensor.speed_factor"],["Maximum speed",g(i._vs("sensor.max_speed")),s("sensor.max_speed","km/h"),t("max_speed"),"sensor.max_speed"],["Elevation",g(i._vs("sensor.elevation")),s("sensor.elevation","m"),t("elevation",""),"sensor.elevation"]],h=[[U(i._vs("sensor.data_source")?.state),i._vs("sensor.source_last_refresh")?.state,"sensor.source_last_refresh"],["Obdble",i._vs("sensor.obd_last_refresh")?.state,"sensor.obd_last_refresh"]].filter(([a,c])=>a&&c&&c!=="unknown"&&c!=="unavailable");return l`<div class="grid">
      ${o.map(([a,c,p,d,m])=>l`<div
          class="tile clickable"
          @click=${()=>i._moreInfo(m)}
        >
          <div class="tile-title">${a}</div>
          <div class="tile-value">
            ${c??"\u2013"}<span class="tile-unit"> ${p}</span>
          </div>
          ${d?l`<div class="tile-prov">${d}</div>`:""}
        </div>`)}
    </div>
    ${h.length?l`<div class="sources">
          ${h.map(([a,c,p])=>l`<span
              class="seen clickable"
              @click=${()=>i._moreInfo(p)}
            >
              <span class="dot"></span>${a}
              <span class="src-time">${I(c)}</span>
            </span>`)}
        </div>`:""}`}var Ke={optimal:"Optimal",fewer:"Fewer",least:"Fewest"},Ye=[["switch.avoid_tolls","mdi:cash-multiple","Tolls"],["switch.avoid_motorways","mdi:highway","Highways"],["switch.avoid_ferries","mdi:ferry","Ferries and car trains"],["switch.avoid_borders","mdi:boom-gate","Borders"]],Je=[["switch.realtime_traffic","Realtime traffic"],["switch.realtime_weather","Realtime weather"],["switch.adjust_speed","Adjust speed to limits"]];function Re(i){let e=i._as("select.charge_stops"),t=i._vs("select.drive_profile");return l`
    ${e?Xe(i,e):""}
    ${ne(i,"Destination arrival SoC",i._as("number.arrival_soc"),"%")}
    <div class="section">Avoid on route</div>
    <div class="chips">
      ${Ye.map(([s,r,o])=>Ze(i,s,r,o))}
    </div>
    <div class="section">Realtime</div>
    ${Je.map(([s,r])=>Ge(i,s,r))}
    ${ne(i,"Minimum charger stalls",i._as("number.min_charger_stalls"),"")}
    ${ne(i,"Extra weight",i._as("number.extra_weight")," kg")}
    ${Qe(i,t)}
  `}function Xe(i,e){return l`<div class="section">Charge stops</div>
    <div class="segments">
      ${(e.attributes.options||[]).map(t=>l`<button
          class="segment ${e.state===t?"on":""}"
          @click=${()=>i._call("select","select_option",e,{option:t})}
        >
          ${Ke[t]||U(t)}
        </button>`)}
    </div>`}function ne(i,e,t,s){if(!t)return"";let r=t.attributes,o=Number(t.state);return l`<div class="section">${e}</div>
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
    </div>`}function Ze(i,e,t,s){let r=i._as(e);if(!r)return"";let o=r.state==="on";return l`<button
    class="chip ${o?"on":""}"
    @click=${()=>i._call("switch","toggle",r)}
  >
    <ha-icon icon="${t}"></ha-icon>${s}
  </button>`}function Ge(i,e,t){let s=i._as(e);return s?l`<div class="switch-row">
    <span>${t}</span>
    <ha-switch
      .checked=${s.state==="on"}
      @change=${()=>i._call("switch","toggle",s)}
    ></ha-switch>
  </div>`:""}function Qe(i,e){return e?.attributes?.options?.length?l`<div class="section">Drive profile</div>
    <ha-select
      naturalMenuWidth
      fixedMenuPosition
      .value=${e.state}
      @selected=${t=>{let s=t.target.value;s&&s!==e.state&&i._call("select","select_option",e,{option:s})}}
      @closed=${t=>t.stopPropagation()}
    >
      ${e.attributes.options.map(t=>l`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
    </ha-select>`:""}var B=class extends f{static styles=Pe;static get properties(){return{hass:{},_config:{},_dialog:{state:!0},_profileMenu:{state:!0}}}constructor(){super(),this._dialog=null,this._profileMenu=!1}connectedCallback(){super.connectedCallback(),Ce()}setConfig(e){this._config=e||{}}static getConfigElement(){return document.createElement(`${$}-editor`)}static getStubConfig(){return{}}getCardSize(){return 5}get _vehicle(){let e=re(this.hass);return e.length?this._config.device&&e.find(t=>t.deviceId===this._config.device)||e[0]:null}_vs(e){let t=this._vmap?.[e];return t?this.hass.states[t]:void 0}_as(e){let t=this._amap?.[e];return t?this.hass.states[t]:void 0}_moreInfo(e){let t=this._vmap?.[e]||this._amap?.[e];t&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}_call(e,t,s,r={}){this.hass.callService(e,t,{entity_id:s.entity_id,...r})}render(){if(!this.hass)return l``;let e=this._vehicle;return e?(this._vmap=oe(this.hass,e.ents),this._amap=oe(this.hass,Se(this.hass)),l`<ha-card>
      ${this._renderMain(e)}
      ${this._dialog==="options"?this._dialogFrame("Plan options",Re(this)):""}
      ${this._dialog==="live"?this._dialogFrame("Live data",Me(this)):""}
    </ha-card>`):l`<ha-card>
        <div class="empty">
          No ABRP vehicle found — set up the ABRP integration first.
        </div>
      </ha-card>`}_renderMain(e){let t=this._vs("sensor.vehicle_name")?.state,s=(t&&t!=="unknown"&&t!=="unavailable"?t:null)||e.device?.name_by_user||e.device?.name||"Vehicle",r=this._vs("sensor.soc"),o=g(r),n=this._vs("image.car_image"),h=I(this._vs("sensor.last_update")?.state),a=this._vs("binary_sensor.charging")?.state==="on",c=Number(this._vs("sensor.charging_power")?.state),p=a&&Number.isFinite(c)&&c>0?`${c<10?c.toFixed(1):Math.round(c)} kW`:null;return l`<div class="main">
      <div class="head">
        <div class="head-left">
          <div class="name">${s}</div>
          ${this._renderProfile()}
        </div>
        ${n?.attributes?.entity_picture?l`<img
              class="car clickable"
              src="${n.attributes.entity_picture}"
              alt="${s}"
              @click=${()=>this._moreInfo("image.car_image")}
            />`:""}
      </div>
      <div class="soc-row clickable" @click=${()=>this._moreInfo("sensor.soc")}>
        ${r?l`<ha-state-icon
              .hass=${this.hass}
              .stateObj=${r}
            ></ha-state-icon>`:l`<ha-icon icon="mdi:battery"></ha-icon>`}
        <span class="soc">${o??"\u2013"}%</span>
        ${p?l`<span
              class="charge-speed clickable"
              @click=${d=>{d.stopPropagation(),this._moreInfo("sensor.charging_power")}}
            >
              <ha-icon icon="mdi:flash"></ha-icon>${p}
            </span>`:a?l`<span class="charge-speed">
                <ha-icon icon="mdi:flash"></ha-icon>Charging
              </span>`:""}
      </div>
      <div class="bar clickable" @click=${()=>this._moreInfo("sensor.soc")}>
        <div class="fill ${a?"charging":""}" style="width:${o??0}%"></div>
      </div>
      <div class="meta">
        <span
          class="seen clickable"
          @click=${()=>this._moreInfo("sensor.last_update")}
        >
          <span class="dot"></span>
          ${h?`Last seen ${h}`:"Never seen"}
        </span>
        <a class="link" @click=${()=>this._dialog="live"}>Live data</a>
      </div>
      <div class="buttons">
        <button class="btn" @click=${()=>this._dialog="options"}>
          <ha-icon icon="mdi:tune-variant"></ha-icon>Options
        </button>
      </div>
    </div>`}_renderProfile(){let e=this._vs("select.drive_profile"),t=e?.state;if(!t||t==="unknown")return"";let s=e.attributes?.options||[];return l`<div
        class="profile selectable"
        @click=${()=>this._profileMenu=!this._profileMenu}
      >
        ${t}
        <ha-icon
          icon="mdi:chevron-${this._profileMenu?"up":"down"}"
        ></ha-icon>
      </div>
      ${this._profileMenu?l`<div
              class="menu-backdrop"
              @click=${()=>this._profileMenu=!1}
            ></div>
            <div class="menu">
              ${s.map(r=>l`<button
                  class="menu-item ${r===t?"on":""}"
                  @click=${()=>this._selectProfile(e,r)}
                >
                  ${r}
                  ${r===t?l`<ha-icon icon="mdi:check"></ha-icon>`:""}
                </button>`)}
            </div>`:""}`}_selectProfile(e,t){this._profileMenu=!1,t!==e.state&&this._call("select","select_option",e,{option:t})}_dialogFrame(e,t){return l`<ha-dialog
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
    </ha-dialog>`}};var et=[{name:"device",selector:{device:{integration:k,entity:[{integration:k,domain:"device_tracker"}]}}}],F=class extends f{static get properties(){return{hass:{},_config:{}}}setConfig(e){this._config=e||{}}render(){return this.hass?l`<ha-form
      .hass=${this.hass}
      .data=${this._config}
      .schema=${et}
      .computeLabel=${()=>"Vehicle (empty = first ABRP vehicle)"}
      @value-changed=${this._valueChanged}
    ></ha-form>`:l``}_valueChanged(e){e.stopPropagation();let t={...this._config,...e.detail.value,type:`custom:${$}`};t.device||delete t.device,this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}};customElements.define($,B);customElements.define(`${$}-editor`,F);window.customCards=window.customCards||[];window.customCards.push({type:$,name:"ABRP Vehicle Card",description:"ABRP-style vehicle card with battery state, live data and plan options.",preview:!0,documentationURL:"https://github.com/MichelFR/ha-abrp"});
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
