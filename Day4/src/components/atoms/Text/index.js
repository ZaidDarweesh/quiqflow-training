export class Text {
    constructor(content, variant = 'description', tag = 'p') {
        this.content = content;
        this.variant = variant;
        this.tag = tag;
    }

    render() {
        const element = document.createElement(this.tag);
        element.className = `text text-${this.variant}`;
        element.textContent = this.content;

        return element;
    }
}