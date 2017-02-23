import { latency } from './latency';
import { video } from './video';
import { cache } from './cache';
import { datacenter } from './datacenter';
import * as fs from 'async-file';
import {endpoint} from "./endpoint";
import {request} from "./request";

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
//read file line 1 (sample: 5 2 4 3 100)
let videoCount = 5;
let endpointCount = 2;
let requestCount = 4;
let cacheCount = 3;
let cacheMaxSize = 100;

//create videos and putting in the dc
let videos = [];
for (var i = 0; i < videoCount; i++) {
    videos.push(new video(i));
}

//create ep
let endpoints = [];
for (var i = 0; i < endpointCount; i++) {
    endpoints[i] = new endpoint();
}

//create rq (see below)

//create cache
let caches = [];
for (var i = 0; i < cacheCount; i++) {
    caches[i] = new cache(i, cacheMaxSize);
}

//read file line 2 (sample: 50 50 80 30 110)
let videoSizes = [50, 50, 80, 30, 110];

//init video
for (var i = 0; i < videos.length; i++) {
    videos[i].size = videoSizes[i];
}

for (var i = 0; i < endpointCount; i++) {

    //read file line 3 (sample: 1000 3)
    let endpointLatency = 1000;
    let endpointCacheCount = 3;
    //read file line 7 (sample: 500 0)
    // let endpointLatency = 500;
    // let endpointCacheCount = 0;

    for (var j = 0; j < endpointCacheCount; j++) {

        //read next line (sample: 0 100)
        let cacheId = 0;
        let cacheLatency = 100;
        //read next line (sample: 2 200)
        // let cacheId = 2;
        // let latency = 200;
        //read next line (sample: 1 300)
        // let cacheId = 1;
        // let latency = 300;

        //create latency
        endpoints[i].latenciesGain[j] = new latency(endpointLatency - cacheLatency, caches[cacheId]);
    }
}



//create rq
for (var i = 0; i < requestCount; i++) {

    //read all remaining lines (should equal requestCount)
    // (sample: 3 0 1500) 1500 requests for video 3 coming from endpoint 0.
    let requestVideoId = 3;
    let requestEndpointId = 0;
    let requestVideoCount = 1500;
    // (sample: 0 1 1000)
    // (sample: 4 0 500)
    // (sample: 1 0 1000)

    endpoints[requestEndpointId].requests.push(new request(requestVideoCount, videos[requestVideoId]));
}






//init ep
//init rq


(async function () {
    var data = await fs.readTextFile('./data/small.in');
    
    console.log(data.split('\n'));

    await fs.appendFile("./data/small.out", data, { flag: "w+"}) 
    // await fs.rename('/tmp/hello', '/tmp/world');
    // await fs.access('/etc/passd', fs.constants.R_OK | fs.constants.W_OK);
    // await fs.appendFile('message.txt', data);
    // await fs.unlink('/tmp/hello');
})();
