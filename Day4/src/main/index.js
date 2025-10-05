import { CardGrid } from '../components/organisms/CardGrid/index.js';
import { cardsData } from '../components/data/index.js';

document.addEventListener('DOMContentLoaded', () => {
    const cardGrid = new CardGrid(cardsData, 'cardGrid');
    cardGrid.render();

    setTimeout(() => {
      cardGrid.addCard({
        id: 4,
        title: "Tech Innovation",
        description: "Discover cutting-edge technology and innovation that's shaping our future.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop",
        category: "Technology",
        date: "Oct 3, 2025"
      });
    }, 5000);
});