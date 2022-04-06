import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { colors } from '../../themes/colors';
import { email, padlock, splashLogo } from '../../assets/icons';
import metrics from '../../themes/metrics';
import { size } from '../../themes/fonts';
import ResultModal from '../../components/Modal/ResultModal';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Input from '../../components/Input/input';

import Spinner from 'react-native-loading-spinner-overlay';
import Button from '../../components/Button/button';
import BackButtonHeaderComponent from '../../components/Button/back-button-header';
import statusNotificationType from '../../models/enum/statusNotificationType';

const validation = Yup.object({
  username: Yup.string().email('Please enter valid email').required('Email Address is Required'),
  password: Yup.string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required')
});

export interface LoginInput {
  username: string;
  password: string;
}

const initialState: LoginInput = {
  username: '',
  password: ''
};

interface Props {
  navigation: any;
  route: any;
}

const LogInPage: React.FC<Props> = (props) => {
  const [resultPopup, setResultPopup] = useState({
    open: false,
    status: statusNotificationType.Error,
    text: '',
    buttonText: ''
  });
  const [spinner, setSpinner] = useState(false);
  const initialValues: LoginInput = initialState;

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      onLogin(values);
    },
    validationSchema: validation
  });

  const onLogin = async (values: LoginInput) => { };

  return (
    <>
      <Spinner visible={spinner} textContent={'Kayıt işlemi yapılıyor...'} textStyle={{ color: '#ffffff' }} />
      <ResultModal
        status={resultPopup.status}
        text={resultPopup.text}
        onClose={() => {
          setResultPopup({
            buttonText: '',
            status: statusNotificationType.Error,
            text: '',
            open: false
          });
        }}
        buttonText={resultPopup.buttonText}
        open={resultPopup.open}
      />
      <View style={styles.container}>
        <BackButtonHeaderComponent navigation={props.navigation} />
        <View style={styles.header}>
          <Animatable.Image
            animation="bounce"
            duration={1500}
            source={splashLogo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.text_header}>RN-0.67.4-Boiler-Plate</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.formStyle}>
          <ScrollView>
            <Input formik={formik} name={'username'} title={'Email'} isIcon={email} placeholder={'Email'} />
            <Input formik={formik} name={'password'} title={'Password'} isIcon={padlock} placeholder={'Password'} />

            {/* Giriş Yap Buton Kısmı */}
            <Button
              label={'Giriş Yapınız'}
              color={colors.primary}
              //loading={spinner}
              onPress={formik.handleSubmit}
              style={styles.signInButton}
              upperCase={false}
              disabled={spinner}
            />
            {/* Footer Kısmı */}
            <View style={styles.footerSide}>
              <TouchableOpacity>
                <Text style={styles.footerText}>Şifremi unuttum?</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.footerText} onPress={() => { }}>
                  Kayıt Olmak istiyorum?
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    </>
  );
};
const { height } = Dimensions.get('screen');
const logo = height * 0.24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  logo: {
    width: logo * 0.5,
    height: logo * 0.5
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  text_header: {
    color: colors.textColor,
    fontWeight: 'bold',
    fontSize: size.font20
  },
  formStyle: {
    flex: 3,
    backgroundColor: colors.white,
    borderTopLeftRadius: metrics.screenHeight * 0.04,
    borderTopRightRadius: metrics.screenHeight * 0.04,
    paddingHorizontal: metrics.screenHeight * 0.03,
    paddingVertical: metrics.screenHeight * 0.04
  },
  formText: {
    color: colors.black,
    fontSize: size.font18
  },
  formInputContainer: {
    flexDirection: 'row',
    marginTop: metrics.screenHeight * 0.01,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    marginBottom: metrics.screenHeight * 0.01
  },
  formInputImage: {
    height: metrics.screenHeight * 0.031,
    width: metrics.screenHeight * 0.031,
    marginTop: metrics.screenHeight * 0.015
  },
  textInput: {
    flex: 1,
    paddingLeft: metrics.screenHeight * 0.02,
    color: colors.black
  },
  errorMsg: {
    color: colors.error,
    fontSize: size.font14
  },
  signInButton: {
    width: '100%',
    height: metrics.screenHeight * 0.06,
    marginTop: metrics.screenHeight * 0.03,
    justifyContent: 'center',
    borderRadius: 10
  },
  signInButtonText: {
    color: colors.textColor,
    fontSize: 18,
    fontWeight: 'bold'
  },
  footerSide: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  footerText: {
    color: colors.black,
    marginTop: metrics.screenHeight * 0.02,
    fontSize: size.font14
  }
});

export default LogInPage;
