import { video } from "./video";

export class request {
    public count: number;
    public video: video;

    constructor(count: number, video: video) {
        this.count = count;
        this.video = video;
    }
}