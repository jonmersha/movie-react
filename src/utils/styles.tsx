import { StyleSheet } from "react-native";
export const text = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: "center",
    alignContent: "center",
  },
});

export const container = StyleSheet.create({
  bottom: {},
});

export const styles = StyleSheet.create({
  banner: {
    width: 100,
    height: 130,
    resizeMode: "cover",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  details: {
    fontSize: 16,
    color: "#555",
    paddingHorizontal: 16,
  },
  progressContainer: {
    padding: 8,
    marginTop: 8,
  },
  progressText: {
    fontSize: 14,
    color: "#333",
  },
  likesViewsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 4,
  },
  likesViewsText: {
    fontSize: 14,
    color: "#555",
  },
  playButtonText: {
    fontSize: 16,
    color: "#fff",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    overflow: "hidden",
    margin: 12,
    //width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  videoBottom: {
    //height: 50,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
  },

  closeButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  text: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "400",
  },
  circularProgress: {
    position: "absolute",
    // backgroundColor: "purple",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  //   container: {
  //     flex: 1,
  //     justifyContent: "center",
  //     backgroundColor: "#ecf0f1",
  //   },
  video: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
