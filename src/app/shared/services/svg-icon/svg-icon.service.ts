import { Injectable } from '@angular/core';
import { SvgIcon } from '../../models/svg-icons'
import { SvgBrokenIcon } from './svg-broken-icon'

@Injectable({
  providedIn: 'root'
})

export class SvgIconService {
  public svgIcon: SvgIconType;

  constructor() { 
    this.svgIcon = SvgIcon;
  }

  hasIcon(iconName: string) {
    return this.svgIcon.hasOwnProperty(iconName);
  }

  getIcon(iconName: string) {
    return this.svgIcon[iconName];
  }

  getDefaultIcon() {
    return SvgBrokenIcon;
  }

}

export type SvgIconType = {
  [key: string]: string;
};