import { video } from "./video";

export class request {
    public readonly count: number;
    public readonly video: video;
    public readonly videoId: number;

    constructor(count: number, video: video) {
        this.count = count;
        this.video = video;
        this.videoId = video.id
    }
}