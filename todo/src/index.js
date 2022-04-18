import { render } from "react-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Login from "./components/login";
import Logout from "./components/logout";
import Signin from "./components/signin";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="signin" element={<Signin />} />
      <Route path="logout" element={<Logout />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);