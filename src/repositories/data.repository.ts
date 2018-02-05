import {Observable} from 'rxjs/Observable';

export class DataRepository {
    getData() {
        return Observable.of({
            response: () => {
                return [{visible: true, name: 'Kwinten'}, {visible: false, name: 'Brecht'}]
            }
        });
    }

    getDataWithFilter(filter: {filter: string, page: number}) {
        return Observable.of({
            response: () => {
                return [{visible: true, name: 'Kwinten'}, {visible: false, name: 'Brecht'}]
            }
        });
    }

    getById(id) {
        return Observable.of(id);
    }

    getStreamOfNumbers() {
        return Observable.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
    }

    getStreamOfArrayWithNumbers() {
        return Observable.of([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }

}