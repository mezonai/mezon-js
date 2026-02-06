import { t } from '../i18n';
import chatIconSvg from '../icons/chat-icon.svg';
import closeIconSvg from '../icons/close-icon.svg';

export class ChatLauncher {
   private button!: HTMLButtonElement;
   private isOpen = false;
   private iconChat: string = chatIconSvg;

   constructor(onClick: () => void, iconChat?: string) {
      if (iconChat) this.iconChat = iconChat;

      this.button = this.createButton();
      this.button.addEventListener('click', () => {
         this.toggle();
         onClick();
      });
   }

   private createButton(): HTMLButtonElement {
      const button = document.createElement('button');
      button.className = 'mlc-launcher';
      button.setAttribute('aria-label', t('openChat'));

      this.button = button;
      this.setIcon(this.iconChat);

      return button;
   }

   private setIcon(icon: string): void {
      this.button.innerHTML = '';

      if (/<svg[\s>]/i.test(icon)) {
         const wrapper = document.createElement('span');
         wrapper.innerHTML = icon;

         const svg = wrapper.firstElementChild as SVGElement;
         svg.classList.add(
            'mlc-launcher-icon',
            this.isOpen ? 'is-close' : 'is-chat',
         );

         if (
            !svg.getAttribute('viewBox') &&
            svg.getAttribute('width') &&
            svg.getAttribute('height')
         ) {
            const w = svg.getAttribute('width');
            const h = svg.getAttribute('height');
            svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
         }

         svg.removeAttribute('width');
         svg.removeAttribute('height');

         this.button.appendChild(svg);
         return;
      }

      const img = document.createElement('img');
      img.src = icon;
      img.alt = '';
      img.className = `mlc-launcher-icon ${
         this.isOpen ? 'is-close' : 'is-chat'
      }`;

      this.button.appendChild(img);
   }

   public toggle(): void {
      this.isOpen = !this.isOpen;

      this.setIcon(this.isOpen ? closeIconSvg : this.iconChat);

      this.button.classList.toggle('is-open', this.isOpen);
   }

   public getButton(): HTMLButtonElement {
      return this.button;
   }

   public destroy(): void {
      this.button.remove();
   }
}
