export interface ChannelMessage {
  clan_id: string;
  channel_id: string;
  message_id: string;
  code: number;
  sender_id: string;
  username: string;
  avatar: string;
  content: any; 
  create_time: string;
  update_time: string;
  display_name: string;
  mentions: any[]; 
  attachments: any[]; 
  references: any[]; 
  create_time_seconds: number;
  update_time_seconds: number;
  hide_editted: boolean;
}