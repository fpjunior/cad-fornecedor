import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  Share,
  Image,
  FlatList
} from "react-native";
import { Color } from "../constants/theme";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CheckBoxForm from "./CheckBoxForm";
import { useStoreTransaction } from "../store/store";
import { currentMonth, formattedDate, getCurrentTimestamp } from "../helpers";
import { useTransactionContext } from "../context/AppContext";
import { useValidate } from "../helpers/validateForm";
import { formatQuantity } from '../helpers/index';
import ContactSelector from "./Contacts";


// PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
//   title: 'Contatos',
//   message: 'Esse App gostaria de ter acesso a sua lista de contatos',
//   buttonPositive: 'Por favor, aceite',
// })
//   .then((res) => {
//       console.log('Permission: ', res);
//       Contacts.requestPermissionsAsync()
//           .then((contacts: any) => {
//               // work with contacts
//               console.log(contacts);
//           })
//           .catch((e: any) => {
//               console.log(e);
//           });
//   })
//   .catch((error) => {
//       console.error('Permission error: ', error);
//   });

export default function ModalForm() {
  const [sent, setSent] = useState(false);
  const { addTransaction, updateTransaction } = useStoreTransaction();
  const { itemId, objectToEdit, modalVisible, closeModal } =
    useTransactionContext();
  const [checkSelected, setCheckSelected] = useState("");
  const [inputValue, setInputValue] = useState({
    // money: "",
    // description: "",
    nome: "",
    categoria: "",
    telefone: "",
    marca: "",
  });

  //para validar que solo se envie un numero
  // const moneyValue = inputValue.money.replace(/[^0-9]/g, "");

  const errors = useValidate(inputValue, checkSelected);

  const moneyInputRef = useRef<null | TextInput>(null);

  const handleChange = (valueName: string, textValue: string) => {
    setInputValue({ ...inputValue, [valueName]: textValue });
  };

  useEffect(() => {
    
    if (objectToEdit !== null) {
      setInputValue({
        // money: objectToEdit.money,
        // description: objectToEdit.description,
        nome: objectToEdit.nome,
        categoria: objectToEdit.categoria,
        telefone: objectToEdit.telefone,
        marca: objectToEdit.marca,
      });
      setCheckSelected(objectToEdit.transactionType);
    }
    if (!modalVisible) {
      setInputValue({
        // money: "", 
        // description: "",
        nome: "",
        categoria: "",
        telefone: "",
        marca: "",
      });
      setCheckSelected("");
      setSent(false);
    }
  }, [modalVisible]);

  const handleSubmit = () => {
    setSent(true); //para mostrar el error en la pantalla

    if (
      // !inputValue.description ||
      // !inputValue.money ||
      !checkSelected
      // inputValue.money !== moneyValue
    )
      return;

    if (objectToEdit !== null) {
      //si hay un objeto para editar, edito el item.
      updateTransaction(inputValue, itemId, checkSelected);
    } else {
      //sino agrego un item nuevo
      addTransaction(
        inputValue,
        checkSelected,
        getCurrentTimestamp(),
        formattedDate,
        currentMonth
      );
    }

    setInputValue({
      //  money: "",
      //  description: "",
      nome: "",
      categoria: "",
      telefone: "",
      marca: "",
    });
    setCheckSelected("");
    closeModal();
  };

  const handleCheckBox = (value: string) => {
    setCheckSelected(value);
  };

  return (
    <Modal visible={modalVisible} animationType="slide">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.container}>
          <View style={styles.closeModal}>
            <Entypo
              name="cross"
              size={30}
              color={Color.icon}
              onPress={closeModal}
            />
          </View>
          <View style={styles.containerContent}>
            <View>
              <Text style={styles.title}>
                {objectToEdit !== null
                  ? "Editar Fornecedor"
                  : "Cadastrar Fornecedor"}
              </Text>
              {/* INPUT VALOR */}
              {/* <View>
                <TextInput
                  style={styles.inputAmountMoney}
                  placeholder="$10.000.00"
                  selectionColor="#4f80c3"
                  keyboardType="numeric"
                  value={inputValue.money}
                  onChangeText={(textValue) => handleChange("money", textValue)}
                  onSubmitEditing={() => moneyInputRef.current?.focus()}
                />
                {sent && <Text style={styles.errorMoney}>{errors.money}</Text>}
              </View> */}
              {/* <View>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Descriçao"
                    selectionColor="#4f80c3"
                    value={inputValue.description}
                    onChangeText={(textValue) =>
                      handleChange("description", textValue)
                    }
                    ref={moneyInputRef}
                    onSubmitEditing={() => moneyInputRef.current?.focus()}
                  />
                  <Entypo
                    name="list"
                    size={18}
                    color={Color.icon}
                    style={styles.iconListInput}
                  />
                </View>
                {sent && (
                  <Text style={styles.errorDescription}>
                    {errors.description}
                  </Text>
                )}
              </View> */}
              <View><ContactSelector/></View>

              {/* INPUT NOME */}
              <View>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Nome Fornecedor..."
                    selectionColor="#4f80c3"
                    value={inputValue.nome}
                    onChangeText={(textValue) =>
                      handleChange("nome", textValue)
                    }
                    ref={moneyInputRef}
                    onSubmitEditing={() => moneyInputRef.current?.focus()}
                  />
                </View>
                {sent && (
                  <Text style={styles.errorDescription}>
                    {errors.nome}
                  </Text>
                )}
              </View>

              {/* INPUT CATEGORIA */}
              <View>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Categoria do Fornecedor"
                    selectionColor="#4f80c3"
                    value={inputValue.categoria}
                    onChangeText={(textValue) =>
                      handleChange("categoria", textValue)
                    }
                    ref={moneyInputRef}
                    onSubmitEditing={() => moneyInputRef.current?.focus()}
                  />

                </View>
                {sent && (
                  <Text style={styles.errorDescription}>
                    {errors.categoria}
                  </Text>
                )}
              </View>


              <View>
                <CheckBoxForm
                  handleCheckBox={handleCheckBox}
                  checkSelected={checkSelected}
                />
                {sent && <Text style={styles.errorCheck}>{errors.check}</Text>}
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit}>
              <LinearGradient
                start={{ x: 0.1, y: 0 }}
                end={{ x: 1, y: 1.2 }}
                colors={["#4f80c3", "#c661eb", "#ee8183"]}
                style={styles.button}
              >
                <Text style={styles.titleButton}>Agregar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  closeModal: {
    paddingHorizontal: 24,
    alignItems: "flex-end",
    paddingTop: 10,
    marginBottom: 50,
  },
  containerContent: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 0.5,
    marginBottom: 20,
    textAlign: "center",
    color: Color.fontColorPrimary,
    opacity: 0.8,
  },
  inputAmountMoney: {
    height: 40,
    backgroundColor: "#fff",
    width: "70%",
    marginBottom: 40,
    borderRadius: 20,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  input: {
    fontSize: 30,
    backgroundColor: "#fff",
    height: 60,
    marginBottom: 22,
    borderRadius: 10,
    paddingLeft: 40,
    paddingRight: 20,
  },
  iconListInput: {
    position: "absolute",
    top: 12,
    left: 8,
  },
  button: {
    height: 40,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  titleButton: {
    textTransform: "capitalize",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.4,
  },
  errorMoney: {
    position: "absolute",
    bottom: 22,
    fontSize: 12,
    width: "70%",
    alignSelf: "center",
    fontStyle: "italic",
    color: Color.expense,
  },
  errorDescription: {
    position: "absolute",
    bottom: 7,
    fontSize: 12,
    fontStyle: "italic",
    color: Color.expense,
  },
  errorCheck: {
    position: "absolute",
    bottom: 0,
    fontSize: 12,
    fontStyle: "italic",
    color: Color.expense,
  },
});
