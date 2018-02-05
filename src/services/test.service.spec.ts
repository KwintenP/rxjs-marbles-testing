import {TestService} from './test.service';
import {DataRepository} from '../repositories/data.repository';
import {marbles} from 'rxjs-marbles';
import Mock = jest.Mock;
import {animationFrame} from 'rxjs/scheduler/animationFrame';

describe('TestService', () => {
    let testService: TestService;
    let dataService;

    beforeEach(() => {
        dataService = {
            getData: jest.fn(),
            getById: jest.fn(),
            getDataWithFilter: jest.fn(),
        };

        testService = new TestService(dataService);
    });
    describe('getDataAndFilterNonVisible', () => {
        it('should filter out all the non visibles from the backend', marbles((m) => {
            const kwinten = {visible: true, name: 'Kwinten'};
            const brecht = {visible: false, name: 'Brecht'};
            const values = {
                a: {
                    json: () => {
                        return [kwinten, brecht];
                    }
                },
                r: [kwinten]
            };
            // @formatter:off
            const data$ =    m.cold('-----a|', values);
            const result =          '-----r|';
            // @formatter:on
            (dataService.getData as Mock).mockReturnValue(data$);

            const result$ = testService.getDataAndFilterNonVisible();

            m.expect(result$.do(console.log)).toBeObservable(result, values);
        }));
    });

    describe('getById', () => {
        it('should return a stream with data based on the id', marbles((m) => {
            // @formatter:off
            const id$ =             m.cold('-----a--b--------');
            const a =               m.cold('----r|');
            const sub1 =                  '     ^--!';
            const sub2 =                  '        ^----!';
            const result =                 '------------r-----';
            // @formatter:on
            (dataService.getById as Mock).mockReturnValue(a);

            const result$ = testService.fetDataById(id$);

            m.expect(result$).toBeObservable(result);
            m.expect(a).toHaveSubscriptions([sub1, sub2]);
        }));
    });

    describe('simple examples', () => {
        it('demonstrating merge', marbles((m) => {
            // @formatter:off
            const obs1 =    m.cold('-a----b-|');
            const obs2 =    m.cold('----c---d-|');
            const expected =       '-a--c-b-d-|';
            // @formatter:on

            const result$ = obs1.merge(obs2);

            m.expect(result$).toBeObservable(expected);
        }));
    });

    describe('timing examples', () => {
        it('demonstrating debounceTime', marbles((m) => {
            // @formatter:off
            const obs1 =    m.cold('-a----b------|');
            const expected =       '-----------b-|';
            // @formatter:on

            const result$ = obs1.debounceTime(50, m.scheduler);

            m.expect(result$).toBeObservable(expected);
        }));
    });
});