import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {numbersOfDays} from "../../filter.models";
import {NbaService} from "../../nba.service";

@Component({
  selector: 'app-days-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './days-filter.component.html',
  styleUrls: ['./days-filter.component.css']
})
export class DaysFilterComponent implements AfterViewInit {
  @ViewChild('daysSelect') daysSelect!: ElementRef;

  constructor(private nbaService: NbaService) { }

  ngAfterViewInit() {
    // Make the current option selected
    this.daysSelect.nativeElement.options.selectedIndex = numbersOfDays.findIndex(i => i === this.nbaService.numberOfDays$.value);
  }

  get numbersOfDays() {
    return numbersOfDays;
  };

  daysChange(value: string) {
    this.nbaService.numberOfDays$.next(Number(value));
  }
}
