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
} from '@chakra-ui/react';

const AuthForm = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();

  const handleSubmit = () => {
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
