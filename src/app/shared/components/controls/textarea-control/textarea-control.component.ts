import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-textarea-control',
  templateUrl: './textarea-control.component.html',
  styleUrls: ['./textarea-control.component.scss']
})
export class TextareaControlComponent implements OnInit, AfterViewInit {
  @Input() public control: AbstractControl;
  @Input() public label: string;
  @Input() public message: string;
  @Input() public isAutoFocus: boolean;
  @Input() public disabled: boolean;
  @Input() public isErrored: boolean;

  @ViewChild('input') inputField: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.isAutoFocus) {
    setTimeout(() => {
      this.inputField.nativeElement.focus();
    }, 100);
    }
  }

}
