import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {IconButton, Modal, Text, useTheme} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';

import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {Svg, Mask, Defs, Rect} from 'react-native-svg';

interface ModalCodeScanProps {
  visible: boolean;
  hideModal: () => void;
  setValueSearch: (value: string) => void;
}

const {width, height} = Dimensions.get('window');

const SCAN_FRAME_WIDTH_RATIO = 0.85;
const SCAN_FRAME_HEIGHT_RATIO = 0.3;

const SCAN_FRAME_WIDTH = width * SCAN_FRAME_WIDTH_RATIO;
const SCAN_FRAME_HEIGHT = height * SCAN_FRAME_HEIGHT_RATIO;
const SCAN_FRAME_X = (width * (1 - SCAN_FRAME_WIDTH_RATIO)) / 2;
const SCAN_FRAME_Y = (height * (1 - SCAN_FRAME_HEIGHT_RATIO)) / 3;

const edgeWidth = 25;
const edgeHeight = 25;
const edgeColor = '#fff';
const edgeBorderWidth = 2;
const edgeRadius = 5;
const edgeRadiusOffset = 8;

const BARCODEPATTERNS =
  '[{"CheckPattern":"^(\\\\(91\\\\))([A-Za-z0-9\\\\-]{10,17})(\\\\(92\\\\))([A-Za-z0-9]{12})$","GetPattern":"[A-Za-z0-9]{12}$"}]';

type ScanResultType = {
  codes: any[];
  frame: any;
};

const ModalCodeScan = (props: ModalCodeScanProps): ReactElement => {
  // const isFocused = useIsFocused();

  const {visible, hideModal, setValueSearch} = props;

  const device: any = useCameraDevice('back');

  const colors = useTheme().colors;

  const styles = createStyles(colors);

  const [isFlashOn, setIsFlashOn] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();

  const [scanResult, setScanResult] = useState<ScanResultType>({
    codes: [],
    frame: null,
  });

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermission();
    })();
  }, []);

  const regionOfInterest = {
    x: (1 - SCAN_FRAME_HEIGHT_RATIO) / 3,
    y: (1 - SCAN_FRAME_WIDTH_RATIO) / 2,
    width: SCAN_FRAME_HEIGHT_RATIO,
    height: SCAN_FRAME_WIDTH_RATIO,
  };

  useEffect(() => {
    if (visible) {
      onClose();
    }
  }, [visible]);

  const onClose = () => {
    setScanResult({
      codes: [],
      frame: null,
    });
  };

  const codeScanner = useCodeScanner({
    codeTypes: [
      'qr',
      'ean-13',
      'code-128',
      'code-39',
      'code-93',
      'codabar',
      'ean-8',
      'itf',
      'upc-e',
      'pdf-417',
      'aztec',
      'data-matrix',
    ],
    regionOfInterest: regionOfInterest,
    onCodeScanned(codes, frame) {
      handleCodeScanned(frame, codes[0]);
    },
  });

  const handleCodeScanned = (frame: any, code: any) => {
    if (Platform.OS === 'android') {
      const xRatio = frame.height / width;
      const yRatio = frame.width / height;

      const [bottomLeft, topLeft, topRight, bottomRight] = code.corners;

      const top = (topLeft.x + topRight.x) / 2;
      const left = (topLeft.y + bottomLeft.y) / 2;
      const right = (topRight.y + bottomRight.y) / 2;
      const bottom = (bottomLeft.x + bottomRight.x) / 2;

      if (
        top < (SCAN_FRAME_X + SCAN_FRAME_WIDTH) * xRatio &&
        right < (SCAN_FRAME_Y + SCAN_FRAME_HEIGHT) * yRatio &&
        bottom > SCAN_FRAME_X * xRatio &&
        left > SCAN_FRAME_Y * yRatio
      ) {
        hideModal();
        setValueSearch(code?.value);

        setIsFlashOn(false);
      }
    } else if (Platform.OS === 'ios') {
      hideModal();
      setValueSearch(code?.value);
    }
  };

  return (
    <Modal visible={visible} onDismiss={hideModal}>
      <View style={styles.modal}>
        <Camera
          device={device}
          isActive={visible}
          style={StyleSheet.absoluteFill}
          torch={isFlashOn ? 'on' : 'off'}
          codeScanner={codeScanner}
        />

        <Svg height="100%" width="100%">
          <Defs>
            <Mask id="mask" x="0" y="0" height="100%" width="100%">
              <Rect height="100%" width="100%" fill="#fff" />

              <Rect
                x={SCAN_FRAME_X}
                y={SCAN_FRAME_Y}
                fill="#000"
                width={SCAN_FRAME_WIDTH}
                height={SCAN_FRAME_HEIGHT}
                rx={10}
                ry={10}
              />
            </Mask>
          </Defs>

          <Rect
            height="100%"
            width="100%"
            fill="rgba(0, 0, 0, 0.6)"
            mask="url(#mask)"
          />

          <View style={styles.scannerFinder}>
            <View style={styles.scannerTopLeft} />
            <View style={styles.scannerTopRight} />
            <View style={styles.scannerBottomLeft} />
            <View style={styles.scannerBottomRight} />
          </View>
        </Svg>

        <View style={styles.headerBtnWrapper}>
          <IconButton icon="camera" size={20} onPress={hideModal} />

          <IconButton
            icon={isFlashOn ? 'flash' : 'flash-off'}
            size={20}
            onPress={() => setIsFlashOn(!isFlashOn)}
          />
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.text}>Đặt mã vạch trong khung</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCodeScan;

