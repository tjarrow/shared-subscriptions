import { Component, Input, OnInit } from '@angular/core';
import { InputControlComponent } from '../input-control/input-control.component'

@Component({
  selector: 'app-validation-input-control',
  templateUrl: './validation-input-control.component.html',
  styleUrls: ['../input-control/input-control.component.scss', './validation-input-control.component.scss']
})
export class ValidationInputControlComponent extends InputControlComponent implements OnInit {
  @Input() isChecking: boolean;
  @Input() isChecked: boolean;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
