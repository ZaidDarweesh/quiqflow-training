import { Card } from '../../molecules/Card/index.js';

export class CardGrid {
    constructor(cardsData, containerId) {
        this.cardsData = cardsData;
        this.containerId = containerId;
    }

    render() {
        const container = document.getElementById(this.containerId);

        if (!container) {
            console.error(`Container with id "${this.containerId}" not found`);
            return;
        }

        container.innerHTML = '';

        this.cardsData.forEach(cardData => {
            const card = new Card(cardData);
            container.appendChild(card.render());
        });

        console.log(`${this.cardsData.length} cards rendered successfully!`);
    }

    addCard(newCardData) {
        this.cardsData.push(newCardData);
        this.render();
    }

    removeCard(cardId) {
        this.cardsData = this.cardsData.filter(card => card.id !== cardId);
        this.render();
    }
}