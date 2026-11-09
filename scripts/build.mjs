import {mkdir,copyFile,cp} from 'node:fs/promises';
await mkdir('dist/playtest/vendor',{recursive:true});
await cp('playtest','dist/playtest',{recursive:true});
await copyFile('playtest/index.html','dist/index.html');
for(const name of ['three.module.js','three.core.js'])await copyFile('node_modules/three/build/'+name,'dist/playtest/vendor/'+name);
await copyFile('node_modules/three/LICENSE','dist/playtest/vendor/THREE-LICENSE.txt');
await copyFile('playtest/redirect.html','dist/index.html');
