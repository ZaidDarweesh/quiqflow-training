export class Button {
    constructor(text, variant = 'primary', onClick) {
        this.text = text;
        this.variant = variant;
        this.onClick = onClick;
    }

    render() {
        const button = document.createElement('button');
        button.className = `btn btn-${this.variant}`;
        button.textContent = this.text;

        if (this.onClick) {
            button.addEventListener('click', this.onClick);
        }

        return button;
    }
}