# Adobe analytics
https://wiki.corp.adobe.com/display/marketingtech/Analytics
> Add tracking attributes to the DOM.
NOTE: most blocks do not need to add custom analytics. If you do need to add custom analytics to a block, you must follow 2 rules:
1. do not add daa-lh to any element on or inside the blocks
2. if you add daa-ll to an element, you must have exactly 2 "levels". The levels are separated by the pipe character.
  a. Level 1 is usually the link text and number
  b. Level 2 is usually the header text
  Example: Buy now-2|Everyone can Photosh
  Even if you have no header text, you must still have 2 levels.
  Example: Buy now-2|




## function list

### processTrackingLabels

> Used in decorateDefaultLinkAnalytics. Can be used inside a block to process text for use in daa-ll.
Input a string and outputs the clean string. Optional 2nd parameter of character length.

### decorateDefaultLinkAnalytics

> Used in decorateSectionAnalytics, so every block will be passed through this function.
Can be used inside a block to add daa-ll attributes. Does not overwrite existing daa-ll attributes.
You only need to call this function in the block if you need the daa-ll attributes added during block decoration.
Input the block element no return value. You can opt out of daa-ll attributes by adding the .no-track class to 
specific links or buttons in your block.

### decorateSectionAnalytics

> Used in utils post block decoration.
1. Adds daa-lh to body with information about personalization and testing
2. Adds daa-im="true" to main
3. Adds a daa-lh to sections with the number. Example: daa-lh="s2"
4. Adds a daa-lh to blocks with the in and number. Example: daa-lh="b3|homepage-brick|smb--var1-Golf marquee|homepage--ACE0759"
5. Runs each block through decorateDefaultLinkAnalytics




## types of tracking
> tracking combines the daa-ll value with all daa-lh values on container elements.  But the combined order may surprise you. Let's say you had the following DOM.
section: daa-lh="s2"
block: daa-lh="b3|homepage-brick|smb--var1-Golf marquee|homepage--ACE0759"
link: daa-ll="Online PDF tools-5|Acrobat"

The combined analytic would be `Online PDF tools-5|Acrobat|s2|b3|homepage-brick|smb--var1-Golf marquee|homepage--ACE0759`
This order is the reason the personalization and testing information is repeated on each block.  If an analytic is truncated due to length, it is mostly likely to be cut off.

### click tracking
> Any link with daa-ll will send tracking when a user clicks an element. Same value as impression tracking but limited to 100 characters.

### impression tracking
> Only links with daa-ll and under a daa-im="true" value sent. Sent after page load (sometimes on unload). Same value as click tracking but limited to 250 characters per link.




## attribute list

### `daa-im`

Simple attribute flag if set to true will capture impressions for each link in that container. Added to header and main but NOT footer.

### `daa-lh`

Hierarchy values that are used to create a complete view of where each interaction is located. 

Our code will combine hierarchy values to create where (unique identifier) for every interaction.

### `daa-ll`

Interaction identifier. See above for strict rules on what format should be used if setting custom daa-ll values.





######
# Sunset functions

> Previous functions in this file are being deprecated.

## decorateBlockAnalytics

> Was used to add daa-lh and daa-im to the block

## decorateLinkAnalytics

> Was used to add daa-lh to headers and daa-ll to links and buttons

## analyticsGetLabel

> Cleans up string. Used in analyticsDecorateList, gnav.js and footer.js

## analyticsDecorateList

Used in gnav.js and footer.js to add tracking.
