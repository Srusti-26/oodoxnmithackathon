// Theme Switcher for Enhanced Interactivity
class ThemeSwitcher {
    constructor() {
        this.themes = {
            'light-blue': {
                primary: '#0ea5e9',
                accent: '#22d3ee',
                background: '#f0f9ff'
            },
            'ocean': {
                primary: '#0891b2',
                accent: '#06b6d4',
                background: '#ecfeff'
            },
            'purple': {
                primary: '#8b5cf6',
                accent: '#a78bfa',
                background: '#faf5ff'
            },
            'green': {
                primary: '#10b981',
                accent: '#34d399',
                background: '#ecfdf5'
            }
        };
        this.currentTheme = 'light-blue';
        this.init();
    }

    init() {
        this.createThemeSwitcher();
        this.applyTheme(this.currentTheme);
    }

    createThemeSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        switcher.innerHTML = `
            <button class="theme-toggle" title="Change Theme">
                <i class="fas fa-palette"></i>
            </button>
            <div class="theme-options hidden">
                ${Object.keys(this.themes).map(theme => `
                    <button class="theme-option" data-theme="${theme}" title="${theme}">
                        <div class="theme-preview" style="background: ${this.themes[theme].primary}"></div>
                    </button>
                `).join('')}
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .theme-switcher {
                position: fixed;
                top: 20px;
                right: 80px;
                z-index: 1000;
            }
            .theme-toggle {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: none;
                background: var(--color-primary);
                color: white;
                cursor: pointer;
                box-shadow: var(--shadow-lg);
                transition: all 0.3s ease;
            }
            .theme-toggle:hover {
                transform: scale(1.1);
            }
            .theme-options {
                position: absolute;
                top: 50px;
                right: 0;
                background: white;
                border-radius: 8px;
                padding: 8px;
                box-shadow: var(--shadow-xl);
                display: flex;
                gap: 8px;
            }
            .theme-option {
                width: 30px;
                height: 30px;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                padding: 0;
                transition: transform 0.2s ease;
            }
            .theme-option:hover {
                transform: scale(1.2);
            }
            .theme-preview {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        `;
        document.head.appendChild(style);

        switcher.querySelector('.theme-toggle').onclick = () => {
            switcher.querySelector('.theme-options').classList.toggle('hidden');
        };

        switcher.querySelectorAll('.theme-option').forEach(btn => {
            btn.onclick = () => {
                this.applyTheme(btn.dataset.theme);
                switcher.querySelector('.theme-options').classList.add('hidden');
            };
        });

        document.body.appendChild(switcher);
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;

        document.documentElement.style.setProperty('--color-primary', theme.primary);
        document.documentElement.style.setProperty('--color-accent', theme.accent);
        document.documentElement.style.setProperty('--color-background', theme.background);
        
        this.currentTheme = themeName;
        
        // Add theme transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
});