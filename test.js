/**
 * Created by bin.shen on 17/11/2016.
 */


var amqp = require('amqplib/callback_api');

var ex = 'ex_alert';
var uri = 'amqp://guest:guest@121.40.92.176';

// amqp.connect(uri, function(err, conn) {
//     conn.createChannel(function(err, ch) {
//
//         var level = 1;
//         var msg = '{"mac": "accf23b87fbf", "address":"江苏省昆山市摩瑞尔电器", "level":' + level + '}';
//
//         ch.assertExchange(ex, 'fanout', { durable: false });
//         ch.publish(ex, '', new Buffer(msg));
//         console.log(" [x] Sent %s", msg);
//     });
//     setTimeout(function() { conn.close(); process.exit(0) }, 500);
// });


// var config = require('./config');
// var TopClient = require('./topClient').TopClient;
// var client = new TopClient(config.topClientOption);
//
// client.execute( 'alibaba.aliqin.fc.sms.num.send' , {
//     'extend' : '' ,
//     'sms_type' : 'normal' ,
//     'sms_free_sign_name' : '七星博士' ,
//     'sms_param' : "{address:'江苏省昆山市摩瑞尔电器',level:'一'}" ,
//     'rec_num' : '18118438026' ,
//     'sms_template_code' : "SMS_26240223"
// }, function(err, body) {
//     console.log(err);
//     console.log(body);
// });


// var nodemailer = require("nodemailer");
// var smtpTransport = require('nodemailer-smtp-transport');
//
// var to = '23420800@qq.com';
// var subject = '七星博士环境监测报警邮件'; //发送的标题
// var html = '<div>江苏省昆山市摩瑞尔电器发生警报，警报等级：一级，请马上处理。</div>';//发送的内容
//
// var transport = nodemailer.createTransport(smtpTransport({
//     host: 'smtp.163.com',
//     port: 25,
//     auth: {
//         user: '18118438026@163.com',//你真实的邮箱
//         pass: 'qwer1234'//真实的密码
//     }
// }));
//
// var mailOptions = {
//     from: '18118438026@163.com',
//     to: to,
//     subject:subject,
//     html:html
// };
//
// transport.sendMail(mailOptions, function(err, doc){
//     console.log(err);
//     console.log(doc);
// });