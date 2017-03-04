import 'mocha';
import {output} from "../src/output";
// import {input} from "../src/input";
// import {expect} from 'chai';

const fileNameSample = 'data/sample.out';


describe('Test output.ts Constructor pushing to sample.out', () => {

    it ('Verify output file created with correct content', () => {
        new output(fileNameSample, ['x', 'x y z']);

        // let result = new input(fileNameSample);
        // let expectedResult = [ 'x', 'x y z' ];
        // expect(result.getFileLines).to.eql(expectedResult);
    });

});