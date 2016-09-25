/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingInfoComponent } from './geo-targeting-info.component';
import { LibModule } from '../../lib.module';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { GeoTargetingInfoService } from './geo-targeting-info.service';

describe('Component: GeoTargetingInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [LibModule],
      providers: [GeoTargetingSelectedService, GeoTargetingInfoService]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingInfoComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});