import fs from 'fs';
import axios from 'axios';
import { camelCaseKeys } from 'lib/helpers/object';
import { MasterType } from 'types/models/MasterType';

require('dotenv').config({
  path: '.env.local',
});

const masterTypes = [
  'property-type',
  'gender',
  'bed',
  'amenity-category',
  'amenity',
  'bathroom-type',
  'bathroom-feature',
  'modifier',
  'multiplier',
  'price-type',
  'discount-type',
  'weekend-day',
  'reservation-status',
  'plan',
];

function fetchMasterType(masterType: string) {
  const url = `${process.env.NEXT_PUBLIC_API_HOST_URL}/${process.env.NEXT_PUBLIC_API_ROUTE}/${masterType}`;

  axios
    .get(url)
    .then(({ data }) => {
      const filePath = `static/${masterType}.json`;
      fs.writeFileSync(
        filePath,
        JSON.stringify(camelCaseKeys(data as MasterType[])),
      );
    })
    .catch((e) => {
      console.error(e);
    });
}

masterTypes.forEach(fetchMasterType);
