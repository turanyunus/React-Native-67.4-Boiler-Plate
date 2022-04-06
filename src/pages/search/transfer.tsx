import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../themes/colors';
import { useFormik } from 'formik';
import Button from '../../components/Button/button';
import * as Yup from 'yup';
import metrics from '../../themes/metrics';
import DateTimePickerComponent from '../../components/Picker/datetime';
import { Picker } from '../../components/Picker/picker';
import Input from '../../components/Input/input';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../utils/store/hooks';
import { SearchType, setSearchType } from './search.slice';

const validation = Yup.object({
  pickLocation: Yup.string()
    .nullable(true)
    .min(3, { text: 'MinLengthError', keys: { value: 3 } })
    .required('RequiredField'),
  dropLocation: Yup.string()
    .nullable(true)
    .min(3, { text: 'MinLengthError', keys: { value: 3 } })
    .required('RequiredField')
});

export interface SearchTransferValues {
  pickLocation: string;
  tourDate: Date;
  tourTimeHour: string;
  tourTimeMin: string;
  dropLocation: string;
}

const initialState: SearchTransferValues = {
  pickLocation: '',
  tourDate: new Date(),
  tourTimeHour: '00',
  tourTimeMin: '00',
  dropLocation: ''
};

let hours = [
  { label: '00', value: 0 },
  { label: '01', value: 1 },
  { label: '02', value: 2 },
  { label: '03', value: 3 },
  { label: '04', value: 4 },
  { label: '05', value: 5 },
  { label: '06', value: 6 },
  { label: '07', value: 7 },
  { label: '08', value: 8 },
  { label: '09', value: 9 },
  { label: '10', value: 10 },
  { label: '11', value: 11 },
  { label: '12', value: 12 },
  { label: '13', value: 13 },
  { label: '14', value: 14 },
  { label: '15', value: 15 },
  { label: '16', value: 16 },
  { label: '17', value: 17 },
  { label: '18', value: 18 },
  { label: '19', value: 19 },
  { label: '20', value: 20 },
  { label: '21', value: 21 },
  { label: '22', value: 22 },
  { label: '23', value: 23 }
];

let times = [
  { label: '00', value: 0 },
  { label: '15', value: 1 },
  { label: '30', value: 2 },
  { label: '45', value: 3 }
];

const SearchTransfer = () => {
  const initialValues: any = initialState;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const searchSliceSelector = useAppSelector((state) => state.searchSlice);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      onLogin(values).then((r) => {
        console.log(r);
      });
    },
    validationSchema: validation
  });

  useEffect(() => {
    if (searchSliceSelector.tourLocationPickState.text !== '')
      formik.setFieldValue('pickLocation', searchSliceSelector.tourLocationPickState.text);
  }, [searchSliceSelector.tourLocationPickState.text]);

  useEffect(() => {
    if (searchSliceSelector.tourLocationDropState.text !== '')
      formik.setFieldValue('dropLocation', searchSliceSelector.tourLocationDropState.text);
  }, [searchSliceSelector.tourLocationDropState.text]);

  const onLogin = async (values: SearchTransferValues) => {};

  return (
    <>
      <View style={styles.container}>
        {/* Select Pick Up Location */}
        <TouchableOpacity
          onPress={() => {
            dispatch(setSearchType(SearchType.PICK));
            // @ts-ignore
            navigation.navigate('SearchList');
          }}
          style={styles.block}
        >
          <Input
            formik={formik}
            name={'pickLocation'}
            placeholder={'Country, City, Airport and Region'}
            title={'Select Pick Up Location'}
            editable={false}
          />
        </TouchableOpacity>

        {/* Select Drop Off Location */}
        <TouchableOpacity
          onPress={() => {
            dispatch(setSearchType(SearchType.DROP));
            // @ts-ignore
            navigation.navigate('SearchList');
          }}
          style={styles.block}
        >
          <Input
            formik={formik}
            name={'dropLocation'}
            placeholder={'Select Location'}
            title={'Select Drop Off Location'}
            editable={false}
          />
        </TouchableOpacity>

        {/* Tour Date */}
        <View style={styles.block}>
          <DateTimePickerComponent
            mode={'date'}
            defaultValue={new Date()}
            formik={formik}
            name={'tourDate'}
            title={'Pickup Date'}
          />
        </View>

        {/* Pick Up Time */}
        <Text style={styles.componentText}>Pick Up Time</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Picker formik={formik} name={'tourTimeHour'} items={hours} width={metrics.screenWidth * 0.4} />
          <Picker formik={formik} name={'tourTimeMin'} items={times} width={metrics.screenWidth * 0.4} />
        </View>

        {/* Search */}
        <View style={styles.block}>
          <Button
            label={'Search'}
            color={colors.primary}
            onPress={formik.handleSubmit}
            style={styles.buttonStyle}
            upperCase={false}
          />
        </View>
      </View>
      <Text style={[styles.componentText, { margin: 10 }]}>Aranan Kelimeler : Hotel, Yurt dışı, Tur, Transfer</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginBottom: 2,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#c6c5c5',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  block: {
    marginBottom: metrics.screenWidth * 0.05
  },
  componentText: {
    fontSize: 14,
    marginBottom: 10
  },
  buttonStyle: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: colors.primary
  },
  resultSide: {
    margin: 10,
    padding: 10
  },
  resultText: {
    color: '#868686'
  }
});

export default SearchTransfer;
