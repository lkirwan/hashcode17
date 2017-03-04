import { cache } from './cache';
import { endpoint } from './endpoint';

export class alg1 {

    public endpoints: endpoint[];
    public caches: cache[];

    constructor(endpoints: endpoint[], caches: cache[]) {

        endpoints.forEach( (ep) => {
            ep.latenciesGain.sort((a,b) => {
                return b.time - a.time;
            });
            ep.requests.sort((a,b) => {
                return b.count - a.count;
            });
        });

// console.log(JSON.stringify(endpoints));

        this.endpoints = endpoints;
        this.caches = caches;
    }

    getMostRequestedVideo = (): number => {

        //Getting the most requested video
        let requests = this.endpoints.map( (ep) => { return  { epId: ep.id, req: ep.getNextRequest() }; } )
            .filter( (a) => { return a.req.count > 0 })
            .sort((a,b) => {
                return b.req.count - a.req.count;
            });

        // console.log(JSON.stringify(requests));

        if (requests.length > 0) {
            let mostRequest = requests[0];

            let ep = this.endpoints.find( (ep) => { return (ep.id == mostRequest.epId) });
            if (ep == undefined) {
                //Should not happend
                return -1;
            }

            // console.log(JSON.stringify(ep));
            //request matched!
            ep.requestIndex++;
            let video = mostRequest.req.video;

// console.log (JSON.stringify(this.caches));

            for(let i=0; i< ep.latenciesGain.length; i++) {

                //Check the cache
                let cache = ep.latenciesGain[i].source;

                //Search for the video in the cache
                let videoInCache = cache.videos.find( (v) => { return (v.id == video.id); });

                // console.log('v' + video.id + ' c ' + cache.id);
                //If not found 
                if (videoInCache == undefined) {

                    //Check if it could be cached
                    if (cache.remainingSpace() >= video.size) 
                    {
                        cache.videos.push(video);
                    } else {
                        //if not search for another cache
                        continue;
                    }
                }

                //If found and no caccontinue whit the next request
                return 1;
            }

            return 0;
        }

        return -1;
    }

    public compute = (): void => {
     
        while (this.getMostRequestedVideo() >= 0) {
        }
    }

    public output = (): string[] => {
        let cacheUsed = this.caches.filter( (c) => { return c.videoSize() > 0; });

        let outputLines:string[] = [cacheUsed.length.toString()];
        cacheUsed.forEach( (c) => {
            let items = c.id + ` ` + c.videos.map( (v) => { return v.id.toString() }) .reduce( (a, b) => { return a + ` ` + b; });
            outputLines.push(items);
        });

        return outputLines;
    }
}