const createStyles = (colors: any) =>
  StyleSheet.create({
    modal: {
      //   flex: 1,
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    headerBtnWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      top: Platform.OS === 'android' ? 20 : 40,
      width: '100%',
    },
    scannerFinder: {
      position: 'absolute',
      left: SCAN_FRAME_X,
      top: SCAN_FRAME_Y,
      width: SCAN_FRAME_WIDTH,
      height: SCAN_FRAME_HEIGHT,
    },
    scannerTopRight: {
      position: 'absolute',
      width: edgeWidth,
      height: edgeHeight,
      borderColor: edgeColor,
      borderRightWidth: edgeBorderWidth,
      borderTopWidth: edgeBorderWidth,
      borderTopRightRadius: edgeRadius,
      top: edgeRadiusOffset,
      right: edgeRadiusOffset,
    },
    scannerTopLeft: {
      position: 'absolute',
      width: edgeWidth,
      height: edgeHeight,
      borderColor: edgeColor,
      borderLeftWidth: edgeBorderWidth,
      borderTopWidth: edgeBorderWidth,
      borderTopLeftRadius: edgeRadius,
      top: edgeRadiusOffset,
      left: edgeRadiusOffset,
    },
    scannerBottomRight: {
      position: 'absolute',
      width: edgeWidth,
      height: edgeHeight,
      borderColor: edgeColor,
      borderRightWidth: edgeBorderWidth,
      borderBottomWidth: edgeBorderWidth,
      borderBottomRightRadius: edgeRadius,
      bottom: edgeRadiusOffset,
      right: edgeRadiusOffset,
    },
    scannerBottomLeft: {
      position: 'absolute',
      width: edgeWidth,
      height: edgeHeight,
      borderColor: edgeColor,
      borderLeftWidth: edgeBorderWidth,
      borderBottomWidth: edgeBorderWidth,
      borderBottomLeftRadius: edgeRadius,
      bottom: edgeRadiusOffset,
      left: edgeRadiusOffset,
    },
    textWrapper: {
      alignItems: 'center',
      width: '100%',
      position: 'absolute',
      top: height * 0.15,
    },
    text: {
      color: '#fff',
    },
    selectedScannedCode: {
      marginRight: 16,
      height: 40,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
  });
