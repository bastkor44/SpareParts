
import React from "react"
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {

  return (
    <>
    <BrowserRouter>
      <Header/>
      <MainContents/>
      <Footer/>

    </BrowserRouter>
       
    </>
  )
}

function MainContents(){
  return(
<>
<Routes>
  <Route/>
</Routes>

</>
  
  
  
  
  ) 
}

export default App
