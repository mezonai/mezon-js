import type { LightClient } from 'mezon-light-sdk';
import { t } from '../i18n';
import headerIconSvg from '../icons/logo.svg';
import { ChatService } from '../services/ChatService';
import { LogService } from '../services/LogService';
import { ChatMessage, MezonLightChatConfig, UserInfo } from '../types';
import { LoginView } from './LoginView';

export class ChatWidget {
   private container: HTMLElement;
   private messagesContainer: HTMLElement;
   private inputElement: HTMLInputElement;
   private inputArea: HTMLElement;
   private config: MezonLightChatConfig;
   private mezonClient: LightClient | null = null;
   private messages: ChatMessage[] = [];
   private loginView: LoginView | null = null;
   private isAuthenticated: boolean = false;
   private onLoginRequest: (() => void) | null = null;
   private onClose: (() => void) | null = null;
   private iconHeader: string = headerIconSvg;
   private selectedFile: File | null = null;
   private previewContainer: HTMLElement | null = null;

   constructor(
      config: MezonLightChatConfig,
      onLoginRequest: () => void,
      savedSession?: any,
      onClose?: () => void,
      iconHeader?: string,
   ) {
      this.config = config;
      if (iconHeader) {
         this.iconHeader = iconHeader;
      }

      this.onLoginRequest = onLoginRequest;
      this.onClose = onClose ?? null;
      this.container = this.createContainer();
      this.messagesContainer = this.container.querySelector('.mlc-messages')!;
      this.inputElement = this.container.querySelector('.mlc-input')!;
      this.inputArea = this.container.querySelector('.mlc-input-area')!;
      this.createPreviewArea();
      this.setupEventListeners();
      if (savedSession) {
         this.restoreSession(savedSession);
      } else {
         this.showLoginView();
      }
   }

   private async restoreSession(session: any): Promise<void> {
      try {
         const { LightClient } = await import('mezon-light-sdk');
         const defaultServerKey = 'HTTP3m3zonPr0dkey:';

         const client = LightClient.initClient({
            token: session.token,
            refresh_token: session.refresh_token,
            api_url: session.api_url,
            user_id: session.user_id,
            serverkey: defaultServerKey,
         });

         const isExpired = await client.isSessionExpired();
         if (isExpired) {
            const refreshExpired = await client.isRefreshSessionExpired();
            if (refreshExpired) throw new Error('Refresh token also expired');
            await client.refreshSession();

            if (this.config.saveSession) {
               const { StorageService } = await import('../services/StorageService');
               new StorageService().save({
                  ...client.session,
                  user_id: session.user_id,
                  username: session.username,
                  name: session.name,
               });
            }
         }

         this.handleLoginSuccess(client, {
            user_id: session.user_id,
            username: session.username,
            name: session.name,
         });
      } catch (error) {
         console.error('Failed to restore session:', error);
         const { StorageService } = await import('../services/StorageService');
         new StorageService().clear();
         this.showLoginView();
      }
   }

   private createContainer(): HTMLElement {
      const container = document.createElement('div');
      container.className = 'mlc-container';
      container.innerHTML = `
      <div class="mlc-header">
         <div class="mlc-header-title-wrap">
            <div class="mlc-header-icon"></div>
            <h3 class="mlc-header-title">${t('chatSupport')}</h3>
         </div>
         <button class="mlc-close-btn" aria-label="Close chat">×</button>
      </div>
      <div class="mlc-messages"></div>
      <div class="mlc-input-area" style="display: none;">
         <input type="file" class="mlc-file-input" accept="image/*" style="display: none;" />
         <button class="mlc-attach-btn" title="Attach Image">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
         </button>
         <input type="text" class="mlc-input" placeholder="${t('typeMessage')}" />
         <button class="mlc-send-btn">${t('send')}</button> 
      </div>
   `;

      const iconWrapper = container.querySelector('.mlc-header-icon') as HTMLElement;
      const icon = this.iconHeader?.trim() || '';

      if (icon.startsWith('<svg') || icon.startsWith('<?xml')) {
         const parser = new DOMParser();
         const doc = parser.parseFromString(icon, 'image/svg+xml');
         const svgElement = doc.querySelector('svg');

         if (svgElement) {
            if (!svgElement.getAttribute('viewBox')) {
               const w = svgElement.getAttribute('width') || '240';
               const h = svgElement.getAttribute('height') || '241';
               svgElement.setAttribute('viewBox', `0 0 ${w} ${h}`);
            }
            svgElement.removeAttribute('width');
            svgElement.removeAttribute('height');
            svgElement.style.display = 'block';
            svgElement.style.width = '100%';
            svgElement.style.height = '100%';
            iconWrapper.appendChild(svgElement);
         }
      } else if (icon) {
         const img = document.createElement('img');
         img.src = icon;
         img.className = 'mlc-header-icon-img';
         iconWrapper.appendChild(img);
      }

      return container;
   }

