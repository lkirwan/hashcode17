import { video } from './video';
import { alg2 } from './alg2';
import { endpoint } from "./endpoint";
import { cache } from "./cache";
import { input } from "./input";
import { output } from "./output";

// npm run main -- me_at_the_zoo
let args = process.argv.slice(2);

let name = args[0] || "sample";

let INPUT_FILE_NAME = `./data/${name}.in`;
let OUTPUT_FILE_NAME = `./data/${name}.out`;

let inputData = new input(INPUT_FILE_NAME);

let caches: cache[] = inputData.caches;
let cacheSize = inputData.cacheSize;
let endpoints: endpoint[] = inputData.endpoints;
let videos: video[] = inputData.videos;

/*
let alg = new alg1(endpoints, caches);
alg.compute();
alg.output();
*/

let alg = new alg2(endpoints, videos, caches, cacheSize);
let solution = alg.compute(2, 1, 5);

new output(OUTPUT_FILE_NAME, solution);
