/**
 * Created by bin.shen on 17/11/2016.
 */

var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var amqp = require('amqplib/callback_api');
var config = require('./config');

amqp.connect(config.rabbitMQ.uri, function(err, conn) {
    conn.createChannel(function(err, ch) {

        var level = 1;
        var address = "江苏省昆山市摩瑞尔电器";

        var data = {
            mac: "accf23b87fbf",
            address: address,
            level: level,
            tel: "18118438026",
            email: "18118438026@163.com"
        };
        var msg = JSON.stringify(data);

        ch.assertExchange(config.rabbitMQ.ex, 'fanout', { durable: false });
        ch.publish(config.rabbitMQ.ex, '', new Buffer(msg));
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
});

//
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
//
//
// var to = '23420800@qq.com';
// var subject = '七星博士环境监测报警邮件'; //发送的标题
// var html = '<div>江苏省昆山市摩瑞尔电器发生警报，警报等级：一级，请马上处理。</div>';//发送的内容
//
// var transport = nodemailer.createTransport(smtpTransport(config.smtpOption));
//
// var mailOptions = {
//     from: config.smtpOption.auth.user,
//     to: to,
//     subject:subject,
//     html:html
// };
//
// transport.sendMail(mailOptions, function(err, doc){
//     console.log(err);
//     console.log(doc);
// });
//
// var retry = require('retry');
//
// var send_email = function(email, address, level) {
//     var operation = retry.operation(config.retryOption);
//     operation.attempt(function(currentAttempt) {
//         var to = email;
//         var subject = '七星博士环境监测报警邮件';
//         var html = '<div>' + address + '发生警报，警报等级：' + level + '，请马上处理。</div>';
//         var transport = nodemailer.createTransport(smtpTransport(config.smtpOption));
//         var mailOptions = {
//             from: config.smtpOption.auth.user,
//             to: to,
//             subject:subject,
//             html:html
//         };
//         transport.sendMail(mailOptions, function(err, doc){
//             if (operation.retry(err)) {
//                 return;
//             }
//         });
//     });
// };