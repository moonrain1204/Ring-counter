bleChar.addEventListener('characteristicvaluechanged', (event) => {
    const data = event.target.value;
    
    // 假設設備傳送的是 16 位元整數 (Little Endian 格式)
    // 這是最常見的同步方式：直接讀取硬體傳來的總次數
    if (data.byteLength >= 2) {
        const hardwareCount = data.getUint16(0, true); 
        
        // 同步數值
        if (hardwareCount !== count) {
            count = hardwareCount; 
            updateDisplay(); // 執行原有 V6.1 的更新畫面與存檔功能
        }
    }
});
