const config = {
  name: "gpt",
  credits: "Tanphat x API: ジョシュア ゲレロ ",
  cooldown: 5,
};

const langData = {
  vi_VN: {
    missingInput: "Vui lòng nhập text",
    notFound: "nể luôn",
    results: "{gpt4}",
    error: "Đã có lỗi xảy ra!",
  },
};

async function onCall({ message, args, getLang }) {
  try {
    const input = args.join(" ")
    if (!input) return message.reply(getLang("missingInput"));
    const encodedInput = encodeURIComponent(input);
    const res = await global.GET(
      `https://deku-rest-api.replit.app/gpt4?prompt=${encodedInput}&uid=tphatthankyou`,
    );

    const GPTdata = res.data;

    if (!GPTdata) return message.reply(getLang("notFound"));

    return message.reply(
      getLang("results", {
        gpt4: GPTdata.gpt4,
      }),
    );
  } catch (e) {
    console.error(e);
    message.reply(getLang("error"));
  }
}

export default {
  config,
  langData,
  onCall,
};
