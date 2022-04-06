import React from 'react';
import { AppRegistry } from 'react-native';
import Apps from './App';
import { name as appName } from './app.json';

/*REDUX*/
import { Provider as StoreProvider } from 'react-redux';
import { store } from './src/utils/store/store';

const App = () => (
    <StoreProvider store={store}>
        <Apps />
    </StoreProvider>
);

AppRegistry.registerComponent(appName, () => App);
