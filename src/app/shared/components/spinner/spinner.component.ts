import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  private _isShown: boolean = true;
  public isHiddenInDom: boolean;

  @Input() set isShown(isShown: boolean) {
    if (!isShown) {
      setTimeout(() => {
        this.isHiddenInDom = true;
      }, 400);
      this._isShown = isShown;
    } else {
      this.isHiddenInDom = false;
      setTimeout(() => {
        this._isShown = isShown;
      }, 50);
    }
  }
  get isShown(): boolean {
    return this._isShown;
  }

  @Input() isAbsolute: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
