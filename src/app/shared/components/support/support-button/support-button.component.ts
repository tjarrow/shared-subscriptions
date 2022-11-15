import { Component, OnInit } from '@angular/core';
import { trigger, keyframes, style, animate, transition } from '@angular/animations';
import { Store, Select } from '@ngxs/store';
import { ShowSupportForm, CloseSupportForm } from '@store/app/app.actions';
import { Observable } from 'rxjs';
import { AppGetterState } from '@store/app/app-getter.state';

@Component({
  selector: 'app-support-button',
  templateUrl: './support-button.component.html',
  styleUrls: ['./support-button.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0, transform: 'translateY(100px)' }),
        animate('.3s', keyframes([
          style({ height: 0, opacity: 0, transform: 'translateY(100px)', offset: 0 }),
          style({ height: '*', opacity: 0, transform: 'translateY(100px)', offset: 0.66 }),
          style({ height: '*', opacity: 1, transform: 'translateY(0)', offset: 1 })
        ]))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('.3s', keyframes([
          style({ height: '*', opacity: 1, transform: 'translateY(0)', offset: 0 }),
          style({ height: '*', opacity: 0, transform: 'translateY(0)', offset: 0.33 }),
          style({ height: 0, opacity: 0, transform: 'translateY(100px)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class SupportButtonComponent implements OnInit {
  @Select(AppGetterState.isSupportFormShown) isSupportFormShown$: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  showModal(e: MouseEvent) {
    e.preventDefault();
    this.store.dispatch(new ShowSupportForm());
  }

  handleCloseSupportForm() {
    this.store.dispatch(new CloseSupportForm());
  }

}
