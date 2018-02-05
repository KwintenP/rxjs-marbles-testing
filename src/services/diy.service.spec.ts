import {marbles} from 'rxjs-marbles';
import {DiyService} from './diy.service';

describe('service: DiyService', () => {
    let service: DiyService;
    let dataService;

    beforeEach(() => {
        dataService = {
            getData: jest.fn(),
            getById: jest.fn(),
            getDataWithFilter: jest.fn(),
        };

        service = new DiyService(dataService);
    });

    describe('getData', () => {
        it('should just return the data', marbles((m) => {
            // @formatter:off
            const data$ = m.cold('-----(a|)');
            // @formatter:on

            dataService.getData.mockReturnValue(data$);

            const result$ = service.getData();

            expect(result$).toBe(data$);
        }));
    });

    describe('filterData', () => {
        it('should return a stream with data filtered and paginated correctly', marbles((m) => {
            const values = {
                a: '',
                b: 'test',
                c: 'testFilter',
                r: ''
            };
            // @formatter:off
            const filter$ =     m.cold('a--------b---------------c--------', values);
            const data$ =       m.cold('----(r|)');
            const result =             '----r--------r---------------r----';
            // @formatter:on

            dataService.getDataWithFilter.mockReturnValue(data$);

            const result$ = service.filterData(filter$);

            m.expect(result$).toBeObservable(result);
        }));
    });

    describe('filterAndPageData', () => {
        it('should return a stream with data filtered and paginated correctly', marbles((m) => {
            const values = {
                a: '',
                b: 'test',
                c: 'testFilter',
                r: ''
            };
            // @formatter:off
            const filter$ =     m.cold('a--------b---------------c--------', values);
            const page$ =       m.cold('0------1----------2---------------', values);
            const data$ =       m.cold('----(r|)');
            const result =             '----r--------r--------r------r----';
            // @formatter:on

            dataService.getDataWithFilter.mockReturnValue(data$);

            const result$ = service.filterAndPageData(filter$, page$);

            m.expect(result$).toBeObservable(result);
        }));
    });

    describe('filterAndPageDataWithDebounce', () => {
        it('should filter and page correctly with debounce', marbles((m) => {
            const values = {
                a: '',
                b: 'test',
                c: 'testFilter',
                r: ''
            };
            // @formatter:off
            const filter$ =     m.cold('a--------b---------------c--------', values);
            const page$ =       m.cold('0------1----------2---------------', values);
            const data$ =       m.cold('----(r|)');
            const result =             '-------r--------r--------r------r----';
            // @formatter:on

            dataService.getDataWithFilter.mockReturnValue(data$);

            const result$ = service.filterAndPageDataWithDebounce(filter$, page$, 30, m.scheduler);

            m.expect(result$).toBeObservable(result);
        }));
    });
});