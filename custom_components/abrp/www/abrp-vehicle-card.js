var w="abrp-vehicle-card",j="abrp";var te=globalThis,ie=te.ShadowRoot&&(te.ShadyCSS===void 0||te.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,he=Symbol(),Te=new WeakMap,B=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==he)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(ie&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=Te.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Te.set(t,e))}return e}toString(){return this.cssText}},Le=o=>new B(typeof o=="string"?o:o+"",void 0,he),I=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((i,s,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[n+1],o[0]);return new B(t,o,he)},Me=(o,e)=>{if(ie)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=te.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,o.appendChild(i)}},pe=ie?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Le(t)})(o):o;var{is:vt,defineProperty:bt,getOwnPropertyDescriptor:$t,getOwnPropertyNames:xt,getOwnPropertySymbols:wt,getPrototypeOf:yt}=Object,se=globalThis,Ne=se.trustedTypes,At=Ne?Ne.emptyScript:"",kt=se.reactiveElementPolyfillSupport,V=(o,e)=>o,ue={toAttribute(o,e){switch(e){case Boolean:o=o?At:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},Ue=(o,e)=>!vt(o,e),De={attribute:!0,type:String,converter:ue,reflect:!1,useDefault:!1,hasChanged:Ue};Symbol.metadata??=Symbol("metadata"),se.litPropertyMetadata??=new WeakMap;var A=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=De){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&bt(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:n}=$t(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:s,set(r){let c=s?.call(this);n?.call(this,r),this.requestUpdate(e,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??De}static _$Ei(){if(this.hasOwnProperty(V("elementProperties")))return;let e=yt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(V("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(V("properties"))){let t=this.properties,i=[...xt(t),...wt(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(pe(s))}else e!==void 0&&t.push(pe(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Me(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:ue).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let n=i.getPropertyOptions(s),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:ue;this._$Em=s;let c=r.fromAttribute(t,n.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(e,t,i,s=!1,n){if(e!==void 0){let r=this.constructor;if(s===!1&&(n=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??Ue)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,n]of i){let{wrapped:r}=n,c=this[s];r!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,n,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[V("elementProperties")]=new Map,A[V("finalized")]=new Map,kt?.({ReactiveElement:A}),(se.reactiveElementVersions??=[]).push("2.1.2");var $e=globalThis,Fe=o=>o,oe=$e.trustedTypes,He=oe?oe.createPolicy("lit-html",{createHTML:o=>o}):void 0,qe="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,Ke="?"+S,St=`<${Ke}>`,z=document,q=()=>z.createComment(""),K=o=>o===null||typeof o!="object"&&typeof o!="function",xe=Array.isArray,Et=o=>xe(o)||typeof o?.[Symbol.iterator]=="function",me=`[ 	
\f\r]`,W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,je=/-->/g,Be=/>/g,C=RegExp(`>|${me}(?:([^\\s"'>=/]+)(${me}*=${me}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ie=/'/g,Ve=/"/g,Ze=/^(?:script|style|textarea|title)$/i,we=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),a=we(1),Gt=we(2),Yt=we(3),O=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),We=new WeakMap,P=z.createTreeWalker(z,129);function Ge(o,e){if(!xe(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return He!==void 0?He.createHTML(e):e}var Ct=(o,e)=>{let t=o.length-1,i=[],s,n=e===2?"<svg>":e===3?"<math>":"",r=W;for(let c=0;c<t;c++){let l=o[c],d,u,h=-1,m=0;for(;m<l.length&&(r.lastIndex=m,u=r.exec(l),u!==null);)m=r.lastIndex,r===W?u[1]==="!--"?r=je:u[1]!==void 0?r=Be:u[2]!==void 0?(Ze.test(u[2])&&(s=RegExp("</"+u[2],"g")),r=C):u[3]!==void 0&&(r=C):r===C?u[0]===">"?(r=s??W,h=-1):u[1]===void 0?h=-2:(h=r.lastIndex-u[2].length,d=u[1],r=u[3]===void 0?C:u[3]==='"'?Ve:Ie):r===Ve||r===Ie?r=C:r===je||r===Be?r=W:(r=C,s=void 0);let _=r===C&&o[c+1].startsWith("/>")?" ":"";n+=r===W?l+St:h>=0?(i.push(d),l.slice(0,h)+qe+l.slice(h)+S+_):l+S+(h===-2?c:_)}return[Ge(o,n+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},Z=class o{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,r=0,c=e.length-1,l=this.parts,[d,u]=Ct(e,t);if(this.el=o.createElement(d,i),P.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=P.nextNode())!==null&&l.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(qe)){let m=u[r++],_=s.getAttribute(h).split(S),$=/([.?@])?(.*)/.exec(m);l.push({type:1,index:n,name:$[2],strings:_,ctor:$[1]==="."?ge:$[1]==="?"?fe:$[1]==="@"?ve:T}),s.removeAttribute(h)}else h.startsWith(S)&&(l.push({type:6,index:n}),s.removeAttribute(h));if(Ze.test(s.tagName)){let h=s.textContent.split(S),m=h.length-1;if(m>0){s.textContent=oe?oe.emptyScript:"";for(let _=0;_<m;_++)s.append(h[_],q()),P.nextNode(),l.push({type:2,index:++n});s.append(h[m],q())}}}else if(s.nodeType===8)if(s.data===Ke)l.push({type:2,index:n});else{let h=-1;for(;(h=s.data.indexOf(S,h+1))!==-1;)l.push({type:7,index:n}),h+=S.length-1}n++}}static createElement(e,t){let i=z.createElement("template");return i.innerHTML=e,i}};function R(o,e,t=o,i){if(e===O)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,n=K(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(o),s._$AT(o,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=R(o,s._$AS(o,e.values),s,i)),e}var _e=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??z).importNode(t,!0);P.currentNode=s;let n=P.nextNode(),r=0,c=0,l=i[0];for(;l!==void 0;){if(r===l.index){let d;l.type===2?d=new G(n,n.nextSibling,this,e):l.type===1?d=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(d=new be(n,this,e)),this._$AV.push(d),l=i[++c]}r!==l?.index&&(n=P.nextNode(),r++)}return P.currentNode=z,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},G=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=R(this,e,t),K(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==O&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Et(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&K(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Z.createElement(Ge(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let n=new _e(s,this),r=n.u(this.options);n.p(t),this.T(r),this._$AH=n}}_$AC(e){let t=We.get(e.strings);return t===void 0&&We.set(e.strings,t=new Z(e)),t}k(e){xe(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let n of e)s===t.length?t.push(i=new o(this.O(q()),this.O(q()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=Fe(e).nextSibling;Fe(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,n){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=g}_$AI(e,t=this,i,s){let n=this.strings,r=!1;if(n===void 0)e=R(this,e,t,0),r=!K(e)||e!==this._$AH&&e!==O,r&&(this._$AH=e);else{let c=e,l,d;for(e=n[0],l=0;l<n.length-1;l++)d=R(this,c[i+l],t,l),d===O&&(d=this._$AH[l]),r||=!K(d)||d!==this._$AH[l],d===g?e=g:e!==g&&(e+=(d??"")+n[l+1]),this._$AH[l]=d}r&&!s&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ge=class extends T{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}},fe=class extends T{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}},ve=class extends T{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){if((e=R(this,e,t,0)??g)===O)return;let i=this._$AH,s=e===g&&i!==g||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==g&&(i===g||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},be=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){R(this,e)}};var Pt=$e.litHtmlPolyfillSupport;Pt?.(Z,G),($e.litHtmlVersions??=[]).push("3.3.3");var Ye=(o,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let n=t?.renderBefore??null;i._$litPart$=s=new G(e.insertBefore(q(),n),n,void 0,t??{})}return s._$AI(o),s};var ye=globalThis,y=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ye(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return O}};y._$litElement$=!0,y.finalized=!0,ye.litElementHydrateSupport?.({LitElement:y});var zt=ye.litElementPolyfillSupport;zt?.({LitElement:y});(ye.litElementVersions??=[]).push("4.2.2");var Ot={sensor:["soc","range","reference_consumption","calibration_confidence","battery_capacity","odometer","speed_factor","calibrated_max_speed","max_speed","charging_power","hvac_power","power","voltage","battery_temp","cabin_temp","external_temp","soh","soe","elevation","firmware_version","arrival_time","road","speed_limit","gps_speed","last_update","data_source","vehicle_name","source_last_refresh","obd_last_refresh"],number:["arrival_soc","min_charger_stalls","extra_weight"],select:["charge_stops","drive_profile"],switch:["avoid_tolls","avoid_motorways","avoid_ferries","avoid_borders","realtime_traffic","realtime_weather","adjust_speed"],binary_sensor:["charging","navigating"],image:["car_image"],device_tracker:["destination","location"]};function Je(o){return Object.values(o.entities||{}).filter(e=>e.platform===j)}function Rt(o){if(o.translation_key)return o.translation_key;let e=o.entity_id.split(".")[1],t=e.lastIndexOf("_");return t>=0?e.slice(t+1):e}function Y(o){let e=new Map;for(let i of Je(o))i.device_id&&(e.has(i.device_id)||e.set(i.device_id,[]),e.get(i.device_id).push(i));let t=[];for(let[i,s]of e)s.some(n=>Rt(n)==="soc")&&t.push({deviceId:i,device:o.devices?.[i],ents:s});return t}function ne(o){let e=new Set(Y(o).map(t=>t.deviceId));return Je(o).filter(t=>!e.has(t.device_id))}function L(o,e){let t={};for(let i of e){let[s,n]=i.entity_id.split(".");i.translation_key&&(t[`${s}.${i.translation_key}`]=i.entity_id);for(let r of Ot[s]||[])!t[`${s}.${r}`]&&n.endsWith(`_${r}`)&&(t[`${s}.${r}`]=i.entity_id)}return t}var Xe={card:{vehicle:"Fahrzeug",no_vehicle:"Kein ABRP-Fahrzeug gefunden \u2014 richte zuerst die ABRP-Integration ein.",last_seen:"Zuletzt gesehen {time}",never_seen:"Nie gesehen",live_data:"Live-Daten",options:"Optionen",charging:"L\xE4dt",connected:"Verbunden",sleeping:"Schl\xE4ft",offline:"Offline",eta:"Ankunft {time}",destination:"Ziel"},time:{just_now:"gerade eben",min_ago:"vor {n} Min.",h_ago:"vor {n} Std.",d_ago:"vor {n} Tagen"},confirm:{title:"Fahrprofil wechseln?",text:"Das aktive Fahrprofil wird in ABRP von \u201E{from}\u201C zu \u201E{to}\u201C ge\xE4ndert.",cancel:"Abbrechen",switch:"Wechseln"},options:{title:"Planungsoptionen",charge_stops:"Ladestopps",optimal:"Optimal",fewer:"Weniger",least:"Wenigste",arrival_soc:"Ziel-Ladestand",avoid:"Auf der Route vermeiden",tolls:"Maut",highways:"Autobahnen",ferries:"F\xE4hren und Autoz\xFCge",borders:"Grenzen",realtime:"Echtzeit",traffic:"Echtzeitverkehr",weather:"Echtzeitwetter",adjust_speed:"Geschwindigkeit an Limits anpassen",stalls:"Minimale Ladepunkte",extra_weight:"Zusatzgewicht",drive_profile:"Fahrprofil"},live:{title:"Live-Daten",soc:"Ladestand",power:"Leistung",hvac_power:"HVAC-Leistung",range:"Reichweite",voltage:"Spannung",ref_consumption:"Kalibrierter Referenzverbrauch",batt_temp:"Batterietemperatur",degradation:"Degradation",capacity:"Batteriekapazit\xE4t",ref_speed:"Referenzgeschwindigkeit",max_speed:"H\xF6chstgeschwindigkeit",soe:"Verbleibende Energie (SoE)",inside_temp:"Innentemperatur",outside_temp:"Au\xDFentemperatur",odometer:"Kilometerstand",location:"Standort",elevation:"H\xF6he",firmware:"Firmware-Version",estimate:"ABRP-Sch\xE4tzung"},editor:{vehicle:"Fahrzeug (leer = erstes ABRP-Fahrzeug)",auto_name:"ABRP-Fahrzeugname",automatic:"Automatisch",nothing_shown:"Nichts angezeigt",shown:"Angezeigt",overridden:"{n} \xFCberschrieben",mode_auto:"Automatisch",mode_entity:"Entit\xE4t",mode_custom:"Benutzerdefiniert",entity:"Entit\xE4t",value_template:"Wert oder Template",custom_name:"Eigener Name oder Template",name:"Name",not_found:"nicht gefunden",auto_value:"Automatisch: {value}"},page:{title:"Titel",illustration:"Fahrzeugbild",profile:"Fahrprofil",battery:"Batterie & Laden",status:"Statuszeile",buttons:"Schaltfl\xE4chen",livedata:"Live-Daten"},toggle:{show_image:"Fahrzeugbild anzeigen",show_profile:"Fahrprofil-Auswahl anzeigen",confirm_profile_change:"Vor Wechsel best\xE4tigen",show_charge_speed:"Ladeleistungs-Badge anzeigen",show_last_seen:"Zuletzt gesehen anzeigen",show_live_data:"Live-Daten-Link anzeigen",show_options:"Optionen-Schaltfl\xE4che anzeigen",show_live_data_button:"Live-Daten-Schaltfl\xE4che anzeigen",show_navigation:"Aktive Navigation anzeigen"},short:{show_image:"Fahrzeugbild",show_profile:"Auswahl",confirm_profile_change:"Best\xE4tigung",show_charge_speed:"Ladeleistung",show_last_seen:"Zuletzt gesehen",show_live_data:"Live-Daten-Link",show_options:"Optionen",show_live_data_button:"Live-Daten-Schaltfl\xE4che",show_navigation:"Navigation"},slot:{image:{car_image:"Fahrzeugbild"},select:{drive_profile:"Fahrprofil"},binary_sensor:{charging:"L\xE4dt"},device_tracker:{location:"Standort"},sensor:{soc:"Ladestand",charging_power:"Ladeleistung",last_update:"Letzte Aktualisierung",range:"Reichweite",reference_consumption:"Referenzverbrauch",battery_capacity:"Batteriekapazit\xE4t",odometer:"Kilometerstand",speed_factor:"Geschwindigkeitsfaktor",max_speed:"H\xF6chstgeschwindigkeit",elevation:"H\xF6he",data_source:"Datenquelle",source_last_refresh:"Cloud letzte Aktualisierung",obd_last_refresh:"OBD letzte Aktualisierung"}}};var Qe={card:{vehicle:"Vehicle",no_vehicle:"No ABRP vehicle found \u2014 set up the ABRP integration first.",last_seen:"Last seen {time}",never_seen:"Never seen",live_data:"Live data",options:"Options",charging:"Charging",connected:"Connected",sleeping:"Sleeping",offline:"Offline",eta:"ETA {time}",destination:"Destination"},time:{just_now:"just now",min_ago:"{n} min ago",h_ago:"{n} h ago",d_ago:"{n} d ago"},confirm:{title:"Switch drive profile?",text:'This changes the active drive profile from "{from}" to "{to}" in ABRP.',cancel:"Cancel",switch:"Switch"},options:{title:"Plan options",charge_stops:"Charge stops",optimal:"Optimal",fewer:"Fewer",least:"Fewest",arrival_soc:"Destination arrival SoC",avoid:"Avoid on route",tolls:"Tolls",highways:"Highways",ferries:"Ferries and car trains",borders:"Borders",realtime:"Realtime",traffic:"Realtime traffic",weather:"Realtime weather",adjust_speed:"Adjust speed to limits",stalls:"Minimum charger stalls",extra_weight:"Extra weight",drive_profile:"Drive profile"},live:{title:"Live data",soc:"SoC",power:"Power",hvac_power:"HVAC power",range:"Range",voltage:"Voltage",ref_consumption:"Calibrated reference consumption",batt_temp:"Battery temperature",degradation:"Degradation",capacity:"Battery capacity",ref_speed:"Reference speed",max_speed:"Maximum speed",soe:"Remaining energy (SoE)",inside_temp:"Inside temperature",outside_temp:"Outside temperature",odometer:"Odometer",location:"Location",elevation:"Elevation",firmware:"Firmware version",estimate:"ABRP Estimate"},editor:{vehicle:"Vehicle (empty = first ABRP vehicle)",auto_name:"ABRP vehicle name",automatic:"Automatic",nothing_shown:"Nothing shown",shown:"Shown",overridden:"{n} overridden",mode_auto:"Automatic",mode_entity:"Entity",mode_custom:"Custom",entity:"Entity",value_template:"Value or template",custom_name:"Custom name or template",name:"Name",not_found:"not found",auto_value:"Automatic: {value}"},page:{title:"Title",illustration:"Vehicle illustration",profile:"Drive profile",battery:"Battery & charging",status:"Status line",buttons:"Buttons",livedata:"Live data"},toggle:{show_image:"Show car image",show_profile:"Show drive profile selector",confirm_profile_change:"Confirm before changing",show_charge_speed:"Show charging speed badge",show_last_seen:"Show last seen",show_live_data:"Show Live data link",show_options:"Show Options button",show_live_data_button:"Show Live data button",show_navigation:"Show active navigation"},short:{show_image:"Car image",show_profile:"Selector",confirm_profile_change:"Confirm",show_charge_speed:"Speed badge",show_last_seen:"Last seen",show_live_data:"Live data link",show_options:"Options button",show_live_data_button:"Live data button",show_navigation:"Navigation"},slot:{image:{car_image:"Car image"},select:{drive_profile:"Drive profile"},binary_sensor:{charging:"Charging"},device_tracker:{location:"Location"},sensor:{soc:"State of charge",charging_power:"Charging power",last_update:"Last update",range:"Range",reference_consumption:"Reference consumption",battery_capacity:"Battery capacity",odometer:"Odometer",speed_factor:"Speed factor",max_speed:"Maximum speed",elevation:"Elevation",data_source:"Data source",source_last_refresh:"Cloud last refresh",obd_last_refresh:"OBD last refresh"}}};var Ae={en:Qe,de:Xe};function Mt(o){return(o?.locale?.language||o?.language||"en").split("-")[0]}function et(o,e){let t=e.split(".").reduce((i,s)=>i?.[s],o);return typeof t=="string"?t:void 0}function v(o,e,t={}){let i=Ae[Mt(o)]||Ae.en,s=et(i,e)??et(Ae.en,e)??e;for(let[n,r]of Object.entries(t))s=s.replace(`{${n}}`,r);return s}function re(o,e){if(!o)return null;let t=(Date.now()-new Date(o).getTime())/1e3;return Number.isNaN(t)?null:t<90?v(e,"time.just_now"):t<5400?v(e,"time.min_ago",{n:Math.round(t/60)}):t<129600?v(e,"time.h_ago",{n:Math.round(t/3600)}):v(e,"time.d_ago",{n:Math.round(t/86400)})}function M(o){return o&&o.charAt(0).toUpperCase()+o.slice(1)}function N(o,e=0){let t=Number(o?.state);return Number.isFinite(t)?t.toFixed(e):null}function k(o){return typeof o=="string"&&/\{[{%]/.test(o)}function E(o){return typeof o=="string"&&/^[a-z_]+\.[a-zA-Z0-9_]+$/.test(o)}var tt=!1;async function ae(){if(!tt){tt=!0;try{await(await window.loadCardHelpers?.())?.importMoreInfoControl?.("light")}catch{}}}var it=I`
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
  .nav-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
    padding: 8px 10px;
    border-radius: 10px;
    background: var(--secondary-background-color);
    font-size: 0.95em;
  }
  .nav-row ha-icon {
    --mdc-icon-size: 18px;
    color: var(--primary-color);
  }
  .nav-dest {
    font-weight: 600;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .nav-meta {
    color: var(--secondary-text-color);
    white-space: nowrap;
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
  /* Connection-status dot colours, matching the ABRP app. */
  .dot.green {
    background: #4caf50;
    --dot-ripple: rgba(76, 175, 80, 0.5);
  }
  .dot.red {
    background: #f44336;
    --dot-ripple: rgba(244, 67, 54, 0.5);
  }
  .dot.gray {
    background: #9e9e9e;
  }
  .dot.pulse {
    animation: dot-pulse 1.6s ease-out infinite;
  }
  @keyframes dot-pulse {
    0% {
      box-shadow: 0 0 0 0 var(--dot-ripple);
    }
    70% {
      box-shadow: 0 0 0 6px transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
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
  .dlg-body {
    padding: 0 4px 8px;
  }
  /* MD3-style confirmation dialog on HA theme tokens */
  .confirm-body {
    padding: 4px 4px 0;
  }
  .confirm-text {
    color: var(--secondary-text-color);
    font-size: 0.95em;
    line-height: 1.45;
  }
  .confirm-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 26px;
  }
  .text-btn,
  .filled-btn {
    border: none;
    border-radius: 20px;
    padding: 10px 18px;
    font-size: 0.95em;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.15s ease, filter 0.15s ease,
      box-shadow 0.15s ease;
  }
  .text-btn {
    background: transparent;
    color: var(--primary-color);
  }
  .text-btn:hover {
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
  }
  .filled-btn {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    padding: 10px 24px;
  }
  .filled-btn:hover {
    filter: brightness(1.08);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
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
`;var ke=3600,Se=86400,J=604800,st=2592e3,Nt={soc:Se,soe:Se,power:300,hvac_power:300,speed:30,capacity:st,kwh_charged:300,soh:st,voltage:300,current:300,odometer:J,est_battery_range:Se,ext_temp:ke,batt_temp:ke,cabin_temp:ke,lat:J,lon:J,heading:J,elevation:J};function ot(o){let e=p=>v(o.hass,p),t=o._vs("sensor.data_source")?.attributes||{},i=t.providers||{},s=t.timestamps||{},n=Date.now()/1e3,r=p=>{if(!p)return!0;let f=Nt[p],x=Number(s[p]);return f==null||!Number.isFinite(x)||x<=0?!0:n-x<=f},c=(p,f=e("live.estimate"))=>M(i[p])||f,l=(p,f)=>o._vs(p)?.attributes?.unit_of_measurement??f,d=(p,f)=>{if(f&&!r(f))return null;let x=Number(o._vs(p)?.state);return Number.isFinite(x)?x:null},u=p=>Math.abs(p)<10?p.toFixed(1):p.toFixed(0),h=d("sensor.power","power"),m=o._vs("binary_sensor.charging")?.state==="on",_=h==null?null:m?-h:h,$=i.power==="derived"&&i.current!=null?i.current:i.power,U=d("sensor.soh","soh"),b=U==null?null:100-U,F=d("sensor.calibration_confidence")==null?null:N(o._vs("sensor.reference_consumption")),Ce=N(o._vs("sensor.calibrated_max_speed")),dt=Ce??N(o._vs("sensor.max_speed")),ht=Ce!=null?c("calib_max_speed"):c("max_speed"),Q=o._vs("device_tracker.location"),pt=Q?.attributes?.address,ut=r("lat")?pt||(Q?.state&&Q.state!=="unknown"?Q.state:null):null,Pe=d("sensor.speed_factor"),ee=o._vs("sensor.firmware_version")?.state,ze=d("sensor.soc","soc"),Oe=d("sensor.hvac_power","hvac_power"),mt=[[e("live.soc"),ze==null?null:ze.toFixed(0),"%",c("soc"),"sensor.soc"],[e("live.power"),_==null?null:u(_),"kW",M($)||e("live.estimate"),"sensor.power"],[e("live.hvac_power"),Oe==null?null:u(Oe),"kW",c("hvac_power"),"sensor.hvac_power"],[e("live.range"),d("sensor.range","est_battery_range")?.toFixed(0)??null,l("sensor.range","km"),c("est_battery_range"),"sensor.range"],[e("live.voltage"),d("sensor.voltage","voltage")?.toFixed(0)??null,"V",c("voltage"),"sensor.voltage"],[e("live.ref_consumption"),F,l("sensor.reference_consumption","Wh/km"),c("calib_ref_cons"),"sensor.reference_consumption"],[e("live.batt_temp"),d("sensor.battery_temp","batt_temp")?.toFixed(0)??null,l("sensor.battery_temp","\xB0C"),c("batt_temp"),"sensor.battery_temp"],[e("live.degradation"),b==null?null:u(b),"%",c("soh"),"sensor.soh"],[e("live.capacity"),d("sensor.battery_capacity","capacity")?.toFixed(0)??null,"kWh",c("battery_capacity",c("capacity")),"sensor.battery_capacity"],[e("live.ref_speed"),Pe==null?null:Math.round(Pe*100),"%",c("speed_factor"),"sensor.speed_factor"],[e("live.max_speed"),dt,l("sensor.calibrated_max_speed","km/h"),ht,"sensor.calibrated_max_speed"],[e("live.soe"),d("sensor.soe","soe")?.toFixed(1)??null,"kWh",c("soe"),"sensor.soe"],[e("live.inside_temp"),d("sensor.cabin_temp","cabin_temp")?.toFixed(0)??null,l("sensor.cabin_temp","\xB0C"),c("cabin_temp"),"sensor.cabin_temp"],[e("live.outside_temp"),d("sensor.external_temp","ext_temp")?.toFixed(0)??null,l("sensor.external_temp","\xB0C"),c("ext_temp"),"sensor.external_temp"],[e("live.odometer"),d("sensor.odometer","odometer")?.toFixed(0)??null,l("sensor.odometer","km"),c("odometer"),"sensor.odometer"],[e("live.location"),ut,"",c("lat",""),"device_tracker.location"],[e("live.elevation"),d("sensor.elevation","elevation")?.toFixed(0)??null,l("sensor.elevation","m"),c("elevation",""),"sensor.elevation"],[e("live.firmware"),ee&&ee!=="unknown"&&ee!=="unavailable"?ee:null,"","","sensor.firmware_version"]].filter(([,p])=>p!=null),_t=M(o._vs("sensor.data_source")?.state),gt=p=>p&&p!=="unknown"&&p!=="unavailable",de=new Map;for(let[p,f,x]of[[_t,o._vs("sensor.source_last_refresh")?.state,"sensor.source_last_refresh"],["Obdble",o._vs("sensor.obd_last_refresh")?.state,"sensor.obd_last_refresh"]]){if(!p||!gt(f))continue;let H=de.get(p.toLowerCase());(!H||new Date(f)>new Date(H[1]))&&de.set(p.toLowerCase(),[p,f,x])}let Re=[...de.values()];return a`<div class="grid">
      ${mt.map(([p,f,x,H,ft])=>a`<div
          class="tile clickable"
          @click=${()=>o._moreInfo(ft)}
        >
          <div class="tile-title">${p}</div>
          <div class="tile-value">
            ${f}<span class="tile-unit"> ${x}</span>
          </div>
          ${H?a`<div class="tile-prov">${H}</div>`:""}
        </div>`)}
    </div>
    ${Re.length?a`<div class="sources">
          ${Re.map(([p,f,x])=>a`<span
              class="seen clickable"
              @click=${()=>o._moreInfo(x)}
            >
              <span class="dot"></span>${p}
              <span class="src-time">${re(f,o.hass)}</span>
            </span>`)}
        </div>`:""}`}var nt={optimal:"options.optimal",fewer:"options.fewer",least:"options.least"},Dt=[["switch.avoid_tolls","mdi:cash-multiple","options.tolls"],["switch.avoid_motorways","mdi:highway","options.highways"],["switch.avoid_ferries","mdi:ferry","options.ferries"],["switch.avoid_borders","mdi:boom-gate","options.borders"]],Ut=[["switch.realtime_traffic","mdi:traffic-light","options.traffic"],["switch.realtime_weather","mdi:weather-partly-cloudy","options.weather"],["switch.adjust_speed","mdi:speedometer","options.adjust_speed"]],X=(o,e)=>a`<div class="section"><ha-icon icon=${o}></ha-icon>${e}</div>`;function rt(o){let e=o._as("select.charge_stops"),t=o._vs("select.drive_profile"),i=s=>v(o.hass,s);return a`
    ${e?Ft(o,e):""}
    ${Ee(o,i("options.arrival_soc"),"mdi:battery-low",o._as("number.arrival_soc"),"%")}
    ${X("mdi:cancel",i("options.avoid"))}
    <div class="chips">
      ${Dt.map(([s,n,r])=>Ht(o,s,n,i(r)))}
    </div>
    ${X("mdi:update",i("options.realtime"))}
    ${Ut.map(([s,n,r])=>jt(o,s,n,i(r)))}
    ${Ee(o,i("options.stalls"),"mdi:counter",o._as("number.min_charger_stalls"),"")}
    ${Ee(o,i("options.extra_weight"),"mdi:weight-kilogram",o._as("number.extra_weight")," kg")}
    ${Bt(o,t)}
  `}function Ft(o,e){return a`${X("mdi:ev-station",v(o.hass,"options.charge_stops"))}
    <div class="segments">
      ${(e.attributes.options||[]).map(t=>a`<button
          class="segment ${e.state===t?"on":""}"
          @click=${()=>o._call("select","select_option",e,{option:t})}
        >
          ${nt[t]?v(o.hass,nt[t]):M(t)}
        </button>`)}
    </div>`}function Ee(o,e,t,i,s){if(!i)return"";let n=i.attributes,r=Number(i.state);return a`${X(t,e)}
    <div class="slider-row">
      <span class="slider-value"
        >${Number.isFinite(r)?r:"\u2013"}${s}</span
      >
      <ha-slider
        pin
        min=${n.min??0}
        max=${n.max??100}
        step=${n.step??1}
        .value=${r}
        @change=${c=>{o._call("number","set_value",i,{value:Number(c.target.value)}),c.target.closest(".slider-row").querySelector(".slider-value").textContent=`${c.target.value}${s}`}}
      ></ha-slider>
    </div>`}function Ht(o,e,t,i){let s=o._as(e);if(!s)return"";let n=s.state==="on";return a`<button
    class="chip ${n?"on":""}"
    @click=${()=>o._call("switch","toggle",s)}
  >
    <ha-icon icon="${t}"></ha-icon>${i}
  </button>`}function jt(o,e,t,i){let s=o._as(e);return s?a`<div class="switch-row">
    <span class="switch-label"><ha-icon icon=${t}></ha-icon>${i}</span>
    <ha-switch
      .checked=${s.state==="on"}
      @change=${()=>o._call("switch","toggle",s)}
    ></ha-switch>
  </div>`:""}function Bt(o,e){return e?.attributes?.options?.length?a`${X("mdi:car-cog",v(o.hass,"options.drive_profile"))}
    <ha-select
      naturalMenuWidth
      fixedMenuPosition
      .value=${e.state}
      @selected=${t=>{let i=t.target.value;i&&i!==e.state&&o._requestProfileChange(e,i)}}
      @closed=${t=>t.stopPropagation()}
    >
      ${e.attributes.options.map(t=>a`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
    </ha-select>`:""}var ce=class extends y{static styles=it;static get properties(){return{hass:{},_config:{},_dialog:{state:!0},_profileMenu:{state:!0},_confirmProfile:{state:!0}}}constructor(){super(),this._dialog=null,this._profileMenu=!1,this._confirmProfile=null}connectedCallback(){super.connectedCallback(),ae()}setConfig(e){this._config=e||{}}static getConfigElement(){return document.createElement(`${w}-editor`)}static getStubConfig(){return{}}getCardSize(){return 5}get _vehicle(){let e=Y(this.hass);return e.length?this._config.device&&e.find(t=>t.deviceId===this._config.device)||e[0]:null}_resolve(e,t){let i=this._config.entities?.[e];if(i){if(k(i)){let n=this._templateResults?.[i];return{state:n===void 0?"unknown":String(n),attributes:{}}}return E(i)?this.hass.states[i]:{state:i,attributes:{}}}let s=t?.[e];return s?this.hass.states[s]:void 0}_vs(e){return this._resolve(e,this._vmap)}_as(e){return this._resolve(e,this._amap)}updated(e){super.updated(e),(e.has("hass")||e.has("_config"))&&this._syncTemplates()}disconnectedCallback(){super.disconnectedCallback();for(let e of Object.values(this._tmplUnsub||{}))typeof e=="function"&&e();this._tmplUnsub={}}async _syncTemplates(){if(!this.hass?.connection)return;this._tmplUnsub=this._tmplUnsub||{},this._templateResults=this._templateResults||{};let e=[...Object.values(this._config.entities||{}),this._config.title].filter(t=>k(t));for(let t of e)if(!this._tmplUnsub[t]){this._tmplUnsub[t]=!0;try{this._tmplUnsub[t]=await this.hass.connection.subscribeMessage(i=>{this._templateResults[t]=i.result,this.requestUpdate()},{type:"render_template",template:t})}catch{this._templateResults[t]="error",this.requestUpdate()}}for(let t of Object.keys(this._tmplUnsub))if(!e.includes(t)){let i=this._tmplUnsub[t];typeof i=="function"&&i(),delete this._tmplUnsub[t],delete this._templateResults[t]}}_moreInfo(e){let t=this._config.entities?.[e],i=t&&E(t)&&!k(t)?t:this._vmap?.[e]||this._amap?.[e];!i||t&&!E(t)||this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:i},bubbles:!0,composed:!0}))}_t(e,t){return v(this.hass,e,t)}_call(e,t,i,s={}){this.hass.callService(e,t,{entity_id:i.entity_id,...s})}render(){if(!this.hass)return a``;let e=this._vehicle;return e?(this._vmap=L(this.hass,e.ents),this._amap=L(this.hass,ne(this.hass)),a`<ha-card>
      ${this._renderMain(e)}
      ${this._dialog==="options"?this._dialogFrame(this._t("options.title"),rt(this)):""}
      ${this._dialog==="live"?this._dialogFrame(this._t("live.title"),ot(this)):""}
      ${this._confirmProfile?this._renderConfirmProfile():""}
    </ha-card>`):a`<ha-card>
        <div class="empty">${this._t("card.no_vehicle")}</div>
      </ha-card>`}_status(){let e=Date.now()/1e3,t=m=>{if(!m||m==="unknown"||m==="unavailable")return null;let _=new Date(m).getTime();return Number.isNaN(_)?null:_/1e3},i=this._vs("sensor.data_source"),s=t(i?.attributes?.soc_last_seen),n=Number(this._vs("sensor.soc")?.state),r=Number.isFinite(n)&&s!=null&&e-s<300,c=this._vs("binary_sensor.charging")?.state==="on",l=Math.abs(Number(this._vs("sensor.charging_power")?.state)),d=this._vs("binary_sensor.asleep")?.state==="on",u=i?.attributes?.last_seen??this._vs("sensor.last_update")?.state,h=t(u);if(r&&c&&Number.isFinite(l)&&l>0)return{color:"green",pulse:!0,text:this._t("card.charging")};if(r)return{color:"green",pulse:!0,text:this._t("card.connected")};if(h!=null&&e-h<=3*3600){let m=re(u,this.hass);return{color:"gray",pulse:!1,text:m?this._t("card.last_seen",{time:m}):this._t("card.never_seen")}}return d?{color:"gray",pulse:!1,text:this._t("card.sleeping")}:{color:"gray",pulse:!1,text:this._t("card.offline")}}_renderMain(e){let t=this._vs("sensor.vehicle_name")?.state,i=this._config.title,n=(i&&k(i)?String(this._templateResults?.[i]??""):i)||(t&&t!=="unknown"&&t!=="unavailable"?t:null)||e.device?.name_by_user||e.device?.name||this._t("card.vehicle"),r=this._vs("sensor.soc"),c=Number(this._vs("sensor.data_source")?.attributes?.timestamps?.soc),d=Number.isFinite(c)&&c>0&&Date.now()/1e3-c>86400?null:N(r),u=this._vs("image.car_image"),h=u?.attributes?.entity_picture||(typeof u?.state=="string"&&(u.state.startsWith("http")||u.state.startsWith("/"))?u.state:null),m=this._status(),_=this._vs("binary_sensor.charging")?.state==="on",$=Number(this._vs("sensor.charging_power")?.state),U=_&&Number.isFinite($)&&$>0?`${$<10?$.toFixed(1):Math.round($)} kW`:null,b=F=>this._config[F]!==!1;return a`<div class="main">
      <div class="head">
        <div class="head-left">
          <div class="name">${n}</div>
          ${b("show_profile")?this._renderProfile():""}
        </div>
        ${b("show_image")&&h?a`<img
              class="car clickable"
              src="${h}"
              alt="${n}"
              @click=${()=>this._moreInfo("image.car_image")}
            />`:""}
      </div>
      <div class="soc-row clickable" @click=${()=>this._moreInfo("sensor.soc")}>
        ${r?a`<ha-state-icon
              .hass=${this.hass}
              .stateObj=${r}
            ></ha-state-icon>`:a`<ha-icon icon="mdi:battery"></ha-icon>`}
        <span class="soc">${d??"\u2013"}%</span>
        ${b("show_charge_speed")&&U?a`<span
              class="charge-speed clickable"
              @click=${F=>{F.stopPropagation(),this._moreInfo("sensor.charging_power")}}
            >
              <ha-icon icon="mdi:flash"></ha-icon>${U}
            </span>`:b("show_charge_speed")&&_?a`<span class="charge-speed">
                <ha-icon icon="mdi:flash"></ha-icon>${this._t("card.charging")}
              </span>`:""}
      </div>
      <div class="bar clickable" @click=${()=>this._moreInfo("sensor.soc")}>
        <div class="fill ${_?"charging":""}" style="width:${d??0}%"></div>
      </div>
      ${b("show_navigation")?this._renderNavigation():""}
      ${b("show_last_seen")||b("show_live_data")?a`<div class="meta">
            ${b("show_last_seen")?a`<span
                  class="seen clickable"
                  @click=${()=>this._moreInfo("sensor.last_update")}
                >
                  <span
                    class="dot ${m.color}${m.pulse?" pulse":""}"
                  ></span>
                  ${m.text}
                </span>`:a`<span></span>`}
            ${b("show_live_data")?a`<a class="link" @click=${()=>this._dialog="live"}
                  >${this._t("card.live_data")}</a
                >`:""}
          </div>`:""}
      ${b("show_options")||this._config.show_live_data_button===!0?a`<div class="buttons">
            ${b("show_options")?a`<button
                  class="btn"
                  @click=${()=>this._dialog="options"}
                >
                  <ha-icon icon="mdi:tune-variant"></ha-icon>${this._t("card.options")}
                </button>`:""}
            ${this._config.show_live_data_button===!0?a`<button class="btn" @click=${()=>this._dialog="live"}>
                  <ha-icon icon="mdi:chart-box-outline"></ha-icon>${this._t("card.live_data")}
                </button>`:""}
          </div>`:""}
    </div>`}_renderNavigation(){let t=this._vs("device_tracker.destination")?.attributes||{};if(!t.destination&&t.latitude==null)return"";let i=[];t.distance_km!=null&&i.push(`${t.distance_km} km`);let s=this._vs("sensor.arrival_time")?.state;if(s&&s!=="unknown"&&s!=="unavailable"){let n=new Date(s);Number.isNaN(n.getTime())||i.push(this._t("card.eta",{time:n.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}))}return a`<div
      class="nav-row clickable"
      @click=${()=>this._moreInfo("device_tracker.destination")}
    >
      <ha-icon icon="mdi:navigation-variant"></ha-icon>
      <span class="nav-dest">${t.destination||this._t("card.destination")}</span>
      ${i.length?a`<span class="nav-meta">${i.join(" \xB7 ")}</span>`:""}
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
      class="confirm"
      width="small"
      header-title=${this._t("confirm.title")}
      @closed=${()=>this._confirmProfile=null}
    >
      <div class="confirm-body">
        <div class="confirm-text">
          ${this._t("confirm.text",{from:e.state,to:t})}
        </div>
        <div class="confirm-actions">
          <button
            class="text-btn"
            @click=${()=>this._confirmProfile=null}
          >
            ${this._t("confirm.cancel")}
          </button>
          <button
            class="filled-btn"
            @click=${()=>{this._call("select","select_option",e,{option:t}),this._confirmProfile=null}}
          >
            ${this._t("confirm.switch")}
          </button>
        </div>
      </div>
    </ha-dialog>`}_dialogFrame(e,t){return a`<ha-dialog
      open
      header-title=${e}
      @closed=${()=>this._dialog=null}
    >
      <div class="dlg-body">${t}</div>
    </ha-dialog>`}};var It=[{name:"device",selector:{device:{integration:j,entity:[{integration:j,domain:"device_tracker"}]}}}],at={illustration:[["show_image",!0,"mdi:image-outline"]],profile:[["show_profile",!0,"mdi:car-cog"],["confirm_profile_change",!0,"mdi:shield-check-outline"]],battery:[["show_charge_speed",!0,"mdi:flash"]],status:[["show_last_seen",!0,"mdi:clock-outline"],["show_live_data",!0,"mdi:link-variant"],["show_navigation",!0,"mdi:navigation-variant"]],buttons:[["show_options",!0,"mdi:tune-variant"],["show_live_data_button",!1,"mdi:chart-box-outline"]]},ct={illustration:[["image.car_image","mdi:image-outline"]],profile:[["select.drive_profile","mdi:car-cog"]],battery:[["sensor.soc","mdi:battery-high"],["binary_sensor.charging","mdi:battery-charging"],["sensor.charging_power","mdi:flash"]],status:[["sensor.last_update","mdi:clock-outline"]],livedata:[["sensor.soc","mdi:battery-high"],["sensor.range","mdi:map-marker-distance"],["sensor.reference_consumption","mdi:lightning-bolt-outline"],["sensor.battery_capacity","mdi:battery"],["sensor.odometer","mdi:counter"],["device_tracker.location","mdi:map-marker"],["sensor.speed_factor","mdi:speedometer"],["sensor.max_speed","mdi:speedometer-medium"],["sensor.elevation","mdi:image-filter-hdr"],["sensor.data_source","mdi:database-outline"],["sensor.source_last_refresh","mdi:cloud-outline"],["sensor.obd_last_refresh","mdi:car-connected"]]},lt=[{id:"title",icon:"mdi:format-title"},{id:"illustration",icon:"mdi:image-outline"},{id:"profile",icon:"mdi:car-cog"},{id:"battery",icon:"mdi:battery-charging"},{id:"status",icon:"mdi:clock-outline"},{id:"buttons",icon:"mdi:gesture-tap-button"},{id:"livedata",icon:"mdi:chart-box-outline"}],D="sensor.vehicle_name",le=class extends y{static get properties(){return{hass:{},_config:{},_page:{state:!0},_modes:{state:!0}}}constructor(){super(),this._page=null,this._modes={}}connectedCallback(){super.connectedCallback(),ae()}setConfig(e){this._config=e||{}}_t(e,t){return v(this.hass,e,t)}render(){if(!this.hass)return a``;let e=lt.find(t=>t.id===this._page);return e?this._renderSubpage(e):this._renderRoot()}_defaults(){let e=Y(this.hass),t=this._config.device&&e.find(i=>i.deviceId===this._config.device)||e[0];return{...t?L(this.hass,t.ents):{},...L(this.hass,ne(this.hass))}}_renderRoot(){return a`<ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${It}
        .computeLabel=${()=>this._t("editor.vehicle")}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="nav">
        ${lt.map(e=>a`<button
            class="nav-row"
            @click=${()=>this._page=e.id}
          >
            <ha-icon class="nav-icon" icon=${e.icon}></ha-icon>
            <span class="nav-labels">
              <span class="nav-label">${this._t(`page.${e.id}`)}</span>
              <span class="nav-secondary">${this._summary(e.id)}</span>
            </span>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>`)}
      </div>`}_summary(e){if(e==="title")return this._config.title||(this._config.entities?.[D]??this._t("editor.auto_name"));let t=(ct[e]||[]).filter(([r])=>this._config.entities?.[r]).length,i=t?` \xB7 ${this._t("editor.overridden",{n:t})}`:"",s=at[e]||[];if(!s.length)return t?this._t("editor.overridden",{n:t}):this._t("editor.automatic");let n=s.filter(([r,c])=>this._config[r]??c);return n.length?n.length===s.length&&s.length===1?`${this._t("editor.shown")}${i}`:n.map(([r])=>this._t(`short.${r}`)).join(", ")+i:`${this._t("editor.nothing_shown")}${i}`}_renderSubpage(e){return a`<div class="subpage-head">
        <button class="back" @click=${()=>this._page=null}>
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </button>
        <span class="subpage-title">${this._t(`page.${e.id}`)}</span>
      </div>
      ${(at[e.id]||[]).map(([t,i,s])=>this._renderToggle(t,i,s))}
      ${e.id==="title"?this._renderTitleSlot():(ct[e.id]||[]).map(([t,i])=>this._renderSlot(t,i))}`}_renderToggle(e,t,i){return a`<div class="row">
      <ha-icon icon=${i}></ha-icon>
      <span class="row-label">${this._t(`toggle.${e}`)}</span>
      <ha-switch
        .checked=${this._config[e]??t}
        @change=${s=>this._toggleDisplay(e,t,s.target.checked)}
      ></ha-switch>
    </div>`}_slotMode(e,t){return this._modes[e]?this._modes[e]:t?E(t)&&!k(t)?"entity":"custom":"auto"}_renderModeChips(e,t,i){return a`<div class="modes">
      ${["auto","entity","custom"].map(s=>a`<button
          class="mode ${t===s?"on":""}"
          @click=${()=>i(s)}
        >
          ${this._t(`editor.mode_${s}`)}
        </button>`)}
    </div>`}_renderSlot(e,t){let i=this._config.entities?.[e]||"",s=this._slotMode(e,i),n=this._defaults()[e];return a`<div class="section">
        <ha-icon icon=${t}></ha-icon>${this._t(`slot.${e}`)}
      </div>
      ${this._renderModeChips(e,s,r=>{this._modes={...this._modes,[e]:r},r==="auto"&&this._setOverride(e,"")})}
      ${s==="auto"?a`<div class="hint">
            ${this._t("editor.auto_value",{value:n||this._t("editor.not_found")})}
          </div>`:s==="entity"?a`<ha-form
              .hass=${this.hass}
              .data=${{value:E(i)&&!k(i)?i:""}}
              .schema=${[{name:"value",selector:{entity:{}}}]}
              .computeLabel=${()=>this._t("editor.entity")}
              @value-changed=${r=>{r.stopPropagation(),this._setOverride(e,r.detail.value.value||"")}}
            ></ha-form>`:a`<ha-form
              .hass=${this.hass}
              .data=${{value:E(i)&&!k(i)?"":i}}
              .schema=${[{name:"value",selector:{template:{}}}]}
              .computeLabel=${()=>this._t("editor.value_template")}
              @value-changed=${r=>{r.stopPropagation(),this._setOverride(e,r.detail.value.value||"")}}
            ></ha-form>`}`}_renderTitleSlot(){let e=this._config.entities?.[D]||"",t=this._config.title||"",i=this._modes.__title||(t?"custom":e?"entity":"auto"),s=this._defaults()[D];return a`<div class="section">
        <ha-icon icon="mdi:format-title"></ha-icon>${this._t("editor.name")}
      </div>
      ${this._renderModeChips("__title",i,n=>{this._modes={...this._modes,__title:n},n==="auto"?this._dispatch(this._withoutTitle(this._withOverride(D,""))):n==="entity"?this._dispatch(this._withoutTitle(this._config)):n==="custom"&&this._dispatch(this._withOverride(D,""))})}
      ${i==="auto"?a`<div class="hint">
            ${this._t("editor.auto_value",{value:s||this._t("editor.auto_name")})}
          </div>`:i==="entity"?a`<ha-form
              .hass=${this.hass}
              .data=${{value:e}}
              .schema=${[{name:"value",selector:{entity:{}}}]}
              .computeLabel=${()=>this._t("editor.entity")}
              @value-changed=${n=>{n.stopPropagation(),this._setOverride(D,n.detail.value.value||"")}}
            ></ha-form>`:a`<ha-form
              .hass=${this.hass}
              .data=${{value:t}}
              .schema=${[{name:"value",selector:{template:{}}}]}
              .computeLabel=${()=>this._t("editor.custom_name")}
              @value-changed=${n=>{n.stopPropagation();let r={...this._config,type:`custom:${w}`};n.detail.value.value?r.title=n.detail.value.value:delete r.title,this._dispatch(r)}}
            ></ha-form>`}`}_withOverride(e,t){let i={...this._config.entities||{}};t?i[e]=t:delete i[e];let s={...this._config,entities:i,type:`custom:${w}`};return Object.keys(i).length||delete s.entities,s}_withoutTitle(e){let t={...e};return delete t.title,t}_setOverride(e,t){this._dispatch(this._withOverride(e,t))}_toggleDisplay(e,t,i){let s={...this._config,type:`custom:${w}`};i===t?delete s[e]:s[e]=i,this._dispatch(s)}_valueChanged(e){e.stopPropagation();let t={...this._config,...e.detail.value,type:`custom:${w}`};t.device||delete t.device,this._dispatch(t)}_dispatch(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}static get styles(){return I`
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
    `}};customElements.define(w,ce);customElements.define(`${w}-editor`,le);window.customCards=window.customCards||[];window.customCards.push({type:w,name:"ABRP Vehicle Card",description:"ABRP-style vehicle card with battery state, live data and plan options.",preview:!0,documentationURL:"https://github.com/MichelFR/ha-abrp"});
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
