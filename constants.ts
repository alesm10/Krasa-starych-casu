import { Product, Category, Condition } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Modrý Cibulák - Šálek s podšálkem',
    description: 'Klasický vzor cibulák od českého výrobce z Dubí. Jemný porcelán, kobaltová modř pod glazurou. Ideální pro ranní kávu v tradičním stylu.',
    price: 450,
    category: Category.CUPS,
    condition: Condition.EXCELLENT,
    imageUrl: 'https://picsum.photos/400/400?random=1',
    year: '1980s',
    manufacturer: 'Thun'
  },
  {
    id: '2',
    title: 'Rosenthal Talíř - Barokní Květiny',
    description: 'Luxusní dezertní talíř značky Rosenthal. Ručně malované květinové motivy se zlatým lemováním. Sběratelský kousek.',
    price: 1200,
    category: Category.PLATES,
    condition: Condition.MINT,
    imageUrl: 'https://picsum.photos/400/400?random=2',
    year: '1920s',
    manufacturer: 'Rosenthal'
  },
  {
    id: '3',
    title: 'Anglická čajová konvice',
    description: 'Masivní konvice s motivem anglického venkova. Drobná krakeláž v glazuře dodává autentický starožitný vzhled.',
    price: 890,
    category: Category.TEAPOTS,
    condition: Condition.GOOD,
    imageUrl: 'https://picsum.photos/400/400?random=3',
    year: '1950s',
    manufacturer: 'Staffordshire'
  },
  {
    id: '4',
    title: 'Míšeňská váza - Kobalt',
    description: 'Vysoká váza s hlubokým kobaltovým základem a ručně malovanou kyticí. Výrazný prvek do každého interiéru.',
    price: 3500,
    category: Category.DECOR,
    condition: Condition.EXCELLENT,
    imageUrl: 'https://picsum.photos/400/400?random=4',
    year: '1960s',
    manufacturer: 'Meissen'
  }
];

export const APP_NAME = "Porcelán & Historie";