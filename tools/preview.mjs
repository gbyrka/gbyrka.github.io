/** Local static preview with the same root and sibling paths as GitHub Pages. */
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const workspace=new URL('../../',import.meta.url);
const projects=new Set(['games','multiplayer','dock','park','hamster','sokoban']);
const types={html:'text/html',css:'text/css',js:'text/javascript',mjs:'text/javascript',json:'application/json',svg:'image/svg+xml',png:'image/png',jpg:'image/jpeg',webp:'image/webp',wasm:'application/wasm',gz:'application/gzip',zip:'application/zip',txt:'text/plain'};
export function createPreviewServer(){return createServer(async(req,res)=>{
  try{
    const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(path.split('/').some(part=>part==='..'||part.startsWith('.')))return res.writeHead(404).end();
    const first=path.split('/')[1];
    if(projects.has(first)&&path===`/${first}`){const url=new URL(req.url,'http://localhost');return res.writeHead(301,{Location:`/${first}/${url.search}`}).end();}
    const relative=(projects.has(first)?path.slice(1):'gbyrka.github.io'+path)+(path.endsWith('/')?'index.html':'');
    const bytes=await readFile(new URL(relative,workspace));res.writeHead(200,{'Content-Type':types[relative.split('.').at(-1)]??'application/octet-stream'}).end(bytes);
  }catch{res.writeHead(404).end();}
});}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  const server=createPreviewServer(),port=Number(process.env.PORT??8000);
  server.listen(port,'127.0.0.1',()=>console.log(`MoD-IT Games: http://127.0.0.1:${port}/`));
}
