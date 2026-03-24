import Code from "./Code";
import { cookieExpireTime } from "js-ts-kit";

const code = `
function Example() {
    const millisecondDate = cookieExpireTime("10000ms");
    const secondDate = cookieExpireTime("10s");
    const minuteDate = cookieExpireTime("10m");
    const hourDate = cookieExpireTime("1h");
    const dayDate = cookieExpireTime("1d");
    const yearDate = cookieExpireTime("1y");

    function formatNumber(number) {
        return number < 10 ? "0" + number : number;
    }

    function formatDate(date) {
        const month = formatNumber(date.getMonth() + 1);
        const day = formatNumber(date.getDate());
        const year = formatNumber(date.getFullYear());
        const hours = formatNumber(date.getHours());
        const minutes = formatNumber(date.getMinutes());
        const seconds = formatNumber(date.getSeconds());
        return "" + month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
    }

    return (
        <>
            <b>Time Now:</b> {formatDate(new Date())}<br/>
            <b>10000 milliseconds later:</b> {formatDate(millisecondDate)}<br/>
            <b>10 seconds later:</b> {formatDate(secondDate)}<br/>
            <b>10 minutes later:</b> {formatDate(minuteDate)}<br/>
            <b>1 hour later:</b> {formatDate(hourDate)}<br/>
            <b>1 day later:</b> {formatDate(dayDate)}<br/>
            <b>1 year later:</b> {formatDate(yearDate)}<br/>
        </>
    );
}
`;

function CookieExpireTimeCode(props) {
  return (
    <Code scope={{ cookieExpireTime }} {...props}>
      {code}
    </Code>
  );
}

export default CookieExpireTimeCode;
