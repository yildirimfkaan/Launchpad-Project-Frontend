const dynamic_presale = [
  {
    inputs: [
      {
        internalType: 'contract UnoToken',
        name: 'unoTokenContractAddress',
        type: 'address',
      },
      {
        internalType: 'contract DynamicToken',
        name: 'dynamicTokenContractAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'ratio',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ratio_',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_paused',
        type: 'bool',
      },
    ],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'swap',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];
export default dynamic_presale;
