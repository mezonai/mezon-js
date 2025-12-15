export interface P2PMessage {
  id: string;
  sender_id: string;
  display_name?: string;
  username?: string;
  avatar?: string;
  content: any;
  create_time?: string;
  create_time_seconds?: number;
  attachments?: any[];
  reactions?: any[];
}
