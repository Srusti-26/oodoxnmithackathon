// Quick Preview Feature
class QuickPreview {
    constructor() {
        this.init();
    }

    init() {
        this.createPreviewTooltip();
        this.addHoverListeners();
    }

    createPreviewTooltip() {
        const tooltip = document.createElement('div');
        tooltip.id = 'quick-preview';
        tooltip.className = 'quick-preview hidden';
        tooltip.innerHTML = `
            <div class="preview-content">
                <img class="preview-image" src="" alt="">
                <div class="preview-info">
                    <h4 class="preview-title"></h4>
                    <p class="preview-price"></p>
                    <p class="preview-condition"></p>
                    <div class="preview-badges"></div>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .quick-preview {
                position: absolute;
                background: white;
                border: 1px solid var(--color-border);
                border-radius: 8px;
                box-shadow: var(--shadow-xl);
                z-index: 1000;
                width: 300px;
                pointer-events: none;
                transition: opacity 0.2s ease;
            }
            .preview-content {
                display: flex;
                padding: 12px;
                gap: 12px;
            }
            .preview-image {
                width: 80px;
                height: 80px;
                object-fit: cover;
                border-radius: 4px;
            }
            .preview-info {
                flex: 1;
            }
            .preview-title {
                margin: 0 0 4px 0;
                font-size: 14px;
                font-weight: 600;
            }
            .preview-price {
                margin: 0 0 4px 0;
                color: var(--color-primary);
                font-weight: bold;
            }
            .preview-condition {
                margin: 0 0 8px 0;
                font-size: 12px;
                color: var(--color-text-secondary);
            }
            .preview-badges {
                display: flex;
                gap: 4px;
                flex-wrap: wrap;
            }
            .preview-badge {
                background: var(--color-bg-solid-1);
                padding: 2px 6px;
                border-radius: 12px;
                font-size: 10px;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(tooltip);
        this.tooltip = tooltip;
    }

    addHoverListeners() {
        document.addEventListener('mouseover', (e) => {
            const productCard = e.target.closest('.product-card');
            if (productCard && !e.target.closest('.product-actions')) {
                this.showPreview(productCard, e);
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.product-card')) {
                this.hidePreview();
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.tooltip.classList.contains('hidden')) {
                this.updatePosition(e);
            }
        });
    }

    showPreview(productCard, event) {
        const productId = productCard.dataset.productId;
        const product = window.app?.products?.find(p => p.id === productId);
        if (!product) return;

        const img = this.tooltip.querySelector('.preview-image');
        const title = this.tooltip.querySelector('.preview-title');
        const price = this.tooltip.querySelector('.preview-price');
        const condition = this.tooltip.querySelector('.preview-condition');
        const badges = this.tooltip.querySelector('.preview-badges');

        img.src = product.images[0];
        title.textContent = product.title;
        price.textContent = `₹${product.price.toLocaleString('en-IN')}`;
        condition.textContent = product.condition.replace('_', ' ');
        badges.innerHTML = product.badges.slice(0, 2).map(badge => 
            `<span class="preview-badge">${badge}</span>`
        ).join('');

        this.updatePosition(event);
        this.tooltip.classList.remove('hidden');
    }

    hidePreview() {
        this.tooltip.classList.add('hidden');
    }

    updatePosition(event) {
        const x = event.clientX + 10;
        const y = event.clientY - 50;
        
        this.tooltip.style.left = `${x}px`;
        this.tooltip.style.top = `${y}px`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new QuickPreview();
});