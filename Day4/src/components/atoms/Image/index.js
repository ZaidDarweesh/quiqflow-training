export class Image {
    constructor(src, alt, className = 'img-cover') {
        this.src = src;
        this.alt = alt;
        this.className = className;
    }

    render() {
        const img = document.createElement('img');
        img.className = `img ${this.className}`;
        img.src = this.src;
        img.alt = this.alt;

        return img;
    }
}