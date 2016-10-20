import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DetailedTargetingDropdownSuggestedService } from './detailed-targeting-dropdown-suggested.service';
import { DetailedTargetingItem } from '../detailed-targeting-item';
import { DetailedTargetingInfoService } from '../detailed-targeting-info/detailed-targeting-info.service';
import { DetailedTargetingSelectedService } from '../detailed-targeting-selected/detailed-targeting-selected.service';
import { DetailedTargetingModeService } from '../detailed-targeting-mode/detailed-targeting-mode.service';
import { DetailedTargetingApiService } from '../detailed-targeting-api/detailed-targeting-api.service';
import { DetailedTargetingInputService } from '../detailed-targeting-input/detailed-targeting-input.service';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector:        'detailed-targeting-dropdown-suggested',
  templateUrl:     'detailed-targeting-dropdown-suggested.component.html',
  styleUrls:       ['detailed-targeting-dropdown-suggested.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailedTargetingDropdownSuggestedComponent implements OnInit {

  items: DetailedTargetingItem[];
  mode;
  activeInfo;

  /**
   * Trigger change detection mechanism that updates component's template
   */
  updateTemplate () {
    this.ref.detach();
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  suggest (targetingList: Array<Object> = []) {
    this.detailedTargetingApiService.suggest(targetingList);
  }

  constructor (private detailedTargetingDropdownSuggestedService: DetailedTargetingDropdownSuggestedService,
               private detailedTargetingInfoService: DetailedTargetingInfoService,
               private detailedTargetingSelectedService: DetailedTargetingSelectedService,
               private detailedTargetingModeService: DetailedTargetingModeService,
               private detailedTargetingApiService: DetailedTargetingApiService,
               private detailedTargetingInputService: DetailedTargetingInputService,
               private translateService: TranslateService,
               private ref: ChangeDetectorRef) {
  }

  setDropdownInfoItem (item: DetailedTargetingItem) {
    this.detailedTargetingInfoService.update(item);
  }

  selectItem (item: DetailedTargetingItem) {
    let selectedItems = this.detailedTargetingSelectedService.get();

    let selectedItemsFiltered = selectedItems.filter(selected => {
      return selected.type === item.type && selected.id === item.id;
    });

    let alreadyAdded: boolean = Boolean(selectedItemsFiltered.length);

    if (!alreadyAdded) {
      selectedItems.push(item);
    }

    this.detailedTargetingInputService.setTerm('');

    this.detailedTargetingSelectedService.updateSelected(selectedItems);
  }

  ngOnInit () {
    this.detailedTargetingDropdownSuggestedService.items.subscribe(items => {
      this.items = items;

      this.updateTemplate();
    });

    this.detailedTargetingModeService.mode.subscribe((mode: string) => {
      this.mode = mode;

      this.updateTemplate();
    });

    /**
     * Load suggested items when list of selected items changes
     */
    this.detailedTargetingSelectedService.items
        .filter(items => items.length > 0)
        .map((items: DetailedTargetingItem[]) => {
          return items.map(item => {
            return {
              id:   item.id,
              type: item.type
            };
          });
        })
        .subscribe((targetingList: Array<Object>) => {
          if (this.detailedTargetingModeService.get() === 'search') {
            this.detailedTargetingModeService.set('suggested');
          }
          this.suggest(targetingList);

          this.updateTemplate();
        });

    /**
     * Indicate that info is open. Needed to set proper border-radius to dropdown.
     */
    this.detailedTargetingInfoService.item.subscribe((item: DetailedTargetingItem) => {
      this.activeInfo = Boolean(item);
      this.updateTemplate();
    });

    /**
     * Load suggestions on first init
     */
    this.detailedTargetingApiService.suggest();

    /**
     * Load suggestions when language changes
     */
    this.translateService.onLangChange.subscribe(() => {
      this.detailedTargetingApiService.suggest();
    });
  }

}
