import styled from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import dataBase from '@/firebase/contents';
import { GiftsType } from '@/firebase/types/persons';
import { useRouter } from 'next/router';

const MainContent = styled.main`
  padding-top: 120px;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 80px;
  align-items: center;
  display: flex;
  flex-direction: column;
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

export default function GiftList() {
    const [product, setProduct] = useState<GiftsType>()
    const { id } = useRouter().query

    useEffect(() => {
        loadData()
    }, [id])

    const loadData = async () => {
      if (!id) return

      try {
        const res = await dataBase
        .get({
        collection: 'gifts',
        filter: [
            { ['__name__']: id, condition: '==' }
        ],
        oneResult: true
        }) as GiftsType

        setProduct(res)

        await dataBase
        .update({
          collection: 'gifts',
          fields: [
            {
              name: 'quote',
              value: res.quote - 1
            },
            {
              name: 'isChecked',
              value: res.quote -1 === 0
            }
          ],
          reference: id as string
        })
      } catch (e) {
        console.log(e)
      }
    }

    return (
        <div style={{ backgroundColor: '#F5F5F5' }}>
        <Header />
        <MainContent>
            <PageTitle>Luana & Alan receberam seu presente!</PageTitle>
            {
              product && (
                <ProductGrid>
                    <ProductCard>
                        <ProductImageWrapper>
                          <Image
                            src={`/gifts/${id}.png`}
                            alt={product.name}
                            layout="fill"
                            objectFit="cover"
                          />
                        </ProductImageWrapper>
                        <ProductInfo>
                          <ProductTitle>{product.name}</ProductTitle>
                        </ProductInfo>
                    </ProductCard>
                </ProductGrid>
              )
            }
        </MainContent>
        <Footer />
        </div>
    );
} 