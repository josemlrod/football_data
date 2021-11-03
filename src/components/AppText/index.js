import { Text } from 'react-native-web';

/*
    * Font sizes 
    *
    * headerLg: 64px
    * headerMd: 48px
    * headerSm: 32px
    *
    * textLg: 18px
    * textMd: 14px
    * textSm: 10px
*/

const FontSizes = Object.freeze({
    headerLg: 64,
    headerMd: 48,
    headerSm: 32,
    textLg: 18,
    textMd: 14,
    textSm: 10,
});

const AppText = ({ children, fontSize, styles }) => {
    const AppTextStyleProps = {
        fontSize: FontSizes[fontSize],
        styles,
    };
    
    return (
        <Text style={AppTextStyleProps}>
          {children}
        </Text>
    );
}

export default AppText;
