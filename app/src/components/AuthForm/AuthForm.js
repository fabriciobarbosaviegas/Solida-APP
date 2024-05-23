import React, { useState, useRef } from 'react';
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
  Avatar,
  Center,
  Heading
} from '@chakra-ui/react';
import { login, signIn } from '../../services/AuthService';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../assets/logo.png'

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [type, setType] = useState('');
  const toast = useToast();
  const { login: authLogin } = useAuth();
  const [image, setImage] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef(null);
  const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && validImageTypes.includes(file.type)) {
    setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Formato de imagem inválido",
        description: "Por favor, envie outra imagem.",
        status: "error",
        duration: 5000,
        isClosable: true
      })
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
  
  const handleSubmit = async () => {
    if (isLogin) {
      try {
        const response = await login(email, password);
        if (response && response.value && (email !== '' || password !== '')) {
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
    } 
    else {
      if(password === '' || name === '' || email === '' || type === ''){
        toast({
          title: "Erro",
          description: "Todos os campos devem ser preenchidos",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
        return;
      }
      if(!email.includes('@')){
        toast({
          title: "Erro",
          description: "Forneça um endereço de email válido.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
        return;
      }
      if(image.length <= 0){
        toast({
          title: "Erro",
          description: "Você deve adicionar uma foto de perfil.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
        return;
      }
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
      const response = await signIn(name, email, password, type, image);
      if (response && response !== "Email already registred") {
        setIsLogin(true);
      }
      else{
        toast({
          title: "Erro",
          description: "Esse email já está cadastrado! Faça login ou tente outro.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg">
      <Center mb={5}>
        <Avatar src={Logo} size='lg' mr={4}></Avatar>
        <Heading as='h1' size='2xl' noOfLines={1}>
          Solida APP
        </Heading>
      </Center>
      <VStack spacing={4}>
        {!isLogin&& (
          <FormControl id="profileImage" isRequired mb={5}>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: 'none' }}
              accpet=".jpg,.png,.jpeg,.webp"
            />
            <Box onClick={handleAvatarClick} cursor="pointer">
              <Center>
                <Avatar src={imageUrl} size="xl" mt={4}/>
              </Center>
              <Center>
                <Text>Clique para adicionar sua foto!</Text>
              </Center>
            </Box>
          </FormControl>
        )}
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