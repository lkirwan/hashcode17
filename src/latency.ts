import { cache } from './cache';

export class latency {
    public time: number;
    public source: cache;

    constructor(time: number, source: cache) {
        this.time = time;
        this.source = source;
    }
}