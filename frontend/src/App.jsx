// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
// import './old/App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/loginScreen'

//function App() {
const App = () => {
  return (
    // <>
    //   <Header />
    //   <main className='py-3'>
    //     <Container>
    //       <HomeScreen />
    //     </Container>
    //   </main>
    //   <Footer />
    // </>

    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          {/* route v.6 */}
          <Routes>
            {/* route v.5 */}
            {/* <Route path='/' Component={HomeScreen} /> */}
            <Route path='/login' element={<LoginScreen />} />

            {/* route v.6 */}
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
