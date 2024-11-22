import styled from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import dataBase from '@/firebase/contents';
import { GiftsType } from '@/firebase/types/persons';
import Link from 'next/link';

const MainContent = styled.main`
  padding-top: 120px;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 80px;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-family: 'Times New Roman', serif;
  color: #2A2E29;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const ProductImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #666;
`;

const ProductPrice = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1rem;
`;

const BuyButton = styled.button`
  padding: 10px 20px;
  background-color: #2A2E29;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #1a1e19;
  }
`;

export default function GiftList() {
  const [products, setProducts] = useState<GiftsType[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const res = await dataBase
    .get({
      collection: 'gifts',
      filter: [
        { ['isChecked']: false, condition: '==' }
      ]
    }) as GiftsType[]

    setProducts(res)
  }

  function formatCurrToNumber(curr: string): number {
    return Number(curr.replaceAll('.', '').replace(',', '.'));
  }

  const onPay = async (item: GiftsType) => {
    try {
      const preference = {
        items: [
          {
            title: item.name,
            quantity: 1,
            currency_id: "BRL",
            unit_price: formatCurrToNumber(item.priceCard)
          },
        ],
        back_urls: {
          success: `https://seusite.com/success/${item.id}`,
          failure: `https://seusite.com/failure/${item.id}`,
          pending: `https://seusite.com/pending/${item.id}`,
        },
      };

      const response = await fetch(
        "https://api.mercadopago.com/checkout/preferences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer SEU_ACCESS_TOKEN`, // Substitua pelo Access Token
          },
          body: JSON.stringify(preference),
        }
      );

      const data = await response.json();
      if (data.id) {
        // Redireciona para o link de pagamento
        window.location.href = data.init_point;
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div style={{ backgroundColor: '#F5F5F5' }}>
      <Header />
      <MainContent>
        <PageTitle>Lista de Presentes</PageTitle>
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id}>
              <ProductImageWrapper>
                <Image
                  src={`/gifts/${product.id}.png`}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                />
              </ProductImageWrapper>
              <ProductInfo>
                <ProductTitle>{product.name}</ProductTitle>
                <ProductPrice>R$ {product.priceCard}</ProductPrice>
                <ProductPrice>Cotas Disponíveis: {product.quote}</ProductPrice>
                {/* <Link href={product.urlPayment ?? ''} target='_blank'> */}
                  <BuyButton onClick={() => onPay(product)}>Presentear</BuyButton>
                {/* </Link> */}
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </MainContent>
      <Footer />
    </div>
  );
} 