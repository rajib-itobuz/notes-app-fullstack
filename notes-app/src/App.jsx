import Errorpage from "./pages/errorPage/Errorpage.jsx"
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx"
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import SearchPage from "./pages/searchPage/SearchPage.jsx";
import NotesPage from "./pages/notesPage/NotesPage.jsx";
import Card from "./pages/temp/card.jsx";
import TempPage from "./pages/temp/tempPage.jsx";


function App() {

  return (
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
        <Route path="*" element={<Errorpage />} />
        <Route path="/card" element={<TempPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
