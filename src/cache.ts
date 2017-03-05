import { video } from "./video";

export class cache {
    public readonly id: number;
    public readonly maxsize: number;
    public videos: video[];

    public videoSize(): number {
        return this.videos.map( ( v ) => v.size).reduce( (a,b) => a+b, 0);
    }

    public videoIds(): number[] {
        return this.videos.map( (v) => { return v.id; });
    }

    public remainingSpace(): number {
        return this.maxsize - this.videoSize();
    }

    constructor(id: number, maxsize:number) {
        this.id = id;
        this.maxsize= maxsize;
        this.videos = [];
    }
}