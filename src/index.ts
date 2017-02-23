import { latency } from './latency';
import { video } from './video';
import { cache } from './cache';
import { datacenter } from './datacenter';
import * as fs from 'async-file';
import { pizza } from './pizza';

let readFileSync = (fileName: string): string => {
    let data = '';
    try {
        (async () => {
            data = await fs.readTextFile(fileName); 
        })
    } catch (asd) {
        console.log (asd);
    }
    
    return data;
}

let readFile = async (fileName: string): Promise<string> => {
    return await fs.readTextFile(fileName); 
}

let dc = new datacenter();
//opening the file
//create videos and putting in the dc
//create ep
//create rq
//create cache
//init video
//create latency
//init ep
//init rq


let p = new pizza(12,"ss");
p.filename;

(async function () {
    var data = await fs.readTextFile('./data/small.in');
    
    console.log(data.split('\n'));

    await fs.appendFile("./data/small.out", data, { flag: "w+"}) 
    // await fs.rename('/tmp/hello', '/tmp/world');
    // await fs.access('/etc/passd', fs.constants.R_OK | fs.constants.W_OK);
    // await fs.appendFile('message.txt', data);
    // await fs.unlink('/tmp/hello');
})();
