import { alg1 } from './alg1';
import { latency } from './latency';
import { video } from './video';
import { cache } from './cache';
// import { datacenter } from './datacenter';
import * as fs from 'async-file';
import {endpoint} from "./endpoint";
import {request} from "./request";


let readFile = async (fileName: string): Promise<string> => {
    return await fs.readTextFile(fileName); 
}


(async function () {

    // let dc = new datacenter();

//opening the file

    var inputFileContents = await readFile("./data/sample.in");

//read file line 1 (sample: 5 2 4 3 100)
    let dataByLine = inputFileContents.split('\n');

    // for (var i = 0; i < dataByLine.length; i++) {
    let dataLineBySpace = dataByLine[0].split(' ');

        let videoCount = parseInt(dataLineBySpace[0]);
        let endpointCount = parseInt(dataLineBySpace[1]);
        let requestCount = parseInt(dataLineBySpace[2]);
        let cacheCount = parseInt(dataLineBySpace[3]);
        let cacheMaxSize = parseInt(dataLineBySpace[4]);



//create videos and putting in the dc
        let videos = [];
        for (let i = 0; i < videoCount; i++) {
            videos.push(new video(i));
        }

//create ep
        let endpoints = [];
        for (let i = 0; i < endpointCount; i++) {
            endpoints[i] = new endpoint(i);
        }


//create rq (see below)

//create cache
        let caches = [];
        for (let i = 0; i < cacheCount; i++) {
            caches[i] = new cache(i, cacheMaxSize);
        }

//read file line 2 (sample: 50 50 80 30 110)
        let videoSizes = dataByLine[1].split(' ');

//init video
        for (let i = 0; i < videos.length; i++) {
            videos[i].size = parseInt(videoSizes[i]);
        }

        let lineCount = 2;

        for (; lineCount < endpointCount + 2; lineCount++) {

            //read file line 3 (sample: 1000 3)
            // dataByLine = inputFileContents.split('\n');
            dataLineBySpace = dataByLine[lineCount].split(' ');
            let endpointLatency = parseInt(dataLineBySpace[0]);
            let endpointCacheCount = parseInt(dataLineBySpace[1]);

            lineCount++
            for (let j = 0; j < endpointCacheCount; j++, lineCount++) {

                //read next line (sample: 0 100)
                // dataByLine = inputFileContents.split('\n');
                dataLineBySpace = dataByLine[lineCount].split(' ');
                console.log(dataLineBySpace);
                let cacheId = parseInt(dataLineBySpace[0]);
                let cacheLatency = parseInt(dataLineBySpace[1]);

                //create latency
                endpoints[lineCount].latenciesGain[j] = new latency(endpointLatency - cacheLatency, caches[cacheId]);
            }
        }



//create rq
        for (let i = 2; i < 2 + requestCount; i++) {

            //read all remaining lines (should equal requestCount)
            // (sample: 3 0 1500) 1500 requests for video 3 coming from endpoint 0.

            //dataByLine = inputFileContents.split('\n');
            dataLineBySpace = dataByLine[i].split(' ');
            let requestVideoId = parseInt(dataLineBySpace[0]);
            let requestEndpointId = parseInt(dataLineBySpace[1]);
            let requestVideoCount = parseInt(dataLineBySpace[2]);

            console.log(dataByLine);
            // console.log(endpoints);
            console.log(requestEndpointId);
            endpoints[requestEndpointId].requests.push(new request(requestVideoCount, videos[requestVideoId]));
        }

    // }


let sol = new alg1(endpoints, caches);

sol.compute();
sol.output();


    // var data = await fs.readTextFile('./data/small.in');
    //
    // console.log(data.split('\n'));
    //
    // await fs.appendFile("./data/small.out", data, { flag: "w+"})
    // // await fs.rename('/tmp/hello', '/tmp/world');
    // // await fs.access('/etc/passd', fs.constants.R_OK | fs.constants.W_OK);
    // // await fs.appendFile('message.txt', data);
    // // await fs.unlink('/tmp/hello');
})();