   private setupEventListeners(): void {
      const closeBtn = this.container.querySelector('.mlc-close-btn');
      const sendBtn = this.container.querySelector('.mlc-send-btn');
      const attachBtn = this.container.querySelector('.mlc-attach-btn');
      const fileInput = this.container.querySelector('.mlc-file-input') as HTMLInputElement;

      closeBtn?.addEventListener('click', () => {
         this.close();
         if (this.onClose) this.onClose();
      });

      attachBtn?.addEventListener('click', () => fileInput.click());

      fileInput?.addEventListener('change', () => {
         if (fileInput.files && fileInput.files[0]) {
            this.prepareImage(fileInput.files[0]); 
            fileInput.value = '';
         }
      });

      sendBtn?.addEventListener('click', () => this.sendMessage());

      this.inputElement.addEventListener('keydown', (e) => {
         if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
         }
      });

      this.inputElement.addEventListener('paste', (e: ClipboardEvent) => {
         const items = e.clipboardData?.items;
         if (!items) return;
         for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
               const blob = items[i].getAsFile();
               if (blob) this.prepareImage(blob);
            }
         }
      });
   }

   private prepareImage(file: File): void {
      this.selectedFile = file;
      if (this.previewContainer) {
         const url = URL.createObjectURL(file);
         this.previewContainer.innerHTML = `
            <div class="mlc-preview-wrapper">
                <div class="mlc-preview-item">
                    <img src="${url}" class="mlc-preview-img" />
                    <button class="mlc-remove-preview" title="Xóa ảnh">×</button>
                </div>
                <span class="mlc-preview-filename">${this.escapeHtml(file.name)}</span>
            </div>
        `;
         this.previewContainer.style.display = 'block';

         this.previewContainer.querySelector('.mlc-remove-preview')?.addEventListener('click', () => {
            this.clearSelectedFile();
         });
      }
   }

   private clearSelectedFile(): void {
      this.selectedFile = null;
      if (this.previewContainer) {
         this.previewContainer.innerHTML = '';
         this.previewContainer.style.display = 'none';
      }
      const fileInput = this.container.querySelector('.mlc-file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
   }

   private createPreviewArea(): void {
      const preview = document.createElement('div');
      preview.className = 'mlc-image-preview-container';
      preview.style.display = 'none';
      this.container.insertBefore(preview, this.inputArea);
      this.previewContainer = preview;
   }

   private getImageDimensions(file: File): Promise<{ width: number; height: number }> {
      return new Promise((resolve) => {
         const img = new Image();
         img.onload = () => resolve({ width: img.width, height: img.height });
         img.onerror = () => resolve({ width: 0, height: 0 });
         img.src = URL.createObjectURL(file);
      });
   }

   private async fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();

         reader.onload = () => resolve(reader.result as ArrayBuffer);
         reader.onerror = reject;

         reader.readAsArrayBuffer(file);
      });
   }

   private async handleImageUpload(file: File): Promise<void> {
      try {
         const client = this.mezonClient;
         const chatService = (this as any).chatService;
         if (!client || !chatService) return;

         const tempUrl = URL.createObjectURL(file);
         this.addMessage({
            id: `temp-${Date.now()}`,
            content: tempUrl,
            sender: 'user',
            timestamp: Date.now(),
            type: 'image'
         });

         const dimensions = await this.getImageDimensions(file);
         const uploadResponse = await client.uploadAttachment({
            filename: file.name,
            filetype: file.type,
            size: file.size,
            width: dimensions.width,
            height: dimensions.height
         });

         if (!uploadResponse?.url) throw new Error('Failed to get upload URL');

         await fetch(uploadResponse.url, {
            method: 'PUT',
            headers: { 'Content-Type': file.type },
            body: file
         });

         const urlObj = new URL(uploadResponse.url);
         const cdnUrl = `${urlObj.protocol}/${urlObj.host}${urlObj.pathname}`;
         const currentChannelId = chatService.getCurrentChannelId();

         if (currentChannelId) {
            await chatService.sendDM({
               channelId: currentChannelId,
               content: { t: '' },
               attachments: [{
                  filename: file.name,
                  url: cdnUrl,
                  filetype: file.type,
                  size: file.size,
                  width: dimensions.width,
                  height: dimensions.height
               }]
            });
         }

         URL.revokeObjectURL(tempUrl);
      } catch (error) {
         console.error('Upload failed:', error);
         this.addMessage({
            id: Date.now().toString(),
            content: t('failedSendMessage'),
            sender: 'ai',
            timestamp: Date.now()
         });
      }
   }

   public addMessage(message: ChatMessage): void {
      this.messages.push(message);
      const messageEl = document.createElement('div');
      messageEl.className = `mlc-message ${message.sender}`;

      const isImage = message.type === 'image' || message.content.startsWith('data:image') || message.content.startsWith('blob:');

      if (isImage) {
         messageEl.innerHTML = `
            <div class="mlc-message-bubble mlc-message-image">
               <img src="${message.content}" style="max-width: 100%; border-radius: 8px; cursor: pointer; display: block;" />
            </div>
         `;
         messageEl.querySelector('img')?.addEventListener('click', () => window.open(message.content, '_blank'));
      } else {
         messageEl.innerHTML = `<div class="mlc-message-bubble">${this.escapeHtml(message.content)}</div>`;
      }

      this.messagesContainer.appendChild(messageEl);
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
   }

   private showLoginView(): void {
      this.loginView = new LoginView(() => this.onLoginRequest?.());
      this.messagesContainer.innerHTML = '';
      this.messagesContainer.appendChild(this.loginView.getContainer());
   }

   public async handleLoginSuccess(client: LightClient, user: UserInfo): Promise<void> {
      this.mezonClient = client;
      this.isAuthenticated = true;
      if (this.config.saveSession) {
         const { StorageService } = await import('../services/StorageService');
         new StorageService().save({ ...client.session, ...user });
      }
      if (this.loginView) { this.loginView.destroy(); this.loginView = null; }
      this.messagesContainer.innerHTML = '';
      this.inputArea.style.display = 'flex';
      await this.initializeChatService(client);
      if (this.config.peerId) await this.autoStartDM(this.config.peerId);
   }

   private async autoStartDM(peerId: string): Promise<void> {
      const chatService = (this as any).chatService;
      if (!chatService) return;
      try {
         await chatService.startDM(peerId);
         if (this.config.autoOpen) this.open();
      } catch (e) { console.error(e); }
   }

   private async initializeChatService(client: LightClient): Promise<void> {
      try {
         const chatService = new ChatService(client);
         await chatService.connect();
         chatService.onMessage((msg) => {
            if (msg.sender_id !== client.userId) {
               this.addMessage({ id: msg.id, content: msg.content, sender: 'ai', timestamp: msg.timestamp });
            }
         });
         (this as any).chatService = chatService;
      } catch (e) { console.error(e); }
   }

   public open(): void { this.container.classList.add('open'); }
   public close(): void { this.container.classList.remove('open'); }
   public toggle(): void { this.container.classList.toggle('open'); }

   private async sendMessage(): Promise<void> {
      if (!this.isAuthenticated) return;

      const text = this.inputElement.value.trim();
      const fileToSend = this.selectedFile;

      if (!text && !fileToSend) return;

      this.inputElement.value = '';
      const chatService = (this as any).chatService;
      if (!chatService) return;

      if (text) {
         this.addMessage({ id: Date.now().toString(), content: text, sender: 'user', timestamp: Date.now() });
         await chatService.sendMessage(text);
      }

      if (fileToSend) {
         await this.handleImageUpload(fileToSend);
         this.clearSelectedFile();
      }
   }

   private escapeHtml(text: string): string {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
   }

   public getContainer(): HTMLElement { return this.container; }
   public destroy(): void { this.container.remove(); }
}