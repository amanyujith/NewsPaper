import { Provider } from 'react-redux'
import './App.css'
import Home from './Home'
import store ,{persistor}from '../store/store'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import User from './User'
import Admin from './Admin'
import { PersistGate } from 'redux-persist/integration/react'
// import Liked from './Liked'
import AdminSaved from './AdminSaved'
import AdminLiked from './AdminLiked'
import AdminDisliked from './AdminDisliked'
import AdminFeedback from './AdminFeedback'
import { InfinitySpin } from 'react-loader-spinner'

function App() {

  return (
    
    <Provider store={store}>
      <PersistGate loading={<InfinitySpin/>} persistor={persistor}>
      <Router>
        <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/user' element={<User/>}/>
     <Route path='/admin' element={<Admin/>}/>
     {/* <Route path='/like' element={<Liked/>}/> */}
     <Route path='/saved/:user' element={<AdminSaved/>}/>
     <Route path='/liked/:user' element={<AdminLiked/>}/>
     <Route path='/disliked/:user' element={<AdminDisliked/>}/>
     <Route path='/feedback/:user' element={<AdminFeedback/>}/>
     </Routes>
     </Router>
     </PersistGate>
     </Provider>  
     
    )
}

export default App
