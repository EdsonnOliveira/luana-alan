import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import dataBase from '@/firebase/contents';
import { PersonsType } from '@/firebase/types/persons';

const MainContent = styled.main`
  padding-top: 120px;
  min-height: calc(100vh - 80px);
  background-color: #F5F5F5;

  @media (max-width: 768px) {
    padding-top: 80px;
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Times New Roman', serif;
  color: #2A2E29;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 40px;
  max-width: 600px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 30px;
  }
`;

const Input = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 15px;
  margin-bottom: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  color: black;
  
  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #2A2E29;
  }
`;

const Button = styled.button`
  background-color: #2A2E29;
  color: white;
  padding: 15px 40px;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Arrow = styled.span`
  font-size: 1.5rem;
`;

export default function ConfirmPresence() {
  const [identity, setIdentity] = useState<string>('')

  const onNext = async () => {
    try {
      const res = await dataBase
      .get({
        collection: 'persons',
        filter: [
          {
            ['name']: identity,
            condition: '=='
          },
        ],
        oneResult: true,
      }) as PersonsType

      if (!res)
        throw 'Nenhum convite encontrado neste nome!'

      if (res.isChecked)
        throw 'Sua presença já foi confirmada antes!'

      await dataBase
      .update({
        collection: 'persons',
        fields: [{
          name: 'isChecked', value: true
        }],
        reference: res.id
      })

      setIdentity('')
      alert('Presença confirmada!')
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div style={{ backgroundColor: '#F5F5F5' }}>
      <Header />
      <MainContent>
        <ContentSection>
          <Title>Qual o nome que está no convite?</Title>
          <Subtitle>
            Você pode informar o nome do convite enviado por Luana & Alan
          </Subtitle>
          <Input
            value={identity}
            onChange={(a) => setIdentity(a.target.value)}
            type="text" 
            placeholder="Identificação do convite"
          />
          <Button onClick={onNext}>
            Continuar <Arrow>→</Arrow>
          </Button>
        </ContentSection>
      </MainContent>
      <Footer />
    </div>
  );
} 