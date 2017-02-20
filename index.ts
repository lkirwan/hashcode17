import * as fs from 'async-file';


let readFileSync = (fileName: string): string => {
    let data = '';
    try {
        (async () => {
            data = await fs.readTextFile(fileName); 
        })
    } catch (asd) {
        console.log (asd);
    }
    
    return data;
}

let readFile = async (fileName: string): Promise<string> => {
    return await fs.readTextFile(fileName); 
}


(async function () {
    var data = await fs.readTextFile('small.in');
    
    console.log(data.split('\n'));

    await fs.appendFile("small.out", data, { flag: "w+"}) 
    // await fs.rename('/tmp/hello', '/tmp/world');
    // await fs.access('/etc/passd', fs.constants.R_OK | fs.constants.W_OK);
    // await fs.appendFile('message.txt', data);
    // await fs.unlink('/tmp/hello');
})();


