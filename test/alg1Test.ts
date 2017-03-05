import "mocha";
import {alg1} from "../src/alg1";
import {cache} from "../src/cache";
import {expect} from "chai";
import {endpoint} from "../src/endpoint";



describe("Test alg1 processes content as expected", () => {

    let endpoints = [   new endpoint(0) ];
    // TODO: populate 'endpoints' with the following:
    // {"endpoints":[{"requestIndex":3,"id":0,"latenciesGain":[{"time":900,"source":{"videos":[{"id":3,"size":30},{"id":1,"size":50}],"id":0,"maxsize":100}},{"time":800,"source":{"videos":[],"id":2,"maxsize":100}},{"time":700,"source":{"videos":[],"id":1,"maxsize":100}}],"requests":[{"count":1500,"video":{"id":3,"size":30}},{"count":1000,"video":{"id":1,"size":50}},{"count":500,"video":{"id":4,"size":110}}]},{"requestIndex":1,"id":1,"latenciesGain":[],"requests":[{"count":1000,"video":{"id":0,"size":50}}]}],"caches":[{"videos":[{"id":3,"size":30},{"id":1,"size":50}],"id":0,"maxsize":100},{"videos":[],"id":1,"maxsize":100},{"videos":[],"id":2,"maxsize":100}]}

    let caches = [  new cache(0, 100),
                    new cache(1, 100),
                    new cache(2, 100)];
    let alg = new alg1(endpoints, caches);

    it ("Verify output function returns expected content", () => {
        // let expectedResult = [ '1', '0 3 1' ];
        let expectedResult = [ "0" ];
        expect(alg.output()).to.eql(expectedResult);
    });

});