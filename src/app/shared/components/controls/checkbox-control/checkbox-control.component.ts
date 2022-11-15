import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox-control',
  templateUrl: './checkbox-control.component.html',
  styleUrls: ['./checkbox-control.component.scss']
})
export class CheckboxControlComponent implements OnInit {
  @Input() public control: AbstractControl;
  @Input() public isErrored: boolean;
  @Input() public disabled: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
