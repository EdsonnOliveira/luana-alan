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

const array = [
  { name: 'ASPIRADOR DE PÓ', pricePix: '179,00', priceCard: '187,91', url: 'https://loja.electrolux.com.br/aspirador-de-po-vertical-1100w-powerspeed-electrolux-2-em-1-filtro-hepa-cabo-eletrico-5m--stk13a-/p', quote:	1	, },
{ name: 'CÔMODA  8 GAVETAS', pricePix: '759,05', priceCard: '796,85', url: 'https://www.casasbahia.com.br/comoda-demobile-sintra-com-8-gavetas-e-136-cm-de-largura-55027814/p/55027816?utm_medium=Cpc&utm_source=GP_PLA&IdSku=55027816&idLojista=10037&tipoLojista=1P&gclsrc=aw.ds&&utm_campaign=gg_pmax_core_move_ab&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVBVeMF5oKRPMUZxKWoHhRyk20Ik8a9rBcnDH4BrLSfz_wADI9Z3N7hoCa5EQAvD_BwE', quote:	2	, },
{ name: 'CONJUNTO DE 16 POTES HERMÉTICOS', pricePix: '115,11', priceCard: '120,84', url: ' https://www.magazineluiza.com.br/conjunto-de-16-potes-hermeticos-decoteam-com-tampa-e-trava-croix/p/jca8acjkk0/ud/poud/?&seller_id=loibrasil&utm_source=google&utm_medium=cpc&utm_term=76942&utm_campaign=google_eco_per_ven_pla_uti_sor_3p_cm-dec-ud-a&utm_content=&partner_id=76942&gclsrc=aw.ds&gclid=CjwKCAjwx4O4BhAnEiwA42SbVM8Dfxi1gP_PmFOG5_zLKU759awLftqa_El4qXFW-MAE3jiUxDHwXRoCUJ0QAvD_BwE', quote:	1	, },
{ name: 'CONJUNTO DE REFRATÁRIO', pricePix: '115,67', priceCard: '121,43', url: ' https://www.amazon.com.br/Marinex-Conjunto-Assadeiras-Retangulares-Incolor/dp/B0016LHBHM/ref=asc_df_B0016LHBHM/?tag=googleshopp00-20&linkCode=df0&hvadid=709964506256&hvpos=&hvnetw=g&hvrand=8924278451545465068&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9198672&hvtargid=pla-918825582675&psc=1&mcid=4f976261ea703ed8b8139fe78f1be764&gad_source=1', quote:	1	, },
{ name: 'EDREDOM DE MALHA ZELO', pricePix: '279,9', priceCard: '293,84', url: 'https://www.zelo.com.br/edredom-de-malha-zelo-casal-100-algodao-p985260?pp=/44.2912/&tsid=17&utm_source=pmax&utm_medium=cpc&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVNe8i6Ei60_8BM-5n42z2rkVhWNnVrCK_dTJAaHLwt35C-O4uGsezBoCPlAQAvD_BwE', quote:	1	, },
{ name: 'EDREDOM DE MALHA ZELO', pricePix: '279,9', priceCard: '293,84', url: 'https://www.zelo.com.br/edredom-de-malha-zelo-casal-100-algodao-p985260?pp=/44.2912/&tsid=17&utm_source=pmax&utm_medium=cpc&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVNe8i6Ei60_8BM-5n42z2rkVhWNnVrCK_dTJAaHLwt35C-O4uGsezBoCPlAQAvD_BwE', quote:	1	, },
{ name: 'ESCORREDOR DE LOUÇAS', pricePix: '129,9', priceCard: '136,37', url: 'https://www.amazon.com.br/Escorredor-Lou%C3%A7as-Bandeja-Mak-Inox-2220/dp/B0CWCCJZCP/ref=asc_df_B0CWCCJZCP/?tag=googleshopp00-20&linkCode=df0&hvadid=709870389015&hvpos=&hvnetw=g&hvrand=17086050711968534902&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9198672&hvtargid=pla-2292078884576&psc=1&mcid=68208505681c36a989a53e6780fe001b&gad_source=1', quote:	1	, },
{ name: 'ESPREMEDOR DEFRUTAS', pricePix: '125,13', priceCard: '131,36', url: 'https://www.magazineluiza.com.br/espremedor-de-frutas-electrolux-ecp10-preto-e-prata-30w-800ml/p/236784000/ep/cent/?&seller_id=magazineluiza&utm_source=google&utm_medium=cpc&utm_term=78092&utm_campaign=google_eco_per_ven_pla_ele_sor_1p_ep_v2&utm_content=&partner_id=78092&gclsrc=aw.ds&gclid=Cj0KCQiA0fu5BhDQARIsAMXUBOLDATbJ14fca56374b6xpGdzA_flraqkrnUT5BhZHFYQmwkyUV360YaAsD1EALw_wcB', quote:	1	, },
{ name: 'FAQUEIRO INOX 85 PEÇAS', pricePix: '238,16', priceCard: '250,02', url: 'https://www.casasbahia.com.br/faqueiro-inox-malibu-85-pecas-tramontina-1503722574/p/1503722574?utm_medium=Cpc&utm_source=google_freelisting&IdSku=1503722574&idLojista=37240&tipoLojista=3P&srsltid=AfmBOorEd4BVwuZxXRyhW-6KXWm_fR-nD06Hug_lKY47WiG2PrccwbqSStM', quote:	1	, },
{ name: 'FERRO DE PASSAR ROUPA', pricePix: '129,00', priceCard: '135,42', url: 'https://loja.electrolux.com.br/ferro-de-passar-a-vapor-e-a-seco-electrolux-efficient--esi10-/p?skuId=310118792', quote:	1	, },
{ name: 'FOGÃO COOKTOP', pricePix: '473,36', priceCard: '496,93', url: 'https://www.casasbahia.com.br/cooktop-a-gas-philco-5-bocas-chef-5-bisote-bivolt-preto-10079425/p/10079425?utm_medium=cpc&utm_source=GP_PLA&IdSku=10079425&idLojista=10037&tipoLojista=1P&gclsrc=aw.ds&&utm_campaign=gg_pmax_core_eldo&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVLfmvEGAfVVhOJc5F4rOgLpJaD75A2Wr-5ZDPUXIcgjWq48u-m9oZhoCLTUQAvD_BwE', quote:	1	, },
{ name: 'FRITADEIRA ELÉTRICA', pricePix: '278,53', priceCard: '292,40', url: 'https://www.pontofrio.com.br/fritadeira-eletrica-sem-oleo-air-fry-philco-pfr15pg-gourmet-gold-43l-preta-55061316/p/55061317?utm_medium=cpc&utm_source=GP_PLA&IdSku=55061317&idLojista=16&tipoLojista=1P&gclsrc=aw.ds&&utm_campaign=gg_pmax_core_elpo&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVAcQ73UAP6oqd7dp2K48mVOVG_MlwaPM7o3hqTgRoktxYQiSHzjxGhoC6_EQAvD_BwE', quote:	1	, },
{ name: 'GUARDA-ROUPA', pricePix: '1.519,05', priceCard: '1.594,70', url: 'https://www.casasbahia.com.br/guarda-roupa-bartira-diplomata-com-7-portas-e-6-gavetas-255-6cm-de-largura-55055053.html', quote:	4	, },
{ name: 'JOGO DE BANHO 5 PEÇAS', pricePix: '169,90', priceCard: '178,36', url: 'https://www.zelo.com.br/jogo-de-banho-camesa-dynamo-5-pecas-100-algodao-p1006880?pp=/44.4868/&tsid=17&utm_source=pmax&utm_medium=cpc&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVOFLa0uU-AqSWt7QC_28FKDfZ2KGzF8Zm2dwkIO1Dq7XUTQrC6TZAhoCvEQQAvD_BwE', quote:	1	, },
{ name: 'JOGO DE PANELA 10 PEÇAS CERÂMICA', pricePix: '594,92', priceCard: '624,55', url: ' https://www.pontofrio.com.br/jogo-de-panela-10pcs-ceramica-antiaderente-fundo-triplo-fogao-inducao-mimo-style-pratic-cook-grafite-1566712705/p/1566712705?utm_medium=cpc&utm_source=GP_PLA&IdSku=1566712705&idLojista=31644&tipoLojista=3P&gclsrc=aw.ds&&utm_campaign=3p_gg_pmax_tudo&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVMOrxHBvL1cCX_3B8QjYfC_jq58cOOR9NFSEj_uof-J-WsLSFmhvwRoCcPgQAvD_BwE', quote:	1	, },
{ name: 'JOGO DE PANELA TRAMONTINA 10 PEÇAS', pricePix: '377,10', priceCard: '395,88', url: 'https://www.americanas.com.br/produto/27711243/jogo-de-panelas-tramontina-turim-antiaderente-grafite-10-pecas?offerId=5deab93c1729c3bbf1bb3d18&opn=YSMESP&epar=bp_pl_px_go_pmax_ud_3p_pa_3&gclsrc=aw.ds&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVOS_2luxoGQdFZkbR7IVfGGoAbmorgrK40U6kqFAklgnaVMtxODJChoCT58QAvD_BwE#&gid=1&pid=2', quote:	1	, },
{ name: 'JOGO DE TAÇAS DE SOBREMESA', pricePix: '168,00', priceCard: '176,37', url: 'https://www.amazon.com.br/Ta%C3%A7as-Sobremesa-Diamond-Vidro-300ml/dp/B0DHLTLC1B/ref=sr_1_34?dib=eyJ2IjoiMSJ9.u_BXX_NuyXRzqu08oUCdVY9O3RkZj6H46ZsYiBZILfaJF3ymJMTVSYxtKWom3-ORHEVqd-oKUFRHXIjHHLeB364twBQhORpCFl0cjdDyB2OZUqkNjvB2YJh5_WflYOHUPfrKi4raifygdT6-etXi6MgDw_651I0Ld60SGh86ioNo-m1g1vncrnvUfk9U3MB38LvNtbTgp8K0sjMfQqRYBk1F2d7zk4GKw9n6kknEzKK0KKvlgidQfNKZUtOfiN59nJm6GzfRpqESFuFv8v676DFS2Jgv5DqvvC_RaRN5rtA.z3OU6UhGj1FnOHU65Bfqb-l5vysD2Uma3LNKxLDDrRU&dib_tag=se&keywords=jogo%2Bde%2Bsobremesa&qid=1728169677&sr=8-34&th=1', quote:	1	, },
{ name: 'JOGODE FACAS 6PEÇAS', pricePix: '75,90', priceCard: '79,68', url: ' https://www.amazon.com.br/Facas-Pe%C3%A7as-Plenus-Tramontina-Cutelaria/dp/B07K32CH6K/ref=asc_df_B07K32CH6K/?tag=googleshopp00-20&linkCode=df0&hvadid=709857067836&hvpos=&hvnetw=g&hvrand=6550688983446956971&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9198672&hvtargid=pla-810983355288&psc=1&mcid=143576c5edba3bf28699455551b80fd2&gad_source=1', quote:	1	, },
{ name: 'KIT 10 POTES HERMÉTICOS', pricePix: '107,90', priceCard: '113,27', url: 'https://www.amazon.com.br/Kit-Potes-Herm%C3%A9tico-Marmita-Rentangular/dp/B0D5DKXKNL/ref=asc_df_B0D5DKXKNL/?tag=googleshopp00-20&linkCode=df0&hvadid=709964506256&hvpos=&hvnetw=g&hvrand=799587462768303739&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9198672&hvtargid=pla-2503832518072&psc=1&mcid=ad5648036faf3f2db3e74eeef277475d&gad_source=1', quote:	1	, },
{ name: 'KIT COBRE LEITO CASAL', pricePix: '139,99', priceCard: '146,96', url: 'https://www.camicado.com.br/p/kit-cobre-leito-colcha-casal-3pc-dupla-face-ponto-cruz-300-fios/-/A-7010704104983-br.lc?sku=7510708426690&utm_id=20388017423&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVA1gIOUmY29Y3RzaE1j6m1bl2urSNQx12uAqT6te6wPZ5vwjFiJzYRoCxDQQAvD_BwE', quote:	1	, },
{ name: 'KIT COBRE LEITO CASAL', pricePix: '139,99', priceCard: '146,96', url: 'https://www.camicado.com.br/p/kit-cobre-leito-colcha-casal-3pc-dupla-face-ponto-cruz-300-fios/-/A-7010704104983-br.lc?sku=7510708426690&utm_id=20388017423&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVA1gIOUmY29Y3RzaE1j6m1bl2urSNQx12uAqT6te6wPZ5vwjFiJzYRoCxDQQAvD_BwE', quote:	1	, },
{ name: 'KIT TOALHA BANHÃO E ROSTO', pricePix: '126,80', priceCard: '133,11', url: 'https://www.zelo.com.br/kit-toalha-banhao-e-rosto-zelo-select-por-buddemeyer-rosa-brinde-toalha-lavabo-lollipop-100-algodao-p1009862', quote:	1	, },
{ name: 'LIQUIDIFICADOR OSTER', pricePix: '169,90', priceCard: '178,36', url: 'https://www.amazon.com.br/Liquidificador-1400-Full-Preto-Oster/dp/B08DFJRCJB/ref=asc_df_B08DFJRCJB/?tag=googleshopp00-20&linkCode=df0&hvadid=709968341272&hvpos=&hvnetw=g&hvrand=9532432034820607088&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9198672&hvtargid=pla-943565787307&mcid=bc4bb5b51ab73643a324613878d06fd0&gad_source=1&th=1', quote:	1	, },
{ name: 'MAQUINA DE LAVAR ELECTROLUX', pricePix: '1.599,00', priceCard: '1.678,63', url: 'https://loja.electrolux.com.br/lavadora-turbo-economia-lac11-com-dispenser-autoclean-e-tecnologia-jet-clean/p?idsku=2001886&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVKgZaB5uWekERbcFME9cq2Idsky68xgfQL9Az7yYEEMOUV-RhkxzfhoC0cIQAvD_BwE', quote:	1	, },
{ name: 'MESA DE JANTAR', pricePix: '569,99', priceCard: '598,38', url: 'https://www.carrefour.com.br/mesa-para-sala-de-jantar-160cm-tampo-em-vidromdp-espanha-espresso-moveis-ypeoff-white-mp923173011/p?utm_medium=sem&utm_source=google_pmax_3p&utm_campaign=3p_performancemax_Eletro_Sellers_B&gad_source=4&gclid=CjwKCAjwx4O4BhAnEiwA42SbVGNGUVajuHPmLPqL8tGrBADetYXpuVTRwwWTti-2natbPxx6v7pMMRoCCcEQAvD_BwE', quote:	1	, },
{ name: 'MINI GRILL OSTER', pricePix: '199,99', priceCard: '209,95', url: 'https://www.oster.com.br/mini-grill-eletrico-oster-inox-2-em-1/p?idsku=15696&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVHO1BBqUmewQY0O5Ofv2LO_T4R3yPDTXUrRLrtLUKJA6UN4tXK4wGBoCYL8QAvD_BwE', quote:	1	, },
{ name: 'MOP GIRATÓRIO', pricePix: '179,80', priceCard: '188,75', url: 'https://www.amazon.com.br/Mop-Girat%C3%B3rio-Flash-Limp-Verde/dp/B07B88QMHN/ref=asc_df_B07B88QMHN/?tag=googleshopp00-20&linkCode=df0&hvadid=709968341005&hvpos=&hvnetw=g&hvrand=13550959073207029473&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9198672&hvtargid=pla-864763156727&psc=1&mcid=97feb16e7b1d3afe8a990e4f8762ca86&gad_source=1', quote:	1	, },
{ name: 'PAINEL PARA TV', pricePix: '399,99', priceCard: '419,91', url: 'https://www.madeiramadeira.com.br/painel-para-tv-ate-60-polegadas-1-portas-2-prateleiras-bento-807067.html?origem=pla-807067&utm_source=google&utm_medium=cpc&utm_content=paineis-5129&utm_term=&utm_id=17318300127&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVN84_qbzw7QWHXBTrmjaHvZTtAb2IVFlPml5XPhcKCik_jZ9XLtR7xoCxt0QAvD_BwE', quote:	1	, },
{ name: 'PANELA DE PRESSÃO', pricePix: '192,90', priceCard: '202,51', url: 'https://www.pontofrio.com.br/panela-de-pressao-tramontina-vancouver-effect-em-aluminio-com-revestimento-antiaderente-starflon-max-45l-preto-55064907/p/55064907?utm_medium=cpc&utm_source=GP_PLA&IdSku=55064907&idLojista=16&tipoLojista=1P&gclsrc=aw.ds&&utm_campaign=gg_pmax_apostas&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVGA6da9Tpj8NNIEjGBO6dWQarEsYdVyhAA2BRqeTi97UiuAVjmaHAhoCSjwQAvD_BwE', quote:	1	, },
{ name: 'PORTA MANTIMENTOS', pricePix: '168,00', priceCard: '176,37', url: 'https://www.amazon.com.br/Mantimentos-Herm%C3%A9ticos-Organizador-Alimentos-Transparente/dp/B0CXJDWZZT/ref=asc_df_B0CXJDWZZT/?tag=googleshopp00-20&linkCode=df0&hvadid=709886750320&hvpos=&hvnetw=g&hvrand=7134461807036647041&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9198672&hvtargid=pla-2295821162057&psc=1&mcid=22d8e4f7d8d230b6a5abb75dcf4d5a30&gad_source=1', quote:	1	, },
{ name: 'PORTA TEMPEROS', pricePix: '99,90', priceCard: '104,88', url: 'https://www.amazon.com.br/Temperos-Girat%C3%B3rio-Quadrado-MM-House/dp/B0BXPQJX1P/ref=asc_df_B0BXPQJX1P/?tag=googleshopp00-20&linkCode=df0&hvadid=709864975911&hvpos=&hvnetw=g&hvrand=10033266102365159627&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9198672&hvtargid=pla-2204411113591&psc=1&mcid=8e477db142173924b93b7b5280505ac1&gad_source=1', quote:	1	, },
{ name: 'PURIFICADOR DE ÁGUA', pricePix: '575,04', priceCard: '603,68', url: 'https://www.magazineluiza.com.br/purificador-de-agua-electrolux-de-mesa-cinza-acqua-pure4x-agua-gelada-e-natural-pe12g/p/010302900/ep/pams/?&seller_id=magazineluiza&utm_source=google&utm_medium=cpc&utm_term=78092&utm_campaign=google_eco_per_ven_pla_ele_sor_1p_ep_v2&utm_content=&partner_id=78092&gclsrc=aw.ds&gclid=Cj0KCQiA0fu5BhDQARIsAMXUBOJdRoTwALhtpDwFpr_tfy2DufHUxcLW7-nD418XOaTjSw1z5dzCVigaApa5EALw_wcB', quote:	1	, },
{ name: 'SMART TV SAMSUNG 50 POLEGADAS', pricePix: '2.149,00', priceCard: '2.256,02', url: ' https://www.carrefour.com.br/smart-tv-samsung-50-polegadas-4k-uhd-processador-crystal-4k-gaming-hub-alexa-builtin-50du7700-3432688/p?utm_medium=sem&utm_source=google_pmax_1p&utm_campaign=1p_performancemax_Eletro_TV&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVL5WMHDVwEU0M5ENLdbC1AW05ecMoxhQbAlUFHDjd9QII8LMjjNavBoCIBkQAvD_BwE', quote:	5	, },
{ name: 'SOFÁ COM PORTA COPOS', pricePix: '1.517,27', priceCard: '1.592,83', url: 'https://www.madeiramadeira.com.br/sofa-com-porta-copos-e-carregador-usb-eureka-2-30m-assento-retratil-e-reclinavel-velosuede-852554945.html?origem=pla-852554945&utm_source=google&utm_medium=cpc&utm_content=sofa-retratil-5142&utm_term=&utm_id=17580880964&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVCiiQkq98JxsLAuldeH9oMqDUiIbpJhdoB58KIJW-3yYKM72V8kEHRoCunsQAvD_BwE', quote:	4	, },
{ name: 'TABUA DE PASSAR ROUPAS', pricePix: '123,90', priceCard: '130,07', url: 'https://www.amazon.com.br/Tabua-passar-roupas-metalizada-suporte/dp/B0B8DM6VNS/ref=asc_df_B0B8DM6VNS/?tag=googleshopp00-20&linkCode=df0&hvadid=709964506235&hvpos=&hvnetw=g&hvrand=5662054121159654526&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9198672&hvtargid=pla-1729455570239&psc=1&mcid=c103401d26533b3fa5f579b1e55cb78e&gad_source=1', quote:	1	, },
{ name: 'TRAVESSEIRO ZELO', pricePix: '160,00', priceCard: '167,97', url: 'https://www.zelo.com.br/travesseiro-zelo-hotel-toque-de-pluma-0-50x0-70m-percal-200-fios-p1007129?pp=/44.2609/&tsid=17&utm_source=pmax&utm_medium=cpc&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVH7yYcnoUGyKBneOsk0M3AhWAOosmjeNElkof5Yuqax-cByyBjov3xoCNZsQAvD_BwE', quote:	1	, },
{ name: 'VENTILADOR DE MESA', pricePix: '158,01', priceCard: '165,88', url: 'https://www.casasbahia.com.br/ventilador-de-mesa-40cm-mondial-turbo-vt40nb-com-8-pas-3-velocidades-preto-e-prata-55066619/p/55066620?utm_medium=cpc&utm_source=GP_PLA&IdSku=55066620&idLojista=10037&tipoLojista=1P&gclsrc=aw.ds&&utm_campaign=gg_pmax_inter_arve&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVJQ03zrS3oRTF2-CE35gKoZ4B59x7GwBM0dzodijspNsCoDva647URoCuZAQAvD_BwE', quote:	1	, },
]

export default function ConfirmPresence() {
  const [identity, setIdentity] = useState<string>('')

  const onNext = async () => {
    try {
      array.forEach(async (item) => {
        await dataBase
        .insert({
          collection: 'gifts',
          fields: [
            {
              name: 'name',
              value: item.name,
            },
            {
              name: 'pricePix',
              value: item.pricePix,
            },
            {
              name: 'priceCard',
              value: item.priceCard,
            },
            {
              name: 'url',
              value: item.url,
            },
            {
              name: 'quote',
              value: item.quote,
            },
            {
              name: 'isChecked',
              value: false,
            }
          ]
        })
      })
    } catch (e) {
      alert(e)
    }

    return
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