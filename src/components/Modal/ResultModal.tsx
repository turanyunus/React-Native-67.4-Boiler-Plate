import React from 'react';
import { Dimensions, Image, StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native';
import { size } from '../../themes/fonts';
import { colors } from '../../themes/colors';
import StatusNotificationType from '../../models/enum/statusNotificationType';

interface Props {
  status: StatusNotificationType;
  text: string;
  buttonText: string;
  open: boolean;

  onClose(): void;
}

const ResultModal: React.FC<Props> = (props: Props) => {
  return (
    <Modal visible={props.open} transparent={true} animationType={'fade'}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          {props.status === StatusNotificationType.Error ? (
            <Image source={require('../../assets/icons/problem.png')} style={styles.profilePhotoStyle} />
          ) : (
            <Image source={require('../../assets/icons/splashlogo.png')} style={styles.profilePhotoStyle} />
          )}
          <Text style={styles.alertText}>{props.text}</Text>
          <View style={styles.buttonFields}>
            {props.status === StatusNotificationType.Error ? (
              <TouchableOpacity style={styles.finishButton} onPress={props.onClose}>
                <Text style={styles.finishText}>Kapat</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.doneButton} onPress={props.onClose}>
                <Text style={styles.finishText}>{props.buttonText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
const { height } = Dimensions.get('screen');
const logo = height * 0.18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000088'
  },
  mainContainer: {
    flexDirection: 'column',
    height: '25%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 4
  },
  profilePhotoStyle: {
    height: logo / 4,
    width: logo / 4
  },
  alertText: {
    marginTop: 10,
    color: colors.black,
    fontSize: size.font16,
    textAlign: 'center'
  },
  buttonFields: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '70%',
    marginTop: 20
  },
  cancelButton: {
    backgroundColor: colors.white,
    height: height * 0.06,
    width: height * 0.12,
    borderRadius: 10,
    justifyContent: 'center'
  },
  cancelText: {
    color: colors.white,
    fontSize: size.font18,
    padding: 10,
    textAlign: 'center'
  },
  finishButton: {
    backgroundColor: colors.primary,
    height: height * 0.05,
    width: height * 0.1,
    borderRadius: 10,
    justifyContent: 'center'
  },
  doneButton: {
    backgroundColor: '#00C096',
    height: height * 0.06,
    width: height * 0.12,
    borderRadius: 10,
    justifyContent: 'center'
  },
  finishText: {
    color: colors.white,
    fontSize: size.font18,
    textAlign: 'center'
  }
});
export default ResultModal;
