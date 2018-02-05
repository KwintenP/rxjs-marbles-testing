import {DataRepository} from '../repositories/data.repository';
import {debounceTime, filter, map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {async} from 'rxjs/scheduler/async';

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
            .switchMap(_ => this.dataService.getBackendData());
    }
}