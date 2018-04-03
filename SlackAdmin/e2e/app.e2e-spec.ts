import { SlackAdminPage } from './app.po';

describe('slack-admin App', function() {
  let page: SlackAdminPage;

  beforeEach(() => {
    page = new SlackAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
