import { Platform, StyleSheet } from "react-native";
import { neutral } from "./colors";

export const componentStyle = StyleSheet.create({
  textInput: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 16,
    borderColor: neutral.s100,
    backgroundColor: neutral.white, 
    paddingHorizontal: 12,
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 0.5,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
    // elevation: 2,
    ...Platform.select({
        ios: {
            lineHeight: 18
        },
        android: {}
    })
  },

  textInputMultiline: {
    width: "100%",
    borderRadius: 12,
    paddingTop: 14,
    paddingBottom: 14,
    borderColor: neutral.s100,
    backgroundColor: neutral.white, 
    paddingHorizontal: 12,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 0.5,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
    // elevation: 2,
    ...Platform.select({
        ios: {
            lineHeight: 16
        },
        android: {}
    })
  }
});
