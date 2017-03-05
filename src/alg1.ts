import { cache } from "./cache";
import { endpoint } from "./endpoint";

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

        // getting the most requested video
        let requests = this.endpoints.map( (ep) => { return  { epId: ep.id, req: ep.getNextRequest() }; } )
            .filter( (a) => { return a.req.count > 0; })
            .sort((a,b) => {
                return b.req.count - a.req.count;
            });

        // console.log(JSON.stringify(requests));

        if (requests.length > 0) {
            let mostRequest = requests[0];

            let ep = this.endpoints.find( (ep) => { return (ep.id === mostRequest.epId); });
            if (ep === undefined) {
                // should not happend
                return -1;
            }

            // console.log(JSON.stringify(ep));
            // request matched!
            ep.requestIndex++;
            let video = mostRequest.req.video;

// console.log (JSON.stringify(this.caches));

            for(let i=0; i< ep.latenciesGain.length; i++) {

                // check the cache
                let cacheId = ep.latenciesGain[i].cacheId;

                let cache = this.caches[cacheId];
                // search for the video in the cache
                let videoInCache = cache.videos.find( (v) => { return (v.id === video.id); });

                // console.log('v' + video.id + ' c ' + cache.id);
                // if not found
                if (videoInCache === undefined) {

                    // check if it could be cached
                    if (cache.remainingSpace() >= video.size) {
                        cache.videos.push(video);
                    } else {
                        // if not search for another cache
                        continue;
                    }
                }

                // if found and no caccontinue whit the next request
                return 1;
            }

            return 0;
        }

        return -1;
    }

    public compute = (): cache[] => {

        while (this.getMostRequestedVideo() >= 0) {
            continue;
         }

         return this.caches;
    }
    
}
