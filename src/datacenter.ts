import { video } from './video';

export class datacenter {
    public id: number;
    public videos: video[];

    constructor(videos: video[]) {
        this.id = -1;
        this.videos = videos;
    }
}