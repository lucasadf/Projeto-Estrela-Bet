import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import{Link} from 'react-router-dom';
import { Button, Container } from '@mui/material';
import { FaEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[600],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const Home = () => {

  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: '',
    msg: ''
})

  const getEmpresas = async () => {
    fetch("http://localhost/Projects/index.php")
    .then((response) => response.json())
    .then((responseJson) => (
      setData(responseJson.records)
    ));
  }

  useEffect(()=>{
    getEmpresas();
  },[])

  const apagarEmpresa = async(id) => {
    await fetch("http://localhost/Projects/apagar.php?id=" + id)
    .then((response) => response.json())
    .then((responseJson) =>{
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
        getEmpresas();
    }
    }).catch(() => {
    setStatus({
      type: 'erro',
      msg: 'Falha ao remover empresa!'
    })
    });
  }

  let iconStyles = { color: "red", fontSize: "1.5em" };
  let iconFont   = { fontSize: "1.5em" };

  return (
    <Container maxWidth="lg">
      <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Empresas Cadastradas</h1>
        <Link to="/cadastrar-empresas"  style={{ textDecoration: 'none' }}>
          <Button variant="outlined" type="button" >
            Cadastrar
          </Button>
        </Link>
      </div>
      {status.type === 'erro'? <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{status.msg}</Alert>
            </Stack> : ""}
        {status.type === 'success'? <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success">{status.msg}</Alert>
            </Stack> : ""}
            <div style={{marginBottom: 10}}></div>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell >CNPJ</StyledTableCell>
              <StyledTableCell >Nome</StyledTableCell>
              <StyledTableCell >Email</StyledTableCell>
              <StyledTableCell >Telefone</StyledTableCell>
              <StyledTableCell >Endereço</StyledTableCell>
              <StyledTableCell align='center' >Visualizar</StyledTableCell>
              <StyledTableCell align='center'>Editar</StyledTableCell>
              <StyledTableCell >Deletar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(data).map(empresas =>(
              <StyledTableRow key={empresas.id}>
                <StyledTableCell>{empresas.id}</StyledTableCell>
                <StyledTableCell>{empresas.cnpj_empresa}</StyledTableCell>
                <StyledTableCell>{empresas.nome_empresa}</StyledTableCell>
                <StyledTableCell>{empresas.email_empresa}</StyledTableCell>
                <StyledTableCell>{empresas.telefone_empresa}</StyledTableCell>
                <StyledTableCell>{empresas.endereco_empresa}</StyledTableCell>
                <StyledTableCell 	align='center' size= 'medium'>
                  <Link to={"/listar-funcionarios/" + empresas.id}><FaEye style={iconFont}/></Link>
                </StyledTableCell>
                <StyledTableCell align='center' size= 'medium'>
                  <Link to={"/editar-empresas/" + empresas.id}><FaRegEdit style={iconFont}/></Link> 
                </StyledTableCell>
                <StyledTableCell align='center' size= 'medium'>
                  <IconButton aria-label="delete" style={iconStyles} onClick={() => apagarEmpresa(empresas.id)}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}