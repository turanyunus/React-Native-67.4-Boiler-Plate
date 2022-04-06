import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import './src/i18n';
import { useAppDispatch, useAppSelector } from './src/utils/store/hooks';
import { colors } from './src/themes/colors';
import SplashScreen from './src/components/splach-screen';
/*REACT_NAVIGATION*/
import { NavigationContainer } from '@react-navigation/native';
import DrawNavigator from './src/components/Menu/drawer-menu';
import Spinner from 'react-native-loading-spinner-overlay';
import ResultModal from './src/components/Modal/ResultModal';
import { setOpenNotification } from './src/utils/store/commonSlice';
import StatusNotificationType from './src/models/enum/statusNotificationType';

const App = () => {
  const [isSplash, setIsSplash] = useState(true);
  const commonSlice = useAppSelector((state) => state.commonSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      setIsSplash(false);
    }, 3000);
  }, []);

  if (isSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <Spinner visible={commonSlice.isLoading} textContent={'Yükleniyor...'} textStyle={{ color: '#ffffff' }} />
      <ResultModal
        status={commonSlice.openNotification.type}
        text={'commonSlice.openNotification.message'}
        buttonText={'Tamam'}
        open={commonSlice.openNotification.isShow}
        onClose={() => {
          dispatch(
            setOpenNotification({
              isShow: false,
              message: '',
              type: StatusNotificationType.None
            })
          );
        }}
      />
      <StatusBar backgroundColor={colors.primary} />
      <PaperProvider>
        <NavigationContainer>
          <DrawNavigator />
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

export default App;
