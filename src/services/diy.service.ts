import {DataRepository} from '../repositories/data.repository';
import {debounceTime, filter, map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {async} from 'rxjs/scheduler/async';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class DiyService {

    constructor(private dataRepository: DataRepository) {
    }

    getData() {
        return this.dataRepository.getData();
    }

    // Passing streams to methods is not a good idea,
    // this is just for demonstration purposes
    filterData(filter$: Observable<string>) {
        return filter$
            .pipe(
                switchMap(dataFilter => this.dataRepository.getDataWithFilter(dataFilter))
            );
    }

    // Passing streams to methods is not a good idea,
    // this is just for demonstration purposes
    filterAndPageData(filter$: Observable<string>, page$: Observable<number>) {
        return combineLatest(filter$, page$, (filter, page) => ({filter, page}))
            .pipe(
                switchMap(dataFilter => this.dataRepository.getDataWithFilter(dataFilter))
            );
    }

    // Passing streams to methods is not a good idea,
    // this is just for demonstration purposes
    filterAndPageDataWithDebounce(filter$: Observable<string>, page$: Observable<number>, time: number, scheduler = async) {
        return combineLatest(filter$, page$, (filter, page) => ({filter, page}))
            .pipe(
                debounceTime(time, scheduler),
                switchMap(dataFilter => this.dataRepository.getDataWithFilter(dataFilter))
            );
    }

    // Passing streams to methods is not a good idea,
    // this is just for demonstration purposes
    refreshTheData(click$: Observable<string>, swipe$: Observable<string>) {
        return click$.merge(swipe$)
            .startWith(undefined)
            .switchMap(_ => this.dataRepository.getData());
    }

    filterOutValues() {
        const numbers$: Observable<number> = this.dataRepository.getStreamOfNumbers();

        return numbers$.filter(x => x % 2 === 0);
    }

    // TODO: Multiply all the number events by two
    multiplyAllValuesByTwo() {
        const numbers$: Observable<number> = this.dataRepository.getStreamOfNumbers();

        return numbers$.map(x => x * 2);
    }

    // TODO: Every event is an array of numbers. Modify the event so the array only contains even numbers.
    filterOutValuesOfArray(): Observable<Array<number>> {
        const array$: Observable<Array<number>> = this.dataRepository.getStreamOfArrayWithNumbers();

        return array$.map(arr => arr.filter(x => x % 2 === 0));
    }

    // TODO: Every event is an array of numbers. Modify the event so every number in the array is multiplied by two.
    multiplyAllValuesByTwoOfArray(): Observable<Array<number>> {
        const array$: Observable<Array<number>> = this.dataRepository.getStreamOfArrayWithNumbers();

        return array$.map(arr => arr.map(x => x * 2));
    }

    reduxClone(source$, items) {
        return source$
            .scan((acc, curr) => {
                if(curr.type === 'INITIAL'){
                    return acc;
                } else if(curr.type === 'ADD') {
                    return [...acc, curr.item];
                } else if(curr.type === 'REMOVE') {
                    return acc.filter(item => item !== curr.item);
                }
                return acc;
            }, items);
    }
}