type DateString = {
  year: string;
  month: string;
  date: string;
  hour: string;
  min: string;
  sec: string;
};
const dateStrings: DateString[] = [
  { year: "年", month: "月", date: "日", hour: "時", min: "分", sec: "秒" },
  { year: "년", month: "월", date: "일", hour: "시", min: "분", sec: "초" },
];

export function printDate(date: Date, lang: "ja" | "ko") {
  const targetStrings = dateStrings[lang === "ja" ? 0 : 1];
  return ` ${date.getFullYear()}${targetStrings.year} ${date.getMonth() + 1}${targetStrings.month} ${date.getDate()}${
    targetStrings.date
  } ${date.getHours()}${targetStrings.hour} ${date.getHours()}`;
}
