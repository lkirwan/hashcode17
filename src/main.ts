import { endpoint } from "./endpoint";
import { cache } from "./cache";
import { alg1 } from "./alg1";
import { input } from "./input";

let inputData = new input("./data/kittens.in");

let caches: cache[] = inputData.caches;
// let cacheSize = inputData.cacheSize;
let endpoints: endpoint[] = inputData.endpoints;

let alg = new alg1(endpoints, caches);
alg.compute();
alg.output();
