import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainContent = styled.main`
  padding-top: 120px;
  margin: 0 auto;
  padding-bottom: 80px;

  @media (max-width: 768px) {
    padding-top: 80px;
    padding-bottom: 60px;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 600px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    height: 400px;
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: 1rem;
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
  font-style: italic;
  margin-bottom: 1rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const Description = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.8;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

export default function Contact() {
  return (
    <div style={{ backgroundColor: '#F5F5F5' }}>
      <Header />
      <MainContent>
        <MapContainer>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15355.54678586123!2d-48.03395901859036!3d-15.809927271328045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a32357a37b799%3A0x6ec037cf58d2d3b4!2zQ2VudHJvIGRlIEFkb3Jhw6fDo28!5e0!3m2!1spt-BR!2sbr!4v1731376175824!5m2!1spt-BR!2sbr"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </MapContainer>

        <ContentSection>
          <PageTitle>Cerimônia</PageTitle>
          <Subtitle>
            Igreja: Centro de Adoração
            <br />
            Dia: 22/02/2025
          </Subtitle>
          <Description>
          Rua 5 Chácara 117 lote 1 - Vicente Pires 
          </Description>
        </ContentSection>
      </MainContent>
      <MainContent>
        <MapContainer>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.8679456389614!2d-48.01470792486962!3d-15.810915584831807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a33cad9f70fc7%3A0x521eca4dd2673b5b!2sEspa%C3%A7o%20Styllus!5e0!3m2!1spt-BR!2sbr!4v1731376114663!5m2!1spt-BR!2sbr"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </MapContainer>

        <ContentSection>
          <PageTitle>Recepção</PageTitle>
          <Subtitle>
            Salão de festa: Espaço Styllus 
            <br />
            18:00
          </Subtitle>
          <Description>
            Rua 3 lote 29- Vicente Pires
          </Description>
        </ContentSection>
      </MainContent>
      <Footer />
    </div>
  );
} 