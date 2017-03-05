import { latency } from './latency';
import { video } from './video';
import { endpoint } from "./endpoint";
import { cache } from "./cache";

export class alg2 {
      readonly endpoints: endpoint[];
      readonly videos:  video[];
      readonly cacheMaxSize: number;
      readonly caches: cache[];
      readonly cachesCount: number;

      public constructor(endpoints: endpoint[], videos: video[], caches: cache[], cacheMaxSize: number) {
        this.endpoints = endpoints;
        this.videos = videos;
        this.caches = caches;
        this.cacheMaxSize = cacheMaxSize;
        this.cachesCount = caches.length;
      }

      private getRandomVideoId(): number {
        return Math.floor(Math.random() * this.videos.length);
      }

      private getRandomVideoIdNoInList(videos: video[]) {

        let videoIds = videos.map( (v) => { return v.id});

        let randomVideoId = this.getRandomVideoId();

        while (videoIds.indexOf(randomVideoId) >=0 ) {
          randomVideoId = this.getRandomVideoId();
        }

        return randomVideoId;
      }

      private getRandomCache(cacheId: number, maxSize: number) : cache {
        let remainingSpace: number = maxSize;

        let newCache = new cache(cacheId, maxSize);
        
        let videoId = this.getRandomVideoIdNoInList(newCache.videos);
        let chosenVideo = this.videos[videoId];
        
        while (remainingSpace >= chosenVideo.size) {
          remainingSpace -= chosenVideo.size;
          newCache.videos.push(chosenVideo);

          // pick a New Video
          videoId = this.getRandomVideoIdNoInList(newCache.videos);
          chosenVideo = this.videos[videoId];
        }
        
        return newCache;
      }

      public compute(populationSize: number, generations: number, mutationRate: number): cache[] {

        if (populationSize < 2) {
          throw "Population too low";
        }

        let population: cache[][] = [];
        let fitness: number[] = [];
        let mutation: number = 0;

        // first generation
        for(let p=0; p< populationSize; p++) {

          // console.log(this.caches);

          population[p] = this.caches.map( (c) => { return this.getRandomCache(c.id, c.maxsize) } );

          // console.log('Element ' + p + ' ' + JSON.stringify(population[p]));

          fitness[p] = this.solutionFitness(population[p]);
          
          // console.log('Fitness: ' + JSON.stringify(fitness[p]));   
        }

        for(let g=0; g<generations; g++) {

          console.log("generation: " + g);
          //find the min fitness value
          let fitnessSorted = fitness.slice(0).sort( (a,b) => {return a - b;});
          let medianFitness = fitnessSorted[Math.floor(populationSize/2)-1];

          console.log("median Fitness: " + medianFitness);
          console.log("max Fitness: " + Math.max(...fitness));

          let newPopulation: cache[][] = [];
          let newFitness: number[] = [];

          while (newPopulation.length < populationSize) {
            
            // selecting the parents
            let parents = population.filter( (p, i) => {
              return fitness[i] >= medianFitness;
            });

            let parentId1 = Math.floor(Math.random() * parents.length),
                parentId2 = Math.floor(Math.random() * parents.length);

            // take 2 different element
            while (parentId1 === parentId2) {
              parentId2 = Math.floor(Math.random() * parents.length);
            }

            let cutTo = Math.floor(this.cachesCount * Math.random());
            let cutFrom = this.cachesCount - cutTo;

            let parent1 = parents[parentId1],
                parent2 = parents[parentId2];

            let child1 = parent1.slice(0, cutFrom).concat(parent2.slice(cutFrom)),
                child2 = parent2.slice(0, cutFrom).concat(parent1.slice(cutFrom));          
            
            if (mutation++ % 50 == mutationRate) {
              let cache1IdMutated = Math.floor(Math.random() * child1.length);
              child1[cache1IdMutated] = this.getRandomCache(cache1IdMutated, this.cacheMaxSize);

              let cache2IdMutated = Math.floor(Math.random() * child2.length);
              child2[cache2IdMutated] = this.getRandomCache(cache2IdMutated, this.cacheMaxSize);
            }

            let fit1 = this.solutionFitness(child1),
                fit2 = this.solutionFitness(child2);

            newPopulation.push(child1, child2);
            newFitness.push(fit1, fit2);

          }

          population = newPopulation;
          fitness = newFitness;
        }

        let maxFitness = Math.max(...fitness);
        let maxFitnessId = fitness.indexOf(maxFitness);

        return population[maxFitnessId];
      }

      private videoInCache(myVideoId: number, caches: cache[]): cache[] {
        return caches.filter( (c) => { return c.videoIds().indexOf(myVideoId) >= 0; });
      }

      private endpointFitness(ep: endpoint, caches: cache[]): number {
        let fit = ep.requests.map( (r) => {

          //console.log(ep);

          let linkedCaches = ep.latenciesGain.map( (lg) => {
            //console.log("cacheId " + lg.cacheId + JSON.stringify(caches));
            return caches[lg.cacheId];
          })
          //console.log ("linkedCaches :" + JSON.stringify(linkedCaches));

          let videoCaches = this.videoInCache(r.video.id, linkedCaches);

          let videoLatencyGains = videoCaches.map( (vc) => {
            return ep.latenciesGain.find( (l) => { return l.cacheId === vc.id; } ) || new latency(0,-1);
          }).map( (l) => {
            return l.time;
          });

          let videoLatencyGain = Math.max(0, ...videoLatencyGains);

          // console.log("r: " + r.videoId + " " + videoLatencyGain);

          return videoLatencyGain * r.count;
        }).reduce( (a,b) => {
          return a + b;
        });

        return fit;
      }

      private solutionFitness(caches: cache[]): number {
        let fit = this.endpoints.map( (ep) => {
          return this.endpointFitness(ep, caches);
        }).reduce( (a,b) => {
          return a + b;
        });

        return fit;
      }   
}