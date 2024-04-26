import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {useTheme, Text, Icon} from 'react-native-paper';

const ProductCard = (data: any, navigation: any) => {
  const theme = useTheme();

  return (
    <TouchableOpacity style={styles.container}>
      <View
        style={[
          styles.cardContainer,
          {backgroundColor: theme.colors.primaryContainer},
        ]}>
        <Image
          source={data.productImage}
          style={{
            width: '80%',
            height: '80%',
            resizeMode: 'contain',
          }}
        />
        <Text variant="titleLarge"> {data.name}</Text>
        {data.isAvailable ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon source="circle" size={12} color={theme.colors.primary} />

            <Text
              style={{
                fontSize: 12,
                color: theme.colors.primary,
              }}>
              Available
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon source="circle" size={12} color={theme.colors.error} />
            <Text
              style={{
                fontSize: 12,
                color: theme.colors.error,
              }}>
              Unavailable
            </Text>
            <Image
              source={require('../asset/7677205.jpg')}
              style={{
                width: '80%',
                height: '80%',
                resizeMode: 'contain',
              }}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: '40%',
    margin: 18,
    gap: 10,
  },
  cardContainer: {
    borderRadius: 8,
    width: '100%',
    height: 200,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// const ProductCard = ({data}) => {
//     return (
//       <TouchableOpacity
//         onPress={() => navigation.navigate('ProductInfo', {productID: data.id})}
//         style={{
//           width: '48%',
//           marginVertical: 14,
//         }}>
//         <View
//           style={{
//             width: '100%',
//             height: 100,
//             borderRadius: 10,
//             backgroundColor: COLOURS.backgroundLight,
//             position: 'relative',
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginBottom: 8,
//           }}>
//           {data.isOff ? (
//             <View
//               style={{
//                 position: 'absolute',
//                 width: '20%',
//                 height: '24%',
//                 backgroundColor: COLOURS.green,
//                 top: 0,
//                 left: 0,
//                 borderTopLeftRadius: 10,
//                 borderBottomRightRadius: 10,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               <Text
//                 style={{
//                   fontSize: 12,
//                   color: COLOURS.white,
//                   fontWeight: 'bold',
//                   letterSpacing: 1,
//                 }}>
//                 {data.offPercentage}%
//               </Text>
//             </View>
//           ) : null}
//           <Image
//             source={data.productImage}
//             style={{
//               width: '80%',
//               height: '80%',
//               resizeMode: 'contain',
//             }}
//           />
//         </View>
//         <Text
//           style={{
//             fontSize: 12,
//             color: COLOURS.black,
//             fontWeight: '600',
//             marginBottom: 2,
//           }}>
//           {data.productName}
//         </Text>
//         {data.category == 'accessory' ? (
//           data.isAvailable ? (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}>
//               <FontAwesome
//                 name="circle"
//                 style={{
//                   fontSize: 12,
//                   marginRight: 6,
//                   color: COLOURS.green,
//                 }}
//               />
//               <Text
//                 style={{
//                   fontSize: 12,
//                   color: COLOURS.green,
//                 }}>
//                 Available
//               </Text>
//             </View>
//           ) : (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}>
//               <FontAwesome
//                 name="circle"
//                 style={{
//                   fontSize: 12,
//                   marginRight: 6,
//                   color: COLOURS.red,
//                 }}
//               />
//               <Text
//                 style={{
//                   fontSize: 12,
//                   color: COLOURS.red,
//                 }}>
//                 Unavailable
//               </Text>
//             </View>
//           )
//         ) : null}
//         <Text>&#8377; {data.productPrice}</Text>
//       </TouchableOpacity>
//     );
//   };
