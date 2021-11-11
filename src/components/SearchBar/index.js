import { StyleSheet, TextInput, View } from 'react-native-web';

const SearchBar = ({ onChange, onKeyPress }) => {
    return (
        <View>
            <TextInput
              onChangeText={onChange}
              onKeyPress={onKeyPress}
              style={styles.textInput}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
      height: 26,
      borderWidth: 0.5,
      borderColor: '#0f0f0f',
      padding: 4,
    },
});

export default SearchBar;