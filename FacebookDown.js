const config = {
  name: "fbdown",
  aliases: ["fbd", "facebookdown"],
  description: "download video on Facebook",
  usage: "<fbd> <url>",
  permission: ["3"],
  versions: "0.0.1-beta",
  credits: "Xva - Phat",
  cooldown: 10
}

const langData = {
  "vi_VN": {
    error: "Đã có lỗi xảy ra!",
    missingInput: "Vui lòng nhập url (link) video"
  },
  "en_US": {
    error: "An error has occurred!",
    missingInput: "Please enter the video URL"
  },
  "ar_SY": {
    error: "حدث خطأ!",
    missingInput: "يرجى إدخال رابط الفيديو"
  }
};


async function onCall({ message, args, getLang }) {
  try {
    const input = args.join(" ");
    if (!input) return message.reply(getLang("missingInput"));

    const res = await global.GET(`https://sumiproject.space/facebook/video?url=${encodeURIComponent(input)}`);
    const data = res.data;

    if (!data.hd) return message.reply(getLang("error"));

    const imageStream = await global.getStream(data.hd);
    await message.reply({
      attachment: [imageStream]
    });
  } catch (e) {
    console.error(e);
    message.reply(getLang("error"));
  }
}

export default {
  config,
  langData,
  onCall
};


// Nha Uyen cùa tao dethw số 1
