import { useEffect, useState } from 'react';
import { FlatList, Picker, Pressable, StyleSheet, TextInput, View } from 'react-native-web';
import { TouchableHighlight } from 'react-native-web';

import AppText from './components/AppText';
import { getTeamByName, getTeamPlayers } from './modules/API';
import { getTeamId } from './utils';

/*
  * App state
    {
      searchTerm?: string
      selectedTeam?: Team
      teamPlayers?: Array<Player>
      selectedPlayer?: Player
      pageNumber: number
    }
*/

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamPlayers, setTeamPlayers] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // useEffect(() => {

  // }, []);

  const handleOnChangeText = (text) => setSearchTerm(text);
  const handleOnKeyPress = async (event) => {
    const isEnterKey = event.keyCode === 13
    
    if (!isEnterKey) return;
    else {
      const team = await getTeamByName(searchTerm);
      setSelectedTeam(team);

      const teamId = getTeamId(team);
      const teamPlayers = await getTeamPlayers(teamId);
      setTeamPlayers(teamPlayers);
    }
  }

  const renderItem = ({ item: { player: { id, name } } }) => {
    return (
      <Item id={id} title={name} />
    )
  };
  
  return (
    <View>
      {/* App's title */}
      <View style={styles.headerContainer}>
        <AppText fontSize="headerSm">Football Numbers</AppText>
      </View>

      {/* App's search bar */}
      <View>
        <TextInput
          onChangeText={handleOnChangeText}
          onKeyPress={handleOnKeyPress}
          style={styles.textInput}
        />
      </View>

      {/* Search results */}
      {teamPlayers ? (
        <View>
          <FlatList
            data={teamPlayers}
            renderItem={renderItem}
            keyExtractor={(item) => item.player.id}
          />
        </View>
      ) : null}
    </View>
  );
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
  
  headerContainer: {
    textAlign: 'center',
  },

  textInput: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
  },
});

export default App;
