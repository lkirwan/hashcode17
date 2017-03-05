import { video } from './video';
import { alg2 } from './alg2';
import { endpoint } from "./endpoint";
import { cache } from "./cache";
import { input } from "./input";
import { output } from "./output";

const NAME = "trending_today";

const INPUT_FILE_NAME = `./data/${NAME}.in`;
const OUTPUT_FILE_NAME = `./data/${NAME}.out`;

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
let solution = alg.compute(50, 100);

 new output(OUTPUT_FILE_NAME, solution);
