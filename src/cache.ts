import { video } from "./video";

export class cache {
    public id: number;
    public videos: video[] = [];

    public maxsize: number;

    public videoSize(): number {
        return this.videos.map( ( v ) => v.size).reduce( (a,b) => a+b, 0);
    }

    public remainingSpace(): number {
        return this.maxsize - this.videoSize();
    }

    constructor(id: number, maxsize:number) {
        this.id = id;
        this.maxsize= maxsize;
    }
}