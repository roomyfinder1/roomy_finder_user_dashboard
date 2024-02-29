import { sub } from 'date-fns';
//
import {
  age,
  role,
  price,
  title,
  email,
  rating,
  percent,
  country,
  company,
  boolean,
  sentence,
  lastName,
  fullName,
  firstName,
  description,
  fullAddress,
  phoneNumber,
  city,
  citySymbol,
  account,
  accountSymbol,
  accountColor,
  booking,
  bookingSymbol,
  paymentColor,
  paymentColorSymbol,
  unitCode,
  unitCodeSymbol,
} from './assets';

// ----------------------------------------------------------------------

const _mock = {
  id: (index) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  email: (index) => email[index],
  phoneNumber: (index) => phoneNumber[index],
  time: (index) => sub(new Date(), { days: index, hours: index }),
  boolean: (index) => boolean[index],
  role: (index) => role[index],
  company: (index) => company[index],
  address: {
    fullAddress: (index) => fullAddress[index],
    country: (index) => country[index],
  },
  name: {
    firstName: (index) => firstName[index],
    lastName: (index) => lastName[index],
    fullName: (index) => fullName[index],
  },
  text: {
    title: (index) => title[index],
    sentence: (index) => sentence[index],
    description: (index) => description[index],
  },
  number: {
    percent: (index) => percent[index],
    rating: (index) => rating[index],
    age: (index) => age[index],
    price: (index) => price[index],
  },
  citySymbols: {
    city: (index) => city[index],
    symbol: (index) => citySymbol[index],
  },
  accountSymbols: {
    account: (index) => account[index],
    symbol: (index) => accountSymbol[index],
    color: (index) => accountColor[index],
  },
  bookingSymbols: {
    booking: (index) => booking[index],
    symbol: (index) => bookingSymbol[index],
  },
  unitCodeSymbols: {
    unitCode: (index) => unitCode[index],
    symbol: (index) => unitCodeSymbol[index],
  },
  paymentColorSymbols: {
    paymentColor: (index) => paymentColor[index],
    symbol: (index) => paymentColorSymbol[index],
  },
  image: {
    cover: (index) =>
      `https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_${index + 1}.jpg`,
    product: (index) =>
      `https://api-dev-minimal-v4.vercel.app/assets/images/products/product_${index + 1}.jpg`,
    avatar: (index) =>
      `https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
};

export default _mock;
