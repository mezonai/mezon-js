export type Lang = 'en' | 'de';

export function getLang(): Lang {
  return window.location.pathname.startsWith('/de') ? 'de' : 'en';
}

const TEXT_MAP: Record<Lang, Record<string, string>> = {
  en: {
    openChat: 'Open chat',
    closeChat: 'Close chat',
    chatSupport: 'Customer Support',
    typeMessage: 'Type a message...',
    send: 'Send',
    defaultWelcomeMessage: 'Welcome {0}! How can I help you today?',
    connectedStartChatting: 'Connected! You can start chatting now.',
    failedConnect: 'Failed to connect. Please try again.',
    configurePeerId: 'Please configure a peer ID to start chatting. Call chat.startDM(peerId) first.',
    failedSendMessage: 'Failed to send message. Please try again.',
    welcome: 'Welcome!',
    signInToStart: 'Sign in to start chatting',
    loginWithMezon: 'Login with Mezon',
  },
  de: {
    openChat: 'Chat öffnen',
    closeChat: 'Chat schließen',
    chatSupport: 'Kundenservice',
    typeMessage: 'Nachricht eingeben...',
    send: 'Senden',
    defaultWelcomeMessage: 'Willkommen {0}! Wie kann ich Ihnen heute helfen?',
    connectedStartChatting: 'Verbunden! Sie können jetzt chatten.',
    failedConnect: 'Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.',
    configurePeerId: 'Bitte konfigurieren Sie eine Peer-ID zum Chatten. Rufen Sie zuerst chat.startDM(peerId) auf.',
    failedSendMessage: 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
    welcome: 'Willkommen!',
    signInToStart: 'Melden Sie sich an, um zu chatten',
    loginWithMezon: 'Mit Mezon anmelden',
  },
};

export function t(key: string): string {
  const lang = getLang();
  return TEXT_MAP[lang][key] ?? TEXT_MAP.en[key] ?? key;
}