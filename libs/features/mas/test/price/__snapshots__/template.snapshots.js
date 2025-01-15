export const price = `
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

export const strikethrough = `
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

export const optical = `
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

export const annual = `
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

export const promo = `
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

export const promoStikethrough = `
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

export const customLiterals = `
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

export const taxExclusive = `
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

export const discount = `<span class="discount">20%</span>`;
export const noDiscount = `<span class="no-discount"></span>`;

export const auAbmAnnual = `
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

export const createPriceTemplate1 = `
        <span
            class="price"
            string="s"
            json='{ "foo" : "bar" }'
            number="1"
            truthy=""
            aria-label="100"
            ><span class="price-integer">100</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-currency-space disabled"></span
            ><span class="price-currency-symbol disabled"></span
            ><span class="price-recurrence disabled"></span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span
        ></span>
    `;

export const createPromoPriceTemplate1 = `
        <span
            class="price"
            string="s"
            json='{ "foo" : "bar" }'
            number="1"
            truthy=""
            aria-label="80"
            ><span class="price-integer">80</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-currency-space disabled"></span
            ><span class="price-currency-symbol disabled"></span
            ><span class="price-recurrence disabled"></span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span></span
        >&nbsp;<span
            class="price price-strikethrough"
            string="s"
            json='{ "foo" : "bar" }'
            number="1"
            truthy=""
            aria-label="Regularly at 100"
            ><span class="price-integer">100</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-currency-space disabled"></span
            ><span class="price-currency-symbol disabled"></span
            ><span class="price-recurrence disabled"></span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span
        ></span>
    `;

export const createPromoPriceTemplate2 = `
        <span
            class="price"
            string="s"
            json='{ "foo" : "bar" }'
            number="1"
            truthy=""
            aria-label="100"
            ><span class="price-integer">100</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-currency-space disabled"></span
            ><span class="price-currency-symbol disabled"></span
            ><span class="price-recurrence disabled"></span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span
        ></span>
    `;

export const createPriceWithAnnualTemplate1 = `
        <span class="price" aria-label="100 per month"
            ><span class="price-integer">100</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-currency-space disabled"></span
            ><span class="price-currency-symbol disabled"></span
            ><span class="price-recurrence">/mo</span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span></span
        ><span class="price-annual-prefix">&nbsp;(</span
        ><span class="price price-annual" aria-label="1200 per year"
            ><span class="price-integer">1200</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-currency-space disabled"></span
            ><span class="price-currency-symbol disabled"></span
            ><span class="price-recurrence">/yr</span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span></span
        ><span class="price-annual-suffix">)</span>
    `;

export const createPromoPriceWithAnnualTemplate1 = `
        <span
            class="price price-strikethrough"
            aria-label="Regularly at 100 per month"
            ><span class="price-integer">100</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-currency-space disabled"></span
            ><span class="price-currency-symbol disabled"></span
            ><span class="price-recurrence">/mo</span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span></span
        >&nbsp;<span class="price" aria-label="80 per month"
            ><span class="price-integer">80</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-currency-space disabled"></span
            ><span class="price-currency-symbol disabled"></span
            ><span class="price-recurrence">/mo</span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span></span
        ><span class="price-annual-prefix">&nbsp;(</span
        ><span class="price price-annual" aria-label="960 per year"
            ><span class="price-integer">960</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-currency-space disabled"></span
            ><span class="price-currency-symbol disabled"></span
            ><span class="price-recurrence">/yr</span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span></span
        ><span class="price-annual-suffix">)</span>
    `;

export const annualTemplatePromo = `
        <span
            class="price price-strikethrough"
            aria-label="Regularly at A$30.99 per month"
            ><span class="price-currency-symbol">A$</span
            ><span class="price-currency-space disabled"></span
            ><span class="price-integer">30.99</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-recurrence">/mo</span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span></span
        >&nbsp;<span class="price" aria-label="A$23.23 per month"
            ><span class="price-currency-symbol">A$</span
            ><span class="price-currency-space disabled"></span
            ><span class="price-integer">23.23</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-recurrence">/mo</span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span></span
        ><span class="price-annual-prefix">&nbsp;(</span
        ><span class="price price-annual" aria-label="A$325.32 per month"
            ><span class="price-currency-symbol">A$</span
            ><span class="price-currency-space disabled"></span
            ><span class="price-integer">325.32</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-recurrence">/mo</span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span></span
        ><span class="price-annual-suffix">)</span>
    `;


export const annualTemplatePromoNotStarted = `
        <span
            class="price price-strikethrough"
            aria-label="Regularly at A$30.99 per month"
            ><span class="price-currency-symbol">A$</span
            ><span class="price-currency-space disabled"></span
            ><span class="price-integer">30.99</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-recurrence">/mo</span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span></span
        >&nbsp;<span class="price" aria-label="A$23.23 per month"
            ><span class="price-currency-symbol">A$</span
            ><span class="price-currency-space disabled"></span
            ><span class="price-integer">23.23</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-recurrence">/mo</span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span></span
        ><span class="price-annual-prefix">&nbsp;(</span
        ><span class="price price-annual" aria-label="A$371.88 per year"
            ><span class="price-currency-symbol">A$</span
            ><span class="price-currency-space disabled"></span
            ><span class="price-integer">371.88</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-recurrence">/yr</span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span></span
        ><span class="price-annual-suffix">)</span>
    `;

export const annualTemplatePromoExpired = `
        <span
            class="price price-strikethrough"
            aria-label="Regularly at A$30.99 per month"
            ><span class="price-currency-symbol">A$</span
            ><span class="price-currency-space disabled"></span
            ><span class="price-integer">30.99</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-recurrence">/mo</span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span></span
        >&nbsp;<span class="price" aria-label="A$23.23 per month"
            ><span class="price-currency-symbol">A$</span
            ><span class="price-currency-space disabled"></span
            ><span class="price-integer">23.23</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-recurrence">/mo</span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span></span
        ><span class="price-annual-prefix">&nbsp;(</span
        ><span class="price price-annual" aria-label="A$371.88 per year"
            ><span class="price-currency-symbol">A$</span
            ><span class="price-currency-space disabled"></span
            ><span class="price-integer">371.88</span
            ><span class="price-decimals-delimiter disabled"></span
            ><span class="price-decimals disabled"></span
            ><span class="price-recurrence">/yr</span
            ><span class="price-unit-type disabled"></span
            ><span class="price-tax-inclusivity disabled"></span></span
        ><span class="price-annual-suffix">)</span>
    `;
