import { deepCopy } from 'src/utils/deep-copy';

import { companies, company } from './data';

class JobsApi {
  getCompanies() {
    return Promise.resolve(deepCopy(companies));
  }

  getCompany() {
    return Promise.resolve(deepCopy(company));
  }
}

export const jobsApi = new JobsApi();
