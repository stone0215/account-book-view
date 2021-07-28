export const yesNo = [
  { key: 'Y', value: '是' },
  { key: 'N', value: '否' }
]

export const assetType = [
  { key: 'Account', value: '銀行帳戶' },
  { key: 'CreditCard', value: '信用卡' },
  { key: 'Money', value: '現金' },
  { key: 'Loan', value: '貸款' }
]

export const otherAssetType = [
  { key: 'Stock', value: '股票' },
  { key: 'Insurance', value: '保險' },
  { key: 'Estate', value: '房地產' }
]

export const financialBehavior = [
  // {
  //   key: 'Withdraw',
  //   value: '提款',
  //   index: 1,
  //   table: 'Account'
  // },
  {
    key: 'Transfer',
    value: '轉帳',
    index: 2,
    table: 'Account'
  },
  // {
  //   key: 'Deposit',
  //   value: '存款',
  //   index: 3,
  //   table: 'Account'
  // },
  {
    key: 'CreditCardRepayment',
    value: '繳信用卡款',
    index: 4,
    table: 'CreditCard'
  },
  {
    key: 'LoanRepayment',
    value: '繳貸款',
    index: 5,
    table: 'Loan'
  },
  {
    key: 'Premiums',
    value: '繳保費',
    index: 6,
    table: 'Insurance'
  }
  // {
  //   key: 'AddValue',
  //   value: '儲值',
  //   index: 7,
  //   table: 'Account'
  // }
  // {
  //   key: 'Refund',
  //   value: '退款',
  //   index: 8,
  //   table: 'Account'
  // }
]
