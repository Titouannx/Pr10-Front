import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/Sign-in';
import User from './pages/User';
import { Provider } from 'react-redux';
import { store } from './store';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App;
