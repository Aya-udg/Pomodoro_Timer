export const fetchTimerSettings  = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/timer");
      const data = await res.json();
      const WORK_TIME = data.set_time * 60; // 分 → 秒 に変換しとく
      const BREAK_TIME = data.break_time * 60;
      const LONG_BREAK_TIME = data.long_break_time * 60;
  
      return {
        WORK_TIME,
        BREAK_TIME,
        LONG_BREAK_TIME,
      };
    } catch (error) {
      console.error("エラーが発生しました", error);
      return {
        // エラーが発生した場合のデフォルト値を設定
        WORK_TIME: 1500,
        BREAK_TIME: 300,
        LONG_BREAK_TIME: 900,
      };
    }
  };