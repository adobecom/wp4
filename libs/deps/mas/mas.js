var Hs=Object.create;var ir=Object.defineProperty;var Us=Object.getOwnPropertyDescriptor;var Ds=Object.getOwnPropertyNames;var Bs=Object.getPrototypeOf,Gs=Object.prototype.hasOwnProperty;var io=e=>{throw TypeError(e)};var zs=(e,t,r)=>t in e?ir(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Fs=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Ks=(e,t)=>{for(var r in t)ir(e,r,{get:t[r],enumerable:!0})},js=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Ds(t))!Gs.call(e,i)&&i!==r&&ir(e,i,{get:()=>t[i],enumerable:!(n=Us(t,i))||n.enumerable});return e};var Ys=(e,t,r)=>(r=e!=null?Hs(Bs(e)):{},js(t||!e||!e.__esModule?ir(r,"default",{value:e,enumerable:!0}):r,e));var p=(e,t,r)=>zs(e,typeof t!="symbol"?t+"":t,r),Qr=(e,t,r)=>t.has(e)||io("Cannot "+r);var _=(e,t,r)=>(Qr(e,t,"read from private field"),r?r.call(e):t.get(e)),F=(e,t,r)=>t.has(e)?io("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),j=(e,t,r,n)=>(Qr(e,t,"write to private field"),n?n.call(e,r):t.set(e,r),r),ge=(e,t,r)=>(Qr(e,t,"access private method"),r);var _s=Fs((ng,Nh)=>{Nh.exports={total:38,offset:0,limit:38,data:[{lang:"ar",recurrenceLabel:"{recurrenceTerm, select, MONTH {/\u0627\u0644\u0634\u0647\u0631} YEAR {/\u0627\u0644\u0639\u0627\u0645} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {\u0643\u0644 \u0634\u0647\u0631} YEAR {\u0643\u0644 \u0639\u0627\u0645} other {}}",perUnitLabel:"{perUnit, select, LICENSE {\u0644\u0643\u0644 \u062A\u0631\u062E\u064A\u0635} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {\u0644\u0643\u0644 \u062A\u0631\u062E\u064A\u0635} other {}}",freeLabel:"\u0645\u062C\u0627\u0646\u064B\u0627",freeAriaLabel:"\u0645\u062C\u0627\u0646\u064B\u0627",taxExclusiveLabel:"{taxTerm, select, GST {excl. GST} VAT {excl. VAT} TAX {excl. tax} IVA {excl. IVA} SST {excl. SST} KDV {excl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {incl. GST} VAT {incl. VAT} TAX {incl. tax} IVA {incl. IVA} SST {incl. SST} KDV {incl. KDV} other {}}",alternativePriceAriaLabel:"\u0623\u0648 \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0630\u0644\u0643 \u0628\u0642\u064A\u0645\u0629 {alternativePrice}",strikethroughAriaLabel:"\u0628\u0634\u0643\u0644 \u0645\u0646\u062A\u0638\u0645 \u0628\u0642\u064A\u0645\u0629 {strikethroughPrice}"},{lang:"bg",recurrenceLabel:"{recurrenceTerm, select, MONTH {/\u043C\u0435\u0441.} YEAR {/\u0433\u043E\u0434.} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {\u043D\u0430 \u043C\u0435\u0441\u0435\u0446} YEAR {\u043D\u0430 \u0433\u043E\u0434\u0438\u043D\u0430} other {}}",perUnitLabel:"{perUnit, select, LICENSE {\u043D\u0430 \u043B\u0438\u0446\u0435\u043D\u0437} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {\u043D\u0430 \u043B\u0438\u0446\u0435\u043D\u0437} other {}}",freeLabel:"\u0411\u0435\u0437\u043F\u043B\u0430\u0442\u043D\u043E",freeAriaLabel:"\u0411\u0435\u0437\u043F\u043B\u0430\u0442\u043D\u043E",taxExclusiveLabel:"{taxTerm, select, GST {excl. GST} VAT {excl. VAT} TAX {excl. tax} IVA {excl. IVA} SST {excl. SST} KDV {excl. KDV} other {}}",taxInclusiveLabel:"{incl. VAT} TAX {incl. tax} IVA {incl. IVA} SST {incl. SST} KDV {incl. KDV} other {}}",alternativePriceAriaLabel:"\u0410\u043B\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u043D\u043E \u043D\u0430 {alternativePrice}",strikethroughAriaLabel:"\u0420\u0435\u0434\u043E\u0432\u043D\u043E \u043D\u0430 {strikethroughPrice}"},{lang:"cs",recurrenceLabel:"{recurrenceTerm, select, MONTH {/m\u011Bs\xEDc} YEAR {/rok} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {za m\u011Bs\xEDc} YEAR {za rok} other {}}",perUnitLabel:"{perUnit, select, LICENSE {za licenci} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {za licenci} other {}}",freeLabel:"Zdarma",freeAriaLabel:"Zdarma",taxExclusiveLabel:"{taxTerm, select, GST {bez dan\u011B ze zbo\u017E\xED a slu\u017Eeb} VAT {bez DPH} TAX {bez dan\u011B} IVA {bez IVA} SST {bez SST} KDV {bez KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {v\u010Detn\u011B dan\u011B ze zbo\u017E\xED a slu\u017Eeb} VAT {v\u010Detn\u011B DPH} TAX {v\u010Detn\u011B dan\u011B} IVA {v\u010Detn\u011B IVA} SST {v\u010Detn\u011B SST} KDV {v\u010Detn\u011B KDV} other {}}",alternativePriceAriaLabel:"P\u0159\xEDpadn\u011B za {alternativePrice}",strikethroughAriaLabel:"Pravideln\u011B za {strikethroughPrice}"},{lang:"da",recurrenceLabel:"{recurrenceTerm, select, MONTH {/md} YEAR {/\xE5r} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {pr. m\xE5ned} YEAR {pr. \xE5r} other {}}",perUnitLabel:"{perUnit, select, LICENSE {pr. licens} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {pr. licens} other {}}",freeLabel:"Gratis",freeAriaLabel:"Gratis",taxExclusiveLabel:"{taxTerm, select, GST {ekskl. GST} VAT {ekskl. moms} TAX {ekskl. skat} IVA {ekskl. IVA} SST {ekskl. SST} KDV {ekskl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {inkl. GST} VAT {inkl. moms} TAX {inkl. skat} IVA {inkl. IVA} SST {inkl. SST} KDV {inkl. KDV} other {}}",alternativePriceAriaLabel:"Alternativt til {alternativePrice}",strikethroughAriaLabel:"Normalpris {strikethroughPrice}"},{lang:"de",recurrenceLabel:"{recurrenceTerm, select, MONTH {/Monat} YEAR {/Jahr} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {pro Monat} YEAR {pro Jahr} other {}}",perUnitLabel:"{perUnit, select, LICENSE {pro Lizenz} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {pro Lizenz} other {}}",freeLabel:"Kostenlos",freeAriaLabel:"Kostenlos",taxExclusiveLabel:"{taxTerm, select, GST {zzgl. GST} VAT {zzgl. MwSt.} TAX {zzgl. Steuern} IVA {zzgl. IVA} SST {zzgl. SST} KDV {zzgl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {inkl. GST} VAT {inkl. MwSt.} TAX {inkl. Steuern} IVA {inkl. IVA} SST {inkl. SST} KDV {inkl. KDV} other {}}",alternativePriceAriaLabel:"Alternativ: {alternativePrice}",strikethroughAriaLabel:"Regul\xE4r: {strikethroughPrice}"},{lang:"en",recurrenceLabel:"{recurrenceTerm, select, MONTH {/mo} YEAR {/yr} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {per month} YEAR {per year} other {}}",perUnitLabel:"{perUnit, select, LICENSE {per license} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {per license} other {}}",freeLabel:"Free",freeAriaLabel:"Free",taxExclusiveLabel:"{taxTerm, select, GST {excl. GST} VAT {excl. VAT} TAX {excl. tax} IVA {excl. IVA} SST {excl. SST} KDV {excl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {incl. GST} VAT {incl. VAT} TAX {incl. tax} IVA {incl. IVA} SST {incl. SST} KDV {incl. KDV} other {}}",alternativePriceAriaLabel:"Alternatively at {alternativePrice}",strikethroughAriaLabel:"Regularly at {strikethroughPrice}"},{lang:"et",recurrenceLabel:"{recurrenceTerm, select, MONTH {kuus} YEAR {aastas} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {kuus} YEAR {aastas} other {}}",perUnitLabel:"{perUnit, select, LICENSE {litsentsi kohta} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {litsentsi kohta} other {}}",freeLabel:"Tasuta",freeAriaLabel:"Tasuta",taxExclusiveLabel:"{taxTerm, select, GST {excl. GST} VAT {excl. VAT} TAX {excl. tax} IVA {excl. IVA} SST {excl. SST} KDV {excl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {incl. GST} VAT {incl. VAT} TAX {incl. tax} IVA {incl. IVA} SST {incl. SST} KDV {incl. KDV} other {}}",alternativePriceAriaLabel:"Teise v\xF5imalusena hinnaga {alternativePrice}",strikethroughAriaLabel:"Tavahind {strikethroughPrice}"},{lang:"fi",recurrenceLabel:"{recurrenceTerm, select, MONTH {/kk} YEAR {/v} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {kuukausittain} YEAR {vuosittain} other {}}",perUnitLabel:"{perUnit, select, LICENSE {k\xE4ytt\xF6oikeutta kohti} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {k\xE4ytt\xF6oikeutta kohti} other {}}",freeLabel:"Maksuton",freeAriaLabel:"Maksuton",taxExclusiveLabel:"{taxTerm, select, GST {ilman GST:t\xE4} VAT {ilman ALV:t\xE4} TAX {ilman veroja} IVA {ilman IVA:ta} SST {ilman SST:t\xE4} KDV {ilman KDV:t\xE4} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {sis. GST:n} VAT {sis. ALV:n} TAX {sis. verot} IVA {sis. IVA:n} SST {sis. SST:n} KDV {sis. KDV:n} other {}}",alternativePriceAriaLabel:"Vaihtoehtoisesti hintaan {alternativePrice}",strikethroughAriaLabel:"S\xE4\xE4nn\xF6llisesti hintaan {strikethroughPrice}"},{lang:"fr",recurrenceLabel:"{recurrenceTerm, select, MONTH {/mois} YEAR {/an} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {par mois} YEAR {par an} other {}}",perUnitLabel:"{perUnit, select, LICENSE {par licence} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {par licence} other {}}",freeLabel:"Gratuit",freeAriaLabel:"Gratuit",taxExclusiveLabel:"{taxTerm, select, GST {hors TPS} VAT {hors TVA} TAX {hors taxes} IVA {hors IVA} SST {hors SST} KDV {hors KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {TPS comprise} VAT {TVA comprise} TAX {taxes comprises} IVA {IVA comprise} SST {SST comprise} KDV {KDV comprise} other {}}",alternativePriceAriaLabel:"Autre prix {alternativePrice}",strikethroughAriaLabel:"Prix habituel {strikethroughPrice}"},{lang:"he",recurrenceLabel:"{recurrenceTerm, select, MONTH {/\u05D7\u05D5\u05D3\u05E9} YEAR {/\u05E9\u05E0\u05D4} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {\u05DC\u05D7\u05D5\u05D3\u05E9} YEAR {\u05DC\u05E9\u05E0\u05D4} other {}}",perUnitLabel:"{perUnit, select, LICENSE {\u05DC\u05E8\u05D9\u05E9\u05D9\u05D5\u05DF} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {\u05DC\u05E8\u05D9\u05E9\u05D9\u05D5\u05DF} other {}}",freeLabel:"\u05D7\u05D9\u05E0\u05DD",freeAriaLabel:"\u05D7\u05D9\u05E0\u05DD",taxExclusiveLabel:"{taxTerm, select, GST {excl. GST} VAT {excl. VAT} TAX {excl. tax} IVA {excl. IVA} SST {excl. SST} KDV {excl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {incl. GST} VAT {incl. VAT} TAX {incl. tax} IVA {incl. IVA} SST {incl. SST} KDV {incl. KDV} other {}}",alternativePriceAriaLabel:"\u05DC\u05D7\u05DC\u05D5\u05E4\u05D9\u05DF \u05D1-{alternativePrice}",strikethroughAriaLabel:"\u05D1\u05D0\u05D5\u05E4\u05DF \u05E7\u05D1\u05D5\u05E2 \u05D1-{strikethroughPrice}"},{lang:"hu",recurrenceLabel:"{recurrenceTerm, select, MONTH {/h\xF3} YEAR {/\xE9v} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {havonta} YEAR {\xE9vente} other {}}",perUnitLabel:"{perUnit, select, LICENSE {licencenk\xE9nt} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {licencenk\xE9nt} other {}}",freeLabel:"Ingyenes",freeAriaLabel:"Ingyenes",taxExclusiveLabel:"{taxTerm, select, GST {excl. GST} VAT {excl. VAT} TAX {excl. tax} IVA {excl. IVA} SST {excl. SST} KDV {excl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {incl. GST} VAT {incl. VAT} TAX {incl. tax} IVA {incl. IVA} SST {incl. SST} KDV {incl. KDV} other {}}",alternativePriceAriaLabel:"M\xE1sik lehet\u0151s\xE9g: {alternativePrice}",strikethroughAriaLabel:"\xC1ltal\xE1ban {strikethroughPrice} \xE1ron"},{lang:"it",recurrenceLabel:"{recurrenceTerm, select, MONTH {/mese} YEAR {/anno} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {al mese} YEAR {all'anno} other {}}",perUnitLabel:"{perUnit, select, LICENSE {per licenza} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {per licenza} other {}}",freeLabel:"Gratuito",freeAriaLabel:"Gratuito",taxExclusiveLabel:"{taxTerm, select, GST {escl. GST} VAT {escl. IVA.} TAX {escl. imposte} IVA {escl. IVA} SST {escl. SST} KDV {escl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {incl. GST} VAT {incl. IVA} TAX {incl. imposte} IVA {incl. IVA} SST {incl. SST} KDV {incl. KDV} other {}}",alternativePriceAriaLabel:"In alternativa a {alternativePrice}",strikethroughAriaLabel:"Regolarmente a {strikethroughPrice}"},{lang:"ja",recurrenceLabel:"{recurrenceTerm, select, MONTH {/\u6708} YEAR {/\u5E74} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {\u6BCE\u6708} YEAR {\u6BCE\u5E74} other {}}",perUnitLabel:"{perUnit, select, LICENSE {\u30E9\u30A4\u30BB\u30F3\u30B9\u3054\u3068} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {\u30E9\u30A4\u30BB\u30F3\u30B9\u3054\u3068} other {}}",freeLabel:"\u7121\u6599",freeAriaLabel:"\u7121\u6599",taxExclusiveLabel:"{taxTerm, select, GST {GST \u5225} VAT {VAT \u5225} TAX {\u7A0E\u5225} IVA {IVA \u5225} SST {SST \u5225} KDV {KDV \u5225} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {GST \u8FBC} VAT {VAT \u8FBC} TAX {\u7A0E\u8FBC} IVA {IVA \u8FBC} SST {SST \u8FBC} KDV {KDV \u8FBC} other {}}",alternativePriceAriaLabel:"\u7279\u5225\u4FA1\u683C : {alternativePrice}",strikethroughAriaLabel:"\u901A\u5E38\u4FA1\u683C : {strikethroughPrice}"},{lang:"ko",recurrenceLabel:"{recurrenceTerm, select, MONTH {/\uC6D4} YEAR {/\uB144} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {\uC6D4\uAC04} YEAR {\uC5F0\uAC04} other {}}",perUnitLabel:"{perUnit, select, LICENSE {\uB77C\uC774\uC120\uC2A4\uB2F9} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {\uB77C\uC774\uC120\uC2A4\uB2F9} other {}}",freeLabel:"\uBB34\uB8CC",freeAriaLabel:"\uBB34\uB8CC",taxExclusiveLabel:"{taxTerm, select, GST {GST \uC81C\uC678} VAT {VAT \uC81C\uC678} TAX {\uC138\uAE08 \uC81C\uC678} IVA {IVA \uC81C\uC678} SST {SST \uC81C\uC678} KDV {KDV \uC81C\uC678} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {GST \uD3EC\uD568} VAT {VAT \uD3EC\uD568} TAX {\uC138\uAE08 \uD3EC\uD568} IVA {IVA \uD3EC\uD568} SST {SST \uD3EC\uD568} KDV {KDV \uD3EC\uD568} other {}}",alternativePriceAriaLabel:"\uB610\uB294 {alternativePrice}\uC5D0",strikethroughAriaLabel:"\uB610\uB294 {alternativePrice}\uC5D0"},{lang:"lt",recurrenceLabel:"{recurrenceTerm, select, MONTH { per m\u0117n.} YEAR { per metus} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {per m\u0117n.} YEAR {per metus} other {}}",perUnitLabel:"{perUnit, select, LICENSE {u\u017E licencij\u0105} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {u\u017E licencij\u0105} other {}}",freeLabel:"Nemokamai",freeAriaLabel:"Nemokamai",taxExclusiveLabel:"{taxTerm, select, GST {excl. GST} VAT {excl. VAT} TAX {excl. tax} IVA {excl. IVA} SST {excl. SST} KDV {excl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {incl. GST} VAT {incl. VAT} TAX {incl. tax} IVA {incl. IVA} SST {incl. SST} KDV {incl. KDV} other {}}",alternativePriceAriaLabel:"Arba u\u017E {alternativePrice}",strikethroughAriaLabel:"Normaliai u\u017E {strikethroughPrice}"},{lang:"lv",recurrenceLabel:"{recurrenceTerm, select, MONTH {m\u0113nes\u012B} YEAR {gad\u0101} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {m\u0113nes\u012B} YEAR {gad\u0101} other {}}",perUnitLabel:"{perUnit, select, LICENSE {vienai licencei} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {vienai licencei} other {}}",freeLabel:"Bezmaksas",freeAriaLabel:"Bezmaksas",taxExclusiveLabel:"{taxTerm, select, GST {excl. GST} VAT {excl. VAT} TAX {excl. tax} IVA {excl. IVA} SST {excl. SST} KDV {excl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {incl. GST} VAT {incl. VAT} TAX {incl. tax} IVA {incl. IVA} SST {incl. SST} KDV {incl. KDV} other {}}",alternativePriceAriaLabel:"Alternat\u012Bvi par {alternativePrice}",strikethroughAriaLabel:"Regul\u0101ri par {strikethroughPrice}"},{lang:"nb",recurrenceLabel:"{recurrenceTerm, select, MONTH {/mnd.} YEAR {/\xE5r} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {per m\xE5ned} YEAR {per \xE5r} other {}}",perUnitLabel:"{perUnit, select, LICENSE {per lisens} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {per lisens} other {}}",freeLabel:"Fri",freeAriaLabel:"Fri",taxExclusiveLabel:"{taxTerm, select, GST {ekskl. GST} VAT {ekskl. moms} TAX {ekskl. avgift} IVA {ekskl. IVA} SST {ekskl. SST} KDV {ekskl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {inkl. GST} VAT {inkl. moms} TAX {inkl. avgift} IVA {inkl. IVA} SST {inkl. SST} KDV {inkl. KDV} other {}}",alternativePriceAriaLabel:"Alternativt til {alternativePrice}",strikethroughAriaLabel:"Regelmessig til {strikethroughPrice}"},{lang:"nl",recurrenceLabel:"{recurrenceTerm, select, MONTH {/mnd} YEAR {/jr} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {per maand} YEAR {per jaar} other {}}",perUnitLabel:"{perUnit, select, LICENSE {per licentie} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {per licentie} other {}}",freeLabel:"Gratis",freeAriaLabel:"Gratis",taxExclusiveLabel:"{taxTerm, select, GST {excl. GST} VAT {excl. btw} TAX {excl. belasting} IVA {excl. IVA} SST {excl. SST} KDV {excl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {incl. GST} VAT {incl. btw} TAX {incl. belasting} IVA {incl. IVA} SST {incl. SST} KDV {incl. KDV} other {}}",alternativePriceAriaLabel:"Nu {alternativePrice}",strikethroughAriaLabel:"Normaal {strikethroughPrice}"},{lang:"pl",recurrenceLabel:"{recurrenceTerm, select, MONTH { / mies.} YEAR { / rok} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH { / miesi\u0105c} YEAR { / rok} other {}}",perUnitLabel:"{perUnit, select, LICENSE {za licencj\u0119} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {za licencj\u0119} other {}}",freeLabel:"Bezp\u0142atne",freeAriaLabel:"Bezp\u0142atne",taxExclusiveLabel:"{taxTerm, select, GST {bez GST} VAT {bez VAT} TAX {netto} IVA {bez IVA} SST {bez SST} KDV {bez KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {z GST} VAT {z VAT} TAX {brutto} IVA {z IVA} SST {z SST} KDV {z KDV} other {}}",alternativePriceAriaLabel:"Lub za {alternativePrice}",strikethroughAriaLabel:"Cena zwyk\u0142a: {strikethroughPrice}"},{lang:"pt",recurrenceLabel:"{recurrenceTerm, select, MONTH {/m\xEAs} YEAR {/ano} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {por m\xEAs} YEAR {por ano} other {}}",perUnitLabel:"{perUnit, select, LICENSE {por licen\xE7a} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {por licen\xE7a} other {}}",freeLabel:"Gratuito",freeAriaLabel:"Gratuito",taxExclusiveLabel:"{taxTerm, select, GST {ICMS n\xE3o incluso} VAT {IVA n\xE3o incluso} TAX {impostos n\xE3o inclusos} IVA {IVA n\xE3o incluso} SST { SST n\xE3o incluso} KDV {KDV n\xE3o incluso} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {ICMS incluso} VAT {IVA incluso} TAX {impostos inclusos} IVA {IVA incluso} SST {SST incluso} KDV {KDV incluso} other {}}",alternativePriceAriaLabel:"Ou a {alternativePrice}",strikethroughAriaLabel:"Pre\xE7o normal: {strikethroughPrice}"},{lang:"ro",recurrenceLabel:"{recurrenceTerm, select, MONTH {/lun\u0103} YEAR {/an} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {pe lun\u0103} YEAR {pe an} other {}}",perUnitLabel:"{perUnit, select, LICENSE {pe licen\u021B\u0103} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {pe licen\u021B\u0103} other {}}",freeLabel:"Gratuit",freeAriaLabel:"Gratuit",taxExclusiveLabel:"{taxTerm, select, GST {excl. GST} VAT {excl. VAT} TAX {excl. tax} IVA {excl. IVA} SST {excl. SST} KDV {excl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {incl. GST} VAT {incl. VAT} TAX {incl. tax} IVA {incl. IVA} SST {incl. SST} KDV {incl. KDV} other {}}",alternativePriceAriaLabel:"Alternativ, la {alternativePrice}",strikethroughAriaLabel:"\xCEn mod normal, la {strikethroughPrice}"},{lang:"ru",recurrenceLabel:"{recurrenceTerm, select, MONTH {/\u043C\u0435\u0441.} YEAR {/\u0433.} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {\u0432 \u043C\u0435\u0441\u044F\u0446} YEAR {\u0432 \u0433\u043E\u0434} other {}}",perUnitLabel:"{perUnit, select, LICENSE {\u0437\u0430 \u043B\u0438\u0446\u0435\u043D\u0437\u0438\u044E} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {\u0437\u0430 \u043B\u0438\u0446\u0435\u043D\u0437\u0438\u044E} other {}}",freeLabel:"\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E",freeAriaLabel:"\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E",taxExclusiveLabel:"{taxTerm, select, GST {\u0438\u0441\u043A\u043B. \u043D\u0430\u043B\u043E\u0433 \u043D\u0430 \u0442\u043E\u0432\u0430\u0440\u044B \u0438 \u0443\u0441\u043B\u0443\u0433\u0438} VAT {\u0438\u0441\u043A\u043B. \u041D\u0414\u0421} TAX {\u0438\u0441\u043A\u043B. \u043D\u0430\u043B\u043E\u0433} IVA {\u0438\u0441\u043A\u043B. \u0418\u0412\u0410} SST {\u0438\u0441\u043A\u043B. SST} KDV {\u0438\u0441\u043A\u043B. \u041A\u0414\u0412} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {\u0432\u043A\u043B. \u043D\u0430\u043B\u043E\u0433 \u043D\u0430 \u0442\u043E\u0432\u0430\u0440\u044B \u0438 \u0443\u0441\u043B\u0443\u0433\u0438} VAT {\u0432\u043A\u043B. \u041D\u0414\u0421} TAX {\u0432\u043A\u043B. \u043D\u0430\u043B\u043E\u0433} IVA {\u0432\u043A\u043B. \u0418\u0412\u0410} SST {\u0432\u043A\u043B. SST} KDV {\u0432\u043A\u043B. \u041A\u0414\u0412} other {}}",alternativePriceAriaLabel:"\u0410\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442 \u0437\u0430 {alternativePrice}",strikethroughAriaLabel:"\u0420\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E \u043F\u043E \u0446\u0435\u043D\u0435 {strikethroughPrice}"},{lang:"sk",recurrenceLabel:"{recurrenceTerm, select, MONTH {/mesiac} YEAR {/rok} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {za mesiac} YEAR {za rok} other {}}",perUnitLabel:"{perUnit, select, LICENSE {za licenciu} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {za licenciu} other {}}",freeLabel:"Zadarmo",freeAriaLabel:"Zadarmo",taxExclusiveLabel:"{taxTerm, select, GST {excl. GST} VAT {excl. VAT} TAX {excl. tax} IVA {excl. IVA} SST {excl. SST} KDV {excl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {incl. GST} VAT {incl. VAT} TAX {incl. tax} IVA {incl. IVA} SST {incl. SST} KDV {incl. KDV} other {}}",alternativePriceAriaLabel:"Pr\xEDpadne za {alternativePrice}",strikethroughAriaLabel:"Pravidelne za {strikethroughPrice}"},{lang:"sl",recurrenceLabel:"{recurrenceTerm, select, MONTH {/mesec} YEAR {/leto} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {na mesec} YEAR {na leto} other {}}",perUnitLabel:"{perUnit, select, LICENSE {na licenco} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {na licenco} other {}}",freeLabel:"Brezpla\u010Dno",freeAriaLabel:"Brezpla\u010Dno",taxExclusiveLabel:"{taxTerm, select, GST {excl. GST} VAT {excl. VAT} TAX {excl. tax} IVA {excl. IVA} SST {excl. SST} KDV {excl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {incl. GST} VAT {incl. VAT} TAX {incl. tax} IVA {incl. IVA} SST {incl. SST} KDV {incl. KDV} other {}}",alternativePriceAriaLabel:"Druga mo\u017Enost je: {alternativePrice}",strikethroughAriaLabel:"Redno po {strikethroughPrice}"},{lang:"sv",recurrenceLabel:"{recurrenceTerm, select, MONTH {/m\xE5n} YEAR {/\xE5r} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {per m\xE5nad} YEAR {per \xE5r} other {}}",perUnitLabel:"{perUnit, select, LICENSE {per licens} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {per licens} other {}}",freeLabel:"Kostnadsfritt",freeAriaLabel:"Kostnadsfritt",taxExclusiveLabel:"{taxTerm, select, GST {exkl. GST} VAT {exkl. moms} TAX {exkl. skatt} IVA {exkl. IVA} SST {exkl. SST} KDV {exkl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {inkl. GST} VAT {inkl. moms} TAX {inkl. skatt} IVA {inkl. IVA} SST {inkl. SST} KDV {inkl. KDV} other {}}",alternativePriceAriaLabel:"Alternativt f\xF6r {alternativePrice}",strikethroughAriaLabel:"Normalpris {strikethroughPrice}"},{lang:"tr",recurrenceLabel:"{recurrenceTerm, select, MONTH {/ay} YEAR {/y\u0131l} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {(ayl\u0131k)} YEAR {(y\u0131ll\u0131k)} other {}}",perUnitLabel:"{perUnit, select, LICENSE {(lisans ba\u015F\u0131na)} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {(lisans ba\u015F\u0131na)} other {}}",freeLabel:"\xDCcretsiz",freeAriaLabel:"\xDCcretsiz",taxExclusiveLabel:"{taxTerm, select, GST {GST hari\xE7} VAT {KDV hari\xE7} TAX {vergi hari\xE7} IVA {IVA hari\xE7} SST {SST hari\xE7} KDV {KDV hari\xE7} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {GST dahil} VAT {KDV dahil} TAX {vergi dahil} IVA {IVA dahil} SST {SST dahil} KDV {KDV dahil} other {}}",alternativePriceAriaLabel:"Ya da {alternativePrice}",strikethroughAriaLabel:"Standart fiyat: {strikethroughPrice}"},{lang:"uk",recurrenceLabel:"{recurrenceTerm, select, MONTH {/\u043C\u0456\u0441.} YEAR {/\u0440\u0456\u043A} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {\u043D\u0430 \u043C\u0456\u0441\u044F\u0446\u044C} YEAR {\u043D\u0430 \u0440\u0456\u043A} other {}}",perUnitLabel:"{perUnit, select, LICENSE {\u0437\u0430 \u043B\u0456\u0446\u0435\u043D\u0437\u0456\u044E} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {\u0437\u0430 \u043B\u0456\u0446\u0435\u043D\u0437\u0456\u044E} other {}}",freeLabel:"\u0411\u0435\u0437\u043A\u043E\u0448\u0442\u043E\u0432\u043D\u043E",freeAriaLabel:"\u0411\u0435\u0437\u043A\u043E\u0448\u0442\u043E\u0432\u043D\u043E",taxExclusiveLabel:"{taxTerm, select, GST {\u0431\u0435\u0437 GST} VAT {\u0431\u0435\u0437 \u041F\u0414\u0412} TAX {\u0431\u0435\u0437 \u043F\u043E\u0434\u0430\u0442\u043A\u0443} IVA {\u0431\u0435\u0437 IVA} SST {\u0431\u0435\u0437 SST} KDV {\u0431\u0435\u0437 KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {\u0440\u0430\u0437\u043E\u043C \u0456\u0437 GST} VAT {\u0440\u0430\u0437\u043E\u043C \u0456\u0437 \u041F\u0414\u0412} TAX {\u0440\u0430\u0437\u043E\u043C \u0456\u0437 \u043F\u043E\u0434\u0430\u0442\u043A\u043E\u043C} IVA {\u0440\u0430\u0437\u043E\u043C \u0437 IVA} SST {\u0440\u0430\u0437\u043E\u043C \u0456\u0437 SST} KDV {\u0440\u0430\u0437\u043E\u043C \u0456\u0437 KDV} other {}}",alternativePriceAriaLabel:"\u0410\u0431\u043E \u0437\u0430 {alternativePrice}",strikethroughAriaLabel:"\u0417\u0432\u0438\u0447\u0430\u0439\u043D\u0430 \u0446\u0456\u043D\u0430 {strikethroughPrice}"},{lang:"zh-hans",recurrenceLabel:"{recurrenceTerm, select, MONTH {/\u6708} YEAR {/\u5E74} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {\u6BCF\u6708} YEAR {\u6BCF\u5E74} other {}}",perUnitLabel:"{perUnit, select, LICENSE {\u6BCF\u4E2A\u8BB8\u53EF\u8BC1} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {\u6BCF\u4E2A\u8BB8\u53EF\u8BC1} other {}}",freeLabel:"\u514D\u8D39",freeAriaLabel:"\u514D\u8D39",taxExclusiveLabel:"{taxTerm, select, GST {excl. GST} VAT {excl. VAT} TAX {excl. tax} IVA {excl. IVA} SST {excl. SST} KDV {excl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {incl. GST} VAT {incl. VAT} TAX {incl. tax} IVA {incl. IVA} SST {incl. SST} KDV {incl. KDV} other {}}",alternativePriceAriaLabel:"\u6216\u5B9A\u4EF7 {alternativePrice}",strikethroughAriaLabel:"\u6B63\u5E38\u4EF7 {strikethroughPrice}"},{lang:"zh-hant",recurrenceLabel:"{recurrenceTerm, select, MONTH {/\u6708} YEAR {/\u5E74} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {\u6BCF\u6708} YEAR {\u6BCF\u5E74} other {}}",perUnitLabel:"{perUnit, select, LICENSE {\u6BCF\u500B\u6388\u6B0A} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {\u6BCF\u500B\u6388\u6B0A} other {}}",freeLabel:"\u514D\u8CBB",freeAriaLabel:"\u514D\u8CBB",taxExclusiveLabel:"{taxTerm, select, GST {\u4E0D\u542B GST} VAT {\u4E0D\u542B VAT} TAX {\u4E0D\u542B\u7A05} IVA {\u4E0D\u542B IVA} SST {\u4E0D\u542B SST} KDV {\u4E0D\u542B KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {\u542B GST} VAT {\u542B VAT} TAX {\u542B\u7A05} IVA {\u542B IVA} SST {\u542B SST} KDV {\u542B KDV} other {}}",alternativePriceAriaLabel:"\u6216\u8005\u5728 {alternativePrice}",strikethroughAriaLabel:"\u6A19\u6E96\u50F9\u683C\u70BA {strikethroughPrice}"},{lang:"es",recurrenceLabel:"{recurrenceTerm, select, MONTH {/mes} YEAR {/a\xF1o} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {al mes} YEAR {al a\xF1o} other {}}",perUnitLabel:"{perUnit, select, LICENSE {por licencia} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {por licencia} other {}}",freeLabel:"Gratuito",freeAriaLabel:"Gratuito",taxExclusiveLabel:"{taxTerm, select, GST {GST no incluido} VAT {IVA no incluido} TAX {Impuestos no incluidos} IVA {IVA no incluido} SST {SST no incluido} KDV {KDV no incluido} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {GST incluido} VAT {IVA incluido} TAX {Impuestos incluidos} IVA {IVA incluido} SST {SST incluido} KDV {KDV incluido} other {}}",alternativePriceAriaLabel:"Alternativamente por {alternativePrice}",strikethroughAriaLabel:"Normalmente a {strikethroughPrice}"},{lang:"in",recurrenceLabel:"{recurrenceTerm, select, MONTH {/bulan} YEAR {/tahun} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {per bulan} YEAR {per tahun} other {}}",perUnitLabel:"{perUnit, select, LICENSE {per lisensi} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {per lisensi} other {}}",freeLabel:"Gratis",freeAriaLabel:"Gratis",taxExclusiveLabel:"{taxTerm, select, GST {tidak termasuk PBJ} VAT {tidak termasuk PPN} TAX {tidak termasuk pajak} IVA {tidak termasuk IVA} SST {tidak termasuk SST} KDV {tidak termasuk KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {termasuk PBJ} VAT {termasuk PPN} TAX {termasuk pajak} IVA {termasuk IVA} SST {termasuk SST} KDV {termasuk KDV} other {}}",alternativePriceAriaLabel:"Atau seharga {alternativePrice}",strikethroughAriaLabel:"Normalnya seharga {strikethroughPrice}"},{lang:"vi",recurrenceLabel:"{recurrenceTerm, select, MONTH {/th\xE1ng} YEAR {/n\u0103m} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {m\u1ED7i th\xE1ng} YEAR {m\u1ED7i n\u0103m} other {}}",perUnitLabel:"{perUnit, select, LICENSE {m\u1ED7i gi\u1EA5y ph\xE9p} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {m\u1ED7i gi\u1EA5y ph\xE9p} other {}}",freeLabel:"Mi\u1EC5n ph\xED",freeAriaLabel:"Mi\u1EC5n ph\xED",taxExclusiveLabel:"{taxTerm, select, GST {ch\u01B0a bao g\u1ED3m thu\u1EBF h\xE0ng h\xF3a v\xE0 d\u1ECBch v\u1EE5} VAT {ch\u01B0a bao g\u1ED3m thu\u1EBF GTGT} TAX {ch\u01B0a bao g\u1ED3m thu\u1EBF} IVA {ch\u01B0a bao g\u1ED3m IVA} SST {ch\u01B0a bao g\u1ED3m SST} KDV {ch\u01B0a bao g\u1ED3m KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {(\u0111\xE3 bao g\u1ED3m thu\u1EBF h\xE0ng h\xF3a v\xE0 d\u1ECBch v\u1EE5)} VAT {(\u0111\xE3 bao g\u1ED3m thu\u1EBF GTGT)} TAX {(\u0111\xE3 bao g\u1ED3m thu\u1EBF)} IVA {(\u0111\xE3 bao g\u1ED3m IVA)} SST {(\u0111\xE3 bao g\u1ED3m SST)} KDV {(\u0111\xE3 bao g\u1ED3m KDV)} other {}}",alternativePriceAriaLabel:"Gi\xE1 \u01B0u \u0111\xE3i {alternativePrice}",strikethroughAriaLabel:"Gi\xE1 th\xF4ng th\u01B0\u1EDDng {strikethroughPrice}"},{lang:"th",recurrenceLabel:"{recurrenceTerm, select, MONTH {/\u0E40\u0E14\u0E37\u0E2D\u0E19} YEAR {/\u0E1B\u0E35} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {\u0E15\u0E48\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19} YEAR {\u0E15\u0E48\u0E2D\u0E1B\u0E35} other {}}",perUnitLabel:"{perUnit, select, LICENSE {\u0E15\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {\u0E15\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19} other {}}",freeLabel:"\u0E1F\u0E23\u0E35",freeAriaLabel:"\u0E1F\u0E23\u0E35",taxExclusiveLabel:"{taxTerm, select, GST {\u0E44\u0E21\u0E48\u0E23\u0E27\u0E21\u0E20\u0E32\u0E29\u0E35 GST} VAT {\u0E44\u0E21\u0E48\u0E23\u0E27\u0E21 VAT} TAX {\u0E44\u0E21\u0E48\u0E23\u0E27\u0E21\u0E20\u0E32\u0E29\u0E35} IVA {\u0E44\u0E21\u0E48\u0E23\u0E27\u0E21 IVA} SST {\u0E44\u0E21\u0E48\u0E23\u0E27\u0E21 SST} KDV {\u0E44\u0E21\u0E48\u0E23\u0E27\u0E21 KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {\u0E23\u0E27\u0E21\u0E20\u0E32\u0E29\u0E35 GST} VAT {\u0E23\u0E27\u0E21 VAT} TAX {\u0E23\u0E27\u0E21\u0E20\u0E32\u0E29\u0E35} IVA {\u0E23\u0E27\u0E21 IVA} SST {\u0E23\u0E27\u0E21 SST} KDV {\u0E23\u0E27\u0E21 KDV} other {}}",alternativePriceAriaLabel:"\u0E23\u0E32\u0E04\u0E32\u0E1E\u0E34\u0E40\u0E28\u0E29 {alternativePrice}",strikethroughAriaLabel:"\u0E23\u0E32\u0E04\u0E32\u0E1B\u0E01\u0E15\u0E34 {strikethroughPrice}"},{lang:"el",recurrenceLabel:"{recurrenceTerm, select, MONTH {/\u03BC\u03AE\u03BD\u03B1} YEAR {/\u03AD\u03C4\u03BF\u03C2} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {\u03BA\u03AC\u03B8\u03B5 \u03BC\u03AE\u03BD\u03B1} YEAR {\u03B1\u03BD\u03AC \u03AD\u03C4\u03BF\u03C2} other {}}",perUnitLabel:"{perUnit, select, LICENSE {\u03B1\u03BD\u03AC \u03AC\u03B4\u03B5\u03B9\u03B1 \u03C7\u03C1\u03AE\u03C3\u03B7\u03C2} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {\u03B1\u03BD\u03AC \u03AC\u03B4\u03B5\u03B9\u03B1 \u03C7\u03C1\u03AE\u03C3\u03B7\u03C2} other {}}",freeLabel:"\u0394\u03C9\u03C1\u03B5\u03AC\u03BD",freeAriaLabel:"\u0394\u03C9\u03C1\u03B5\u03AC\u03BD",taxExclusiveLabel:"{taxTerm, select, GST {(\u03BC\u03B7 \u03C3\u03C5\u03BC\u03C0\u03B5\u03C1\u03B9\u03BB\u03B1\u03BC\u03B2\u03B1\u03BD\u03BF\u03BC\u03AD\u03BD\u03BF\u03C5 GST)} VAT {(\u03BC\u03B7 \u03C3\u03C5\u03BC\u03C0\u03B5\u03C1\u03B9\u03BB\u03B1\u03BC\u03B2\u03B1\u03BD\u03BF\u03BC\u03AD\u03BD\u03BF\u03C5 \u03A6\u03A0\u0391)} TAX {(\u03BC\u03B7 \u03C3\u03C5\u03BC\u03C0\u03B5\u03C1\u03B9\u03BB\u03B1\u03BC\u03B2\u03B1\u03BD\u03BF\u03BC\u03AD\u03BD\u03BF\u03C5 \u03C6\u03CC\u03C1\u03BF)} IVA {(\u03BC\u03B7 \u03C3\u03C5\u03BC\u03C0\u03B5\u03C1\u03B9\u03BB\u03B1\u03BC\u03B2\u03B1\u03BD\u03BF\u03BC\u03AD\u03BD\u03BF\u03C5 IVA)} SST {(\u03BC\u03B7 \u03C3\u03C5\u03BC\u03C0\u03B5\u03C1\u03B9\u03BB\u03B1\u03BC\u03B2\u03B1\u03BD\u03BF\u03BC\u03AD\u03BD\u03BF\u03C5 SST)} KDV {(\u03BC\u03B7 \u03C3\u03C5\u03BC\u03C0\u03B5\u03C1\u03B9\u03BB\u03B1\u03BC\u03B2\u03B1\u03BD\u03BF\u03BC\u03AD\u03BD\u03BF\u03C5 KDV)} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {(\u03C3\u03C5\u03BC\u03C0\u03B5\u03C1\u03B9\u03BB\u03B1\u03BC\u03B2\u03B1\u03BD\u03BF\u03BC\u03AD\u03BD\u03BF\u03C5 \u03C4\u03BF\u03C5 GST)} VAT {(\u03C3\u03C5\u03BC\u03C0\u03B5\u03C1\u03B9\u03BB\u03B1\u03BC\u03B2\u03B1\u03BD\u03BF\u03BC\u03AD\u03BD\u03BF\u03C5 \u03A6\u03A0\u0391)} TAX {(\u03C3\u03C5\u03BC\u03C0\u03B5\u03C1\u03B9\u03BB\u03B1\u03BC\u03B2\u03B1\u03BD\u03BF\u03BC\u03AD\u03BD\u03BF\u03C5 \u03C4\u03BF\u03C5 \u03C6\u03CC\u03C1\u03BF\u03C5)} IVA {(\u03C3\u03C5\u03BC\u03C0\u03B5\u03C1\u03B9\u03BB\u03B1\u03BC\u03B2\u03B1\u03BD\u03BF\u03BC\u03AD\u03BD\u03BF\u03C5 \u03C4\u03BF\u03C5 IVA)} SST {(\u03C3\u03C5\u03BC\u03C0\u03B5\u03C1\u03B9\u03BB\u03B1\u03BC\u03B2\u03B1\u03BD\u03BF\u03BC\u03AD\u03BD\u03BF\u03C5 \u03C4\u03BF\u03C5 SST)} KDV {(\u03C3\u03C5\u03BC\u03C0\u03B5\u03C1\u03B9\u03BB\u03B1\u03BC\u03B2\u03B1\u03BD\u03BF\u03BC\u03AD\u03BD\u03BF\u03C5 \u03C4\u03BF\u03C5 KDV)} other {}}",alternativePriceAriaLabel:"\u0394\u03B9\u03B1\u03C6\u03BF\u03C1\u03B5\u03C4\u03B9\u03BA\u03AC, {alternativePrice}",strikethroughAriaLabel:"\u039A\u03B1\u03BD\u03BF\u03BD\u03B9\u03BA\u03AE \u03C4\u03B9\u03BC\u03AE {strikethroughPrice}"},{lang:"fil",recurrenceLabel:"{recurrenceTerm, select, MONTH {/buwan} YEAR {/taon} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {per buwan} YEAR {per taon} other {}}",perUnitLabel:"{perUnit, select, LICENSE {kada lisensya} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {kada lisensya} other {}}",freeLabel:"Libre",freeAriaLabel:"Libre",taxExclusiveLabel:"{taxTerm, select, GST {hindi kasama ang GST} VAT {hindi kasama ang VAT} TAX {hindi kasama ang Buwis} IVA {hindi kasama ang IVA} SST {hindi kasama ang SST} KDV {hindi kasama ang KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {kasama ang GST} VAT {kasama ang VAT} TAX {kasama ang Buwis} IVA {kasama ang IVA} SST {kasama ang SST} KDV {kasama ang KDV} other {}}",alternativePriceAriaLabel:"Alternatibong nasa halagang {alternativePrice}",strikethroughAriaLabel:"Regular na nasa halagang {strikethroughPrice}"},{lang:"ms",recurrenceLabel:"{recurrenceTerm, select, MONTH {/bulan} YEAR {/tahun} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {per bulan} YEAR {per tahun} other {}}",perUnitLabel:"{perUnit, select, LICENSE {setiap lesen} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {setiap lesen} other {}}",freeLabel:"Percuma",freeAriaLabel:"Percuma",taxExclusiveLabel:"{taxTerm, select, GST {kecuali GST} VAT {kecuali VAT} TAX {kecuali Cukai} IVA {kecuali IVA} SST {kecuali SST} KDV {kecuali KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {termasuk GST} VAT {termasuk VAT} TAX {termasuk Cukai} IVA {termasuk IVA} SST {termasuk SST} KDV {termasuk KDV} other {}}",alternativePriceAriaLabel:"Secara alternatif pada {alternativePrice}",strikethroughAriaLabel:"Biasanya pada {strikethroughPrice}"},{lang:"hi",recurrenceLabel:"{recurrenceTerm, select, MONTH {/\u092E\u093E\u0939} YEAR {/\u0935\u0930\u094D\u0937} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {per \u092E\u093E\u0939} YEAR {per \u0935\u0930\u094D\u0937} other {}}",perUnitLabel:"{perUnit, select, LICENSE {\u092A\u094D\u0930\u0924\u093F \u0932\u093E\u0907\u0938\u0947\u0902\u0938} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {\u092A\u094D\u0930\u0924\u093F \u0932\u093E\u0907\u0938\u0947\u0902\u0938} other {}}",freeLabel:"\u092B\u093C\u094D\u0930\u0940",freeAriaLabel:"\u092B\u093C\u094D\u0930\u0940",taxExclusiveLabel:"{taxTerm, select, GST {GST \u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924} VAT {VAT \u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924} TAX {\u0915\u0930 \u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924} IVA {IVA \u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924} SST {SST \u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924} KDV {KDV \u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {GST \u0938\u0939\u093F\u0924} VAT {VAT \u0938\u0939\u093F\u0924} TAX {\u0915\u0930 \u0938\u0939\u093F\u0924} IVA {IVA \u0938\u0939\u093F\u0924} SST {SST \u0938\u0939\u093F\u0924} KDV {KDV \u0938\u0939\u093F\u0924} other {}}",alternativePriceAriaLabel:"\u0935\u0948\u0915\u0932\u094D\u092A\u093F\u0915 \u0930\u0942\u092A \u0938\u0947 \u0907\u0938 \u092A\u0930 {alternativePrice}",strikethroughAriaLabel:"\u0928\u093F\u092F\u092E\u093F\u0924 \u0930\u0942\u092A \u0938\u0947 \u0907\u0938 \u092A\u0930 {strikethroughPrice}"},{lang:"iw",recurrenceLabel:"{recurrenceTerm, select, MONTH {/\u05D7\u05D5\u05D3\u05E9} YEAR {/\u05E9\u05E0\u05D4} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {\u05DC\u05D7\u05D5\u05D3\u05E9} YEAR {\u05DC\u05E9\u05E0\u05D4} other {}}",perUnitLabel:"{perUnit, select, LICENSE {\u05DC\u05E8\u05D9\u05E9\u05D9\u05D5\u05DF} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {\u05DC\u05E8\u05D9\u05E9\u05D9\u05D5\u05DF} other {}}",freeLabel:"\u05D7\u05D9\u05E0\u05DD",freeAriaLabel:"\u05D7\u05D9\u05E0\u05DD",taxExclusiveLabel:'{taxTerm, select, GST {\u05DC\u05DC\u05D0 GST} VAT {\u05DC\u05DC\u05D0 \u05DE\u05E2"\u05DE} TAX {\u05DC\u05DC\u05D0 \u05DE\u05E1} IVA {\u05DC\u05DC\u05D0 IVA} SST {\u05DC\u05DC\u05D0 SST} KDV {\u05DC\u05DC\u05D0 KDV} other {}}',taxInclusiveLabel:'{taxTerm, select, GST {\u05DB\u05D5\u05DC\u05DC GST} VAT {\u05DB\u05D5\u05DC\u05DC \u05DE\u05E2"\u05DE} TAX {\u05DB\u05D5\u05DC\u05DC \u05DE\u05E1} IVA {\u05DB\u05D5\u05DC\u05DC IVA} SST {\u05DB\u05D5\u05DC\u05DC SST} KDV {\u05DB\u05D5\u05DC\u05DC KDV} other {}}',alternativePriceAriaLabel:"\u05DC\u05D7\u05DC\u05D5\u05E4\u05D9\u05DF \u05D1-{alternativePrice}",strikethroughAriaLabel:"\u05D1\u05D0\u05D5\u05E4\u05DF \u05E7\u05D1\u05D5\u05E2 \u05D1-{strikethroughPrice}"}],":type":"sheet"}});(function(){let r={clientId:"",endpoint:"https://www.adobe.com/lana/ll",endpointStage:"https://www.stage.adobe.com/lana/ll",errorType:"e",sampleRate:1,tags:"",implicitSampleRate:1,useProd:!0,isProdDomain:!1},n=window;function i(){let{host:h}=window.location;return h.substring(h.length-10)===".adobe.com"&&h.substring(h.length-15)!==".corp.adobe.com"&&h.substring(h.length-16)!==".stage.adobe.com"}function o(h,d){h||(h={}),d||(d={});function u(m){return h[m]!==void 0?h[m]:d[m]!==void 0?d[m]:r[m]}return Object.keys(r).reduce((m,g)=>(m[g]=u(g),m),{})}function a(h,d){h=h&&h.stack?h.stack:h||"",h.length>2e3&&(h=`${h.slice(0,2e3)}<trunc>`);let u=o(d,n.lana.options);if(!u.clientId){console.warn("LANA ClientID is not set in options.");return}let g=parseInt(new URL(window.location).searchParams.get("lana-sample"),10)||(u.errorType==="i"?u.implicitSampleRate:u.sampleRate);if(!n.lana.debug&&!n.lana.localhost&&g<=Math.random()*100)return;let f=i()||u.isProdDomain,T=!f||!u.useProd?u.endpointStage:u.endpoint,L=[`m=${encodeURIComponent(h)}`,`c=${encodeURI(u.clientId)}`,`s=${g}`,`t=${encodeURI(u.errorType)}`];if(u.tags&&L.push(`tags=${encodeURI(u.tags)}`),(!f||n.lana.debug||n.lana.localhost)&&console.log("LANA Msg: ",h,`
Opts:`,u),!n.lana.localhost||n.lana.debug){let b=new XMLHttpRequest;return n.lana.debug&&(L.push("d"),b.addEventListener("load",()=>{console.log("LANA response:",b.responseText)})),b.open("GET",`${T}?${L.join("&")}`),b.send(),b}}function s(h){a(h.reason||h.error||h.message,{errorType:"i"})}function c(){return n.location.search.toLowerCase().indexOf("lanadebug")!==-1}function l(){return n.location.host.toLowerCase().indexOf("localhost")!==-1}n.lana={debug:!1,log:a,options:o(n.lana&&n.lana.options)},c()&&(n.lana.debug=!0),l()&&(n.lana.localhost=!0),n.addEventListener("error",s),n.addEventListener("unhandledrejection",s)})();var or=window,sr=or.ShadowRoot&&(or.ShadyCSS===void 0||or.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ao=Symbol(),oo=new WeakMap,ar=class{constructor(t,r,n){if(this._$cssResult$=!0,n!==ao)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o,r=this.t;if(sr&&t===void 0){let n=r!==void 0&&r.length===1;n&&(t=oo.get(r)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&oo.set(r,t))}return t}toString(){return this.cssText}},so=e=>new ar(typeof e=="string"?e:e+"",void 0,ao);var en=(e,t)=>{sr?e.adoptedStyleSheets=t.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet):t.forEach(r=>{let n=document.createElement("style"),i=or.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=r.cssText,e.appendChild(n)})},cr=sr?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let r="";for(let n of t.cssRules)r+=n.cssText;return so(r)})(e):e;var tn,lr=window,co=lr.trustedTypes,Xs=co?co.emptyScript:"",lo=lr.reactiveElementPolyfillSupport,nn={toAttribute(e,t){switch(t){case Boolean:e=e?Xs:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=e!==null;break;case Number:r=e===null?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},ho=(e,t)=>t!==e&&(t==t||e==e),rn={attribute:!0,type:String,converter:nn,reflect:!1,hasChanged:ho},on="finalized",we=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var r;this.finalize(),((r=this.h)!==null&&r!==void 0?r:this.h=[]).push(t)}static get observedAttributes(){this.finalize();let t=[];return this.elementProperties.forEach((r,n)=>{let i=this._$Ep(n,r);i!==void 0&&(this._$Ev.set(i,n),t.push(i))}),t}static createProperty(t,r=rn){if(r.state&&(r.attribute=!1),this.finalize(),this.elementProperties.set(t,r),!r.noAccessor&&!this.prototype.hasOwnProperty(t)){let n=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,n,r);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,r,n){return{get(){return this[r]},set(i){let o=this[t];this[r]=i,this.requestUpdate(t,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||rn}static finalize(){if(this.hasOwnProperty(on))return!1;this[on]=!0;let t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){let r=this.properties,n=[...Object.getOwnPropertyNames(r),...Object.getOwnPropertySymbols(r)];for(let i of n)this.createProperty(i,r[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){let r=[];if(Array.isArray(t)){let n=new Set(t.flat(1/0).reverse());for(let i of n)r.unshift(cr(i))}else t!==void 0&&r.push(cr(t));return r}static _$Ep(t,r){let n=r.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(r=>r(this))}addController(t){var r,n;((r=this._$ES)!==null&&r!==void 0?r:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)===null||n===void 0||n.call(t))}removeController(t){var r;(r=this._$ES)===null||r===void 0||r.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,r)=>{this.hasOwnProperty(r)&&(this._$Ei.set(r,this[r]),delete this[r])})}createRenderRoot(){var t;let r=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return en(r,this.constructor.elementStyles),r}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(r=>{var n;return(n=r.hostConnected)===null||n===void 0?void 0:n.call(r)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(r=>{var n;return(n=r.hostDisconnected)===null||n===void 0?void 0:n.call(r)})}attributeChangedCallback(t,r,n){this._$AK(t,n)}_$EO(t,r,n=rn){var i;let o=this.constructor._$Ep(t,n);if(o!==void 0&&n.reflect===!0){let a=(((i=n.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?n.converter:nn).toAttribute(r,n.type);this._$El=t,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$El=null}}_$AK(t,r){var n;let i=this.constructor,o=i._$Ev.get(t);if(o!==void 0&&this._$El!==o){let a=i.getPropertyOptions(o),s=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)===null||n===void 0?void 0:n.fromAttribute)!==void 0?a.converter:nn;this._$El=o,this[o]=s.fromAttribute(r,a.type),this._$El=null}}requestUpdate(t,r,n){let i=!0;t!==void 0&&(((n=n||this.constructor.getPropertyOptions(t)).hasChanged||ho)(this[t],r)?(this._$AL.has(t)||this._$AL.set(t,r),n.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,n))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(r){Promise.reject(r)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((i,o)=>this[o]=i),this._$Ei=void 0);let r=!1,n=this._$AL;try{r=this.shouldUpdate(n),r?(this.willUpdate(n),(t=this._$ES)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdate)===null||o===void 0?void 0:o.call(i)}),this.update(n)):this._$Ek()}catch(i){throw r=!1,this._$Ek(),i}r&&this._$AE(n)}willUpdate(t){}_$AE(t){var r;(r=this._$ES)===null||r===void 0||r.forEach(n=>{var i;return(i=n.hostUpdated)===null||i===void 0?void 0:i.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((r,n)=>this._$EO(n,this[n],r)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};we[on]=!0,we.elementProperties=new Map,we.elementStyles=[],we.shadowRootOptions={mode:"open"},lo?.({ReactiveElement:we}),((tn=lr.reactiveElementVersions)!==null&&tn!==void 0?tn:lr.reactiveElementVersions=[]).push("1.6.3");var an,hr=window,qe=hr.trustedTypes,uo=qe?qe.createPolicy("lit-html",{createHTML:e=>e}):void 0,cn="$lit$",xe=`lit$${(Math.random()+"").slice(9)}$`,vo="?"+xe,Ws=`<${vo}>`,Ce=document,dr=()=>Ce.createComment(""),kt=e=>e===null||typeof e!="object"&&typeof e!="function",Ao=Array.isArray,qs=e=>Ao(e)||typeof e?.[Symbol.iterator]=="function",sn=`[ 	
\f\r]`,Pt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,mo=/-->/g,po=/>/g,Le=RegExp(`>|${sn}(?:([^\\s"'>=/]+)(${sn}*=${sn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fo=/'/g,go=/"/g,Eo=/^(?:script|style|textarea|title)$/i,So=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),Gh=So(1),zh=So(2),It=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),xo=new WeakMap,_e=Ce.createTreeWalker(Ce,129,null,!1);function yo(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return uo!==void 0?uo.createHTML(t):t}var Zs=(e,t)=>{let r=e.length-1,n=[],i,o=t===2?"<svg>":"",a=Pt;for(let s=0;s<r;s++){let c=e[s],l,h,d=-1,u=0;for(;u<c.length&&(a.lastIndex=u,h=a.exec(c),h!==null);)u=a.lastIndex,a===Pt?h[1]==="!--"?a=mo:h[1]!==void 0?a=po:h[2]!==void 0?(Eo.test(h[2])&&(i=RegExp("</"+h[2],"g")),a=Le):h[3]!==void 0&&(a=Le):a===Le?h[0]===">"?(a=i??Pt,d=-1):h[1]===void 0?d=-2:(d=a.lastIndex-h[2].length,l=h[1],a=h[3]===void 0?Le:h[3]==='"'?go:fo):a===go||a===fo?a=Le:a===mo||a===po?a=Pt:(a=Le,i=void 0);let m=a===Le&&e[s+1].startsWith("/>")?" ":"";o+=a===Pt?c+Ws:d>=0?(n.push(l),c.slice(0,d)+cn+c.slice(d)+xe+m):c+xe+(d===-2?(n.push(void 0),s):m)}return[yo(e,o+(e[r]||"<?>")+(t===2?"</svg>":"")),n]},Nt=class e{constructor({strings:t,_$litType$:r},n){let i;this.parts=[];let o=0,a=0,s=t.length-1,c=this.parts,[l,h]=Zs(t,r);if(this.el=e.createElement(l,n),_e.currentNode=this.el.content,r===2){let d=this.el.content,u=d.firstChild;u.remove(),d.append(...u.childNodes)}for(;(i=_e.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes()){let d=[];for(let u of i.getAttributeNames())if(u.endsWith(cn)||u.startsWith(xe)){let m=h[a++];if(d.push(u),m!==void 0){let g=i.getAttribute(m.toLowerCase()+cn).split(xe),f=/([.?@])?(.*)/.exec(m);c.push({type:1,index:o,name:f[2],strings:g,ctor:f[1]==="."?hn:f[1]==="?"?dn:f[1]==="@"?un:Je})}else c.push({type:6,index:o})}for(let u of d)i.removeAttribute(u)}if(Eo.test(i.tagName)){let d=i.textContent.split(xe),u=d.length-1;if(u>0){i.textContent=qe?qe.emptyScript:"";for(let m=0;m<u;m++)i.append(d[m],dr()),_e.nextNode(),c.push({type:2,index:++o});i.append(d[u],dr())}}}else if(i.nodeType===8)if(i.data===vo)c.push({type:2,index:o});else{let d=-1;for(;(d=i.data.indexOf(xe,d+1))!==-1;)c.push({type:7,index:o}),d+=xe.length-1}o++}}static createElement(t,r){let n=Ce.createElement("template");return n.innerHTML=t,n}};function Ze(e,t,r=e,n){var i,o,a,s;if(t===It)return t;let c=n!==void 0?(i=r._$Co)===null||i===void 0?void 0:i[n]:r._$Cl,l=kt(t)?void 0:t._$litDirective$;return c?.constructor!==l&&((o=c?._$AO)===null||o===void 0||o.call(c,!1),l===void 0?c=void 0:(c=new l(e),c._$AT(e,r,n)),n!==void 0?((a=(s=r)._$Co)!==null&&a!==void 0?a:s._$Co=[])[n]=c:r._$Cl=c),c!==void 0&&(t=Ze(e,c._$AS(e,t.values),c,n)),t}var ln=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var r;let{el:{content:n},parts:i}=this._$AD,o=((r=t?.creationScope)!==null&&r!==void 0?r:Ce).importNode(n,!0);_e.currentNode=o;let a=_e.nextNode(),s=0,c=0,l=i[0];for(;l!==void 0;){if(s===l.index){let h;l.type===2?h=new ur(a,a.nextSibling,this,t):l.type===1?h=new l.ctor(a,l.name,l.strings,this,t):l.type===6&&(h=new mn(a,this,t)),this._$AV.push(h),l=i[++c]}s!==l?.index&&(a=_e.nextNode(),s++)}return _e.currentNode=Ce,o}v(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},ur=class e{constructor(t,r,n,i){var o;this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=i,this._$Cp=(o=i?.isConnected)===null||o===void 0||o}get _$AU(){var t,r;return(r=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&r!==void 0?r:this._$Cp}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Ze(this,t,r),kt(t)?t===D||t==null||t===""?(this._$AH!==D&&this._$AR(),this._$AH=D):t!==this._$AH&&t!==It&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):qs(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==D&&kt(this._$AH)?this._$AA.nextSibling.data=t:this.$(Ce.createTextNode(t)),this._$AH=t}g(t){var r;let{values:n,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Nt.createElement(yo(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)===null||r===void 0?void 0:r._$AD)===o)this._$AH.v(n);else{let a=new ln(o,this),s=a.u(this.options);a.v(n),this.$(s),this._$AH=a}}_$AC(t){let r=xo.get(t.strings);return r===void 0&&xo.set(t.strings,r=new Nt(t)),r}T(t){Ao(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,i=0;for(let o of t)i===r.length?r.push(n=new e(this.k(dr()),this.k(dr()),this,this.options)):n=r[i],n._$AI(o),i++;i<r.length&&(this._$AR(n&&n._$AB.nextSibling,i),r.length=i)}_$AR(t=this._$AA.nextSibling,r){var n;for((n=this._$AP)===null||n===void 0||n.call(this,!1,!0,r);t&&t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i}}setConnected(t){var r;this._$AM===void 0&&(this._$Cp=t,(r=this._$AP)===null||r===void 0||r.call(this,t))}},Je=class{constructor(t,r,n,i,o){this.type=1,this._$AH=D,this._$AN=void 0,this.element=t,this.name=r,this._$AM=i,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=D}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,r=this,n,i){let o=this.strings,a=!1;if(o===void 0)t=Ze(this,t,r,0),a=!kt(t)||t!==this._$AH&&t!==It,a&&(this._$AH=t);else{let s=t,c,l;for(t=o[0],c=0;c<o.length-1;c++)l=Ze(this,s[n+c],r,c),l===It&&(l=this._$AH[c]),a||(a=!kt(l)||l!==this._$AH[c]),l===D?t=D:t!==D&&(t+=(l??"")+o[c+1]),this._$AH[c]=l}a&&!i&&this.j(t)}j(t){t===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},hn=class extends Je{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===D?void 0:t}},Js=qe?qe.emptyScript:"",dn=class extends Je{constructor(){super(...arguments),this.type=4}j(t){t&&t!==D?this.element.setAttribute(this.name,Js):this.element.removeAttribute(this.name)}},un=class extends Je{constructor(t,r,n,i,o){super(t,r,n,i,o),this.type=5}_$AI(t,r=this){var n;if((t=(n=Ze(this,t,r,0))!==null&&n!==void 0?n:D)===It)return;let i=this._$AH,o=t===D&&i!==D||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==D&&(i===D||o);o&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var r,n;typeof this._$AH=="function"?this._$AH.call((n=(r=this.options)===null||r===void 0?void 0:r.host)!==null&&n!==void 0?n:this.element,t):this._$AH.handleEvent(t)}},mn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Ze(this,t)}};var bo=hr.litHtmlPolyfillSupport;bo?.(Nt,ur),((an=hr.litHtmlVersions)!==null&&an!==void 0?an:hr.litHtmlVersions=[]).push("2.8.0");var mr=window,pr=mr.ShadowRoot&&(mr.ShadyCSS===void 0||mr.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,pn=Symbol(),To=new WeakMap,Ot=class{constructor(t,r,n){if(this._$cssResult$=!0,n!==pn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o,r=this.t;if(pr&&t===void 0){let n=r!==void 0&&r.length===1;n&&(t=To.get(r)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&To.set(r,t))}return t}toString(){return this.cssText}},be=e=>new Ot(typeof e=="string"?e:e+"",void 0,pn),C=(e,...t)=>{let r=e.length===1?e[0]:t.reduce((n,i,o)=>n+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new Ot(r,e,pn)},fn=(e,t)=>{pr?e.adoptedStyleSheets=t.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet):t.forEach(r=>{let n=document.createElement("style"),i=mr.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=r.cssText,e.appendChild(n)})},fr=pr?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let r="";for(let n of t.cssRules)r+=n.cssText;return be(r)})(e):e;var gn,gr=window,wo=gr.trustedTypes,Qs=wo?wo.emptyScript:"",Lo=gr.reactiveElementPolyfillSupport,bn={toAttribute(e,t){switch(t){case Boolean:e=e?Qs:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=e!==null;break;case Number:r=e===null?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},_o=(e,t)=>t!==e&&(t==t||e==e),xn={attribute:!0,type:String,converter:bn,reflect:!1,hasChanged:_o},vn="finalized",se=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var r;this.finalize(),((r=this.h)!==null&&r!==void 0?r:this.h=[]).push(t)}static get observedAttributes(){this.finalize();let t=[];return this.elementProperties.forEach((r,n)=>{let i=this._$Ep(n,r);i!==void 0&&(this._$Ev.set(i,n),t.push(i))}),t}static createProperty(t,r=xn){if(r.state&&(r.attribute=!1),this.finalize(),this.elementProperties.set(t,r),!r.noAccessor&&!this.prototype.hasOwnProperty(t)){let n=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,n,r);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,r,n){return{get(){return this[r]},set(i){let o=this[t];this[r]=i,this.requestUpdate(t,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||xn}static finalize(){if(this.hasOwnProperty(vn))return!1;this[vn]=!0;let t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){let r=this.properties,n=[...Object.getOwnPropertyNames(r),...Object.getOwnPropertySymbols(r)];for(let i of n)this.createProperty(i,r[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){let r=[];if(Array.isArray(t)){let n=new Set(t.flat(1/0).reverse());for(let i of n)r.unshift(fr(i))}else t!==void 0&&r.push(fr(t));return r}static _$Ep(t,r){let n=r.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(r=>r(this))}addController(t){var r,n;((r=this._$ES)!==null&&r!==void 0?r:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)===null||n===void 0||n.call(t))}removeController(t){var r;(r=this._$ES)===null||r===void 0||r.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,r)=>{this.hasOwnProperty(r)&&(this._$Ei.set(r,this[r]),delete this[r])})}createRenderRoot(){var t;let r=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return fn(r,this.constructor.elementStyles),r}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(r=>{var n;return(n=r.hostConnected)===null||n===void 0?void 0:n.call(r)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(r=>{var n;return(n=r.hostDisconnected)===null||n===void 0?void 0:n.call(r)})}attributeChangedCallback(t,r,n){this._$AK(t,n)}_$EO(t,r,n=xn){var i;let o=this.constructor._$Ep(t,n);if(o!==void 0&&n.reflect===!0){let a=(((i=n.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?n.converter:bn).toAttribute(r,n.type);this._$El=t,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$El=null}}_$AK(t,r){var n;let i=this.constructor,o=i._$Ev.get(t);if(o!==void 0&&this._$El!==o){let a=i.getPropertyOptions(o),s=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)===null||n===void 0?void 0:n.fromAttribute)!==void 0?a.converter:bn;this._$El=o,this[o]=s.fromAttribute(r,a.type),this._$El=null}}requestUpdate(t,r,n){let i=!0;t!==void 0&&(((n=n||this.constructor.getPropertyOptions(t)).hasChanged||_o)(this[t],r)?(this._$AL.has(t)||this._$AL.set(t,r),n.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,n))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(r){Promise.reject(r)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((i,o)=>this[o]=i),this._$Ei=void 0);let r=!1,n=this._$AL;try{r=this.shouldUpdate(n),r?(this.willUpdate(n),(t=this._$ES)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdate)===null||o===void 0?void 0:o.call(i)}),this.update(n)):this._$Ek()}catch(i){throw r=!1,this._$Ek(),i}r&&this._$AE(n)}willUpdate(t){}_$AE(t){var r;(r=this._$ES)===null||r===void 0||r.forEach(n=>{var i;return(i=n.hostUpdated)===null||i===void 0?void 0:i.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((r,n)=>this._$EO(n,this[n],r)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};se[vn]=!0,se.elementProperties=new Map,se.elementStyles=[],se.shadowRootOptions={mode:"open"},Lo?.({ReactiveElement:se}),((gn=gr.reactiveElementVersions)!==null&&gn!==void 0?gn:gr.reactiveElementVersions=[]).push("1.6.3");var An,xr=window,Qe=xr.trustedTypes,Co=Qe?Qe.createPolicy("lit-html",{createHTML:e=>e}):void 0,Sn="$lit$",ve=`lit$${(Math.random()+"").slice(9)}$`,Mo="?"+ve,ec=`<${Mo}>`,Ie=document,Mt=()=>Ie.createComment(""),Vt=e=>e===null||typeof e!="object"&&typeof e!="function",Vo=Array.isArray,tc=e=>Vo(e)||typeof e?.[Symbol.iterator]=="function",En=`[ 	
\f\r]`,Rt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Po=/-->/g,ko=/>/g,Pe=RegExp(`>|${En}(?:([^\\s"'>=/]+)(${En}*=${En}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Io=/'/g,No=/"/g,$o=/^(?:script|style|textarea|title)$/i,Ho=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),x=Ho(1),Wh=Ho(2),Ne=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),Oo=new WeakMap,ke=Ie.createTreeWalker(Ie,129,null,!1);function Uo(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Co!==void 0?Co.createHTML(t):t}var rc=(e,t)=>{let r=e.length-1,n=[],i,o=t===2?"<svg>":"",a=Rt;for(let s=0;s<r;s++){let c=e[s],l,h,d=-1,u=0;for(;u<c.length&&(a.lastIndex=u,h=a.exec(c),h!==null);)u=a.lastIndex,a===Rt?h[1]==="!--"?a=Po:h[1]!==void 0?a=ko:h[2]!==void 0?($o.test(h[2])&&(i=RegExp("</"+h[2],"g")),a=Pe):h[3]!==void 0&&(a=Pe):a===Pe?h[0]===">"?(a=i??Rt,d=-1):h[1]===void 0?d=-2:(d=a.lastIndex-h[2].length,l=h[1],a=h[3]===void 0?Pe:h[3]==='"'?No:Io):a===No||a===Io?a=Pe:a===Po||a===ko?a=Rt:(a=Pe,i=void 0);let m=a===Pe&&e[s+1].startsWith("/>")?" ":"";o+=a===Rt?c+ec:d>=0?(n.push(l),c.slice(0,d)+Sn+c.slice(d)+ve+m):c+ve+(d===-2?(n.push(void 0),s):m)}return[Uo(e,o+(e[r]||"<?>")+(t===2?"</svg>":"")),n]},$t=class e{constructor({strings:t,_$litType$:r},n){let i;this.parts=[];let o=0,a=0,s=t.length-1,c=this.parts,[l,h]=rc(t,r);if(this.el=e.createElement(l,n),ke.currentNode=this.el.content,r===2){let d=this.el.content,u=d.firstChild;u.remove(),d.append(...u.childNodes)}for(;(i=ke.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes()){let d=[];for(let u of i.getAttributeNames())if(u.endsWith(Sn)||u.startsWith(ve)){let m=h[a++];if(d.push(u),m!==void 0){let g=i.getAttribute(m.toLowerCase()+Sn).split(ve),f=/([.?@])?(.*)/.exec(m);c.push({type:1,index:o,name:f[2],strings:g,ctor:f[1]==="."?Tn:f[1]==="?"?wn:f[1]==="@"?Ln:tt})}else c.push({type:6,index:o})}for(let u of d)i.removeAttribute(u)}if($o.test(i.tagName)){let d=i.textContent.split(ve),u=d.length-1;if(u>0){i.textContent=Qe?Qe.emptyScript:"";for(let m=0;m<u;m++)i.append(d[m],Mt()),ke.nextNode(),c.push({type:2,index:++o});i.append(d[u],Mt())}}}else if(i.nodeType===8)if(i.data===Mo)c.push({type:2,index:o});else{let d=-1;for(;(d=i.data.indexOf(ve,d+1))!==-1;)c.push({type:7,index:o}),d+=ve.length-1}o++}}static createElement(t,r){let n=Ie.createElement("template");return n.innerHTML=t,n}};function et(e,t,r=e,n){var i,o,a,s;if(t===Ne)return t;let c=n!==void 0?(i=r._$Co)===null||i===void 0?void 0:i[n]:r._$Cl,l=Vt(t)?void 0:t._$litDirective$;return c?.constructor!==l&&((o=c?._$AO)===null||o===void 0||o.call(c,!1),l===void 0?c=void 0:(c=new l(e),c._$AT(e,r,n)),n!==void 0?((a=(s=r)._$Co)!==null&&a!==void 0?a:s._$Co=[])[n]=c:r._$Cl=c),c!==void 0&&(t=et(e,c._$AS(e,t.values),c,n)),t}var yn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var r;let{el:{content:n},parts:i}=this._$AD,o=((r=t?.creationScope)!==null&&r!==void 0?r:Ie).importNode(n,!0);ke.currentNode=o;let a=ke.nextNode(),s=0,c=0,l=i[0];for(;l!==void 0;){if(s===l.index){let h;l.type===2?h=new Ht(a,a.nextSibling,this,t):l.type===1?h=new l.ctor(a,l.name,l.strings,this,t):l.type===6&&(h=new _n(a,this,t)),this._$AV.push(h),l=i[++c]}s!==l?.index&&(a=ke.nextNode(),s++)}return ke.currentNode=Ie,o}v(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Ht=class e{constructor(t,r,n,i){var o;this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=i,this._$Cp=(o=i?.isConnected)===null||o===void 0||o}get _$AU(){var t,r;return(r=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&r!==void 0?r:this._$Cp}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=et(this,t,r),Vt(t)?t===B||t==null||t===""?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==Ne&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):tc(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==B&&Vt(this._$AH)?this._$AA.nextSibling.data=t:this.$(Ie.createTextNode(t)),this._$AH=t}g(t){var r;let{values:n,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=$t.createElement(Uo(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)===null||r===void 0?void 0:r._$AD)===o)this._$AH.v(n);else{let a=new yn(o,this),s=a.u(this.options);a.v(n),this.$(s),this._$AH=a}}_$AC(t){let r=Oo.get(t.strings);return r===void 0&&Oo.set(t.strings,r=new $t(t)),r}T(t){Vo(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,i=0;for(let o of t)i===r.length?r.push(n=new e(this.k(Mt()),this.k(Mt()),this,this.options)):n=r[i],n._$AI(o),i++;i<r.length&&(this._$AR(n&&n._$AB.nextSibling,i),r.length=i)}_$AR(t=this._$AA.nextSibling,r){var n;for((n=this._$AP)===null||n===void 0||n.call(this,!1,!0,r);t&&t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i}}setConnected(t){var r;this._$AM===void 0&&(this._$Cp=t,(r=this._$AP)===null||r===void 0||r.call(this,t))}},tt=class{constructor(t,r,n,i,o){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=r,this._$AM=i,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=B}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,r=this,n,i){let o=this.strings,a=!1;if(o===void 0)t=et(this,t,r,0),a=!Vt(t)||t!==this._$AH&&t!==Ne,a&&(this._$AH=t);else{let s=t,c,l;for(t=o[0],c=0;c<o.length-1;c++)l=et(this,s[n+c],r,c),l===Ne&&(l=this._$AH[c]),a||(a=!Vt(l)||l!==this._$AH[c]),l===B?t=B:t!==B&&(t+=(l??"")+o[c+1]),this._$AH[c]=l}a&&!i&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Tn=class extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}},nc=Qe?Qe.emptyScript:"",wn=class extends tt{constructor(){super(...arguments),this.type=4}j(t){t&&t!==B?this.element.setAttribute(this.name,nc):this.element.removeAttribute(this.name)}},Ln=class extends tt{constructor(t,r,n,i,o){super(t,r,n,i,o),this.type=5}_$AI(t,r=this){var n;if((t=(n=et(this,t,r,0))!==null&&n!==void 0?n:B)===Ne)return;let i=this._$AH,o=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==B&&(i===B||o);o&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var r,n;typeof this._$AH=="function"?this._$AH.call((n=(r=this.options)===null||r===void 0?void 0:r.host)!==null&&n!==void 0?n:this.element,t):this._$AH.handleEvent(t)}},_n=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){et(this,t)}};var Ro=xr.litHtmlPolyfillSupport;Ro?.($t,Ht),((An=xr.litHtmlVersions)!==null&&An!==void 0?An:xr.litHtmlVersions=[]).push("2.8.0");var Do=(e,t,r)=>{var n,i;let o=(n=r?.renderBefore)!==null&&n!==void 0?n:t,a=o._$litPart$;if(a===void 0){let s=(i=r?.renderBefore)!==null&&i!==void 0?i:null;o._$litPart$=a=new Ht(t.insertBefore(Mt(),s),s,void 0,r??{})}return a._$AI(e),a};var Cn,Pn;var ee=class extends se{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,r;let n=super.createRenderRoot();return(t=(r=this.renderOptions).renderBefore)!==null&&t!==void 0||(r.renderBefore=n.firstChild),n}update(t){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Do(r,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return Ne}};ee.finalized=!0,ee._$litElement$=!0,(Cn=globalThis.litElementHydrateSupport)===null||Cn===void 0||Cn.call(globalThis,{LitElement:ee});var Bo=globalThis.litElementPolyfillSupport;Bo?.({LitElement:ee});((Pn=globalThis.litElementVersions)!==null&&Pn!==void 0?Pn:globalThis.litElementVersions=[]).push("3.3.3");var Ae="(max-width: 767px)",br="(max-width: 1199px)",V="(min-width: 768px)",M="(min-width: 1200px)",X="(min-width: 1600px)";var Go=C`
    :host {
        --consonant-merch-card-background-color: #fff;
        --consonant-merch-card-border: 1px solid var(--consonant-merch-card-border-color);
        
        -webkit-font-smoothing: antialiased;
        background-color: var(--consonant-merch-card-background-color);
        border-radius: var(--consonant-merch-spacing-xs);
        border: var(--consonant-merch-card-border);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        font-family: var(--merch-body-font-family, 'Adobe Clean');
        grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
        position: relative;
        text-align: start;
    }

    :host(.placeholder) {
        visibility: hidden;
    }

    :host([aria-selected]) {
        outline: none;
        box-shadow: inset 0 0 0 2px var(--color-accent);
    }

    .invisible {
        visibility: hidden;
    }

    :host(:hover) .invisible,
    :host(:active) .invisible,
    :host(:focus) .invisible {
        visibility: visible;
        background-image: var(--ellipsis-icon);
        cursor: pointer;
    }

    .action-menu.always-visible {
        visibility: visible;
        background-image: var(--ellipsis-icon);
        cursor: pointer;
    }

    .top-section {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 16px;
    }

    .top-section.badge {
        min-height: 32px;
    }

    .body {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        height: 100%;
        gap: var(--consonant-merch-spacing-xxs);
        padding: var(--consonant-merch-spacing-xs);
    }

    footer {
        display: flex;
        justify-content: flex-end;
        box-sizing: border-box;
        align-items: flex-end;
        width: 100%;
        flex-flow: wrap;
        gap: var(--consonant-merch-spacing-xs);

        padding: var(--consonant-merch-spacing-xs);
    }
    
    footer.footer-column {
        flex-direction: column;
    }
    
    footer.footer-column .secure-transaction-label {
        align-self: flex-start;
    }

    hr {
        background-color: var(--merch-color-grey-200);
        border: none;
        height: 1px;
        width: auto;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: var(--consonant-merch-spacing-xs);
        margin-right: var(--consonant-merch-spacing-xs);
    }

    div[class$='-badge'] {
        position: absolute;
        top: 16px;
        right: 0;
        font-size: var(--type-heading-xxs-size);
        font-weight: 500;
        max-width: 180px;
        line-height: 16px;
        text-align: center;
        padding: 8px 11px;
        border-radius: 5px 0 0 5px;
    }

    div[class$='-badge']:dir(rtl) {
        left: 0;
        right: initial;
        padding: 8px 11px;
        border-radius: 0 5px 5px 0;
    }

    .detail-bg-container {
        right: 0;
        padding: var(--consonant-merch-spacing-xs);
        border-radius: 5px;
        font-size: var(--consonant-merch-card-body-font-size);
        margin: var(--consonant-merch-spacing-xs);
    }

    .action-menu {
        display: flex;
        width: 32px;
        height: 32px;
        position: absolute;
        top: 16px;
        right: 16px;
        background-color: #f6f6f6;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 16px 16px;
        font-size: 0;
    }
    .hidden {
        visibility: hidden;
    }

    #stock-checkbox,
    .secure-transaction-label {
        font-size: var(--consonant-merch-card-body-xxs-font-size);
        line-height: 1.3;
        color: var(--merch-color-grey-600);
    }

    #stock-checkbox {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        gap: 10px; /*same as spectrum */
    }

    #stock-checkbox > input {
        display: none;
    }

    #stock-checkbox > span {
        display: inline-block;
        box-sizing: border-box;
        border: 2px solid rgb(117, 117, 117);
        border-radius: 2px;
        width: 14px;
        height: 14px;
    }

    #stock-checkbox > input:checked + span {
        background: var(--checkmark-icon) no-repeat var(--color-accent);
        border-color: var(--color-accent);
    }

    .secure-transaction-label {
        white-space: nowrap;
        display: inline-flex;
        gap: var(--consonant-merch-spacing-xxs);
        align-items: center;
        flex: 1;
        line-height: normal;
        align-self: center;
    }

    .secure-transaction-label::before {
        display: inline-block;
        content: '';
        width: 12px;
        height: 15px;
        background: var(--secure-icon) no-repeat;
        background-position: center;
        background-size: contain;
    }

    .checkbox-container {
        display: flex;
        align-items: center;
        gap: var(--consonant-merch-spacing-xxs);
    }

    .checkbox-container input[type='checkbox']:checked + .checkmark {
        background-color: var(--color-accent);
        background-image: var(--checkmark-icon);
        border-color: var(--color-accent);
    }

    .checkbox-container input[type='checkbox'] {
        display: none;
    }

    .checkbox-container .checkmark {
        position: relative;
        display: inline-block;
        width: 12px;
        height: 12px;
        border: 2px solid #757575;
        background: #fff;
        border-radius: 2px;
        cursor: pointer;
        margin-top: 2px;
    }

    slot[name='icons'] {
        display: flex;
        gap: 8px;
    }

    ::slotted([slot='price']) {
      color: var(--consonant-merch-card-price-color);
    }
`,zo=()=>[C`
        /* Tablet */
        @media screen and ${be(V)} {
            :host([size='wide']),
            :host([size='super-wide']) {
                width: 100%;
                grid-column: 1 / -1;
            }
        }

        /* Laptop */
        @media screen and ${be(M)} {
            :host([size='wide']) {
                grid-column: span 2;
            }
        `];var rt,Ut=class Ut{constructor(t){p(this,"card");F(this,rt);this.card=t,this.insertVariantStyle()}getContainer(){return j(this,rt,_(this,rt)??this.card.closest('[class*="-merch-cards"]')??this.card.parentElement),_(this,rt)}insertVariantStyle(){if(!Ut.styleMap[this.card.variant]){Ut.styleMap[this.card.variant]=!0;let t=document.createElement("style");t.innerHTML=this.getGlobalCSS(),document.head.appendChild(t)}}updateCardElementMinHeight(t,r){if(!t)return;let n=`--consonant-merch-card-${this.card.variant}-${r}-height`,i=Math.max(0,parseInt(window.getComputedStyle(t).height)||0),o=parseInt(this.getContainer().style.getPropertyValue(n))||0;i>o&&this.getContainer().style.setProperty(n,`${i}px`)}get badge(){let t;if(!(!this.card.badgeBackgroundColor||!this.card.badgeColor||!this.card.badgeText))return this.evergreen&&(t=`border: 1px solid ${this.card.badgeBackgroundColor}; border-right: none;`),x`
            <div
                id="badge"
                class="${this.card.variant}-badge"
                style="background-color: ${this.card.badgeBackgroundColor};
                color: ${this.card.badgeColor};
                ${t}"
            >
                ${this.card.badgeText}
            </div>
        `}get cardImage(){return x` <div class="image">
            <slot name="bg-image"></slot>
            ${this.badge}
        </div>`}getGlobalCSS(){return""}get theme(){return document.querySelector("sp-theme")}get evergreen(){return this.card.classList.contains("intro-pricing")}get promoBottom(){return this.card.classList.contains("promo-bottom")}get headingSelector(){return'[slot="heading-xs"]'}get secureLabelFooter(){let t=this.card.secureLabel?x`<span class="secure-transaction-label"
                  >${this.card.secureLabel}</span
              >`:"";return x`<footer>${t}<slot name="footer"></slot></footer>`}async adjustTitleWidth(){let t=this.card.getBoundingClientRect().width,r=this.card.badgeElement?.getBoundingClientRect().width||0;t===0||r===0||this.card.style.setProperty("--consonant-merch-card-heading-xs-max-width",`${Math.round(t-r-16)}px`)}postCardUpdateHook(){}connectedCallbackHook(){}disconnectedCallbackHook(){}renderLayout(){}get aemFragmentMapping(){}};rt=new WeakMap,p(Ut,"styleMap",{});var P=Ut;function te(e,t={},r=null,n=null){let i=n?document.createElement(e,{is:n}):document.createElement(e);r instanceof HTMLElement?i.appendChild(r):i.innerHTML=r;for(let[o,a]of Object.entries(t))i.setAttribute(o,a);return i}function vr(){return window.matchMedia("(max-width: 767px)").matches}function Fo(){return window.matchMedia("(max-width: 1024px)").matches}var jn={};Ks(jn,{CLASS_NAME_FAILED:()=>Mn,CLASS_NAME_HIDDEN:()=>oc,CLASS_NAME_PENDING:()=>Vn,CLASS_NAME_RESOLVED:()=>$n,ERROR_MESSAGE_BAD_REQUEST:()=>Sr,ERROR_MESSAGE_MISSING_LITERALS_URL:()=>pc,ERROR_MESSAGE_OFFER_NOT_FOUND:()=>Hn,EVENT_AEM_ERROR:()=>Re,EVENT_AEM_LOAD:()=>Oe,EVENT_MAS_ERROR:()=>Rn,EVENT_MAS_READY:()=>On,EVENT_MERCH_CARD_ACTION_MENU_TOGGLE:()=>Nn,EVENT_MERCH_CARD_COLLECTION_SHOWMORE:()=>uc,EVENT_MERCH_CARD_COLLECTION_SORT:()=>dc,EVENT_MERCH_CARD_READY:()=>In,EVENT_MERCH_OFFER_READY:()=>sc,EVENT_MERCH_OFFER_SELECT_READY:()=>kn,EVENT_MERCH_QUANTITY_SELECTOR_CHANGE:()=>Er,EVENT_MERCH_SEARCH_CHANGE:()=>hc,EVENT_MERCH_SIDENAV_SELECT:()=>mc,EVENT_MERCH_STOCK_CHANGE:()=>lc,EVENT_MERCH_STORAGE_CHANGE:()=>Ar,EVENT_OFFER_SELECTED:()=>cc,EVENT_TYPE_FAILED:()=>Un,EVENT_TYPE_READY:()=>nt,EVENT_TYPE_RESOLVED:()=>Dn,LOG_NAMESPACE:()=>Bn,Landscape:()=>Me,NAMESPACE:()=>ic,PARAM_AOS_API_KEY:()=>fc,PARAM_ENV:()=>Gn,PARAM_LANDSCAPE:()=>zn,PARAM_WCS_API_KEY:()=>gc,STATE_FAILED:()=>ce,STATE_PENDING:()=>Ee,STATE_RESOLVED:()=>le,TAG_NAME_SERVICE:()=>ac,WCS_PROD_URL:()=>Fn,WCS_STAGE_URL:()=>Kn});var ic="merch",oc="hidden",nt="wcms:commerce:ready",ac="mas-commerce-service",sc="merch-offer:ready",kn="merch-offer-select:ready",In="merch-card:ready",Nn="merch-card:action-menu-toggle",cc="merch-offer:selected",lc="merch-stock:change",Ar="merch-storage:change",Er="merch-quantity-selector:change",hc="merch-search:change",dc="merch-card-collection:sort",uc="merch-card-collection:showmore",mc="merch-sidenav:select",Oe="aem:load",Re="aem:error",On="mas:ready",Rn="mas:error",Mn="placeholder-failed",Vn="placeholder-pending",$n="placeholder-resolved",Sr="Bad WCS request",Hn="Commerce offer not found",pc="Literals URL not provided",Un="mas:failed",Dn="mas:resolved",Bn="mas/commerce",Gn="commerce.env",zn="commerce.landscape",fc="commerce.aosKey",gc="commerce.wcsKey",Fn="https://www.adobe.com/web_commerce_artifact",Kn="https://www.stage.adobe.com/web_commerce_artifact_stage",ce="failed",Ee="pending",le="resolved",Me={DRAFT:"DRAFT",PUBLISHED:"PUBLISHED"};var Ko=`
:root {
  --consonant-merch-card-catalog-width: 276px;
  --consonant-merch-card-catalog-icon-size: 40px;
}
.one-merch-card.catalog,
.two-merch-cards.catalog,
.three-merch-cards.catalog,
.four-merch-cards.catalog {
    grid-template-columns: var(--consonant-merch-card-catalog-width);
}

@media screen and ${V} {
    :root {
      --consonant-merch-card-catalog-width: 302px;
    }

    .two-merch-cards.catalog,
    .three-merch-cards.catalog,
    .four-merch-cards.catalog {
        grid-template-columns: repeat(2, var(--consonant-merch-card-catalog-width));
    }
}

@media screen and ${M} {
    :root {
      --consonant-merch-card-catalog-width: 276px;
    }

    .three-merch-cards.catalog,
    .four-merch-cards.catalog {
        grid-template-columns: repeat(3, var(--consonant-merch-card-catalog-width));
    }
}

@media screen and ${X} {
    .four-merch-cards.catalog {
        grid-template-columns: repeat(4, var(--consonant-merch-card-catalog-width));
    }
}

merch-card[variant="catalog"] [slot="action-menu-content"] {
  background-color: #000;
  color: var(--color-white, #fff);
  font-size: var(--consonant-merch-card-body-xs-font-size);
  width: fit-content;
  padding: var(--consonant-merch-spacing-xs);
  border-radius: var(--consonant-merch-spacing-xxxs);
  position: absolute;
  top: 55px;
  right: 15px;
  line-height: var(--consonant-merch-card-body-line-height);
}

merch-card[variant="catalog"] [slot="action-menu-content"] ul {
  padding-left: 0;
  padding-bottom: var(--consonant-merch-spacing-xss);
  margin-top: 0;
  margin-bottom: 0;
  list-style-position: inside;
  list-style-type: '\u2022 ';
}

merch-card[variant="catalog"] [slot="action-menu-content"] ul li {
  padding-left: 0;
  line-height: var(--consonant-merch-card-body-line-height);
}

merch-card[variant="catalog"] [slot="action-menu-content"] ::marker {
  margin-right: 0;
}

merch-card[variant="catalog"] [slot="action-menu-content"] p {
  color: var(--color-white, #fff);
}

merch-card[variant="catalog"] [slot="action-menu-content"] a {
  color: var(--consonant-merch-card-background-color);
  text-decoration: underline;
}

merch-card[variant="catalog"] .payment-details {
  font-size: var(--consonant-merch-card-body-font-size);
  font-style: italic;
  font-weight: 400;
  line-height: var(--consonant-merch-card-body-line-height);
}`;var Yn={badge:!0,ctas:{slot:"footer",size:"m"},description:{tag:"div",slot:"body-xs"},mnemonics:{size:"l"},prices:{tag:"h3",slot:"heading-xs"},size:["wide","super-wide"],title:{tag:"h3",slot:"heading-xs"}},it=class extends P{constructor(r){super(r);p(this,"dispatchActionMenuToggle",()=>{this.card.dispatchEvent(new CustomEvent(Nn,{bubbles:!0,composed:!0,detail:{card:this.card.name,type:"action-menu"}}))});p(this,"toggleActionMenu",r=>{if(!this.actionMenuContentSlot||!r||r.type!=="click"&&r.code!=="Space"&&r.code!=="Enter")return;r.preventDefault(),this.actionMenuContentSlot.classList.toggle("hidden");let n=this.actionMenuContentSlot.classList.contains("hidden");n||this.dispatchActionMenuToggle(),this.setAriaExpanded(this.actionMenu,(!n).toString())});p(this,"toggleActionMenuFromCard",r=>{let n=r?.type==="mouseleave"?!0:void 0;this.card.blur(),this.actionMenu?.classList.remove("always-visible"),this.actionMenuContentSlot&&(n||this.dispatchActionMenuToggle(),this.actionMenuContentSlot.classList.toggle("hidden",n),this.setAriaExpanded(this.actionMenu,"false"))});p(this,"hideActionMenu",r=>{this.actionMenuContentSlot?.classList.add("hidden"),this.setAriaExpanded(this.actionMenu,"false")});p(this,"focusEventHandler",r=>{this.actionMenu&&(this.actionMenu.classList.add("always-visible"),(r.relatedTarget?.nodeName==="MERCH-CARD-COLLECTION"||r.relatedTarget?.nodeName==="MERCH-CARD"&&r.target.nodeName!=="MERCH-ICON")&&this.actionMenu.classList.remove("always-visible"))})}get aemFragmentMapping(){return Yn}get actionMenu(){return this.card.shadowRoot.querySelector(".action-menu")}get actionMenuContentSlot(){return this.card.shadowRoot.querySelector('slot[name="action-menu-content"]')}renderLayout(){return x` <div class="body">
                <div class="top-section">
                    <slot name="icons"></slot> ${this.badge}
                    <div
                        class="action-menu
                ${Fo()&&this.card.actionMenu?"always-visible":""}
                ${this.card.actionMenu?"invisible":"hidden"}"
                        @click="${this.toggleActionMenu}"
                        @keypress="${this.toggleActionMenu}"
                        tabindex="0"
                        aria-expanded="false"
                        role="button"
                    >Action Menu</div>
                </div>
                <slot
                    name="action-menu-content"
                    class="action-menu-content
            ${this.card.actionMenuContent?"":"hidden"}"
                    @focusout="${this.hideActionMenu}"
                    >${this.card.actionMenuContent}
                </slot>
                <slot name="heading-xs"></slot>
                <slot name="heading-m"></slot>
                <slot name="body-xxs"></slot>
                ${this.promoBottom?"":x`<slot name="promo-text"></slot
                          ><slot name="callout-content"></slot>`}
                <slot name="body-xs"></slot>
                ${this.promoBottom?x`<slot name="promo-text"></slot
                          ><slot name="callout-content"></slot>`:""}
            </div>
            ${this.secureLabelFooter}
            <slot></slot>`}getGlobalCSS(){return Ko}setAriaExpanded(r,n){r.setAttribute("aria-expanded",n)}connectedCallbackHook(){this.card.addEventListener("mouseleave",this.toggleActionMenuFromCard),this.card.addEventListener("focusout",this.focusEventHandler)}disconnectedCallbackHook(){this.card.removeEventListener("mouseleave",this.toggleActionMenuFromCard),this.card.removeEventListener("focusout",this.focusEventHandler)}};p(it,"variantStyle",C`
        :host([variant='catalog']) {
            min-height: 330px;
            width: var(--consonant-merch-card-catalog-width);
        }

        .body .catalog-badge {
            display: flex;
            height: fit-content;
            flex-direction: column;
            width: fit-content;
            max-width: 140px;
            border-radius: 5px;
            position: relative;
            top: 0;
            margin-left: var(--consonant-merch-spacing-xxs);
            box-sizing: border-box;
        }
    `);var jo=`
:root {
  --consonant-merch-card-image-width: 300px;
}

.one-merch-card.image,
.two-merch-cards.image,
.three-merch-cards.image,
.four-merch-cards.image {
  grid-template-columns: var(--consonant-merch-card-image-width);
}

@media screen and ${V} {
  .two-merch-cards.image,
  .three-merch-cards.image,
  .four-merch-cards.image {
      grid-template-columns: repeat(2, var(--consonant-merch-card-image-width));
  }
}

@media screen and ${M} {
  :root {
    --consonant-merch-card-image-width: 378px;
    --consonant-merch-card-image-width-4clm: 276px;
  }
    
  .three-merch-cards.image {
      grid-template-columns: repeat(3, var(--consonant-merch-card-image-width));
  }

  .four-merch-cards.image {
      grid-template-columns: repeat(4, var(--consonant-merch-card-image-width-4clm));
  }
}
`;var yr=class extends P{constructor(t){super(t)}getGlobalCSS(){return jo}renderLayout(){return x`${this.cardImage}
    <div class="body">
        <slot name="icons"></slot>
        <slot name="heading-xs"></slot>
        <slot name="body-xxs"></slot>
        ${this.promoBottom?x`<slot name="body-xs"></slot><slot name="promo-text"></slot>`:x`<slot name="promo-text"></slot><slot name="body-xs"></slot>`}
    </div>
    ${this.evergreen?x`
              <div
                  class="detail-bg-container"
                  style="background: ${this.card.detailBg}"
              >
                  <slot name="detail-bg"></slot>
              </div>
          `:x`
              <hr />
              ${this.secureLabelFooter}
          `}`}};var Yo=`
:root {
  --consonant-merch-card-inline-heading-width: 300px;
}

.one-merch-card.inline-heading,
.two-merch-cards.inline-heading,
.three-merch-cards.inline-heading,
.four-merch-cards.inline-heading {
    grid-template-columns: var(--consonant-merch-card-inline-heading-width);
}

@media screen and ${V} {
  .two-merch-cards.inline-heading,
  .three-merch-cards.inline-heading,
  .four-merch-cards.inline-heading {
      grid-template-columns: repeat(2, var(--consonant-merch-card-inline-heading-width));
  }
}

@media screen and ${M} {
  :root {
    --consonant-merch-card-inline-heading-width: 378px;
  }

  .three-merch-cards.inline-heading,
  .four-merch-cards.inline-heading {
      grid-template-columns: repeat(3, var(--consonant-merch-card-inline-heading-width));
  }
}

@media screen and ${X} {
  .four-merch-cards.inline-heading {
      grid-template-columns: repeat(4, var(--consonant-merch-card-inline-heading-width));
  }
}
`;var Tr=class extends P{constructor(t){super(t)}getGlobalCSS(){return Yo}renderLayout(){return x` ${this.badge}
    <div class="body">
        <div class="top-section">
            <slot name="icons"></slot>
            <slot name="heading-xs"></slot>
        </div>
        <slot name="body-xs"></slot>
    </div>
    ${this.card.customHr?"":x`<hr />`} ${this.secureLabelFooter}`}};var Xo=`
  :root {
    --consonant-merch-card-mini-compare-chart-icon-size: 32px;
    --consonant-merch-card-mini-compare-mobile-cta-font-size: 15px;
    --consonant-merch-card-mini-compare-mobile-cta-width: 75px;
    --consonant-merch-card-mini-compare-badge-mobile-max-width: 50px;
  }
  
  merch-card[variant="mini-compare-chart"] [slot="heading-m"] {
    padding: 0 var(--consonant-merch-spacing-s) 0;
  }

  merch-card[variant="mini-compare-chart"].bullet-list [slot="heading-m"] {
    padding: var(--consonant-merch-spacing-xxs) var(--consonant-merch-spacing-xs);
    font-size: var(--consonant-merch-card-heading-xs-font-size);
  }

  merch-card[variant="mini-compare-chart"].bullet-list [slot='heading-m-price'] {
    font-size: var(--consonant-merch-card-body-xxl-font-size);
    padding: 0 var(--consonant-merch-spacing-xs);
  }

  merch-card[variant="mini-compare-chart"] [slot="body-m"] {
    padding: var(--consonant-merch-spacing-xs) var(--consonant-merch-spacing-s);
  }

  merch-card[variant="mini-compare-chart"].bullet-list [slot="body-m"] {
    padding: var(--consonant-merch-spacing-xs);
  }

  merch-card[variant="mini-compare-chart"] [is="inline-price"] {
    display: inline-block;
    min-height: 30px;
    min-width: 1px;
  }

  merch-card[variant="mini-compare-chart"] [slot='callout-content'] {
    padding: var(--consonant-merch-spacing-xs) var(--consonant-merch-spacing-s) 0px;
  }

  merch-card[variant="mini-compare-chart"].bullet-list [slot='callout-content'] {
    padding: var(--consonant-merch-spacing-xs) var(--consonant-merch-spacing-xs) 0px;
  }

  merch-card[variant="mini-compare-chart"] [slot='callout-content'] [is="inline-price"] {
    min-height: unset;
  }

  merch-card[variant="mini-compare-chart"] [slot="price-commitment"] {
    font-size: var(--consonant-merch-card-body-xs-font-size);
    padding: 0 var(--consonant-merch-spacing-s);
  }

  merch-card[variant="mini-compare-chart"] [slot="price-commitment"] a {
    display: inline-block;
    height: 27px;
  }

  merch-card[variant="mini-compare-chart"] [slot="offers"] {
    font-size: var(--consonant-merch-card-body-xs-font-size);
  }

  merch-card[variant="mini-compare-chart"] [slot="body-xxs"] {
    font-size: var(--consonant-merch-card-body-xs-font-size);
    padding: var(--consonant-merch-spacing-xs) var(--consonant-merch-spacing-s) 0;    
  }

   merch-card[variant="mini-compare-chart"].bullet-list [slot="body-xxs"] {
    padding: var(--consonant-merch-spacing-xs) var(--consonant-merch-spacing-xs) 0;    
  }

  merch-card[variant="mini-compare-chart"] [slot="promo-text"] {
    font-size: var(--consonant-merch-card-body-m-font-size);
    padding: var(--consonant-merch-spacing-xs) var(--consonant-merch-spacing-s) 0;
  }

  merch-card[variant="mini-compare-chart"].bullet-list [slot="promo-text"] {
    padding: var(--consonant-merch-spacing-xs) var(--consonant-merch-spacing-xs) 0;
  }

  merch-card[variant="mini-compare-chart"] [slot="promo-text"] a {
    text-decoration: underline;
  }

  merch-card[variant="mini-compare-chart"] .action-area {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-wrap: wrap;
    width: 100%;
    gap: var(--consonant-merch-spacing-xs);
  }

  merch-card[variant="mini-compare-chart"] [slot="footer-rows"] ul {
    margin-block-start: 0px;
    margin-block-end: 0px;
    padding-inline-start: 0px;
  }

  merch-card[variant="mini-compare-chart"] .footer-row-icon {
    display: flex;
    place-items: center;
  }

  merch-card[variant="mini-compare-chart"] .footer-row-icon img {
    max-width: initial;
    width: var(--consonant-merch-card-mini-compare-chart-icon-size);
    height: var(--consonant-merch-card-mini-compare-chart-icon-size);
  }

  merch-card[variant="mini-compare-chart"] .footer-rows-title {
    font-color: var(--merch-color-grey-80);
    font-weight: 700;
    padding-block-end: var(--consonant-merch-spacing-xxs);
    line-height: var(--consonant-merch-card-body-xs-line-height);
    font-size: var(--consonant-merch-card-body-xs-font-size);
  }

  merch-card[variant="mini-compare-chart"] .footer-row-cell {
    border-top: 1px solid var(--consonant-merch-card-border-color);
    display: flex;
    gap: var(--consonant-merch-spacing-xs);
    justify-content: start;
    place-items: center;
    padding: var(--consonant-merch-spacing-xs) var(--consonant-merch-spacing-s);
    margin-block: 0px;
  }

  merch-card[variant="mini-compare-chart"] .footer-row-icon-checkmark img {
    max-width: initial;
  }

  merch-card[variant="mini-compare-chart"] .footer-row-icon-checkmark {
    display: flex;
    align-items: center;
    height: 20px;
  }

  merch-card[variant="mini-compare-chart"] .footer-row-cell-checkmark {
    display: flex;
    gap: var(--consonant-merch-spacing-xs);
    justify-content: start;
    align-items: flex-start;
    margin-block: var(--consonant-merch-spacing-xxxs);
  }

  merch-card[variant="mini-compare-chart"] .footer-row-cell-description-checkmark {
    font-size: var(--consonant-merch-card-body-xs-font-size);
    font-weight: 400;
    line-height: var(--consonant-merch-card-body-xs-line-height);
  }

  merch-card[variant="mini-compare-chart"] .footer-row-cell-description {
    font-size: var(--consonant-merch-card-body-s-font-size);
    line-height: var(--consonant-merch-card-body-s-line-height);
  }

  merch-card[variant="mini-compare-chart"] .footer-row-cell-description p {
    color: var(--merch-color-grey-80);
    vertical-align: bottom;
  }

  merch-card[variant="mini-compare-chart"] .footer-row-cell-description a {
    color: var(--color-accent);
  }

  merch-card[variant="mini-compare-chart"] .chevron-icon {
    margin-left: 8px;
  }

  merch-card[variant="mini-compare-chart"] .checkmark-copy-container {
    display: none;
  }

  merch-card[variant="mini-compare-chart"] .checkmark-copy-container.open {
    display: block;
  }
  
.one-merch-card.mini-compare-chart {
  grid-template-columns: var(--consonant-merch-card-mini-compare-chart-wide-width);
  gap: var(--consonant-merch-spacing-xs);
}

.two-merch-cards.mini-compare-chart,
.three-merch-cards.mini-compare-chart,
.four-merch-cards.mini-compare-chart {
  grid-template-columns: repeat(2, var(--consonant-merch-card-mini-compare-chart-width));
  gap: var(--consonant-merch-spacing-xs);
}

/* mini compare mobile */ 
@media screen and ${Ae} {
  :root {
    --consonant-merch-card-mini-compare-chart-width: 302px;
    --consonant-merch-card-mini-compare-chart-wide-width: 302px;
  }

  .two-merch-cards.mini-compare-chart,
  .three-merch-cards.mini-compare-chart,
  .four-merch-cards.mini-compare-chart {
    grid-template-columns: var(--consonant-merch-card-mini-compare-chart-width);
    gap: var(--consonant-merch-spacing-xs);
  }

  merch-card[variant="mini-compare-chart"] [slot='heading-m'] {
    font-size: var(--consonant-merch-card-body-s-font-size);
    line-height: var(--consonant-merch-card-body-s-line-height);
  }

  merch-card[variant="mini-compare-chart"] [slot='heading-m-price'] {
    font-size: var(--consonant-merch-card-body-s-font-size);
    line-height: var(--consonant-merch-card-body-s-line-height);
  }

  merch-card[variant="mini-compare-chart"] [slot='body-m'] {
    font-size: var(--consonant-merch-card-body-xs-font-size);
    line-height: var(--consonant-merch-card-body-xs-line-height);
  }
  
  merch-card[variant="mini-compare-chart"] [slot="promo-text"] {
    font-size: var(--consonant-merch-card-body-xs-font-size);
    line-height: var(--consonant-merch-card-body-xs-line-height);
  }
  merch-card[variant="mini-compare-chart"] .footer-row-cell-description {
    font-size: var(--consonant-merch-card-body-xs-font-size);
    line-height: var(--consonant-merch-card-body-xs-line-height);
  }
}

@media screen and ${br} {
  merch-card[variant="mini-compare-chart"] [slot='heading-m'] {
    font-size: var(--consonant-merch-card-body-s-font-size);
    line-height: var(--consonant-merch-card-body-s-line-height);
  }

  merch-card[variant="mini-compare-chart"] [slot='heading-m-price'] {
    font-size: var(--consonant-merch-card-body-s-font-size);
    line-height: var(--consonant-merch-card-body-s-line-height);
  }

  merch-card[variant="mini-compare-chart"] [slot='body-m'] {
    font-size: var(--consonant-merch-card-body-xs-font-size);
    line-height: var(--consonant-merch-card-body-xs-line-height);
  }

  merch-card[variant="mini-compare-chart"] [slot="promo-text"] {
    font-size: var(--consonant-merch-card-body-xs-font-size);
    line-height: var(--consonant-merch-card-body-xs-line-height);
  }
  
  merch-card[variant="mini-compare-chart"] .footer-row-cell-description {
    font-size: var(--consonant-merch-card-body-xs-font-size);
    line-height: var(--consonant-merch-card-body-xs-line-height);
  }
}
@media screen and ${V} {
  :root {
    --consonant-merch-card-mini-compare-chart-width: 302px;
    --consonant-merch-card-mini-compare-chart-wide-width: 302px;
  }

  .two-merch-cards.mini-compare-chart {
    grid-template-columns: repeat(2, minmax(var(--consonant-merch-card-mini-compare-chart-width), var(--consonant-merch-card-mini-compare-chart-wide-width)));
    gap: var(--consonant-merch-spacing-m);
  }

  .three-merch-cards.mini-compare-chart,
  .four-merch-cards.mini-compare-chart {
      grid-template-columns: repeat(2, minmax(var(--consonant-merch-card-mini-compare-chart-width), var(--consonant-merch-card-mini-compare-chart-wide-width)));
  }
}

/* desktop */
@media screen and ${M} {
  :root {
    --consonant-merch-card-mini-compare-chart-width: 378px;
    --consonant-merch-card-mini-compare-chart-wide-width: 484px;  
  }
  .one-merch-card.mini-compare-chart {
    grid-template-columns: var(--consonant-merch-card-mini-compare-chart-wide-width);
  }

  .two-merch-cards.mini-compare-chart {
    grid-template-columns: repeat(2, var(--consonant-merch-card-mini-compare-chart-wide-width));
    gap: var(--consonant-merch-spacing-m);
  }

  .three-merch-cards.mini-compare-chart,
  .four-merch-cards.mini-compare-chart {
    grid-template-columns: repeat(3, var(--consonant-merch-card-mini-compare-chart-width));
    gap: var(--consonant-merch-spacing-m);
  }
}

@media screen and ${X} {
  .four-merch-cards.mini-compare-chart {
      grid-template-columns: repeat(4, var(--consonant-merch-card-mini-compare-chart-width));
  }
}

merch-card .footer-row-cell:nth-child(1) {
  min-height: var(--consonant-merch-card-footer-row-1-min-height);
}

merch-card .footer-row-cell:nth-child(2) {
  min-height: var(--consonant-merch-card-footer-row-2-min-height);
}

merch-card .footer-row-cell:nth-child(3) {
  min-height: var(--consonant-merch-card-footer-row-3-min-height);
}

merch-card .footer-row-cell:nth-child(4) {
  min-height: var(--consonant-merch-card-footer-row-4-min-height);
}

merch-card .footer-row-cell:nth-child(5) {
  min-height: var(--consonant-merch-card-footer-row-5-min-height);
}

merch-card .footer-row-cell:nth-child(6) {
  min-height: var(--consonant-merch-card-footer-row-6-min-height);
}

merch-card .footer-row-cell:nth-child(7) {
  min-height: var(--consonant-merch-card-footer-row-7-min-height);
}

merch-card .footer-row-cell:nth-child(8) {
  min-height: var(--consonant-merch-card-footer-row-8-min-height);
}
`;var xc=32,ot=class extends P{constructor(r){super(r);p(this,"getRowMinHeightPropertyName",r=>`--consonant-merch-card-footer-row-${r}-min-height`);p(this,"getMiniCompareFooter",()=>{let r=this.card.secureLabel?x`<slot name="secure-transaction-label">
              <span class="secure-transaction-label"
                  >${this.card.secureLabel}</span
              ></slot
          >`:x`<slot name="secure-transaction-label"></slot>`;return x`<footer>${r}<slot name="footer"></slot></footer>`})}getGlobalCSS(){return Xo}adjustMiniCompareBodySlots(){if(this.card.getBoundingClientRect().width<=2)return;this.updateCardElementMinHeight(this.card.shadowRoot.querySelector(".top-section"),"top-section");let r=["heading-m","body-m","heading-m-price","body-xxs","price-commitment","offers","promo-text","callout-content"];this.card.classList.contains("bullet-list")&&r.push("footer-rows"),r.forEach(i=>this.updateCardElementMinHeight(this.card.shadowRoot.querySelector(`slot[name="${i}"]`),i)),this.updateCardElementMinHeight(this.card.shadowRoot.querySelector("footer"),"footer");let n=this.card.shadowRoot.querySelector(".mini-compare-chart-badge");n&&n.textContent!==""&&this.getContainer().style.setProperty("--consonant-merch-card-mini-compare-chart-top-section-mobile-height","32px")}adjustMiniCompareFooterRows(){if(this.card.getBoundingClientRect().width===0)return;[...this.card.querySelector('[slot="footer-rows"] ul')?.children].forEach((n,i)=>{let o=Math.max(xc,parseFloat(window.getComputedStyle(n).height)||0),a=parseFloat(this.getContainer().style.getPropertyValue(this.getRowMinHeightPropertyName(i+1)))||0;o>a&&this.getContainer().style.setProperty(this.getRowMinHeightPropertyName(i+1),`${o}px`)})}removeEmptyRows(){this.card.querySelectorAll(".footer-row-cell").forEach(n=>{let i=n.querySelector(".footer-row-cell-description");i&&!i.textContent.trim()&&n.remove()})}renderLayout(){return x` <div class="top-section${this.badge?" badge":""}">
            <slot name="icons"></slot> ${this.badge}
        </div>
        <slot name="heading-m"></slot>
        ${this.card.classList.contains("bullet-list")?x`<slot name="heading-m-price"></slot>
          <slot name="body-m"></slot>`:x`<slot name="body-m"></slot>
          <slot name="heading-m-price"></slot>`}
        <slot name="body-xxs"></slot>
        <slot name="price-commitment"></slot>
        <slot name="offers"></slot>
        <slot name="promo-text"></slot>
        <slot name="callout-content"></slot>
        ${this.getMiniCompareFooter()}
        <slot name="footer-rows"><slot name="body-s"></slot></slot>`}async postCardUpdateHook(){vr()?this.removeEmptyRows():(await Promise.all(this.card.prices.map(r=>r.onceSettled())),this.adjustMiniCompareBodySlots(),this.adjustMiniCompareFooterRows())}};p(ot,"variantStyle",C`
    :host([variant='mini-compare-chart']) > slot:not([name='icons']) {
        display: block;
    }
    :host([variant='mini-compare-chart']) footer {
        min-height: var(--consonant-merch-card-mini-compare-chart-footer-height);
        padding: var(--consonant-merch-spacing-s);
    }

    :host([variant='mini-compare-chart'].bullet-list) footer {
        flex-flow: column nowrap;
        min-height: var(--consonant-merch-card-mini-compare-chart-footer-height);
        padding: var(--consonant-merch-spacing-xs);
    }

    /* mini-compare card  */
    :host([variant='mini-compare-chart']) .top-section {
        padding-top: var(--consonant-merch-spacing-s);
        padding-inline-start: var(--consonant-merch-spacing-s);
        height: var(--consonant-merch-card-mini-compare-chart-top-section-height);
    }

    :host([variant='mini-compare-chart'].bullet-list) .top-section {
        padding-top: var(--consonant-merch-spacing-xs);
        padding-inline-start: var(--consonant-merch-spacing-xs);
    }

    :host([variant='mini-compare-chart'].bullet-list) .secure-transaction-label {
      align-self: flex-start;
      flex: none;
      color: var(--merch-color-grey-700);
    }

    @media screen and ${be(br)} {
        [class*'-merch-cards'] :host([variant='mini-compare-chart']) footer {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
        }
    }

    @media screen and ${be(M)} {
        :host([variant='mini-compare-chart']) footer {
            padding: var(--consonant-merch-spacing-xs)
                var(--consonant-merch-spacing-s)
                var(--consonant-merch-spacing-s)
                var(--consonant-merch-spacing-s);
        }
    }

    :host([variant='mini-compare-chart']) slot[name='footer-rows'] {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: end;
    }
    /* mini-compare card heights for the slots: heading-m, body-m, heading-m-price, price-commitment, offers, promo-text, footer */
    :host([variant='mini-compare-chart']) slot[name='heading-m'] {
        min-height: var(--consonant-merch-card-mini-compare-chart-heading-m-height);
    }
    :host([variant='mini-compare-chart']) slot[name='body-m'] {
        min-height: var(--consonant-merch-card-mini-compare-chart-body-m-height);
    }
    :host([variant='mini-compare-chart']) slot[name='heading-m-price'] {
        min-height: var(
            --consonant-merch-card-mini-compare-chart-heading-m-price-height
        );
    }
    :host([variant='mini-compare-chart']) slot[name='body-xxs'] {
        min-height: var(
            --consonant-merch-card-mini-compare-chart-body-xxs-height
        );
    }
    :host([variant='mini-compare-chart']) slot[name='price-commitment'] {
        min-height: var(
            --consonant-merch-card-mini-compare-chart-price-commitment-height
        );
    }
    :host([variant='mini-compare-chart']) slot[name='offers'] {
        min-height: var(--consonant-merch-card-mini-compare-chart-offers-height);
    }
    :host([variant='mini-compare-chart']) slot[name='promo-text'] {
        min-height: var(--consonant-merch-card-mini-compare-chart-promo-text-height);
    }
    :host([variant='mini-compare-chart']) slot[name='callout-content'] {
        min-height: var(
            --consonant-merch-card-mini-compare-chart-callout-content-height
        );
    }
    :host([variant='mini-compare-chart']) slot[name='footer-rows'] {
        justify-content: flex-start;
    }
  `);var Wo=`
:root {
  --consonant-merch-card-plans-width: 300px;
  --consonant-merch-card-plans-icon-size: 40px;
}
  
merch-card[variant="plans"] [slot="description"] {
  min-height: 84px;
}

merch-card[variant="plans"] [slot="quantity-select"] {
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  width: 100%;
  padding: var(--consonant-merch-spacing-xs);
}

.one-merch-card.plans,
.two-merch-cards.plans,
.three-merch-cards.plans,
.four-merch-cards.plans {
    grid-template-columns: var(--consonant-merch-card-plans-width);
}

/* Tablet */
@media screen and ${V} {
  :root {
    --consonant-merch-card-plans-width: 302px;
  }
  .two-merch-cards.plans,
  .three-merch-cards.plans,
  .four-merch-cards.plans {
      grid-template-columns: repeat(2, var(--consonant-merch-card-plans-width));
  }
}

/* desktop */
@media screen and ${M} {
  :root {
    --consonant-merch-card-plans-width: 276px;
  }
  .three-merch-cards.plans,
  .four-merch-cards.plans {
      grid-template-columns: repeat(3, var(--consonant-merch-card-plans-width));
  }
}

/* Large desktop */
    @media screen and ${X} {
    .four-merch-cards.plans {
        grid-template-columns: repeat(4, var(--consonant-merch-card-plans-width));
    }
}
`;var at=class extends P{constructor(t){super(t)}getGlobalCSS(){return Wo}postCardUpdateHook(){this.adjustTitleWidth()}get stockCheckbox(){return this.card.checkboxLabel?x`<label id="stock-checkbox">
                <input type="checkbox" @change=${this.card.toggleStockOffer}></input>
                <span></span>
                ${this.card.checkboxLabel}
            </label>`:""}renderLayout(){return x` ${this.badge}
        <div class="body">
            <slot name="icons"></slot>
            <slot name="heading-xs"></slot>
            <slot name="heading-m"></slot>
            <slot name="body-xxs"></slot>
            ${this.promoBottom?"":x`<slot name="promo-text"></slot><slot name="callout-content"></slot> `}
            <slot name="body-xs"></slot>
            ${this.promoBottom?x`<slot name="promo-text"></slot><slot name="callout-content"></slot> `:""}  
            ${this.stockCheckbox}
        </div>
        <slot name="quantity-select"></slot>
        ${this.secureLabelFooter}`}};p(at,"variantStyle",C`
    :host([variant='plans']) {
      min-height: 348px;
    }
      
    :host([variant='plans']) ::slotted([slot='heading-xs']) {
      max-width: var(--consonant-merch-card-heading-xs-max-width, 100%);
    }
  `);var qo=`
:root {
  --consonant-merch-card-product-width: 300px;
}

/* grid style for product */
.one-merch-card.product,
.two-merch-cards.product,
.three-merch-cards.product,
.four-merch-cards.product {
    grid-template-columns: var(--consonant-merch-card-product-width);
}

/* Tablet */
@media screen and ${V} {
    .two-merch-cards.product,
    .three-merch-cards.product,
    .four-merch-cards.product {
        grid-template-columns: repeat(2, var(--consonant-merch-card-product-width));
    }
}

/* desktop */
@media screen and ${M} {
  :root {
    --consonant-merch-card-product-width: 378px;
    --consonant-merch-card-product-width-4clm: 276px;
  }
    
  .three-merch-cards.product {
      grid-template-columns: repeat(3, var(--consonant-merch-card-product-width));
  }

  .four-merch-cards.product {
      grid-template-columns: repeat(4, var(--consonant-merch-card-product-width-4clm));
  }
}
`;var Ve=class extends P{constructor(t){super(t),this.postCardUpdateHook=this.postCardUpdateHook.bind(this)}getGlobalCSS(){return qo}adjustProductBodySlots(){if(this.card.getBoundingClientRect().width===0)return;["heading-xs","body-xxs","body-xs","promo-text","callout-content","body-lower"].forEach(r=>this.updateCardElementMinHeight(this.card.shadowRoot.querySelector(`slot[name="${r}"]`),r))}renderLayout(){return x` ${this.badge}
      <div class="body" aria-live="polite">
          <slot name="icons"></slot>
          <slot name="heading-xs"></slot>
          <slot name="body-xxs"></slot>
          ${this.promoBottom?"":x`<slot name="promo-text"></slot>`}
          <slot name="body-xs"></slot>
          ${this.promoBottom?x`<slot name="promo-text"></slot>`:""}
          <slot name="callout-content"></slot>
          <slot name="body-lower"></slot>
      </div>
      ${this.secureLabelFooter}`}connectedCallbackHook(){window.addEventListener("resize",this.postCardUpdateHook)}disconnectedCallbackHook(){window.removeEventListener("resize",this.postCardUpdateHook)}postCardUpdateHook(){this.card.isConnected&&(vr()||this.adjustProductBodySlots(),this.adjustTitleWidth())}};p(Ve,"variantStyle",C`
    :host([variant='product']) > slot:not([name='icons']) {
        display: block;
    }
    :host([variant='product']) slot[name='body-xs'] {
        min-height: var(--consonant-merch-card-product-body-xs-height);
        display: block;
    }
    :host([variant='product']) slot[name='heading-xs'] {
        min-height: var(--consonant-merch-card-product-heading-xs-height);
        display: block;
    }
    :host([variant='product']) slot[name='body-xxs'] {
        min-height: var(--consonant-merch-card-product-body-xxs-height);
        display: block;
    }
    :host([variant='product']) slot[name='promo-text'] {
        min-height: var(--consonant-merch-card-product-promo-text-height);
        display: block;
    }
    :host([variant='product']) slot[name='callout-content'] {
        min-height: var(--consonant-merch-card-product-callout-content-height);
        display: block;
    }
      
    :host([variant='product']) ::slotted([slot='heading-xs']) {
      max-width: var(--consonant-merch-card-heading-xs-max-width, 100%);
    }
  `);var Zo=`
:root {
  --consonant-merch-card-segment-width: 378px;
}

/* grid style for segment */
.one-merch-card.segment,
.two-merch-cards.segment,
.three-merch-cards.segment,
.four-merch-cards.segment {
  grid-template-columns: minmax(276px, var(--consonant-merch-card-segment-width));
}

/* Mobile */
@media screen and ${Ae} {
  :root {
    --consonant-merch-card-segment-width: 276px;
  }
}

@media screen and ${V} {
  :root {
    --consonant-merch-card-segment-width: 276px;
  }
    
  .two-merch-cards.segment,
  .three-merch-cards.segment,
  .four-merch-cards.segment {
      grid-template-columns: repeat(2, minmax(276px, var(--consonant-merch-card-segment-width)));
  }
}

/* desktop */
@media screen and ${M} {
  :root {
    --consonant-merch-card-segment-width: 302px;
  }
    
  .three-merch-cards.segment {
      grid-template-columns: repeat(3, minmax(276px, var(--consonant-merch-card-segment-width)));
  }

  .four-merch-cards.segment {
      grid-template-columns: repeat(4, minmax(276px, var(--consonant-merch-card-segment-width)));
  }
}
`;var st=class extends P{constructor(t){super(t)}getGlobalCSS(){return Zo}postCardUpdateHook(){this.adjustTitleWidth()}renderLayout(){return x` ${this.badge}
    <div class="body">
        <slot name="heading-xs"></slot>
        <slot name="body-xxs"></slot>
        ${this.promoBottom?"":x`<slot name="promo-text"></slot><slot name="callout-content"></slot>`}
        <slot name="body-xs"></slot>
        ${this.promoBottom?x`<slot name="promo-text"></slot><slot name="callout-content"></slot>`:""}
    </div>
    <hr />
    ${this.secureLabelFooter}`}};p(st,"variantStyle",C`
    :host([variant='segment']) {
      min-height: 214px;
    }
    :host([variant='segment']) ::slotted([slot='heading-xs']) {
      max-width: var(--consonant-merch-card-heading-xs-max-width, 100%);
    }
  `);var Jo=`
:root {
  --consonant-merch-card-special-offers-width: 378px;
}

merch-card[variant="special-offers"] span[is="inline-price"][data-template="strikethrough"] {
  font-size: var(--consonant-merch-card-body-xs-font-size);
}

/* grid style for special-offers */
.one-merch-card.special-offers,
.two-merch-cards.special-offers,
.three-merch-cards.special-offers,
.four-merch-cards.special-offers {
  grid-template-columns: minmax(300px, var(--consonant-merch-card-special-offers-width));
}

@media screen and ${Ae} {
  :root {
    --consonant-merch-card-special-offers-width: 302px;
  }
} 
  
@media screen and ${V} {
  :root {
    --consonant-merch-card-special-offers-width: 302px;
  }
    
  .two-merch-cards.special-offers,
  .three-merch-cards.special-offers,
  .four-merch-cards.special-offers {
      grid-template-columns: repeat(2, minmax(300px, var(--consonant-merch-card-special-offers-width)));
  }
}

/* desktop */
@media screen and ${M} {
  .three-merch-cards.special-offers,
  .four-merch-cards.special-offers {
    grid-template-columns: repeat(3, minmax(300px, var(--consonant-merch-card-special-offers-width)));
  }
}

@media screen and ${X} {
  .four-merch-cards.special-offers {
    grid-template-columns: repeat(4, minmax(300px, var(--consonant-merch-card-special-offers-width)));
  }
}
`;var Xn={name:{tag:"h4",slot:"detail-m"},title:{tag:"h4",slot:"detail-m"},backgroundImage:{tag:"div",slot:"bg-image"},prices:{tag:"h3",slot:"heading-xs"},description:{tag:"div",slot:"body-xs"},ctas:{slot:"footer",size:"l"}},ct=class extends P{constructor(t){super(t)}getGlobalCSS(){return Jo}get headingSelector(){return'[slot="detail-m"]'}get aemFragmentMapping(){return Xn}renderLayout(){return x`${this.cardImage}
            <div class="body">
                <slot name="detail-m"></slot>
                <slot name="heading-xs"></slot>
                <slot name="body-xs"></slot>
            </div>
            ${this.evergreen?x`
                      <div
                          class="detail-bg-container"
                          style="background: ${this.card.detailBg}"
                      >
                          <slot name="detail-bg"></slot>
                      </div>
                  `:x`
                      <hr />
                      ${this.secureLabelFooter}
                  `}
            <slot></slot>`}};p(ct,"variantStyle",C`
        :host([variant='special-offers']) {
            min-height: 439px;
        }

        :host([variant='special-offers']) {
            width: var(--consonant-merch-card-special-offers-width);
        }

        :host([variant='special-offers'].center) {
            text-align: center;
        }
    `);var Qo=`
:root {
  --consonant-merch-card-twp-width: 268px;
  --consonant-merch-card-twp-mobile-width: 300px;
  --consonant-merch-card-twp-mobile-height: 358px;
}
  
merch-card[variant="twp"] div[class$='twp-badge'] {
  padding: 4px 10px 5px 10px;
}

merch-card[variant="twp"] [slot="body-xs-top"] {
  font-size: var(--consonant-merch-card-body-xs-font-size);
  line-height: var(--consonant-merch-card-body-xs-line-height);
  color: var(--merch-color-grey-80);
}

merch-card[variant="twp"] [slot="body-xs"] ul {
  padding: 0;
  margin: 0;
}

merch-card[variant="twp"] [slot="body-xs"] ul li {
  list-style-type: none;
  padding-left: 0;
}

merch-card[variant="twp"] [slot="body-xs"] ul li::before {
  content: '\xB7';
  font-size: 20px;
  padding-right: 5px;
  font-weight: bold;
}

merch-card[variant="twp"] [slot="footer"] {
  font-size: var(--consonant-merch-card-body-xs-font-size);
  line-height: var(--consonant-merch-card-body-xs-line-height);
  padding: var(--consonant-merch-spacing-s);
  var(--consonant-merch-spacing-xs) var(--consonant-merch-spacing-xs);
  color: var(--merch-color-grey-80);
  display: flex;
  flex-flow: wrap;
}

merch-card[variant='twp'] merch-quantity-select,
merch-card[variant='twp'] merch-offer-select {
  display: none;
}

.one-merch-card.twp,
.two-merch-cards.twp,
.three-merch-cards.twp {
  grid-template-columns: var(--consonant-merch-card-image-width);
}

@media screen and ${Ae} {
  :root {
    --consonant-merch-card-twp-width: 300px;
  }
  .one-merch-card.twp,
  .two-merch-cards.twp,
  .three-merch-cards.twp {
      grid-template-columns: repeat(1, var(--consonant-merch-card-twp-mobile-width));
  }
}

@media screen and ${V} {
  :root {
    --consonant-merch-card-twp-width: 268px;
  }
  .one-merch-card.twp,
  .two-merch-cards.twp {
      grid-template-columns: repeat(2, var(--consonant-merch-card-twp-width));
  }
  .three-merch-cards.twp {
      grid-template-columns: repeat(3, var(--consonant-merch-card-twp-width));
  }
}
  
@media screen and ${M} {
  :root {
    --consonant-merch-card-twp-width: 268px;
  }
  .one-merch-card.twp
  .two-merch-cards.twp {
      grid-template-columns: repeat(2, var(--consonant-merch-card-twp-width));
  }
  .three-merch-cards.twp {
      grid-template-columns: repeat(3, var(--consonant-merch-card-twp-width));
  }
}

@media screen and ${X} {
    .one-merch-card.twp
    .two-merch-cards.twp {
        grid-template-columns: repeat(2, var(--consonant-merch-card-twp-width));
    }
    .three-merch-cards.twp {
        grid-template-columns: repeat(3, var(--consonant-merch-card-twp-width));
  }
}
`;var lt=class extends P{constructor(t){super(t)}getGlobalCSS(){return Qo}renderLayout(){return x`${this.badge}
      <div class="top-section">
          <slot name="icons"></slot>
          <slot name="heading-xs"></slot>
          <slot name="body-xs-top"></slot>
      </div>
      <div class="body">
          <slot name="body-xs"></slot>
      </div>
      <footer><slot name="footer"></slot></footer>`}};p(lt,"variantStyle",C`
    :host([variant='twp']) {
      padding: 4px 10px 5px 10px;
    }
    .twp-badge {
      padding: 4px 10px 5px 10px;
    }

    :host([variant='twp']) ::slotted(merch-offer-select) {
      display: none;
    }

    :host([variant='twp']) .top-section {
      flex: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: 100%;
      gap: var(--consonant-merch-spacing-xxs);
      padding: var(--consonant-merch-spacing-xs)
          var(--consonant-merch-spacing-xs) var(--consonant-merch-spacing-xs)
          var(--consonant-merch-spacing-xs);
      align-items: flex-start;
    }

    :host([variant='twp']) .body {
      padding: 0 var(--consonant-merch-spacing-xs);
    }
    
    :host([aria-selected]) .twp-badge {
        margin-inline-end: 2px;
        padding-inline-end: 9px;
    }

    :host([variant='twp']) footer {
      gap: var(--consonant-merch-spacing-xxs);
      flex-direction: column;
      align-self: flex-start;
    }
  `);var ea=`

  merch-card[variant="ccd-suggested"] [slot="heading-xs"] {
    font-size: var(--consonant-merch-card-heading-xxs-font-size);
    line-height: var(--consonant-merch-card-heading-xxs-line-height);
  }
  
  merch-card[variant="ccd-suggested"] [slot="body-xs"] a {
    font-size: var(--consonant-merch-card-body-xxs-font-size);
    line-height: var(--consonant-merch-card-body-xxs-line-height);
  }

.spectrum--darkest merch-card[variant="ccd-suggested"] {
  --consonant-merch-card-background-color:rgb(30, 30, 30);
  --consonant-merch-card-heading-xs-color:rgb(239, 239, 239);
  --consonant-merch-card-body-xs-color:rgb(200, 200, 200);
  --consonant-merch-card-border-color:rgb(57, 57, 57);
  --consonant-merch-card-detail-s-color:rgb(162, 162, 162);
  --consonant-merch-card-price-color:rgb(248, 248, 248);
  --merch-color-inline-price-strikethrough:rgb(176, 176, 176);
}

.spectrum--darkest  merch-card[variant="ccd-suggested"]:hover {
  --consonant-merch-card-border-color:rgb(73, 73, 73);
}
`;var Wn={backgroundImage:{attribute:"background-image"},badge:!0,ctas:{slot:"cta",size:"M"},description:{tag:"div",slot:"body-xs"},mnemonics:{size:"l"},prices:{tag:"p",slot:"price"},size:[],subtitle:{tag:"h4",slot:"detail-s"},title:{tag:"h3",slot:"heading-xs"}},ht=class extends P{getGlobalCSS(){return ea}get aemFragmentMapping(){return Wn}get stripStyle(){return this.card.backgroundImage?`
            background: url("${this.card.backgroundImage}");
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-position: ${this.card.dir==="ltr"?"left":"right"};
        `:""}renderLayout(){return x` <div style="${this.stripStyle}" class="body">
                <div class="header">
                    <div class="top-section">
                        <slot name="icons"></slot>
                        ${this.badge}
                    </div>
                    <div class="headings">
                        <slot name="detail-s"></slot>
                        <slot name="heading-xs"></slot>
                    </div>
                </div>
                <slot name="body-xs"></slot>
                <div class="footer">
                    <slot name="price"></slot>
                    <slot name="cta"></slot>
                </div>
            </div>
            <slot></slot>`}postCardUpdateHook(t){t.has("backgroundImage")&&this.styleBackgroundImage()}styleBackgroundImage(){if(this.card.classList.remove("thin-strip"),this.card.classList.remove("wide-strip"),!this.card.backgroundImage)return;let t=new Image;t.src=this.card.backgroundImage,t.onload=()=>{t.width>8?this.card.classList.add("wide-strip"):t.width===8&&this.card.classList.add("thin-strip")}}};p(ht,"variantStyle",C`
        :host([variant='ccd-suggested']) {
            --consonant-merch-card-background-color: rgb(245, 245, 245);
            --consonant-merch-card-body-xs-color: rgb(75, 75, 75);
            --consonant-merch-card-border-color: rgb(225, 225, 225);
            --consonant-merch-card-detail-s-color: rgb(110, 110, 110);
            --consonant-merch-card-heading-xs-color: rgb(44, 44, 44);
            --merch-color-inline-price-strikethrough: var(--spectrum-gray-600);
            --mod-img-height: 38px;

            box-sizing: border-box;
            width: 100%;
            max-width: 305px;
            min-width: 270px;
            min-height: 205px;
            border-radius: 4px;
            display: flex;
            flex-flow: wrap;
            overflow: hidden;
        }

        :host([variant='ccd-slice']) * {
            overflow: hidden;
        }

        :host([variant='ccd-suggested']:hover) {
            --consonant-merch-card-border-color: #cacaca;
        }

        :host([variant='ccd-suggested']) .body {
            height: auto;
            padding: 20px;
            gap: 0;
        }

        :host([variant='ccd-suggested'].thin-strip) .body {
            padding: 20px 20px 20px 28px;
        }

        :host([variant='ccd-suggested']) .header {
            display: flex;
            flex-flow: wrap;
            place-self: flex-start;
            flex-wrap: nowrap;
        }

        :host([variant='ccd-suggested']) .headings {
            padding-inline-start: var(--consonant-merch-spacing-xxs);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        :host([variant='ccd-suggested']) ::slotted([slot='icons']) {
            place-self: center;
        }

        :host([variant='ccd-suggested']) ::slotted([slot='heading-xs']) {
            font-size: var(--consonant-merch-card-heading-xxs-font-size);
            line-height: var(--consonant-merch-card-heading-xxs-line-height);
        }

        :host([variant='ccd-suggested']) ::slotted([slot='detail-m']) {
            line-height: var(--consonant-merch-card-detail-m-line-height);
        }

        :host([variant='ccd-suggested']) ::slotted([slot='body-xs']) {
            color: var(--ccd-gray-700-dark);
            padding-top: 8px;
            flex-grow: 1;
        }

        :host([variant='ccd-suggested'].wide-strip)
            ::slotted([slot='body-xs']) {
            padding-inline-start: 48px;
        }

        :host([variant='ccd-suggested'].wide-strip) ::slotted([slot='price']) {
            padding-inline-start: 48px;
        }

        :host([variant='ccd-suggested']) ::slotted([slot='price']) {
            font-size: var(--consonant-merch-card-body-xs-font-size);
            line-height: var(--consonant-merch-card-body-xs-line-height);
            min-width: fit-content;
        }

        :host([variant='ccd-suggested']) ::slotted([slot='cta']) {
            display: flex;
            align-items: center;
            min-width: fit-content;
        }

        :host([variant='ccd-suggested']) .footer {
            display: flex;
            justify-content: space-between;
            flex-grow: 0;
            margin-top: 6px;
            align-items: center;
        }

        :host([variant='ccd-suggested']) div[class$='-badge'] {
            position: static;
            border-radius: 4px;
        }

        :host([variant='ccd-suggested']) .top-section {
            align-items: center;
        }
    `);var ta=`

merch-card[variant="ccd-slice"] [slot='image'] img {
  overflow: hidden;
  border-radius: 50%;
}

merch-card[variant="ccd-slice"] [slot='body-s'] a.spectrum-Link {
  font-size: var(--consonant-merch-card-body-xxs-font-size);
  font-style: normal;
  font-weight: 400;
  line-height: var(--consonant-merch-card-body-xxs-line-height);
}

.spectrum--darkest merch-card[variant="ccd-slice"] {
  --consonant-merch-card-background-color:rgb(29, 29, 29);
  --consonant-merch-card-body-s-color:rgb(235, 235, 235);
  --consonant-merch-card-border-color:rgb(48, 48, 48);
  --consonant-merch-card-detail-s-color:rgb(235, 235, 235);
}
`;var qn={backgroundImage:{tag:"div",slot:"image"},badge:!0,ctas:{slot:"footer",size:"S"},description:{tag:"div",slot:"body-s"},mnemonics:{size:"m"},size:["wide"]},dt=class extends P{getGlobalCSS(){return ta}get aemFragmentMapping(){return qn}renderLayout(){return x` <div class="content">
                <div class="top-section">
                    <slot name="icons"></slot>
                    ${this.badge}
                </div>
                <slot name="body-s"></slot>
                <slot name="footer"></slot>
            </div>
            <slot name="image"></slot>
            <slot></slot>`}};p(dt,"variantStyle",C`
        :host([variant='ccd-slice']) {
            --consonant-merch-card-background-color: rgb(248, 248, 248);
            --consonant-merch-card-border-color: rgb(230, 230, 230);
            --consonant-merch-card-body-s-color: rgb(34, 34, 34);
            --merch-color-inline-price-strikethrough: var(--spectrum-gray-600);
            --mod-img-height: 29px;

            box-sizing: border-box;
            min-width: 290px;
            max-width: 322px;
            width: 100%;
            max-height: 154px;
            height: 154px;
            border-radius: 4px;
            display: flex;
            flex-flow: wrap;
        }

        :host([variant='ccd-slice']) * {
            overflow: hidden;
        }

        :host([variant='ccd-slice']) ::slotted([slot='body-s']) {
            font-size: var(--consonant-merch-card-body-xs-font-size);
            line-height: var(--consonant-merch-card-body-xxs-line-height);
            min-width: 154px;
            max-width: 171px;
            height: 55px;
            overflow: hidden;
        }

        :host([variant='ccd-slice'][size='wide']) ::slotted([slot='body-s']) {
            max-width: 425px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        :host([variant='ccd-slice'][size='wide']) {
            width: 600px;
            max-width: 600px;
        }

        :host([variant='ccd-slice']) .content {
            display: flex;
            gap: var(--consonant-merch-spacing-xxs);
            padding: 15px;
            padding-inline-end: 0;
            height: 154px;
            box-sizing: border-box;
            min-height: 123px;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            flex: 1 0 0;
        }

        :host([variant='ccd-slice'])
            ::slotted([slot='body-s'])
            ::slotted(a:not(.con-button)) {
            font-size: var(--consonant-merch-card-body-xxs-font-size);
            font-style: normal;
            font-weight: 400;
            line-height: var(--consonant-merch-card-body-xxs-line-height);
            text-decoration-line: underline;
            color: var(--spectrum-gray-800, var(--merch-color-grey-80));
        }

        :host([variant='ccd-slice']) ::slotted([slot='image']) {
            display: flex;
            justify-content: center;
            flex-shrink: 0;
            width: 134px;
            height: 149px;
            overflow: hidden;
            border-radius: 50%;
            padding: 15px;
            align-self: center;
            padding-inline-start: 0;
        }

        :host([variant='ccd-slice']) ::slotted([slot='image']) img {
            overflow: hidden;
            border-radius: 50%;
            width: inherit;
            height: inherit;
        }

        :host([variant='ccd-slice']) div[class$='-badge'] {
            font-size: var(--consonant-merch-card-body-xxs-font-size);
            position: static;
            border-radius: 4px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            padding: 4px 9px;
        }

        :host([variant='ccd-slice']) .top-section {
            align-items: center;
            gap: 8px;
        }
    `);var ra=`
    merch-card[variant="ah-pricing-widget"] [slot="body-xxs"] {
        letter-spacing: normal;
        margin-bottom: 16px;
        box-sizing: border-box;
        color: var(--consonant-merch-card-body-xxs-color);
    }

    merch-card[variant="ah-pricing-widget"] [slot="heading-xxxs"] {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        display: -moz-box;
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        line-clamp: 3;
        -webkit-line-clamp: 3;
    }

    merch-card[variant="ah-pricing-widget"] [slot="price"] .price {
        display: inline-block;
        height: var(--consonant-merch-card-detail-xl-line-height);
        line-height: var(--consonant-merch-card-detail-xl-line-height);
        font-style: normal;
        margin-top: 4px;
    }

    merch-card[variant="ah-pricing-widget"] [slot="price"] .price.price-strikethrough {
        height: var(--consonant-merch-card-detail-l-line-height);
        line-height: var(--consonant-merch-card-detail-l-line-height);
        font-size: var(--consonant-merch-card-body-xxs-font-size);
        text-decoration-thickness: .5px;
        color: var(--ah-gray-500);
    }

    merch-card[variant="ah-pricing-widget"] [slot="price"] .price:not(.price-strikethrough) .price-currency-symbol,
    merch-card[variant="ah-pricing-widget"] [slot="price"] .price:not(.price-strikethrough) .price-integer,
    merch-card[variant="ah-pricing-widget"] [slot="price"] .price:not(.price-strikethrough) .price-decimals-delimiter,
    merch-card[variant="ah-pricing-widget"] [slot="price"] .price:not(.price-strikethrough) .price-decimals {
        color: var(--consonant-merch-card-heading-xxxs-color);
        font-size: var(--consonant-merch-card-heading-xs-font-size);
        font-weight: 700;
    }

    merch-card[variant="ah-pricing-widget"] [slot="price"] .price:not(.price-strikethrough) .price-recurrence {
        display: inline-block;
        width: 21px;
        text-align: end;
        font-size: var(--consonant-merch-card-body-xxs-font-size);
        color: var(--consonant-merch-card-body-xxs-color);
        font-weight: 400;
    }

    merch-card[variant="ah-pricing-widget"] [slot="price"] a {
        color: var(--consonant-merch-card-body-xxs-color);
        font-size: var(--consonant-merch-card-body-xxs-font-size);
        font-style: normal;
        line-height: var(--consonant-merch-card-body-xxs-line-height);
        text-decoration-thickness: .75px;
        text-underline-offset: 1px;
        width: fit-content;
        margin-top: 4px;
    }

    merch-card[variant="ah-pricing-widget"] [slot='image'] img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
        overflow: hidden;
    }

    merch-card[variant="ah-pricing-widget"] [slot="cta"] .spectrum-Button-label {
        height: 16px;
        padding-block: 2px;
        white-space: nowrap;
    }

    .spectrum--dark merch-card[variant="ah-pricing-widget"][background-color='gray']{
      --merch-card-ah-pricing-widget-gray-background: rgb(17, 17, 17);
    }

    .spectrum--dark merch-card[variant="ah-pricing-widget"] {
      --consonant-merch-card-background-color:rgb(17, 17, 17);
      --consonant-merch-card-heading-xxxs-color:rgb(242, 242, 242);
      --consonant-merch-card-body-xxs-color:rgb(219, 219, 219);
    }

    .spectrum--dark  merch-card[variant="ah-pricing-widget"]:hover {
      --consonant-merch-card-border-color:rgb(73, 73, 73);
    }
`;var bc={mnemonics:{size:"s"},title:{tag:"h3",slot:"heading-xxxs",maxCount:40},description:{tag:"div",slot:"body-xxs",maxCount:200},prices:{tag:"p",slot:"price"},ctas:{slot:"cta",size:"S"},backgroundImage:{tag:"div",slot:"image"},allowedColors:["gray"],allowedSizes:["single","double"]},$e=class extends P{getGlobalCSS(){return ra}get aemFragmentMapping(){return bc}renderLayout(){return x`
      <div class="content">
        <div class="header">
    		    <slot name="icons"></slot>
            <slot name="heading-xxxs"></slot>
        </div>
        <slot name="body-xxs"></slot>
        <slot name="price"></slot>
        <div class="footer">
          <slot name="cta"></slot>
        </div>
      </div>
      ${this.card.size==="single"?x`<slot name="image"></slot>`:""}
      <slot></slot>
    `}};p($e,"variantStyle",C`
    :host([variant='ah-pricing-widget']) {
        --merch-card-ah-pricing-widget-width: 132px;
        --merch-card-ah-pricing-widget-min-width: 132px;
        --merch-card-ah-pricing-widget-content-max-width: 245px;
        --merch-card-ah-pricing-widget-height: 206px;
        --merch-card-ah-pricing-widget-header-min-height: 36px;
        --merch-card-ah-pricing-widget-gray-background: rgba(248, 248, 248);
        --merch-card-ah-pricing-widget-text-color: rgba(19, 19, 19);
        --merch-card-ah-pricing-widget-price-line-height: 17px;
        width: var(--merch-card-ah-pricing-widget-width);
        min-width: var(--merch-card-ah-pricing-widget-min-width);
        min-height: var(--merch-card-ah-pricing-widget-height);
        background-color: var(--consonant-merch-card-background-color);
        color: var(--consonant-merch-card-heading-xxxs-color);
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        padding: 12px !important;
        gap: 16px;
        box-sizing: content-box !important;
        border: none;
    }

    :host([variant='ah-pricing-widget'][size='single']) {
        --merch-card-ah-pricing-widget-width: 460px;
    }

    :host([variant='ah-pricing-widget'][size='double']) {
        --merch-card-ah-pricing-widget-width: 214px;
    }

    :host([variant='ah-pricing-widget'][background-color='gray']) {
        background-color: var(--merch-card-ah-pricing-widget-gray-background);
    }

    :host([variant='ah-pricing-widget']) .content {
        display: flex;
        flex-direction: column;
        width: var(--merch-card-ah-pricing-widget-content-max-width);
    }

    :host([variant='ah-pricing-widget']) .header {
        display: flex;
        min-height: var(--merch-card-ah-pricing-widget-header-min-height);
        flex-direction: row;
        align-items: center;
        gap: var(--consonant-merch-spacing-xxs);
        margin-bottom: 4px;
    }


    :host([variant='ah-pricing-widget']) ::slotted([slot='price']) {
        margin-left: var(--spacing-xs);
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: end;
        font-size: var(--consonant-merch-card-detail-s-font-size);
        font-style: italic;
        line-height: var(--merch-card-ah-pricing-widget-price-line-height);
        color: var(--consonant-merch-card-heading-xxxs-color);
    }

    :host([variant='ah-pricing-widget']) .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 24px;
    }

    :host([variant='ah-pricing-widget']) ::slotted([slot='cta']) {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 8px;
    }

    :host([variant='ah-pricing-widget']) ::slotted([slot='image']) {
        width: 199px;
        overflow: hidden;
    }
  `);customElements.define("ah-pricing-widget",$e);var Zn=(e,t=!1)=>{switch(e.variant){case"catalog":return new it(e);case"image":return new yr(e);case"inline-heading":return new Tr(e);case"mini-compare-chart":return new ot(e);case"plans":return new at(e);case"product":return new Ve(e);case"segment":return new st(e);case"special-offers":return new ct(e);case"twp":return new lt(e);case"ccd-suggested":return new ht(e);case"ccd-slice":return new dt(e);case"ah-pricing-widget":return new $e(e);default:return t?void 0:new Ve(e)}},na={catalog:Yn,image:null,"inline-heading":null,"mini-compare-chart":null,plans:null,product:null,segment:null,"special-offers":Xn,twp:null,"ccd-suggested":Wn,"ccd-slice":qn},ia=()=>{let e=[];return e.push(it.variantStyle),e.push(ot.variantStyle),e.push(Ve.variantStyle),e.push(at.variantStyle),e.push(st.variantStyle),e.push(ct.variantStyle),e.push(lt.variantStyle),e.push(ht.variantStyle),e.push(dt.variantStyle),e.push($e.variantStyle),e};var oa=document.createElement("style");oa.innerHTML=`
:root {
    --consonant-merch-card-detail-font-size: 12px;
    --consonant-merch-card-detail-font-weight: 500;
    --consonant-merch-card-detail-letter-spacing: 0.8px;

    --consonant-merch-card-heading-font-size: 18px;
    --consonant-merch-card-heading-line-height: 22.5px;
    --consonant-merch-card-heading-secondary-font-size: 14px;
    --consonant-merch-card-body-font-size: 14px;
    --consonant-merch-card-body-line-height: 21px;
    --consonant-merch-card-promo-text-height: var(--consonant-merch-card-body-font-size);

    /* Fonts */
    --merch-body-font-family: 'Adobe Clean', adobe-clean, 'Trebuchet MS', sans-serif;

    /* spacing */
    --consonant-merch-spacing-xxxs: 4px;
    --consonant-merch-spacing-xxs: 8px;
    --consonant-merch-spacing-xs: 16px;
    --consonant-merch-spacing-s: 24px;
    --consonant-merch-spacing-m: 32px;

    /* cta */
    --consonant-merch-card-cta-font-size: 15px;

    /* headings */
    --consonant-merch-card-heading-xxxs-font-size: 14px;
    --consonant-merch-card-heading-xxxs-line-height: 18.2px;
    --consonant-merch-card-heading-xxs-font-size: 16px;
    --consonant-merch-card-heading-xxs-line-height: 20px;
    --consonant-merch-card-heading-xs-font-size: 18px;
    --consonant-merch-card-heading-xs-line-height: 22.5px;
    --consonant-merch-card-heading-s-font-size: 20px;
    --consonant-merch-card-heading-s-line-height: 25px;
    --consonant-merch-card-heading-m-font-size: 24px;
    --consonant-merch-card-heading-m-line-height: 30px;
    --consonant-merch-card-heading-l-font-size: 20px;
    --consonant-merch-card-heading-l-line-height: 30px;
    --consonant-merch-card-heading-xl-font-size: 36px;
    --consonant-merch-card-heading-xl-line-height: 45px;

    /* detail */
    --consonant-merch-card-detail-s-font-size: 11px;
    --consonant-merch-card-detail-s-line-height: 14px;
    --consonant-merch-card-detail-m-font-size: 12px;
    --consonant-merch-card-detail-m-line-height: 15px;
    --consonant-merch-card-detail-m-font-weight: 700;
    --consonant-merch-card-detail-m-letter-spacing: 1px;
    --consonant-merch-card-detail-l-line-height: 18px;
    --consonant-merch-card-detail-xl-line-height: 23px;

    /* body */
    --consonant-merch-card-body-xxs-font-size: 12px;
    --consonant-merch-card-body-xxs-line-height: 18px;
    --consonant-merch-card-body-xxs-letter-spacing: 1px;
    --consonant-merch-card-body-xs-font-size: 14px;
    --consonant-merch-card-body-xs-line-height: 21px;
    --consonant-merch-card-body-s-font-size: 16px;
    --consonant-merch-card-body-s-line-height: 24px;
    --consonant-merch-card-body-m-font-size: 18px;
    --consonant-merch-card-body-m-line-height: 27px;
    --consonant-merch-card-body-l-font-size: 20px;
    --consonant-merch-card-body-l-line-height: 30px;
    --consonant-merch-card-body-xl-font-size: 22px;
    --consonant-merch-card-body-xxl-font-size: 24px;
    --consonant-merch-card-body-xl-line-height: 33px;


    --consonant-merch-card-heading-padding: 0;

    /* colors */
    --consonant-merch-card-background-color: inherit;
    --consonant-merch-card-border-color: #eaeaea;
    --color-accent: rgb(59, 99, 251);
    --merch-color-focus-ring: #1473E6;
    --merch-color-grey-10: #f6f6f6;
    --merch-color-grey-50: var(--specturm-gray-50);
    --merch-color-grey-60: var(--specturm-gray-600);
    --merch-color-grey-80: #2c2c2c;
    --merch-color-grey-200: #E8E8E8;
    --merch-color-grey-600: #686868;
    --merch-color-grey-700: #464646;
    --merch-color-green-promo: #2D9D78;
    --consonant-merch-card-body-xs-color: var(--spectrum-gray-100, var(--merch-color-grey-80));
    --merch-color-inline-price-strikethrough: initial;
    --consonant-merch-card-detail-s-color: var(--spectrum-gray-600, var(--merch-color-grey-600));
    --consonant-merch-card-heading-color: var(--spectrum-gray-800, var(--merch-color-grey-80));
    --consonant-merch-card-heading-xs-color: var(--consonant-merch-card-heading-color);
    --consonant-merch-card-price-color: #222222;
    --consonant-merch-card-heading-xxxs-color: #131313;
    --consonant-merch-card-body-xxs-color: #292929;

    /* ccd colors */
    --ccd-gray-200-light: #E6E6E6;
    --ccd-gray-800-dark: #222;
    --ccd-gray-700-dark: #464646;
    --ccd-gray-600-light: #6D6D6D;

    /* ah colors */
    --ah-gray-500: #717171;
  
    /* merch card generic */
    --consonant-merch-card-max-width: 300px;
    --transition: cmax-height 0.3s linear, opacity 0.3s linear;

    /* background image */
    --consonant-merch-card-bg-img-height: 180px;

    /* inline SVGs */
    --checkmark-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Cpath fill='%23fff' d='M3.788 9A.999.999 0 0 1 3 8.615l-2.288-3a1 1 0 1 1 1.576-1.23l1.5 1.991 3.924-4.991a1 1 0 1 1 1.576 1.23l-4.712 6A.999.999 0 0 1 3.788 9z' class='spectrum-UIIcon--medium'/%3E%3C/svg%3E%0A");

    --secure-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23757575' viewBox='0 0 12 15'%3E%3Cpath d='M11.5 6H11V5A5 5 0 1 0 1 5v1H.5a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5ZM3 5a3 3 0 1 1 6 0v1H3Zm4 6.111V12.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1.389a1.5 1.5 0 1 1 2 0Z'/%3E%3C/svg%3E");

    --info-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'><circle cx='18' cy='12' r='2.15'%3E%3C/circle%3E%3Cpath d='M20.333 24H20v-7.6a.4.4 0 0 0-.4-.4h-3.933s-1.167.032-1.167 1 1.167 1 1.167 1H16v6h-.333s-1.167.032-1.167 1 1.167 1 1.167 1h4.667s1.167-.033 1.167-1-1.168-1-1.168-1z'%3E%3C/path%3E%3Cpath d='M18 2.1A15.9 15.9 0 1 0 33.9 18 15.9 15.9 0 0 0 18 2.1zm0 29.812A13.912 13.912 0 1 1 31.913 18 13.912 13.912 0 0 1 18 31.913z'%3E%3C/path%3E%3C/svg%3E");

    --ellipsis-icon: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><circle cx="2" cy="2" r="2" fill="%232c2c2c" transform="translate(6 6)"/><circle cx="2" cy="2" r="2" fill="%232c2c2c" data-name="Ellipse 71" transform="translate(12 6)"/><circle cx="2" cy="2" r="2" fill="%232c2c2c" transform="translate(0 6)"/></svg>');

    /* callout */
    --consonant-merch-card-callout-line-height: 21px;
    --consonant-merch-card-callout-font-size: 14px;
    --consonant-merch-card-callout-font-color: #2C2C2C;
    --consonant-merch-card-callout-icon-size: 16px;
    --consonant-merch-card-callout-icon-top: 6px;
    --consonant-merch-card-callout-icon-right: 8px;
    --consonant-merch-card-callout-letter-spacing: 0px;
    --consonant-merch-card-callout-icon-padding: 34px;
    --consonant-merch-card-callout-spacing-xxs: 8px;
}

merch-card-collection {
    display: contents;
}

merch-card-collection > merch-card:not([style]) {
    display: none;
}

merch-card-collection > p[slot],
merch-card-collection > div[slot] p {
    margin: 0;
}

.one-merch-card,
.two-merch-cards,
.three-merch-cards,
.four-merch-cards {
    display: grid;
    justify-content: center;
    justify-items: stretch;
    align-items: normal;
    gap: var(--consonant-merch-spacing-m);
    padding: var(--spacing-m);
}

merch-card[variant="ccd-suggested"] *,
merch-card[variant="ccd-slice"] * {
  box-sizing: border-box;
}

merch-card.background-opacity-70 {
    background-color: rgba(255 255 255 / 70%);
}

merch-card.has-divider hr {
    margin: var(--consonant-merch-spacing-xs) 0;
    height: 1px;
    border: none;
}

merch-card.has-divider div[slot='body-lower'] hr {
    margin: 0;
}

merch-card p, merch-card h3, merch-card h4 {
    margin: 0;
}

merch-card span[is='inline-price'] {
    display: inline-block;
}

merch-card [slot^='heading-'] {
    color: var(--consonant-merch-card-heading-color);
    font-weight: 700;
}

merch-card [slot='heading-xxxs'] {
        font-size: var(--consonant-merch-card-heading-xxxs-font-size);
        line-height: var(--consonant-merch-card-heading-xxxs-line-height);
        color: var(--consonant-merch-card-heading-xxxs-color);
        letter-spacing: normal;
}

merch-card [slot='heading-xs'] {
    font-size: var(--consonant-merch-card-heading-xs-font-size);
    line-height: var(--consonant-merch-card-heading-xs-line-height);
    color: var(--consonant-merch-card-heading-xs-color);
    margin: 0;
}

merch-card.dc-pricing [slot='heading-xs'] {
    margin-bottom: var(--consonant-merch-spacing-xxs);
}

merch-card:not([variant='inline-heading']) [slot='heading-xs'] a {
    color: var(--merch-color-grey-80);
}

merch-card div.starting-at {
  font-size: var(--consonant-merch-card-body-xs-font-size);
  line-height: var(--consonant-merch-card-body-xs-line-height);
  font-weight: 500;
}

merch-card [slot='heading-xs'] a:not(:hover) {
    text-decoration: inherit;
}

merch-card [slot='heading-s'] {
    font-size: var(--consonant-merch-card-heading-s-font-size);
    line-height: var(--consonant-merch-card-heading-s-line-height);
    margin: 0;
}

merch-card [slot='heading-m'] {
    font-size: var(--consonant-merch-card-heading-m-font-size);
    line-height: var(--consonant-merch-card-heading-m-line-height);
    margin: 0;
}

merch-card [slot='heading-m-price'] {
    font-size: var(--consonant-merch-card-heading-m-font-size);
    line-height: var(--consonant-merch-card-heading-m-line-height);
    padding: 0 var(--consonant-merch-spacing-s);
    margin: 0;
    color: var(--spectrum-gray-800, #2c2c2c);
}

merch-card [slot='offers'] {
    padding: var(--consonant-merch-spacing-xxs) var(--consonant-merch-spacing-s);
}

merch-card [slot='heading-l'] {
    font-size: var(--consonant-merch-card-heading-l-font-size);
    line-height: var(--consonant-merch-card-heading-l-line-height);
    margin: 0;
}

merch-card [slot='heading-xl'] {
    font-size: var(--consonant-merch-card-heading-xl-font-size);
    line-height: var(--consonant-merch-card-heading-xl-line-height);
    margin: 0;
}

merch-card [slot='callout-content'] {
    display: flex;
    flex-direction: column;
    margin: var(--consonant-merch-spacing-xxxs) 0px;
    gap: var(--consonant-merch-card-callout-spacing-xxs);
}

merch-card [slot='callout-content'] > div {
    display: flex;
    flex-direction: column;
    margin: var(--consonant-merch-spacing-xxxs) 0px;
    gap: var(--consonant-merch-card-callout-spacing-xxs);
    align-items: flex-start;
}

merch-card [slot='callout-content'] > div > div {
    display: flex;
    background: rgba(203 203 203 / 50%);
    border-radius: var(--consonant-merch-spacing-xxxs);
    padding: var(--consonant-merch-spacing-xxxs) var(--consonant-merch-spacing-xxxs) var(--consonant-merch-spacing-xxxs) var(--consonant-merch-spacing-xxs);
}

merch-card [slot='callout-content'] > div > div > div {
    display: inline-block;
    text-align: start;
    font: normal normal normal var(--consonant-merch-card-callout-font-size)/var(--consonant-merch-card-callout-line-height) var(--body-font-family, 'Adobe Clean');
    letter-spacing: var(--consonant-merch-card-callout-letter-spacing);
    color: var(--consonant-merch-card-callout-font-color);
}

merch-card [slot='callout-content'] img {
    width: var(--consonant-merch-card-callout-icon-size);
    height: var(--consonant-merch-card-callout-icon-size);
    margin-inline-end: 2.5px;
    margin-inline-start: 9px;
    margin-block-start: 2.5px;
}

merch-card [slot='detail-s'] {
    font-size: var(--consonant-merch-card-detail-s-font-size);
    line-height: var(--consonant-merch-card-detail-s-line-height);
    letter-spacing: 0.66px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--consonant-merch-card-detail-s-color);
}

merch-card [slot='detail-m'] {
    font-size: var(--consonant-merch-card-detail-m-font-size);
    letter-spacing: var(--consonant-merch-card-detail-m-letter-spacing);
    font-weight: var(--consonant-merch-card-detail-m-font-weight);
    text-transform: uppercase;
    margin: 0;
    color: var(--merch-color-grey-80);
}

merch-card [slot="body-xxs"] {
    font-size: var(--consonant-merch-card-body-xxs-font-size);
    line-height: var(--consonant-merch-card-body-xxs-line-height);
    font-weight: normal;
    letter-spacing: var(--consonant-merch-card-body-xxs-letter-spacing);
    margin: 0;
    color: var(--merch-color-grey-80);
}

merch-card [slot="body-s"] {
    color: var(--consonant-merch-card-body-s-color);
}

merch-card button.spectrum-Button > a {
  color: inherit;
  text-decoration: none;
}

merch-card button.spectrum-Button > a:hover {
  color: inherit;
}

merch-card button.spectrum-Button > a:active {
  color: inherit;
}

merch-card button.spectrum-Button > a:focus {
  color: inherit;
}

merch-card [slot="body-xs"] {
    font-size: var(--consonant-merch-card-body-xs-font-size);
    line-height: var(--consonant-merch-card-body-xs-line-height);
    color: var(--consonant-merch-card-body-xs-color);
}

merch-card [slot="body-m"] {
    font-size: var(--consonant-merch-card-body-m-font-size);
    line-height: var(--consonant-merch-card-body-m-line-height);
    color: var(--merch-color-grey-80);
}

merch-card [slot="body-l"] {
    font-size: var(--consonant-merch-card-body-l-font-size);
    line-height: var(--consonant-merch-card-body-l-line-height);
    color: var(--merch-color-grey-80);
}

merch-card [slot="body-xl"] {
    font-size: var(--consonant-merch-card-body-xl-font-size);
    line-height: var(--consonant-merch-card-body-xl-line-height);
    color: var(--merch-color-grey-80);
}

merch-card [slot="cci-footer"] p,
merch-card [slot="cct-footer"] p,
merch-card [slot="cce-footer"] p {
    margin: 0;
}

merch-card [slot="promo-text"] {
    color: var(--merch-color-green-promo);
    font-size: var(--consonant-merch-card-promo-text-height);
    font-weight: 700;
    line-height: var(--consonant-merch-card-promo-text-height);
    margin: 0;
    min-height: var(--consonant-merch-card-promo-text-height);
    padding: 0;
}

merch-card [slot="footer-rows"] {
    min-height: var(--consonant-merch-card-footer-rows-height);
}

merch-card div[slot="footer"] {
    display: contents;
}

merch-card.product div[slot="footer"] {
    display: block;
}

merch-card.product div[slot="footer"] a + a {
    margin: 5px 0 0 5px;
}

merch-card [slot="footer"] a {
    word-wrap: break-word;
    text-align: center;
}

merch-card [slot="footer"] a:not([class]) {
    font-weight: 700;
    font-size: var(--consonant-merch-card-cta-font-size);
}

merch-card div[slot='bg-image'] img {
    position: relative;
    width: 100%;
    min-height: var(--consonant-merch-card-bg-img-height);
    max-height: var(--consonant-merch-card-bg-img-height);
    object-fit: cover;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
}

.price-unit-type:not(.disabled)::before,
.price-tax-inclusivity:not(.disabled)::before {
  content: "\\00a0";
}

merch-card span.placeholder-resolved[data-template='priceStrikethrough'],
merch-card span.placeholder-resolved[data-template='strikethrough'],
merch-card span.price.price-strikethrough {
  font-size: var(--consonant-merch-card-body-xs-font-size);
  font-weight: normal;
  text-decoration: line-through;
  color: var(--merch-color-inline-price-strikethrough);
}

/* merch-offer-select */
merch-offer-select[variant="subscription-options"] merch-offer span[is="inline-price"][data-display-tax='true'] .price-tax-inclusivity {
    font-size: 12px;
    font-style: italic;
    font-weight: normal;
    position: absolute;
    left: 0;
    top: 20px;
}

body.merch-modal {
    overflow: hidden;
    scrollbar-gutter: stable;
    height: 100vh;
}

`;document.head.appendChild(oa);var Dt;(function(e){e.STAGE="STAGE",e.PRODUCTION="PRODUCTION",e.LOCAL="LOCAL"})(Dt||(Dt={}));var Jn;(function(e){e.STAGE="STAGE",e.PRODUCTION="PROD",e.LOCAL="LOCAL"})(Jn||(Jn={}));var Bt;(function(e){e.DRAFT="DRAFT",e.PUBLISHED="PUBLISHED"})(Bt||(Bt={}));var He;(function(e){e.V2="UCv2",e.V3="UCv3"})(He||(He={}));var Q;(function(e){e.CHECKOUT="checkout",e.CHECKOUT_EMAIL="checkout/email",e.SEGMENTATION="segmentation",e.BUNDLE="bundle",e.COMMITMENT="commitment",e.RECOMMENDATION="recommendation",e.EMAIL="email",e.PAYMENT="payment",e.CHANGE_PLAN_TEAM_PLANS="change-plan/team-upgrade/plans",e.CHANGE_PLAN_TEAM_PAYMENT="change-plan/team-upgrade/payment"})(Q||(Q={}));var Qn=function(e){var t;return(t=vc.get(e))!==null&&t!==void 0?t:e},vc=new Map([["countrySpecific","cs"],["quantity","q"],["authCode","code"],["checkoutPromoCode","apc"],["rurl","rUrl"],["curl","cUrl"],["ctxrturl","ctxRtUrl"],["country","co"],["language","lang"],["clientId","cli"],["context","ctx"],["productArrangementCode","pa"],["offerType","ot"],["marketSegment","ms"]]);var aa=function(e){var t=typeof Symbol=="function"&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},sa=function(e,t){var r=typeof Symbol=="function"&&e[Symbol.iterator];if(!r)return e;var n=r.call(e),i,o=[],a;try{for(;(t===void 0||t-- >0)&&!(i=n.next()).done;)o.push(i.value)}catch(s){a={error:s}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(a)throw a.error}}return o};function ut(e,t,r){var n,i;try{for(var o=aa(Object.entries(e)),a=o.next();!a.done;a=o.next()){var s=sa(a.value,2),c=s[0],l=s[1],h=Qn(c);l!=null&&r.has(h)&&t.set(h,l)}}catch(d){n={error:d}}finally{try{a&&!a.done&&(i=o.return)&&i.call(o)}finally{if(n)throw n.error}}}function wr(e){switch(e){case Dt.PRODUCTION:return"https://commerce.adobe.com";default:return"https://commerce-stg.adobe.com"}}function Lr(e,t){var r,n;for(var i in e){var o=e[i];try{for(var a=(r=void 0,aa(Object.entries(o))),s=a.next();!s.done;s=a.next()){var c=sa(s.value,2),l=c[0],h=c[1];if(h!=null){var d=Qn(l);t.set("items["+i+"]["+d+"]",h)}}}catch(u){r={error:u}}finally{try{s&&!s.done&&(n=a.return)&&n.call(a)}finally{if(r)throw r.error}}}}var Ac=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(e);i<n.length;i++)t.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(r[n[i]]=e[n[i]]);return r},Ec=function(e){var t=typeof Symbol=="function"&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")};function ca(e){Tc(e);var t=e.env,r=e.items,n=e.workflowStep,i=Ac(e,["env","items","workflowStep"]),o=new URL(wr(t));return o.pathname=n+"/",Lr(r,o.searchParams),ut(i,o.searchParams,Sc),o.toString()}var Sc=new Set(["cli","co","lang","ctx","cUrl","mv","nglwfdata","otac","promoid","rUrl","sdid","spint","trackingid","code","campaignid","appctxid"]),yc=["env","workflowStep","clientId","country","items"];function Tc(e){var t,r;try{for(var n=Ec(yc),i=n.next();!i.done;i=n.next()){var o=i.value;if(!e[o])throw new Error('Argument "checkoutData" is not valid, missing: '+o)}}catch(a){t={error:a}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(t)throw t.error}}return!0}var wc=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(e);i<n.length;i++)t.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(r[n[i]]=e[n[i]]);return r},Lc=function(e){var t=typeof Symbol=="function"&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},_c="p_draft_landscape",Cc="/store/";function ti(e){kc(e);var t=e.env,r=e.items,n=e.workflowStep,i=e.ms,o=e.marketSegment,a=e.ot,s=e.offerType,c=e.pa,l=e.productArrangementCode,h=e.landscape,d=wc(e,["env","items","workflowStep","ms","marketSegment","ot","offerType","pa","productArrangementCode","landscape"]),u={marketSegment:o??i,offerType:s??a,productArrangementCode:l??c},m=new URL(wr(t));return m.pathname=""+Cc+n,n!==Q.SEGMENTATION&&n!==Q.CHANGE_PLAN_TEAM_PLANS&&Lr(r,m.searchParams),n===Q.SEGMENTATION&&ut(u,m.searchParams,ei),ut(d,m.searchParams,ei),h===Bt.DRAFT&&ut({af:_c},m.searchParams,ei),m.toString()}var ei=new Set(["af","ai","apc","appctxid","cli","co","csm","ctx","ctxRtUrl","DCWATC","dp","fr","gsp","ijt","lang","lo","mal","ms","mv","mv2","nglwfdata","ot","otac","pa","pcid","promoid","q","rf","sc","scl","sdid","sid","spint","svar","th","thm","trackingid","usid","workflowid","context.guid","so.ca","so.su","so.tr","so.va"]),Pc=["env","workflowStep","clientId","country"];function kc(e){var t,r;try{for(var n=Lc(Pc),i=n.next();!i.done;i=n.next()){var o=i.value;if(!e[o])throw new Error('Argument "checkoutData" is not valid, missing: '+o)}}catch(a){t={error:a}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(t)throw t.error}}if(e.workflowStep!==Q.SEGMENTATION&&e.workflowStep!==Q.CHANGE_PLAN_TEAM_PLANS&&!e.items)throw new Error('Argument "checkoutData" is not valid, missing: items');return!0}function ri(e,t){switch(e){case He.V2:return ca(t);case He.V3:return ti(t);default:return console.warn("Unsupported CheckoutType, will use UCv3 as default. Given type: "+e),ti(t)}}var ni;(function(e){e.BASE="BASE",e.TRIAL="TRIAL",e.PROMOTION="PROMOTION"})(ni||(ni={}));var H;(function(e){e.MONTH="MONTH",e.YEAR="YEAR",e.TWO_YEARS="TWO_YEARS",e.THREE_YEARS="THREE_YEARS",e.PERPETUAL="PERPETUAL",e.TERM_LICENSE="TERM_LICENSE",e.ACCESS_PASS="ACCESS_PASS",e.THREE_MONTHS="THREE_MONTHS",e.SIX_MONTHS="SIX_MONTHS"})(H||(H={}));var N;(function(e){e.ANNUAL="ANNUAL",e.MONTHLY="MONTHLY",e.TWO_YEARS="TWO_YEARS",e.THREE_YEARS="THREE_YEARS",e.P1D="P1D",e.P1Y="P1Y",e.P3Y="P3Y",e.P10Y="P10Y",e.P15Y="P15Y",e.P3D="P3D",e.P7D="P7D",e.P30D="P30D",e.HALF_YEARLY="HALF_YEARLY",e.QUARTERLY="QUARTERLY"})(N||(N={}));var ii;(function(e){e.INDIVIDUAL="INDIVIDUAL",e.TEAM="TEAM",e.ENTERPRISE="ENTERPRISE"})(ii||(ii={}));var oi;(function(e){e.COM="COM",e.EDU="EDU",e.GOV="GOV"})(oi||(oi={}));var ai;(function(e){e.DIRECT="DIRECT",e.INDIRECT="INDIRECT"})(ai||(ai={}));var si;(function(e){e.ENTERPRISE_PRODUCT="ENTERPRISE_PRODUCT",e.ETLA="ETLA",e.RETAIL="RETAIL",e.VIP="VIP",e.VIPMP="VIPMP",e.FREE="FREE"})(si||(si={}));var la="tacocat.js";var _r=(e,t)=>String(e??"").toLowerCase()==String(t??"").toLowerCase(),ha=e=>`${e??""}`.replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t]??t)??"";function O(e,t={},{metadata:r=!0,search:n=!0,storage:i=!0}={}){let o;if(n&&o==null){let a=new URLSearchParams(window.location.search),s=mt(n)?n:e;o=a.get(s)}if(i&&o==null){let a=mt(i)?i:e;o=window.sessionStorage.getItem(a)??window.localStorage.getItem(a)}if(r&&o==null){let a=Ic(mt(r)?r:e);o=document.documentElement.querySelector(`meta[name="${a}"]`)?.content}return o??t[e]}var pt=()=>{};var da=e=>typeof e=="boolean",Gt=e=>typeof e=="function",Cr=e=>typeof e=="number",ua=e=>e!=null&&typeof e=="object";var mt=e=>typeof e=="string",ci=e=>mt(e)&&e,ft=e=>Cr(e)&&Number.isFinite(e)&&e>0;function gt(e,t=r=>r==null||r===""){return e!=null&&Object.entries(e).forEach(([r,n])=>{t(n)&&delete e[r]}),e}function y(e,t){if(da(e))return e;let r=String(e);return r==="1"||r==="true"?!0:r==="0"||r==="false"?!1:t}function Se(e,t,r){let n=Object.values(t);return n.find(i=>_r(i,e))??r??n[0]}function Ic(e=""){return String(e).replace(/(\p{Lowercase_Letter})(\p{Uppercase_Letter})/gu,(t,r,n)=>`${r}-${n}`).replace(/\W+/gu,"-").toLowerCase()}function xt(e,t=1){return Cr(e)||(e=Number.parseInt(e,10)),!Number.isNaN(e)&&e>0&&Number.isFinite(e)?e:t}var Nc=Date.now(),li=()=>`(+${Date.now()-Nc}ms)`,Pr=new Set,Oc=y(O("tacocat.debug",{},{metadata:!1}),typeof process<"u"&&process.env?.DEBUG);function ma(e){let t=`[${la}/${e}]`,r=(a,s,...c)=>a?!0:(i(s,...c),!1),n=Oc?(a,...s)=>{console.debug(`${t} ${a}`,...s,li())}:()=>{},i=(a,...s)=>{let c=`${t} ${a}`;Pr.forEach(([l])=>l(c,...s))};return{assert:r,debug:n,error:i,warn:(a,...s)=>{let c=`${t} ${a}`;Pr.forEach(([,l])=>l(c,...s))}}}function Rc(e,t){let r=[e,t];return Pr.add(r),()=>{Pr.delete(r)}}Rc((e,...t)=>{console.error(e,...t,li())},(e,...t)=>{console.warn(e,...t,li())});var Mc="no promo",pa="promo-tag",Vc="yellow",$c="neutral",Hc=(e,t,r)=>{let n=o=>o||Mc,i=r?` (was "${n(t)}")`:"";return`${n(e)}${i}`},Uc="cancel-context",zt=(e,t)=>{let r=e===Uc,n=!r&&e?.length>0,i=(n||r)&&(t&&t!=e||!t&&!r),o=i&&n||!i&&!!t,a=o?e||t:void 0;return{effectivePromoCode:a,overridenPromoCode:e,className:o?pa:`${pa} no-promo`,text:Hc(a,t,i),variant:o?Vc:$c,isOverriden:i}};var hi="ABM",di="PUF",ui="M2M",mi="PERPETUAL",pi="P3Y",Dc="TAX_INCLUSIVE_DETAILS",Bc="TAX_EXCLUSIVE",fa={ABM:hi,PUF:di,M2M:ui,PERPETUAL:mi,P3Y:pi},Om={[hi]:{commitment:H.YEAR,term:N.MONTHLY},[di]:{commitment:H.YEAR,term:N.ANNUAL},[ui]:{commitment:H.MONTH,term:N.MONTHLY},[mi]:{commitment:H.PERPETUAL,term:void 0},[pi]:{commitment:H.THREE_MONTHS,term:N.P3Y}},ga="Value is not an offer",kr=e=>{if(typeof e!="object")return ga;let{commitment:t,term:r}=e,n=Gc(t,r);return{...e,planType:n}};var Gc=(e,t)=>{switch(e){case void 0:return ga;case"":return"";case H.YEAR:return t===N.MONTHLY?hi:t===N.ANNUAL?di:"";case H.MONTH:return t===N.MONTHLY?ui:"";case H.PERPETUAL:return mi;case H.TERM_LICENSE:return t===N.P3Y?pi:"";default:return""}};function fi(e){let{priceDetails:t}=e,{price:r,priceWithoutDiscount:n,priceWithoutTax:i,priceWithoutDiscountAndTax:o,taxDisplay:a}=t;if(a!==Dc)return e;let s={...e,priceDetails:{...t,price:i??r,priceWithoutDiscount:o??n,taxDisplay:Bc}};return s.offerType==="TRIAL"&&s.priceDetails.price===0&&(s.priceDetails.price=s.priceDetails.priceWithoutDiscount),s}var gi=function(e,t){return gi=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,n){r.__proto__=n}||function(r,n){for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(r[i]=n[i])},gi(e,t)};function Ft(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");gi(e,t);function r(){this.constructor=e}e.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)}var A=function(){return A=Object.assign||function(t){for(var r,n=1,i=arguments.length;n<i;n++){r=arguments[n];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},A.apply(this,arguments)};function Ir(e,t,r){if(r||arguments.length===2)for(var n=0,i=t.length,o;n<i;n++)(o||!(n in t))&&(o||(o=Array.prototype.slice.call(t,0,n)),o[n]=t[n]);return e.concat(o||Array.prototype.slice.call(t))}var v;(function(e){e[e.EXPECT_ARGUMENT_CLOSING_BRACE=1]="EXPECT_ARGUMENT_CLOSING_BRACE",e[e.EMPTY_ARGUMENT=2]="EMPTY_ARGUMENT",e[e.MALFORMED_ARGUMENT=3]="MALFORMED_ARGUMENT",e[e.EXPECT_ARGUMENT_TYPE=4]="EXPECT_ARGUMENT_TYPE",e[e.INVALID_ARGUMENT_TYPE=5]="INVALID_ARGUMENT_TYPE",e[e.EXPECT_ARGUMENT_STYLE=6]="EXPECT_ARGUMENT_STYLE",e[e.INVALID_NUMBER_SKELETON=7]="INVALID_NUMBER_SKELETON",e[e.INVALID_DATE_TIME_SKELETON=8]="INVALID_DATE_TIME_SKELETON",e[e.EXPECT_NUMBER_SKELETON=9]="EXPECT_NUMBER_SKELETON",e[e.EXPECT_DATE_TIME_SKELETON=10]="EXPECT_DATE_TIME_SKELETON",e[e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE=11]="UNCLOSED_QUOTE_IN_ARGUMENT_STYLE",e[e.EXPECT_SELECT_ARGUMENT_OPTIONS=12]="EXPECT_SELECT_ARGUMENT_OPTIONS",e[e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE=13]="EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE",e[e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE=14]="INVALID_PLURAL_ARGUMENT_OFFSET_VALUE",e[e.EXPECT_SELECT_ARGUMENT_SELECTOR=15]="EXPECT_SELECT_ARGUMENT_SELECTOR",e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR=16]="EXPECT_PLURAL_ARGUMENT_SELECTOR",e[e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT=17]="EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT",e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT=18]="EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT",e[e.INVALID_PLURAL_ARGUMENT_SELECTOR=19]="INVALID_PLURAL_ARGUMENT_SELECTOR",e[e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR=20]="DUPLICATE_PLURAL_ARGUMENT_SELECTOR",e[e.DUPLICATE_SELECT_ARGUMENT_SELECTOR=21]="DUPLICATE_SELECT_ARGUMENT_SELECTOR",e[e.MISSING_OTHER_CLAUSE=22]="MISSING_OTHER_CLAUSE",e[e.INVALID_TAG=23]="INVALID_TAG",e[e.INVALID_TAG_NAME=25]="INVALID_TAG_NAME",e[e.UNMATCHED_CLOSING_TAG=26]="UNMATCHED_CLOSING_TAG",e[e.UNCLOSED_TAG=27]="UNCLOSED_TAG"})(v||(v={}));var k;(function(e){e[e.literal=0]="literal",e[e.argument=1]="argument",e[e.number=2]="number",e[e.date=3]="date",e[e.time=4]="time",e[e.select=5]="select",e[e.plural=6]="plural",e[e.pound=7]="pound",e[e.tag=8]="tag"})(k||(k={}));var Ue;(function(e){e[e.number=0]="number",e[e.dateTime=1]="dateTime"})(Ue||(Ue={}));function xi(e){return e.type===k.literal}function xa(e){return e.type===k.argument}function Nr(e){return e.type===k.number}function Or(e){return e.type===k.date}function Rr(e){return e.type===k.time}function Mr(e){return e.type===k.select}function Vr(e){return e.type===k.plural}function ba(e){return e.type===k.pound}function $r(e){return e.type===k.tag}function Hr(e){return!!(e&&typeof e=="object"&&e.type===Ue.number)}function Kt(e){return!!(e&&typeof e=="object"&&e.type===Ue.dateTime)}var bi=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;var zc=/(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;function va(e){var t={};return e.replace(zc,function(r){var n=r.length;switch(r[0]){case"G":t.era=n===4?"long":n===5?"narrow":"short";break;case"y":t.year=n===2?"2-digit":"numeric";break;case"Y":case"u":case"U":case"r":throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");case"q":case"Q":throw new RangeError("`q/Q` (quarter) patterns are not supported");case"M":case"L":t.month=["numeric","2-digit","short","long","narrow"][n-1];break;case"w":case"W":throw new RangeError("`w/W` (week) patterns are not supported");case"d":t.day=["numeric","2-digit"][n-1];break;case"D":case"F":case"g":throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");case"E":t.weekday=n===4?"short":n===5?"narrow":"short";break;case"e":if(n<4)throw new RangeError("`e..eee` (weekday) patterns are not supported");t.weekday=["short","long","narrow","short"][n-4];break;case"c":if(n<4)throw new RangeError("`c..ccc` (weekday) patterns are not supported");t.weekday=["short","long","narrow","short"][n-4];break;case"a":t.hour12=!0;break;case"b":case"B":throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");case"h":t.hourCycle="h12",t.hour=["numeric","2-digit"][n-1];break;case"H":t.hourCycle="h23",t.hour=["numeric","2-digit"][n-1];break;case"K":t.hourCycle="h11",t.hour=["numeric","2-digit"][n-1];break;case"k":t.hourCycle="h24",t.hour=["numeric","2-digit"][n-1];break;case"j":case"J":case"C":throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");case"m":t.minute=["numeric","2-digit"][n-1];break;case"s":t.second=["numeric","2-digit"][n-1];break;case"S":case"A":throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");case"z":t.timeZoneName=n<4?"short":"long";break;case"Z":case"O":case"v":case"V":case"X":case"x":throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead")}return""}),t}var Aa=/[\t-\r \x85\u200E\u200F\u2028\u2029]/i;function Ta(e){if(e.length===0)throw new Error("Number skeleton cannot be empty");for(var t=e.split(Aa).filter(function(u){return u.length>0}),r=[],n=0,i=t;n<i.length;n++){var o=i[n],a=o.split("/");if(a.length===0)throw new Error("Invalid number skeleton");for(var s=a[0],c=a.slice(1),l=0,h=c;l<h.length;l++){var d=h[l];if(d.length===0)throw new Error("Invalid number skeleton")}r.push({stem:s,options:c})}return r}function Fc(e){return e.replace(/^(.*?)-/,"")}var Ea=/^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,wa=/^(@+)?(\+|#+)?[rs]?$/g,Kc=/(\*)(0+)|(#+)(0+)|(0+)/g,La=/^(0+)$/;function Sa(e){var t={};return e[e.length-1]==="r"?t.roundingPriority="morePrecision":e[e.length-1]==="s"&&(t.roundingPriority="lessPrecision"),e.replace(wa,function(r,n,i){return typeof i!="string"?(t.minimumSignificantDigits=n.length,t.maximumSignificantDigits=n.length):i==="+"?t.minimumSignificantDigits=n.length:n[0]==="#"?t.maximumSignificantDigits=n.length:(t.minimumSignificantDigits=n.length,t.maximumSignificantDigits=n.length+(typeof i=="string"?i.length:0)),""}),t}function _a(e){switch(e){case"sign-auto":return{signDisplay:"auto"};case"sign-accounting":case"()":return{currencySign:"accounting"};case"sign-always":case"+!":return{signDisplay:"always"};case"sign-accounting-always":case"()!":return{signDisplay:"always",currencySign:"accounting"};case"sign-except-zero":case"+?":return{signDisplay:"exceptZero"};case"sign-accounting-except-zero":case"()?":return{signDisplay:"exceptZero",currencySign:"accounting"};case"sign-never":case"+_":return{signDisplay:"never"}}}function jc(e){var t;if(e[0]==="E"&&e[1]==="E"?(t={notation:"engineering"},e=e.slice(2)):e[0]==="E"&&(t={notation:"scientific"},e=e.slice(1)),t){var r=e.slice(0,2);if(r==="+!"?(t.signDisplay="always",e=e.slice(2)):r==="+?"&&(t.signDisplay="exceptZero",e=e.slice(2)),!La.test(e))throw new Error("Malformed concise eng/scientific notation");t.minimumIntegerDigits=e.length}return t}function ya(e){var t={},r=_a(e);return r||t}function Ca(e){for(var t={},r=0,n=e;r<n.length;r++){var i=n[r];switch(i.stem){case"percent":case"%":t.style="percent";continue;case"%x100":t.style="percent",t.scale=100;continue;case"currency":t.style="currency",t.currency=i.options[0];continue;case"group-off":case",_":t.useGrouping=!1;continue;case"precision-integer":case".":t.maximumFractionDigits=0;continue;case"measure-unit":case"unit":t.style="unit",t.unit=Fc(i.options[0]);continue;case"compact-short":case"K":t.notation="compact",t.compactDisplay="short";continue;case"compact-long":case"KK":t.notation="compact",t.compactDisplay="long";continue;case"scientific":t=A(A(A({},t),{notation:"scientific"}),i.options.reduce(function(c,l){return A(A({},c),ya(l))},{}));continue;case"engineering":t=A(A(A({},t),{notation:"engineering"}),i.options.reduce(function(c,l){return A(A({},c),ya(l))},{}));continue;case"notation-simple":t.notation="standard";continue;case"unit-width-narrow":t.currencyDisplay="narrowSymbol",t.unitDisplay="narrow";continue;case"unit-width-short":t.currencyDisplay="code",t.unitDisplay="short";continue;case"unit-width-full-name":t.currencyDisplay="name",t.unitDisplay="long";continue;case"unit-width-iso-code":t.currencyDisplay="symbol";continue;case"scale":t.scale=parseFloat(i.options[0]);continue;case"integer-width":if(i.options.length>1)throw new RangeError("integer-width stems only accept a single optional option");i.options[0].replace(Kc,function(c,l,h,d,u,m){if(l)t.minimumIntegerDigits=h.length;else{if(d&&u)throw new Error("We currently do not support maximum integer digits");if(m)throw new Error("We currently do not support exact integer digits")}return""});continue}if(La.test(i.stem)){t.minimumIntegerDigits=i.stem.length;continue}if(Ea.test(i.stem)){if(i.options.length>1)throw new RangeError("Fraction-precision stems only accept a single optional option");i.stem.replace(Ea,function(c,l,h,d,u,m){return h==="*"?t.minimumFractionDigits=l.length:d&&d[0]==="#"?t.maximumFractionDigits=d.length:u&&m?(t.minimumFractionDigits=u.length,t.maximumFractionDigits=u.length+m.length):(t.minimumFractionDigits=l.length,t.maximumFractionDigits=l.length),""});var o=i.options[0];o==="w"?t=A(A({},t),{trailingZeroDisplay:"stripIfInteger"}):o&&(t=A(A({},t),Sa(o)));continue}if(wa.test(i.stem)){t=A(A({},t),Sa(i.stem));continue}var a=_a(i.stem);a&&(t=A(A({},t),a));var s=jc(i.stem);s&&(t=A(A({},t),s))}return t}var jt={AX:["H"],BQ:["H"],CP:["H"],CZ:["H"],DK:["H"],FI:["H"],ID:["H"],IS:["H"],ML:["H"],NE:["H"],RU:["H"],SE:["H"],SJ:["H"],SK:["H"],AS:["h","H"],BT:["h","H"],DJ:["h","H"],ER:["h","H"],GH:["h","H"],IN:["h","H"],LS:["h","H"],PG:["h","H"],PW:["h","H"],SO:["h","H"],TO:["h","H"],VU:["h","H"],WS:["h","H"],"001":["H","h"],AL:["h","H","hB"],TD:["h","H","hB"],"ca-ES":["H","h","hB"],CF:["H","h","hB"],CM:["H","h","hB"],"fr-CA":["H","h","hB"],"gl-ES":["H","h","hB"],"it-CH":["H","h","hB"],"it-IT":["H","h","hB"],LU:["H","h","hB"],NP:["H","h","hB"],PF:["H","h","hB"],SC:["H","h","hB"],SM:["H","h","hB"],SN:["H","h","hB"],TF:["H","h","hB"],VA:["H","h","hB"],CY:["h","H","hb","hB"],GR:["h","H","hb","hB"],CO:["h","H","hB","hb"],DO:["h","H","hB","hb"],KP:["h","H","hB","hb"],KR:["h","H","hB","hb"],NA:["h","H","hB","hb"],PA:["h","H","hB","hb"],PR:["h","H","hB","hb"],VE:["h","H","hB","hb"],AC:["H","h","hb","hB"],AI:["H","h","hb","hB"],BW:["H","h","hb","hB"],BZ:["H","h","hb","hB"],CC:["H","h","hb","hB"],CK:["H","h","hb","hB"],CX:["H","h","hb","hB"],DG:["H","h","hb","hB"],FK:["H","h","hb","hB"],GB:["H","h","hb","hB"],GG:["H","h","hb","hB"],GI:["H","h","hb","hB"],IE:["H","h","hb","hB"],IM:["H","h","hb","hB"],IO:["H","h","hb","hB"],JE:["H","h","hb","hB"],LT:["H","h","hb","hB"],MK:["H","h","hb","hB"],MN:["H","h","hb","hB"],MS:["H","h","hb","hB"],NF:["H","h","hb","hB"],NG:["H","h","hb","hB"],NR:["H","h","hb","hB"],NU:["H","h","hb","hB"],PN:["H","h","hb","hB"],SH:["H","h","hb","hB"],SX:["H","h","hb","hB"],TA:["H","h","hb","hB"],ZA:["H","h","hb","hB"],"af-ZA":["H","h","hB","hb"],AR:["H","h","hB","hb"],CL:["H","h","hB","hb"],CR:["H","h","hB","hb"],CU:["H","h","hB","hb"],EA:["H","h","hB","hb"],"es-BO":["H","h","hB","hb"],"es-BR":["H","h","hB","hb"],"es-EC":["H","h","hB","hb"],"es-ES":["H","h","hB","hb"],"es-GQ":["H","h","hB","hb"],"es-PE":["H","h","hB","hb"],GT:["H","h","hB","hb"],HN:["H","h","hB","hb"],IC:["H","h","hB","hb"],KG:["H","h","hB","hb"],KM:["H","h","hB","hb"],LK:["H","h","hB","hb"],MA:["H","h","hB","hb"],MX:["H","h","hB","hb"],NI:["H","h","hB","hb"],PY:["H","h","hB","hb"],SV:["H","h","hB","hb"],UY:["H","h","hB","hb"],JP:["H","h","K"],AD:["H","hB"],AM:["H","hB"],AO:["H","hB"],AT:["H","hB"],AW:["H","hB"],BE:["H","hB"],BF:["H","hB"],BJ:["H","hB"],BL:["H","hB"],BR:["H","hB"],CG:["H","hB"],CI:["H","hB"],CV:["H","hB"],DE:["H","hB"],EE:["H","hB"],FR:["H","hB"],GA:["H","hB"],GF:["H","hB"],GN:["H","hB"],GP:["H","hB"],GW:["H","hB"],HR:["H","hB"],IL:["H","hB"],IT:["H","hB"],KZ:["H","hB"],MC:["H","hB"],MD:["H","hB"],MF:["H","hB"],MQ:["H","hB"],MZ:["H","hB"],NC:["H","hB"],NL:["H","hB"],PM:["H","hB"],PT:["H","hB"],RE:["H","hB"],RO:["H","hB"],SI:["H","hB"],SR:["H","hB"],ST:["H","hB"],TG:["H","hB"],TR:["H","hB"],WF:["H","hB"],YT:["H","hB"],BD:["h","hB","H"],PK:["h","hB","H"],AZ:["H","hB","h"],BA:["H","hB","h"],BG:["H","hB","h"],CH:["H","hB","h"],GE:["H","hB","h"],LI:["H","hB","h"],ME:["H","hB","h"],RS:["H","hB","h"],UA:["H","hB","h"],UZ:["H","hB","h"],XK:["H","hB","h"],AG:["h","hb","H","hB"],AU:["h","hb","H","hB"],BB:["h","hb","H","hB"],BM:["h","hb","H","hB"],BS:["h","hb","H","hB"],CA:["h","hb","H","hB"],DM:["h","hb","H","hB"],"en-001":["h","hb","H","hB"],FJ:["h","hb","H","hB"],FM:["h","hb","H","hB"],GD:["h","hb","H","hB"],GM:["h","hb","H","hB"],GU:["h","hb","H","hB"],GY:["h","hb","H","hB"],JM:["h","hb","H","hB"],KI:["h","hb","H","hB"],KN:["h","hb","H","hB"],KY:["h","hb","H","hB"],LC:["h","hb","H","hB"],LR:["h","hb","H","hB"],MH:["h","hb","H","hB"],MP:["h","hb","H","hB"],MW:["h","hb","H","hB"],NZ:["h","hb","H","hB"],SB:["h","hb","H","hB"],SG:["h","hb","H","hB"],SL:["h","hb","H","hB"],SS:["h","hb","H","hB"],SZ:["h","hb","H","hB"],TC:["h","hb","H","hB"],TT:["h","hb","H","hB"],UM:["h","hb","H","hB"],US:["h","hb","H","hB"],VC:["h","hb","H","hB"],VG:["h","hb","H","hB"],VI:["h","hb","H","hB"],ZM:["h","hb","H","hB"],BO:["H","hB","h","hb"],EC:["H","hB","h","hb"],ES:["H","hB","h","hb"],GQ:["H","hB","h","hb"],PE:["H","hB","h","hb"],AE:["h","hB","hb","H"],"ar-001":["h","hB","hb","H"],BH:["h","hB","hb","H"],DZ:["h","hB","hb","H"],EG:["h","hB","hb","H"],EH:["h","hB","hb","H"],HK:["h","hB","hb","H"],IQ:["h","hB","hb","H"],JO:["h","hB","hb","H"],KW:["h","hB","hb","H"],LB:["h","hB","hb","H"],LY:["h","hB","hb","H"],MO:["h","hB","hb","H"],MR:["h","hB","hb","H"],OM:["h","hB","hb","H"],PH:["h","hB","hb","H"],PS:["h","hB","hb","H"],QA:["h","hB","hb","H"],SA:["h","hB","hb","H"],SD:["h","hB","hb","H"],SY:["h","hB","hb","H"],TN:["h","hB","hb","H"],YE:["h","hB","hb","H"],AF:["H","hb","hB","h"],LA:["H","hb","hB","h"],CN:["H","hB","hb","h"],LV:["H","hB","hb","h"],TL:["H","hB","hb","h"],"zu-ZA":["H","hB","hb","h"],CD:["hB","H"],IR:["hB","H"],"hi-IN":["hB","h","H"],"kn-IN":["hB","h","H"],"ml-IN":["hB","h","H"],"te-IN":["hB","h","H"],KH:["hB","h","H","hb"],"ta-IN":["hB","h","hb","H"],BN:["hb","hB","h","H"],MY:["hb","hB","h","H"],ET:["hB","hb","h","H"],"gu-IN":["hB","hb","h","H"],"mr-IN":["hB","hb","h","H"],"pa-IN":["hB","hb","h","H"],TW:["hB","hb","h","H"],KE:["hB","hb","H","h"],MM:["hB","hb","H","h"],TZ:["hB","hb","H","h"],UG:["hB","hb","H","h"]};function Pa(e,t){for(var r="",n=0;n<e.length;n++){var i=e.charAt(n);if(i==="j"){for(var o=0;n+1<e.length&&e.charAt(n+1)===i;)o++,n++;var a=1+(o&1),s=o<2?1:3+(o>>1),c="a",l=Yc(t);for((l=="H"||l=="k")&&(s=0);s-- >0;)r+=c;for(;a-- >0;)r=l+r}else i==="J"?r+="H":r+=i}return r}function Yc(e){var t=e.hourCycle;if(t===void 0&&e.hourCycles&&e.hourCycles.length&&(t=e.hourCycles[0]),t)switch(t){case"h24":return"k";case"h23":return"H";case"h12":return"h";case"h11":return"K";default:throw new Error("Invalid hourCycle")}var r=e.language,n;r!=="root"&&(n=e.maximize().region);var i=jt[n||""]||jt[r||""]||jt["".concat(r,"-001")]||jt["001"];return i[0]}var vi,Xc=new RegExp("^".concat(bi.source,"*")),Wc=new RegExp("".concat(bi.source,"*$"));function E(e,t){return{start:e,end:t}}var qc=!!String.prototype.startsWith,Zc=!!String.fromCodePoint,Jc=!!Object.fromEntries,Qc=!!String.prototype.codePointAt,el=!!String.prototype.trimStart,tl=!!String.prototype.trimEnd,rl=!!Number.isSafeInteger,nl=rl?Number.isSafeInteger:function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e&&Math.abs(e)<=9007199254740991},Ei=!0;try{ka=Ra("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu"),Ei=((vi=ka.exec("a"))===null||vi===void 0?void 0:vi[0])==="a"}catch{Ei=!1}var ka,Ia=qc?function(t,r,n){return t.startsWith(r,n)}:function(t,r,n){return t.slice(n,n+r.length)===r},Si=Zc?String.fromCodePoint:function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];for(var n="",i=t.length,o=0,a;i>o;){if(a=t[o++],a>1114111)throw RangeError(a+" is not a valid code point");n+=a<65536?String.fromCharCode(a):String.fromCharCode(((a-=65536)>>10)+55296,a%1024+56320)}return n},Na=Jc?Object.fromEntries:function(t){for(var r={},n=0,i=t;n<i.length;n++){var o=i[n],a=o[0],s=o[1];r[a]=s}return r},Oa=Qc?function(t,r){return t.codePointAt(r)}:function(t,r){var n=t.length;if(!(r<0||r>=n)){var i=t.charCodeAt(r),o;return i<55296||i>56319||r+1===n||(o=t.charCodeAt(r+1))<56320||o>57343?i:(i-55296<<10)+(o-56320)+65536}},il=el?function(t){return t.trimStart()}:function(t){return t.replace(Xc,"")},ol=tl?function(t){return t.trimEnd()}:function(t){return t.replace(Wc,"")};function Ra(e,t){return new RegExp(e,t)}var yi;Ei?(Ai=Ra("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu"),yi=function(t,r){var n;Ai.lastIndex=r;var i=Ai.exec(t);return(n=i[1])!==null&&n!==void 0?n:""}):yi=function(t,r){for(var n=[];;){var i=Oa(t,r);if(i===void 0||Va(i)||cl(i))break;n.push(i),r+=i>=65536?2:1}return Si.apply(void 0,n)};var Ai,Ma=function(){function e(t,r){r===void 0&&(r={}),this.message=t,this.position={offset:0,line:1,column:1},this.ignoreTag=!!r.ignoreTag,this.locale=r.locale,this.requiresOtherClause=!!r.requiresOtherClause,this.shouldParseSkeletons=!!r.shouldParseSkeletons}return e.prototype.parse=function(){if(this.offset()!==0)throw Error("parser can only be used once");return this.parseMessage(0,"",!1)},e.prototype.parseMessage=function(t,r,n){for(var i=[];!this.isEOF();){var o=this.char();if(o===123){var a=this.parseArgument(t,n);if(a.err)return a;i.push(a.val)}else{if(o===125&&t>0)break;if(o===35&&(r==="plural"||r==="selectordinal")){var s=this.clonePosition();this.bump(),i.push({type:k.pound,location:E(s,this.clonePosition())})}else if(o===60&&!this.ignoreTag&&this.peek()===47){if(n)break;return this.error(v.UNMATCHED_CLOSING_TAG,E(this.clonePosition(),this.clonePosition()))}else if(o===60&&!this.ignoreTag&&Ti(this.peek()||0)){var a=this.parseTag(t,r);if(a.err)return a;i.push(a.val)}else{var a=this.parseLiteral(t,r);if(a.err)return a;i.push(a.val)}}}return{val:i,err:null}},e.prototype.parseTag=function(t,r){var n=this.clonePosition();this.bump();var i=this.parseTagName();if(this.bumpSpace(),this.bumpIf("/>"))return{val:{type:k.literal,value:"<".concat(i,"/>"),location:E(n,this.clonePosition())},err:null};if(this.bumpIf(">")){var o=this.parseMessage(t+1,r,!0);if(o.err)return o;var a=o.val,s=this.clonePosition();if(this.bumpIf("</")){if(this.isEOF()||!Ti(this.char()))return this.error(v.INVALID_TAG,E(s,this.clonePosition()));var c=this.clonePosition(),l=this.parseTagName();return i!==l?this.error(v.UNMATCHED_CLOSING_TAG,E(c,this.clonePosition())):(this.bumpSpace(),this.bumpIf(">")?{val:{type:k.tag,value:i,children:a,location:E(n,this.clonePosition())},err:null}:this.error(v.INVALID_TAG,E(s,this.clonePosition())))}else return this.error(v.UNCLOSED_TAG,E(n,this.clonePosition()))}else return this.error(v.INVALID_TAG,E(n,this.clonePosition()))},e.prototype.parseTagName=function(){var t=this.offset();for(this.bump();!this.isEOF()&&sl(this.char());)this.bump();return this.message.slice(t,this.offset())},e.prototype.parseLiteral=function(t,r){for(var n=this.clonePosition(),i="";;){var o=this.tryParseQuote(r);if(o){i+=o;continue}var a=this.tryParseUnquoted(t,r);if(a){i+=a;continue}var s=this.tryParseLeftAngleBracket();if(s){i+=s;continue}break}var c=E(n,this.clonePosition());return{val:{type:k.literal,value:i,location:c},err:null}},e.prototype.tryParseLeftAngleBracket=function(){return!this.isEOF()&&this.char()===60&&(this.ignoreTag||!al(this.peek()||0))?(this.bump(),"<"):null},e.prototype.tryParseQuote=function(t){if(this.isEOF()||this.char()!==39)return null;switch(this.peek()){case 39:return this.bump(),this.bump(),"'";case 123:case 60:case 62:case 125:break;case 35:if(t==="plural"||t==="selectordinal")break;return null;default:return null}this.bump();var r=[this.char()];for(this.bump();!this.isEOF();){var n=this.char();if(n===39)if(this.peek()===39)r.push(39),this.bump();else{this.bump();break}else r.push(n);this.bump()}return Si.apply(void 0,r)},e.prototype.tryParseUnquoted=function(t,r){if(this.isEOF())return null;var n=this.char();return n===60||n===123||n===35&&(r==="plural"||r==="selectordinal")||n===125&&t>0?null:(this.bump(),Si(n))},e.prototype.parseArgument=function(t,r){var n=this.clonePosition();if(this.bump(),this.bumpSpace(),this.isEOF())return this.error(v.EXPECT_ARGUMENT_CLOSING_BRACE,E(n,this.clonePosition()));if(this.char()===125)return this.bump(),this.error(v.EMPTY_ARGUMENT,E(n,this.clonePosition()));var i=this.parseIdentifierIfPossible().value;if(!i)return this.error(v.MALFORMED_ARGUMENT,E(n,this.clonePosition()));if(this.bumpSpace(),this.isEOF())return this.error(v.EXPECT_ARGUMENT_CLOSING_BRACE,E(n,this.clonePosition()));switch(this.char()){case 125:return this.bump(),{val:{type:k.argument,value:i,location:E(n,this.clonePosition())},err:null};case 44:return this.bump(),this.bumpSpace(),this.isEOF()?this.error(v.EXPECT_ARGUMENT_CLOSING_BRACE,E(n,this.clonePosition())):this.parseArgumentOptions(t,r,i,n);default:return this.error(v.MALFORMED_ARGUMENT,E(n,this.clonePosition()))}},e.prototype.parseIdentifierIfPossible=function(){var t=this.clonePosition(),r=this.offset(),n=yi(this.message,r),i=r+n.length;this.bumpTo(i);var o=this.clonePosition(),a=E(t,o);return{value:n,location:a}},e.prototype.parseArgumentOptions=function(t,r,n,i){var o,a=this.clonePosition(),s=this.parseIdentifierIfPossible().value,c=this.clonePosition();switch(s){case"":return this.error(v.EXPECT_ARGUMENT_TYPE,E(a,c));case"number":case"date":case"time":{this.bumpSpace();var l=null;if(this.bumpIf(",")){this.bumpSpace();var h=this.clonePosition(),d=this.parseSimpleArgStyleIfPossible();if(d.err)return d;var u=ol(d.val);if(u.length===0)return this.error(v.EXPECT_ARGUMENT_STYLE,E(this.clonePosition(),this.clonePosition()));var m=E(h,this.clonePosition());l={style:u,styleLocation:m}}var g=this.tryParseArgumentClose(i);if(g.err)return g;var f=E(i,this.clonePosition());if(l&&Ia(l?.style,"::",0)){var T=il(l.style.slice(2));if(s==="number"){var d=this.parseNumberSkeletonFromString(T,l.styleLocation);return d.err?d:{val:{type:k.number,value:n,location:f,style:d.val},err:null}}else{if(T.length===0)return this.error(v.EXPECT_DATE_TIME_SKELETON,f);var L=T;this.locale&&(L=Pa(T,this.locale));var u={type:Ue.dateTime,pattern:L,location:l.styleLocation,parsedOptions:this.shouldParseSkeletons?va(L):{}},b=s==="date"?k.date:k.time;return{val:{type:b,value:n,location:f,style:u},err:null}}}return{val:{type:s==="number"?k.number:s==="date"?k.date:k.time,value:n,location:f,style:(o=l?.style)!==null&&o!==void 0?o:null},err:null}}case"plural":case"selectordinal":case"select":{var S=this.clonePosition();if(this.bumpSpace(),!this.bumpIf(","))return this.error(v.EXPECT_SELECT_ARGUMENT_OPTIONS,E(S,A({},S)));this.bumpSpace();var I=this.parseIdentifierIfPossible(),R=0;if(s!=="select"&&I.value==="offset"){if(!this.bumpIf(":"))return this.error(v.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,E(this.clonePosition(),this.clonePosition()));this.bumpSpace();var d=this.tryParseDecimalInteger(v.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,v.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);if(d.err)return d;this.bumpSpace(),I=this.parseIdentifierIfPossible(),R=d.val}var U=this.tryParsePluralOrSelectOptions(t,s,r,I);if(U.err)return U;var g=this.tryParseArgumentClose(i);if(g.err)return g;var $=E(i,this.clonePosition());return s==="select"?{val:{type:k.select,value:n,options:Na(U.val),location:$},err:null}:{val:{type:k.plural,value:n,options:Na(U.val),offset:R,pluralType:s==="plural"?"cardinal":"ordinal",location:$},err:null}}default:return this.error(v.INVALID_ARGUMENT_TYPE,E(a,c))}},e.prototype.tryParseArgumentClose=function(t){return this.isEOF()||this.char()!==125?this.error(v.EXPECT_ARGUMENT_CLOSING_BRACE,E(t,this.clonePosition())):(this.bump(),{val:!0,err:null})},e.prototype.parseSimpleArgStyleIfPossible=function(){for(var t=0,r=this.clonePosition();!this.isEOF();){var n=this.char();switch(n){case 39:{this.bump();var i=this.clonePosition();if(!this.bumpUntil("'"))return this.error(v.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE,E(i,this.clonePosition()));this.bump();break}case 123:{t+=1,this.bump();break}case 125:{if(t>0)t-=1;else return{val:this.message.slice(r.offset,this.offset()),err:null};break}default:this.bump();break}}return{val:this.message.slice(r.offset,this.offset()),err:null}},e.prototype.parseNumberSkeletonFromString=function(t,r){var n=[];try{n=Ta(t)}catch{return this.error(v.INVALID_NUMBER_SKELETON,r)}return{val:{type:Ue.number,tokens:n,location:r,parsedOptions:this.shouldParseSkeletons?Ca(n):{}},err:null}},e.prototype.tryParsePluralOrSelectOptions=function(t,r,n,i){for(var o,a=!1,s=[],c=new Set,l=i.value,h=i.location;;){if(l.length===0){var d=this.clonePosition();if(r!=="select"&&this.bumpIf("=")){var u=this.tryParseDecimalInteger(v.EXPECT_PLURAL_ARGUMENT_SELECTOR,v.INVALID_PLURAL_ARGUMENT_SELECTOR);if(u.err)return u;h=E(d,this.clonePosition()),l=this.message.slice(d.offset,this.offset())}else break}if(c.has(l))return this.error(r==="select"?v.DUPLICATE_SELECT_ARGUMENT_SELECTOR:v.DUPLICATE_PLURAL_ARGUMENT_SELECTOR,h);l==="other"&&(a=!0),this.bumpSpace();var m=this.clonePosition();if(!this.bumpIf("{"))return this.error(r==="select"?v.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT:v.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT,E(this.clonePosition(),this.clonePosition()));var g=this.parseMessage(t+1,r,n);if(g.err)return g;var f=this.tryParseArgumentClose(m);if(f.err)return f;s.push([l,{value:g.val,location:E(m,this.clonePosition())}]),c.add(l),this.bumpSpace(),o=this.parseIdentifierIfPossible(),l=o.value,h=o.location}return s.length===0?this.error(r==="select"?v.EXPECT_SELECT_ARGUMENT_SELECTOR:v.EXPECT_PLURAL_ARGUMENT_SELECTOR,E(this.clonePosition(),this.clonePosition())):this.requiresOtherClause&&!a?this.error(v.MISSING_OTHER_CLAUSE,E(this.clonePosition(),this.clonePosition())):{val:s,err:null}},e.prototype.tryParseDecimalInteger=function(t,r){var n=1,i=this.clonePosition();this.bumpIf("+")||this.bumpIf("-")&&(n=-1);for(var o=!1,a=0;!this.isEOF();){var s=this.char();if(s>=48&&s<=57)o=!0,a=a*10+(s-48),this.bump();else break}var c=E(i,this.clonePosition());return o?(a*=n,nl(a)?{val:a,err:null}:this.error(r,c)):this.error(t,c)},e.prototype.offset=function(){return this.position.offset},e.prototype.isEOF=function(){return this.offset()===this.message.length},e.prototype.clonePosition=function(){return{offset:this.position.offset,line:this.position.line,column:this.position.column}},e.prototype.char=function(){var t=this.position.offset;if(t>=this.message.length)throw Error("out of bound");var r=Oa(this.message,t);if(r===void 0)throw Error("Offset ".concat(t," is at invalid UTF-16 code unit boundary"));return r},e.prototype.error=function(t,r){return{val:null,err:{kind:t,message:this.message,location:r}}},e.prototype.bump=function(){if(!this.isEOF()){var t=this.char();t===10?(this.position.line+=1,this.position.column=1,this.position.offset+=1):(this.position.column+=1,this.position.offset+=t<65536?1:2)}},e.prototype.bumpIf=function(t){if(Ia(this.message,t,this.offset())){for(var r=0;r<t.length;r++)this.bump();return!0}return!1},e.prototype.bumpUntil=function(t){var r=this.offset(),n=this.message.indexOf(t,r);return n>=0?(this.bumpTo(n),!0):(this.bumpTo(this.message.length),!1)},e.prototype.bumpTo=function(t){if(this.offset()>t)throw Error("targetOffset ".concat(t," must be greater than or equal to the current offset ").concat(this.offset()));for(t=Math.min(t,this.message.length);;){var r=this.offset();if(r===t)break;if(r>t)throw Error("targetOffset ".concat(t," is at invalid UTF-16 code unit boundary"));if(this.bump(),this.isEOF())break}},e.prototype.bumpSpace=function(){for(;!this.isEOF()&&Va(this.char());)this.bump()},e.prototype.peek=function(){if(this.isEOF())return null;var t=this.char(),r=this.offset(),n=this.message.charCodeAt(r+(t>=65536?2:1));return n??null},e}();function Ti(e){return e>=97&&e<=122||e>=65&&e<=90}function al(e){return Ti(e)||e===47}function sl(e){return e===45||e===46||e>=48&&e<=57||e===95||e>=97&&e<=122||e>=65&&e<=90||e==183||e>=192&&e<=214||e>=216&&e<=246||e>=248&&e<=893||e>=895&&e<=8191||e>=8204&&e<=8205||e>=8255&&e<=8256||e>=8304&&e<=8591||e>=11264&&e<=12271||e>=12289&&e<=55295||e>=63744&&e<=64975||e>=65008&&e<=65533||e>=65536&&e<=983039}function Va(e){return e>=9&&e<=13||e===32||e===133||e>=8206&&e<=8207||e===8232||e===8233}function cl(e){return e>=33&&e<=35||e===36||e>=37&&e<=39||e===40||e===41||e===42||e===43||e===44||e===45||e>=46&&e<=47||e>=58&&e<=59||e>=60&&e<=62||e>=63&&e<=64||e===91||e===92||e===93||e===94||e===96||e===123||e===124||e===125||e===126||e===161||e>=162&&e<=165||e===166||e===167||e===169||e===171||e===172||e===174||e===176||e===177||e===182||e===187||e===191||e===215||e===247||e>=8208&&e<=8213||e>=8214&&e<=8215||e===8216||e===8217||e===8218||e>=8219&&e<=8220||e===8221||e===8222||e===8223||e>=8224&&e<=8231||e>=8240&&e<=8248||e===8249||e===8250||e>=8251&&e<=8254||e>=8257&&e<=8259||e===8260||e===8261||e===8262||e>=8263&&e<=8273||e===8274||e===8275||e>=8277&&e<=8286||e>=8592&&e<=8596||e>=8597&&e<=8601||e>=8602&&e<=8603||e>=8604&&e<=8607||e===8608||e>=8609&&e<=8610||e===8611||e>=8612&&e<=8613||e===8614||e>=8615&&e<=8621||e===8622||e>=8623&&e<=8653||e>=8654&&e<=8655||e>=8656&&e<=8657||e===8658||e===8659||e===8660||e>=8661&&e<=8691||e>=8692&&e<=8959||e>=8960&&e<=8967||e===8968||e===8969||e===8970||e===8971||e>=8972&&e<=8991||e>=8992&&e<=8993||e>=8994&&e<=9e3||e===9001||e===9002||e>=9003&&e<=9083||e===9084||e>=9085&&e<=9114||e>=9115&&e<=9139||e>=9140&&e<=9179||e>=9180&&e<=9185||e>=9186&&e<=9254||e>=9255&&e<=9279||e>=9280&&e<=9290||e>=9291&&e<=9311||e>=9472&&e<=9654||e===9655||e>=9656&&e<=9664||e===9665||e>=9666&&e<=9719||e>=9720&&e<=9727||e>=9728&&e<=9838||e===9839||e>=9840&&e<=10087||e===10088||e===10089||e===10090||e===10091||e===10092||e===10093||e===10094||e===10095||e===10096||e===10097||e===10098||e===10099||e===10100||e===10101||e>=10132&&e<=10175||e>=10176&&e<=10180||e===10181||e===10182||e>=10183&&e<=10213||e===10214||e===10215||e===10216||e===10217||e===10218||e===10219||e===10220||e===10221||e===10222||e===10223||e>=10224&&e<=10239||e>=10240&&e<=10495||e>=10496&&e<=10626||e===10627||e===10628||e===10629||e===10630||e===10631||e===10632||e===10633||e===10634||e===10635||e===10636||e===10637||e===10638||e===10639||e===10640||e===10641||e===10642||e===10643||e===10644||e===10645||e===10646||e===10647||e===10648||e>=10649&&e<=10711||e===10712||e===10713||e===10714||e===10715||e>=10716&&e<=10747||e===10748||e===10749||e>=10750&&e<=11007||e>=11008&&e<=11055||e>=11056&&e<=11076||e>=11077&&e<=11078||e>=11079&&e<=11084||e>=11085&&e<=11123||e>=11124&&e<=11125||e>=11126&&e<=11157||e===11158||e>=11159&&e<=11263||e>=11776&&e<=11777||e===11778||e===11779||e===11780||e===11781||e>=11782&&e<=11784||e===11785||e===11786||e===11787||e===11788||e===11789||e>=11790&&e<=11798||e===11799||e>=11800&&e<=11801||e===11802||e===11803||e===11804||e===11805||e>=11806&&e<=11807||e===11808||e===11809||e===11810||e===11811||e===11812||e===11813||e===11814||e===11815||e===11816||e===11817||e>=11818&&e<=11822||e===11823||e>=11824&&e<=11833||e>=11834&&e<=11835||e>=11836&&e<=11839||e===11840||e===11841||e===11842||e>=11843&&e<=11855||e>=11856&&e<=11857||e===11858||e>=11859&&e<=11903||e>=12289&&e<=12291||e===12296||e===12297||e===12298||e===12299||e===12300||e===12301||e===12302||e===12303||e===12304||e===12305||e>=12306&&e<=12307||e===12308||e===12309||e===12310||e===12311||e===12312||e===12313||e===12314||e===12315||e===12316||e===12317||e>=12318&&e<=12319||e===12320||e===12336||e===64830||e===64831||e>=65093&&e<=65094}function wi(e){e.forEach(function(t){if(delete t.location,Mr(t)||Vr(t))for(var r in t.options)delete t.options[r].location,wi(t.options[r].value);else Nr(t)&&Hr(t.style)||(Or(t)||Rr(t))&&Kt(t.style)?delete t.style.location:$r(t)&&wi(t.children)})}function $a(e,t){t===void 0&&(t={}),t=A({shouldParseSkeletons:!0,requiresOtherClause:!0},t);var r=new Ma(e,t).parse();if(r.err){var n=SyntaxError(v[r.err.kind]);throw n.location=r.err.location,n.originalMessage=r.err.message,n}return t?.captureLocation||wi(r.val),r.val}function Yt(e,t){var r=t&&t.cache?t.cache:pl,n=t&&t.serializer?t.serializer:ml,i=t&&t.strategy?t.strategy:hl;return i(e,{cache:r,serializer:n})}function ll(e){return e==null||typeof e=="number"||typeof e=="boolean"}function Ha(e,t,r,n){var i=ll(n)?n:r(n),o=t.get(i);return typeof o>"u"&&(o=e.call(this,n),t.set(i,o)),o}function Ua(e,t,r){var n=Array.prototype.slice.call(arguments,3),i=r(n),o=t.get(i);return typeof o>"u"&&(o=e.apply(this,n),t.set(i,o)),o}function Li(e,t,r,n,i){return r.bind(t,e,n,i)}function hl(e,t){var r=e.length===1?Ha:Ua;return Li(e,this,r,t.cache.create(),t.serializer)}function dl(e,t){return Li(e,this,Ua,t.cache.create(),t.serializer)}function ul(e,t){return Li(e,this,Ha,t.cache.create(),t.serializer)}var ml=function(){return JSON.stringify(arguments)};function _i(){this.cache=Object.create(null)}_i.prototype.get=function(e){return this.cache[e]};_i.prototype.set=function(e,t){this.cache[e]=t};var pl={create:function(){return new _i}},Ur={variadic:dl,monadic:ul};var De;(function(e){e.MISSING_VALUE="MISSING_VALUE",e.INVALID_VALUE="INVALID_VALUE",e.MISSING_INTL_API="MISSING_INTL_API"})(De||(De={}));var Xt=function(e){Ft(t,e);function t(r,n,i){var o=e.call(this,r)||this;return o.code=n,o.originalMessage=i,o}return t.prototype.toString=function(){return"[formatjs Error: ".concat(this.code,"] ").concat(this.message)},t}(Error);var Ci=function(e){Ft(t,e);function t(r,n,i,o){return e.call(this,'Invalid values for "'.concat(r,'": "').concat(n,'". Options are "').concat(Object.keys(i).join('", "'),'"'),De.INVALID_VALUE,o)||this}return t}(Xt);var Da=function(e){Ft(t,e);function t(r,n,i){return e.call(this,'Value for "'.concat(r,'" must be of type ').concat(n),De.INVALID_VALUE,i)||this}return t}(Xt);var Ba=function(e){Ft(t,e);function t(r,n){return e.call(this,'The intl string context variable "'.concat(r,'" was not provided to the string "').concat(n,'"'),De.MISSING_VALUE,n)||this}return t}(Xt);var z;(function(e){e[e.literal=0]="literal",e[e.object=1]="object"})(z||(z={}));function fl(e){return e.length<2?e:e.reduce(function(t,r){var n=t[t.length-1];return!n||n.type!==z.literal||r.type!==z.literal?t.push(r):n.value+=r.value,t},[])}function gl(e){return typeof e=="function"}function Wt(e,t,r,n,i,o,a){if(e.length===1&&xi(e[0]))return[{type:z.literal,value:e[0].value}];for(var s=[],c=0,l=e;c<l.length;c++){var h=l[c];if(xi(h)){s.push({type:z.literal,value:h.value});continue}if(ba(h)){typeof o=="number"&&s.push({type:z.literal,value:r.getNumberFormat(t).format(o)});continue}var d=h.value;if(!(i&&d in i))throw new Ba(d,a);var u=i[d];if(xa(h)){(!u||typeof u=="string"||typeof u=="number")&&(u=typeof u=="string"||typeof u=="number"?String(u):""),s.push({type:typeof u=="string"?z.literal:z.object,value:u});continue}if(Or(h)){var m=typeof h.style=="string"?n.date[h.style]:Kt(h.style)?h.style.parsedOptions:void 0;s.push({type:z.literal,value:r.getDateTimeFormat(t,m).format(u)});continue}if(Rr(h)){var m=typeof h.style=="string"?n.time[h.style]:Kt(h.style)?h.style.parsedOptions:n.time.medium;s.push({type:z.literal,value:r.getDateTimeFormat(t,m).format(u)});continue}if(Nr(h)){var m=typeof h.style=="string"?n.number[h.style]:Hr(h.style)?h.style.parsedOptions:void 0;m&&m.scale&&(u=u*(m.scale||1)),s.push({type:z.literal,value:r.getNumberFormat(t,m).format(u)});continue}if($r(h)){var g=h.children,f=h.value,T=i[f];if(!gl(T))throw new Da(f,"function",a);var L=Wt(g,t,r,n,i,o),b=T(L.map(function(R){return R.value}));Array.isArray(b)||(b=[b]),s.push.apply(s,b.map(function(R){return{type:typeof R=="string"?z.literal:z.object,value:R}}))}if(Mr(h)){var S=h.options[u]||h.options.other;if(!S)throw new Ci(h.value,u,Object.keys(h.options),a);s.push.apply(s,Wt(S.value,t,r,n,i));continue}if(Vr(h)){var S=h.options["=".concat(u)];if(!S){if(!Intl.PluralRules)throw new Xt(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`,De.MISSING_INTL_API,a);var I=r.getPluralRules(t,{type:h.pluralType}).select(u-(h.offset||0));S=h.options[I]||h.options.other}if(!S)throw new Ci(h.value,u,Object.keys(h.options),a);s.push.apply(s,Wt(S.value,t,r,n,i,u-(h.offset||0)));continue}}return fl(s)}function xl(e,t){return t?A(A(A({},e||{}),t||{}),Object.keys(e).reduce(function(r,n){return r[n]=A(A({},e[n]),t[n]||{}),r},{})):e}function bl(e,t){return t?Object.keys(e).reduce(function(r,n){return r[n]=xl(e[n],t[n]),r},A({},e)):e}function Pi(e){return{create:function(){return{get:function(t){return e[t]},set:function(t,r){e[t]=r}}}}}function vl(e){return e===void 0&&(e={number:{},dateTime:{},pluralRules:{}}),{getNumberFormat:Yt(function(){for(var t,r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return new((t=Intl.NumberFormat).bind.apply(t,Ir([void 0],r,!1)))},{cache:Pi(e.number),strategy:Ur.variadic}),getDateTimeFormat:Yt(function(){for(var t,r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return new((t=Intl.DateTimeFormat).bind.apply(t,Ir([void 0],r,!1)))},{cache:Pi(e.dateTime),strategy:Ur.variadic}),getPluralRules:Yt(function(){for(var t,r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return new((t=Intl.PluralRules).bind.apply(t,Ir([void 0],r,!1)))},{cache:Pi(e.pluralRules),strategy:Ur.variadic})}}var Ga=function(){function e(t,r,n,i){var o=this;if(r===void 0&&(r=e.defaultLocale),this.formatterCache={number:{},dateTime:{},pluralRules:{}},this.format=function(a){var s=o.formatToParts(a);if(s.length===1)return s[0].value;var c=s.reduce(function(l,h){return!l.length||h.type!==z.literal||typeof l[l.length-1]!="string"?l.push(h.value):l[l.length-1]+=h.value,l},[]);return c.length<=1?c[0]||"":c},this.formatToParts=function(a){return Wt(o.ast,o.locales,o.formatters,o.formats,a,void 0,o.message)},this.resolvedOptions=function(){return{locale:o.resolvedLocale.toString()}},this.getAst=function(){return o.ast},this.locales=r,this.resolvedLocale=e.resolveLocale(r),typeof t=="string"){if(this.message=t,!e.__parse)throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");this.ast=e.__parse(t,{ignoreTag:i?.ignoreTag,locale:this.resolvedLocale})}else this.ast=t;if(!Array.isArray(this.ast))throw new TypeError("A message must be provided as a String or AST.");this.formats=bl(e.formats,n),this.formatters=i&&i.formatters||vl(this.formatterCache)}return Object.defineProperty(e,"defaultLocale",{get:function(){return e.memoizedDefaultLocale||(e.memoizedDefaultLocale=new Intl.NumberFormat().resolvedOptions().locale),e.memoizedDefaultLocale},enumerable:!1,configurable:!0}),e.memoizedDefaultLocale=null,e.resolveLocale=function(t){var r=Intl.NumberFormat.supportedLocalesOf(t);return r.length>0?new Intl.Locale(r[0]):new Intl.Locale(typeof t=="string"?t:t[0])},e.__parse=$a,e.formats={number:{integer:{maximumFractionDigits:0},currency:{style:"currency"},percent:{style:"percent"}},date:{short:{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},long:{month:"long",day:"numeric",year:"numeric"},full:{weekday:"long",month:"long",day:"numeric",year:"numeric"}},time:{short:{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},long:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"}}},e}();var za=Ga;var Al=/[0-9\-+#]/,El=/[^\d\-+#]/g;function Fa(e){return e.search(Al)}function Sl(e="#.##"){let t={},r=e.length,n=Fa(e);t.prefix=n>0?e.substring(0,n):"";let i=Fa(e.split("").reverse().join("")),o=r-i,a=e.substring(o,o+1),s=o+(a==="."||a===","?1:0);t.suffix=i>0?e.substring(s,r):"",t.mask=e.substring(n,s),t.maskHasNegativeSign=t.mask.charAt(0)==="-",t.maskHasPositiveSign=t.mask.charAt(0)==="+";let c=t.mask.match(El);return t.decimal=c&&c[c.length-1]||".",t.separator=c&&c[1]&&c[0]||",",c=t.mask.split(t.decimal),t.integer=c[0],t.fraction=c[1],t}function yl(e,t,r){let n=!1,i={value:e};e<0&&(n=!0,i.value=-i.value),i.sign=n?"-":"",i.value=Number(i.value).toFixed(t.fraction&&t.fraction.length),i.value=Number(i.value).toString();let o=t.fraction&&t.fraction.lastIndexOf("0"),[a="0",s=""]=i.value.split(".");return(!s||s&&s.length<=o)&&(s=o<0?"":(+("0."+s)).toFixed(o+1).replace("0.","")),i.integer=a,i.fraction=s,Tl(i,t),(i.result==="0"||i.result==="")&&(n=!1,i.sign=""),!n&&t.maskHasPositiveSign?i.sign="+":n&&t.maskHasPositiveSign?i.sign="-":n&&(i.sign=r&&r.enforceMaskSign&&!t.maskHasNegativeSign?"":"-"),i}function Tl(e,t){e.result="";let r=t.integer.split(t.separator),n=r.join(""),i=n&&n.indexOf("0");if(i>-1)for(;e.integer.length<n.length-i;)e.integer="0"+e.integer;else Number(e.integer)===0&&(e.integer="");let o=r[1]&&r[r.length-1].length;if(o){let a=e.integer.length,s=a%o;for(let c=0;c<a;c++)e.result+=e.integer.charAt(c),!((c-s+1)%o)&&c<a-o&&(e.result+=t.separator)}else e.result=e.integer;return e.result+=t.fraction&&e.fraction?t.decimal+e.fraction:"",e}function wl(e,t,r={}){if(!e||isNaN(Number(t)))return t;let n=Sl(e),i=yl(t,n,r);return n.prefix+i.sign+i.result+n.suffix}var Ka=wl;var ja=".",Ll=",",Xa=/^\s+/,Wa=/\s+$/,Ya="&nbsp;",ki=e=>e*12,qa=(e,t)=>{let{start:r,end:n,displaySummary:{amount:i,duration:o,minProductQuantity:a,outcomeType:s}={}}=e;if(!(i&&o&&s&&a))return!1;let c=t?new Date(t):new Date;if(!r||!n)return!1;let l=new Date(r),h=new Date(n);return c>=l&&c<=h},Be={MONTH:"MONTH",YEAR:"YEAR"},_l={[N.ANNUAL]:12,[N.MONTHLY]:1,[N.THREE_YEARS]:36,[N.TWO_YEARS]:24},Ii=(e,t)=>({accept:e,round:t}),Cl=[Ii(({divisor:e,price:t})=>t%e==0,({divisor:e,price:t})=>t/e),Ii(({usePrecision:e})=>e,({divisor:e,price:t})=>Math.round(t/e*100)/100),Ii(()=>!0,({divisor:e,price:t})=>Math.ceil(Math.floor(t*100/e)/100))],Ni={[H.YEAR]:{[N.MONTHLY]:Be.MONTH,[N.ANNUAL]:Be.YEAR},[H.MONTH]:{[N.MONTHLY]:Be.MONTH}},Pl=(e,t)=>e.indexOf(`'${t}'`)===0,kl=(e,t=!0)=>{let r=e.replace(/'.*?'/,"").trim(),n=Ja(r);return!!n?t||(r=r.replace(/[,\.]0+/,n)):r=r.replace(/\s?(#.*0)(?!\s)?/,"$&"+Nl(e)),r},Il=e=>{let t=Ol(e),r=Pl(e,t),n=e.replace(/'.*?'/,""),i=Xa.test(n)||Wa.test(n);return{currencySymbol:t,isCurrencyFirst:r,hasCurrencySpace:i}},Za=e=>e.replace(Xa,Ya).replace(Wa,Ya),Nl=e=>e.match(/#(.?)#/)?.[1]===ja?Ll:ja,Ol=e=>e.match(/'(.*?)'/)?.[1]??"",Ja=e=>e.match(/0(.?)0/)?.[1]??"";function bt({formatString:e,price:t,usePrecision:r,isIndianPrice:n=!1},i,o=a=>a){let{currencySymbol:a,isCurrencyFirst:s,hasCurrencySpace:c}=Il(e),l=r?Ja(e):"",h=kl(e,r),d=r?2:0,u=o(t,{currencySymbol:a}),m=n?u.toLocaleString("hi-IN",{minimumFractionDigits:d,maximumFractionDigits:d}):Ka(h,u),g=r?m.lastIndexOf(l):m.length,f=m.substring(0,g),T=m.substring(g+1);return{accessiblePrice:e.replace(/'.*?'/,"SYMBOL").replace(/#.*0/,m).replace(/SYMBOL/,a),currencySymbol:a,decimals:T,decimalsDelimiter:l,hasCurrencySpace:c,integer:f,isCurrencyFirst:s,recurrenceTerm:i}}var Qa=e=>{let{commitment:t,term:r,usePrecision:n}=e,i=_l[r]??1;return bt(e,i>1?Be.MONTH:Ni[t]?.[r],o=>{let a={divisor:i,price:o,usePrecision:n},{round:s}=Cl.find(({accept:c})=>c(a));if(!s)throw new Error(`Missing rounding rule for: ${JSON.stringify(a)}`);return s(a)})},es=({commitment:e,term:t,...r})=>bt(r,Ni[e]?.[t]),ts=e=>{let{commitment:t,instant:r,price:n,originalPrice:i,priceWithoutDiscount:o,promotion:a,quantity:s=1,term:c}=e;if(t===H.YEAR&&c===N.MONTHLY){if(!a)return bt(e,Be.YEAR,ki);let{displaySummary:{outcomeType:l,duration:h,minProductQuantity:d=1}={}}=a;switch(l){case"PERCENTAGE_DISCOUNT":if(s>=d&&qa(a,r)){let u=parseInt(h.replace("P","").replace("M",""));if(isNaN(u))return ki(n);let m=s*i*u,g=s*o*(12-u),f=Math.floor((m+g)*100)/100;return bt({...e,price:f},Be.YEAR)}default:return bt(e,Be.YEAR,()=>ki(o??n))}}return bt(e,Ni[t]?.[c])};var Rl={recurrenceLabel:"{recurrenceTerm, select, MONTH {/mo} YEAR {/yr} other {}}",recurrenceAriaLabel:"{recurrenceTerm, select, MONTH {per month} YEAR {per year} other {}}",perUnitLabel:"{perUnit, select, LICENSE {per license} other {}}",perUnitAriaLabel:"{perUnit, select, LICENSE {per license} other {}}",freeLabel:"Free",freeAriaLabel:"Free",taxExclusiveLabel:"{taxTerm, select, GST {excl. GST} VAT {excl. VAT} TAX {excl. tax} IVA {excl. IVA} SST {excl. SST} KDV {excl. KDV} other {}}",taxInclusiveLabel:"{taxTerm, select, GST {incl. GST} VAT {incl. VAT} TAX {incl. tax} IVA {incl. IVA} SST {incl. SST} KDV {incl. KDV} other {}}",alternativePriceAriaLabel:"Alternatively at {alternativePrice}",strikethroughAriaLabel:"Regularly at {strikethroughPrice}"},Ml=ma("ConsonantTemplates/price"),Vl=/<\/?[^>]+(>|$)/g,G={container:"price",containerOptical:"price-optical",containerStrikethrough:"price-strikethrough",containerAnnual:"price-annual",containerAnnualPrefix:"price-annual-prefix",containerAnnualSuffix:"price-annual-suffix",disabled:"disabled",currencySpace:"price-currency-space",currencySymbol:"price-currency-symbol",decimals:"price-decimals",decimalsDelimiter:"price-decimals-delimiter",integer:"price-integer",recurrence:"price-recurrence",taxInclusivity:"price-tax-inclusivity",unitType:"price-unit-type"},Ge={perUnitLabel:"perUnitLabel",perUnitAriaLabel:"perUnitAriaLabel",recurrenceLabel:"recurrenceLabel",recurrenceAriaLabel:"recurrenceAriaLabel",taxExclusiveLabel:"taxExclusiveLabel",taxInclusiveLabel:"taxInclusiveLabel",strikethroughAriaLabel:"strikethroughAriaLabel"},$l="TAX_EXCLUSIVE",Hl=e=>ua(e)?Object.entries(e).filter(([,t])=>mt(t)||Cr(t)||t===!0).reduce((t,[r,n])=>t+` ${r}${n===!0?"":'="'+ha(n)+'"'}`,""):"",K=(e,t,r,n=!1)=>`<span class="${e}${t?"":" "+G.disabled}"${Hl(r)}>${n?Za(t):t??""}</span>`;function Ul(e,{accessibleLabel:t,currencySymbol:r,decimals:n,decimalsDelimiter:i,hasCurrencySpace:o,integer:a,isCurrencyFirst:s,recurrenceLabel:c,perUnitLabel:l,taxInclusivityLabel:h},d={}){let u=K(G.currencySymbol,r),m=K(G.currencySpace,o?"&nbsp;":""),g="";return s&&(g+=u+m),g+=K(G.integer,a),g+=K(G.decimalsDelimiter,i),g+=K(G.decimals,n),s||(g+=m+u),g+=K(G.recurrence,c,null,!0),g+=K(G.unitType,l,null,!0),g+=K(G.taxInclusivity,h,!0),K(e,g,{...d,"aria-label":t})}var W=({displayOptical:e=!1,displayStrikethrough:t=!1,displayAnnual:r=!1,instant:n=void 0}={})=>({country:i,displayFormatted:o=!0,displayRecurrence:a=!0,displayPerUnit:s=!1,displayTax:c=!1,language:l,literals:h={},quantity:d=1}={},{commitment:u,offerSelectorIds:m,formatString:g,price:f,priceWithoutDiscount:T,taxDisplay:L,taxTerm:b,term:S,usePrecision:I,promotion:R}={},U={})=>{Object.entries({country:i,formatString:g,language:l,price:f}).forEach(([ae,Zr])=>{if(Zr==null)throw new Error(`Argument "${ae}" is missing for osi ${m?.toString()}, country ${i}, language ${l}`)});let $={...Rl,...h},me=`${l.toLowerCase()}-${i.toUpperCase()}`;function Z(ae,Zr){let Jr=$[ae];if(Jr==null)return"";try{return new za(Jr.replace(Vl,""),me).format(Zr)}catch{return Ml.error("Failed to format literal:",Jr),""}}let Tt=t&&T?T:f,Xe=e?Qa:es;r&&(Xe=ts);let{accessiblePrice:wt,recurrenceTerm:pe,...fe}=Xe({commitment:u,formatString:g,instant:n,isIndianPrice:i==="IN",originalPrice:f,priceWithoutDiscount:T,price:e?f:Tt,promotion:R,quantity:d,term:S,usePrecision:I}),J=wt,Lt="";if(y(a)&&pe){let ae=Z(Ge.recurrenceAriaLabel,{recurrenceTerm:pe});ae&&(J+=" "+ae),Lt=Z(Ge.recurrenceLabel,{recurrenceTerm:pe})}let qr="";if(y(s)){qr=Z(Ge.perUnitLabel,{perUnit:"LICENSE"});let ae=Z(Ge.perUnitAriaLabel,{perUnit:"LICENSE"});ae&&(J+=" "+ae)}let _t="";y(c)&&b&&(_t=Z(L===$l?Ge.taxExclusiveLabel:Ge.taxInclusiveLabel,{taxTerm:b}),_t&&(J+=" "+_t)),t&&(J=Z(Ge.strikethroughAriaLabel,{strikethroughPrice:J}));let Ct=G.container;if(e&&(Ct+=" "+G.containerOptical),t&&(Ct+=" "+G.containerStrikethrough),r&&(Ct+=" "+G.containerAnnual),y(o))return Ul(Ct,{...fe,accessibleLabel:J,recurrenceLabel:Lt,perUnitLabel:qr,taxInclusivityLabel:_t},U);let{currencySymbol:ro,decimals:Os,decimalsDelimiter:Rs,hasCurrencySpace:no,integer:Ms,isCurrencyFirst:Vs}=fe,We=[Ms,Rs,Os];Vs?(We.unshift(no?"\xA0":""),We.unshift(ro)):(We.push(no?"\xA0":""),We.push(ro)),We.push(Lt,qr,_t);let $s=We.join("");return K(Ct,$s,U)},rs=()=>(e,t,r)=>{let i=(e.displayOldPrice===void 0||y(e.displayOldPrice))&&t.priceWithoutDiscount&&t.priceWithoutDiscount!=t.price;return`${W()(e,t,r)}${i?"&nbsp;"+W({displayStrikethrough:!0})(e,t,r):""}`},ns=()=>(e,t,r)=>{let{instant:n}=e;try{n||(n=new URLSearchParams(document.location.search).get("instant")),n&&(n=new Date(n))}catch{n=void 0}let i={...e,displayTax:!1,displayPerUnit:!1};return`${(e.displayOldPrice===void 0||y(e.displayOldPrice))&&t.priceWithoutDiscount&&t.priceWithoutDiscount!=t.price?W({displayStrikethrough:!0})(i,t,r)+"&nbsp;":""}${W()(e,t,r)}${K(G.containerAnnualPrefix,"&nbsp;(")}${W({displayAnnual:!0,instant:n})(i,t,r)}${K(G.containerAnnualSuffix,")")}`},is=()=>(e,t,r)=>{let n={...e,displayTax:!1,displayPerUnit:!1};return`${W()(e,t,r)}${K(G.containerAnnualPrefix,"&nbsp;(")}${W({displayAnnual:!0})(n,t,r)}${K(G.containerAnnualSuffix,")")}`};var Oi=W(),Ri=rs(),Mi=W({displayOptical:!0}),Vi=W({displayStrikethrough:!0}),$i=W({displayAnnual:!0}),Hi=is(),Ui=ns();var Dl=(e,t)=>{if(!(!ft(e)||!ft(t)))return Math.floor((t-e)/t*100)},os=()=>(e,t)=>{let{price:r,priceWithoutDiscount:n}=t,i=Dl(r,n);return i===void 0?'<span class="no-discount"></span>':`<span class="discount">${i}%</span>`};var Di=os();var{freeze:qt}=Object,re=qt({...He}),ne=qt({...Q}),ze={STAGE:"STAGE",PRODUCTION:"PRODUCTION",LOCAL:"LOCAL"},Bi=qt({...H}),Gi=qt({...fa}),zi=qt({...N});var as="mas-commerce-service";function ss(e,{once:t=!1}={}){let r=null;function n(){let i=document.querySelector(as);i!==r&&(r=i,i&&e(i))}return document.addEventListener(nt,n,{once:t}),Fe(n),()=>document.removeEventListener(nt,n)}function Zt(e,{country:t,forceTaxExclusive:r,perpetual:n}){let i;if(e.length<2)i=e;else{let o=t==="GB"||n?"EN":"MULT",[a,s]=e;i=[a.language===o?a:s]}return r&&(i=i.map(fi)),i}var Fe=e=>window.setTimeout(e);function vt(e,t=1){if(e==null)return[t];let r=(Array.isArray(e)?e:String(e).split(",")).map(xt).filter(ft);return r.length||(r=[t]),r}function Dr(e){return e==null?[]:(Array.isArray(e)?e:String(e).split(",")).filter(ci)}function q(){return document.getElementsByTagName(as)?.[0]}var Ke={clientId:"merch-at-scale",delimiter:"\xB6",ignoredProperties:["analytics","literals"],serializableTypes:["Array","Object"],sampleRate:1,tags:"acom",isProdDomain:!1},cs=1e3,ls=new Set;function Bl(e){return e instanceof Error||typeof e?.originatingRequest=="string"}function hs(e){if(e==null)return;let t=typeof e;if(t==="function")return e.name?`function ${e.name}`:"function";if(t==="object"){if(e instanceof Error)return e.message;if(typeof e.originatingRequest=="string"){let{message:n,originatingRequest:i,status:o}=e;return[n,o,i].filter(Boolean).join(" ")}let r=e[Symbol.toStringTag]??Object.getPrototypeOf(e).constructor.name;if(!Ke.serializableTypes.includes(r))return r}return e}function Gl(e,t){if(!Ke.ignoredProperties.includes(e))return hs(t)}var Fi={append(e){if(e.level!=="error")return;let{message:t,params:r}=e,n=[],i=[],o=t;r.forEach(l=>{l!=null&&(Bl(l)?n:i).push(l)}),n.length&&(o+=" "+n.map(hs).join(" "));let{pathname:a,search:s}=window.location,c=`${Ke.delimiter}page=${a}${s}`;c.length>cs&&(c=`${c.slice(0,cs)}<trunc>`),o+=c,i.length&&(o+=`${Ke.delimiter}facts=`,o+=JSON.stringify(i,Gl)),ls.has(o)||(ls.add(o),window.lana?.log(o,Ke))}};function At(e){Object.assign(Ke,Object.fromEntries(Object.entries(e).filter(([t,r])=>t in Ke&&r!==""&&r!==null&&r!==void 0&&!Number.isNaN(r))))}var w=Object.freeze({checkoutClientId:"adobe_com",checkoutWorkflow:re.V3,checkoutWorkflowStep:ne.EMAIL,country:"US",displayOldPrice:!0,displayPerUnit:!1,displayRecurrence:!0,displayTax:!1,env:ze.PRODUCTION,forceTaxExclusive:!1,language:"en",entitlement:!1,extraOptions:{},modal:!1,promotionCode:"",quantity:1,wcsApiKey:"wcms-commerce-ims-ro-user-milo",wcsBufferDelay:1,wcsURL:"https://www.adobe.com/web_commerce_artifact",landscape:Me.PUBLISHED,wcsBufferLimit:1});var Ki=Object.freeze({LOCAL:"local",PROD:"prod",STAGE:"stage"});function zl({locale:e=void 0,country:t=void 0,language:r=void 0}={}){return r??(r=e?.split("_")?.[0]||w.language),t??(t=e?.split("_")?.[1]||w.country),e??(e=`${r}_${t}`),{locale:e,country:t,language:r}}function ji(e={}){let{commerce:t={}}=e,r=ze.PRODUCTION,n=Fn,i=O("checkoutClientId",t)??w.checkoutClientId,o=Se(O("checkoutWorkflow",t),re,w.checkoutWorkflow),a=ne.CHECKOUT;o===re.V3&&(a=Se(O("checkoutWorkflowStep",t),ne,w.checkoutWorkflowStep));let s=y(O("displayOldPrice",t),w.displayOldPrice),c=y(O("displayPerUnit",t),w.displayPerUnit),l=y(O("displayRecurrence",t),w.displayRecurrence),h=y(O("displayTax",t),w.displayTax),d=y(O("entitlement",t),w.entitlement),u=y(O("modal",t),w.modal),m=y(O("forceTaxExclusive",t),w.forceTaxExclusive),g=O("promotionCode",t)??w.promotionCode,f=vt(O("quantity",t)),T=O("wcsApiKey",t)??w.wcsApiKey,L=t?.env==="stage",b=Me.PUBLISHED;["true",""].includes(t.allowOverride)&&(L=(O(Gn,t,{metadata:!1})?.toLowerCase()??t?.env)==="stage",b=Se(O(zn,t),Me,b)),L&&(r=ze.STAGE,n=Kn);let I=xt(O("wcsBufferDelay",t),w.wcsBufferDelay),R=xt(O("wcsBufferLimit",t),w.wcsBufferLimit);return{...zl(e),displayOldPrice:s,checkoutClientId:i,checkoutWorkflow:o,checkoutWorkflowStep:a,displayPerUnit:c,displayRecurrence:l,displayTax:h,entitlement:d,extraOptions:w.extraOptions,modal:u,env:r,forceTaxExclusive:m,promotionCode:g,quantity:f,wcsApiKey:T,wcsBufferDelay:I,wcsBufferLimit:R,wcsURL:n,landscape:b}}var Yi={DEBUG:"debug",ERROR:"error",INFO:"info",WARN:"warn"},Fl=Date.now(),Xi=new Set,Wi=new Set,ds=new Map,us={append({level:e,message:t,params:r,timestamp:n,source:i}){console[e](`${n}ms [${i}] %c${t}`,"font-weight: bold;",...r)}},ms={filter:({level:e})=>e!==Yi.DEBUG},Kl={filter:()=>!1};function jl(e,t,r,n,i){return{level:e,message:t,namespace:r,get params(){return n.length===1&&Gt(n[0])&&(n=n[0](),Array.isArray(n)||(n=[n])),n},source:i,timestamp:Date.now()-Fl}}function Yl(e){[...Wi].every(t=>t(e))&&Xi.forEach(t=>t(e))}function ps(e){let t=(ds.get(e)??0)+1;ds.set(e,t);let r=`${e} #${t}`,n={id:r,namespace:e,module:i=>ps(`${n.namespace}/${i}`),updateConfig:At};return Object.values(Yi).forEach(i=>{n[i]=(o,...a)=>Yl(jl(i,o,e,a,r))}),Object.seal(n)}function Br(...e){e.forEach(t=>{let{append:r,filter:n}=t;Gt(n)&&Wi.add(n),Gt(r)&&Xi.add(r)})}function Xl(e={}){let{name:t}=e,r=y(O("commerce.debug",{search:!0,storage:!0}),t===Ki.LOCAL);return Br(r?us:ms),t===Ki.PROD&&Br(Fi),Y}function Wl(){Xi.clear(),Wi.clear()}var Y={...ps(Bn),Level:Yi,Plugins:{consoleAppender:us,debugFilter:ms,quietFilter:Kl,lanaAppender:Fi},init:Xl,reset:Wl,use:Br};var ql={[ce]:Mn,[Ee]:Vn,[le]:$n},Zl={[ce]:Un,[le]:Dn},Et=class{constructor(t){p(this,"changes",new Map);p(this,"connected",!1);p(this,"dispose",pt);p(this,"error");p(this,"log");p(this,"options");p(this,"promises",[]);p(this,"state",Ee);p(this,"timer",null);p(this,"value");p(this,"version",0);p(this,"wrapperElement");this.wrapperElement=t}update(){[ce,Ee,le].forEach(t=>{this.wrapperElement.classList.toggle(ql[t],t===this.state)})}notify(){(this.state===le||this.state===ce)&&(this.state===le?this.promises.forEach(({resolve:t})=>t(this.wrapperElement)):this.state===ce&&this.promises.forEach(({reject:t})=>t(this.error)),this.promises=[]),this.wrapperElement.dispatchEvent(new CustomEvent(Zl[this.state],{bubbles:!0}))}attributeChangedCallback(t,r,n){this.changes.set(t,n),this.requestUpdate()}connectedCallback(){this.dispose=ss(()=>this.requestUpdate(!0))}disconnectedCallback(){this.connected&&(this.connected=!1,this.log?.debug("Disconnected:",{element:this.wrapperElement})),this.dispose(),this.dispose=pt}onceSettled(){let{error:t,promises:r,state:n}=this;return le===n?Promise.resolve(this.wrapperElement):ce===n?Promise.reject(t):new Promise((i,o)=>{r.push({resolve:i,reject:o})})}toggleResolved(t,r,n){return t!==this.version?!1:(n!==void 0&&(this.options=n),this.state=le,this.value=r,this.update(),this.log?.debug("Resolved:",{element:this.wrapperElement,value:r}),Fe(()=>this.notify()),!0)}toggleFailed(t,r,n){return t!==this.version?!1:(n!==void 0&&(this.options=n),this.error=r,this.state=ce,this.update(),this.log?.error("Failed:",{element:this.wrapperElement,error:r}),Fe(()=>this.notify()),!0)}togglePending(t){return this.version++,t&&(this.options=t),this.state=Ee,this.update(),this.log?.debug("Pending:",{osi:this.wrapperElement?.options?.wcsOsi}),this.version}requestUpdate(t=!1){if(!this.wrapperElement.isConnected||!q()||this.timer)return;let r=Y.module("mas-element"),{error:n,options:i,state:o,value:a,version:s}=this;this.state=Ee,this.timer=Fe(async()=>{this.timer=null;let c=null;if(this.changes.size&&(c=Object.fromEntries(this.changes.entries()),this.changes.clear()),this.connected?this.log?.debug("Updated:",{element:this.wrapperElement,changes:c}):(this.connected=!0,this.log?.debug("Connected:",{element:this.wrapperElement,changes:c})),c||t)try{await this.wrapperElement.render?.()===!1&&this.state===Ee&&this.version===s&&(this.state=o,this.error=n,this.value=a,this.update(),this.notify())}catch(l){r.error("Failed to render mas-element: ",l),this.toggleFailed(this.version,l,i)}})}};function fs(e={}){return Object.entries(e).forEach(([t,r])=>{(r==null||r===""||r?.length===0)&&delete e[t]}),e}function Gr(e,t={}){let{tag:r,is:n}=e,i=document.createElement(r,{is:n});return i.setAttribute("is",n),Object.assign(i.dataset,fs(t)),i}function zr(e,t={}){return e instanceof HTMLElement?(Object.assign(e.dataset,fs(t)),e):null}var Jl="download",Ql="upgrade";function Fr(e,t={},r=""){let n=q();if(!n)return null;let{checkoutMarketSegment:i,checkoutWorkflow:o,checkoutWorkflowStep:a,entitlement:s,upgrade:c,modal:l,perpetual:h,promotionCode:d,quantity:u,wcsOsi:m,extraOptions:g}=n.collectCheckoutOptions(t),f=Gr(e,{checkoutMarketSegment:i,checkoutWorkflow:o,checkoutWorkflowStep:a,entitlement:s,upgrade:c,modal:l,perpetual:h,promotionCode:d,quantity:u,wcsOsi:m,extraOptions:g});return r&&(f.innerHTML=`<span style="pointer-events: none;">${r}</span>`),f}function Kr(e){return class extends e{constructor(){super(...arguments);p(this,"checkoutActionHandler");p(this,"masElement",new Et(this))}attributeChangedCallback(n,i,o){this.masElement.attributeChangedCallback(n,i,o)}connectedCallback(){this.masElement.connectedCallback(),this.addEventListener("click",this.clickHandler)}disconnectedCallback(){this.masElement.disconnectedCallback(),this.removeEventListener("click",this.clickHandler)}onceSettled(){return this.masElement.onceSettled()}get value(){return this.masElement.value}get options(){return this.masElement.options}requestUpdate(n=!1){return this.masElement.requestUpdate(n)}static get observedAttributes(){return["data-checkout-workflow","data-checkout-workflow-step","data-extra-options","data-ims-country","data-perpetual","data-promotion-code","data-quantity","data-template","data-wcs-osi","data-entitlement","data-upgrade","data-modal"]}async render(n={}){if(!this.isConnected)return!1;let i=q();if(!i)return!1;this.dataset.imsCountry||i.imsCountryPromise.then(d=>{d&&(this.dataset.imsCountry=d)},pt),n.imsCountry=null;let o=i.collectCheckoutOptions(n,this);if(!o.wcsOsi.length)return!1;let a;try{a=JSON.parse(o.extraOptions??"{}")}catch(d){this.masElement.log?.error("cannot parse exta checkout options",d)}let s=this.masElement.togglePending(o);this.setCheckoutUrl("");let c=i.resolveOfferSelectors(o),l=await Promise.all(c);l=l.map(d=>Zt(d,o)),o.country=this.dataset.imsCountry||o.country;let h=await i.buildCheckoutAction?.(l.flat(),{...a,...o},this);return this.renderOffers(l.flat(),o,{},h,s)}renderOffers(n,i,o={},a=void 0,s=void 0){if(!this.isConnected)return!1;let c=q();if(!c)return!1;if(i={...JSON.parse(this.dataset.extraOptions??"null"),...i,...o},s??(s=this.masElement.togglePending(i)),this.checkoutActionHandler&&(this.checkoutActionHandler=void 0),a){this.classList.remove(Jl,Ql),this.masElement.toggleResolved(s,n,i);let{url:h,text:d,className:u,handler:m}=a;return h&&this.setCheckoutUrl(h),d&&(this.firstElementChild.innerHTML=d),u&&this.classList.add(...u.split(" ")),m&&(this.setCheckoutUrl("#"),this.checkoutActionHandler=m.bind(this)),!0}else if(n.length){if(this.masElement.toggleResolved(s,n,i)){let h=c.buildCheckoutURL(n,i);return this.setCheckoutUrl(h),!0}}else{let h=new Error(`Not provided: ${i?.wcsOsi??"-"}`);if(this.masElement.toggleFailed(s,h,i))return this.setCheckoutUrl("#"),!0}}setCheckoutUrl(){}clickHandler(n){}updateOptions(n={}){let i=q();if(!i)return!1;let{checkoutMarketSegment:o,checkoutWorkflow:a,checkoutWorkflowStep:s,entitlement:c,upgrade:l,modal:h,perpetual:d,promotionCode:u,quantity:m,wcsOsi:g}=i.collectCheckoutOptions(n);return zr(this,{checkoutMarketSegment:o,checkoutWorkflow:a,checkoutWorkflowStep:s,entitlement:c,upgrade:l,modal:h,perpetual:d,promotionCode:u,quantity:m,wcsOsi:g}),!0}}}var Jt=class Jt extends Kr(HTMLButtonElement){static createCheckoutButton(t={},r=""){return Fr(Jt,t,r)}setCheckoutUrl(t){this.setAttribute("data-href",t)}get href(){return this.getAttribute("data-href")}get isCheckoutButton(){return!0}clickHandler(t){if(this.checkoutActionHandler){this.checkoutActionHandler?.(t);return}this.href&&(window.location.href=this.href)}};p(Jt,"is","checkout-button"),p(Jt,"tag","button");var je=Jt;window.customElements.get(je.is)||window.customElements.define(je.is,je,{extends:je.tag});var eh="#000000",th="#F8D904",rh=/(accent|primary|secondary)(-(outline|link))?/,nh="mas:product_code/",ih="daa-ll",jr="daa-lh",oh=["XL","L","M","S"];function ah(e,t,r){e.mnemonicIcon?.map((i,o)=>({icon:i,alt:e.mnemonicAlt[o]??"",link:e.mnemonicLink[o]??""}))?.forEach(({icon:i,alt:o,link:a})=>{if(a&&!/^https?:/.test(a))try{a=new URL(`https://${a}`).href.toString()}catch{a="#"}let s={slot:"icons",src:i,loading:t.loading,size:r?.size??"l"};o&&(s.alt=o),a&&(s.href=a);let c=te("merch-icon",s);t.append(c)})}function sh(e,t){e.badge&&(t.setAttribute("badge-text",e.badge),t.setAttribute("badge-color",e.badgeColor||eh),t.setAttribute("badge-background-color",e.badgeBackgroundColor||th))}function ch(e,t,r){r?.includes(e.size)&&t.setAttribute("size",e.size)}function lh(e,t,r){if(e.cardTitle&&r){let n={slot:r.slot},i=e.cardTitle,{maxCount:o}=r;if(o){let[a,s]=gs(e.cardTitle,o);a!==e.cardTitle&&(n.title=s,i=`${a.trim()}...`)}t.append(te(r.tag,n,i))}}function hh(e,t,r){e.subtitle&&r&&t.append(te(r.tag,{slot:r.slot},e.subtitle))}function dh(e,t,r){r?.includes(e.backgroundColor)&&t.setAttribute("background-color",e.backgroundColor)}function uh(e,t,r){if(e.backgroundImage){let n={loading:t.loading??"lazy",src:e.backgroundImage};if(e.backgroundImageAltText?n.alt=e.backgroundImageAltText:n.role="none",!r)return;if(r?.attribute){t.setAttribute(r.attribute,e.backgroundImage);return}t.append(te(r.tag,{slot:r.slot},te("img",n)))}}function mh(e,t,r){if(e.prices&&r){let n=te(r.tag,{slot:r.slot},e.prices);t.append(n)}}function ph(e,t,r){if(e.description&&r){let n={slot:r.slot},i=e.description,{maxCount:o}=r;if(o){let[a,s]=gs(e.description,o);a!==e.description&&(n.title=s,i=`${a.trim()}...`)}t.append(te(r.tag,n,i))}}function gs(e,t){let r=fh(e);if(r.length<=t)return[e,r];let n=0,i=!1,o=t-3<1?1:t-3;for(let a of e){if(n++,a==="<"&&(i=!0),a===">"){i=!1;continue}if(!i&&(o--,o===0))break}return[e.substring(0,n),r]}function fh(e){let t="",r=!1;for(let n of e){if(n==="<"&&(r=!0),n===">"){r=!1;continue}r||(t+=n)}return t}function gh(e,t,r,n){let o=customElements.get("checkout-button").createCheckoutButton({},e.innerHTML);o.setAttribute("tabindex",0);for(let h of e.attributes)["class","is"].includes(h.name)||o.setAttribute(h.name,h.value);o.firstElementChild?.classList.add("spectrum-Button-label");let a=t.ctas.size??"M",s=`spectrum-Button--${n}`,c=oh.includes(a)?`spectrum-Button--size${a}`:"spectrum-Button--sizeM",l=["spectrum-Button",s,c];return r&&l.push("spectrum-Button--outline"),o.classList.add(...l),o}function xh(e,t,r,n){let i="fill";r&&(i="outline");let o=te("sp-button",{treatment:i,variant:n,tabIndex:0,size:t.ctas.size??"m"},e);return o.addEventListener("click",a=>{a.target!==e&&(a.stopPropagation(),e.click())}),o}function bh(e,t){return e.classList.add("con-button"),t&&e.classList.add("blue"),e}function vh(e,t,r,n){if(e.ctas){let{slot:i}=r.ctas,o=te("div",{slot:i},e.ctas),a=[...o.querySelectorAll("a")].map(s=>{let c=s.parentElement.tagName==="STRONG";if(t.consonant)return bh(s,c);let l=rh.exec(s.className)?.[0]??"accent",h=l.includes("accent"),d=l.includes("primary"),u=l.includes("secondary"),m=l.includes("-outline");if(l.includes("-link"))return s;let f;return h||c?f="accent":d?f="primary":u&&(f="secondary"),t.spectrum==="swc"?xh(s,r,m,f):gh(s,r,m,f)});o.innerHTML="",o.append(...a),t.append(o)}}function Ah(e,t){let{tags:r}=e,n=r?.find(i=>i.startsWith(nh))?.split("/").pop();n&&(t.setAttribute(jr,n),t.querySelectorAll("a[data-analytics-id],button[data-analytics-id]").forEach((i,o)=>{i.setAttribute(ih,`${i.dataset.analyticsId}-${o+1}`)}))}function Eh(e){e.spectrum==="css"&&[["primary-link","primary"],["secondary-link","secondary"]].forEach(([t,r])=>{e.querySelectorAll(`a.${t}`).forEach(n=>{n.classList.remove(t),n.classList.add("spectrum-Link",`spectrum-Link--${r}`)})})}async function xs(e,t){let{fields:r}=e,{variant:n}=r;if(!n)return;t.querySelectorAll("[slot]").forEach(o=>{o.remove()}),t.removeAttribute("background-image"),t.removeAttribute("background-color"),t.removeAttribute("badge-background-color"),t.removeAttribute("badge-color"),t.removeAttribute("badge-text"),t.removeAttribute("size"),t.classList.remove("wide-strip"),t.classList.remove("thin-strip"),t.removeAttribute(jr),t.variant=n,await t.updateComplete;let{aemFragmentMapping:i}=t.variantLayout;i&&(ah(r,t,i.mnemonics),sh(r,t),ch(r,t,i.size),lh(r,t,i.title),hh(r,t,i.subtitle),mh(r,t,i.prices),uh(r,t,i.backgroundImage),dh(r,t,i.allowedColors),ph(r,t,i.description),vh(r,t,i,n),Ah(r,t),Eh(t))}var Sh="merch-card",yh=":start",Th=":ready",wh=1e4,bs="merch-card:",er,qi,Qt=class extends ee{constructor(){super();F(this,er);p(this,"customerSegment");p(this,"marketSegment");p(this,"variantLayout");this.filters={},this.types="",this.selected=!1,this.spectrum="css",this.loading="lazy",this.handleAemFragmentEvents=this.handleAemFragmentEvents.bind(this)}static getFragmentMapping(r){return na[r]}firstUpdated(){this.variantLayout=Zn(this,!1),this.variantLayout?.connectedCallbackHook(),this.aemFragment?.updateComplete.catch(()=>{this.style.display="none"})}willUpdate(r){(r.has("variant")||!this.variantLayout)&&(this.variantLayout=Zn(this),this.variantLayout.connectedCallbackHook())}updated(r){(r.has("badgeBackgroundColor")||r.has("borderColor"))&&this.style.setProperty("--consonant-merch-card-border",this.computedBorderStyle),this.variantLayout?.postCardUpdateHook(r)}get theme(){return this.closest("sp-theme")}get dir(){return this.closest("[dir]")?.getAttribute("dir")??"ltr"}get prices(){return Array.from(this.querySelectorAll('span[is="inline-price"][data-wcs-osi]'))}render(){if(!(!this.isConnected||!this.variantLayout||this.style.display==="none"))return this.variantLayout.renderLayout()}get computedBorderStyle(){return["twp","ccd-slice","ccd-suggested"].includes(this.variant)?"":`1px solid ${this.borderColor?this.borderColor:this.badgeBackgroundColor}`}get badgeElement(){return this.shadowRoot.getElementById("badge")}get headingmMSlot(){return this.shadowRoot.querySelector('slot[name="heading-m"]').assignedElements()[0]}get footerSlot(){return this.shadowRoot.querySelector('slot[name="footer"]')?.assignedElements()[0]}get price(){return this.headingmMSlot?.querySelector('span[is="inline-price"]')}get checkoutLinks(){return[...this.footerSlot?.querySelectorAll('a[is="checkout-link"]')??[]]}async toggleStockOffer({target:r}){if(!this.stockOfferOsis)return;let n=this.checkoutLinks;if(n.length!==0)for(let i of n){await i.onceSettled();let o=i.value?.[0]?.planType;if(!o)return;let a=this.stockOfferOsis[o];if(!a)return;let s=i.dataset.wcsOsi.split(",").filter(c=>c!==a);r.checked&&s.push(a),i.dataset.wcsOsi=s.join(",")}}handleQuantitySelection(r){let n=this.checkoutLinks;for(let i of n)i.dataset.quantity=r.detail.option}get titleElement(){return this.querySelector(this.variantLayout?.headingSelector||".card-heading")}get title(){return this.titleElement?.textContent?.trim()}get description(){return this.querySelector('[slot="body-xs"]')?.textContent?.trim()}updateFilters(r){let n={...this.filters};Object.keys(n).forEach(i=>{if(r){n[i].order=Math.min(n[i].order||2,2);return}let o=n[i].order;o===1||isNaN(o)||(n[i].order=Number(o)+1)}),this.filters=n}includes(r){return this.textContent.match(new RegExp(r,"i"))!==null}connectedCallback(){super.connectedCallback();let r=this.querySelector("aem-fragment")?.getAttribute("fragment");performance.mark(`${bs}${r}${yh}`),this.addEventListener(Er,this.handleQuantitySelection),this.addEventListener(kn,this.merchCardReady,{once:!0}),this.updateComplete.then(()=>{this.merchCardReady()}),this.storageOptions?.addEventListener("change",this.handleStorageChange),this.addEventListener(Re,this.handleAemFragmentEvents),this.addEventListener(Oe,this.handleAemFragmentEvents),this.aemFragment||setTimeout(()=>this.checkReady(),0)}disconnectedCallback(){super.disconnectedCallback(),this.variantLayout?.disconnectedCallbackHook(),this.removeEventListener(Er,this.handleQuantitySelection),this.storageOptions?.removeEventListener(Ar,this.handleStorageChange),this.removeEventListener(Re,this.handleAemFragmentEvents),this.removeEventListener(Oe,this.handleAemFragmentEvents)}async handleAemFragmentEvents(r){if(r.type===Re&&ge(this,er,qi).call(this,"AEM fragment cannot be loaded"),r.type===Oe&&r.target.nodeName==="AEM-FRAGMENT"){let n=r.detail;await xs(n,this),this.checkReady()}}async checkReady(){let r=Promise.all([...this.querySelectorAll('span[is="inline-price"][data-wcs-osi],a[is="checkout-link"][data-wcs-osi]')].map(o=>o.onceSettled().catch(()=>o))).then(o=>o.every(a=>a.classList.contains("placeholder-resolved"))),n=new Promise(o=>setTimeout(()=>o(!1),wh));if(await Promise.race([r,n])===!0){performance.mark(`${bs}${this.id}${Th}`),this.dispatchEvent(new CustomEvent(On,{bubbles:!0,composed:!0}));return}ge(this,er,qi).call(this,"Contains unresolved offers")}get aemFragment(){return this.querySelector("aem-fragment")}get storageOptions(){return this.querySelector("sp-radio-group#storage")}get storageSpecificOfferSelect(){let r=this.storageOptions?.selected;if(r){let n=this.querySelector(`merch-offer-select[storage="${r}"]`);if(n)return n}return this.querySelector("merch-offer-select")}get offerSelect(){return this.storageOptions?this.storageSpecificOfferSelect:this.querySelector("merch-offer-select")}get quantitySelect(){return this.querySelector("merch-quantity-select")}displayFooterElementsInColumn(){if(!this.classList.contains("product"))return;let r=this.shadowRoot.querySelector(".secure-transaction-label");(this.footerSlot?.querySelectorAll('a[is="checkout-link"].con-button')).length===2&&r&&r.parentElement.classList.add("footer-column")}merchCardReady(){this.offerSelect&&!this.offerSelect.planType||(this.dispatchEvent(new CustomEvent(In,{bubbles:!0})),this.displayFooterElementsInColumn())}handleStorageChange(){let r=this.closest("merch-card")?.offerSelect.cloneNode(!0);r&&this.dispatchEvent(new CustomEvent(Ar,{detail:{offerSelect:r},bubbles:!0}))}get dynamicPrice(){return this.querySelector('[slot="price"]')}selectMerchOffer(r){if(r===this.merchOffer)return;this.merchOffer=r;let n=this.dynamicPrice;if(r.price&&n){let i=r.price.cloneNode(!0);n.onceSettled?n.onceSettled().then(()=>{n.replaceWith(i)}):n.replaceWith(i)}}};er=new WeakSet,qi=function(r){this.dispatchEvent(new CustomEvent(Rn,{detail:r,bubbles:!0,composed:!0}))},p(Qt,"properties",{name:{type:String,attribute:"name",reflect:!0},variant:{type:String,reflect:!0},size:{type:String,attribute:"size",reflect:!0},badgeColor:{type:String,attribute:"badge-color",reflect:!0},borderColor:{type:String,attribute:"border-color",reflect:!0},badgeBackgroundColor:{type:String,attribute:"badge-background-color",reflect:!0},backgroundImage:{type:String,attribute:"background-image",reflect:!0},badgeText:{type:String,attribute:"badge-text"},actionMenu:{type:Boolean,attribute:"action-menu"},customHr:{type:Boolean,attribute:"custom-hr"},consonant:{type:Boolean,attribute:"consonant"},spectrum:{type:String,attribute:"spectrum"},detailBg:{type:String,attribute:"detail-bg"},secureLabel:{type:String,attribute:"secure-label"},checkboxLabel:{type:String,attribute:"checkbox-label"},selected:{type:Boolean,attribute:"aria-selected",reflect:!0},storageOption:{type:String,attribute:"storage",reflect:!0},stockOfferOsis:{type:Object,attribute:"stock-offer-osis",converter:{fromAttribute:r=>{let[n,i,o]=r.split(",");return{PUF:n,ABM:i,M2M:o}}}},filters:{type:String,reflect:!0,converter:{fromAttribute:r=>Object.fromEntries(r.split(",").map(n=>{let[i,o,a]=n.split(":"),s=Number(o);return[i,{order:isNaN(s)?void 0:s,size:a}]})),toAttribute:r=>Object.entries(r).map(([n,{order:i,size:o}])=>[n,i,o].filter(a=>a!=null).join(":")).join(",")}},types:{type:String,attribute:"types",reflect:!0},merchOffer:{type:Object},analyticsId:{type:String,attribute:jr,reflect:!0},loading:{type:String}}),p(Qt,"styles",[Go,ia(),...zo()]);customElements.define(Sh,Qt);var St=class extends ee{constructor(){super(),this.size="m",this.alt="",this.loading="lazy"}render(){let{href:t}=this;return t?x`<a href="${t}">
                  <img src="${this.src}" alt="${this.alt}" loading="${this.loading}" />
              </a>`:x` <img src="${this.src}" alt="${this.alt}" loading="${this.loading}" />`}};p(St,"properties",{size:{type:String,attribute:!0},src:{type:String,attribute:!0},alt:{type:String,attribute:!0},href:{type:String,attribute:!0},loading:{type:String,attribute:!0}}),p(St,"styles",C`
        :host {
            --img-width: 32px;
            --img-height: 32px;
            display: block;
            width: var(--mod-img-width, var(--img-width));
            height: var(--mod-img-height, var(--img-height));
        }

        :host([size='s']) {
            --img-width: 24px;
            --img-height: 24px;
        }

        :host([size='m']) {
            --img-width: 30px;
            --img-height: 30px;
        }

        :host([size='l']) {
            --img-width: 40px;
            --img-height: 40px;
        }

        img {
            width: var(--mod-img-width, var(--img-width));
            height: var(--mod-img-height, var(--img-height));
        }
    `);customElements.define("merch-icon",St);var Ss=new CSSStyleSheet;Ss.replaceSync(":host { display: contents; }");var Lh=document.querySelector('meta[name="aem-base-url"]')?.content??"https://odin.adobe.com",vs="fragment",As="author",_h="ims",Es=e=>{throw new Error(`Failed to get fragment: ${e}`)};async function Ch(e,t,r,n){let i=r?`${e}/adobe/sites/cf/fragments/${t}`:`${e}/adobe/sites/fragments/${t}`,o=await fetch(i,{cache:"default",credentials:"omit",headers:n}).catch(a=>Es(a.message));return o?.ok||Es(`${o.status} ${o.statusText}`),o.json()}var Zi,ye,Ji=class{constructor(){F(this,ye,new Map)}clear(){_(this,ye).clear()}add(...t){t.forEach(r=>{let{id:n}=r;n&&_(this,ye).set(n,r)})}has(t){return _(this,ye).has(t)}get(t){return _(this,ye).get(t)}remove(t){_(this,ye).delete(t)}};ye=new WeakMap;var Yr=new Ji,Ye,he,Te,tr,de,yt,ue,eo,ys,Ts,Qi=class extends HTMLElement{constructor(){super();F(this,ue);p(this,"cache",Yr);F(this,Ye);F(this,he);F(this,Te);F(this,tr,!1);F(this,de);F(this,yt,!1);this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[Ss];let r=this.getAttribute(_h);["",!0,"true"].includes(r)&&(j(this,tr,!0),Zi||(Zi={Authorization:`Bearer ${window.adobeid?.authorize?.()}`}))}static get observedAttributes(){return[vs,As]}attributeChangedCallback(r,n,i){r===vs&&(j(this,Te,i),this.refresh(!1)),r===As&&j(this,yt,["","true"].includes(i))}connectedCallback(){if(!_(this,Te)){ge(this,ue,eo).call(this,"Missing fragment id");return}}async refresh(r=!0){_(this,de)&&!await Promise.race([_(this,de),Promise.resolve(!1)])||(r&&Yr.remove(_(this,Te)),j(this,de,this.fetchData().then(()=>(this.dispatchEvent(new CustomEvent(Oe,{detail:this.data,bubbles:!0,composed:!0})),!0)).catch(n=>(ge(this,ue,eo).call(this,"Network error: failed to load fragment"),j(this,de,null),!1))),_(this,de))}async fetchData(){j(this,Ye,null),j(this,he,null);let r=Yr.get(_(this,Te));r||(r=await Ch(Lh,_(this,Te),_(this,yt),_(this,tr)?Zi:void 0),Yr.add(r)),j(this,Ye,r)}get updateComplete(){return _(this,de)??Promise.reject(new Error("AEM fragment cannot be loaded"))}get data(){return _(this,he)?_(this,he):(_(this,yt)?ge(this,ue,ys).call(this):ge(this,ue,Ts).call(this),_(this,he))}};Ye=new WeakMap,he=new WeakMap,Te=new WeakMap,tr=new WeakMap,de=new WeakMap,yt=new WeakMap,ue=new WeakSet,eo=function(r){this.classList.add("error"),this.dispatchEvent(new CustomEvent(Re,{detail:r,bubbles:!0,composed:!0}))},ys=function(){let{fields:r,id:n,tags:i}=_(this,Ye);j(this,he,r.reduce((o,{name:a,multiple:s,values:c})=>(o.fields[a]=s?c:c[0],o),{fields:{},id:n,tags:i}))},Ts=function(){let{fields:r,id:n,tags:i}=_(this,Ye);j(this,he,Object.entries(r).reduce((o,[a,s])=>(o.fields[a]=s?.mimeType?s.value:s??"",o),{fields:{},id:n,tags:i}))};customElements.define("aem-fragment",Qi);var rr=class rr extends Kr(HTMLAnchorElement){static createCheckoutLink(t={},r=""){return Fr(rr,t,r)}setCheckoutUrl(t){this.setAttribute("href",t)}get isCheckoutLink(){return!0}clickHandler(t){if(this.checkoutActionHandler){this.checkoutActionHandler?.(t);return}}};p(rr,"is","checkout-link"),p(rr,"tag","a");var ie=rr;window.customElements.get(ie.is)||window.customElements.define(ie.is,ie,{extends:ie.tag});function ws({providers:e,settings:t}){function r(o,a){let{checkoutClientId:s,checkoutWorkflow:c,checkoutWorkflowStep:l,country:h,language:d,promotionCode:u,quantity:m}=t,{checkoutMarketSegment:g,checkoutWorkflow:f=c,checkoutWorkflowStep:T=l,imsCountry:L,country:b=L??h,language:S=d,quantity:I=m,entitlement:R,upgrade:U,modal:$,perpetual:me,promotionCode:Z=u,wcsOsi:Tt,extraOptions:Xe,...wt}=Object.assign({},a?.dataset??{},o??{}),pe=Se(f,re,w.checkoutWorkflow),fe=ne.CHECKOUT;pe===re.V3&&(fe=Se(T,ne,w.checkoutWorkflowStep));let J=gt({...wt,extraOptions:Xe,checkoutClientId:s,checkoutMarketSegment:g,country:b,quantity:vt(I,w.quantity),checkoutWorkflow:pe,checkoutWorkflowStep:fe,language:S,entitlement:y(R),upgrade:y(U),modal:y($),perpetual:y(me),promotionCode:zt(Z).effectivePromoCode,wcsOsi:Dr(Tt)});if(a)for(let Lt of e.checkout)Lt(a,J);return J}function n(o,a){if(!Array.isArray(o)||!o.length||!a)return"";let{env:s,landscape:c}=t,{checkoutClientId:l,checkoutMarketSegment:h,checkoutWorkflow:d,checkoutWorkflowStep:u,country:m,promotionCode:g,quantity:f,...T}=r(a),L=window.frameElement?"if":"fp",b={checkoutPromoCode:g,clientId:l,context:L,country:m,env:s,items:[],marketSegment:h,workflowStep:u,landscape:c,...T};if(o.length===1){let[{offerId:S,offerType:I,productArrangementCode:R}]=o,{marketSegments:[U]}=o[0];Object.assign(b,{marketSegment:U,offerType:I,productArrangementCode:R}),b.items.push(f[0]===1?{id:S}:{id:S,quantity:f[0]})}else b.items.push(...o.map(({offerId:S},I)=>({id:S,quantity:f[I]??w.quantity})));return ri(d,b)}let{createCheckoutLink:i}=ie;return{CheckoutLink:ie,CheckoutWorkflow:re,CheckoutWorkflowStep:ne,buildCheckoutURL:n,collectCheckoutOptions:r,createCheckoutLink:i}}function Ph({interval:e=200,maxAttempts:t=25}={}){let r=Y.module("ims");return new Promise(n=>{r.debug("Waing for IMS to be ready");let i=0;function o(){window.adobeIMS?.initialized?n():++i>t?(r.debug("Timeout"),n()):setTimeout(o,e)}o()})}function kh(e){return e.then(()=>window.adobeIMS?.isSignedInUser()??!1)}function Ih(e){let t=Y.module("ims");return e.then(r=>r?window.adobeIMS.getProfile().then(({countryCode:n})=>(t.debug("Got user country:",n),n),n=>{t.error("Unable to get user country:",n)}):null)}function Ls({}){let e=Ph(),t=kh(e),r=Ih(t);return{imsReadyPromise:e,imsSignedInPromise:t,imsCountryPromise:r}}async function Cs(e,t){let{data:r}=t||await Promise.resolve().then(()=>Ys(_s(),1));if(Array.isArray(r)){let n=o=>r.find(a=>_r(a.lang,o)),i=n(e.language)??n(w.language);if(i)return Object.freeze(i)}return{}}var Ps=["GB_en","AU_en","FR_fr","AT_de","BE_en","BE_fr","BE_nl","BG_bg","CH_de","CH_fr","CH_it","CZ_cs","DE_de","DK_da","EE_et","EG_ar","EG_en","ES_es","FI_fi","FR_fr","GR_el","GR_en","HU_hu","IE_en","IT_it","LU_de","LU_en","LU_fr","NL_nl","NO_nb","PL_pl","PT_pt","RO_ro","SE_sv","SI_sl","SK_sk","TR_tr","UA_uk","ID_en","ID_in","IN_en","IN_hi","JP_ja","MY_en","MY_ms","NZ_en","TH_en","TH_th"],Oh={INDIVIDUAL_COM:["ZA_en","LT_lt","LV_lv","NG_en","SA_ar","SA_en","ZA_en","SG_en","KR_ko"],TEAM_COM:["ZA_en","LT_lt","LV_lv","NG_en","ZA_en","CO_es","KR_ko"],INDIVIDUAL_EDU:["LT_lt","LV_lv","SA_en","SG_en"],TEAM_EDU:["SG_en","KR_ko"]},nr=class nr extends HTMLSpanElement{constructor(){super();p(this,"masElement",new Et(this));this.handleClick=this.handleClick.bind(this)}static get observedAttributes(){return["data-display-old-price","data-display-per-unit","data-display-recurrence","data-display-tax","data-perpetual","data-promotion-code","data-tax-exclusive","data-template","data-wcs-osi"]}static createInlinePrice(r){let n=q();if(!n)return null;let{displayOldPrice:i,displayPerUnit:o,displayRecurrence:a,displayTax:s,forceTaxExclusive:c,perpetual:l,promotionCode:h,quantity:d,template:u,wcsOsi:m}=n.collectPriceOptions(r);return Gr(nr,{displayOldPrice:i,displayPerUnit:o,displayRecurrence:a,displayTax:s,forceTaxExclusive:c,perpetual:l,promotionCode:h,quantity:d,template:u,wcsOsi:m})}get isInlinePrice(){return!0}attributeChangedCallback(r,n,i){this.masElement.attributeChangedCallback(r,n,i)}connectedCallback(){this.masElement.connectedCallback(),this.addEventListener("click",this.handleClick)}disconnectedCallback(){this.masElement.disconnectedCallback(),this.removeEventListener("click",this.handleClick)}handleClick(r){r.target!==this&&(r.stopImmediatePropagation(),this.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window})))}onceSettled(){return this.masElement.onceSettled()}get value(){return this.masElement.value}get options(){return this.masElement.options}requestUpdate(r=!1){return this.masElement.requestUpdate(r)}resolveDisplayTaxForGeoAndSegment(r,n,i,o){let a=`${r}_${n}`;if(Ps.includes(r)||Ps.includes(a))return!0;let s=Oh[`${i}_${o}`];return s?!!(s.includes(r)||s.includes(a)):!1}async resolveDisplayTax(r,n){let[i]=await r.resolveOfferSelectors(n),o=Zt(await i,n);if(o?.length){let{country:a,language:s}=n,c=o[0],[l=""]=c.marketSegments;return this.resolveDisplayTaxForGeoAndSegment(a,s,c.customerSegment,l)}}async render(r={}){if(!this.isConnected)return!1;let n=q();if(!n)return!1;let i=n.collectPriceOptions(r,this);if(!i.wcsOsi.length)return!1;let o=this.masElement.togglePending(i);this.innerHTML="";let[a]=n.resolveOfferSelectors(i);return this.renderOffers(Zt(await a,i),i,o)}renderOffers(r,n={},i=void 0){if(!this.isConnected)return;let o=q();if(!o)return!1;let a=o.collectPriceOptions({...this.dataset,...n},this);if(i??(i=this.masElement.togglePending(a)),r.length){if(this.masElement.toggleResolved(i,r,a))return this.innerHTML=o.buildPriceHTML(r,a),!0}else{let s=new Error(`Not provided: ${a?.wcsOsi??"-"}`);if(this.masElement.toggleFailed(i,s,a))return this.innerHTML="",!0}return!1}updateOptions(r){let n=q();if(!n)return!1;let{displayOldPrice:i,displayPerUnit:o,displayRecurrence:a,displayTax:s,forceTaxExclusive:c,perpetual:l,promotionCode:h,quantity:d,template:u,wcsOsi:m}=n.collectPriceOptions(r);return zr(this,{displayOldPrice:i,displayPerUnit:o,displayRecurrence:a,displayTax:s,forceTaxExclusive:c,perpetual:l,promotionCode:h,quantity:d,template:u,wcsOsi:m}),!0}};p(nr,"is","inline-price"),p(nr,"tag","span");var oe=nr;window.customElements.get(oe.is)||window.customElements.define(oe.is,oe,{extends:oe.tag});function ks({literals:e,providers:t,settings:r}){function n(a,s){let{country:c,displayOldPrice:l,displayPerUnit:h,displayRecurrence:d,displayTax:u,forceTaxExclusive:m,language:g,promotionCode:f,quantity:T}=r,{displayOldPrice:L=l,displayPerUnit:b=h,displayRecurrence:S=d,displayTax:I=u,forceTaxExclusive:R=m,country:U=c,language:$=g,perpetual:me,promotionCode:Z=f,quantity:Tt=T,template:Xe,wcsOsi:wt,...pe}=Object.assign({},s?.dataset??{},a??{}),fe=gt({...pe,country:U,displayOldPrice:y(L),displayPerUnit:y(b),displayRecurrence:y(S),displayTax:y(I),forceTaxExclusive:y(R),language:$,perpetual:y(me),promotionCode:zt(Z).effectivePromoCode,quantity:vt(Tt,w.quantity),template:Xe,wcsOsi:Dr(wt)});if(s)for(let J of t.price)J(s,fe);return fe}function i(a,s){if(!Array.isArray(a)||!a.length||!s)return"";let{template:c}=s,l;switch(c){case"discount":l=Di;break;case"strikethrough":l=Vi;break;case"optical":l=Mi;break;case"annual":l=$i;break;default:s.country==="AU"&&a[0].planType==="ABM"?l=s.promotionCode?Ui:Hi:l=s.promotionCode?Ri:Oi}let h=n(s);h.literals=Object.assign({},e.price,gt(s.literals??{}));let[d]=a;return d={...d,...d.priceDetails},l(h,d)}let o=oe.createInlinePrice;return{InlinePrice:oe,buildPriceHTML:i,collectPriceOptions:n,createInlinePrice:o}}function Is({settings:e}){let t=Y.module("wcs"),{env:r,wcsApiKey:n}=e,i=new Map,o=new Map,a;async function s(d,u,m=!0){let g=Hn;t.debug("Fetching:",d);let f="",T,L=(b,S,I)=>`${b}: ${S?.status}, url: ${I.toString()}`;try{if(d.offerSelectorIds=d.offerSelectorIds.sort(),f=new URL(e.wcsURL),f.searchParams.set("offer_selector_ids",d.offerSelectorIds.join(",")),f.searchParams.set("country",d.country),f.searchParams.set("locale",d.locale),f.searchParams.set("landscape",r===ze.STAGE?"ALL":e.landscape),f.searchParams.set("api_key",n),d.language&&f.searchParams.set("language",d.language),d.promotionCode&&f.searchParams.set("promotion_code",d.promotionCode),d.currency&&f.searchParams.set("currency",d.currency),T=await fetch(f.toString(),{credentials:"omit"}),T.ok){let b=await T.json();t.debug("Fetched:",d,b);let S=b.resolvedOffers??[];S=S.map(kr),u.forEach(({resolve:I},R)=>{let U=S.filter(({offerSelectorIds:$})=>$.includes(R)).flat();U.length&&(u.delete(R),I(U))})}else T.status===404&&d.offerSelectorIds.length>1?(t.debug("Multi-osi 404, fallback to fetch-by-one strategy"),await Promise.allSettled(d.offerSelectorIds.map(b=>s({...d,offerSelectorIds:[b]},u,!1)))):g=Sr}catch(b){g=Sr,t.error(g,d,b)}m&&u.size&&(t.debug("Missing:",{offerSelectorIds:[...u.keys()]}),u.forEach(b=>{b.reject(new Error(L(g,T,f)))}))}function c(){clearTimeout(a);let d=[...o.values()];o.clear(),d.forEach(({options:u,promises:m})=>s(u,m))}function l(){let d=i.size;i.clear(),t.debug(`Flushed ${d} cache entries`)}function h({country:d,language:u,perpetual:m=!1,promotionCode:g="",wcsOsi:f=[]}){let T=`${u}_${d}`;d!=="GB"&&(u=m?"EN":"MULT");let L=[d,u,g].filter(b=>b).join("-").toLowerCase();return f.map(b=>{let S=`${b}-${L}`;if(!i.has(S)){let I=new Promise((R,U)=>{let $=o.get(L);if(!$){let me={country:d,locale:T,offerSelectorIds:[]};d!=="GB"&&(me.language=u),$={options:me,promises:new Map},o.set(L,$)}g&&($.options.promotionCode=g),$.options.offerSelectorIds.push(b),$.promises.set(b,{resolve:R,reject:U}),$.options.offerSelectorIds.length>=e.wcsBufferLimit?c():(t.debug("Queued:",$.options),a||(a=setTimeout(c,e.wcsBufferDelay)))});i.set(S,I)}return i.get(S)})}return{WcsCommitment:Bi,WcsPlanType:Gi,WcsTerm:zi,resolveOfferSelectors:h,flushWcsCache:l}}var to="mas-commerce-service",Rh="mas:start",Mh="mas:ready",Wr,Ns,Xr=class extends HTMLElement{constructor(){super(...arguments);F(this,Wr);p(this,"promise",null)}async registerCheckoutAction(r){typeof r=="function"&&(this.buildCheckoutAction=async(n,i,o)=>{let a=await r?.(n,i,this.imsSignedInPromise,o);return a||null})}async activate(){let r=_(this,Wr,Ns),n=Object.freeze(ji(r));At(r.lana);let i=Y.init(r.hostEnv).module("service");i.debug("Activating:",r);let o={price:{}};try{o.price=await Cs(n,r.commerce.priceLiterals)}catch{}let a={checkout:new Set,price:new Set},s={literals:o,providers:a,settings:n};Object.defineProperties(this,Object.getOwnPropertyDescriptors({...ws(s),...Ls(s),...ks(s),...Is(s),...jn,Log:Y,get defaults(){return w},get log(){return Y},get providers(){return{checkout(c){return a.checkout.add(c),()=>a.checkout.delete(c)},price(c){return a.price.add(c),()=>a.price.delete(c)}}},get settings(){return n}})),i.debug("Activated:",{literals:o,settings:n}),Fe(()=>{let c=new CustomEvent(nt,{bubbles:!0,cancelable:!1,detail:this});performance.mark(Mh),this.dispatchEvent(c)})}connectedCallback(){this.readyPromise||(performance.mark(Rh),this.readyPromise=this.activate())}disconnectedCallback(){this.readyPromise=null}flushWcsCache(){this.flushWcsCache(),this.log.debug("Flushed WCS cache")}refreshOffers(){this.flushWcsCache(),document.querySelectorAll('span[is="inline-price"],a[is="checkout-link"]').forEach(r=>r.requestUpdate(!0)),this.log.debug("Refreshed WCS offers")}refreshFragments(){this.flushWcsCache(),document.querySelectorAll("aem-fragment").forEach(r=>r.refresh()),this.log.debug("Refreshed AEM fragments")}};Wr=new WeakSet,Ns=function(){let r={hostEnv:{name:this.getAttribute("host-env")??"prod"},commerce:{env:this.getAttribute("env")},lana:{tags:this.getAttribute("lana-tags"),sampleRate:parseInt(this.getAttribute("lana-sample-rate"),10),isProdDomain:this.getAttribute("host-env")==="prod"}};return["locale","country","language"].forEach(n=>{let i=this.getAttribute(n);i&&(r[n]=i)}),["checkout-workflow-step","force-tax-exclusive","checkout-client-id","allow-override","wcs-api-key"].forEach(n=>{let i=this.getAttribute(n);if(i!=null){let o=n.replace(/-([a-z])/g,a=>a[1].toUpperCase());r.commerce[o]=i}}),r},p(Xr,"instance");window.customElements.get(to)||window.customElements.define(to,Xr);At({sampleRate:1});export{je as CheckoutButton,ie as CheckoutLink,re as CheckoutWorkflow,ne as CheckoutWorkflowStep,w as Defaults,oe as InlinePrice,Me as Landscape,Y as Log,to as TAG_NAME_SERVICE,Bi as WcsCommitment,Gi as WcsPlanType,zi as WcsTerm,kr as applyPlanType,ji as getSettings};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
