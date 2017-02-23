import { latency } from './latency';
import { video } from './video';
import { cache } from './cache';
import { datacenter } from './datacenter';
import * as fs from 'async-file';
import {endpoint} from "./endpoint";
import {request} from "./request";


let readFile = async (fileName: string): Promise<string> => {
    return await fs.readTextFile(fileName); 
}


(async function () {

    let dc = new datacenter();

//opening the file

    var inputFileContents = await readFile("./data/sample.in");

//read file line 1 (sample: 5 2 4 3 100)
    let dataByLine = inputFileContents.split('\n');

    for (var i = 0; i < dataByLine.length; i++) {
        let dataLineBySpace = dataByLine[i].split(' ');

        let videoCount = parseInt(dataLineBySpace[0]);
        let endpointCount = parseInt(dataLineBySpace[1]);
        let requestCount = parseInt(dataLineBySpace[2]);
        let cacheCount = parseInt(dataLineBySpace[3]);
        let cacheMaxSize = parseInt(dataLineBySpace[4]);



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
        dataByLine = inputFileContents.split('\n');
        let videoSizes = dataByLine[i].split(' ');

//init video
        for (var i = 0; i < videos.length; i++) {
            videos[i].size = parseInt(videoSizes[i]);
        }

        for (var i = 0; i < endpointCount; i++) {

            //read file line 3 (sample: 1000 3)
            dataByLine = inputFileContents.split('\n');
            dataLineBySpace = dataByLine[i].split(' ');
            let endpointLatency = parseInt(dataLineBySpace[0]);
            let endpointCacheCount = parseInt(dataLineBySpace[1]);

            for (var j = 0; j < endpointCacheCount; j++) {

                //read next line (sample: 0 100)
                dataByLine = inputFileContents.split('\n');
                dataLineBySpace = dataByLine[i].split(' ');
                let cacheId = parseInt(dataLineBySpace[0]);
                let cacheLatency = parseInt(dataLineBySpace[1]);

                //create latency
                endpoints[i].latenciesGain[j] = new latency(endpointLatency - cacheLatency, caches[cacheId]);
            }
        }



//create rq
        for (var i = 0; i < requestCount; i++) {

            //read all remaining lines (should equal requestCount)
            // (sample: 3 0 1500) 1500 requests for video 3 coming from endpoint 0.

            dataByLine = inputFileContents.split('\n');
            dataLineBySpace = dataByLine[i].split(' ');
            let requestVideoId = parseInt(dataLineBySpace[0]);
            let requestEndpointId = parseInt(dataLineBySpace[1]);
            let requestVideoCount = parseInt(dataLineBySpace[2]);

            endpoints[requestEndpointId].requests.push(new request(requestVideoCount, videos[requestVideoId]));
        }

    }




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
