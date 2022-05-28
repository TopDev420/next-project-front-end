import fs from 'fs';
import { getDestinations } from 'lib/apis/destination';
import { camelCaseKeys } from 'lib/helpers/object';

require('dotenv').config({
  path: '.env.local',
});

const fetchDestinations = () => {
  getDestinations()
    .then((response) => {
      const filePath = `static/destinations.json`;
      fs.writeFileSync(filePath, JSON.stringify(camelCaseKeys(response)));
    })
    .catch((e) => console.log(e));
};

fetchDestinations();
