import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const setHight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;
export default { setHight, setWidth };