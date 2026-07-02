import { MezonClient } from "../../src/mezon-client/client/MezonClient";
import { TextChannel } from "../../src/mezon-client/structures/TextChannel";
import { TypeMessage } from "../../src/constants";

const requiredEnv = [
  "MEZON_BOT_ID",
  "MEZON_TOKEN",
  "MEZON_TEST_CLAN_ID",
  "MEZON_TEST_CHANNEL_ID",
] as const;

const hasRequiredEnv = requiredEnv.every((key) => !!process.env[key]);
const describeIfEnv = hasRequiredEnv ? describe : describe.skip;

const uniqueText = (label: string) =>
  `[mezon-sdk integration] ${label} ${Date.now()}`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function loginClient() {
  const client = new MezonClient({
    botId: process.env.MEZON_BOT_ID!,
    token: process.env.MEZON_TOKEN!,
  });

  await client.login();
  return client;
}

async function getTestChannel(client: MezonClient): Promise<TextChannel> {
  const clan = client.clans.get(process.env.MEZON_TEST_CLAN_ID!);
  if (!clan) {
    throw new Error(
      `Clan ${process.env.MEZON_TEST_CLAN_ID} was not joined after login`,
    );
  }

  await clan.loadChannels();
  return client.channels.fetch(process.env.MEZON_TEST_CHANNEL_ID!);
}

describeIfEnv("MezonClient message send flows", () => {
  jest.setTimeout(120_000);

  let client: MezonClient | undefined;
  let channel: TextChannel;

  beforeAll(async () => {
    client = await loginClient();
    channel = await getTestChannel(client);
  });

  afterAll(() => {
    client?.closeSocket();
  });

  it("logs in, sends, updates, replies, reacts, and deletes channel messages", async () => {
    const sent = await channel.send({ t: uniqueText("send") });
    expect(sent.id).toBeTruthy();
    expect(channel.messages.get(sent.id)).toBe(sent);
    const updatedContent = { t: uniqueText("update") };
    const updated = await sent.update(updatedContent);

    expect(updated).toBe(sent);

    const reply = await sent.reply({ t: uniqueText("reply") },);

    expect(reply.id).toBeTruthy();

    await sleep(2_000);

    await expect(reply.delete()).resolves.toBeTruthy();
    await expect(sent.delete()).resolves.toBeTruthy();
  });

  it("sends a DM when MEZON_TEST_DM_USER_ID is configured", async () => {
    const userId = process.env.MEZON_TEST_DM_USER_ID;
    if (!userId) {
      console.warn("Set MEZON_TEST_DM_USER_ID to run DM flow");
      return;
    }

    const user = await client!.users.fetch(userId!);
    const message = await user.sendDM(
      { t: uniqueText("send dm") },
      TypeMessage.Chat,
    );

    expect(message.id).toBeTruthy();

    await sleep(2_000);

    await expect(message.delete()).resolves.toBeTruthy();
  });
});
