import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import{Link} from 'react-router-dom';

export const CadastrarEmpresa = () => {

  const [empresa, setEmpresa] = useState({
    nome_empresa: '',
    cnpj_empresa: '',
    email_empresa: '',
    telefone_empresa: '',
    endereco_empresa: ''
  })

  const [status, setStatus] = useState({
    type: '',
    msg: ''
  })

  const valorInput = e => setEmpresa({...empresa, [e.target.id]:e.target.value});

  const cadastrarEmpresa = async e =>{
    e.preventDefault();
    
    await fetch("http://localhost/Projects/cadastrar.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({empresa})
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.erro){
        setStatus({
          type: 'erro',
          msg: responseJson.msg
        });
      }else{
          setStatus({
            type: 'success',
            msg: responseJson.msg
        });
      }
    }).catch(() => {
      setStatus({
        type: 'erro',
        msg: 'Faltam dados para o cadastro da empresa!'
      })
    });
  }

  return (
    <Container maxWidth="sm">
      <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Cadastro Empresas</h1>
        <Link to="/"  style={{ textDecoration: 'none' }}>
          <Button variant="outlined" type="submit">
            Voltar
          </Button>
        </Link>
      </div>
      {status.type === 'erro'? <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">{status.msg}</Alert>
        </Stack> : ""}
      {status.type === 'success'? <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success">{status.msg}</Alert>
        </Stack> : ""}
      <form onSubmit={cadastrarEmpresa}>
        <TextField id="nome_empresa" label="Nome" variant="outlined" type="text" margin='dense' fullWidth onChange={valorInput}/>
        <TextField id="cnpj_empresa" label="CNPJ" variant="outlined" type="text" margin='dense' fullWidth onChange={valorInput}/>
        <TextField id="email_empresa" label="Email" variant="outlined" type="text" margin='dense' fullWidth onChange={valorInput}/>
        <TextField id="telefone_empresa" label="Telefone" variant="outlined" type="text" margin='dense' fullWidth onChange={valorInput}/>
        <TextField id="endereco_empresa" label="Endereço" variant="outlined" type="text" margin='dense' fullWidth onChange={valorInput}/>
        <Button variant="contained" endIcon={<SendIcon />} type="submit">Cadastrar</Button>
      </form>
    </Container>
  );
}