import React from "react";
import { ScrollView, TextInput, View, Image, TouchableOpacity } from "react-native";
import styles from "./style";
import { BotaoAtualizarUsuario } from "../Botao";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text } from "react-native";
import User from "../../services/User";

export default function Perfil({ navigation }: any) {
    return(
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Equipamentos')}
                style={styles.returnImage}
            >
                <Image
                    source={require('../../assets/baseline_arrow_back_24.png')}
                    fadeDuration={0}
                    style={styles.returnImage}
                />
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.imageCenter}>
                    <Image source={require('../../assets/iconPeople.png')} style={styles.imageSize} />
                </View>
                <View>
                    <View style={styles.inputWrapper}>
                        {/* <Text>{User.name}</Text> */}
                        <TextInput
                            placeholder="Nome completo"
                            style={styles.inputLogin}
                        />
                    </View>
                    {/* <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="SOBRENOME"
                            style={styles.inputLogin}
                            placeholderTextColor="#000000"
                        />
                    </View> */}
                    <View style={styles.inputWrapper}>
                        {/* <Text>{users.userEmail}</Text> */}
                        <TextInput
                            placeholder="CPF"
                            style={styles.inputLogin}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        {/* <Text>{users.userEmail}</Text> */}
                        <TextInput
                            placeholder="E-mail"
                            style={styles.inputLogin}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Senha"
                            style={styles.inputLogin}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Telefone"
                            style={styles.inputLogin}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Matrícula"
                            style={styles.inputLogin}
                        />
                    </View>
                </View>
                <BotaoAtualizarUsuario/>
            </ScrollView>
        </View>
    )
}