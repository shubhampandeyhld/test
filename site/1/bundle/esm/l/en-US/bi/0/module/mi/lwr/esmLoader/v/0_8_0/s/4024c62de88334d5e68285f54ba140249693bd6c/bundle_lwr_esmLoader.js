class l{constructor(i){var e,t;this.importURICache=new Map,this.modifiers="",this.normalizeMetadata(i),this.mappingEndpoint=(i==null?void 0:i.importMappings)||(e=i==null?void 0:i.endpoints)===null||e===void 0?void 0:e.uris.mapping,((t=i==null?void 0:i.endpoints)===null||t===void 0?void 0:t.modifiers)&&(this.modifiers=Object.entries(i.endpoints.modifiers).reduce((o,[r,n])=>o+=`${r}=${n}&`,"?"))}normalizeMetadata(i){if(i&&i.imports)for(const[e,t]of Object.entries(i.imports))e&&t&&(Array.isArray(t)?t:[]).forEach(r=>{this.importURICache.set(r,e)})}async fetchMappings(i){const e=`${this.mappingEndpoint}${encodeURIComponent(i)}${this.modifiers}`,t=await globalThis.fetch(e);if(t.ok){const o=await t.json();this.normalizeMetadata(o)}}async resolve(i){let e=this.importURICache.get(i);return!e&&this.mappingEndpoint&&(await this.fetchMappings(i),e=this.importURICache.get(i)),e}}class m{constructor(i){this.importURICache=i&&i.imports?i:{imports:{}}}legacyResolve(i){return this.importURICache.imports[i]}}let p,a,d;function u(s){p=s;const{imports:i,index:e,importMappings:t,endpoints:o}=s;a=new l({imports:i,index:e,endpoints:o,importMappings:t}),d=new m(t)}async function c(s,i){return import(await h(s,i))}async function h(s,i){let e;if(!a||!d)throw new Error("The ESM Loader was not initialized");if(e=await a.resolve(s),e||(e=d.legacyResolve(s),e))return e;if(e=s,e.indexOf("://")<0&&!e.startsWith("/")){const{endpoints:t}=p;t&&t.uris&&t.uris.module&&(e=t.uris.module+encodeURIComponent(s),i&&(e+=`?importer=${encodeURIComponent(i)}`),t.modifiers&&(e+=Object.entries(t.modifiers).reduce((o,[r,n])=>o+=`${r}=${n}&`,i?"&":"?")))}return e}export{u as init,c as load};
