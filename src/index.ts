import { alg1 } from './alg1';
import { input } from "./input";


(async function () {

    let inputFileContents = new input('./data/sample.in');

    let sol = new alg1(inputFileContents.endpoints, inputFileContents.caches);
    sol.compute();
    sol.output();


    // var data = await fs.readTextFile('./data/small.in');
    //
    // console.log(data.split('\n'));
    //
    // await fs.appendFile("./data/small.out", data, { flag: "w+"})
    // // await fs.rename('/tmp/hello', '/tmp/world');
    // // await fs.access('/etc/passd', fs.constants.R_OK | fs.constants.W_OK);
    // // await fs.appendFile('message.txt', data);
    // // await fs.unlink('/tmp/hello');
})();
