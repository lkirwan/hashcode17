import { video } from './video';
import { datacenter } from './datacenter';

export class cache extends datacenter {
    public maxsize: number;

    constructor(id: number, maxsize:number, videos: video[]) {
        super(videos);
        this.id = id;
        this.maxsize= maxsize;
    }
}