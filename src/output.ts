import * as fs from 'fs';

export class output {

    constructor(filename: string, data: string[]) {

        fs.appendFileSync(filename, data.join('\n'), { flag: "w+"});
    }
}