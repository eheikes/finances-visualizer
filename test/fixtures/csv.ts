export const numTransactions = 5
export const accountName = 'Joint Checking'

interface CategoryInfo {

}
export const splitIndex = 3 // index of the split-category transaction
export const splitCategories: [string, number][] = [
  ['Food & Dining:Groceries', -42.50],
  ['Home:Furnishings', -19.99],
  ['Personal Care', -38.87]
]

export const sampleCsv = `
Register Report - All Dates,,,,,,,,,
,,,,,,,,,



1/11/2015 through 3/29/2018,,,,,,,,,
,,,,,,,,,
,Date,Account,Num,Description,Memo,Category,Tag,Clr,Amount
,,,,,,,,,
,,,,,,,,,
,BALANCE 1/10/2015,,,,,,,,0.00
,1/11/2015,Joint Checking,,Opening Balance,,[Joint Checking],,R,"5,000.00"
,1/12/2015,Joint Checking,ATM,Namaste India,ATM NAMASTE INDIA INC           CLIVE           IA ON 150111##43,Food & Dining:Groceries,,R,-20.00
,1/12/2015,Joint Checking,ATM,Costco,ATM 889074         COSTCO WHSE  #07   WEST DES MOINIA      ##442,Food & Dining:Groceries,,c,-130.00
,1/12/2015,Joint Checking,ATM,ATM Rai Ia,ATM RAI*IA ST PARK RESERV       866-876-0000    CA ON 150112##44,Cash & ATM,,c,-200.00
,1/11/2016,Joint Checking,ATM         S,Costco,,Food & Dining:Groceries,,R,-42.50
,,,,,,Home:Furnishings,,R,-19.99
,,,,,,Personal Care,,R,-38.87
,3/29/2018,Joint Checking,,PGE,,Bills & Utilities:Gas & Electric,,,-100.00
,1/11/2015 - 3/29/2018,,,,,,,,"10,000.00"
,,,,,,,,,
,BALANCE 3/29/2018,,,,,,,,"10,000.00"
,,,,,,,,,
,TOTAL INFLOWS,,,,,,,,"100,000.00"
,,,,,,,,,
,TOTAL OUTFLOWS,,,,,,,,"-90,000.00"
,,,,,,,,,
,NET TOTAL,,,,,,,,"10,000.00"
`.trim()
