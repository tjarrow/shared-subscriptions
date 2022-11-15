import { Component, OnInit, Input, ChangeDetectionStrategy, ElementRef, isDevMode } from '@angular/core';
import { SvgIconService } from "../../services/svg-icon/svg-icon.service";

@Component({
  selector: 'svg-icon',
  template: '',
  styleUrls: ['./svg-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent implements OnInit {
  @Input() public name: string;

  constructor(private host: ElementRef,
              private svgIconService: SvgIconService) { }
  
  get element() {
    return this.host.nativeElement;
  }

  ngOnInit() {
    this.element.setAttribute('role', 'img');
    this.renderIcon();
  }

  renderIcon() {
    if (this.name && this.svgIconService.hasIcon(this.name)) {
      this.element.innerHTML = this.svgIconService.getIcon(this.name);
    } else {
      this.element.innerHTML = this.svgIconService.getDefaultIcon();
      if (isDevMode()) console.warn(`⚠️ Icon '${this.name}' is missing!`)
    }
  }

}
