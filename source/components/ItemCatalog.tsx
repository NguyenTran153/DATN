import React, { ReactElement, useEffect, useMemo, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

const {width} = Dimensions.get('screen');

interface Item {
    source: any;
    AirtimeServiceGroupName: string;
}

interface ItemCatalogProps {
    item: Item;
    index: number;
    handleNavigation: () => void;
}

const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
};

const getDistinctColor = (index: number) => {
    const hue = (index * 137.5) % 360;
    return hslToHex(hue, 70, 80);
};

const ItemCatalog = (props: ItemCatalogProps): ReactElement => {
    const {
        item,
        index,
        handleNavigation,
    } = props;

    const colors = useTheme().colors;
    

    const fixedBackgroundColor = useMemo(() => getDistinctColor(index), [index]);

    const styles = useMemo(() => createStyles(colors, fixedBackgroundColor), [colors, fixedBackgroundColor]);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    return (
        <Animated.View style={{ ...styles.wrapper, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <View style={styles.wrapView}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={handleNavigation} style={styles.button}>
                        <Image source={item.source} style={styles.image} />
                    </TouchableOpacity>
                    <Text numberOfLines={2} style={styles.text}>
                        {item?.AirtimeServiceGroupName}
                    </Text>
                </View>
            </View>
        </Animated.View>
    );
};

export default ItemCatalog;

const createStyles = (colors: any, fixedBackgroundColor: string) =>
    StyleSheet.create({
        wrapper: {
            alignItems: 'center',
        },
        container: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        button: {
            width: 80,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            borderRadius: 20,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            shadowColor: colors.shadow,
            backgroundColor: fixedBackgroundColor,
        },
        image: {
            width: 55,
            height: 55,
        },
        text: {
            marginTop: 10,
            textAlign: 'center',
            width: 70,
            color: colors.onSurface,
            fontSize: 12,
            fontWeight: '500',
        },
        wrapView: {
            width: width * 1 / 3,
            marginTop: 5
        }
    });
