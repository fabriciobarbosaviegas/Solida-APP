import React, { useState } from 'react';
import { Login } from '../../services/auth/apiauth';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Select,
} from '@chakra-ui/react';
import { Create } from '../../services/report/report';

const AuthForm = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [type, setType] = useState('');
  const toast = useToast();

  const handleSubmit = async () => {
    const response = await Login( email, password);
    if(!response) {
      toast({
        title: "Erro",
        description: "Login falhou meio cringe",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      console.log(response);
      localStorage.setItem("token", response.value);
      localStorage.setItem("id", response.userId);
     // console.log(localStorage.getItem("token"));
     // console.log(localStorage.getItem("id"));
      //const tmp = await Create(localStorage.getItem("id"), "i", "i", "i", "i", "i", "i");
      //console.log(tmp);
    }
    if (isLogin) {
      onLogin({ email, password });
    } else {
      if (password !== confirmPassword) {
        toast({
          title: "Erro",
          description: "As senhas não coincidem",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      onSignup({ email, password });
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg">
      <VStack spacing={4}>
        {!isLogin && (
          <FormControl id="nome" isRequired>
            <FormLabel>Nome Completo</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
        )}
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Senha</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        {!isLogin && (
          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirmar Senha</FormLabel>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </FormControl>
        )}
        {!isLogin && (
          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Tipo:</FormLabel>
            <Select placeholder="Selecione o tipo" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="0">Morador</option>
              <option value="1">Força de Segurança</option>
            </Select>
          </FormControl>
        )}
        <Button colorScheme="red" onClick={handleSubmit}>
          {isLogin ? 'Login' : 'Cadastrar'}
        </Button>
        <Text>
          {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
          <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Cadastrar' : 'Login'}
          </Button>
        </Text>
      </VStack>
    </Box>
  );
};

export default AuthForm;
