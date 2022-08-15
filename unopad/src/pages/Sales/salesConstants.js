const TOKENS_SORT_TYPES = {
  ASCENDING: 0,
  DESCENDING: 1,
};

const TOKENS_SORT_KEYS = {
  TOKEN_NAME: 0,
  TOKEN_SYMBOL: 1,
  TOKEN_ADDRESS: 2,
};

const sortTypes = [
  {
    name: 'Ascending',
    icon: 'BiSortUp',
  },
  {
    name: 'Descending',
    icon: 'BiSortDown',
  },
];

const sortKeys = [
  { name: 'Token Name', key: 'token_name' },
  { name: 'Token Symbol', key: 'token_symbol' },
  { name: 'Token Address', key: 'token_address' },
];

export {TOKENS_SORT_TYPES, TOKENS_SORT_KEYS, sortTypes, sortKeys}
