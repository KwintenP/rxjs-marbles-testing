import {TestService} from './test.service';

describe('test', () => {
    describe('test', () => {
        it('should do something', () => {
            expect(new TestService().getData()).toBe('test');
        });
    });
});