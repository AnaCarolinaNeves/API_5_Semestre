import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import styles from "./style";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../../contexts";

function NavBar({ navigation }: any) {

  const element = <FontAwesomeIcon icon={faUser} />;
  const { authenticated, logout, typeCor } = useContext(AuthContext);
  const [ confirm, setConfirm ] = useState(false)

  function alertSair() {
  
    Alert.alert("Sair", `Você deseja sair?`, [
      {
        text: 'NÃO',
        onPress: (e) => {
          setConfirm(false)
        },
      },
      {
        text: 'SIM',
        onPress: (e) => {
          setConfirm(true)
          logout()
        },
      },
    ])
}

 
  
  return (
    <>
    {authenticated ?  <View>
    <LinearGradient
        colors={typeCor}
        // colors={['#3B8FA8', '#4DB9DB', '#92CFE1']}
        style={styles.gradient}
      >
      <View style={styles.container}>
        <View style={styles.containerCompany}>
          <Image source={require('../../assets/iconCompany.png')} style={styles.icon}/>
          <View style={styles.textContainer}>
            <Text style={styles.textfont}>EMPRESA</Text>
            <Text style={styles.textfont}>Gestão de Equipamentos</Text>
          </View>
        </View>
        <View style={styles.containerPeople}>
        <TouchableOpacity
                onPress={() => alertSair()}
                style={styles.containerPeople}
            >
              <Image source={require('../../assets/sign-out.png')} style={styles.iconSignOut} />
              <Text>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
      {/* <View style={styles.linhaPontilhada} /> */}
  </View>:null}

  </>
  );
}

export default React.memo(NavBar);