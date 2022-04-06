import { _GET } from '../http';

enum COMMON_URL {
  SEARCH = '/booking/search?search='
}

export default {
  search: (search: string) => _GET(`${COMMON_URL.SEARCH}${search}`, { isLoading: true })
};
