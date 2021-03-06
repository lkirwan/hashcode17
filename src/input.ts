/// <reference path="../node_modules/@types/node/index.d.ts" />

import { cache } from "./cache";
import { latency } from "./latency";
import { request } from "./request";
import { endpoint } from "./endpoint";
import { video } from "./video";
import * as fs from "fs";

export class input {
    private filename: string;
    private fileLines: string[] = [];

    private videosCount: number;
    public videos: video[] = [];

    private endpointsCount: number;
    public endpoints: endpoint[] = [];

    private requestsCount: number;

    public cacheSize: number;
    private cachesCount: number;
    public caches: cache[] = [];

    constructor(filename: string) {
        this.filename = filename;

        this.read();

        let lineNumber = this.parse1stLine();
        lineNumber = this.parseVideos(lineNumber);
        lineNumber = this.parseEndpoints(lineNumber);
        lineNumber = this.parseRequests(lineNumber);
    }

    private read(): void {
        let fileContent = fs.readFileSync(this.filename);
        this.fileLines = fileContent.toString().split("\n");
    }

    private parseLine(line: string): number[] {
        return line.split(" ").map( (v) => { return parseInt(v, 10); });
    }

    private parse1stLine(): number {
        let [ videosCount, endpointsCount, requestsCount, cachesCount, cacheSize ] = this.parseLine( this.fileLines[0] );

        this.videosCount = videosCount;
        this.endpointsCount = endpointsCount;
        this.requestsCount = requestsCount;
        this.cachesCount = cachesCount;
        this.cacheSize = cacheSize;

        for (let i=0; i<cachesCount; i++) {
            this.caches[i] = new cache(i,cacheSize);
        }

        return 1;
    }

    private parseVideos(lineNumber: number): number {

        let lineData = this.parseLine( this.fileLines[lineNumber++] );

        lineData.forEach(
            (size, i) => {
                this.videos.push(new video(i, size));
            }
        );

        return lineNumber;
    }

    private parseEndpoints(lineNumber: number): number {

        for (let ep = 0; ep < this.endpointsCount; ep++) {

            let newEndpoint = new endpoint(ep);

            let [endpointLatency, endpointCaches] = this.parseLine( this.fileLines[lineNumber++] );

            for (let endpointCache = 0; endpointCache < endpointCaches; endpointCache++) {
                let [cacheId, cacheLatency] = this.parseLine( this.fileLines[lineNumber++] );
                newEndpoint.latenciesGain.push(new latency(endpointLatency-cacheLatency, cacheId));
            }

            this.endpoints[ep] = newEndpoint;
        }

        return lineNumber;
    }

    private parseRequests(lineNumber: number): number {

        for (let rq = 0; rq < this.requestsCount; rq++) {

            let [videoId, endpointId, requestCount] = this.parseLine( this.fileLines[lineNumber++] );

            this.endpoints[endpointId].requests.push(new request(requestCount, this.videos[videoId]));
        }

        return lineNumber;
    }


    get getFileLines(): string[] {
        return this.fileLines;
    }
}