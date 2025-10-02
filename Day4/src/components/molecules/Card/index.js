import { Image } from '../../atoms/Image/index.js';
import { Text } from '../../atoms/Text/index.js';
import { Badge } from '../../atoms/Badge/index.js';
import { Button } from '../../atoms/Button/index.js';

export class Card {
    constructor(cardData) {
        this.id = cardData.id;
        this.title = cardData.title;
        this.description = cardData.description;
        this.image = cardData.image;
        this.category = cardData.category;
        this.date = cardData.date;
    }

    render() {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.setAttribute('data-id', this.id);

        const cardImageSection = document.createElement('div');
        cardImageSection.className = 'card-image';
        const imageComponent = new Image(this.image, this.title, 'img-cover');
        cardImageSection.appendChild(imageComponent.render());

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';

        const titleComponent = new Text(this.title, 'title', 'h2');
        cardContent.appendChild(titleComponent.render());

        const descComponent = new Text(this.description, 'description');
        cardContent.appendChild(descComponent.render());

        const metaSection = document.createElement('div');
        metaSection.className = 'card-meta';

        const categoryBadge = new Badge(this.category, 'primary');
        metaSection.appendChild(categoryBadge.render());

        const dateText = new Text(this.date, 'small', 'span');
        metaSection.appendChild(dateText.render());

        cardContent.appendChild(metaSection);

        const actionsSection = document.createElement('div');
        actionsSection.className = 'card-actions';

        const viewButton = new Button('View Details', 'primary', () => {
            console.log(`View details for: ${this.title}`);
            alert(`Viewing: ${this.title}`);
        });

        const shareButton = new Button('Share', 'secondary', () => {
            console.log(`Share: ${this.title}`);
            alert(`Sharing: ${this.title}`);
        });

        actionsSection.appendChild(viewButton.render());
        actionsSection.appendChild(shareButton.render());
        cardContent.appendChild(actionsSection);

        cardElement.appendChild(cardImageSection);
        cardElement.appendChild(cardContent);

        return cardElement;
    }
}