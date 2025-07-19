export const fetchTimerSettings  = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/timer");
      const data = await res.json();
      const workTime = data.set_time * 60; // 分 → 秒 に変換しとく
      const breakTime = data.break_time * 60;
      const longBreakTime = data.long_break_time * 60;
  
      return {
        workTime,
        breakTime,
        longBreakTime,
      };
      
    } catch (error) {
      console.error("エラーが発生しました", error);
      return {
        // エラーが発生した場合のデフォルト値を設定
        workTime: 1500,
        breakTime: 300,
        longBreakTime: 900,
      };
    }
  };