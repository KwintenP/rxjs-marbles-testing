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
}