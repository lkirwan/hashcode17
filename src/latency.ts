export class latency {
    public readonly time: number;
    public readonly cacheId: number;

    constructor(time: number, cacheId: number) {
        this.time = time;
        this.cacheId = cacheId;
    }
}