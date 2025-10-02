export class Badge {
    constructor(text, variant = 'primary') {
        this.text = text;
        this.variant = variant;
    }

    render() {
        const badge = document.createElement('span');
        badge.className = `badge badge-${this.variant}`;
        badge.textContent = this.text;

        return badge;
    }
}