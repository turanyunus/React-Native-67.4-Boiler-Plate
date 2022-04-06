import React from 'react';
import { Dimensions, Image, StyleSheet, View, Modal, Text, TouchableOpacity, ScrollView } from 'react-native';
import { size } from '../../themes/fonts';
import { colors } from '../../themes/colors';
import CheckBox from '@react-native-community/checkbox';

interface Props {
  text: string;
  buttonText: string;
  open: boolean;

  onClose(): void;
}
const tempList = [
  { id: 1, status: false, name: 'Item 1' },
  { id: 2, status: false, name: 'Item 2' },
  { id: 3, status: false, name: 'Item 3' },
  { id: 4, status: false, name: 'Item 4' },
  { id: 5, status: false, name: 'Item 5' },
  { id: 6, status: false, name: 'Item 6' }
];
const MultiSelectedListModal: React.FC<Props> = (props: Props) => {
  const [list, setList] = React.useState(tempList);

  const onValueChange = (id: number) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      }
      return item;
    });
    setList(newList);
  };

  return (
    <Modal visible={props.open} transparent={true} animationType={'fade'}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <ScrollView>
            {list.map((Item) => (
              <TouchableOpacity onPress={() => onValueChange(Item.id)} key={Item.id} style={styles.listItem}>
                <CheckBox disabled={false} value={Item.status} onValueChange={() => onValueChange(Item.id)} />
                <View>
                  <Text style={styles.listItemText}>{Item.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.buttonFields}>
            <TouchableOpacity style={styles.doneButton} onPress={props.onClose}>
              <Text style={styles.finishText}>{props.buttonText}</Text>
            </TouchableOpacity>
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
    height: '35%',
    width: '80%',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10
  },
  listItemText: {},
  buttonFields: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '70%',
    marginTop: 20
  },
  doneButton: {
    backgroundColor: '#00C096',
    height: height * 0.04,
    width: height * 0.12,
    borderRadius: 10,
    justifyContent: 'center'
  },
  finishText: {
    color: colors.white,
    fontSize: size.font16,
    textAlign: 'center'
  }
});
export default MultiSelectedListModal;
