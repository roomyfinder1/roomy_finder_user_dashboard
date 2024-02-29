import _mock from '../_mock';
import { randomNumberRange } from '../utils';

export const _cityIdCodes = [...Array(21)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.citySymbols.city(index) || null,
  symbol: _mock.citySymbols.symbol(index) || null,
  color: 'red',
  favourite: randomNumberRange(9999, 19999),
}));

export const _accountIdCodes = [...Array(21)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.accountSymbols.account(index),
  symbol: _mock.accountSymbols.symbol(index),
  color: '#08f26e',
  favourite: randomNumberRange(9999, 19999),
}));

export const _bookingIdCodes = [...Array(9)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.bookingSymbols.booking(index) || null,
  symbol: _mock.bookingSymbols.symbol(index) || null,
  color: 'orange',
  favourite: randomNumberRange(9999, 19999),
}));

export const _paymentColorIdCodes = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.paymentColorSymbols.paymentColor(index) || null,
  symbol: _mock.paymentColorSymbols.symbol(index) || null,
  color: '#fff',
  favourite: randomNumberRange(9999, 19999),
}));

export const _unitCodeIdCodes = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.unitCodeSymbols.unitCode(index),
  symbol: _mock.unitCodeSymbols.symbol(index),
  color: '#b300b3',
  favourite: randomNumberRange(9999, 19999),
}));
