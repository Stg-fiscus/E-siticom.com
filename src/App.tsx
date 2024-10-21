import { store } from "@store/store";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { theme } from "./antd-theme";
import "./index.css";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <div className="text-base">
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <AppRoutes />
          {/* <OrderTest /> */}
        </ConfigProvider>
      </Provider>
    </div>
  );
}
export default App;
