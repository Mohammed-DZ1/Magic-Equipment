
export type Language = 'en' | 'fr' | 'ar';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  isTyping?: boolean;
}
