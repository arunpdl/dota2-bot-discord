const ping = require("ping");

const servers = [
  { url: "syd.valve.net", name: "Australia (Sydney)", region: "aus" },

  {
    url: "vie.valve.net",
    name: "Europe East 1 (Vienna, Austria)",
    region: "eu",
  },

  {
    url: "185.25.182.1",
    name: "Europe East 2 (Vienna, Austria)",
    region: "eu",
  },

  { url: "lux.valve.net", name: "Europe West 1 (Luxembourg)", region: "eu" },

  { url: "146.66.158.1", name: "Europe West 2 (Luxembourg)", region: "eu" },

  { url: "sto.valve.net", name: "Russia 1 (Stockholm, Sweden)", region: "rus" },

  { url: "185.25.180.1", name: "Russia 2 (Stockholm, Sweden)", region: "rus" },

  { url: "dxb.valve.net", name: "Dubai (UAE)", region: "middle-east" },

  { url: "sgp-1.valve.net", name: "SE Asia 1 (Singapore)", region: "asia" },

  { url: "sgp-2.valve.net", name: "SE Asia 2 (Singapore)", region: "asia" },

  { url: "116.202.224.146", name: "India (Kolkata)", region: "asia" },

  {
    url: "cpt-1.valve.net",
    name: "South Africa 1 (Cape Town)",
    region: "africa",
  },

  { url: "197.80.200.1", name: "South Africa 2 (Cape Town)", region: "africa" },

  { url: "197.84.209.1", name: "South Africa 3 (Cape Town)", region: "africa" },

  {
    url: "196.38.180.1",
    name: "South Africa 4 (Johannesburg)",
    region: "africa",
  },

  { url: "200.73.67.1", name: "Chile (Santiago)", region: "sa" },

  { url: "gru.valve.net", name: "South America 1 (Sao Paulo)", region: "sa" },

  { url: "209.197.25.1", name: "South America 2 (Sao Paulo)", region: "sa" },

  { url: "209.197.29.1", name: "South America 3 (Sao Paulo)", region: "sa" },

  { url: "191.98.144.1", name: "Peru (Lima)", region: "sa" },

  { url: "iad.valve.net", name: "US East (Sterling, VA)", region: "na" },

  { url: "eat.valve.net", name: "US West (Seattle, WA)", region: "na" },
];

const getDotaPing = async ({ args }) => {
  if (args.length === 0) {
    return await pingAllServers();
  }
  if (args.length === 1) {
  }
  if (args.length > 1) {
    return "Invalid argument. Correct method: !dota-ping asia . Type !help for more details.";
  }
};

const pingAllServers = async () => {
  const results = await Promise.all(
    servers.map(async (eachServer) => {
      const res = await ping.promise.probe(eachServer.url);
      if (res.alive) return `${eachServer.name} - Avg. ${res.avg}ms`;
    })
  );
  return results;
};

const pingRegionalServers = async (args) => {
  const filteredServers = servers.filter(
    (eachServer) => eachServer.region === args[0]
  );
  if (filteredServers.length === 0) {
    return `Invalid region "${args[0]}" provided!`;
  }
  const results = await Promise.all(
    filteredServers.map(async (eachServer) => {
      const res = await ping.promise.probe(eachServer.url);
      if (res.alive) return `${eachServer.name} - Avg. ${res.avg}ms`;
    })
  );
  return results;
};

module.exports = {
  name: "dota-ping",
  description: "Get Dota 2 servers ping!",
  async execute(message, args) {
    if (args.length === 0) {
      const response = await pingAllServers();
      message.reply(response);
    }
    if (args.length === 1) {
      const response = await pingRegionalServers(args);
      message.reply(response);
    }
    if (args.length > 1) {
      message.reply(
        "Invalid argument. Correct method: !dota-ping asia . Type !help for more details."
      );
    }
  },
};
