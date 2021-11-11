import { Pressable, StyleSheet, Text, View } from 'react-native-web';

const PagePicker = ({ activePage, onPress, totalPages, }) => {
    let pageViews = [];

    for (let i = 0; i < totalPages; i++) {
        pageViews.push(PageNode({ activePage, onPress, pageNumber: i + 1 }));
    }

    return( 
        <View style={styles.root}>
            {pageViews}
        </View>
    )
};

const PageNode = ({ activePage, onPress, pageNumber }) => {
    const isActivePage = activePage === pageNumber;
    
    return(
        <Pressable 
            style={styles.pageContainer}
            onPress={isActivePage ? undefined : onPress(pageNumber)}
        >
            <Text>
                {pageNumber}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },

    root: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5,
    },
  });

export default PagePicker;