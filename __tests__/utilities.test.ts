import { OSUtilities } from "../src/utilities/osUtilities";

describe('testing OS utilities file', () => {
    test('Number of available CPUs greater than 0', () => {
        expect(OSUtilities.getNumberOfCPUBasic()).toBeGreaterThan(0);
    });
});