const fs = require('fs');

function updateDBFile(filePath, handlers) {
    const {onReadError, onReadOver, onWriteError, onWriteOver} = handlers;
    fs.readFile(filePath, 'utf8', (err, dataStr) => {
        if (err) {
            onReadError?.(err)
            return;
        }
        const data = dataStr ? JSON.parse(dataStr) : []
        const newData = onReadOver?.(data) || []  // onReadOver 数据处理
        const newDataStr = JSON.stringify(newData);

        fs.writeFile(filePath, newDataStr, wErr => {
            if (wErr) {
                onWriteError?.(wErr)
                return;
            }
            onWriteOver?.() // 标识写入完成
        })
    })
}

module.exports = { updateDBFile };