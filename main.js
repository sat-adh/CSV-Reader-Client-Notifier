const fs = require('fs');
const nodemailer = require('nodemailer');

let res = [];
let clientName = "";
let clientEmail = "";
let clientsToEmail = [];


fs.readFileSync('./data.csv', 'utf-8').split(/\r?\n/).forEach(function(line){
    res.push(line);
})

res.forEach(element => {
    element = element.split(","); 
    let dtNow = new Date(), year = dtNow.getFullYear(), month = ''+(dtNow.getMonth()+1), day = ''+dtNow.getDate();
    if (month.length < 2) { month = '0' + month }
    if (day.length < 2) { day = '0' + day }
    let curDate = [year,month,day].join('-'), dtClient = element[3].split('-');
    clientName = element[2];
    clientEmail = element[element.length-1];    
    if (dtClient[1] - curDate.split('-')[1] == 1 && dtClient[2] - curDate.split('-')[2] == 0) {
        clientsToEmail.push(clientEmail);
    }
 });  

clientsToEmail.forEach(client => {
    console.log('Sending email to ' + client);
    sendEmail(client);
})


async function sendEmail(cliEmail) { //https://www.w3schools.com/nodejs/nodejs_email.asp

    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'xyz.testacc@gmail.com',
        pass: 'testaccount123'
      }
    });
  
    transporter.sendMail({
      from: '"Client Reminder Alert" <xyz.testacc@gmail.com>',
      to: cliEmail,
      subject: '1 month service expiry reminder ', 
      text: `Reminder that....`,

    }, function(error, info) {
        if (error) { console.log(error) }
        else { console.log("Message sent to client."); }
    });
}




