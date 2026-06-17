// let qrString = `02.250424,1,MEUCIQDfd+UT3QpjZJBgO8XOrjSlamYj1A61Y15dgmASEaE2jgIgGXyVM5pEwMdQVcFSIyU6XLKf4EEXUvx5YQGFtSwY7fE=.iitkidcard`;

function extractRollNumber(qrString){
const allMatches=qrString.match(/\d{6}/g);

if(!allMatches)return null;

const validRoll=allMatches.find(numStr => {
    const num=Number(numStr);
    return isRegistered(num);
});
if(validRoll==null){
    throw new Error("NOT_FOUND");
}
return validRoll || null ;

}

function isRegistered(rollNumber) {
    const num = Number(rollNumber);
    if((num >= 240001 && num <= 240400)===false){
        throw new Error("OUT_OF_RANGE")
    }
    return num >= 240001 && num <= 240400;
}



module.exports = { extractRollNumber ,isRegistered };
