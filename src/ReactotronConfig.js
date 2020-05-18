import Reactotron from "reactotron-react-js";
import { reactotronRedux } from "reactotron-redux";
import sagaPlugin from "reactotron-redux-saga";
const reactotron = Reactotron.configure({ name: "React JS" })
  .use(reactotronRedux())
  .use(sagaPlugin())
  .connect();

export default reactotron;
