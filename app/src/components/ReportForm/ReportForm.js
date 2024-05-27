import React, { useState, useEffect, useRef } from 'react';
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
  Box,
  Image,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { CloseIcon, AddIcon } from '@chakra-ui/icons'; // Importe o ícone de adição

import { createReport } from '../../services/ReportService';

const ReportForm = ({ isOpen, onClose, initialLocation }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const toast = useToast();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setType('');
      setDescription('');
      setImages([]);
      setImagePreviews([]);
    }
  }, [isOpen]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxImageCount = 1;

    let newImages = [];
    let newPreviews = [];

    files.forEach((file) => {
      if (!validImageTypes.includes(file.type)) {
        toast({
          title: "Formato de imagem inválido.",
          description: "Apenas arquivos JPG, PNG e WEBP são permitidos.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      if (images.length + newImages.length < maxImageCount) {
        newImages.push(file);
        newPreviews.push(URL.createObjectURL(file));
      } else {
        toast({
          title: "Limite de imagens atingido.",
          description: `Você pode adicionar no máximo ${maxImageCount} imagens.`,
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
    });

    setImages([...images, ...newImages]);
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const handleImageDelete = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleAddImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    try {
      const reportData = {
        userId,
        category: type,
        cords: initialLocation,
        title,
        description,
        images,
        status: true,
      };

      if (reportData.category !== "" && reportData.title !== "" && reportData.description !== "" && reportData.images.length > 0) {
        const response = await createReport(reportData, token);

        if (response !== 'Report created') {
          throw new Error('Unexpected response from the server');
        }

        toast({
          title: "Denúncia enviada.",
          description: "Sua denúncia foi registrada com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
        window.location.reload();
      }
      else {
        toast({
          title: "Erro",
          description: "Você precisa preencher todos os campos",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        if (reportData.images.length <= 0) {
          toast({
            title: "Erro",
            description: "Você precisa disponibilizar uma imagem para justificarmos sua denúncia.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }

    } catch (error) {
      console.error('Error during creating report', error);
      toast({
        title: "Erro ao enviar denúncia.",
        description: error.message || 'Ocorreu um erro desconhecido.',
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
            <Box mt={4}>
              <Flex flexWrap="wrap">
                {imagePreviews.map((src, index) => (
                  <Box key={index} position="relative" mr={2} mb={2}>
                    <Image src={src} alt={`Preview ${index}`} boxSize="100px" objectFit="cover" />
                    <IconButton
                      icon={<CloseIcon />}
                      aria-label="Excluir imagem"
                      size="sm"
                      onClick={() => handleImageDelete(index)}
                      position="absolute"
                      top={1}
                      right={1}
                    />
                  </Box>
                ))}
                {/* Botão de adicionar imagem */}
                <IconButton
                  icon={<AddIcon />}
                  aria-label="Adicionar imagem"
                  size="lg"
                  fontSize="25px"
                  border="2px dashed"
                  borderColor="gray.200"
                  borderRadius="md"
                  mr={2}
                  mb={2}
                  onClick={handleAddImageClick}
                />
                <input
                  ref={fileInputRef}
                  id="image-upload"
                  type="file"
                  style={{ display: 'none' }}
                  multiple
                  onChange={handleImageChange}
                />
              </Flex>
            </Box>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleSubmit}>
            Enviar
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportForm;
