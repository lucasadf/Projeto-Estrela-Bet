import React, { useState, useEffect } from 'react';
import { Button, Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import{Link} from 'react-router-dom';
import { useParams } from "react-router-dom";

export const EditarEmpresa = () => {

    const {id} = useParams();
    const [nome_empresa, setNomeEmpresa]         = useState('');
    const [cnpj_empresa, setCnpjEmpresa]         = useState('');
    const [email_empresa, setEmailEmpresa]       = useState('');
    const [telefone_empresa, setTelefoneEmpresa] = useState('');
    const [endereco_empresa, setEnderecoEmpresa] = useState('');

    const [status, setStatus] = useState({
        type: '',
        msg: ''
    })

    const edita = async e => {
        e.preventDefault();
        await fetch("http://localhost/Projects/editar.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({id, nome_empresa, cnpj_empresa, email_empresa, telefone_empresa, endereco_empresa})
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
        const getEmpresa = async () =>{
            fetch("http://localhost/Projects/visualizar.php?id=" + id)
            .then((response) => response.json())
            .then((responseJson) => {
                setNomeEmpresa(responseJson.nome_empresa);
                setCnpjEmpresa(responseJson.cnpj_empresa);
                setEmailEmpresa(responseJson.email_empresa);
                setTelefoneEmpresa(responseJson.telefone_empresa);
                setEnderecoEmpresa(responseJson.endereco_empresa);
            })
        }
        getEmpresa();
        },[id]);


    return(
        <Container maxWidth="sm">
        <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h1>Editar Empresa</h1>
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
        <form onSubmit={edita}>
          <TextField id="nome_empresa" label="Nome" variant="outlined" type="text" margin='dense' fullWidth value={nome_empresa} onChange={e => setNomeEmpresa(e.target.value)}/>
          <TextField id="cnpj_empresa" label="CNPJ" variant="outlined" type="text" margin='dense' fullWidth value={cnpj_empresa} onChange={e => setCnpjEmpresa(e.target.value)}/>
          <TextField id="email_empresa" label="Email" variant="outlined" type="text" margin='dense' fullWidth value={email_empresa} onChange={e => setEmailEmpresa(e.target.value)}/>
          <TextField id="telefone_empresa" label="Telefone" variant="outlined" type="text" margin='dense' fullWidth value={telefone_empresa} onChange={e => setTelefoneEmpresa(e.target.value)}/>
          <TextField id="endereco_empresa" label="Endereço" variant="outlined" type="text" margin='dense' fullWidth value={endereco_empresa} onChange={e => setEnderecoEmpresa(e.target.value)}/>
          <Button variant="contained" endIcon={<SendIcon />} type="submit">Salvar</Button>
        </form>
      </Container>
    );
}