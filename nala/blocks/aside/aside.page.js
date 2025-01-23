/* eslint-disable import/no-import-module-exports */

export default class Aside {
  constructor(page) {
    this.page = page;

    this.aside = page.locator('.aside');
    this.textField = this.aside.locator('.text');
    this.textFieldSmall = this.aside.locator('p.body-s').first();
    this.textFieldMedium = this.aside.locator('p.body-m').first();
    this.textFieldLarge = this.aside.locator('p.body-l').first();
    // ASIDE HEADINGS:
    this.h2TitleXLarge = this.aside.locator('h2.heading-xl');
    this.h3TitleXLarge = this.aside.locator('h3.heading-xl');
    this.h2TitleLarge = this.aside.locator('h2.heading-l');
    this.h3TitleLarge = this.aside.locator('h3.heading-l');
    this.h2TitleSmall = this.aside.locator('h2.heading-s');
    this.h3TitleSmall = this.aside.locator('h3.heading-s');
    // ASIDE BLOCK ELEMENTS:
    this.icon = this.aside.locator('p.icon-area picture');
    this.image = this.aside.locator('div.image');
    this.noImage = this.aside.locator('div.no-image');
    this.iconArea = this.aside.locator('p.icon-area');
    this.detailLabel = this.aside.locator('p.detail-m');
    this.actionArea = this.aside.locator('p.action-area');
    this.textLink = this.textField.locator('a').first();
    this.linkTextCta = this.aside.locator('a[daa-ll*="Link"], a[daa-ll*="link"], a[daa-ll*="action"]');
    this.actionLinks = this.aside.locator('div[data-valign="middle"] a');
    this.actionButtons = this.aside.locator('p.action-area a');
    this.blueButtonCta = this.aside.locator('a.con-button.blue');
    this.blackButtonCta = this.aside.locator('a.con-button.outline');
    // ASIDE DEFAULT BLOCKS:
    this.asideSmall = page.locator('div.aside.small');
    this.asideMedium = page.locator('div.aside.medium');
    this.asideLarge = page.locator('div.aside.large');
    // ASIDE INLINE BLOCKS:
    this.asideInline = page.locator('div.aside.inline');
    this.asideInlineDark = page.locator('div.aside.inline.dark');
    // ASIDE SPLIT BLOCKS:
    this.asideSplitSmallDark = page.locator('div.aside.split.small.dark');
    this.asideSplitSmallHalfDark = page.locator('div.aside.split.small.half.dark');
    this.asideSplitMedium = page.locator('div.aside.split.medium');
    this.asideSplitMedidumHalf = page.locator('div.aside.split.medium.half');
    this.asideSplitLarge = page.locator('div.aside.split.large');
    this.asideSplitLargeHalfDark = page.locator('div.aside.split.large.half.dark');
    // ASIDE NOTIFICATION BLOCKS:
    this.asideNotifSmall = page.locator('div.aside.notification.small');
    this.asideNotifMedium = page.locator('div.aside.notification.medium');
    this.asideNotifLarge = page.locator('div.aside.notification.large');
    this.asideNotifMediumCenter = page.locator('div.aside.notification.center');
    this.asideNotifLargeCenter = page.locator('div.aside.notification.large.center');
    this.asideNotifExtraSmallDark = page.locator('div.aside.notification.extra-small.dark');

    // ASIDE PROPS:
    this.props = {
      background: {
        black: 'rgb(17, 17, 17)',
        darkGrey: 'rgb(171, 171, 171)',
        lightGrey2: 'rgb(245, 245, 245)',
        lightGrey3: 'rgb(249, 249, 249)',
      },
    };
  }
}
