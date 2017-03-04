import { alg1 } from './alg1';
import { input } from "./input";
import {output} from "./output";
import * as stopwatch from 'timer-stopwatch';

const NAME = 'kittens';
const INPUT_FILE_NAME = './data/' + NAME + '.in';
const OUTPUT_FILE_NAME = './data/' + NAME + '.out';


(async function () {

    let timer = new stopwatch();

    timer.start();
    console.log("~~~ read from file: "+ INPUT_FILE_NAME);
    let inputFileContents = new input(INPUT_FILE_NAME);
    console.log('total time: ' + timer.ms + ' ms');

    let sol = new alg1(inputFileContents.endpoints, inputFileContents.caches);
    sol.compute();
    console.log("~~~ write to file: " + OUTPUT_FILE_NAME);
    new output(OUTPUT_FILE_NAME, sol.output());
    timer.stop();
    console.log('total time: ' + timer.ms + ' ms');

})();
