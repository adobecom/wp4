export default class Text {
  constructor(page, nth = 0) {
    this.page = page;
    // text  locators
    this.text = page.locator('.text').nth(nth);
    this.textBlocks = page.locator('.text');
    this.textIntro = this.page.locator('.text.intro').nth(nth);
    this.textIntroBlocks = this.page.locator('.text.intro');
    this.textFullWidth = this.page.locator('.text.full-width');
    this.textFullWidthLarge = this.page.locator('.text.full-width.large');
    this.textLongFormLarge = this.page.locator('.text.long-form');
    this.textInsetLargeMSpacing = this.page.locator('.text.inset.medium.m-spacing');
    this.textlegal = this.page.locator('.text.legal.text-block.con-block.has-bg');
    this.textLinkFarm = this.page.locator('.text.link-farm.text-block.con-block.has-bg');

    this.detailM = page.locator('.detail-m');
    this.introDetailM = page.locator('.detail-m');
    this.longFormDetailL = page.locator('.detail-l');
    this.legalDetail = page.locator('.foreground');

    this.headline = this.text.locator('#text');
    this.headlineAlt = this.text.locator('h3');
    this.introHeadline = this.text.locator('#text-intro');
    this.introHeadlineAlt = this.textIntro.locator('h2');
    this.fullWidthHeadline = this.text.locator('#text-full-width');
    this.fullWidthLargeHeadline = this.text.locator('#text-full-width-large');
    this.longFormLargeHeadline = this.text.locator('#text-long-form-large');
    this.insetLargeMSpacingHeadline = this.text.locator('#text-inset-large-m-spacing');
    this.linkFarmHeadline = this.text.locator('#text-link-farm-title');
    this.linkFarmcolumnheading = this.text.locator('#heading-1');

    this.linkFarmcolumns = this.text.locator('h3');
    this.linkColumnOne = this.text.locator('div div:nth-child(1) a');
    this.linkFormText = this.text.locator('p').nth(1);

    this.bodyXSS = this.text.locator('.body-xxs').first();
    this.bodyM = this.text.locator('.body-m').first();
    this.bodyL = this.text.locator('.body-l').first();
    this.propertiesHeadingM = this.text.locator('#properties-h3').first();

    this.outlineButton = this.text.locator('.con-button.outline');
    this.actionAreaLink = this.page.locator('.body-m.action-area a').nth(1);
    this.bodyLink = this.page.locator('.body-m a');

    this.insetLargeMSpacingList1 = this.page.locator('.text.inset.medium.m-spacing ul').nth(0);
    this.listOneItems = this.insetLargeMSpacingList1.locator('li');

    this.insetLargeMSpacingList2 = this.page.locator('.text.inset.medium.m-spacing ul').nth(1);
    this.listTwoItems = this.insetLargeMSpacingList2.locator('li');

    this.generalTermsOfUse = this.textlegal.locator('.body-xxs').nth(1);
    this.publishText = this.textlegal.locator('.body-xxs').nth(2);
    this.generalTerms = this.textlegal.locator('.body-xxs').nth(4);
    this.legalInfoLink = this.textlegal.locator('.body-xxs').nth(5);

    // text block contents css
    this.cssProperties = {
      'detail-m': {
        'font-size': '12px',
        'line-height': '15px',
      },
      'detail-l': {
        'font-size': '16px',
        'line-height': '20px',
      },
      'heading-s': {
        'font-size': '20px',
        'line-height': '25px',
      },
      'heading-m': {
        'font-size': '24px',
        'line-height': '30px',
      },
      'heading-l': {
        'font-size': '28px',
        'line-height': '35px',
      },
      'heading-xl': {
        'font-size': '36px',
        'line-height': '45px',
      },
      'body-xss': {
        'font-size': '12px',
        'line-height': '18px',
      },
      'body-m': {
        'font-size': '18px',
        'line-height': '27px',
      },
      'body-l': {
        'font-size': '20px',
        'line-height': '30px',
      },
      foreground: {
        'font-size': '12px',
        'line-height': '18px',
      },
    };

    // text block contents attributes
    this.attProperties = {
      text: { class: 'text text-block con-block' },
      'text-intro': {
        class: 'text intro text-block con-block has-bg max-width-8-desktop xxl-spacing-top xl-spacing-bottom',
        style: 'background: rgb(255, 255, 255);',
      },
      'text-full-width': { class: 'text full-width text-block con-block max-width-8-desktop center xxl-spacing' },
      'text-full-width-large': { class: 'text full-width large text-block con-block max-width-8-desktop center xxl-spacing' },
      'text-long-form-large': { class: 'text long-form large text-block con-block max-width-8-desktop' },
      'text-inset-medium-m-spacing': { class: 'text inset medium m-spacing text-block con-block max-width-8-desktop' },
      'text-legal': { class: 'text legal text-block con-block has-bg' },
      'text-Link-farm': {
        class: 'text link-farm text-block con-block has-bg',
        style: 'background: rgb(255, 255, 255);',
      },
      headingprops: { id: 'heading-1' },
    };
  }
}
