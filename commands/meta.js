const { request, gql } = require("graphql-request");
const { normalize } = require("../utils/normalize");
const { heroes } = require("../configs/constants");

const normalizedHeroData = normalize(heroes);

const fetchWinRate = async (message, arg) => {
  const query = gql`
    query DotaQuery {
      heroStats {
        metaTrend {
          heroId
          win
          pick
        }
      }
    }
  `;
  request("https://api.stratz.com/graphql", query)
    .then((data) => {
      const {
        heroStats: { metaTrend },
      } = data;

      const percentage = metaTrend.map((eachHero) => {
        return {
          heroId: eachHero.heroId,
          percent: eachHero.win[13] / eachHero.pick[13],
        };
      });

      const final = percentage
        .sort((a, b) => b.percent - a.percent)
        .slice(0, 10);

      const arr = final.map((eachHero) => {
        return `${normalizedHeroData[eachHero.heroId].displayName} - ${(
          eachHero.percent * 100
        ).toFixed(2)}%`;
      });
      message.channel.send(
        `Hero Name | ${arg.charAt(0).toUpperCase()}${arg.slice(1)} Rate`
      );
      message.channel.send(arr);
    })
    .catch((error) => console.error("Error>>>>>", error));
};

const fetchMetaRate = async (message, arg) => {
  const currentDate = parseInt(Date.now() / 1000);

  const query = gql`
    query DotaQuery ($currentDate : Long) {
      heroStats {
        metaTrend (day: $currentDate) {
          heroId
          ${arg}
        }
      }
    }
  `;

  request("https://api.stratz.com/graphql", query, { currentDate })
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
          1000
        ).toFixed(2)}%`;
      });
      message.channel.send(
        `Hero Name | ${arg.charAt(0).toUpperCase()}${arg.slice(1)} Rate`
      );
      message.channel.send(arr);
    })
    .catch((error) => console.error("Error>>>>>", error));
};

module.exports = {
  name: "meta",
  description: "Get meta trends!",
  execute(message, args) {
    if (["win", "pick", "ban"].includes(args[0])) {
      if (args[0] === "win") {
        fetchWinRate(message, args[0]);
      } else {
        fetchMetaRate(message, args[0]);
      }
    } else {
      message.reply("Invalid arguments. Valid arguments: win, pick, ban");
    }
  },
};
