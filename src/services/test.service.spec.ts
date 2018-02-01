import {TestService} from './test.service';
import {DataRepository} from '../repositories/data.repository';
import {marbles} from 'rxjs-marbles';
import Mock = jest.Mock;
import {animationFrame} from 'rxjs/scheduler/animationFrame';

describe('TestService', () => {
    let testService: TestService;
    let dataService: DataRepository;

    beforeEach(() => {
        dataService = {
            getData: jest.fn()
        };

        testService = new TestService(dataService);
    });
    describe('getDataAndFilterNonVisibles', () => {
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

            const result$ = testService.getDataAndFilterNonVisibles();

            m.expect(result$.do(console.log)).toBeObservable(result, values);
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