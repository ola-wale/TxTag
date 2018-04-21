import { SearchTransactionsPipe } from './search-transactions.pipe';

describe('SearchTransactionsPipe', () => {
  let pipe: SearchTransactionsPipe;
  beforeEach(() => {
    pipe = new SearchTransactionsPipe();
  });
  let transactions = [
    {
      "tags": ["new"],
      "date": 1524211413466,
      "_id": "9a62c3ad-14bf-4790-af6a-be77c1945014",
      "hash": "39a13ca9e529ee39458ac800ed83b32ed275405cc8ad9c8977aa68f7ef67454a",
      "ownerId": "dd574f44-1047-458f-a63f-3e8a3a0ca71a",
      "__v": 0
    }
  ]
  it('create an instance', () => {
    const pipe = new SearchTransactionsPipe();
    expect(pipe).toBeTruthy();
  });
  it('providing no value returns fallback', () => {
    expect(pipe.transform(transactions,'tags,hash', '')).toBe(transactions);
  });
});
