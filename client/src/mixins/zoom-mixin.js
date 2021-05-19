import { ZoomMtg } from "@zoomus/websdk";

ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.1/lib", "/av");
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

const API_KEY = "wiW9Xl0kQ8uOd286l5idUg";
const API_SECRET = "L8M5LRSdTgA945sn71Q19gHAXHy7sOg9DTN0";

function join(meetingNumber, userName, password, role) {
  const meetingCfg = {
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    meetingNumber: 98310454075,
    userName: "peteboysen@gmail.com",
    passWord: "153126",
    leaveUrl: "localhost:8080",
    isSupportAV: true,
    role: 0,
    success: res => {
      meetingCfg.signature = res.result;
      ZoomMtg.init(meetingCfg);
      meetingCfg.success = status => {
        console.log(status.result);
        ZoomMtg.join(meetingCfg);
        console.log("joined");
      };
    },
    error: status => {
      console.log(status.result);
    }
  }
}
