require('dotenv').config();
const { decodeQR } = require('./qr');
const { extractRollNumber, isRegistered } = require('./parser');
const { markPresent, getStats,giveCsv } = require('./attendance');
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.BOT_TOKEN,{polling : true});

bot.onText(/\/start/,(msg) => {
    bot.sendMessage(msg.chat.id, "welcome , provide image containing qr code of id card");
})
bot.on('photo',async(msg) =>{
    const photos=msg.photo;
    const highestRes = photos[photos.length-1];
    const imagePath = await bot.downloadFile(highestRes.file_id,'.');
    let message;

   try{ let qrstring= await decodeQR(imagePath);
    let rollNumber=extractRollNumber(qrstring);
    if(isRegistered(rollNumber)){
       let status = markPresent(rollNumber);
        if(status.success){
            message ="Attendance marked successfully";
        }
        else{
            message=`Attendace already marked at ${status.timestamp}`
        }

    }
    else{
        message="Please provide a valid student's qr code";
    }
}
    catch(e){
        
        if(e.message==='NOT_FOUND'){
            message="Error ,Roll number extraction failed";
        }
        else if(e.message==='OUT_OF_RANGE'){
            message="Error ,Roll number out of range !";
        }
        else if(e.message==='No QR code found'){
            message="Error , No QR code found in image";
        }
    }
    bot.sendMessage(msg.chat.id,message);
})

bot.onText(/\/report/,(msg) => {
    let stats=getStats();
    bot.sendMessage(msg.chat.id,`Total: ${stats.total}\nRoll numbers: ${stats.rollNumbers.join(', ')}`);
})

bot.onText(/\/export/,(msg) =>{
    giveCsv();
    bot.sendDocument(msg.chat.id,'temp.csv');
})
