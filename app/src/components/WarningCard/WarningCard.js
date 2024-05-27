import React, { useState, useEffect } from 'react';
import { Box, Text, Card, Button, CardBody, CardFooter, Stack, Heading, Center, useToast } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { deleteReport } from '../../services/ReportService';
import { createVolunteer, deleteVolunteerByUserIdAndReportId } from '../../services/VolunteerService';

const WarningCard = ({ reportId, title, ImgSrc, text, myReports, mapPin }) => {
  const toast = useToast();
  const userId = localStorage.getItem('userId');
  const [isVolunteered, setIsVolunteered] = useState(false);

  useEffect(() => {
    // Fetch the volunteer status from localStorage
    const volunteerStatus = localStorage.getItem(`volunteerStatus_${userId}_${reportId}`);
    if (volunteerStatus === 'true') {
      setIsVolunteered(true);
    } else {
      setIsVolunteered(false);
    }
  }, [userId, reportId]);

  const handleDelete = async () => {
    try {
      await deleteReport(reportId);
      toast({
        title: 'Denúncia resolvida',
        description: 'Essa ação será apagada.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      window.location.reload();
    } catch (error) {
      console.error('Error resolving report:', error);
      toast({
        title: 'Error.',
        description: error.message || 'An error occurred while resolving the report.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleVolunteer = async () => {
    try {
      await createVolunteer(userId, reportId);
      setIsVolunteered(true);
      localStorage.setItem(`volunteerStatus_${userId}_${reportId}`, 'true');
      toast({
        title: 'Voluntariado com sucesso',
        description: 'Você é voluntario nessa ação',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Erro ao se voluntariar', error);
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao se voluntariar',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUnvolunteer = async () => {
    try {
      await deleteVolunteerByUserIdAndReportId(userId, reportId);
      setIsVolunteered(false);
      localStorage.setItem(`volunteerStatus_${userId}_${reportId}`, 'false');
      toast({
        title: 'Voluntariado desfeito',
        description: 'Você deixou de ser voluntario nessa ação',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error unvolunteering:', error);
      toast({
        title: 'Erro.',
        description: error.message || 'Um erro ocorreu.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Card mb={3}>
      <Box
        bgImage={`url(${ImgSrc})`}
        bgPosition='center'
        bgRepeat='no-repeat'
        bgSize='cover'
        height='33vh'
        rounded='md'
      />
      <CardBody>
        <Stack spacing='3'>
          <Heading size='md'>{title}</Heading>
          <Text>{text}</Text>
        </Stack>
      </CardBody>
      <Center>
        <CardFooter>
          {myReports ? (
            <>
              <Button
                mr={3}
                colorScheme='green'
                variant='outline'
                justifyContent="space-between"
                leftIcon={<CheckIcon />}
                onClick={handleDelete}
              >
                Marcar como resolvido
              </Button>
            </>
          ) : (
              <>
              <Button
                mr={3}
                colorScheme='green'
                variant='outline'
                justifyContent="space-between"
                leftIcon={<CheckIcon />}
                onClick={isVolunteered ? handleUnvolunteer : handleVolunteer}
              >
                {isVolunteered ? 'Desmarcar voluntariado' : 'Voluntariar'}
              </Button>
            </>
          )}
        </CardFooter>
      </Center>
    </Card>
  );
};

export default WarningCard;
