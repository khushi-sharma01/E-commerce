import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100%",
    height: "100vh",
    fontFamily: "kanit",
    justifyContent: "center",
    alignItems: "center",
    background: "#ecf0f1",
  },
  box: {
    width: 600,
    height: 300,
    background: "#CAF6F8",
    borderRadius: 10,
    padding: 25,
  },

  boxDisplay: {
    width: 600,
    height: "auto",
    background: "#CAF6F8",
    borderRadius: 10,
    padding: 25,
  },
});
