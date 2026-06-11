// Prblm 1
class Student{
    constructor(name,scores){
        this.name=name;
        this.scores=scores;}
        get average(){
            let sum=0;
            for(let i = 0 ;i<(this.scores).length;i++){
                sum+=this.scores[i];
            }
            return sum/(this.scores).length;
            
        }
        // A >= 80 , B >= 65 , C >=45 , D>= 20 , F<20;
        get letterGrade(){
            let avg=this.average;
            if(avg>=90){
                return "A";
            }
            else if(avg>=80){
                return "B";
            }
            else if(avg>=70){
                return "C";
            }
            else if(avg>=60){
                return "D";
            }
            else{
                return "F";
            }
        }
        summary(){
            let lowest=100000,highest=-1;
            for(let i = 0 ;i<(this.scores).length;i++){
                if(this.scores[i]>highest){
                    highest=this.scores[i];
                }
                if(this.scores[i]<lowest){
                    lowest=this.scores[i];
                }
            } 
                return {highest,lowest};

        }

    // Prblm 3
    get reportcard(){
        const {highest,lowest}=this.summary();
        console.log(`Name : ${this.name}\nScores : ${this.scores}\nAverage : ${this.average.toFixed(1)}\n${this.letterGrade}\nHigh/Low : ${highest}/${lowest}`);
    }
    getRemark(){
        console.log((this.average>=60) ? "PASS" : "FAIL");
        let remark;
        switch(this.letterGrade){
            case "A":
                remark="Outstanding";
                break;
            case "B":
                remark="Excellent";
                break;
            case "C":
                remark="Very Good";
                break;
            case "D":
                remark="Good";
                break;
            case "F":
                remark="Improvement Needed";
                break;
                
        }
        console.log(`Remark : ${remark}`);
    }
    get scoreBreakdown(){
        const [score1,score2,...remaining] = this.scores;
        console.log(`Score1 : ${score1}\nScore2 : ${score2}\nRemaining : ${remaining}`);
    }
   
}
if(process.argv.length>3) // Prblm 2
{
let arr = process.argv;
let name = arr[2];
let scores = arr.slice(3).map(Number);
if(scores.length<3){
    console.log("Error , Needs at least 3 scores !");
    process.exit(1);
}
// example : 
// let aura = new Student(name,scores);
// aura.scoreBreakdown;
// aura.reportcard;
// aura.getRemark();
}

else if(process.argv.length==3)// Prblm 4
{

// GIVE THE FILE NAME WHEN RUNNING FOR THIS TO WORK , eg node assignment1.js students.json 
// I have added bonus.json for trial run in the folder 
const fs=require('fs');

const data=fs.readFileSync(process.argv[2],'utf8');
const students=JSON.parse(data);
let topscorer,topscore=-1;

for(let i = 0;i<students.length;i++){
    let std=new Student(students[i].name,students[i].scores);
    std.reportcard;
    if(std.average>topscore){
        topscorer=std.name;
        topscore=std.average;
    }
    console.log("\n");
}
console.log(`Top Scorer is ${topscorer} with average score of ${topscore.toFixed(1)}`);

}
else{
    console.log("Please provide arguments for it to work !")
}