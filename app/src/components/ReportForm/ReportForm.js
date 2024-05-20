import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';

const ReportForm = ({ isOpen, onClose, onSubmit, initialLocation }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const toast = useToast();

  useEffect(() => {
    // Reseta os campos do formulário quando o modal é aberto
    if (isOpen) {
      setTitle('');
      setType('');
      setDescription('');
      setImages([]);
    }
  }, [isOpen]);

  const handleImageChange = (event) => {
    setImages(event.target.files);
  };

  const handleSubmit = () => {
    onSubmit({
      location: initialLocation,
      title,
      type,
      description,
      images,
    });
    toast({
      title: "Denúncia enviada.",
      description: "Sua denúncia foi registrada com sucesso.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  if (!initialLocation) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastrar Denúncia</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="location" isDisabled>
            <FormLabel>Endereço do ponto</FormLabel>
            <Input type="text" value={`${initialLocation.lat}, ${initialLocation.lng}`} readOnly />
          </FormControl>
          <FormControl id="title" mt={4} isRequired>
            <FormLabel>Título da denúncia</FormLabel>
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl id="type" mt={4} isRequired>
            <FormLabel>Tipo de denúncia</FormLabel>
            <Input type="text" value={type} onChange={(e) => setType(e.target.value)} />
          </FormControl>
          <FormControl id="description" mt={4} isRequired>
            <FormLabel>Descrição da denúncia</FormLabel>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
          <FormControl id="images" mt={4}>
            <FormLabel>Adicionar imagens relacionadas à denúncia</FormLabel>
            <Input type="file" multiple onChange={handleImageChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Enviar
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportForm;
