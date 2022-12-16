"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var osUtilities_1 = require("../src/utilities/osUtilities");
describe('testing OS utilities file', function () {
    test('Number of available CPUs greater than 0', function () {
        expect(osUtilities_1.OSUtilities.getNumberOfCPUBasic()).toBeGreaterThan(0);
    });
});
