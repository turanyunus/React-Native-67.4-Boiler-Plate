import { camelCase } from 'lodash';

const requireModule = require.context('./resources', false, /\.ts$/);
const api: any = {};

requireModule.keys().forEach((fileName: string) => {
  if (fileName === './index.js') return;
  const moduleName: keyof typeof api = camelCase(fileName.replace(/(\.\/|\.ts)/g, ''));
  api[moduleName] = {
    ...requireModule(fileName).default
  };
});
export default api;
