import { request } from './request';
import { latency } from './latency';

export class endpoint {
    public latenciesGain: latency[];
    public requests: request[];
}