
import './App.css';
import { Route,Routes } from 'react-router-dom';
// import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostListpage from './pages/PostListPage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<PostListpage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/write' element={<WritePage/>}/>
        {/* <Route path='/:username/:postId/write' element={<WritePage/>}/> */}
        <Route path='/:username'  element={<PostListpage/>}/>
        <Route path='/:username/:postId' element={<PostPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
