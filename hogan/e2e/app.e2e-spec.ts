import { HoganPage } from './app.po';

describe('hogan App', () => {
  let page: HoganPage;

  beforeEach(() => {
    page = new HoganPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to ho!!'))
      .then(done, done.fail);
  });
});
