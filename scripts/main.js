'use strict';

import { apiKey } from '../key.js';
import { ApiIp } from './ApiIp.js';

const geolacation = new ApiIp(apiKey);
geolacation.getByIp('8.8.8.8').then(res => {
  console.log(res);
});
