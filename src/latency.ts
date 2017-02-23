import { datacenter } from './datacenter';

export class latency {
    public time: number;
    public source: datacenter

    constructor(time: number, source: datacenter) {
        this.time = time;
        this.source = source;
    }
}