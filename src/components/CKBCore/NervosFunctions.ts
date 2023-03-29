import axios, { AxiosInstance } from 'axios';

export class NervosFunctions {
  private readonly axios: AxiosInstance;

  constructor(url: string) {
    this.axios = axios.create({
      baseURL: url,
      timeout: 30000,
    });
  }

  async faucet(address: string) {
    const { data } = await this.axios.request({
      url: '/api/faucet',
      params: {
        target_ckt_address: address,
      },
    });
    return data;
  }
}
