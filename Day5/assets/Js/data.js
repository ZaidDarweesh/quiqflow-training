const P = (id) => `https://picsum.photos/id/${id}/1200/900`;

window.PRODUCTS = [
    { id: 'p1',  name: 'Wireless Headphones',   brand: 'Sonic',   price: 89.99,  rating: 4.5, image: P(1025), category: 'Audio' },
    { id: 'p2',  name: '4K Action Camera',      brand: 'Venture', price: 129.00, rating: 4.2, image: P(100),  category: 'Cameras' },
    { id: 'p3',  name: 'Mechanical Keyboard',   brand: 'KeyWorks',price: 75.00,  rating: 4.6, image: P(1011), category: 'Peripherals' },
    { id: 'p4',  name: 'USB-C Dock',            brand: 'Dockly',  price: 59.50,  rating: 4.1, image: P(180),  category: 'Peripherals' },
    { id: 'p5',  name: 'Smartwatch S2',         brand: 'Trackr',  price: 199.00, rating: 4.7, image: P(237),  category: 'Wearables' },
    { id: 'p6',  name: 'Noise-Cancel Buds',     brand: 'QuietOn', price: 139.00, rating: 4.3, image: P(29),   category: 'Audio' },
    { id: 'p7',  name: 'Mirrorless Lens 35mm',  brand: 'Optix',   price: 299.00, rating: 4.8, image: P(250),  category: 'Cameras' },
    { id: 'p8',  name: 'Ergo Mouse Pro',        brand: 'Ergofy',  price: 49.99,  rating: 4.0, image: P(1062), category: 'Peripherals' },
    { id: 'p9',  name: 'Fitness Band Lite',     brand: 'Trackr',  price: 59.00,  rating: 3.9, image: P(1084), category: 'Wearables' },
    { id: 'p10', name: 'BT Speaker Mini',       brand: 'Sonic',   price: 35.00,  rating: 4.1, image: P(1069), category: 'Audio' },
];
window.CATEGORIES = ['All','Audio','Cameras','Peripherals','Wearables'];