import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}

  async getAvailableCountries() {
    try {
      const response = await this.httpService
        .get(process.env.AVAILABLE_COUNTRY)
        .toPromise();
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error fetching available countries');
    }
  }

  async getCountryInfo(countryCode: string) {
    try {
      const countryInfoResponse = await this.httpService
        .get(`${process.env.COUNTRY_INFO}${countryCode}`)
        .toPromise();

      const countryInfo = countryInfoResponse.data;
      const countryBorders = countryInfo.borders.map(
        (country) => ({
          country: country.commonName,
          code: country.countryCode,
        }),
      );

      const populationResponse = await this.httpService
        .post(process.env.COUNTRY_POPULATION, {
          country: countryInfo.commonName,
        })
        .toPromise();
      const populationData = populationResponse.data.data.populationCounts;

      const flagResponse = await this.httpService
        .post(process.env.COUNTRY_FLAG, {
          iso2: countryCode,
        })
        .toPromise();
      const flagUrl = flagResponse.data.data.flag;

      return {
        name: countryInfo.officialName,
        region: countryInfo.region,
        code: countryInfo.countryCode,
        borders: countryBorders,
        countryPopulation: populationData,
        countryFlag: flagUrl,
      };
    } catch (error) {
      this.handleError(
        error,
        `Error fetching information for country: ${countryCode}`,
      );
    }
  }

  private handleError(error: AxiosError, customMessage: string) {
    console.error(`${customMessage}:`, error.message);
    const errorMessage =
      (error.response.data as any).message || 'Error from external API';

    if (error.response && error.response.data) {
      throw new HttpException(
        {
          status: error.response.status,
          message: errorMessage,
        },
        error.response.status,
      );
    } else if (error.request) {
      throw new HttpException(
        { status: 500, message: 'No response received from external API' },
        500,
      );
    } else {
      throw new HttpException(
        { status: 500, message: 'An unexpected error occurred' },
        500,
      );
    }
  }
}
