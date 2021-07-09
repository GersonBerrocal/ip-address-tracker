export class ApiIp {
  constructor(key) {
    this.base_url = `https://geo.ipify.org/api/v1?apiKey=${key}`;
  }

  async getInfoOf({ ip = '', domain = '' }) {
    const url = `${this.base_url}&ipAddress=${ip}&domain=${domain}`;
    const response = await fetch(url);
    return response;
    // return response.json();
  }
}
