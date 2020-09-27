module.exports = {
  name: "roll",
  description: "Get random number between 0-99!",
  execute(message) {
    message.reply(
      `${message.author.username} got ${Math.floor(Math.random() * 99)}.`
    );
  },
};
