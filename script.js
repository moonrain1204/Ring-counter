// --- 核心同步邏輯 ---
let isInitialConnection = true; // 用於防止連線瞬間跳號

bleChar.addEventListener('characteristicvaluechanged', (event) => {
    const data = event.target.value;
    
    // 根據 Raw data 0x...08084455... 分析
    // 數值同步通常在 DataView 的特定偏移量
    if (data.byteLength >= 2) {
        // 讀取戒指傳來的 16 位元總計數值
        const hardwareCount = data.getUint16(0, true); 

        // 1. 防止連線瞬間加 1
        if (isInitialConnection) {
            isInitialConnection = false;
            // 如果連線時想以戒指為主，可取消註釋下一行
            // count = hardwareCount; updateDisplay();
            return; 
        }

        // 2. 數值完全同步
        if (hardwareCount !== count) {
            count = hardwareCount; 
            updateDisplay(); // 觸發畫面更新與存檔
        }
    }
});
