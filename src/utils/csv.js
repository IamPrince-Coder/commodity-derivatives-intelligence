const norm=s=>String(s??'').trim().toLowerCase().replace(/[\s_-]+/g,'');
export function parseCsv(text){
 const lines=text.replace(/^\uFEFF/,'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
 if(lines.length<2)throw Error('CSV needs a header and at least one data row.');
 const h=lines[0].split(',').map(norm), ix=(...names)=>h.findIndex(x=>names.includes(x));
 const c={date:ix('date','tradedate','businessdate'),symbol:ix('symbol','instrument','contract','tradingsymbol'),close:ix('close','closeprice','settlementprice','settleprice','ltp'),volume:ix('volume','tradedqty','totaltradedquantity','qty'),oi:ix('oi','openinterest','openint'),expiry:ix('expiry','expirydate','contractexpiry')};
 if(c.date<0||c.symbol<0||c.close<0)throw Error('Required columns: Date, Symbol, Close. Optional: Volume, OpenInterest, Expiry.');
 const dateFix=s=>{s=String(s||'').trim();if(/^\d{4}-\d{2}-\d{2}$/.test(s))return s;const m=s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);return m?`${m[3]}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}`:s};
 return lines.slice(1).map((line,i)=>{const a=line.split(',').map(x=>x.trim().replace(/^"|"$/g,'')), num=j=>j<0?0:(Number(String(a[j]||'').replace(/,/g,''))||0),r={date:dateFix(a[c.date]),symbol:String(a[c.symbol]||'').toUpperCase(),close:num(c.close),volume:num(c.volume),oi:num(c.oi),expiry:c.expiry<0?'':dateFix(a[c.expiry])};if(!r.date||!r.symbol||r.close<=0)throw Error(`Invalid date, symbol, or close on CSV row ${i+2}.`);return r});
}
export function downloadTemplate(){const blob=new Blob(['Date,Symbol,Close,Volume,OpenInterest,Expiry\n2026-10-01,GOLDM,126420,1824,6240,2026-10-05\n'],{type:'text/csv'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='commodity-data-template.csv';a.click();URL.revokeObjectURL(url)}
