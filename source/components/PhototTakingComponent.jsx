import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  Platform,
  Modal,
} from 'react-native';
import {useTheme, Icon} from 'react-native-paper';
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
  useCameraFormat,
} from 'react-native-vision-camera';
import {useSharedValue} from 'react-native-worklets-core';
import {Svg, Defs, Mask, Rect} from 'react-native-svg';
import {useIsFocused} from '@react-navigation/native';
import {crop} from 'vision-camera-cropper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const PhotoTakingComponent = ({
  id,
  name,
  label,
  inputProps,
  value,
  onValueChange,
  rules,
}) => {
  const theme = useTheme();

  const isFocused = useIsFocused();

  const [showModal, setShowModal] = useState(false);
  const [cameraPosition, setCameraPosition] = useState(
    inputProps.frame === 'rectangle' ? 'back' : 'front',
  );
  const [imageData, setImageData] = useState(value);
  const [frameWidth, setFrameWidth] = useState(1920);
  const [frameHeight, setFrameHeight] = useState(1080);
  const [cropRegion, setCropRegion] = useState({
    left: 0,
    top: 0,
    width: 100,
    height: 100,
  });

  const format = useCameraFormat(device, [
    {videoResolution: {width: 1920, height: 1080}},
    {fps: 30},
  ]);

  const cropRegionShared = useSharedValue(undefined);
  const taken = useSharedValue(false);
  const shouldTake = useSharedValue(false);
  // const img = useSharedValue('');

  const device = useCameraDevice(cameraPosition);
  const camera = useRef();

  const handleOpenCamera = () => {
    setShowModal(true);
  };

  const HasRotation = () => {
    let value = false;
    if (Platform.OS === 'android') {
      if (!(frameWidth > frameHeight && width > height)) {
        value = true;
      }
    }
    return value;
  };

  const getFrameSize = () => {
    let width, height;
    if (HasRotation()) {
      width = frameHeight;
      height = frameWidth;
    } else {
      width = frameWidth;
      height = frameHeight;
    }
    return {width: width, height: height};
  };

  const updateFrameSize = (width, height) => {
    if (width != frameWidth && height != frameHeight) {
      setFrameWidth(width);
      setFrameHeight(height);
    }
  };

  const updateCropRegion = () => {
    const size = getFrameSize();
    let region;
    if (size.width > size.height) {
      let regionWidth = 0.7 * size.width;
      let desiredRegionHeight = regionWidth / (85.6 / 54);
      let height = Math.ceil((desiredRegionHeight / size.height) * 100);
      region = {
        left: 15,
        width: 70,
        top: 10,
        height: height,
      };
    } else {
      let regionWidth = 0.8 * size.width;
      let desiredRegionHeight = regionWidth / (85.6 / 54);
      let height = Math.ceil((desiredRegionHeight / size.height) * 100);

      if (inputProps.frame !== 'rectangle') {
        height += 30;
      }

      region = {
        left: 10,
        width: 80,
        top:
          Platform.OS === 'ios'
            ? 30
            : inputProps.frame === 'rectangle'
            ? 30
            : cameraPosition === 'back'
            ? 20
            : 100 - height - 21,
        height: height,
      };
    }
    setCropRegion(region);
    cropRegionShared.value = region;

    // console.log("cropRegionShared.value:",  cropRegionShared.value)
  };

  const updateFrameSizeJS = Worklets.createRunInJsFn(updateFrameSize);
  const setImageDataJS = Worklets.createRunInJsFn(setImageData);
  const setShowModalJS = Worklets.createRunInJsFn(setShowModal);
  const onValueChangeJS = Worklets.createRunInJsFn(onValueChange);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';

    updateFrameSizeJS(frame.width, frame.height);
    if (
      taken.value == false &&
      shouldTake.value == true &&
      cropRegionShared.value != undefined
    ) {
      // console.log('cropRegionShared:', cropRegionShared.value);
      // console.log('frame:', frame.width);
      // console.log('frame:', frame.height);
      // console.log('frame:', frame.);
      const result = crop(frame, {
        cropRegion: cropRegionShared.value,
        saveAsFile: true,
        includeImageBase64: true,
      });

      if (result.path) {
        setImageDataJS(`file://${result.path}`);
        onValueChangeJS(`${id + ' '}.value`, `file://${result.path}`);

        taken.value = true;

        setShowModalJS(false);

        // if (inputProps.frame === 'oval' && inputProps.cameraPosition === 'both') {
        //   setCameraPositionJS('front')
        // }
        // img.value = result.path
        taken.value = false;
      }
      shouldTake.value = false;
    }
  }, []);

  const handleTakePhoto = async () => {
    shouldTake.value = true;
  };

  const handleChangeCamera = () => {
    if (cameraPosition === 'back') {
      setCameraPosition('front');
    } else {
      setCameraPosition('back');
    }
  };

  const getViewBox = () => {
    const frameSize = getFrameSize();
    const viewBox = '0 0 ' + frameSize.width + ' ' + frameSize.height;

    return viewBox;
  };

  useEffect(() => {
    updateCropRegion();
    setImageData(value);
  }, [frameWidth, frameHeight, cameraPosition, inputProps, value]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.photoContainer,
          {
            backgroundColor: theme.colors.surfaceVariant,
            borderColor: theme.colors.onPrimaryContainer,
            borderWidth: imageData ? 0 : 1.5,
          },
        ]}>
        {imageData ? (
          <>
            <Image
              style={[
                styles.imageContainer,
                {
                  resizeMode:
                    inputProps.frame !== 'rectangle' ? 'contain' : null,
                  transform:
                    typeof imageData === 'string'
                      ? cameraPosition === 'front' && Platform.OS === 'android'
                        ? [{rotate: '180deg'}, {scaleX: -1}]
                        : []
                      : [],
                },
              ]}
              source={
                typeof imageData === 'string' ? {uri: imageData} : imageData
              }
            />
            <TouchableOpacity
              style={styles.retakeBtn}
              onPress={() => setShowModal(true)}>
              <View style={styles.btnTextWrapper}>
                <Icon
                  source={'camera-retake'}
                  color={theme.colors.background}
                  size={20}
                />
                <Text style={{color: theme.colors.background}}>Chụp lại</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.emptyImage}
            onPress={() => handleOpenCamera()}>
            <Icon
              source={'camera'}
              size={50}
              color={theme.colors.onPrimaryContainer}
            />
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <View style={styles.modal}>
          <Camera
            isActive={isFocused}
            device={device}
            ref={camera}
            style={StyleSheet.absoluteFill}
            format={format}
            frameProcessor={frameProcessor}
            photo={true}
          />

          <Svg height="100%" width="100%">
            <Defs>
              <Mask id="mask" x="0" y="0" height="100%" width="100%">
                <Rect height="100%" width="100%" fill="#fff" />

                <Svg
                  preserveAspectRatio={'xMidYMid slice'}
                  style={StyleSheet.absoluteFill}
                  viewBox={getViewBox()}>
                  <Rect
                    x={(cropRegion.left / 100) * getFrameSize().width}
                    y={(cropRegion.top / 100) * getFrameSize().height}
                    width={(cropRegion.width / 100) * getFrameSize().width}
                    height={(cropRegion.height / 100) * getFrameSize().height}
                    rx={inputProps.frame === 'rectangle' ? 10 : '45%'}
                    ry={inputProps.frame === 'rectangle' ? 10 : '45%'}
                  />
                </Svg>
              </Mask>
            </Defs>

            <Rect
              height="100%"
              width="100%"
              fill="rgba(0, 0, 0, 0.6)"
              mask="url(#mask)"
            />

            <Svg
              preserveAspectRatio={'xMidYMid slice'}
              style={StyleSheet.absoluteFill}
              viewBox={getViewBox()}>
              <Rect
                x={(cropRegion.left / 100) * getFrameSize().width}
                y={(cropRegion.top / 100) * getFrameSize().height}
                width={(cropRegion.width / 100) * getFrameSize().width}
                height={(cropRegion.height / 100) * getFrameSize().height}
                strokeWidth="7"
                stroke="#fff"
                fill="transparent"
                rx={inputProps.frame === 'rectangle' ? 10 : '45%'}
                ry={inputProps.frame === 'rectangle' ? 10 : '45%'}
              />
            </Svg>
          </Svg>

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setShowModal(false)}>
            <Icon source="close" color="#fff" size={30} />
          </TouchableOpacity>

          <View style={styles.titleWrapper}>
            {inputProps.frame === 'rectangle' ? (
              <AntDesign name="idcard" size={40} color="#fff" />
            ) : (
              <MaterialCommunityIcons
                name="face-recognition"
                size={40}
                color="#fff"
              />
            )}

            <Text style={styles.title}>
              {inputProps.frame === 'rectangle'
                ? 'Vui lòng chụp CCCD/CMND trong khung'
                : 'Vui lòng chụp khuôn mặt trong khung'}
            </Text>
          </View>

          <View style={styles.takePhotoWrapper}>
            {inputProps.frame === 'oval' && (
              <View style={styles.invisibleView} />
            )}

            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 50,
                borderColor: '#fff',
                borderWidth: 1,
              }}
              onPress={handleTakePhoto}>
              <View
                style={{
                  backgroundColor: '#fff',
                  height: 60,
                  width: 60,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>

            {inputProps.frame === 'oval' && (
              <TouchableOpacity
                style={styles.changeCameraBtn}
                onPress={handleChangeCamera}>
                <Ionicons
                  name="camera-reverse-outline"
                  color={'#fff'}
                  size={25}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PhotoTakingComponent;

const styles = StyleSheet.create({
  container: {
    gap: 15,
    paddingHorizontal: 10,
  },

  labelWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  label: {
    fontWeight: '500',
    fontSize: 16,
  },

  error: {
    fontSize: 16,
    color: '#cc0000',
  },

  photoContainer: {
    borderRadius: 8,
    height: height * 0.3,
    overflow: 'hidden',
    borderStyle: 'dashed',
  },

  emptyImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: {
    height: height * 0.3,
    width: '100%',
    borderRadius: 8,
  },

  retakeBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: 'flex-end',
  },

  btnTextWrapper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  modal: {
    flex: 1,
  },

  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 20 : 40,
    left: 10,
  },

  takePhotoWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 20,
    alignItems: 'center',
    gap: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  titleWrapper: {
    position: 'absolute',
    top: 50,
    width: '80%',
    left: (width - 0.8 * width) / 2,
    alignItems: 'center',
    gap: 10,
  },

  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },

  invisibleView: {
    width: 55,
    height: 55,
  },

  changeCameraBtn: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});
