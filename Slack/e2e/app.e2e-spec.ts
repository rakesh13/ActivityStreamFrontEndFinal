import { SlackPage } from './app.po';

describe('slack App', function() {
  let page: SlackPage;

  beforeEach(() => {
    page = new SlackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
