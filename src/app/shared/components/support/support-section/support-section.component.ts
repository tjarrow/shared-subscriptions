import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ShowSupportForm } from '@store/app/app.actions';

@Component({
  selector: 'app-support-section',
  templateUrl: './support-section.component.html',
  styleUrls: ['./support-section.component.scss']
})
export class SupportSectionComponent implements OnInit {
  @Input() header: string = 'Can’t find your favourite service?';
  @Input() description: string = 'Let us know!';

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  handleGetSupport() {
    this.store.dispatch(new ShowSupportForm());
  }

}
