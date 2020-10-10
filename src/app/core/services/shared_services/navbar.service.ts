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

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

  doSomethingElseUseful() { }

  selectedIndex(value: string) {
    this.index = value;
  }

  getSelectedIndexValue() {
    return this.index;
  }

  fixFooter() {
    this.visible = true;
    this.fixedFooter = true;
    this.isFooterVisible = true;
    // this.floatingFooter = false;
  }

  notFixedFooter() {
    this.visible = true;
    this.fixedFooter = false;
    this.isFooterVisible = true;
    // this.floatingFooter = true;
  }

  hideFooter() {
    this.visible = true;
    this.isFooterVisible = false;
  }
}
