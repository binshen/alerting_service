/**
 * Created by bin.shen on 17/11/2016.
 */

var amqp = require('amqplib/callback_api');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var TopClient = require('./topClient').TopClient;
var retry = require('retry');
var config = require('./config');

var send_email = function(email, address, level) {
    var operation = retry.operation(config.retryOption);
    operation.attempt(function(currentAttempt) {
        var to = email;
        var subject = '七星博士环境监测报警邮件';
        var html = '<div>' + address + '发生警报，警报等级：' + level + '，请马上处理。</div>';
        var transport = nodemailer.createTransport(smtpTransport(config.smtpOption));
        var mailOptions = {
            from: config.smtpOption.auth.user,
            to: to,
            subject:subject,
            html:html
        };
        transport.sendMail(mailOptions, function(err, doc){
            if (operation.retry(err)) {
                return;
            }
        });
    });
};

var send_phone_text = function(tel, address, level) {
    var client = new TopClient(config.topClientOption);
    client.execute( 'alibaba.aliqin.fc.sms.num.send' , {
        'extend' : '' ,
        'sms_type' : 'normal' ,
        'sms_free_sign_name' : '七星博士' ,
        'sms_param' : "{address:'" + address + "',level:'" + level + "'}" ,
        'rec_num' : tel,
        'sms_template_code' : "SMS_26240223"
    }, function(err, body) {
        console.log(err);
        console.log(body);
    });
};

var make_phone_call = function(tel, address, level) {
    var client = new TopClient(config.topClientOption);
    client.execute( 'alibaba.aliqin.fc.tts.num.singlecall' , {
        'extend' : '' ,
        'tts_param' : "{address:'" + address + "',level:'" + level + "'}" ,
        'called_num' : tel ,
        'called_show_num' : '01053912804' ,
        'tts_code' : 'TTS_26335169'
    }, function(err, body) {
        console.log(err);
        console.log(body);
    });
};

// var tel = "18118438026";
// var email = "23420800@qq.com";

amqp.connect(config.rabbitMQ.uri, function(err, conn) {
    conn.createChannel(function(err, ch) {
        ch.assertExchange(config.rabbitMQ.ex, 'fanout', { durable: false });
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            ch.bindQueue(q.queue, config.rabbitMQ.ex, '');
            ch.consume(q.queue, function(msg) {
                console.log(msg.content.toString());
                var data = JSON.parse(msg.content);
                var level = data.level;
                var address = data.address;
                var tel = data.tel;
                var email = data.email;
                if(level == 1) {
                    send_email(email, address, "一级");
                } else if(level == 2) {
                    send_phone_text(tel, address, "二级");
                } else if(level == 3) {
                    make_phone_call(tel, address, "三级");
                } else {
                    //TODO
                }
            }, { noAck: true });
        });
    });
});