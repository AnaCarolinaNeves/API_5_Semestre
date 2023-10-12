import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    imageCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 10
    },
    container: {
        backgroundColor: '#4DB9DB',
        width: '100%',
        height: '100%',
    },
    imageSize: {
        width: 100,
        height: 100,
        marginTop: 20
    },
    inputWrapper: {
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
    inputLogin: {
        paddingLeft: 15,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        width: "85%",
        marginTop: 10
    },
    returnImage: {
        width: 30,
        height: 30,
        marginLeft: 7, 
        marginTop: 10 
    }
});

export default styles;