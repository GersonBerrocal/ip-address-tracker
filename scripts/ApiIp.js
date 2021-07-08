export class ApiIp {
  constructor(key) {
    this.base_url = `https://geo.ipify.org/api/v1?apiKey=${key}`;
  }

  async getByIp(ip) {
    const url = `${this.base_url}&ipAddress=${ip}`;
    const response = await fetch(url);
    return response.json();
  }

  getByDomain() {}
}
