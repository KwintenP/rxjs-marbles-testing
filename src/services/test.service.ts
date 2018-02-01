import {DataRepository} from '../repositories/data.repository';
import {filter, map, tap} from 'rxjs/operators';

export class TestService {

    constructor(private dataRepository: DataRepository) {
    }

    getDataAndFilterNonVisibles() {
        return this.dataRepository.getData()
            .pipe(
                map(response => response.json()),
                map(data => data.filter(datum => datum.visible)),
            );
    }
}