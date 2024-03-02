import { numFormat } from './num';

describe('formats a number with commas', () => {
  it('should format a number', () => {
    expect(numFormat(123456789)).toEqual('123,456,789');
  });
    it('should format a negative number', () => {
        expect(numFormat(-123456789)).toEqual('-123,456,789');
    });
    it('should format a decimal number', () => {
        expect(numFormat(123456789.123)).toEqual('123,456,789.123');
    });
    it('should format a zero', () => {
        expect(numFormat(0)).toEqual('0');
    });
    it('should exclude excess decimals', () => {
        expect(numFormat(0.123456789)).toEqual('0.123');
    });
});
