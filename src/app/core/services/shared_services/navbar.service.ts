import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  visible: boolean;
  index: string;
  fixedFooter: boolean;
  isFooterVisible: boolean;

  constructor() {
    this.visible = false;
  }
}
