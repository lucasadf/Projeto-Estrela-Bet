import React from 'react';
import {Routes, Route} from 'react-router-dom'
import {Home} from './pages/home'
import {CadastrarEmpresa} from './pages/cadastrar'
import {ListarFuncionarios} from './pages/listar-funcionarios'
import {EditarEmpresa} from './pages/editar'
import {CadastrarFuncionario} from './pages/cadastrar-funcionarios'
import {EditarFuncionario} from './pages/editar-funcionarios'

function App() {
return (
    <div>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cadastrar-empresas" element={<CadastrarEmpresa/>}/>
          <Route path="/listar-funcionarios/:id" element={<ListarFuncionarios/>}/>
          <Route path="/editar-empresas/:id" element={<EditarEmpresa/>}/>
          <Route path="/cadastrar-funcionarios/:id" element={<CadastrarFuncionario/>}/>
          <Route path="/editar-funcionarios/:id" element={<EditarFuncionario/>}/>
      </Routes>
    </div>
  );
}

export default App;
