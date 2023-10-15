import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert, Modal } from "react-native";
import styles from "./style";
import { Picker } from "@react-native-picker/picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { BotaoCadastro } from "../Botao";
import { upload } from '../../supabase/upload';
import { useContextoEquipmente } from '../../hooks';
import LottieView from 'lottie-react-native';
import { Camera, CameraType } from 'expo-camera';
import { FontAwesome } from "@expo/vector-icons"

Icon.loadFont();

export default function Cadastro({ navigation }: any) {
  const [selectedEquipa, setSelectedEquipa] = useState<string>('');
  const [image, setImage] = useState<any>(null);
  const [uploading, setUploading] = useState(false); // Estado para controlar o envio
  const { createEquipment } = useContextoEquipmente();

  const [numero, setNumero] = useState<number | null>(null);
  const [serial, setSerial] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [observacao, setObservacao] = useState<string | null>(null);

  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const camRef = useRef<any | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null)
  const [isCameraVisible, setCameraVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Verificando permissão de câmera...</Text>;
  }

  if (!hasPermission) {
    return <Text>Permissão de câmera não concedida</Text>;
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri)
      setImage(data.uri);
      setCameraVisible(false);
    }

  }
  const showCamera = () => {
    setCameraVisible(true);
  };

  const hideCamera = () => {
    setCameraVisible(false);
  };

  const clearFields = () => {
    setSelectedEquipa('');
    setImage(null);
    setNumero(null);
    setSerial(null);
    setLatitude(null);
    setLongitude(null);
    setObservacao(null);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        -
          setImage(result.assets[0].uri);
      }
    } else {
      Alert.alert("Permissão negada", "Você precisa permitir o acesso à galeria de imagens para adicionar uma imagem.");
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleEquipamentoChange = (equipamento: string) => {
    setSelectedEquipa(equipamento);
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert("Campo obrigatório", "Selecione uma Imagem.");
      return;
    }

    if (!selectedEquipa) {
      Alert.alert("Campo obrigatório", "Selecione um tipo de equipamento.");
      return;
    }

    if (!numero || isNaN(numero)) {
      Alert.alert("Campo obrigatório", "Número deve ser um número válido.");
      return;
    }

    if (!serial) {
      Alert.alert("Campo obrigatório", "IMEI é obrigatório.");
      return;
    }

    if (!latitude || isNaN(latitude)) {
      Alert.alert("Campo obrigatório", "Latitude deve ser um número válido.");
      return;
    }

    if (!longitude || isNaN(longitude)) {
      Alert.alert("Campo obrigatório", "Longitude deve ser um número válido.");
      return;
    }

    if (!observacao) {
      Alert.alert("Campo obrigatório", "Observação deve ser válido.");
      return;
    }

    if (uploading) {
      return;
    }

    setUploading(true);

    try {
      const response = await upload(serial, { uri: image });
      await createEquipment({
        type: selectedEquipa,
        numero: numero,
        serial: serial,
        latitude: latitude,
        longitude: longitude,
        observations: observacao,
        url: response,
        status: true
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar os dados para o banco.");
    } finally {
      clearFields();
      setUploading(false);
      navigation.navigate('Equipamentos');
    }
  }

  console.log(numero);


  return (
    <View style={styles.containerPrincipal}>

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerImagem} >
            {image && <Image source={{ uri: image }} style={styles.image} />}
          </View>

          <View style={styles.containerIcons}>

            <TouchableOpacity style={styles.icons} onPress={pickImage}>
              <Icon name="plus" size={25} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icons} onPress={removeImage}>
              <Icon name="trash" size={25} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icons} onPress={() => setCameraVisible(true)}>
              <Icon name="camera" size={25} color="#000000" />
            </TouchableOpacity>


            <Modal
              visible={isCameraVisible}
              transparent={true}
              animationType="slide"
            >
              <View style={{ width: "100%", height: " 100%" }}>
                <View style={styles.modalContainer}>
                  <Camera type={type} style={styles.camera} ref={camRef}>
                    <View style={styles.containerButtonCamera}>
                          <TouchableOpacity onPress={hideCamera} style={styles.icons}>
                            <FontAwesome name="close" size={30} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.icons}  onPress={toggleCameraType}>
                            <FontAwesome name="exchange" size={30} color="red" />
                          </TouchableOpacity>

                          <TouchableOpacity style={styles.buttonCamera} onPress={takePicture}>
                            <FontAwesome name="camera" size={30} color="#fff" />
                          </TouchableOpacity>

                    </View>

                  </Camera>

                </View>
              </View>
            </Modal>
          </View>
        </View>


        <View style={styles.containerInput}>
          <View style={styles.containerTrans}>
            <Picker
              selectedValue={selectedEquipa}
              onValueChange={handleEquipamentoChange}
              style={styles.picker}
            >
              <Picker.Item label="Equipamento" value="" enabled={false} />
              <Picker.Item label="Transformador" value="Transformador" />
              <Picker.Item label="Poste" value="Poste" />
              <Picker.Item label="Bomba hidráulica" value="Bomba hidráulica" />
            </Picker>
            <TextInput
              placeholder="Número"
              keyboardType="numeric"
              style={styles.input}
              onChangeText={(e: any) => setNumero(e)}
              value={numero !== null ? numero.toString() : ''}
            />
          </View>

          <TextInput
            placeholder="IMEI"
            style={styles.inputInteiro}
            onChangeText={(e: any) => setSerial(e)}
            value={serial || ''}
          />

          <View style={styles.containerLoLa}>
            <Text style={styles.textFont}>Latitude:</Text>
            <TextInput
              placeholder="Latitude"
              keyboardType="numeric"
              style={styles.inputLoLa}
              onChangeText={(e: any) => setLatitude(e)}
              value={latitude !== null ? latitude.toString() : ''}
            />

            <Text style={styles.textFont}>Longitude:</Text>
            <TextInput
              placeholder="Longitude"
              keyboardType="numeric"
              style={styles.inputLoLa}
              onChangeText={(e: any) => setLongitude(e)}
              value={longitude !== null ? longitude.toString() : ''}
            />
          </View>

          <TextInput
            placeholder="Observações"
            style={styles.inputInteiro}
            onChangeText={(e: any) => setObservacao(e)}
            value={observacao || ''}
          />
        </View>

        <View style={styles.containerBotao}>
          <BotaoCadastro handle={uploadImage} />
        </View>


        {uploading && (
          <View style={styles.uploadingAnimation}>
            <LottieView
              autoPlay={true}
              loop={true}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
              }}
              source={require('../../assets/carregando.json')}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}