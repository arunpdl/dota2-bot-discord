const { request, gql } = require("graphql-request");
const { normalize } = require("../utils/normalize");
const { heroes } = require("../configs/constants");

const normalizedHeroData = normalize(heroes);

const fetchWinRate = async (message, arg) => {
  const query = gql`
    {
      heroStats {
        metaTrend {
          heroId
          ${arg}
        }
      }
    }
  `;

  request("https://api.stratz.com/graphql", query)
    .then((data) => {
      const {
        heroStats: { metaTrend },
      } = data;
      const sum = metaTrend.reduce(
        (total, eachData) => total + eachData[arg][13],
        0
      );
      const final = metaTrend
        .sort((a, b) => {
          return parseFloat(b[arg][13]) - parseFloat(a[arg][13]);
        })
        .slice(0, 10);
      const arr = final.map((eachHero) => {
        return `${normalizedHeroData[eachHero.heroId].displayName} - ${(
          (eachHero[arg][13] / sum) *
          100
        ).toFixed(2)}%`;
      });
      message.reply(
        `Hero Name | ${arg.charAt(0).toUpperCase()}${arg.slice(1)} Rate`
      );
      message.reply(arr);
    })
    .catch((error) => console.error("Error>>>>>", error));
};

module.exports = {
  name: "meta",
  description: "Get meta trends!",
  execute(message, args) {
    if (["win", "pick", "ban"].includes(args[0])) {
      fetchWinRate(message, args[0]);
    } else {
      message.reply("Invalid arguments. Valid arguments: win, pick, ban");
    }
  },
};
