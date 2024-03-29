import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native-web';

import AppText from './components/AppText';
import PagePicker from './components/PagePicker'
import PlayerList from './components/PlayerList';
import SearchBar from './components/SearchBar';
import { getTeamByName, getTeamPlayers } from './modules/API';
import { getTeamId } from './utils';

/*
  * App state
    {
      searchTerm?: string
      selectedTeam?: Team
      teamPlayers?: Array<Player>
      selectedPlayer?: Player
      pageNumber?: {
        current: number,
        total: number
      }
    }
*/

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamPlayers, setTeamPlayers] = useState(null);
  const [paging, setPaging] = useState(null);

  useEffect(() => {
    searchTeam(searchTerm);
  }, [paging?.current])

  const searchTeam = async (searchTerm) => {
    if (!selectedTeam) {
      const team = await getTeamByName(searchTerm);
      setSelectedTeam(team);
    }

    const teamId = selectedTeam && getTeamId(selectedTeam.team);
    const teamPlayers = await getTeamPlayers(teamId, paging?.current);
    setPaging(teamPlayers.paging);
    setTeamPlayers(teamPlayers.teamPlayers);
  }

  const handleOnChangeText = (text) => setSearchTerm(text);
  const handleOnKeyPress = async (event) => {
    const isEnterKey = event.keyCode === 13
    
    if (!isEnterKey) return;
    else {
      searchTeam(searchTerm);
    }
  }
  const handlePagePickerOnPress = (pageNumber) => () => {
    setPaging({
      ...paging,
      current: pageNumber
    })
  }
  
  return (
    <View>
      {/* App's title */}
      <View style={styles.headerContainer}>
        <AppText fontSize="headerSm">Football Numbers</AppText>
      </View>
      <SearchBar onChange={handleOnChangeText} onKeyPress={handleOnKeyPress} />
      <PlayerList teamPlayers={teamPlayers} />
      <PagePicker activePage={paging?.current} totalPages={paging?.total} onPress={handlePagePickerOnPress} />
    </View>
  );
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
