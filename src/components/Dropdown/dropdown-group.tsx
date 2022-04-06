import React, { useEffect, useState } from 'react';
import {
  GroupDropdown,
} from 'sharingan-rn-modal-dropdown';
import { FormikValues } from 'formik';
import { get } from 'lodash';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { colors } from '../../themes/colors';
import { size } from '../../themes/fonts';
import metrics from '../../themes/metrics';

interface Props {
  placeHolder: string;
  list: any[];
  formik: FormikValues;
  name: string;
  label: string;
  onChangeGS(text: string): void;
}

const DropdownGroup: React.FC<Props> = (props: Props) => {

  const { setFieldValue, errors, submitCount } = props.formik;

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(props.list);
  const [value, setValue] = useState('');
  const [label, setLabel] = useState(props.label);


  const isInitialError = typeof get(errors, props.name) === 'string';
  const isError = isInitialError && submitCount > 0;
  const Info = submitCount === 0 ? '' : get(errors, props.name);

  useEffect(() => {
    console.log("hey")
    setLabel(props.label);
  }, [props.label]);

  const theme = {
    dark: false,
    roundness: 2,
    colors: {
        primary: 'red',
        background: 'red',
        surface: 'white',
        accent: 'red',
        error: '#CCC',
        text: '#707070',
        onSurface: 'red',
        disabled: '#CCC',
        placeholder: '#CCC',
        backdrop: 'red',
        notification: 'red'
    },
    fonts: {
      regular: {
        fontFamily: 'Arial'
      },
      medium: {
        fontFamily: 'Arial'
      },
      light: {
        fontFamily: 'Arial'
      },
      thin: {
        fontFamily: 'Arial'
      }
    },
    animation: {
        scale: 0
    }
};

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ padding:0, margin:0, borderStyle: 'solid', backgroundColor: 'transparent', borderColor: '#CCC' }}>
          <GroupDropdown
            label={label}
            textInputPlaceholder="Simple dropdown with avatar"
            paperTheme={theme}
            textInputStyle={{ borderStyle: 'solid', backgroundColor: 'transparent', borderColor: '#CCC' }}
            itemContainerStyle={{ borderStyle: 'solid', borderColor: 'red' }}
            parentDDContainerStyle={{ borderStyle: 'solid', borderColor: '#CCC' }}
            mainContainerStyle={{ borderStyle: 'solid', borderColor: '#CCC' }}
            data={props.list}
            enableSearch
            value={value}
            mode="outlined"
            onChange={props.onChangeGS}
          />
        </ScrollView>
      </View>
      {Info ? (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={[!isError ? styles.Info : styles.errorInfo]}>{Info}</Text>
        </Animatable.View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 0,
    margin: 0
  },
  title: {
    color: colors.InputTextColor,
    fontWeight: '500',
    fontSize: size.font14,
    marginBottom: metrics.screenHeight * 0.01,
    height: metrics.screenHeight * 0.03
  },
  textInput: {
    width: '100%',
    height: metrics.screenHeight * 0.052,
    padding: metrics.screenHeight * 0.01,
    fontSize: 14,
    fontWeight: '400',
    color: colors.black
  },
  formInputContainer: {
    flexDirection: 'row',
    borderRadius: 4,
    borderColor: '#e4e4e4',
    borderWidth: 1,
    borderStyle: 'solid',
    width: '100%',
    height: metrics.screenHeight * 0.052,
    fontSize: 14,
    fontWeight: '400',
    color: colors.black
  },
  formInputImage: {
    height: metrics.screenHeight * 0.025,
    width: metrics.screenHeight * 0.025,
    display: 'flex',
    alignSelf: 'center',
    marginLeft: metrics.screenHeight * 0.01,
    opacity: 0.6
  },
  Info: {
    fontSize: size.font10,
    padding: 4,
    position: 'absolute',
    lineHeight: 1,
    borderRadius: 4,
    bottom: -20,
    color: colors.error
  },
  error: {
    flexDirection: 'row',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ff0025',
    width: '100%',
    borderRadius: 4,
    height: metrics.screenHeight * 0.052,
    fontSize: 14,
    fontWeight: '400',
    color: colors.black
  },
  errorInfo: {
    color: colors.error
  }
});

export default DropdownGroup;
