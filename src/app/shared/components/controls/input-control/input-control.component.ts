import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss']
})
export class InputControlComponent implements OnInit, AfterViewInit {
  public makeItReadonly: boolean = true;

  @Input() public control: AbstractControl;
  @Input() public type = 'text';
  @Input() public label: string;
  @Input() public message: string;
  @Input() public isAutoFocus: boolean;
  @Input() public disabled: boolean;
  @Input() public isErrored: boolean;
  @Input() public isAutocompleteOff: boolean = false;

  @ViewChild('input') inputField: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.isAutoFocus) {
      if (!this.isAutocompleteOff) {
        this.inputField.nativeElement.focus();
      } else {
        setTimeout(() => {
          this.inputField.nativeElement.focus();
        }, 100);
      }
    }
  }

  get isFocused(): boolean {
    return Boolean(this.control.value) ;
  }

  handleFocus() {
    if (this.isAutocompleteOff) this.makeItReadonly = false;
  }

}
