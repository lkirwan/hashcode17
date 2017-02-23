import { request } from './request';
import { latency } from './latency';

export class endpoint {
    public latencies: latency[];
    public requests: request[];
}