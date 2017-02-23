import { video } from './video';
import { request } from './request';
import { latency } from './latency';

export class endpoint {
    public id: number;

    //sorted
    public latenciesGain: latency[];
    
    //sorted
    public requests: request[];

    public requestIndex: number = 0;

    public getNextRequest(): request {
        return this.requests.length > this.requestIndex
        ? this.requests[this.requestIndex]
        : new request(0, new video(-1, 0));
    }

}