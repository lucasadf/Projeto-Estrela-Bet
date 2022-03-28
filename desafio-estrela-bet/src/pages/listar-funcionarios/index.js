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
import { useParams } from "react-router-dom";
import { FaEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { padding } from '@mui/system';


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

export const ListarFuncionarios = () => {

    const {id} = useParams();
    const [data, setData] = useState([]);
    let iconStyles = { color: "red", fontSize: "1.5em" };
    let iconFont   = { fontSize: "1.5em" };

    const [status, setStatus] = useState({
      type: '',
      msg: ''
  })

    const getFuncionarios = async () =>{
        fetch("http://localhost/Projects/listar-funcionarios.php?id=" + id)
        .then((response) => response.json())
        .then((responseJson) => {
            setData(responseJson.records)
        });
    }

    useEffect(()=>{
      getFuncionarios();
    },[])

    const apagarFuncionario = async(id) => {
      await fetch("http://localhost/Projects/apagar-funcionario.php?id=" + id)
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
          getFuncionarios();
      }
      }).catch(() => {
      setStatus({
        type: 'erro',
        msg: 'Falha ao remover funcionário!'
      })
      });
    }

    return (
    <Container maxWidth="lg">
        <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h1>Funcionários Cadastrados</h1>
            <div>
                <Link to="/"  style={{ textDecoration: 'none', marginRight: 10}}>
                    <Button variant="outlined" type="button" >
                    Voltar
                    </Button>
                </Link>  
                <Link to={"/cadastrar-funcionarios/" + id}  style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" type="button" >
                  Cadastrar
                  </Button>
                </Link> 
            </div>
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
                <StyledTableCell >CPF</StyledTableCell>
                <StyledTableCell >Nome</StyledTableCell>
                <StyledTableCell >Email</StyledTableCell>
                <StyledTableCell >Telefone</StyledTableCell>
                <StyledTableCell >Endereço</StyledTableCell>
                <StyledTableCell >Editar</StyledTableCell>
                <StyledTableCell >Apagar</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {Object.values(data).map(funcionarios =>(
                <StyledTableRow key={funcionarios.id_funcionario}>
                <StyledTableCell  >{funcionarios.id_funcionario}</StyledTableCell>
                <StyledTableCell  >{funcionarios.cpf_funcionario}</StyledTableCell>
                <StyledTableCell  >{funcionarios.nome_funcionario}</StyledTableCell>
                <StyledTableCell  >{funcionarios.email_funcionario}</StyledTableCell>
                <StyledTableCell  >{funcionarios.telefone_funcionario}</StyledTableCell>
                <StyledTableCell  >{funcionarios.endereco_funcionario}</StyledTableCell>
                <StyledTableCell align='center' size= 'medium'>
                  <Link to={"/editar-funcionarios/" + funcionarios.id_funcionario}><FaRegEdit style={iconFont}/></Link> 
                </StyledTableCell>
                <StyledTableCell align='center' size= 'medium'>
                  <IconButton aria-label="delete" style={iconStyles} onClick={() => apagarFuncionario(funcionarios.id_funcionario)}>
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