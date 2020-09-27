module.exports = {
  name: "help",
  description: "Display list of available commands!",
  execute(message) {
    const infoMessage = [
      "!roll - Returns random number between 0 to 99.",
      "!ping - Returns the current discord server ping.",
      "!dota-ping - Returns Dota 2 server pings worldwide",
      "!dota-ping <REGION> - Returns Dota 2 server pings based on provided region ",
      "Available regions: aus, eu, rus, asia, africa, middle-east, na, sa",
    ];
    message.reply(infoMessage);
  },
};
