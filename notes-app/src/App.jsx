import Errorpage from "./pages/errorPage/Errorpage.jsx"
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx"
import { ToastContainer, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import SearchPage from "./pages/searchPage/SearchPage.jsx";
import NotesPage from "./pages/notesPage/NotesPage.jsx";
import Register from "./pages/register/Register.jsx";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route
              path="search"
              element={<SearchPage />}
            />
            <Route path="" element={<NotesPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>

      </BrowserRouter>
      <ToastContainer
        stacked
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </>
  )
}

export default App
