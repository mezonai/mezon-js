import { t } from '../i18n';

export class LoginView {
  private container: HTMLElement;
  private onLoginClick: () => void;

  constructor(onLoginClick: () => void) {
    this.onLoginClick = onLoginClick;
    this.container = this.createContainer();
  }

  private createContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'mlc-login-view';
    container.innerHTML = `
      <h3 class="mlc-login-title">${t('welcome')}</h3>
      <p style="color: var(--mlc-text-light); margin-bottom: 24px;">
        ${t('signInToStart')}
      </p>
      <button class="mlc-login-btn">
        ${t('loginWithMezon')}
      </button>
    `;

    const loginBtn = container.querySelector('.mlc-login-btn');
    loginBtn?.addEventListener('click', this.onLoginClick);

    return container;
  }

  public getContainer(): HTMLElement {
    return this.container;
  }

  public destroy(): void {
    this.container.remove();
  }
}
