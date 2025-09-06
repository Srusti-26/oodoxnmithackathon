// Advanced Interactive Features
class AdvancedInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.addProductComparison();
        this.addVoiceSearch();
    }

    // Feature 1: Product Comparison Tool
    addProductComparison() {
        this.comparisonList = [];
        this.createComparisonUI();
        this.addComparisonButtons();
    }

    createComparisonUI() {
        const comparisonPanel = document.createElement('div');
        comparisonPanel.id = 'comparison-panel';
        comparisonPanel.className = 'comparison-panel hidden';
        comparisonPanel.innerHTML = `
            <div class="comparison-header">
                <h3>Compare Products</h3>
                <button class="comparison-close" onclick="this.parentElement.parentElement.classList.add('hidden')">×</button>
            </div>
            <div class="comparison-content" id="comparison-content">
                <p>Select products to compare by clicking the compare button on product cards.</p>
            </div>
            <div class="comparison-actions">
                <button class="btn btn--secondary" onclick="document.getElementById('comparison-panel').classList.add('hidden')">Close</button>
                <button class="btn btn--primary" onclick="window.advancedInteractions.clearComparison()">Clear All</button>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .comparison-panel {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: white;
                border-top: 2px solid var(--color-primary);
                box-shadow: var(--shadow-xl);
                z-index: 1000;
                max-height: 50vh;
                overflow-y: auto;
            }
            .comparison-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px;
                border-bottom: 1px solid var(--color-border);
            }
            .comparison-content {
                padding: 16px;
            }
            .comparison-actions {
                padding: 16px;
                border-top: 1px solid var(--color-border);
                display: flex;
                gap: 8px;
                justify-content: flex-end;
            }
            .comparison-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 16px;
            }
            .comparison-item {
                border: 1px solid var(--color-border);
                border-radius: 8px;
                padding: 12px;
                text-align: center;
            }
            .comparison-item img {
                width: 100%;
                height: 100px;
                object-fit: cover;
                border-radius: 4px;
                margin-bottom: 8px;
            }
            .compare-btn {
                background: var(--color-accent);
                color: white;
                border: none;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                cursor: pointer;
                margin-left: 4px;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(comparisonPanel);
    }

    addComparisonButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('compare-btn')) {
                e.stopPropagation();
                const productId = e.target.dataset.productId;
                this.toggleComparison(productId);
            }
        });

        // Add compare buttons to existing product cards
        const observer = new MutationObserver(() => {
            document.querySelectorAll('.product-card .product-actions').forEach(actions => {
                if (!actions.querySelector('.compare-btn')) {
                    const productId = actions.closest('.product-card').dataset.productId;
                    const compareBtn = document.createElement('button');
                    compareBtn.className = 'compare-btn';
                    compareBtn.dataset.productId = productId;
                    compareBtn.innerHTML = '⚖️';
                    compareBtn.title = 'Compare';
                    actions.appendChild(compareBtn);
                }
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    toggleComparison(productId) {
        const product = window.app?.products?.find(p => p.id === productId);
        if (!product) return;

        const index = this.comparisonList.findIndex(p => p.id === productId);
        if (index > -1) {
            this.comparisonList.splice(index, 1);
        } else {
            if (this.comparisonList.length >= 3) {
                this.showNotification('Maximum 3 products can be compared', 'warning');
                return;
            }
            this.comparisonList.push(product);
        }

        this.updateComparisonPanel();
        if (this.comparisonList.length > 0) {
            document.getElementById('comparison-panel').classList.remove('hidden');
        }
    }

    updateComparisonPanel() {
        const content = document.getElementById('comparison-content');
        if (this.comparisonList.length === 0) {
            content.innerHTML = '<p>Select products to compare by clicking the compare button on product cards.</p>';
            return;
        }

        content.innerHTML = `
            <div class="comparison-grid">
                ${this.comparisonList.map(product => `
                    <div class="comparison-item">
                        <img src="${product.images[0]}" alt="${product.title}">
                        <h4>${product.title}</h4>
                        <p class="price">₹${product.price.toLocaleString('en-IN')}</p>
                        <p class="condition">${product.condition}</p>
                        <p class="sustainability">♻️ ${product.sustainabilityScore}/100</p>
                        <button onclick="window.advancedInteractions.removeFromComparison('${product.id}')" class="btn btn--sm">Remove</button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    removeFromComparison(productId) {
        this.comparisonList = this.comparisonList.filter(p => p.id !== productId);
        this.updateComparisonPanel();
        if (this.comparisonList.length === 0) {
            document.getElementById('comparison-panel').classList.add('hidden');
        }
    }

    clearComparison() {
        this.comparisonList = [];
        this.updateComparisonPanel();
        document.getElementById('comparison-panel').classList.add('hidden');
    }

    // Feature 2: Voice Search
    addVoiceSearch() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            return; // Voice recognition not supported
        }

        this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-IN';

        this.addVoiceSearchButtons();
        this.setupVoiceRecognition();
    }

    addVoiceSearchButtons() {
        const searchInputs = document.querySelectorAll('#searchInput, #browseSearchInput');
        searchInputs.forEach(input => {
            if (input.parentElement.querySelector('.voice-search-btn')) return;

            const voiceBtn = document.createElement('button');
            voiceBtn.className = 'voice-search-btn';
            voiceBtn.type = 'button';
            voiceBtn.innerHTML = '🎤';
            voiceBtn.title = 'Voice Search';
            
            const style = document.createElement('style');
            style.textContent = `
                .voice-search-btn {
                    position: absolute;
                    right: 50px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: var(--color-accent);
                    border: none;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    z-index: 10;
                }
                .voice-search-btn:hover {
                    transform: translateY(-50%) scale(1.1);
                    background: var(--color-accent-hover);
                }
                .voice-search-btn.listening {
                    background: #ff4444;
                    animation: pulse 1s infinite;
                }
                .search-bar {
                    position: relative;
                }
            `;
            if (!document.querySelector('#voice-search-styles')) {
                style.id = 'voice-search-styles';
                document.head.appendChild(style);
            }

            voiceBtn.onclick = () => this.startVoiceSearch(input);
            input.parentElement.style.position = 'relative';
            input.parentElement.appendChild(voiceBtn);
        });
    }

    setupVoiceRecognition() {
        this.recognition.onstart = () => {
            document.querySelectorAll('.voice-search-btn').forEach(btn => {
                btn.classList.add('listening');
                btn.innerHTML = '🔴';
            });
        };

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            this.currentInput.value = transcript;
            
            // Trigger search
            if (this.currentInput.id === 'searchInput') {
                window.app?.performSearch();
            } else if (this.currentInput.id === 'browseSearchInput') {
                window.app?.performBrowseSearch();
            }
            
            this.showNotification(`Voice search: "${transcript}"`, 'success');
        };

        this.recognition.onend = () => {
            document.querySelectorAll('.voice-search-btn').forEach(btn => {
                btn.classList.remove('listening');
                btn.innerHTML = '🎤';
            });
        };

        this.recognition.onerror = (event) => {
            this.showNotification('Voice search error. Please try again.', 'error');
            this.recognition.onend();
        };
    }

    startVoiceSearch(input) {
        this.currentInput = input;
        try {
            this.recognition.start();
        } catch (error) {
            this.showNotification('Voice search is already active', 'warning');
        }
    }

    showNotification(message, type) {
        if (window.app?.showNotification) {
            window.app.showNotification(message, type);
        } else {
            console.log(`${type}: ${message}`);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.advancedInteractions = new AdvancedInteractions();
});