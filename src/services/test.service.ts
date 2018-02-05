import {DataRepository} from '../repositories/data.repository';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {combineLatest} from 'rxjs/observable/combineLatest';

export class TestService {

    constructor(private dataRepository: DataRepository) {
    }

    getDataAndFilterNonVisible() {
        return this.dataRepository.getData()
            .pipe(
                map(response => response.json()),
                map(data => data.filter(datum => datum.visible)),
            );
    }

    // Passing streams to methods is not a good idea,
    // this is just for demonstration purposes
    fetDataById(id$: Observable<string>) {
        return id$
            .pipe(
                switchMap(id => this.dataRepository.getById(id))
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
}