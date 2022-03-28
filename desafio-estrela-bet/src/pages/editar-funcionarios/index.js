import React, { useState, useEffect } from 'react';
import { Button, Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import{Link} from 'react-router-dom';
import { useParams } from "react-router-dom";

export const EditarFuncionario = () => {

    const {id} = useParams();
    const [nome_funcionario, setNomeFuncionario]         = useState('');
    const [cpf_funcionario, setCpfFuncionario]           = useState('');
    const [email_funcionario, setEmailFuncionario]       = useState('');
    const [telefone_funcionario, setTelefoneFuncionario] = useState('');
    const [endereco_funcionario, setEnderecoFuncionario] = useState('');
    const [id_empresa, setIdEmpresa]                     = useState('');

    const [status, setStatus] = useState({
        type: '',
        msg: ''
    })

    const edita = async e => {
        e.preventDefault();
        await fetch("http://localhost/Projects/editar-funcionario.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({id, nome_funcionario, cpf_funcionario, email_funcionario, telefone_funcionario, endereco_funcionario})
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
            msg: 'Falha ao remover empresa!'
          })
        });
    }

    useEffect(() => {
        const getFuncionario = async () =>{
            fetch("http://localhost/Projects/visualizar-funcionario.php?id=" + id)
            .then((response) => response.json())
            .then((responseJson) => {
                setNomeFuncionario(responseJson.nome_funcionario);
                setCpfFuncionario(responseJson.cpf_funcionario);
                setEmailFuncionario(responseJson.email_funcionario);
                setTelefoneFuncionario(responseJson.telefone_funcionario);
                setEnderecoFuncionario(responseJson.endereco_funcionario);
                setIdEmpresa(responseJson.id_empresa);
            })
        }
        getFuncionario();
        },[id]);

    return(
        <Container maxWidth="sm">
          <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h1>Editar Funcionário</h1>
            <Link to={"/listar-funcionarios/" + id_empresa}  style={{ textDecoration: 'none' }}>
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
          <form onSubmit={edita}>
            <TextField id="nome_funcionario" label="Nome" variant="outlined" type="text" margin='dense' fullWidth value={nome_funcionario} onChange={e => setNomeFuncionario(e.target.value)}/>
            <TextField id="cpf_funcionario" label="CPF" variant="outlined" type="text" margin='dense' fullWidth value={cpf_funcionario} onChange={e => setCpfFuncionario(e.target.value)}/>
            <TextField id="email_funcionario" label="Email" variant="outlined" type="text" margin='dense' fullWidth value={email_funcionario} onChange={e => setEmailFuncionario(e.target.value)}/>
            <TextField id="telefone_funcionario" label="Telefone" variant="outlined" type="text" margin='dense' fullWidth value={telefone_funcionario} onChange={e => setTelefoneFuncionario(e.target.value)}/>
            <TextField id="endereco_funcionario" label="Endereço" variant="outlined" type="text" margin='dense' fullWidth value={endereco_funcionario} onChange={e => setEnderecoFuncionario(e.target.value)}/>
            <Button variant="contained" endIcon={<SendIcon />} type="submit">Salvar</Button>
          </form>
      </Container>
    );
}