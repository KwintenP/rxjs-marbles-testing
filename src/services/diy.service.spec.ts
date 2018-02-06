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

        }));
    });

    describe('filterData', () => {
        it('should return a stream with data filtered and paginated correctly', marbles((m) => {

        }));
    });

    describe('filterAndPageData', () => {
        it('should return a stream with data filtered and paginated correctly', marbles((m) => {

        }));
    });

    describe('filterAndPageDataWithDebounce', () => {
        it('should filter and page correctly with debounce', marbles((m) => {

        }));
    });

    describe('refreshData', () => {
        it('should fetch data based on the scroll$ and click$', marbles((m) => {

        }));
    });

    describe('on filterOutValues', () => {
        it('should filter out all the odd values in the observable', marbles((m) => {

        }));
    });

    describe('on multiplyAllValuesByTwo', () => {
        it('should multiply all the values in the observable by two', marbles((m) => {

        }));
    });

    describe('on filterOutValuesOfArray', () => {
        it('should filter out all the odd values in the observable with marble testing', marbles((m) => {

        }));
    });

    describe('on multiplyAllValuesByTwoOfArray', () => {
        it('should multiply all the values in the observable by two with marble testing', marbles((m) => {

        }));
    });

    describe('reduxClone', () => {
        it('should be possible to remove and add items to an initial items', marbles((m) => {

        }));
    });

    describe('doubleClick', () => {
        it('should only allow double clicks within a certain time frame', marbles((m) => {

        }));
    });
});