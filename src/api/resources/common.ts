import { _GET, _POST } from '../http';

enum COMMON_URL {
  SEARCH = '/Search',
  GET_BY_CODE = '/GetByCode'
}

export default {
  search: (data: any) => _POST(COMMON_URL.SEARCH, data),
  getByCode: (id: string) => _GET(`${COMMON_URL.GET_BY_CODE}/${id}`, { isLoading: true })
};
