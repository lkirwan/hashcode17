import "mocha";
import {input} from "../src/input";
import {cache} from "../src/cache";
import {expect} from "chai";

const fileNameSample = "data/sample.in";


describe("Test input.ts Constructor against file sample.in", () => {

    let result = new input(fileNameSample);
    // console.log(JSON.stringify(result));


    it ("Verify fileLines are read as expected", () => {
        let expectedResult = [  "5 2 4 3 100",
                                "50 50 80 30 110",
                                "1000 3",
                                "0 100",
                                "2 200",
                                "1 300",
                                "500 0",
                                "3 0 1500",
                                "0 1 1000",
                                "4 0 500",
                                "1 0 1000" ];
        expect(result.getFileLines).to.eql(expectedResult);
    });


    it ("Verify caches are read as expected", () => {
        let expectedResult = [  new cache(0, 100),
                                new cache(1, 100),
                                new cache(2, 100)
        ];
        expect(result.caches).to.eql(expectedResult);
    });

    it ("Verify _?_ are read as expected", () => {
        // throw new Error("test remaining scenarios!");
    });

});