import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import{Link, useParams} from 'react-router-dom';

export const CadastrarFuncionario = () => {

    const {id} = useParams();
    const [funcionario, setFuncionario] = useState({
        nome_funcionario: '',
        cpf_funcionario: '',
        email_funcionario: '',
        telefone_funcionario: '',
        endereco_funcionario: '',
        id_empresa: ''
      })

      const [status, setStatus] = useState({
        type: '',
        msg: ''
      })

      const valorInput = e => setFuncionario({...funcionario, [e.target.id]:e.target.value});

      const cadastrarFuncionario = async e =>{
        e.preventDefault();
        
        await fetch("http://localhost/Projects/cadastrar-funcionario.php", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id, funcionario})
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
            msg: 'Faltam dados para o cadastro do funcionário!'
          })
        });
      }

      return (
        <Container maxWidth="sm">
          <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h1>Cadastro Funcionários</h1>
            <Link to={"/listar-funcionarios/" + id}  style={{ textDecoration: 'none' }}>
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
          <form onSubmit={cadastrarFuncionario}>
            <TextField id="nome_funcionario" label="Nome" variant="outlined" type="text" margin='dense' fullWidth onChange={valorInput}/>
            <TextField id="cpf_funcionario" label="CPF" variant="outlined" type="text" margin='dense' fullWidth onChange={valorInput}/>
            <TextField id="email_funcionario" label="Email" variant="outlined" type="text" margin='dense' fullWidth onChange={valorInput}/>
            <TextField id="telefone_funcionario" label="Telefone" variant="outlined" type="text" margin='dense' fullWidth onChange={valorInput}/>
            <TextField id="endereco_funcionario" label="Endereço" variant="outlined" type="text" margin='dense' fullWidth onChange={valorInput}/>
            <Button variant="contained" endIcon={<SendIcon />} type="submit">Cadastrar</Button>
          </form>
        </Container>
    
      );
}