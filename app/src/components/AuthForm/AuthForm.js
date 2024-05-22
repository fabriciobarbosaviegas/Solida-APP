import React, { useState } from 'react';
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
import { login, signIn } from '../../services/AuthService';
import { useAuth } from '../../contexts/AuthContext';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [type, setType] = useState('');
  const toast = useToast();
  const { login: authLogin } = useAuth();

  const handleSubmit = async () => {
    if (isLogin) {
      try {
        const response = await login(email, password);
        if (response && response.value) {
          authLogin(response.value); 
        } else {
          toast({
            title: "Erro",
            description: "Credenciais inválidas",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Erro",
          description: error.message || "Credenciais inválidas",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
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
      const response = await signIn(name,email, password, type);
        if (response) {
          setIsLogin(true);
        }
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
          <FormControl id="type" isRequired>
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