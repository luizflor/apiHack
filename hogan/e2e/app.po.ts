import { browser, by, element } from 'protractor';

export class HoganPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ho-root h1')).getText();
  }
}
