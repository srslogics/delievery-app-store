import fs from 'node:fs';
const raw=process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL;
if(!raw) throw new Error('Set SITE_URL to the public website URL (or use Render, which sets RENDER_EXTERNAL_URL).');
const base=new URL(raw);
if(base.protocol!=='https:'&&base.hostname!=='localhost')throw new Error('SITE_URL must use HTTPS');
const origin=base.origin;
for(const path of ['index.html','install/index.html','operations/index.html']){
 const file='dist/'+path;
 let html=fs.readFileSync(file,'utf8');
 html=html.replace(/<!-- SOCIAL_START -->[\s\S]*?<!-- SOCIAL_END -->/g,block=>block.replaceAll('https://nook-neighbourhood-store-demo.shubhamsingh335179.chatgpt.site',origin));
 fs.writeFileSync(file,html);
}
console.log('Social preview URLs configured for '+origin);
