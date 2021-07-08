import { Component, OnInit } from '@angular/core';
import { SpecialEvents } from './services/SpecialEvents';
import { SpecialEventsService } from './services/special-events.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  specialEvents: SpecialEvents[] = [];
  showError = false;
  loading = true;

  constructor(private specialEventsService: SpecialEventsService) { }

  ngOnInit(): void {
    this.getSpecialEventsList();
  }

  getSpecialEventsList(): void {
    this.specialEventsService.fetchSpecialEvent().subscribe(fetchedEvents => {
      this.specialEvents = fetchedEvents;
      this.showError = false;
      this.loading = false;
    }, error => {
      console.log(error);
      this.showError = true;
      this.loading = false;
    });
  }

}
