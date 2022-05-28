const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const API_HOST_URL = process.env.NEXT_PUBLIC_API_HOST_URL || 'http://localhost';

const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE || 'api';

const API_URL = `${API_HOST_URL}/${API_ROUTE}`;

const SANCTUM_URL = `${API_HOST_URL}/${
  process.env.NEXT_PUBLIC_SANCTUM_URL || 'sanctum/csrf-cookie'
}`;

let USER_MIN_AGE = parseInt(process.env.NEXT_PUBLIC_USER_MIN_AGE || '', 10);
if (Number.isNaN(USER_MIN_AGE)) {
  USER_MIN_AGE = 18;
}

let MAX_FILE_SIZE = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '', 10);
if (Number.isNaN(MAX_FILE_SIZE)) {
  MAX_FILE_SIZE = 5;
}

let PRICE_BASIC_MONTHLY = parseInt(
  process.env.NEXT_PUBLIC_PRICE_BASIC_MONTHLY || '',
  10,
);
if (Number.isNaN(PRICE_BASIC_MONTHLY)) {
  PRICE_BASIC_MONTHLY = 2.99;
}

let PRICE_BASIC_YEARLY = parseInt(
  process.env.NEXT_PUBLIC_PRICE_BASIC_YEARLY || '',
  10,
);
if (Number.isNaN(PRICE_BASIC_YEARLY)) {
  PRICE_BASIC_YEARLY = 29.99;
}

let PRICE_PRO_MONTHLY = parseInt(
  process.env.NEXT_PUBLIC_PRICE_PRO_MONTHLY || '',
  10,
);
if (Number.isNaN(PRICE_PRO_MONTHLY)) {
  PRICE_PRO_MONTHLY = 14.99;
}

let PRICE_PRO_YEARLY = parseInt(
  process.env.NEXT_PUBLIC_PRICE_PRO_YEARLY || '',
  10,
);
if (Number.isNaN(PRICE_PRO_YEARLY)) {
  PRICE_PRO_YEARLY = 149.99;
}

let MAX_GUESTS = parseInt(process.env.NEXT_PUBLIC_MAX_GUESTS || '', 10);
if (Number.isNaN(MAX_GUESTS)) {
  MAX_GUESTS = 30;
}

const Config = {
  BASE_URL,
  API_HOST_URL,
  API_ROUTE,
  API_URL,
  SANCTUM_URL,
  LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL || 'log',
  REDUX_DEVTOOLS: process.env.NEXT_PUBLIC_REDUX_DEVTOOLS === 'true',
  GOOGLE_MAP_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  FB_CLIENT_ID: process.env.NEXT_PUBLIC_FB_CLIENT_ID,
  USER_MIN_AGE,
  MAX_FILE_SIZE,
  MAX_GUESTS,
  PRICE_BASIC_MONTHLY,
  PRICE_BASIC_YEARLY,
  PRICE_PRO_MONTHLY,
  PRICE_PRO_YEARLY,
  STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
};

export default Config;
