'use strict';

import { apiKey } from '../key.js';
import { ApiIp } from './ApiIp.js';

const geolacation = new ApiIp(apiKey);
const formIp = document.getElementById('form-ip');
const inputIp = document.getElementById('input-ip');
const cardElement = {
  ip: document.getElementById('section-ip'),
  location: document.getElementById('section-location'),
  timezone: document.getElementById('section-timezone'),
  lsp: document.getElementById('section-lsp'),
};

function verifyIpOrDomain(value) {
  const isIp = /((^\d+\.\d+\.\d+\.\d+$)|[\da-fA-F]+(:|::)[\da-fA-F]+)/.test(
    value
  );
  if (isIp) return { ip: value };
  else return { domain: value };
}
function paintCard(data = { ip, location, timezone, lsp }, cardElement) {
  for (const property in cardElement) {
    cardElement[property].textContent = data[property];
  }
}
function searchIp(objectReq) {
  geolacation
    .getInfoOf(objectReq)
    .then(res => {
      if (res.status == '200') return res.json();
      else throw new Error(res.err);
    })
    .then(res => {
      console.log(res);
      paintCard(
        {
          ip: res.ip,
          location: `${res.location.region}, ${res.location.city} ${res.location.postalCode}`,
          timezone: `UTC ${res.location.timezone}`,
          lsp: res.isp,
        },
        cardElement
      );
    })
    .catch(err => {
      alert('Lo sentimos algo salio mal');
    });
}
function handlerFormIp(e) {
  e.preventDefault();
  const value = e.target.querySelector('.form-input').value.trim();
  inputIp.value = value;
  searchIp(verifyIpOrDomain(value));
}
formIp.addEventListener('submit', handlerFormIp);

fetch('https://api64.ipify.org?format=json')
  .then(res => res.json())
  .then(ipUser => {
    searchIp(verifyIpOrDomain(ipUser.ip)), (inputIp.value = ipUser.ip);
  });
