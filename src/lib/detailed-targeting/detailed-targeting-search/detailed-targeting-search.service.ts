import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

declare interface DataInterface {
  isVisible: boolean;
  type: string;
}

@Injectable()
export class DetailedTargetingSearchService {

  _data = new Subject<DataInterface>();
  data  = this._data.asObservable();

  update (data: DataInterface) {
    this._data.next({
      isVisible: data.isVisible,
      type:      data.type
    });
  };

  constructor () { }

}
