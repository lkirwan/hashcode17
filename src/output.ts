import * as fs from "fs";
import { cache } from "./cache";

export class output {

    private caches: cache[];

    constructor(filename: string, caches: cache[]) {
        let data = this.output();
        fs.appendFileSync(filename, data.join("\n"), { flag: "w+"});
    }

    private output(): string[] {
        let cacheUsed = this.caches.filter( (c) => { return c.videoSize() > 0; });

        let outputLines:string[] = [cacheUsed.length.toString()];
        cacheUsed.forEach( (c) => {
            let items = `${c.id}  ` + c.videos.map( (v) => { return v.id.toString(); }) .reduce( (a, b) => { return `${a} ${b}`; });
            outputLines.push(items);
        });

        return outputLines;
    }

}