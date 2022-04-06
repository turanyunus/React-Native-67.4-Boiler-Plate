import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Searchbar, ActivityIndicator } from 'react-native-paper';
import { List } from 'react-native-paper';
import booking from '../../api/resources/booking';
import { colors } from '../../themes/colors';
import { useAppDispatch, useAppSelector } from '../../utils/store/hooks';
import { SearchType, setTourLocationDropState, setTourLocationPickState } from './search.slice';
import { useNavigation } from '@react-navigation/native';

interface SearchTourListDto {
  text: string;
  children: DataSearchLocationTourDto[];
  order: number;
}

export interface DataSearchLocationTourDto {
  id: number;
  text: string;
}

const SearchDetail = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useAppDispatch();
  const searchSliceState = useAppSelector((state) => state.searchSlice);
  const navigation = useNavigation();

  const onChangeSearch = async (query: string) => {
    try {
      setSearchQuery(query);
      setSearchResults([]);
      if (query.length > 2) {
        const response =
          searchSliceState.searchType === SearchType.PICK ? await booking.search(query) : await booking.search(query);
        const tempList: any[] = [];
        if (response) {
          // @ts-ignore
          response?.map((item: SearchTourListDto) => {
            tempList.push({
              text: item.text,
              data: item.children,
              order: item.order
            });
          });
          // @ts-ignore
          setSearchResults(tempList);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} />
      <ScrollView>
        {searchResults.length > 0 ? (
          searchResults.map((value: any, key) => {
            return (
              <List.Section
                title={value.text}
                key={key}
                titleStyle={{
                  borderBottomWidth: 1,
                  borderBottomColor: colors.gray,
                  fontWeight: '700',
                  fontSize: 16
                }}
              >
                {value.data.map((val: DataSearchLocationTourDto) => {
                  return (
                    <List.Item
                      key={val.id}
                      title={val.text}
                      //left={(props: any) => <Avatar.Icon {...props} icon="folder" />}
                      onPress={() => {
                        searchSliceState.searchType === SearchType.PICK
                          ? dispatch(setTourLocationPickState(val))
                          : dispatch(setTourLocationDropState(val));
                        navigation.goBack();
                      }}
                    />
                  );
                })}
              </List.Section>
            );
          })
        ) : (
          <>
            {searchQuery.length > 0 ? (
              <View style={{ marginTop: 20 }}>
                <ActivityIndicator animating={true} color={colors.primary} style={{ marginTop: 20 }} />
                <Text style={{ alignSelf: 'center', marginTop: 20 }}>Arama yapılıyor...</Text>
              </View>
            ) : (
              <View style={{ marginTop: 20 }}>
                <Text style={{ alignSelf: 'center', marginTop: 20 }}>Arama yapmak için en az 3 karakter giriniz.</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  }
});

export default SearchDetail;
