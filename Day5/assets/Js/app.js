(function(){
    const state = {
        q: '',
        category: 'all',
        sort: 'relevance',
        products: window.PRODUCTS.slice(0)
    };

    const grid = document.getElementById('grid');
    const form = document.getElementById('filterForm');
    const qInput = document.getElementById('q');
    const catSelect = document.getElementById('category');
    const sortSelect = document.getElementById('sort');
    const resetBtn = document.getElementById('resetBtn');

    window.CATEGORIES.forEach(c => {
        if(c.toLowerCase() === 'all') return;
        const opt = document.createElement('option');
        opt.value = c.toLowerCase();
        opt.textContent = c;
        catSelect.appendChild(opt);
    });

    const stars = (rating) => '★'.repeat(Math.round(rating)).padEnd(5,'☆');
    const money = (n) => `$${n.toFixed(2)}`;

    const ProductCard = (p) => `
    <article class="card" aria-label="${p.name} card">
      <figure class="card__media">
        <img class="card__img" src="${p.image}" alt="${p.name}" loading="lazy">
        <figcaption class="card__badges">
          <span class="tag">${p.category}</span>
        </figcaption>
      </figure>
      <div class="card__body">
        <h3 class="card__title" title="${p.name}">${p.name}</h3>
        <p class="card__brand">${p.brand}</p>
        <div class="card__meta">
          <span class="card__price">${money(p.price)}</span>
          <span class="card__rating" aria-label="Rating ${p.rating} of 5">${stars(p.rating)}</span>
        </div>
        <button class="btn btn--secondary" data-add="${p.id}">Add to Cart</button>
      </div>
    </article>
  `;

    function filterAndSort(){
        const q = state.q.trim().toLowerCase();
        const filtered = window.PRODUCTS.filter(p => {
            const matchQ = !q || [p.name, p.brand, p.category].some(v => v.toLowerCase().includes(q));
            const matchCat = state.category === 'all' || p.category.toLowerCase() === state.category;
            return matchQ && matchCat;
        });

        const sorted = filtered.slice().sort((a,b) => {
            switch(state.sort){
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'rating-desc': return b.rating - a.rating;
                default: return 0;
            }
        });

        return sorted;
    }

    function render(){
        const list = filterAndSort();
        grid.innerHTML = list.map(ProductCard).join('') || `<p class="muted">No results. Try different filters.</p>`;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        state.q = qInput.value;
        state.category = catSelect.value || 'all';
        state.sort = sortSelect.value;
        render();
    });

    resetBtn.addEventListener('click', () => {
        state.q = '';
        state.category = 'all';
        state.sort = 'relevance';
        qInput.value = '';
        catSelect.value = 'all';
        sortSelect.value = 'relevance';
        render();
    });

    grid.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-add]');
        if(!btn) return;
        const id = btn.getAttribute('data-add');
        const prod = window.PRODUCTS.find(p => p.id === id);
        if(prod){
            btn.textContent = 'Added ✓';
            btn.disabled = true;
            setTimeout(() => { btn.textContent = 'Add to Cart'; btn.disabled = false; }, 1200);
        }
    });

    render();
})();
