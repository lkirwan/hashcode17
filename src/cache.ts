import { datacenter } from "./datacenter";

export class cache extends datacenter {
    public maxsize: number;

    public videoSize(): number {
        return this.videos.map( ( v ) => v.size).reduce( (a,b) => a+b, 0);
    }

    public remainingSpace(): number {
        return this.maxsize - this.videoSize();
    }

    constructor(id: number, maxsize:number) {
        super();
        this.id = id;
        this.maxsize= maxsize;
    }
}