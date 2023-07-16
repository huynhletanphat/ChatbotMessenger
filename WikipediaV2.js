const config = {
  name: "search",
  description: "Simple information search on wikipedia",
  usage: "<search> <keywords>",
  aliases: ["search"],
  versions: "1.0.0",
  credits: "Xavia - Uyênn",
  cooldown: 5
}

const langData = {
  "vi_VN": {
    "missingInput": "Vui lòng nhập từ khóa",
    "notFound": "Không tìm thấy kết quả.",
    "results": "Kết quả cho từ khóa: {name}\n{answer_vi}",
    "error": "Đã có lỗi xảy ra. Vui lòng chờ giây lát."
  },
  "en": {
    "missingInput": "Please enter a keyword.",
    "notFound": "No results found.",
    "results": "Results for the keyword: {name}\n{answer_en}",
    "error": "An error has occurred. Please wait a moment."
  },
  "ar": {
    "missingInput": "الرجاء إدخال كلمة مفتاحية.",
    "notFound": "لم يتم العثور على نتائج.",
    "results": "نتائج البحث عن الكلمة المفتاحية: {name}\n{answer_ar}",
    "error": "حدث خطأ. الرجاء الانتظار لحظة."
  }
};

 async function onCall({ message, args, getLang }) {
  try {
    const input = args.join(" ");
    if (!input) return message.reply(getLang("missingInput"));
    const encodedInput = encodeURIComponent(input);
    const url = `https://search-data.phathuynh18.repl.co/wiki/${encodedInput}`;
    const res = await global.GET(url);
    const resp = res?.data || {};
    
    if (Object.keys(resp).length === 0) {
      return message.reply(getLang("notFound"));
    }
    
    const response = getLang("results", {
       name: resp.keyword,
       answer_vi: resp.answer_vi,
       answer_en: resp.answer_en,
       answer_ar: resp.answer_ar,
    });
    
    return message.reply(response);
  } catch (e) {
    console.error(e);
    return message.reply(getLang("error"));
  }
}

export default {
  config,
  langData,
  onCall
};

