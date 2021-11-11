import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native-web';

import AppText from '../AppText';

const PlayerList = ({ teamPlayers }) => {
    console.log('teamPlayers: ', teamPlayers)
    
    const renderItem = ({ item: { player: { id, name } } }) => {
      return (
        <Item id={id} title={name} />
      )
    };
    
    return (teamPlayers.length ? (
      <View>
        <FlatList
          data={teamPlayers}
          renderItem={renderItem}
          keyExtractor={(item) => item.player.id}
        />
      </View>
    ) : null)
}

const Item = ({ id, title }) => {
  return(
    <Pressable key={id} style={styles.itemContainer}>
      <AppText>{title}</AppText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    padding: 5
  },
});

export default PlayerList;