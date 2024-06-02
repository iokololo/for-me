import scms from "../utils/scms_api.js";
class PhoneSender {
  static async sendSMS(phone, code) {
    scms.send_sms(
      {
        phones: [`8${phone}`],
        mes: `Код подтверждения ${code}`,
      },
      function (data, raw, err, code) {
        if (err) return console.log(err, "code: " + code);
        console.log(data); // object
        console.log(raw); // string in JSON format
      }
    );
    console.log("SMS sent successfully", phone, code);
  }
}

export default PhoneSender;
