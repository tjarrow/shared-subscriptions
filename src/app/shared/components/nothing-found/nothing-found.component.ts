import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nothing-found',
  templateUrl: './nothing-found.component.html',
  styleUrls: ['./nothing-found.component.scss']
})
export class NothingFoundComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() ctaButtonText: string = 'Notify Me!';
  @Output() onCtaButtonClick: EventEmitter<null> = new EventEmitter<null>();

  constructor() { }

  ngOnInit(): void {
  }

  handleNotifyMe() {
    this.onCtaButtonClick.emit();
  }

}
