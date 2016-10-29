import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingInfoService } from './geo-targeting-info.service';
import { AppState } from '../../../app/reducers/index';
import { Store } from '@ngrx/store';

@Component({
  selector:        'geo-targeting-info',
  templateUrl:     './geo-targeting-info.component.html',
  styleUrls:       ['./geo-targeting-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTargetingInfoComponent implements OnInit, OnDestroy {

  model$;

  hideInfo () {
    this.geoTargetingInfoService.hideInfo();
  }

  undoChange () {
    this.geoTargetingSelectedService.update(
      this.geoTargetingSelectedService.getPrevItems()
    );
    this.hideInfo();
  }

  constructor (private _store: Store<AppState>,
               private geoTargetingSelectedService: GeoTargetingSelectedService,
               private geoTargetingInfoService: GeoTargetingInfoService) {
    this.model$ = this._store.let(GeoTargetingInfoService.getModel);
  }

  ngOnDestroy () {}

  ngOnInit () {
    // TODO: Translate message on language change
  }

}
