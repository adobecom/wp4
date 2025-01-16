// HTML snapshots to compare with `innerHTML` of rendered web components

const price = `
<span class="price" aria-label="US$599.88 per year">
  <span class="price-currency-symbol">US$</span>
  <span class="price-currency-space disabled"></span>
  <span class="price-integer">599</span>
  <span class="price-decimals-delimiter">.</span>
  <span class="price-decimals">88</span>
  <span class="price-recurrence">/yr</span>
  <span class="price-unit-type disabled"></span>
  <span class="price-tax-inclusivity disabled"></span>
</span>
`;

const strikethrough = `
<span class="price price-strikethrough" aria-label="Regularly at US$599.88 per year">
  <span class="price-currency-symbol"> US$ </span>
  <span class="price-currency-space disabled"> </span>
  <span class="price-integer"> 599 </span>
  <span class="price-decimals-delimiter"> . </span>
  <span class="price-decimals"> 88 </span>
  <span class="price-recurrence"> /yr </span>
  <span class="price-unit-type disabled"></span>
  <span class="price-tax-inclusivity disabled"> </span>
</span>
`;

const optical = `
<span class="price price-optical" aria-label="US$49.99 per month per license excl. tax">
  <span class="price-currency-symbol"> US$ </span>
  <span class="price-currency-space disabled"> </span>
  <span class="price-integer"> 49 </span>
  <span class="price-decimals-delimiter"> . </span>
  <span class="price-decimals"> 99 </span>
  <span class="price-recurrence"> /mo </span>
  <span class="price-unit-type"> per license </span>
  <span class="price-tax-inclusivity"> excl. tax </span>
</span>
`;

const annual = `
<span class="price price-annual" aria-label="US$659.88 per year">
  <span class="price-currency-symbol"> US$ </span>
  <span class="price-currency-space disabled"> </span>
  <span class="price-integer"> 659 </span>
  <span class="price-decimals-delimiter"> . </span>
  <span class="price-decimals"> 88 </span>
  <span class="price-recurrence"> /yr </span>
  <span class="price-unit-type disabled"></span>
  <span class="price-tax-inclusivity disabled"> </span>
</span>
`;

const promo = `
<span class="price" aria-label="US$43.99 per month">
  <span class="price-currency-symbol"> US$ </span>
  <span class="price-currency-space disabled"> </span>
  <span class="price-integer"> 43 </span>
  <span class="price-decimals-delimiter"> . </span>
  <span class="price-decimals"> 99 </span>
  <span class="price-recurrence"> /mo </span>
  <span class="price-unit-type disabled"></span>
  <span class="price-tax-inclusivity disabled"> </span>
</span>
`;

const promoStikethrough = `
<span class="price" aria-label="US$43.99 per month">
  <span class="price-currency-symbol"> US$ </span>
  <span class="price-currency-space disabled"> </span>
  <span class="price-integer"> 43 </span>
  <span class="price-decimals-delimiter"> . </span>
  <span class="price-decimals"> 99 </span>
  <span class="price-recurrence"> /mo </span>
  <span class="price-unit-type disabled"> </span>
  <span class="price-tax-inclusivity disabled"> </span>
</span>
&nbsp;
<span class="price price-strikethrough" aria-label="Regularly at US$54.99 per month">
  <span class="price-currency-symbol"> US$ </span>
  <span class="price-currency-space disabled"> </span>
  <span class="price-integer"> 54 </span>
  <span class="price-decimals-delimiter"> . </span>
  <span class="price-decimals"> 99 </span>
  <span class="price-recurrence"> /mo </span>
  <span class="price-unit-type disabled"> </span>
  <span class="price-tax-inclusivity disabled"> </span>
</span>
`;

const customLiterals = `
<span class="price" aria-label="US$54.99 per month">
  <span class="price-currency-symbol"> US$ </span>
  <span class="price-currency-space disabled"> </span>
  <span class="price-integer"> 54 </span>
  <span class="price-decimals-delimiter"> . </span>
  <span class="price-decimals"> 99 </span>
  <span class="price-recurrence"> every month </span>
  <span class="price-unit-type disabled"></span>
  <span class="price-tax-inclusivity disabled"> </span>
</span>
`;

const taxExclusive = `
<span class="price" aria-label="41,65 &amp;euro; per month">
  <span class="price-integer"> 41 </span>
  <span class="price-decimals-delimiter"> , </span>
  <span class="price-decimals"> 65 </span>
  <span class="price-currency-space"> &nbsp; </span>
  <span class="price-currency-symbol"> € </span>
  <span class="price-recurrence"> /mo </span>
  <span class="price-unit-type disabled"> </span>
  <span class="price-tax-inclusivity disabled"> </span>
</span>
&nbsp;
<span class="price price-strikethrough" aria-label="Regularly at 52,06 &amp;euro; per month">
  <span class="price-integer"> 52 </span>
  <span class="price-decimals-delimiter"> , </span>
  <span class="price-decimals"> 06 </span>
  <span class="price-currency-space"> &nbsp; </span>
  <span class="price-currency-symbol"> € </span>
  <span class="price-recurrence"> /mo </span>
  <span class="price-unit-type disabled"> </span>
  <span class="price-tax-inclusivity disabled"> </span>
</span>
`;

const discount = `<span class="discount">20%</span>`;
const noDiscount = `<span class="no-discount"></span>`;

const auAbmAnnual = `
<span class="price" aria-label="A$32.98">
  <span class="price-currency-symbol">A$</span>
  <span class="price-currency-space disabled"></span>
  <span class="price-integer">32</span>
  <span class="price-decimals-delimiter">.</span>
  <span class="price-decimals">98</span>
  <span class="price-recurrence disabled"></span>
  <span class="price-unit-type disabled"></span>
  <span class="price-tax-inclusivity disabled"></span>
</span>
<span class="price-annual-prefix">&nbsp;(</span>
<span class="price price-annual" aria-label="A$32.98">
  <span class="price-currency-symbol">A$</span>
  <span class="price-currency-space disabled"></span>
  <span class="price-integer">32</span>
  <span class="price-decimals-delimiter">.</span>
  <span class="price-decimals">98</span>
  <span class="price-recurrence disabled"></span>
  <span class="price-unit-type disabled"></span>
  <span class="price-tax-inclusivity disabled"></span>
</span>
<span class="price-annual-suffix">)</span>
`;

export default {
    customLiterals,
    optical,
    annual,
    price,
    promo,
    promoStikethrough,
    strikethrough,
    taxExclusive,
    discount,
    noDiscount,
    auAbmAnnual,
};
