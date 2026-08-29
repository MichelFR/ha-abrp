var x="abrp-vehicle-card",H="abrp";var X=globalThis,Q=X.ShadowRoot&&(X.ShadyCSS===void 0||X.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,le=Symbol(),ke=new WeakMap,B=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==le)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(Q&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=ke.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ke.set(t,e))}return e}toString(){return this.cssText}},Se=o=>new B(typeof o=="string"?o:o+"",void 0,le),j=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new B(t,o,le)},Ee=(o,e)=>{if(Q)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=X.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,o.appendChild(i)}},ce=Q?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Se(t)})(o):o;var{is:at,defineProperty:lt,getOwnPropertyDescriptor:ct,getOwnPropertyNames:ht,getOwnPropertySymbols:dt,getPrototypeOf:pt}=Object,ee=globalThis,Ce=ee.trustedTypes,ut=Ce?Ce.emptyScript:"",mt=ee.reactiveElementPolyfillSupport,F=(o,e)=>o,he={toAttribute(o,e){switch(e){case Boolean:o=o?ut:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},ze=(o,e)=>!at(o,e),Pe={attribute:!0,type:String,converter:he,reflect:!1,useDefault:!1,hasChanged:ze};Symbol.metadata??=Symbol("metadata"),ee.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Pe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&lt(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:r}=ct(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){let c=s?.call(this);r?.call(this,n),this.requestUpdate(e,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Pe}static _$Ei(){if(this.hasOwnProperty(F("elementProperties")))return;let e=pt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(F("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(F("properties"))){let t=this.properties,i=[...ht(t),...dt(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(ce(s))}else e!==void 0&&t.push(ce(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ee(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:he).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:he;this._$Em=s;let c=n.fromAttribute(t,r.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(e,t,i,s=!1,r){if(e!==void 0){let n=this.constructor;if(s===!1&&(r=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??ze)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),r!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:n}=r,c=this[s];n!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,r,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[F("elementProperties")]=new Map,y[F("finalized")]=new Map,mt?.({ReactiveElement:y}),(ee.reactiveElementVersions??=[]).push("2.1.2");var fe=globalThis,Re=o=>o,te=fe.trustedTypes,Oe=te?te.createPolicy("lit-html",{createHTML:o=>o}):void 0,Ue="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,He="?"+k,_t=`<${He}>`,P=document,V=()=>P.createComment(""),W=o=>o===null||typeof o!="object"&&typeof o!="function",ve=Array.isArray,gt=o=>ve(o)||typeof o?.[Symbol.iterator]=="function",de=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Me=/-->/g,Le=/>/g,E=RegExp(`>|${de}(?:([^\\s"'>=/]+)(${de}*=${de}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Te=/'/g,Ne=/"/g,Be=/^(?:script|style|textarea|title)$/i,be=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),a=be(1),Ut=be(2),Ht=be(3),z=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),De=new WeakMap,C=P.createTreeWalker(P,129);function je(o,e){if(!ve(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Oe!==void 0?Oe.createHTML(e):e}var ft=(o,e)=>{let t=o.length-1,i=[],s,r=e===2?"<svg>":e===3?"<math>":"",n=I;for(let c=0;c<t;c++){let l=o[c],d,m,h=-1,p=0;for(;p<l.length&&(n.lastIndex=p,m=n.exec(l),m!==null);)p=n.lastIndex,n===I?m[1]==="!--"?n=Me:m[1]!==void 0?n=Le:m[2]!==void 0?(Be.test(m[2])&&(s=RegExp("</"+m[2],"g")),n=E):m[3]!==void 0&&(n=E):n===E?m[0]===">"?(n=s??I,h=-1):m[1]===void 0?h=-2:(h=n.lastIndex-m[2].length,d=m[1],n=m[3]===void 0?E:m[3]==='"'?Ne:Te):n===Ne||n===Te?n=E:n===Me||n===Le?n=I:(n=E,s=void 0);let f=n===E&&o[c+1].startsWith("/>")?" ":"";r+=n===I?l+_t:h>=0?(i.push(d),l.slice(0,h)+Ue+l.slice(h)+k+f):l+k+(h===-2?c:f)}return[je(o,r+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},q=class o{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,n=0,c=e.length-1,l=this.parts,[d,m]=ft(e,t);if(this.el=o.createElement(d,i),C.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=C.nextNode())!==null&&l.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Ue)){let p=m[n++],f=s.getAttribute(h).split(k),_=/([.?@])?(.*)/.exec(p);l.push({type:1,index:r,name:_[2],strings:f,ctor:_[1]==="."?ue:_[1]==="?"?me:_[1]==="@"?_e:O}),s.removeAttribute(h)}else h.startsWith(k)&&(l.push({type:6,index:r}),s.removeAttribute(h));if(Be.test(s.tagName)){let h=s.textContent.split(k),p=h.length-1;if(p>0){s.textContent=te?te.emptyScript:"";for(let f=0;f<p;f++)s.append(h[f],V()),C.nextNode(),l.push({type:2,index:++r});s.append(h[p],V())}}}else if(s.nodeType===8)if(s.data===He)l.push({type:2,index:r});else{let h=-1;for(;(h=s.data.indexOf(k,h+1))!==-1;)l.push({type:7,index:r}),h+=k.length-1}r++}}static createElement(e,t){let i=P.createElement("template");return i.innerHTML=e,i}};function R(o,e,t=o,i){if(e===z)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,r=W(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=R(o,s._$AS(o,e.values),s,i)),e}var pe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??P).importNode(t,!0);C.currentNode=s;let r=C.nextNode(),n=0,c=0,l=i[0];for(;l!==void 0;){if(n===l.index){let d;l.type===2?d=new K(r,r.nextSibling,this,e):l.type===1?d=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(d=new ge(r,this,e)),this._$AV.push(d),l=i[++c]}n!==l?.index&&(r=C.nextNode(),n++)}return C.currentNode=P,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},K=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=R(this,e,t),W(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==z&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):gt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&W(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=q.createElement(je(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let r=new pe(s,this),n=r.u(this.options);r.p(t),this.T(n),this._$AH=r}}_$AC(e){let t=De.get(e.strings);return t===void 0&&De.set(e.strings,t=new q(e)),t}k(e){ve(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let r of e)s===t.length?t.push(i=new o(this.O(V()),this.O(V()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=Re(e).nextSibling;Re(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},O=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=g}_$AI(e,t=this,i,s){let r=this.strings,n=!1;if(r===void 0)e=R(this,e,t,0),n=!W(e)||e!==this._$AH&&e!==z,n&&(this._$AH=e);else{let c=e,l,d;for(e=r[0],l=0;l<r.length-1;l++)d=R(this,c[i+l],t,l),d===z&&(d=this._$AH[l]),n||=!W(d)||d!==this._$AH[l],d===g?e=g:e!==g&&(e+=(d??"")+r[l+1]),this._$AH[l]=d}n&&!s&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ue=class extends O{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}},me=class extends O{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}},_e=class extends O{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=R(this,e,t,0)??g)===z)return;let i=this._$AH,s=e===g&&i!==g||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==g&&(i===g||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ge=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){R(this,e)}};var vt=fe.litHtmlPolyfillSupport;vt?.(q,K),(fe.litHtmlVersions??=[]).push("3.3.3");var Fe=(o,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let r=t?.renderBefore??null;i._$litPart$=s=new K(e.insertBefore(V(),r),r,void 0,t??{})}return s._$AI(o),s};var $e=globalThis,w=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Fe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}};w._$litElement$=!0,w.finalized=!0,$e.litElementHydrateSupport?.({LitElement:w});var bt=$e.litElementPolyfillSupport;bt?.({LitElement:w});($e.litElementVersions??=[]).push("4.2.2");var $t={sensor:["soc","range","reference_consumption","calibration_confidence","battery_capacity","odometer","speed_factor","calibrated_max_speed","max_speed","charging_power","hvac_power","power","voltage","battery_temp","cabin_temp","external_temp","soh","soe","elevation","firmware_version","last_update","data_source","vehicle_name","source_last_refresh","obd_last_refresh"],number:["arrival_soc","min_charger_stalls","extra_weight"],select:["charge_stops","drive_profile"],switch:["avoid_tolls","avoid_motorways","avoid_ferries","avoid_borders","realtime_traffic","realtime_weather","adjust_speed"],binary_sensor:["charging"],image:["car_image"],device_tracker:["location"]};function Ie(o){return Object.values(o.entities||{}).filter(e=>e.platform===H)}function xt(o){if(o.translation_key)return o.translation_key;let e=o.entity_id.split(".")[1],t=e.lastIndexOf("_");return t>=0?e.slice(t+1):e}function G(o){let e=new Map;for(let i of Ie(o))i.device_id&&(e.has(i.device_id)||e.set(i.device_id,[]),e.get(i.device_id).push(i));let t=[];for(let[i,s]of e)s.some(r=>xt(r)==="soc")&&t.push({deviceId:i,device:o.devices?.[i],ents:s});return t}function ie(o){let e=new Set(G(o).map(t=>t.deviceId));return Ie(o).filter(t=>!e.has(t.device_id))}function M(o,e){let t={};for(let i of e){let[s,r]=i.entity_id.split(".");i.translation_key&&(t[`${s}.${i.translation_key}`]=i.entity_id);for(let n of $t[s]||[])!t[`${s}.${n}`]&&r.endsWith(`_${n}`)&&(t[`${s}.${n}`]=i.entity_id)}return t}var Ve={card:{vehicle:"Fahrzeug",no_vehicle:"Kein ABRP-Fahrzeug gefunden \u2014 richte zuerst die ABRP-Integration ein.",last_seen:"Zuletzt gesehen {time}",never_seen:"Nie gesehen",live_data:"Live-Daten",options:"Optionen",charging:"L\xE4dt",connected:"Verbunden",sleeping:"Schl\xE4ft",offline:"Offline"},time:{just_now:"gerade eben",min_ago:"vor {n} Min.",h_ago:"vor {n} Std.",d_ago:"vor {n} Tagen"},confirm:{title:"Fahrprofil wechseln?",text:"Das aktive Fahrprofil wird in ABRP von \u201E{from}\u201C zu \u201E{to}\u201C ge\xE4ndert.",cancel:"Abbrechen",switch:"Wechseln"},options:{title:"Planungsoptionen",charge_stops:"Ladestopps",optimal:"Optimal",fewer:"Weniger",least:"Wenigste",arrival_soc:"Ziel-Ladestand",avoid:"Auf der Route vermeiden",tolls:"Maut",highways:"Autobahnen",ferries:"F\xE4hren und Autoz\xFCge",borders:"Grenzen",realtime:"Echtzeit",traffic:"Echtzeitverkehr",weather:"Echtzeitwetter",adjust_speed:"Geschwindigkeit an Limits anpassen",stalls:"Minimale Ladepunkte",extra_weight:"Zusatzgewicht",drive_profile:"Fahrprofil"},live:{title:"Live-Daten",soc:"Ladestand",power:"Leistung",hvac_power:"HVAC-Leistung",range:"Reichweite",voltage:"Spannung",ref_consumption:"Kalibrierter Referenzverbrauch",batt_temp:"Batterietemperatur",degradation:"Degradation",capacity:"Batteriekapazit\xE4t",ref_speed:"Referenzgeschwindigkeit",max_speed:"H\xF6chstgeschwindigkeit",soe:"Verbleibende Energie (SoE)",inside_temp:"Innentemperatur",outside_temp:"Au\xDFentemperatur",odometer:"Kilometerstand",location:"Standort",elevation:"H\xF6he",firmware:"Firmware-Version",estimate:"ABRP-Sch\xE4tzung"},editor:{vehicle:"Fahrzeug (leer = erstes ABRP-Fahrzeug)",auto_name:"ABRP-Fahrzeugname",automatic:"Automatisch",nothing_shown:"Nichts angezeigt",shown:"Angezeigt",overridden:"{n} \xFCberschrieben",mode_auto:"Automatisch",mode_entity:"Entit\xE4t",mode_custom:"Benutzerdefiniert",entity:"Entit\xE4t",value_template:"Wert oder Template",custom_name:"Eigener Name oder Template",name:"Name",not_found:"nicht gefunden",auto_value:"Automatisch: {value}"},page:{title:"Titel",illustration:"Fahrzeugbild",profile:"Fahrprofil",battery:"Batterie & Laden",status:"Statuszeile",buttons:"Schaltfl\xE4chen",livedata:"Live-Daten"},toggle:{show_image:"Fahrzeugbild anzeigen",show_profile:"Fahrprofil-Auswahl anzeigen",confirm_profile_change:"Vor Wechsel best\xE4tigen",show_charge_speed:"Ladeleistungs-Badge anzeigen",show_last_seen:"Zuletzt gesehen anzeigen",show_live_data:"Live-Daten-Link anzeigen",show_options:"Optionen-Schaltfl\xE4che anzeigen",show_live_data_button:"Live-Daten-Schaltfl\xE4che anzeigen"},short:{show_image:"Fahrzeugbild",show_profile:"Auswahl",confirm_profile_change:"Best\xE4tigung",show_charge_speed:"Ladeleistung",show_last_seen:"Zuletzt gesehen",show_live_data:"Live-Daten-Link",show_options:"Optionen",show_live_data_button:"Live-Daten-Schaltfl\xE4che"},slot:{image:{car_image:"Fahrzeugbild"},select:{drive_profile:"Fahrprofil"},binary_sensor:{charging:"L\xE4dt"},device_tracker:{location:"Standort"},sensor:{soc:"Ladestand",charging_power:"Ladeleistung",last_update:"Letzte Aktualisierung",range:"Reichweite",reference_consumption:"Referenzverbrauch",battery_capacity:"Batteriekapazit\xE4t",odometer:"Kilometerstand",speed_factor:"Geschwindigkeitsfaktor",max_speed:"H\xF6chstgeschwindigkeit",elevation:"H\xF6he",data_source:"Datenquelle",source_last_refresh:"Cloud letzte Aktualisierung",obd_last_refresh:"OBD letzte Aktualisierung"}}};var We={card:{vehicle:"Vehicle",no_vehicle:"No ABRP vehicle found \u2014 set up the ABRP integration first.",last_seen:"Last seen {time}",never_seen:"Never seen",live_data:"Live data",options:"Options",charging:"Charging",connected:"Connected",sleeping:"Sleeping",offline:"Offline"},time:{just_now:"just now",min_ago:"{n} min ago",h_ago:"{n} h ago",d_ago:"{n} d ago"},confirm:{title:"Switch drive profile?",text:'This changes the active drive profile from "{from}" to "{to}" in ABRP.',cancel:"Cancel",switch:"Switch"},options:{title:"Plan options",charge_stops:"Charge stops",optimal:"Optimal",fewer:"Fewer",least:"Fewest",arrival_soc:"Destination arrival SoC",avoid:"Avoid on route",tolls:"Tolls",highways:"Highways",ferries:"Ferries and car trains",borders:"Borders",realtime:"Realtime",traffic:"Realtime traffic",weather:"Realtime weather",adjust_speed:"Adjust speed to limits",stalls:"Minimum charger stalls",extra_weight:"Extra weight",drive_profile:"Drive profile"},live:{title:"Live data",soc:"SoC",power:"Power",hvac_power:"HVAC power",range:"Range",voltage:"Voltage",ref_consumption:"Calibrated reference consumption",batt_temp:"Battery temperature",degradation:"Degradation",capacity:"Battery capacity",ref_speed:"Reference speed",max_speed:"Maximum speed",soe:"Remaining energy (SoE)",inside_temp:"Inside temperature",outside_temp:"Outside temperature",odometer:"Odometer",location:"Location",elevation:"Elevation",firmware:"Firmware version",estimate:"ABRP Estimate"},editor:{vehicle:"Vehicle (empty = first ABRP vehicle)",auto_name:"ABRP vehicle name",automatic:"Automatic",nothing_shown:"Nothing shown",shown:"Shown",overridden:"{n} overridden",mode_auto:"Automatic",mode_entity:"Entity",mode_custom:"Custom",entity:"Entity",value_template:"Value or template",custom_name:"Custom name or template",name:"Name",not_found:"not found",auto_value:"Automatic: {value}"},page:{title:"Title",illustration:"Vehicle illustration",profile:"Drive profile",battery:"Battery & charging",status:"Status line",buttons:"Buttons",livedata:"Live data"},toggle:{show_image:"Show car image",show_profile:"Show drive profile selector",confirm_profile_change:"Confirm before changing",show_charge_speed:"Show charging speed badge",show_last_seen:"Show last seen",show_live_data:"Show Live data link",show_options:"Show Options button",show_live_data_button:"Show Live data button"},short:{show_image:"Car image",show_profile:"Selector",confirm_profile_change:"Confirm",show_charge_speed:"Speed badge",show_last_seen:"Last seen",show_live_data:"Live data link",show_options:"Options button",show_live_data_button:"Live data button"},slot:{image:{car_image:"Car image"},select:{drive_profile:"Drive profile"},binary_sensor:{charging:"Charging"},device_tracker:{location:"Location"},sensor:{soc:"State of charge",charging_power:"Charging power",last_update:"Last update",range:"Range",reference_consumption:"Reference consumption",battery_capacity:"Battery capacity",odometer:"Odometer",speed_factor:"Speed factor",max_speed:"Maximum speed",elevation:"Elevation",data_source:"Data source",source_last_refresh:"Cloud last refresh",obd_last_refresh:"OBD last refresh"}}};var xe={en:We,de:Ve};function At(o){return(o?.locale?.language||o?.language||"en").split("-")[0]}function qe(o,e){let t=e.split(".").reduce((i,s)=>i?.[s],o);return typeof t=="string"?t:void 0}function v(o,e,t={}){let i=xe[At(o)]||xe.en,s=qe(i,e)??qe(xe.en,e)??e;for(let[r,n]of Object.entries(t))s=s.replace(`{${r}}`,n);return s}function se(o,e){if(!o)return null;let t=(Date.now()-new Date(o).getTime())/1e3;return Number.isNaN(t)?null:t<90?v(e,"time.just_now"):t<5400?v(e,"time.min_ago",{n:Math.round(t/60)}):t<129600?v(e,"time.h_ago",{n:Math.round(t/3600)}):v(e,"time.d_ago",{n:Math.round(t/86400)})}function L(o){return o&&o.charAt(0).toUpperCase()+o.slice(1)}function b(o,e=0){let t=Number(o?.state);return Number.isFinite(t)?t.toFixed(e):null}function A(o){return typeof o=="string"&&/\{[{%]/.test(o)}function S(o){return typeof o=="string"&&/^[a-z_]+\.[a-zA-Z0-9_]+$/.test(o)}var Ke=!1;async function oe(){if(!Ke){Ke=!0;try{await(await window.loadCardHelpers?.())?.importMoreInfoControl?.("light")}catch{}}}var Ge=j`
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
`;function Ze(o){let e=u=>v(o.hass,u),t=o._vs("sensor.data_source")?.attributes?.providers||{},i=(u,$=e("live.estimate"))=>L(t[u])||$,s=(u,$)=>o._vs(u)?.attributes?.unit_of_measurement??$,r=u=>{let $=Number(o._vs(u)?.state);return Number.isFinite($)?$:null},n=u=>Math.abs(u)<10?u.toFixed(1):u.toFixed(0),c=r("sensor.power"),l=o._vs("binary_sensor.charging")?.state==="on",d=c==null?null:l?-c:c,m=t.power==="derived"&&t.current!=null?t.current:t.power,h=r("sensor.soh"),p=h==null?null:100-h,f=r("sensor.calibration_confidence")==null?null:b(o._vs("sensor.reference_consumption")),_=b(o._vs("sensor.calibrated_max_speed")),N=_??b(o._vs("sensor.max_speed")),tt=_!=null?i("calib_max_speed"):i("max_speed"),Y=o._vs("device_tracker.location"),it=Y?.attributes?.address||(Y?.state&&Y.state!=="unknown"?Y.state:null),ye=r("sensor.speed_factor"),J=o._vs("sensor.firmware_version")?.state,st=[[e("live.soc"),b(o._vs("sensor.soc")),"%",i("soc"),"sensor.soc"],[e("live.power"),d==null?null:n(d),"kW",L(m)||e("live.estimate"),"sensor.power"],[e("live.hvac_power"),r("sensor.hvac_power")==null?null:n(r("sensor.hvac_power")),"kW",i("hvac_power"),"sensor.hvac_power"],[e("live.range"),b(o._vs("sensor.range")),s("sensor.range","km"),i("est_battery_range"),"sensor.range"],[e("live.voltage"),b(o._vs("sensor.voltage")),"V",i("voltage"),"sensor.voltage"],[e("live.ref_consumption"),f,s("sensor.reference_consumption","Wh/km"),i("calib_ref_cons"),"sensor.reference_consumption"],[e("live.batt_temp"),b(o._vs("sensor.battery_temp")),s("sensor.battery_temp","\xB0C"),i("batt_temp"),"sensor.battery_temp"],[e("live.degradation"),p==null?null:n(p),"%",i("soh"),"sensor.soh"],[e("live.capacity"),b(o._vs("sensor.battery_capacity")),"kWh",i("battery_capacity",i("capacity")),"sensor.battery_capacity"],[e("live.ref_speed"),ye==null?null:Math.round(ye*100),"%",i("speed_factor"),"sensor.speed_factor"],[e("live.max_speed"),N,s("sensor.calibrated_max_speed","km/h"),tt,"sensor.calibrated_max_speed"],[e("live.soe"),b(o._vs("sensor.soe"),1),"kWh",i("soe"),"sensor.soe"],[e("live.inside_temp"),b(o._vs("sensor.cabin_temp")),s("sensor.cabin_temp","\xB0C"),i("cabin_temp"),"sensor.cabin_temp"],[e("live.outside_temp"),b(o._vs("sensor.external_temp")),s("sensor.external_temp","\xB0C"),i("ext_temp"),"sensor.external_temp"],[e("live.odometer"),b(o._vs("sensor.odometer")),s("sensor.odometer","km"),i("odometer"),"sensor.odometer"],[e("live.location"),it,"",i("lat",""),"device_tracker.location"],[e("live.elevation"),b(o._vs("sensor.elevation")),s("sensor.elevation","m"),i("elevation",""),"sensor.elevation"],[e("live.firmware"),J&&J!=="unknown"&&J!=="unavailable"?J:null,"","","sensor.firmware_version"]].filter(([,u])=>u!=null),ot=L(o._vs("sensor.data_source")?.state),rt=u=>u&&u!=="unknown"&&u!=="unavailable",ae=new Map;for(let[u,$,D]of[[ot,o._vs("sensor.source_last_refresh")?.state,"sensor.source_last_refresh"],["Obdble",o._vs("sensor.obd_last_refresh")?.state,"sensor.obd_last_refresh"]]){if(!u||!rt($))continue;let U=ae.get(u.toLowerCase());(!U||new Date($)>new Date(U[1]))&&ae.set(u.toLowerCase(),[u,$,D])}let Ae=[...ae.values()];return a`<div class="grid">
      ${st.map(([u,$,D,U,nt])=>a`<div
          class="tile clickable"
          @click=${()=>o._moreInfo(nt)}
        >
          <div class="tile-title">${u}</div>
          <div class="tile-value">
            ${$}<span class="tile-unit"> ${D}</span>
          </div>
          ${U?a`<div class="tile-prov">${U}</div>`:""}
        </div>`)}
    </div>
    ${Ae.length?a`<div class="sources">
          ${Ae.map(([u,$,D])=>a`<span
              class="seen clickable"
              @click=${()=>o._moreInfo(D)}
            >
              <span class="dot"></span>${u}
              <span class="src-time">${se($,o.hass)}</span>
            </span>`)}
        </div>`:""}`}var Ye={optimal:"options.optimal",fewer:"options.fewer",least:"options.least"},kt=[["switch.avoid_tolls","mdi:cash-multiple","options.tolls"],["switch.avoid_motorways","mdi:highway","options.highways"],["switch.avoid_ferries","mdi:ferry","options.ferries"],["switch.avoid_borders","mdi:boom-gate","options.borders"]],St=[["switch.realtime_traffic","mdi:traffic-light","options.traffic"],["switch.realtime_weather","mdi:weather-partly-cloudy","options.weather"],["switch.adjust_speed","mdi:speedometer","options.adjust_speed"]],Z=(o,e)=>a`<div class="section"><ha-icon icon=${o}></ha-icon>${e}</div>`;function Je(o){let e=o._as("select.charge_stops"),t=o._vs("select.drive_profile"),i=s=>v(o.hass,s);return a`
    ${e?Et(o,e):""}
    ${we(o,i("options.arrival_soc"),"mdi:battery-low",o._as("number.arrival_soc"),"%")}
    ${Z("mdi:cancel",i("options.avoid"))}
    <div class="chips">
      ${kt.map(([s,r,n])=>Ct(o,s,r,i(n)))}
    </div>
    ${Z("mdi:update",i("options.realtime"))}
    ${St.map(([s,r,n])=>Pt(o,s,r,i(n)))}
    ${we(o,i("options.stalls"),"mdi:counter",o._as("number.min_charger_stalls"),"")}
    ${we(o,i("options.extra_weight"),"mdi:weight-kilogram",o._as("number.extra_weight")," kg")}
    ${zt(o,t)}
  `}function Et(o,e){return a`${Z("mdi:ev-station",v(o.hass,"options.charge_stops"))}
    <div class="segments">
      ${(e.attributes.options||[]).map(t=>a`<button
          class="segment ${e.state===t?"on":""}"
          @click=${()=>o._call("select","select_option",e,{option:t})}
        >
          ${Ye[t]?v(o.hass,Ye[t]):L(t)}
        </button>`)}
    </div>`}function we(o,e,t,i,s){if(!i)return"";let r=i.attributes,n=Number(i.state);return a`${Z(t,e)}
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
        @change=${c=>{o._call("number","set_value",i,{value:Number(c.target.value)}),c.target.closest(".slider-row").querySelector(".slider-value").textContent=`${c.target.value}${s}`}}
      ></ha-slider>
    </div>`}function Ct(o,e,t,i){let s=o._as(e);if(!s)return"";let r=s.state==="on";return a`<button
    class="chip ${r?"on":""}"
    @click=${()=>o._call("switch","toggle",s)}
  >
    <ha-icon icon="${t}"></ha-icon>${i}
  </button>`}function Pt(o,e,t,i){let s=o._as(e);return s?a`<div class="switch-row">
    <span class="switch-label"><ha-icon icon=${t}></ha-icon>${i}</span>
    <ha-switch
      .checked=${s.state==="on"}
      @change=${()=>o._call("switch","toggle",s)}
    ></ha-switch>
  </div>`:""}function zt(o,e){return e?.attributes?.options?.length?a`${Z("mdi:car-cog",v(o.hass,"options.drive_profile"))}
    <ha-select
      naturalMenuWidth
      fixedMenuPosition
      .value=${e.state}
      @selected=${t=>{let i=t.target.value;i&&i!==e.state&&o._requestProfileChange(e,i)}}
      @closed=${t=>t.stopPropagation()}
    >
      ${e.attributes.options.map(t=>a`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
    </ha-select>`:""}var re=class extends w{static styles=Ge;static get properties(){return{hass:{},_config:{},_dialog:{state:!0},_profileMenu:{state:!0},_confirmProfile:{state:!0}}}constructor(){super(),this._dialog=null,this._profileMenu=!1,this._confirmProfile=null}connectedCallback(){super.connectedCallback(),oe()}setConfig(e){this._config=e||{}}static getConfigElement(){return document.createElement(`${x}-editor`)}static getStubConfig(){return{}}getCardSize(){return 5}get _vehicle(){let e=G(this.hass);return e.length?this._config.device&&e.find(t=>t.deviceId===this._config.device)||e[0]:null}_resolve(e,t){let i=this._config.entities?.[e];if(i){if(A(i)){let r=this._templateResults?.[i];return{state:r===void 0?"unknown":String(r),attributes:{}}}return S(i)?this.hass.states[i]:{state:i,attributes:{}}}let s=t?.[e];return s?this.hass.states[s]:void 0}_vs(e){return this._resolve(e,this._vmap)}_as(e){return this._resolve(e,this._amap)}updated(e){super.updated(e),(e.has("hass")||e.has("_config"))&&this._syncTemplates()}disconnectedCallback(){super.disconnectedCallback();for(let e of Object.values(this._tmplUnsub||{}))typeof e=="function"&&e();this._tmplUnsub={}}async _syncTemplates(){if(!this.hass?.connection)return;this._tmplUnsub=this._tmplUnsub||{},this._templateResults=this._templateResults||{};let e=[...Object.values(this._config.entities||{}),this._config.title].filter(t=>A(t));for(let t of e)if(!this._tmplUnsub[t]){this._tmplUnsub[t]=!0;try{this._tmplUnsub[t]=await this.hass.connection.subscribeMessage(i=>{this._templateResults[t]=i.result,this.requestUpdate()},{type:"render_template",template:t})}catch{this._templateResults[t]="error",this.requestUpdate()}}for(let t of Object.keys(this._tmplUnsub))if(!e.includes(t)){let i=this._tmplUnsub[t];typeof i=="function"&&i(),delete this._tmplUnsub[t],delete this._templateResults[t]}}_moreInfo(e){let t=this._config.entities?.[e],i=t&&S(t)&&!A(t)?t:this._vmap?.[e]||this._amap?.[e];!i||t&&!S(t)||this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:i},bubbles:!0,composed:!0}))}_t(e,t){return v(this.hass,e,t)}_call(e,t,i,s={}){this.hass.callService(e,t,{entity_id:i.entity_id,...s})}render(){if(!this.hass)return a``;let e=this._vehicle;return e?(this._vmap=M(this.hass,e.ents),this._amap=M(this.hass,ie(this.hass)),a`<ha-card>
      ${this._renderMain(e)}
      ${this._dialog==="options"?this._dialogFrame(this._t("options.title"),Je(this)):""}
      ${this._dialog==="live"?this._dialogFrame(this._t("live.title"),Ze(this)):""}
      ${this._confirmProfile?this._renderConfirmProfile():""}
    </ha-card>`):a`<ha-card>
        <div class="empty">${this._t("card.no_vehicle")}</div>
      </ha-card>`}_status(){let e=Date.now()/1e3,t=p=>{if(!p||p==="unknown"||p==="unavailable")return null;let f=new Date(p).getTime();return Number.isNaN(f)?null:f/1e3},i=this._vs("sensor.data_source"),s=t(i?.attributes?.soc_last_seen),r=Number(this._vs("sensor.soc")?.state),n=Number.isFinite(r)&&s!=null&&e-s<300,c=this._vs("binary_sensor.charging")?.state==="on",l=Math.abs(Number(this._vs("sensor.charging_power")?.state)),d=this._vs("binary_sensor.asleep")?.state==="on",m=i?.attributes?.last_seen??this._vs("sensor.last_update")?.state,h=t(m);if(n&&c&&Number.isFinite(l)&&l>0)return{color:"green",pulse:!0,text:this._t("card.charging")};if(n)return{color:"green",pulse:!0,text:this._t("card.connected")};if(h!=null&&e-h<=3*3600){let p=se(m,this.hass);return{color:"gray",pulse:!1,text:p?this._t("card.last_seen",{time:p}):this._t("card.never_seen")}}return d?{color:"gray",pulse:!1,text:this._t("card.sleeping")}:{color:"gray",pulse:!1,text:this._t("card.offline")}}_renderMain(e){let t=this._vs("sensor.vehicle_name")?.state,i=this._config.title,r=(i&&A(i)?String(this._templateResults?.[i]??""):i)||(t&&t!=="unknown"&&t!=="unavailable"?t:null)||e.device?.name_by_user||e.device?.name||this._t("card.vehicle"),n=this._vs("sensor.soc"),c=b(n),l=this._vs("image.car_image"),d=l?.attributes?.entity_picture||(typeof l?.state=="string"&&(l.state.startsWith("http")||l.state.startsWith("/"))?l.state:null),m=this._status(),h=this._vs("binary_sensor.charging")?.state==="on",p=Number(this._vs("sensor.charging_power")?.state),f=h&&Number.isFinite(p)&&p>0?`${p<10?p.toFixed(1):Math.round(p)} kW`:null,_=N=>this._config[N]!==!1;return a`<div class="main">
      <div class="head">
        <div class="head-left">
          <div class="name">${r}</div>
          ${_("show_profile")?this._renderProfile():""}
        </div>
        ${_("show_image")&&d?a`<img
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
        <span class="soc">${c??"\u2013"}%</span>
        ${_("show_charge_speed")&&f?a`<span
              class="charge-speed clickable"
              @click=${N=>{N.stopPropagation(),this._moreInfo("sensor.charging_power")}}
            >
              <ha-icon icon="mdi:flash"></ha-icon>${f}
            </span>`:_("show_charge_speed")&&h?a`<span class="charge-speed">
                <ha-icon icon="mdi:flash"></ha-icon>${this._t("card.charging")}
              </span>`:""}
      </div>
      <div class="bar clickable" @click=${()=>this._moreInfo("sensor.soc")}>
        <div class="fill ${h?"charging":""}" style="width:${c??0}%"></div>
      </div>
      ${_("show_last_seen")||_("show_live_data")?a`<div class="meta">
            ${_("show_last_seen")?a`<span
                  class="seen clickable"
                  @click=${()=>this._moreInfo("sensor.last_update")}
                >
                  <span
                    class="dot ${m.color}${m.pulse?" pulse":""}"
                  ></span>
                  ${m.text}
                </span>`:a`<span></span>`}
            ${_("show_live_data")?a`<a class="link" @click=${()=>this._dialog="live"}
                  >${this._t("card.live_data")}</a
                >`:""}
          </div>`:""}
      ${_("show_options")||this._config.show_live_data_button===!0?a`<div class="buttons">
            ${_("show_options")?a`<button
                  class="btn"
                  @click=${()=>this._dialog="options"}
                >
                  <ha-icon icon="mdi:tune-variant"></ha-icon>${this._t("card.options")}
                </button>`:""}
            ${this._config.show_live_data_button===!0?a`<button class="btn" @click=${()=>this._dialog="live"}>
                  <ha-icon icon="mdi:chart-box-outline"></ha-icon>${this._t("card.live_data")}
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
    </ha-dialog>`}};var Rt=[{name:"device",selector:{device:{integration:H,entity:[{integration:H,domain:"device_tracker"}]}}}],Xe={illustration:[["show_image",!0,"mdi:image-outline"]],profile:[["show_profile",!0,"mdi:car-cog"],["confirm_profile_change",!0,"mdi:shield-check-outline"]],battery:[["show_charge_speed",!0,"mdi:flash"]],status:[["show_last_seen",!0,"mdi:clock-outline"],["show_live_data",!0,"mdi:link-variant"]],buttons:[["show_options",!0,"mdi:tune-variant"],["show_live_data_button",!1,"mdi:chart-box-outline"]]},Qe={illustration:[["image.car_image","mdi:image-outline"]],profile:[["select.drive_profile","mdi:car-cog"]],battery:[["sensor.soc","mdi:battery-high"],["binary_sensor.charging","mdi:battery-charging"],["sensor.charging_power","mdi:flash"]],status:[["sensor.last_update","mdi:clock-outline"]],livedata:[["sensor.soc","mdi:battery-high"],["sensor.range","mdi:map-marker-distance"],["sensor.reference_consumption","mdi:lightning-bolt-outline"],["sensor.battery_capacity","mdi:battery"],["sensor.odometer","mdi:counter"],["device_tracker.location","mdi:map-marker"],["sensor.speed_factor","mdi:speedometer"],["sensor.max_speed","mdi:speedometer-medium"],["sensor.elevation","mdi:image-filter-hdr"],["sensor.data_source","mdi:database-outline"],["sensor.source_last_refresh","mdi:cloud-outline"],["sensor.obd_last_refresh","mdi:car-connected"]]},et=[{id:"title",icon:"mdi:format-title"},{id:"illustration",icon:"mdi:image-outline"},{id:"profile",icon:"mdi:car-cog"},{id:"battery",icon:"mdi:battery-charging"},{id:"status",icon:"mdi:clock-outline"},{id:"buttons",icon:"mdi:gesture-tap-button"},{id:"livedata",icon:"mdi:chart-box-outline"}],T="sensor.vehicle_name",ne=class extends w{static get properties(){return{hass:{},_config:{},_page:{state:!0},_modes:{state:!0}}}constructor(){super(),this._page=null,this._modes={}}connectedCallback(){super.connectedCallback(),oe()}setConfig(e){this._config=e||{}}_t(e,t){return v(this.hass,e,t)}render(){if(!this.hass)return a``;let e=et.find(t=>t.id===this._page);return e?this._renderSubpage(e):this._renderRoot()}_defaults(){let e=G(this.hass),t=this._config.device&&e.find(i=>i.deviceId===this._config.device)||e[0];return{...t?M(this.hass,t.ents):{},...M(this.hass,ie(this.hass))}}_renderRoot(){return a`<ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Rt}
        .computeLabel=${()=>this._t("editor.vehicle")}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="nav">
        ${et.map(e=>a`<button
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
      </div>`}_summary(e){if(e==="title")return this._config.title||(this._config.entities?.[T]??this._t("editor.auto_name"));let t=(Qe[e]||[]).filter(([n])=>this._config.entities?.[n]).length,i=t?` \xB7 ${this._t("editor.overridden",{n:t})}`:"",s=Xe[e]||[];if(!s.length)return t?this._t("editor.overridden",{n:t}):this._t("editor.automatic");let r=s.filter(([n,c])=>this._config[n]??c);return r.length?r.length===s.length&&s.length===1?`${this._t("editor.shown")}${i}`:r.map(([n])=>this._t(`short.${n}`)).join(", ")+i:`${this._t("editor.nothing_shown")}${i}`}_renderSubpage(e){return a`<div class="subpage-head">
        <button class="back" @click=${()=>this._page=null}>
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </button>
        <span class="subpage-title">${this._t(`page.${e.id}`)}</span>
      </div>
      ${(Xe[e.id]||[]).map(([t,i,s])=>this._renderToggle(t,i,s))}
      ${e.id==="title"?this._renderTitleSlot():(Qe[e.id]||[]).map(([t,i])=>this._renderSlot(t,i))}`}_renderToggle(e,t,i){return a`<div class="row">
      <ha-icon icon=${i}></ha-icon>
      <span class="row-label">${this._t(`toggle.${e}`)}</span>
      <ha-switch
        .checked=${this._config[e]??t}
        @change=${s=>this._toggleDisplay(e,t,s.target.checked)}
      ></ha-switch>
    </div>`}_slotMode(e,t){return this._modes[e]?this._modes[e]:t?S(t)&&!A(t)?"entity":"custom":"auto"}_renderModeChips(e,t,i){return a`<div class="modes">
      ${["auto","entity","custom"].map(s=>a`<button
          class="mode ${t===s?"on":""}"
          @click=${()=>i(s)}
        >
          ${this._t(`editor.mode_${s}`)}
        </button>`)}
    </div>`}_renderSlot(e,t){let i=this._config.entities?.[e]||"",s=this._slotMode(e,i),r=this._defaults()[e];return a`<div class="section">
        <ha-icon icon=${t}></ha-icon>${this._t(`slot.${e}`)}
      </div>
      ${this._renderModeChips(e,s,n=>{this._modes={...this._modes,[e]:n},n==="auto"&&this._setOverride(e,"")})}
      ${s==="auto"?a`<div class="hint">
            ${this._t("editor.auto_value",{value:r||this._t("editor.not_found")})}
          </div>`:s==="entity"?a`<ha-form
              .hass=${this.hass}
              .data=${{value:S(i)&&!A(i)?i:""}}
              .schema=${[{name:"value",selector:{entity:{}}}]}
              .computeLabel=${()=>this._t("editor.entity")}
              @value-changed=${n=>{n.stopPropagation(),this._setOverride(e,n.detail.value.value||"")}}
            ></ha-form>`:a`<ha-form
              .hass=${this.hass}
              .data=${{value:S(i)&&!A(i)?"":i}}
              .schema=${[{name:"value",selector:{template:{}}}]}
              .computeLabel=${()=>this._t("editor.value_template")}
              @value-changed=${n=>{n.stopPropagation(),this._setOverride(e,n.detail.value.value||"")}}
            ></ha-form>`}`}_renderTitleSlot(){let e=this._config.entities?.[T]||"",t=this._config.title||"",i=this._modes.__title||(t?"custom":e?"entity":"auto"),s=this._defaults()[T];return a`<div class="section">
        <ha-icon icon="mdi:format-title"></ha-icon>${this._t("editor.name")}
      </div>
      ${this._renderModeChips("__title",i,r=>{this._modes={...this._modes,__title:r},r==="auto"?this._dispatch(this._withoutTitle(this._withOverride(T,""))):r==="entity"?this._dispatch(this._withoutTitle(this._config)):r==="custom"&&this._dispatch(this._withOverride(T,""))})}
      ${i==="auto"?a`<div class="hint">
            ${this._t("editor.auto_value",{value:s||this._t("editor.auto_name")})}
          </div>`:i==="entity"?a`<ha-form
              .hass=${this.hass}
              .data=${{value:e}}
              .schema=${[{name:"value",selector:{entity:{}}}]}
              .computeLabel=${()=>this._t("editor.entity")}
              @value-changed=${r=>{r.stopPropagation(),this._setOverride(T,r.detail.value.value||"")}}
            ></ha-form>`:a`<ha-form
              .hass=${this.hass}
              .data=${{value:t}}
              .schema=${[{name:"value",selector:{template:{}}}]}
              .computeLabel=${()=>this._t("editor.custom_name")}
              @value-changed=${r=>{r.stopPropagation();let n={...this._config,type:`custom:${x}`};r.detail.value.value?n.title=r.detail.value.value:delete n.title,this._dispatch(n)}}
            ></ha-form>`}`}_withOverride(e,t){let i={...this._config.entities||{}};t?i[e]=t:delete i[e];let s={...this._config,entities:i,type:`custom:${x}`};return Object.keys(i).length||delete s.entities,s}_withoutTitle(e){let t={...e};return delete t.title,t}_setOverride(e,t){this._dispatch(this._withOverride(e,t))}_toggleDisplay(e,t,i){let s={...this._config,type:`custom:${x}`};i===t?delete s[e]:s[e]=i,this._dispatch(s)}_valueChanged(e){e.stopPropagation();let t={...this._config,...e.detail.value,type:`custom:${x}`};t.device||delete t.device,this._dispatch(t)}_dispatch(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}static get styles(){return j`
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
    `}};customElements.define(x,re);customElements.define(`${x}-editor`,ne);window.customCards=window.customCards||[];window.customCards.push({type:x,name:"ABRP Vehicle Card",description:"ABRP-style vehicle card with battery state, live data and plan options.",preview:!0,documentationURL:"https://github.com/MichelFR/ha-abrp"});
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
