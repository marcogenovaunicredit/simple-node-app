import { OSUtilities } from "../src/utilities/osUtilities";
import { TimeUtilities } from '../src/utilities/time.utilities';

describe('testing OS utilities file', () => {
    test('Number of available CPUs greater than 0', () => {
        expect(OSUtilities.getNumberOfCPUBasic()).toBeGreaterThan(0);
    });
});

describe('testing Date\Time utilities file', () => {
    test('Not empty Timestamp ISO string', () => {
        expect(TimeUtilities.getTimestampAsString()).not.toBeNull();
    });
});