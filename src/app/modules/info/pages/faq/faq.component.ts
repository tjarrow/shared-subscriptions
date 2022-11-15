import { Component, OnInit } from '@angular/core';
import { FaqList, FaqItem } from '@core/models/faq-list.models'
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [
    trigger('toggleItem', [
      state('in', style({ height: '*' })),
      state('out', style({ height: '0' })),
      transition('in <=> out', animate('250ms ease'))
    ])
  ],
})
export class FaqComponent implements OnInit {
  public faqList: FaqItem[] = FaqList;
  public activeFaqIndex: number;

  constructor() {}

  ngOnInit(): void {}

  activateFaqIndex(index: number) {
    if (this.activeFaqIndex !== index) {
      this.activeFaqIndex = index;
    }
  }

  deactivateFaqIndex(e: MouseEvent, index: number) {
    e.stopPropagation();

    if (this.activeFaqIndex === index) {
      this.activeFaqIndex = -1;
    } else {
      this.activeFaqIndex = index;
    }
  }

}
