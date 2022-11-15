import { Component, Input, OnInit } from '@angular/core';
import { InputControlComponent } from '../input-control/input-control.component'

@Component({
  selector: 'app-password-control',
  templateUrl: './password-control.component.html',
  styleUrls: ['../input-control/input-control.component.scss', './password-control.component.scss']
})
export class PasswordControlComponent extends InputControlComponent implements OnInit {
  public isPasswordVisible: boolean;
  public hideMessage: boolean;
  @Input() public hideIcon: boolean;

  constructor() {
    super();
    this.type = 'password';
   }

  ngOnInit(): void {
  }

  handlePasswordVisabilitySwitch(e: Event) {
    e.preventDefault();
    this.isPasswordVisible = !this.isPasswordVisible;
    this.inputField.nativeElement.focus();
    this.moveInputCursorToTheEnd()
  }

  get inputType(): string {
    return this.isPasswordVisible ? 'text' : 'password';
  }

  moveInputCursorToTheEnd() {
    const value = this.control.value;
    this.hideMessage = true;
    this.control.setValue('');
    setTimeout(() => {
      this.control.setValue(value);
      this.hideMessage = false;
    }, 50);
  }

}
