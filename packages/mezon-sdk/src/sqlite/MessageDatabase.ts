import Database from "better-sqlite3";
import { ChannelMessage } from "../interfaces";
import fs from "fs";
import path from "path";

export class MessageDatabase {
  private db: Database.Database;

  constructor(dbPath = "./mezon-cache/mezon-messages-cache.db") {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    this.ensureGitIgnore(dbPath);
    this.db = new Database(dbPath);
    this.init();
  }

  private ensureGitIgnore(dbPath: string) {
    const gitignorePath = path.resolve(".gitignore");
    const dirName = path.dirname(dbPath);
    let relativeDir = dirName.replace(/\\/g, "/");
    if (relativeDir.startsWith("./")) {
      relativeDir = relativeDir.slice(2);
    }

    try {
      let gitignoreContent = "";
      if (fs.existsSync(gitignorePath)) {
        gitignoreContent = fs.readFileSync(gitignorePath, "utf-8");
      }

      if (!gitignoreContent.includes(relativeDir)) {
        fs.appendFileSync(gitignorePath, `\n# Mezon cache\n/${relativeDir}`);
        console.log(`[mezon] Added "${relativeDir}" to .gitignore`);
      }
    } catch (err) {
      console.warn("[mezon] Could not modify .gitignore:", err);
    }
  }

  private init() {
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS messages_v2 (
          id TEXT NOT NULL,
          channel_id TEXT NOT NULL,
          clan_id TEXT NOT NULL,
          sender_id TEXT,
          content TEXT,
          mentions TEXT,
          attachments TEXT,
          reactions TEXT,
          msg_references TEXT,
          topic_id TEXT,
          create_time_seconds INTEGER,
          PRIMARY KEY (id, channel_id, clan_id)
        )`
      )
      .run();
    this.db
      .prepare(
        `CREATE INDEX IF NOT EXISTS idx_messages_v2_channel 
         ON messages_v2(channel_id)`
      )
      .run();
  }

  saveMessage(message: ChannelMessage) {
    const stmt = this.db.prepare(
      `INSERT OR REPLACE INTO messages_v2 (
        id, channel_id, clan_id, sender_id,
        content, mentions, attachments, reactions,
        msg_references, topic_id, create_time_seconds
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    stmt.run(
      message.message_id,
      message.channel_id,
      message.clan_id ?? "",
      message.sender_id ?? "",
      JSON.stringify(message.content ?? {}),
      JSON.stringify(message.mentions ?? []),
      JSON.stringify(message.attachments ?? []),
      JSON.stringify(message.reactions ?? []),
      JSON.stringify(message.references ?? []),
      message.topic_id ?? null,
      message.create_time_seconds ?? null
    );
  }

  getMessageById(messageId: string, channelId: string, clanId: string) {
    const stmt = this.db.prepare(
      `SELECT * FROM messages_v2 
       WHERE id = ? AND channel_id = ? AND clan_id = ?
       LIMIT 1`
    );
    const row = stmt.get(messageId, channelId, clanId) as any;
    if (!row) return null;

    return {
      ...row,
      content: JSON.parse(row.content),
      mentions: JSON.parse(row.mentions),
      attachments: JSON.parse(row.attachments),
      reactions: JSON.parse(row.reactions),
      references: JSON.parse(row.msg_references),
    };
  }
}
