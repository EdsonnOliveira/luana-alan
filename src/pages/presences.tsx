import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
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
  max-width: 600px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export default function ConfirmPresence() {
  const [persons, setPersons] = useState<PersonsType[]>([])

  useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    try {
      const res = await dataBase
      .get({
        collection: 'persons',
        filter: [
          {
            ['isChecked']: true,
            condition: '=='
          },
        ],
      }) as PersonsType[]

      setPersons(res)
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div style={{ backgroundColor: '#F5F5F5' }}>
      <Header />
      <MainContent>
        <ContentSection>
          <Title>Pessoas confirmadas</Title>
          {
            persons &&
            persons.map((item, index) => (
              <Subtitle>
                { index + 1 } - { item.name }
              </Subtitle>
            ))
          }
        </ContentSection>
      </MainContent>
      <Footer />
    </div>
  );
} 