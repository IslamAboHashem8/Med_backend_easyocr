const { exec } = require('child_process');

function runOCR(imagePath) {

    return new Promise((resolve, reject) => {

        // const command =
        //     `easyocr_env\\Scripts\\python.exe python\\ocr.py "${imagePath}"`;
        const command = process.platform === 'win32'
          ? `easyocr_env\\Scripts\\python.exe python\\ocr.py "${imagePath}"`
          : `python3 python/ocr.py "${imagePath}"`;

        console.log(command);

        exec(command, (error, stdout, stderr) => {

            if (error) {
                reject(error);
                return;
            }

            resolve(JSON.parse(stdout));

        });

    });

}

module.exports = { runOCR };