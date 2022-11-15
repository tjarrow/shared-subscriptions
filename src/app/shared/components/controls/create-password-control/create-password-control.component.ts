import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-create-password-control',
  templateUrl: './create-password-control.component.html',
  styleUrls: ['../input-control/input-control.component.scss', '../password-control/password-control.component.scss', './create-password-control.component.scss']
})
export class CreatePasswordControlComponent implements OnInit {
  public isPasswordVisible: boolean;
  public isRepeatPasswordFocused: boolean;
  public passwordConfirmation: string;

  @Input() public control: AbstractControl;
  @Input() public label: string;
  @Input() public disabled: boolean;
  @Output() public onChangePasswordVisability: EventEmitter<boolean | null> = new EventEmitter<boolean | null>();

  @ViewChild('input') inputField: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  handlePasswordVisabilitySwitch(e: Event) {
    e.preventDefault();
    this.isPasswordVisible = !this.isPasswordVisible;
    this.inputField.nativeElement.focus();
    this.moveInputCursorToTheEnd();
    this.onChangePasswordVisability.emit(this.isPasswordVisible);
  }

  get inputType(): string {
    return this.isPasswordVisible ? 'text' : 'password';
  }

  get isFocused(): boolean {
    return Boolean(this.control.value);
  }

  moveInputCursorToTheEnd() {
    const value = this.control.value;
    this.control.setValue('');
    setTimeout(() => {
      this.control.setValue(value);
    }, 50);
  }


  handleKeyUp(e: KeyboardEvent) {
    this.control.updateValueAndValidity();
    this.control.markAsTouched();
  }
}
