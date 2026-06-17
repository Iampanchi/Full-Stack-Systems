const fs=require('fs');


var store = {};
try
{const data = fs.readFileSync('attendance.json','utf-8');
store = JSON.parse(data);
}catch(e){}

function markPresent(rollNumber){
    if(store[rollNumber]){
        return { success: false ,reason: "already_marked",timestamp : store[rollNumber].timestamp};
    }
    else{
        store[rollNumber]={timestamp :  new Date().toISOString()};
        fs.writeFileSync('attendance.json', JSON.stringify(store));
        return {success: true};
        
    }
}

function getStats(){
    return {total : Object.keys(store).length , rollNumbers : Object.keys(store).sort() };
}

function giveCsv(){
    let rollNumbers=Object.keys(store);
    const rows = Object.keys(store).map(rollNumber => {
    return `${rollNumber},${store[rollNumber].timestamp}`;
});
    const csvString = 'RollNumber,Timestamp\n'+ rows.join('\n');
    fs.writeFileSync('temp.csv',csvString);
    
}

module.exports = { markPresent , getStats,giveCsv};