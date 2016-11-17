/**
 * Created by bin.shen on 17/11/2016.
 */

var amqp = require('amqplib/callback_api');
var TopClient = require('./topClient').TopClient;
var config = require('./config');

var send_email = function(email, address, level) {

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

var tel = "18118438026";
var email = "23420800@qq.com";

amqp.connect(config.rabbitMQ.uri, function(err, conn) {
    conn.createChannel(function(err, ch) {
        ch.assertExchange(config.rabbitMQ.ex, 'fanout', { durable: false });
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            ch.bindQueue(q.queue, config.rabbitMQ.ex, '');
            ch.consume(q.queue, function(msg) {
                var data = JSON.parse(msg.content);
                var level = data.level;
                var address = data.address;
                if(level == 1) {
                    send_email(email, address, level);
                } else if(level == 2) {
                    send_phone_text(tel, address, level);
                } else if(level == 3) {
                    make_phone_call(tel, address, level);
                } else {
                    //TODO
                }
            }, { noAck: true });
        });
    });
});