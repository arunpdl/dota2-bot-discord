module.exports = {
  name: "help",
  description: "Display list of available commands!",
  execute(message) {
    const infoMessage = [
      "!roll - Returns random number between 0 to 99.",
      "!ping - Returns the current discord server ping.",
      "!meta pick - Returns current meta picks with percentage",
      "!meta ban - Returns current meta bans with percentage",
      "!meta win - Returns current meta wins with percentage",
    ];
    message.reply(infoMessage);
  },
};
