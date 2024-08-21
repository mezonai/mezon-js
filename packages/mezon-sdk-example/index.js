/**
 * Copyright 2021 The Mezon Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { MezonClient } = require("mezon-sdk");
const { Client } = require('pg');
const net = require('net')
const wol = require('wake_on_lan');

const pgclient = new Client({
  user: '',
  password: '',
  host: '',
  port: 5432,
  database: '',
})

pgclient.connect().then(() => {
	console.log('Connected to PostgreSQL database');
}).catch((err) => {
  console.error('Error connecting to PostgreSQL database', err);
});

var client = new MezonClient("");

client.authenticate().then(async (e) => {
  console.log("authenticated.", e);
}).catch(e => {
  console.log("error authenticating.", e);
});

const messHelp =
  "```" +
  "Please daily follow this template" +
  "\n" +
  "*daily [projectCode] [date]" +
  "\n" +
  "yesterday: what you have done yesterday" +
  "\n" +
  "today: what you're going to to today; 2h" +
  "\n" +
  "block: thing that block you " +
  "```";

const dailyHelp =
  "```" +
  "Daily meeting note, recap your daily work items and log timesheet automatically." +
  "\n" +
  "Please daily follow this template:" +
  "\n\n" +
  "*daily [projectCode] [date]" +
  "\n" +
  "yesterday: what you have done yesterday" +
  "\n" +
  "today: what you're going to to today; 2h" +
  "\n" +
  "block: thing that block you" +
  "\n\n" +
  "Tips:" +
  "\n" +
  "- Today message will be log to timesheet automatically" +
  "\n" +
  "- Make sure that you checked the default task on timesheet tool" +
  "\n" +
  "- If no project code provided de default project will be used" +
  "\n" +
  "- Your projects can be listed by *userinfo or *timesheet help" +
  "\n" +
  "- Date accepting format dd/mm/yyy" +
  "\n" +
  "- If no time provided the timesheet will be created with 1h by default" +
  "\n" +
  "- Please review your timesheet to make sure that the information are correct" +
  "\n" +
  "- You can log multiple task for a project splitting by +" +
  "\n" +
  "- If you want to daily for multiple project please use *daily multiple times" +
  "```";

  function setTime(date, hours, minute, second, msValue) {
    return date.setHours(hours, minute, second, msValue);
  }
  
function checkTimeSheet() {
  let result = false;
  const time = new Date();
  const cur = new Date();
  const timezone = time.getTimezoneOffset() / -60;

  const fisrtTimeMorning = new Date(
    setTime(time, 0 + timezone, 30, 0, 0)
  ).getTime();
  const lastTimeMorning = new Date(
    setTime(time, 2 + timezone, 31, 0, 0)
  ).getTime();
  const fisrtTimeAfternoon = new Date(
    setTime(time, 5 + timezone, 0, 0, 0)
  ).getTime();
  const lastTimeAfternoon = new Date(
    setTime(time, 11 + timezone, 1, 0, 0)
  ).getTime();

  if (
    (cur.getTime() >= fisrtTimeMorning && cur.getTime() <= lastTimeMorning) ||
    (cur.getTime() >= fisrtTimeAfternoon && cur.getTime() <= lastTimeAfternoon)
  ) {
    result = true;
  }
  return result;
}

function checkTimeNotWFH() {
  let resultWfh = false;
  const time = new Date();
  const cur = new Date();
  const timezone = time.getTimezoneOffset() / -60;

  const fisrtTimeWFH = new Date(
    setTime(time, 0 + timezone, 30, 0, 0)
  ).getTime();
  const lastTimeWFH = new Date(setTime(time, 10 + timezone, 0, 0, 0)).getTime();

  if (cur.getTime() >= fisrtTimeWFH && cur.getTime() <= lastTimeWFH) {
    resultWfh = true;
  }
  return resultWfh;
}

function getAvailableBroadcastAddresses() {
  const interfacesNames = Object.keys(os.networkInterfaces());
  const addresses = [];
  for (const name of interfacesNames) {
    try {
      const addr = broadcastAddress(name);
      addresses.push(addr);
    } catch (e) {
      // ingnore
      console.log(e);
    }
  }
  return addresses;
}

function discoverDevice(macOrIp, ipAddress) {
  const isIp = (macOrIp || "").indexOf(".") > -1;
  if (!isIp) {
    return Promise.resolve({
      mac: macOrIp,
      ip: ipAddress,
    });
  }
  return find(macOrIp).catch(() => {
    return discoverDeviceFallback(macOrIp);
  });
}

function discoverDeviceFallback(ip) {
  return find(null).then((devices) => {
    return devices.find((dev) => {
      return dev.ip == ip;
    });
  });
}

function wakeDevice(macAddress, netMask, silent) {
  return new Promise((resolve, reject) => {
    wol.wake(
      macAddress,
      { address: netMask, port: 7, num_packets: 3 },
      (error) => {
        if (error && !silent) {
          return reject(new Error("Cannot send WoL packet."));
        }
        return resolve({ macAddress, netMask });
      }
    );
  });
}

function wakeDeviceOnAvailableNetworks(macAddress) {
  const addresses = getAvailableBroadcastAddresses();

  return Promise.all(
    addresses.map((addr) => wakeDevice(macAddress, addr, true))
  );
}

function sendCMDToPfsense(branch, identity, ipAddress) {
  let host;
  switch (branch) {
    case "hn2":
      host = "10.10.40.1";
      break;
    case "hn3":
      host = "10.10.70.1";
      break;
    case "dn":
      host = "10.10.30.1";
      break;
    case "sg1":
      host = "10.10.10.1";
      break;
    case "sg2":
      host = "10.10.50.1";
      break;
    case "vinh":
      host = "10.10.20.1";
      break;
    case "qn":
      host = "10.10.60.1";
      break;
    case "hn1":  
    default:
      host = "172.16.10.1";
      break;
  }
  try {
    var client = new net.Socket();
    client.connect(
      {
        host: host,
        port: 6996,
      },
      () => {
        // 'connect' listener
        client.write(`${ipAddress} ${identity}`);
      }
    );

    client.on("data", (data) => {
      client.end();
    });
  } catch (err) {
    console.log(err);
  }
}

function handleWoL(msg, ref, identity, ipAddress, branch) {
  sendCMDToPfsense(branch, identity, ipAddress);
  return discoverDevice(identity, ipAddress)
    .then((device) => {
      if (!device || !device.mac) {
        console.log(device);
        throw new Error("error while discovering device.");
      }
      return device;
    })
    .then((device) => {
      if (device.ip) {
        return wakeDevice(device.mac, device.ip, null);
      }
      return wakeDeviceOnAvailableNetworks(device.mac);
    })
    .then(async (res) => {
      if (!res) {
        throw new Error("no WoL packet sent!");
      }
      return await client.sendMessage(msg.clan_id, msg.channel_id, msg.mode, {"t": "Done, WoL packet sent!"}, undefined, undefined, Array(ref));
    })
    .catch(async (err) => {
      console.error(err);
      return await client.sendMessage(msg.clan_id, msg.channel_id, msg.mode, {"t": `Failed, ${err.message}`}, undefined, undefined, Array(ref));
    });
}

client.onmessagereaction = async (msg) => {
  console.log('onmessagereaction', msg);
}

client.onchannelcreated = async (user, add) => {
  console.log('onchannelcreated', user, add);
}

client.onuserclanremoved = async (user) => {
  console.log("onuserclanremoved", user);
}

client.onuserchanneladded = async (user) => {
  console.log("onuserchanneladded", user);
}

client.onchannelcreated = async (channel) => {
  console.log("onchannelcreated", channel);
}

client.onchanneldeleted = async (channel) => {
  console.log("onchanneldeleted", channel);
}

client.onchannelupdated = async (channel) => {
  console.log("onchannelupdated", channel)
}

client.onuserchannelremoved = async (msg) => {
  console.log('onuserchannelremoved', msg);
}

client.onchannelmessage = async (msg) => {
  const ref = {
    message_id: '',
    message_ref_id: msg.message_id,
    ref_type: 0,
    message_sender_id: msg.sender_id,
    message_sender_username: msg.username,
    mesages_sender_avatar: msg.avatar,
    message_sender_clan_nick: msg.clan_nick,
    message_sender_display_name: msg.display_name,
    content: JSON.stringify(msg.content),
    has_attachment: false
  };

  const text = msg.content.t;
  if (text && text.toLowerCase().startsWith("*wol")) {
    const args = text.split(" ");
    handleWoL(msg, ref, args[1], args[2], args[3]);
    return;
  }
  if (text && text.toLowerCase().startsWith("*daily")) {    
    const message = {"t":"✅ Daily saved."}
    if (text.length === 6) {
      await client.sendMessage(msg.clan_id, msg.channel_id, msg.mode, {"t": messHelp}, undefined, undefined, Array(ref));
      return;
    }

    const daily = text.substring(7);
    let checkDaily = false;
    const wordInString = (s, word) =>
      new RegExp("\\b" + word + "\\b", "i").test(s);
    ["yesterday", "today", "block"].forEach((q) => {
      if (!wordInString(daily, q)) return (checkDaily = true);
    });
    
    if (checkDaily) {
      await client.sendMessage(msg.clan_id, msg.channel_id, msg.mode, {"t": messHelp}, undefined, undefined, Array(ref));
      return;
    }

    if (!daily || daily == undefined) {
      await client.sendMessage(msg.clan_id, msg.channel_id, msg.mode, {"t": "please add your daily text"}, undefined, undefined, Array(ref));
      return;
    }

    if (daily.length < 100) {
      await client.sendMessage(msg.clan_id, msg.channel_id, msg.mode, {"t": "Please enter at least 100 characters in your daily text"}, undefined, undefined, Array(ref));
      return;
    }

    await pgclient.query("INSERT INTO komu_daily(userid, email, daily, \"createdAt\", channelid) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
      [msg.sender_id, msg.username, ref.content,  Date.now(), msg.channel_id]).catch(err => console.log(err));

    if (!checkTimeSheet()) {
      await client.sendMessage(msg.clan_id, msg.channel_id, msg.mode, {"t": "✅ Daily saved. (Invalid daily time frame. Please daily at 7h30-9h30, 12h-18h. WFH not daily 20k/time.)"}, undefined, undefined, Array(ref));
    } else if (!checkTimeNotWFH()) {
      await client.sendMessage(msg.clan_id, msg.channel_id, msg.mode, {"t": "✅ Daily saved. (Invalid daily time frame. Please daily at 7h30-17h. not daily 20k/time.)"}, undefined, undefined, Array(ref));
    } else {
      await client.sendMessage(msg.clan_id, msg.channel_id, msg.mode, message, undefined, undefined, Array(ref));
    }
  }
}
