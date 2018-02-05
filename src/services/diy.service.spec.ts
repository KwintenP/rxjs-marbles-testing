import {marbles} from 'rxjs-marbles';
import {DiyService} from './diy.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

describe('service: DiyService', () => {
    let service: DiyService;
    let dataService;

    beforeEach(() => {
        dataService = {
            getData: jest.fn(),
            getById: jest.fn(),
            getDataWithFilter: jest.fn(),
            getStreamOfNumbers: jest.fn(),
            getStreamOfArrayWithNumbers: jest.fn(),
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

    describe('refreshData', () => {
        it('should fetch data based on the scroll$ and click$', marbles((m) => {
            // @formatter:off
            const click$ =  m.cold('------c---------------c-------------c');
            const swipes$ = m.cold('-------------s----------s------------');
            const result =         '----r-----r------r----------r-----------r';
            // @formatter:on

            const values = {
                r: ['this', 'is', 'the', 'backend', 'result'],
            };
            dataService.getData.mockReturnValue(m.cold('----r', values));

            const result$ = service.refreshTheData(click$, swipes$);

            m.expect(result$).toBeObservable(result, values);
        }));
    });

    describe('on filterOutValues', () => {
        it('should filter out all the odd values in the observable', marbles((m) => {
            const numbers$ = m.cold('0---1--2--345--6--7--8--9|');
            const result = '0------2---4---6-----8---|';

            dataService.getStreamOfNumbers.mockReturnValue(numbers$);

            const result$ = service.filterOutValues();

            m.expect(result$).toBeObservable(result);
        }));
    });

    describe('on multiplyAllValuesByTwo', () => {
        it('should multiply all the values in the observable by two', marbles((m) => {
            const numbers$ = m.cold('0---1--2--345--6--7--8--9|');
            const result = 'a---b--c--def--g--h--i--j|';
            dataService.getStreamOfNumbers.mockReturnValue(numbers$);

            const result$ = service.multiplyAllValuesByTwo();

            m.expect(result$).toBeObservable(result, {
                a: 0,
                b: 2,
                c: 4,
                d: 6,
                e: 8,
                f: 10,
                g: 12,
                h: 14,
                i: 16,
                j: 18,
            });
        }));
    });

    describe('on filterOutValuesOfArray', () => {
        it('should filter out all the odd values in the observable with marble testing', marbles((m) => {
            // @formatter:off
            const numbers$ = m.cold('a', {a: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]});
            const result =          'a';
            // @formatter:on

            dataService.getStreamOfArrayWithNumbers.mockReturnValue(numbers$);

            const result$ = service.filterOutValuesOfArray();

            m.expect(result$).toBeObservable(result, {a: [0, 2, 4, 6, 8]});
        }));
    });

    describe('on multiplyAllValuesByTwoOfArray', () => {
        it('should multiply all the values in the observable by two with marble testing', marbles((m) => {
            // @formatter:off
            const numbers$ = m.cold('a|', {a: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]});
            const result =          'a|';
            // @formatter:on

            dataService.getStreamOfArrayWithNumbers.mockReturnValue(numbers$);

            const result$ = service.multiplyAllValuesByTwoOfArray();

            const expectedResult = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18];
            m.expect(result$).toBeObservable(result, {a: expectedResult});
        }));
    });

    describe('reduxClone', () => {
        it('should be possible to remove and add items to an initial items', marbles((m) => {
            const first = {name: 'test'};
            const second = {name: 'test2'};
            const third = {name: 'test3'};
            const items = [first, second];

            const values = {
                a: {type: 'INITIAL'},
                b: {type: 'ADD', item: third},
                c: {type: 'REMOVE', item: second},
                d: items,
                e: [first, second, third],
                f: [first, third]
            };
            // @formatter:off
            const source =          m.hot('a------b--c--------', values);
            const result =                'd------e--f--------';
            // @formatter:on

            const result$ = service.reduxClone(source, items);

            m.expect(result$).toBeObservable(result, values);
        }));
    });

    describe('doubleClick', () => {
        it('should only allow double clicks within a certain time frame', marbles((m) => {
            // @formatter:off
            const clicks$ = m.hot('-c--c--------c-------c-c--c--------c-----c--c');
            const result =        '----d------------------d--------------------d';
            // @formatter:on

            const result$ = service.doubleClick(clicks$, 40, m.scheduler);

            m.expect(result$).toBeObservable(result, {d: ['c','c']});
        }));
    });
});