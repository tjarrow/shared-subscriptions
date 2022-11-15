import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-file-input-control',
  templateUrl: './file-input-control.component.html',
  styleUrls: ['./file-input-control.component.scss']
})
export class FileInputControlComponent implements OnInit {
  @Input() public control: AbstractControl;
  @Output() public onChange: EventEmitter<File | null> = new EventEmitter<File  | null>();

  constructor() { }

  ngOnInit(): void {
  }

  handleChange(e) {
    if (e.target.files.length > 0) {
      this.onChange.emit(e.target.files[0])
    }
  }

}
