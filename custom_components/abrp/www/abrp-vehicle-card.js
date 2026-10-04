var w="abrp-vehicle-card",j="abrp";var oe=globalThis,ne=oe.ShadowRoot&&(oe.ShadyCSS===void 0||oe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,me=Symbol(),Re=new WeakMap,I=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==me)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(ne&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=Re.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Re.set(t,e))}return e}toString(){return this.cssText}},De=o=>new I(typeof o=="string"?o:o+"",void 0,me),V=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((i,s,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[n+1],o[0]);return new I(t,o,me)},Ue=(o,e)=>{if(ne)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=oe.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,o.appendChild(i)}},_e=ne?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return De(t)})(o):o;var{is:At,defineProperty:St,getOwnPropertyDescriptor:Et,getOwnPropertyNames:Ct,getOwnPropertySymbols:Pt,getPrototypeOf:zt}=Object,re=globalThis,Fe=re.trustedTypes,Nt=Fe?Fe.emptyScript:"",Mt=re.reactiveElementPolyfillSupport,W=(o,e)=>o,ge={toAttribute(o,e){switch(e){case Boolean:o=o?Nt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},He=(o,e)=>!At(o,e),Be={attribute:!0,type:String,converter:ge,reflect:!1,useDefault:!1,hasChanged:He};Symbol.metadata??=Symbol("metadata"),re.litPropertyMetadata??=new WeakMap;var k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Be){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&St(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:n}=Et(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:s,set(r){let h=s?.call(this);n?.call(this,r),this.requestUpdate(e,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Be}static _$Ei(){if(this.hasOwnProperty(W("elementProperties")))return;let e=zt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(W("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(W("properties"))){let t=this.properties,i=[...Ct(t),...Pt(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(_e(s))}else e!==void 0&&t.push(_e(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ue(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:ge).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let n=i.getPropertyOptions(s),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:ge;this._$Em=s;let h=r.fromAttribute(t,n.type);this[s]=h??this._$Ej?.get(s)??h,this._$Em=null}}requestUpdate(e,t,i,s=!1,n){if(e!==void 0){let r=this.constructor;if(s===!1&&(n=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??He)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,n]of i){let{wrapped:r}=n,h=this[s];r!==!0||this._$AL.has(s)||h===void 0||this.C(s,void 0,n,h)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[W("elementProperties")]=new Map,k[W("finalized")]=new Map,Mt?.({ReactiveElement:k}),(re.reactiveElementVersions??=[]).push("2.1.2");var ye=globalThis,je=o=>o,ae=ye.trustedTypes,Ie=ae?ae.createPolicy("lit-html",{createHTML:o=>o}):void 0,Ge="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,Ye="?"+S,Ot=`<${Ye}>`,z=document,q=()=>z.createComment(""),K=o=>o===null||typeof o!="object"&&typeof o!="function",ke=Array.isArray,Tt=o=>ke(o)||typeof o?.[Symbol.iterator]=="function",fe=`[ 	
\f\r]`,Z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ve=/-->/g,We=/>/g,C=RegExp(`>|${fe}(?:([^\\s"'>=/]+)(${fe}*=${fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ze=/'/g,qe=/"/g,Je=/^(?:script|style|textarea|title)$/i,Ae=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),a=Ae(1),Xe=Ae(2),hi=Ae(3),N=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),Ke=new WeakMap,P=z.createTreeWalker(z,129);function Qe(o,e){if(!ke(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ie!==void 0?Ie.createHTML(e):e}var Lt=(o,e)=>{let t=o.length-1,i=[],s,n=e===2?"<svg>":e===3?"<math>":"",r=Z;for(let h=0;h<t;h++){let l=o[h],u,d,p=-1,c=0;for(;c<l.length&&(r.lastIndex=c,d=r.exec(l),d!==null);)c=r.lastIndex,r===Z?d[1]==="!--"?r=Ve:d[1]!==void 0?r=We:d[2]!==void 0?(Je.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=C):d[3]!==void 0&&(r=C):r===C?d[0]===">"?(r=s??Z,p=-1):d[1]===void 0?p=-2:(p=r.lastIndex-d[2].length,u=d[1],r=d[3]===void 0?C:d[3]==='"'?qe:Ze):r===qe||r===Ze?r=C:r===Ve||r===We?r=Z:(r=C,s=void 0);let _=r===C&&o[h+1].startsWith("/>")?" ":"";n+=r===Z?l+Ot:p>=0?(i.push(u),l.slice(0,p)+Ge+l.slice(p)+S+_):l+S+(p===-2?h:_)}return[Qe(o,n+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},G=class o{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,r=0,h=e.length-1,l=this.parts,[u,d]=Lt(e,t);if(this.el=o.createElement(u,i),P.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=P.nextNode())!==null&&l.length<h;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(Ge)){let c=d[r++],_=s.getAttribute(p).split(S),b=/([.?@])?(.*)/.exec(c);l.push({type:1,index:n,name:b[2],strings:_,ctor:b[1]==="."?be:b[1]==="?"?xe:b[1]==="@"?$e:O}),s.removeAttribute(p)}else p.startsWith(S)&&(l.push({type:6,index:n}),s.removeAttribute(p));if(Je.test(s.tagName)){let p=s.textContent.split(S),c=p.length-1;if(c>0){s.textContent=ae?ae.emptyScript:"";for(let _=0;_<c;_++)s.append(p[_],q()),P.nextNode(),l.push({type:2,index:++n});s.append(p[c],q())}}}else if(s.nodeType===8)if(s.data===Ye)l.push({type:2,index:n});else{let p=-1;for(;(p=s.data.indexOf(S,p+1))!==-1;)l.push({type:7,index:n}),p+=S.length-1}n++}}static createElement(e,t){let i=z.createElement("template");return i.innerHTML=e,i}};function M(o,e,t=o,i){if(e===N)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,n=K(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(o),s._$AT(o,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=M(o,s._$AS(o,e.values),s,i)),e}var ve=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??z).importNode(t,!0);P.currentNode=s;let n=P.nextNode(),r=0,h=0,l=i[0];for(;l!==void 0;){if(r===l.index){let u;l.type===2?u=new Y(n,n.nextSibling,this,e):l.type===1?u=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(u=new we(n,this,e)),this._$AV.push(u),l=i[++h]}r!==l?.index&&(n=P.nextNode(),r++)}return P.currentNode=z,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},Y=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=M(this,e,t),K(e)?e===f||e==null||e===""?(this._$AH!==f&&this._$AR(),this._$AH=f):e!==this._$AH&&e!==N&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Tt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==f&&K(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=G.createElement(Qe(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let n=new ve(s,this),r=n.u(this.options);n.p(t),this.T(r),this._$AH=n}}_$AC(e){let t=Ke.get(e.strings);return t===void 0&&Ke.set(e.strings,t=new G(e)),t}k(e){ke(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let n of e)s===t.length?t.push(i=new o(this.O(q()),this.O(q()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=je(e).nextSibling;je(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},O=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,n){this.type=1,this._$AH=f,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=f}_$AI(e,t=this,i,s){let n=this.strings,r=!1;if(n===void 0)e=M(this,e,t,0),r=!K(e)||e!==this._$AH&&e!==N,r&&(this._$AH=e);else{let h=e,l,u;for(e=n[0],l=0;l<n.length-1;l++)u=M(this,h[i+l],t,l),u===N&&(u=this._$AH[l]),r||=!K(u)||u!==this._$AH[l],u===f?e=f:e!==f&&(e+=(u??"")+n[l+1]),this._$AH[l]=u}r&&!s&&this.j(e)}j(e){e===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},be=class extends O{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===f?void 0:e}},xe=class extends O{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==f)}},$e=class extends O{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){if((e=M(this,e,t,0)??f)===N)return;let i=this._$AH,s=e===f&&i!==f||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==f&&(i===f||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},we=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){M(this,e)}};var Rt=ye.litHtmlPolyfillSupport;Rt?.(G,Y),(ye.litHtmlVersions??=[]).push("3.3.3");var et=(o,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let n=t?.renderBefore??null;i._$litPart$=s=new Y(e.insertBefore(q(),n),n,void 0,t??{})}return s._$AI(o),s};var Se=globalThis,y=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=et(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return N}};y._$litElement$=!0,y.finalized=!0,Se.litElementHydrateSupport?.({LitElement:y});var Dt=Se.litElementPolyfillSupport;Dt?.({LitElement:y});(Se.litElementVersions??=[]).push("4.2.2");var Ut={sensor:["soc","range","reference_consumption","calibration_confidence","battery_capacity","odometer","speed_factor","calibrated_max_speed","max_speed","charging_power","hvac_power","power","voltage","battery_temp","cabin_temp","external_temp","soh","soe","elevation","firmware_version","arrival_time","road","speed_limit","gps_speed","last_update","data_source","vehicle_name","brand","source_last_refresh","obd_last_refresh"],number:["arrival_soc","min_charger_stalls","extra_weight"],select:["charge_stops","drive_profile"],switch:["avoid_tolls","avoid_motorways","avoid_ferries","avoid_borders","realtime_traffic","realtime_weather","adjust_speed"],binary_sensor:["charging","navigating"],image:["car_image"],device_tracker:["destination","location"]};function tt(o){return Object.values(o.entities||{}).filter(e=>e.platform===j)}function Ft(o){if(o.translation_key)return o.translation_key;let e=o.entity_id.split(".")[1],t=e.lastIndexOf("_");return t>=0?e.slice(t+1):e}function J(o){let e=new Map;for(let i of tt(o))i.device_id&&(e.has(i.device_id)||e.set(i.device_id,[]),e.get(i.device_id).push(i));let t=[];for(let[i,s]of e)s.some(n=>Ft(n)==="soc")&&t.push({deviceId:i,device:o.devices?.[i],ents:s});return t}function le(o){let e=new Set(J(o).map(t=>t.deviceId));return tt(o).filter(t=>!e.has(t.device_id))}function T(o,e){let t={};for(let i of e){let[s,n]=i.entity_id.split(".");i.translation_key&&(t[`${s}.${i.translation_key}`]=i.entity_id);for(let r of Ut[s]||[])!t[`${s}.${r}`]&&n.endsWith(`_${r}`)&&(t[`${s}.${r}`]=i.entity_id)}return t}var it={card:{vehicle:"Fahrzeug",no_vehicle:"Kein ABRP-Fahrzeug gefunden \u2014 richte zuerst die ABRP-Integration ein.",last_seen:"Zuletzt gesehen {time}",never_seen:"Nie gesehen",live_data:"Live-Daten",options:"Optionen",charging:"L\xE4dt",connected:"Verbunden",sleeping:"Schl\xE4ft",offline:"Offline",eta:"Ankunft {time}",destination:"Ziel"},time:{just_now:"gerade eben",min_ago:"vor {n} Min.",h_ago:"vor {n} Std.",d_ago:"vor {n} Tagen",lt_min:"< 1 Min.",min:"{n} Min.",h:"{n} Std.",day:"{n} Tag",days:"{n} Tage",week:"{n} Woche",weeks:"{n} Wochen",month:"{n} Monat",months:"{n} Monate",year:"{n} Jahr",years:"{n} Jahre"},confirm:{title:"Fahrprofil wechseln?",text:"Das aktive Fahrprofil wird in ABRP von \u201E{from}\u201C zu \u201E{to}\u201C ge\xE4ndert.",cancel:"Abbrechen",switch:"Wechseln"},options:{title:"Planungsoptionen",charge_stops:"Ladestopps",optimal:"Optimal",fewer:"Weniger",least:"Wenigste",arrival_soc:"Ziel-Ladestand",avoid:"Auf der Route vermeiden",tolls:"Maut",highways:"Autobahnen",ferries:"F\xE4hren und Autoz\xFCge",borders:"Grenzen",realtime:"Echtzeit",traffic:"Echtzeitverkehr",weather:"Echtzeitwetter",adjust_speed:"Geschwindigkeit an Limits anpassen",stalls:"Minimale Ladepunkte",extra_weight:"Zusatzgewicht",drive_profile:"Fahrprofil"},live:{title:"Live-Daten",soc:"Ladestand",power:"Leistung",hvac_power:"HVAC-Leistung",range:"Reichweite",voltage:"Spannung",ref_consumption:"Kalibrierter Referenzverbrauch",batt_temp:"Batterietemperatur",degradation:"Degradation",capacity:"Batteriekapazit\xE4t",ref_speed:"Referenzgeschwindigkeit",max_speed:"H\xF6chstgeschwindigkeit",soe:"Verbleibende Energie (SoE)",inside_temp:"Innentemperatur",outside_temp:"Au\xDFentemperatur",odometer:"Kilometerstand",location:"Standort",elevation:"H\xF6he",firmware:"Firmware-Version",estimate:"ABRP-Sch\xE4tzung"},editor:{vehicle:"Fahrzeug (leer = erstes ABRP-Fahrzeug)",auto_name:"ABRP-Fahrzeugname",automatic:"Automatisch",nothing_shown:"Nichts angezeigt",shown:"Angezeigt",overridden:"{n} \xFCberschrieben",mode_auto:"Automatisch",mode_entity:"Entit\xE4t",mode_custom:"Benutzerdefiniert",entity:"Entit\xE4t",value_template:"Wert oder Template",custom_name:"Eigener Name oder Template",name:"Name",not_found:"nicht gefunden",auto_value:"Automatisch: {value}"},page:{title:"Titel",illustration:"Fahrzeugbild",profile:"Fahrprofil",battery:"Batterie & Laden",status:"Statuszeile",buttons:"Schaltfl\xE4chen",livedata:"Live-Daten"},toggle:{show_image:"Fahrzeugbild anzeigen",show_profile:"Fahrprofil-Auswahl anzeigen",confirm_profile_change:"Vor Wechsel best\xE4tigen",show_charge_speed:"Ladeleistungs-Badge anzeigen",show_last_seen:"Zuletzt gesehen anzeigen",show_live_data:"Live-Daten-Link anzeigen",show_options:"Optionen-Schaltfl\xE4che anzeigen",show_live_data_button:"Live-Daten-Schaltfl\xE4che anzeigen",show_navigation:"Aktive Navigation anzeigen",show_logo:"Markenlogo anzeigen",show_speed_limit:"Tempolimit-Schild beim Navigieren anzeigen"},short:{show_image:"Fahrzeugbild",show_profile:"Auswahl",confirm_profile_change:"Best\xE4tigung",show_charge_speed:"Ladeleistung",show_last_seen:"Zuletzt gesehen",show_live_data:"Live-Daten-Link",show_options:"Optionen",show_live_data_button:"Live-Daten-Schaltfl\xE4che",show_navigation:"Navigation",show_logo:"Markenlogo",show_speed_limit:"Tempolimit"},slot:{image:{car_image:"Fahrzeugbild"},select:{drive_profile:"Fahrprofil"},binary_sensor:{charging:"L\xE4dt"},device_tracker:{location:"Standort"},sensor:{soc:"Ladestand",charging_power:"Ladeleistung",last_update:"Letzte Aktualisierung",range:"Reichweite",reference_consumption:"Referenzverbrauch",battery_capacity:"Batteriekapazit\xE4t",odometer:"Kilometerstand",speed_factor:"Geschwindigkeitsfaktor",max_speed:"H\xF6chstgeschwindigkeit",elevation:"H\xF6he",data_source:"Datenquelle",source_last_refresh:"Cloud letzte Aktualisierung",obd_last_refresh:"OBD letzte Aktualisierung",speed_limit:"Tempolimit",brand:"Markenlogo"}},connection:{connected:"Verbunden",ago:"Vor {time}",sleeping:"Schl\xE4ft",notConnected:"Nicht verbunden",registering:"Anmeldung",unauthorized:"Nicht autorisiert"}};var st={card:{vehicle:"Vehicle",no_vehicle:"No ABRP vehicle found \u2014 set up the ABRP integration first.",last_seen:"Last seen {time}",never_seen:"Never seen",live_data:"Live data",options:"Options",charging:"Charging",connected:"Connected",sleeping:"Sleeping",offline:"Offline",eta:"ETA {time}",destination:"Destination"},time:{just_now:"just now",min_ago:"{n} min ago",h_ago:"{n} h ago",d_ago:"{n} d ago",lt_min:"< 1 min",min:"{n} min",h:"{n} h",day:"{n} day",days:"{n} days",week:"{n} week",weeks:"{n} weeks",month:"{n} month",months:"{n} months",year:"{n} year",years:"{n} years"},confirm:{title:"Switch drive profile?",text:'This changes the active drive profile from "{from}" to "{to}" in ABRP.',cancel:"Cancel",switch:"Switch"},options:{title:"Plan options",charge_stops:"Charge stops",optimal:"Optimal",fewer:"Fewer",least:"Fewest",arrival_soc:"Destination arrival SoC",avoid:"Avoid on route",tolls:"Tolls",highways:"Highways",ferries:"Ferries and car trains",borders:"Borders",realtime:"Realtime",traffic:"Realtime traffic",weather:"Realtime weather",adjust_speed:"Adjust speed to limits",stalls:"Minimum charger stalls",extra_weight:"Extra weight",drive_profile:"Drive profile"},live:{title:"Live data",soc:"SoC",power:"Power",hvac_power:"HVAC power",range:"Range",voltage:"Voltage",ref_consumption:"Calibrated reference consumption",batt_temp:"Battery temperature",degradation:"Degradation",capacity:"Battery capacity",ref_speed:"Reference speed",max_speed:"Maximum speed",soe:"Remaining energy (SoE)",inside_temp:"Inside temperature",outside_temp:"Outside temperature",odometer:"Odometer",location:"Location",elevation:"Elevation",firmware:"Firmware version",estimate:"ABRP estimate"},editor:{vehicle:"Vehicle (empty = first ABRP vehicle)",auto_name:"ABRP vehicle name",automatic:"Automatic",nothing_shown:"Nothing shown",shown:"Shown",overridden:"{n} overridden",mode_auto:"Automatic",mode_entity:"Entity",mode_custom:"Custom",entity:"Entity",value_template:"Value or template",custom_name:"Custom name or template",name:"Name",not_found:"not found",auto_value:"Automatic: {value}"},page:{title:"Title",illustration:"Vehicle illustration",profile:"Drive profile",battery:"Battery & charging",status:"Status line",buttons:"Buttons",livedata:"Live data"},toggle:{show_image:"Show car image",show_profile:"Show drive profile selector",confirm_profile_change:"Confirm before changing",show_charge_speed:"Show charging speed badge",show_last_seen:"Show last seen",show_live_data:"Show Live data link",show_options:"Show Options button",show_live_data_button:"Show Live data button",show_navigation:"Show active navigation",show_logo:"Show brand logo",show_speed_limit:"Show speed limit sign while navigating"},short:{show_image:"Car image",show_profile:"Selector",confirm_profile_change:"Confirm",show_charge_speed:"Speed badge",show_last_seen:"Last seen",show_live_data:"Live data link",show_options:"Options button",show_live_data_button:"Live data button",show_navigation:"Navigation",show_logo:"Brand logo",show_speed_limit:"Speed limit"},slot:{image:{car_image:"Car image"},select:{drive_profile:"Drive profile"},binary_sensor:{charging:"Charging"},device_tracker:{location:"Location"},sensor:{soc:"State of charge",charging_power:"Charging power",last_update:"Last update",range:"Range",reference_consumption:"Reference consumption",battery_capacity:"Battery capacity",odometer:"Odometer",speed_factor:"Speed factor",max_speed:"Maximum speed",elevation:"Elevation",data_source:"Data source",source_last_refresh:"Cloud last refresh",obd_last_refresh:"OBD last refresh",speed_limit:"Speed limit",brand:"Brand logo"}},connection:{connected:"Connected",ago:"{time} ago",sleeping:"Sleeping",notConnected:"Not connected",registering:"Registering",unauthorized:"Not authorized"}};var Ee={en:st,de:it};function jt(o){return(o?.locale?.language||o?.language||"en").split("-")[0]}function ot(o,e){let t=e.split(".").reduce((i,s)=>i?.[s],o);return typeof t=="string"?t:void 0}function g(o,e,t={}){let i=Ee[jt(o)]||Ee.en,s=ot(i,e)??ot(Ee.en,e)??e;for(let[n,r]of Object.entries(t))s=s.replace(`{${n}}`,r);return s}function nt(o,e){if(!o)return null;let t=(Date.now()-new Date(o).getTime())/1e3;return Number.isNaN(t)?null:t<90?g(e,"time.just_now"):t<5400?g(e,"time.min_ago",{n:Math.round(t/60)}):t<129600?g(e,"time.h_ago",{n:Math.round(t/3600)}):g(e,"time.d_ago",{n:Math.round(t/86400)})}function X(o,e=Date.now()/1e3){return Math.floor((e-o)/3600)}var It=[[3600,60,"min","min"],[86400,3600,"h","h"],[604800,86400,"day","days"],[2630016,604800,"week","weeks"],[31557600,2630016,"month","months"],[1/0,31557600,"year","years"]];function ce(o,e){let t=Date.now()/1e3-Number(o);if(!Number.isFinite(t))return null;if(t<60)return g(e,"time.lt_min");let[,i,s,n]=It.find(([h])=>t<h),r=Math.round(t/i);return g(e,`time.${r===1?s:n}`,{n:r})}var Vt={api:"API",gps:"GPS",obdble:"OBD",abrpobd:"ABRP OBD",carscanner:"Car Scanner",highmobility:"High Mobility",derived:"ABRP estimate"};function L(o){return o&&(Vt[o.toLowerCase()]??o.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase()))}function rt(o){return o&&o.charAt(0).toUpperCase()+o.slice(1)}function R(o,e=0){let t=Number(o?.state);return Number.isFinite(t)?t.toFixed(e):null}function A(o){return typeof o=="string"&&/\{[{%]/.test(o)}function E(o){return typeof o=="string"&&/^[a-z_]+\.[a-zA-Z0-9_]+$/.test(o)}var at=!1;async function de(){if(!at){at=!0;try{await(await window.loadCardHelpers?.())?.importMoreInfoControl?.("light")}catch{}}}var lt=V`
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
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.5em;
    font-weight: 700;
  }
  .logo {
    height: 1em;
    width: auto;
    flex: none;
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
  /* Speed-limit signs, in ABRP's colours (dark-map variant under .dark). */
  .sl-eu {
    --sl-surface: #ffffff;
    --sl-stroke: #fe0123;
    flex: none;
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 3.5px solid var(--sl-stroke);
    background: var(--sl-surface);
    color: #1d1d1d;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    line-height: 1;
  }
  .sl-eu.wide {
    font-size: 11px;
  }
  .sl-eu.dark,
  .sl-us.dark {
    --sl-surface: #f5f5f5;
    --sl-stroke: #fe344f;
  }
  .sl-none {
    flex: none;
    display: inline-flex;
  }
  .sl-svg {
    width: 32px;
    height: 32px;
  }
  .sl-us {
    --sl-surface: #ffffff;
    flex: none;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: 2px 4px;
    border: 2px solid #1d1d1d;
    border-radius: 5px;
    background: var(--sl-surface);
    color: #1d1d1d;
    font-size: 7px;
    font-weight: 700;
    line-height: 1.05;
  }
  .sl-us-num {
    font-size: 14px;
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
  .conns {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 24px;
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid var(--divider-color);
    font-size: 0.9em;
  }
  .conn {
    display: flex;
    align-items: flex-start;
    border-radius: 6px;
    padding: 2px 6px;
    margin: -2px -6px;
  }
  .conn:hover {
    background: var(--secondary-background-color);
  }
  .conn .dot {
    margin-top: 6px;
  }
  .conn-text {
    display: flex;
    flex-direction: column;
  }
  .conn-sub {
    color: var(--secondary-text-color);
    font-size: 0.9em;
  }
  @media (max-width: 460px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var Wt=300,ct=new Set(["obdble","abrpobd"]);function Zt(o){if(o==null||o==="")return null;let e=Number(o);if(Number.isFinite(e))return e>0?e:null;let t=new Date(o).getTime();return Number.isNaN(t)?null:t/1e3}var qt=(o,e)=>Math.floor((e-o)/86400);function Kt(o,e){let t={};for(let[i,s]of Object.entries(o||{})){if(s==null)continue;let n=Number(e?.[i])||0;n>(t[s]??0)&&(t[s]=n)}return Object.entries(t).map(([i,s])=>({provider:i,timestamp:s})).sort((i,s)=>s.timestamp-i.timestamp)}function Gt({type:o,authorized:e,connected:t,time:i,asleep:s,now:n}){return o==null?null:e===!1&&o!=="api"?{kind:"unauthorized"}:t?{kind:"connected"}:t===!1&&i&&X(i,n)<=3?{kind:"lastSeen",lastSeen:i}:s?{kind:"sleeping"}:t===!1&&i?o==="api"&&qt(i,n)<=3?{kind:"sleeping"}:{kind:"notConnected"}:t===!1&&!i?{kind:"registering"}:null}function dt(o){let e=(c,_)=>g(o.hass,c,_),t=o._vs("sensor.data_source")?.attributes||{},i=t.providers||{},s=Date.now()/1e3,n=Kt(i,t.timestamps).filter(c=>c.provider!=="gps"&&c.provider!=="derived"),r=c=>c!=null&&c>s-Wt,h=c=>e("connection.ago",{time:ce(c,o.hass)}),l=[],u=t.cloud_source??(Object.values(i).includes("api")?"api":null),d=Gt({type:u,authorized:t.tlm_authorized,connected:t.cloud_connected,time:n.find(c=>c.provider===u)?.timestamp??Zt(t.cloud_last_seen),asleep:t.asleep,now:s});d&&l.push({dot:d.kind==="connected"?"green pulse":d.kind==="unauthorized"?"red":"gray",title:L(u),text:d.kind==="lastSeen"?h(d.lastSeen):e(`connection.${d.kind}`),key:"sensor.source_last_refresh"});let p=ct.has(t.tlm_type)?t.tlm_type:null;if(p){let c=n.find(_=>_.provider===p)?.timestamp;l.push({dot:r(c)?"green pulse":"gray",title:L(p),text:r(c)?e("connection.connected"):c&&X(c,s)<=3?h(c):e("connection.notConnected"),key:"sensor.obd_last_refresh"})}for(let c of n)c.provider===u||c.provider===p||ct.has(c.provider)||r(c.timestamp)&&l.push({dot:"green pulse",title:e("connection.connected"),text:L(c.provider),key:"sensor.data_source"});return l.length?a`<div class="conns">
    ${l.map(c=>a`<div
        class="conn clickable"
        @click=${()=>o._moreInfo(c.key)}
      >
        <span class="dot ${c.dot}"></span>
        <span class="conn-text">
          <span class="conn-title">${c.title}</span>
          <span class="conn-sub">${c.text}</span>
        </span>
      </div>`)}
  </div>`:""}var Ce=3600,Pe=86400,Q=604800,ht=2592e3,Yt={soc:Pe,soe:Pe,power:300,hvac_power:300,speed:30,capacity:ht,kwh_charged:300,soh:ht,voltage:300,current:300,odometer:Q,est_battery_range:Pe,ext_temp:Ce,batt_temp:Ce,cabin_temp:Ce,lat:Q,lon:Q,heading:Q,elevation:Q};function pt(o){let e=m=>g(o.hass,m),t=o._vs("sensor.data_source")?.attributes||{},i=t.providers||{},s=t.timestamps||{},n=Date.now()/1e3,r=m=>{if(!m)return!0;let x=Yt[m],$=Number(s[m]);return x==null||!Number.isFinite($)||$<=0?!0:n-$<=x},h=m=>m==null?null:m==="derived"?e("live.estimate"):L(m),l=m=>h(i[m]),u=(m,x)=>o._vs(m)?.attributes?.unit_of_measurement??x,d=(m,x)=>{if(x&&!r(x))return null;let $=Number(o._vs(m)?.state);return Number.isFinite($)?$:null},p=m=>Math.abs(m)<10?m.toFixed(1):m.toFixed(0),c=d("sensor.power","power"),_=o._vs("binary_sensor.charging")?.state==="on",b=c==null?null:_?-c:c,te=i.power==="derived"&&i.current!=null?i.current:i.power,v=d("sensor.soh","soh"),U=v==null?null:100-v,F=d("sensor.calibration_confidence")==null?null:R(o._vs("sensor.reference_consumption")),B=R(o._vs("sensor.calibrated_max_speed")),H=B??R(o._vs("sensor.max_speed")),Ne=B!=null?"calib_max_speed":"max_speed",ie=o._vs("device_tracker.location"),bt=ie?.attributes?.address,xt=r("lat")?bt||(ie?.state&&ie.state!=="unknown"?ie.state:null):null,Me=d("sensor.speed_factor"),se=o._vs("sensor.firmware_version")?.state,Oe=d("sensor.soc","soc"),Te=d("sensor.hvac_power","hvac_power"),$t=[[e("live.soc"),Oe==null?null:Oe.toFixed(0),"%",l("soc"),"sensor.soc","soc"],[e("live.power"),b==null?null:p(b),"kW",h(te),"sensor.power","power"],[e("live.hvac_power"),Te==null?null:p(Te),"kW",l("hvac_power"),"sensor.hvac_power","hvac_power"],[e("live.range"),d("sensor.range","est_battery_range")?.toFixed(0)??null,u("sensor.range","km"),l("est_battery_range"),"sensor.range","est_battery_range"],[e("live.voltage"),d("sensor.voltage","voltage")?.toFixed(0)??null,"V",l("voltage"),"sensor.voltage","voltage"],[e("live.ref_consumption"),F,u("sensor.reference_consumption","Wh/km"),l("calib_ref_cons"),"sensor.reference_consumption","calib_ref_cons"],[e("live.batt_temp"),d("sensor.battery_temp","batt_temp")?.toFixed(0)??null,u("sensor.battery_temp","\xB0C"),l("batt_temp"),"sensor.battery_temp","batt_temp"],[e("live.degradation"),U==null?null:p(U),"%",l("soh"),"sensor.soh","soh"],[e("live.capacity"),d("sensor.battery_capacity","capacity")?.toFixed(0)??null,"kWh",l("battery_capacity")??l("capacity"),"sensor.battery_capacity","capacity"],[e("live.ref_speed"),Me==null?null:Math.round(Me*100),"%",l("speed_factor"),"sensor.speed_factor","speed_factor"],[e("live.max_speed"),H,u("sensor.calibrated_max_speed","km/h"),l(Ne),"sensor.calibrated_max_speed",Ne],[e("live.soe"),d("sensor.soe","soe")?.toFixed(1)??null,"kWh",l("soe"),"sensor.soe","soe"],[e("live.inside_temp"),d("sensor.cabin_temp","cabin_temp")?.toFixed(0)??null,u("sensor.cabin_temp","\xB0C"),l("cabin_temp"),"sensor.cabin_temp","cabin_temp"],[e("live.outside_temp"),d("sensor.external_temp","ext_temp")?.toFixed(0)??null,u("sensor.external_temp","\xB0C"),l("ext_temp"),"sensor.external_temp","ext_temp"],[e("live.odometer"),d("sensor.odometer","odometer")?.toFixed(0)??null,u("sensor.odometer","km"),l("odometer"),"sensor.odometer","odometer"],[e("live.location"),xt,"",null,"device_tracker.location","lat"],[e("live.elevation"),d("sensor.elevation","elevation")?.toFixed(0)??null,u("sensor.elevation","m"),null,"sensor.elevation","elevation"],[e("live.firmware"),se&&se!=="unknown"&&se!=="unavailable"?se:null,"",null,"sensor.firmware_version","fw_version"]].filter(([,m])=>m!=null),wt=(m,x)=>{let $=x==="lat"?s.lat??s.location:s[x],ue=Number($)>0?ce($,o.hass):null;return[m,ue].filter(Boolean).join(" \xB7 ")};return a`<div class="grid">
      ${$t.map(([m,x,$,ue,yt,kt])=>{let Le=wt(ue,kt);return a`<div
            class="tile clickable"
            @click=${()=>o._moreInfo(yt)}
          >
            <div class="tile-title">${m}</div>
            <div class="tile-value">
              ${x}<span class="tile-unit"> ${$}</span>
            </div>
            ${Le?a`<div class="tile-prov">${Le}</div>`:""}
          </div>`})}
    </div>
    ${dt(o)}`}var ut={optimal:"options.optimal",fewer:"options.fewer",least:"options.least"},Jt=[["switch.avoid_tolls","mdi:cash-multiple","options.tolls"],["switch.avoid_motorways","mdi:highway","options.highways"],["switch.avoid_ferries","mdi:ferry","options.ferries"],["switch.avoid_borders","mdi:boom-gate","options.borders"]],Xt=[["switch.realtime_traffic","mdi:traffic-light","options.traffic"],["switch.realtime_weather","mdi:weather-partly-cloudy","options.weather"],["switch.adjust_speed","mdi:speedometer","options.adjust_speed"]],ee=(o,e)=>a`<div class="section"><ha-icon icon=${o}></ha-icon>${e}</div>`;function mt(o){let e=o._as("select.charge_stops"),t=o._vs("select.drive_profile"),i=s=>g(o.hass,s);return a`
    ${e?Qt(o,e):""}
    ${ze(o,i("options.arrival_soc"),"mdi:battery-low",o._as("number.arrival_soc"),"%")}
    ${ee("mdi:cancel",i("options.avoid"))}
    <div class="chips">
      ${Jt.map(([s,n,r])=>ei(o,s,n,i(r)))}
    </div>
    ${ee("mdi:update",i("options.realtime"))}
    ${Xt.map(([s,n,r])=>ti(o,s,n,i(r)))}
    ${ze(o,i("options.stalls"),"mdi:counter",o._as("number.min_charger_stalls"),"")}
    ${ze(o,i("options.extra_weight"),"mdi:weight-kilogram",o._as("number.extra_weight")," kg")}
    ${ii(o,t)}
  `}function Qt(o,e){return a`${ee("mdi:ev-station",g(o.hass,"options.charge_stops"))}
    <div class="segments">
      ${(e.attributes.options||[]).map(t=>a`<button
          class="segment ${e.state===t?"on":""}"
          @click=${()=>o._call("select","select_option",e,{option:t})}
        >
          ${ut[t]?g(o.hass,ut[t]):rt(t)}
        </button>`)}
    </div>`}function ze(o,e,t,i,s){if(!i)return"";let n=i.attributes,r=Number(i.state);return a`${ee(t,e)}
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
        @change=${h=>{o._call("number","set_value",i,{value:Number(h.target.value)}),h.target.closest(".slider-row").querySelector(".slider-value").textContent=`${h.target.value}${s}`}}
      ></ha-slider>
    </div>`}function ei(o,e,t,i){let s=o._as(e);if(!s)return"";let n=s.state==="on";return a`<button
    class="chip ${n?"on":""}"
    @click=${()=>o._call("switch","toggle",s)}
  >
    <ha-icon icon="${t}"></ha-icon>${i}
  </button>`}function ti(o,e,t,i){let s=o._as(e);return s?a`<div class="switch-row">
    <span class="switch-label"><ha-icon icon=${t}></ha-icon>${i}</span>
    <ha-switch
      .checked=${s.state==="on"}
      @change=${()=>o._call("switch","toggle",s)}
    ></ha-switch>
  </div>`:""}function ii(o,e){return e?.attributes?.options?.length?a`${ee("mdi:car-cog",g(o.hass,"options.drive_profile"))}
    <ha-select
      naturalMenuWidth
      fixedMenuPosition
      .value=${e.state}
      @selected=${t=>{let i=t.target.value;i&&i!==e.state&&o._requestProfileChange(e,i)}}
      @closed=${t=>t.stopPropagation()}
    >
      ${e.attributes.options.map(t=>a`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
    </ha-select>`:""}var si=Xe`<svg viewBox="0 0 80 80" class="sl-svg">
  <path fill="#fff" d="M80 40c0 22.092-17.909 40-40 40C17.908 80 0 62.092 0 40 0 17.909 17.908 0 40 0c22.091 0 40 17.909 40 40Z"/>
  <path fill="#000" d="M39.999 1.342C18.66 1.342 1.342 18.662 1.342 40s17.32 38.657 38.657 38.657c21.338 0 38.657-17.32 38.657-38.657 0-21.338-17.32-38.658-38.657-38.658Zm0 2a36.497 36.497 0 0 1 20.779 6.45L9.792 60.78A36.499 36.499 0 0 1 3.342 40c0-20.256 16.4-36.657 36.657-36.657Zm21.987 7.317c.403.303.799.614 1.189.933L11.59 63.176a37.64 37.64 0 0 1-.933-1.19L61.986 10.66Zm2.309 1.886c.375.332.743.67 1.105 1.017L13.56 65.4c-.346-.36-.685-.73-1.017-1.104l51.751-51.75Zm2.141 2.055c.347.36.686.73 1.018 1.104l-51.75 51.75a36.15 36.15 0 0 1-1.105-1.017L66.436 14.6Zm1.972 2.224c.318.39.63.786.932 1.189L18.012 69.34c-.403-.303-.799-.614-1.189-.932l51.585-51.585Zm1.799 2.397A36.497 36.497 0 0 1 76.657 40c0 20.257-16.401 36.657-36.658 36.657a36.497 36.497 0 0 1-20.779-6.45L70.207 19.22Z"/>
</svg>`;function _t(o){let e=o._vs("sensor.speed_limit");if(!e)return"";let t=e.attributes?.unlimited===!0,i=Number(e.state);if(!t&&!(Number.isFinite(i)&&i>0))return"";let s=t?null:Math.round(i),n=o._vs("device_tracker.location")?.attributes?.region==="northamerica",r=o.hass.themes?.darkMode?" dark":"",h=l=>{l.stopPropagation(),o._moreInfo("sensor.speed_limit")};return n?a`<span class="sl-us${r} clickable" @click=${h}>
      ${t?a`<b class="sl-us-num">NO</b>`:""}
      <span>SPEED</span><span>LIMIT</span>
      ${t?"":a`<b class="sl-us-num">${s}</b>`}
    </span>`:t?a`<span class="sl-none clickable" @click=${h}>${si}</span>`:a`<span
    class="sl-eu${r}${s>=100?" wide":""} clickable"
    @click=${h}
    >${s}</span
  >`}var he=class extends y{static styles=lt;static get properties(){return{hass:{},_config:{},_dialog:{state:!0},_profileMenu:{state:!0},_confirmProfile:{state:!0}}}constructor(){super(),this._dialog=null,this._profileMenu=!1,this._confirmProfile=null}connectedCallback(){super.connectedCallback(),de()}setConfig(e){this._config=e||{}}static getConfigElement(){return document.createElement(`${w}-editor`)}static getStubConfig(){return{}}getCardSize(){return 5}get _vehicle(){let e=J(this.hass);return e.length?this._config.device&&e.find(t=>t.deviceId===this._config.device)||e[0]:null}_resolve(e,t){let i=this._config.entities?.[e];if(i){if(A(i)){let n=this._templateResults?.[i];return{state:n===void 0?"unknown":String(n),attributes:{}}}return E(i)?this.hass.states[i]:{state:i,attributes:{}}}let s=t?.[e];return s?this.hass.states[s]:void 0}_vs(e){return this._resolve(e,this._vmap)}_as(e){return this._resolve(e,this._amap)}updated(e){super.updated(e),(e.has("hass")||e.has("_config"))&&this._syncTemplates()}disconnectedCallback(){super.disconnectedCallback();for(let e of Object.values(this._tmplUnsub||{}))typeof e=="function"&&e();this._tmplUnsub={}}async _syncTemplates(){if(!this.hass?.connection)return;this._tmplUnsub=this._tmplUnsub||{},this._templateResults=this._templateResults||{};let e=[...Object.values(this._config.entities||{}),this._config.title].filter(t=>A(t));for(let t of e)if(!this._tmplUnsub[t]){this._tmplUnsub[t]=!0;try{this._tmplUnsub[t]=await this.hass.connection.subscribeMessage(i=>{this._templateResults[t]=i.result,this.requestUpdate()},{type:"render_template",template:t})}catch{this._templateResults[t]="error",this.requestUpdate()}}for(let t of Object.keys(this._tmplUnsub))if(!e.includes(t)){let i=this._tmplUnsub[t];typeof i=="function"&&i(),delete this._tmplUnsub[t],delete this._templateResults[t]}}_moreInfo(e){let t=this._config.entities?.[e],i=t&&E(t)&&!A(t)?t:this._vmap?.[e]||this._amap?.[e];!i||t&&!E(t)||this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:i},bubbles:!0,composed:!0}))}_t(e,t){return g(this.hass,e,t)}_call(e,t,i,s={}){this.hass.callService(e,t,{entity_id:i.entity_id,...s})}render(){if(!this.hass)return a``;let e=this._vehicle;return e?(this._vmap=T(this.hass,e.ents),this._amap=T(this.hass,le(this.hass)),a`<ha-card>
      ${this._renderMain(e)}
      ${this._dialog==="options"?this._dialogFrame(this._t("options.title"),mt(this)):""}
      ${this._dialog==="live"?this._dialogFrame(this._t("live.title"),pt(this)):""}
      ${this._confirmProfile?this._renderConfirmProfile():""}
    </ha-card>`):a`<ha-card>
        <div class="empty">${this._t("card.no_vehicle")}</div>
      </ha-card>`}_status(){let e=Date.now()/1e3,t=c=>{if(!c||c==="unknown"||c==="unavailable")return null;let _=new Date(c).getTime();return Number.isNaN(_)?null:_/1e3},i=this._vs("sensor.data_source"),s=t(i?.attributes?.soc_last_seen),n=Number(this._vs("sensor.soc")?.state),r=Number.isFinite(n)&&s!=null&&e-s<300,h=this._vs("binary_sensor.charging")?.state==="on",l=Math.abs(Number(this._vs("sensor.charging_power")?.state)),u=this._vs("binary_sensor.asleep")?.state==="on",d=i?.attributes?.last_seen??this._vs("sensor.last_update")?.state,p=t(d);if(r&&h&&Number.isFinite(l)&&l>0)return{color:"green",pulse:!0,text:this._t("card.charging")};if(r)return{color:"green",pulse:!0,text:this._t("card.connected")};if(p!=null&&X(p,e)<=3){let c=nt(d,this.hass);return{color:"gray",pulse:!1,text:c?this._t("card.last_seen",{time:c}):this._t("card.never_seen")}}return u?{color:"gray",pulse:!1,text:this._t("card.sleeping")}:{color:"gray",pulse:!1,text:this._t("card.offline")}}_renderMain(e){let t=this._vs("sensor.vehicle_name")?.state,i=this._config.title,n=(i&&A(i)?String(this._templateResults?.[i]??""):i)||(t&&t!=="unknown"&&t!=="unavailable"?t:null)||e.device?.name_by_user||e.device?.name||this._t("card.vehicle"),r=this._vs("sensor.soc"),h=Number(this._vs("sensor.data_source")?.attributes?.timestamps?.soc),u=Number.isFinite(h)&&h>0&&Date.now()/1e3-h>86400?null:R(r),d=this._vs("image.car_image"),p=d?.attributes?.entity_picture||(typeof d?.state=="string"&&(d.state.startsWith("http")||d.state.startsWith("/"))?d.state:null),c=this._status(),_=this._vs("binary_sensor.charging")?.state==="on",b=Number(this._vs("sensor.charging_power")?.state),te=_&&Number.isFinite(b)&&b>0?`${b<10?b.toFixed(1):Math.round(b)} kW`:null,v=H=>this._config[H]!==!1,U=this._vs("sensor.brand"),F=U?.attributes||{},B=v("show_logo")?this.hass.themes?.darkMode&&F.logo_dark||F.logo_light||F.entity_picture:null;return a`<div class="main">
      <div class="head">
        <div class="head-left">
          <div class="name">
            ${B?a`<img
                  class="logo"
                  src="${B}"
                  alt="${U?.state||""}"
                />`:""}${n}
          </div>
          ${v("show_profile")?this._renderProfile():""}
        </div>
        ${v("show_image")&&p?a`<img
              class="car clickable"
              src="${p}"
              alt="${n}"
              @click=${()=>this._moreInfo("image.car_image")}
            />`:""}
      </div>
      <div class="soc-row clickable" @click=${()=>this._moreInfo("sensor.soc")}>
        ${r?a`<ha-state-icon
              .hass=${this.hass}
              .stateObj=${r}
            ></ha-state-icon>`:a`<ha-icon icon="mdi:battery"></ha-icon>`}
        <span class="soc">${u??"\u2013"}%</span>
        ${v("show_charge_speed")&&te?a`<span
              class="charge-speed clickable"
              @click=${H=>{H.stopPropagation(),this._moreInfo("sensor.charging_power")}}
            >
              <ha-icon icon="mdi:flash"></ha-icon>${te}
            </span>`:v("show_charge_speed")&&_?a`<span class="charge-speed">
                <ha-icon icon="mdi:flash"></ha-icon>${this._t("card.charging")}
              </span>`:""}
      </div>
      <div class="bar clickable" @click=${()=>this._moreInfo("sensor.soc")}>
        <div class="fill ${_?"charging":""}" style="width:${u??0}%"></div>
      </div>
      ${v("show_navigation")?this._renderNavigation():""}
      ${v("show_last_seen")||v("show_live_data")?a`<div class="meta">
            ${v("show_last_seen")?a`<span
                  class="seen clickable"
                  @click=${()=>this._moreInfo("sensor.last_update")}
                >
                  <span
                    class="dot ${c.color}${c.pulse?" pulse":""}"
                  ></span>
                  ${c.text}
                </span>`:a`<span></span>`}
            ${v("show_live_data")?a`<a class="link" @click=${()=>this._dialog="live"}
                  >${this._t("card.live_data")}</a
                >`:""}
          </div>`:""}
      ${v("show_options")||this._config.show_live_data_button===!0?a`<div class="buttons">
            ${v("show_options")?a`<button
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
      ${this._config.show_speed_limit!==!1?_t(this):""}
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
    </ha-dialog>`}};var oi=[{name:"device",selector:{device:{integration:j,entity:[{integration:j,domain:"device_tracker"}]}}}],gt={title:[["show_logo",!0,"mdi:car-info"]],illustration:[["show_image",!0,"mdi:image-outline"]],profile:[["show_profile",!0,"mdi:car-cog"],["confirm_profile_change",!0,"mdi:shield-check-outline"]],battery:[["show_charge_speed",!0,"mdi:flash"]],status:[["show_last_seen",!0,"mdi:clock-outline"],["show_live_data",!0,"mdi:link-variant"],["show_navigation",!0,"mdi:navigation-variant"],["show_speed_limit",!0,"mdi:speedometer"]],buttons:[["show_options",!0,"mdi:tune-variant"],["show_live_data_button",!1,"mdi:chart-box-outline"]]},ft={illustration:[["image.car_image","mdi:image-outline"]],profile:[["select.drive_profile","mdi:car-cog"]],battery:[["sensor.soc","mdi:battery-high"],["binary_sensor.charging","mdi:battery-charging"],["sensor.charging_power","mdi:flash"]],status:[["sensor.last_update","mdi:clock-outline"],["sensor.speed_limit","mdi:speedometer"]],livedata:[["sensor.soc","mdi:battery-high"],["sensor.range","mdi:map-marker-distance"],["sensor.reference_consumption","mdi:lightning-bolt-outline"],["sensor.battery_capacity","mdi:battery"],["sensor.odometer","mdi:counter"],["device_tracker.location","mdi:map-marker"],["sensor.speed_factor","mdi:speedometer"],["sensor.max_speed","mdi:speedometer-medium"],["sensor.elevation","mdi:image-filter-hdr"],["sensor.data_source","mdi:database-outline"],["sensor.source_last_refresh","mdi:cloud-outline"],["sensor.obd_last_refresh","mdi:car-connected"]]},vt=[{id:"title",icon:"mdi:format-title"},{id:"illustration",icon:"mdi:image-outline"},{id:"profile",icon:"mdi:car-cog"},{id:"battery",icon:"mdi:battery-charging"},{id:"status",icon:"mdi:clock-outline"},{id:"buttons",icon:"mdi:gesture-tap-button"},{id:"livedata",icon:"mdi:chart-box-outline"}],D="sensor.vehicle_name",ni=["sensor.brand","mdi:car-info"],pe=class extends y{static get properties(){return{hass:{},_config:{},_page:{state:!0},_modes:{state:!0}}}constructor(){super(),this._page=null,this._modes={}}connectedCallback(){super.connectedCallback(),de()}setConfig(e){this._config=e||{}}_t(e,t){return g(this.hass,e,t)}render(){if(!this.hass)return a``;let e=vt.find(t=>t.id===this._page);return e?this._renderSubpage(e):this._renderRoot()}_defaults(){let e=J(this.hass),t=this._config.device&&e.find(i=>i.deviceId===this._config.device)||e[0];return{...t?T(this.hass,t.ents):{},...T(this.hass,le(this.hass))}}_renderRoot(){return a`<ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${oi}
        .computeLabel=${()=>this._t("editor.vehicle")}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="nav">
        ${vt.map(e=>a`<button
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
      </div>`}_summary(e){if(e==="title")return this._config.title||(this._config.entities?.[D]??this._t("editor.auto_name"));let t=(ft[e]||[]).filter(([r])=>this._config.entities?.[r]).length,i=t?` \xB7 ${this._t("editor.overridden",{n:t})}`:"",s=gt[e]||[];if(!s.length)return t?this._t("editor.overridden",{n:t}):this._t("editor.automatic");let n=s.filter(([r,h])=>this._config[r]??h);return n.length?n.length===s.length&&s.length===1?`${this._t("editor.shown")}${i}`:n.map(([r])=>this._t(`short.${r}`)).join(", ")+i:`${this._t("editor.nothing_shown")}${i}`}_renderSubpage(e){return a`<div class="subpage-head">
        <button class="back" @click=${()=>this._page=null}>
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </button>
        <span class="subpage-title">${this._t(`page.${e.id}`)}</span>
      </div>
      ${(gt[e.id]||[]).map(([t,i,s])=>this._renderToggle(t,i,s))}
      ${e.id==="title"?a`${this._renderTitleSlot()}${this._renderSlot(...ni)}`:(ft[e.id]||[]).map(([t,i])=>this._renderSlot(t,i))}`}_renderToggle(e,t,i){return a`<div class="row">
      <ha-icon icon=${i}></ha-icon>
      <span class="row-label">${this._t(`toggle.${e}`)}</span>
      <ha-switch
        .checked=${this._config[e]??t}
        @change=${s=>this._toggleDisplay(e,t,s.target.checked)}
      ></ha-switch>
    </div>`}_slotMode(e,t){return this._modes[e]?this._modes[e]:t?E(t)&&!A(t)?"entity":"custom":"auto"}_renderModeChips(e,t,i){return a`<div class="modes">
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
              .data=${{value:E(i)&&!A(i)?i:""}}
              .schema=${[{name:"value",selector:{entity:{}}}]}
              .computeLabel=${()=>this._t("editor.entity")}
              @value-changed=${r=>{r.stopPropagation(),this._setOverride(e,r.detail.value.value||"")}}
            ></ha-form>`:a`<ha-form
              .hass=${this.hass}
              .data=${{value:E(i)&&!A(i)?"":i}}
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
            ></ha-form>`}`}_withOverride(e,t){let i={...this._config.entities||{}};t?i[e]=t:delete i[e];let s={...this._config,entities:i,type:`custom:${w}`};return Object.keys(i).length||delete s.entities,s}_withoutTitle(e){let t={...e};return delete t.title,t}_setOverride(e,t){this._dispatch(this._withOverride(e,t))}_toggleDisplay(e,t,i){let s={...this._config,type:`custom:${w}`};i===t?delete s[e]:s[e]=i,this._dispatch(s)}_valueChanged(e){e.stopPropagation();let t={...this._config,...e.detail.value,type:`custom:${w}`};t.device||delete t.device,this._dispatch(t)}_dispatch(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}static get styles(){return V`
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
    `}};customElements.define(w,he);customElements.define(`${w}-editor`,pe);window.customCards=window.customCards||[];window.customCards.push({type:w,name:"ABRP Vehicle Card",description:"ABRP-style vehicle card with battery state, live data and plan options.",preview:!0,documentationURL:"https://github.com/MichelFR/ha-abrp"});
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
