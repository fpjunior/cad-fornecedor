import React from "react";
import { View, Text,   
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  Image, } from "react-native";
import { Color } from "../constants/theme";
import { Transaction } from "../interface/interfaceTransaction";
import { formatQuantity } from "../helpers";

type Prop = {
  item: Transaction;
};

export default function ListItemTransactions({ item }: Prop) {
  const { nome, categoria, transactionType, date } = item;

  return (
    <View style={styles.container}>
      <View style={styles.containerItem}>
        <View style={styles.wrapItemLeft}>
        <TouchableOpacity style={styles.storyUserTouchable}>
                    <Image
                      style={styles.storyUserImage}
                      source={{
                        uri:
                        'https://t4.ftcdn.net/jpg/02/24/86/95/240_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg',
                      }}
                    />
                    <View style={styles.storyPlusIcon}>
                   
                    </View>
                  </TouchableOpacity>
          {/* <View
            style={[
              styles.circleItem,
              {
                backgroundColor:
                  transactionType === "Income" ? Color.income : Color.expense,
              },
            ]}
          >
            <Text style={styles.textCircle}>{nome.charAt(0)}</Text>
          </View> */}
          <View style={styles.wrapTitleEndDate}>
            <Text numberOfLines={1} style={styles.title}>
              {nome}
            </Text>
            <Text style={styles.date}>{categoria}</Text>
          </View>
        </View>
        <View>
          <Text
            style={[
              styles.categoria,
              {
                color:
                  transactionType === "Income" ? Color.income : Color.expense,
              },
            ]}
          >
            {transactionType === "Income" ? "+" : "-"}
            {formatQuantity(Number(categoria))}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  storyUserTouchable: {
    position: 'relative',
  },
  storyUsernameText: {
    marginTop: 4,
  },
  storyUserImage: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  storyPlusIcon: {
    position: 'absolute',
    bottom: -1,
    right: -1,
  },
  container: {
    paddingHorizontal: 24,
  },
  containerItem: {
    backgroundColor: "#fff",
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    height: 80
  },
  circleItem: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapItemLeft: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
  },
  textCircle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#fff",
    fontSize: 20,
  },
  wrapTitleEndDate: {
    flex: 1,
    height: 30,
  },
  title: {
    color: "#000",
    fontWeight: "700",
    letterSpacing: 0.4,
    fontSize: 25,
    textTransform: "capitalize",
    
  },
  date: {
    color: Color.fontColorPrimary,
    fontSize: 18,
    lineHeight: 38,
    letterSpacing: 0.4,
    opacity: 0.8,
    textTransform: "capitalize",
  },
  categoria: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
