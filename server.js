/**
 * Created by bin.shen on 17/11/2016.
 */

var TopClient = require('./topClient').TopClient;
var config = require('./config');

var amqp = require('amqplib/callback_api');

var ex = 'ex_alert';
var uri = 'amqp://guest:guest@121.40.92.176';


var send_email = function() {

};

var send_phone_text = function() {
    var client = new TopClient(config.topClientOption);

    client.execute( 'alibaba.aliqin.fc.sms.num.send' , {
        'extend' : '' ,
        'sms_type' : 'normal' ,
        'sms_free_sign_name' : '七星博士' ,
        'sms_param' : "{code:'" + code + "'}" ,
        'rec_num' : tel ,
        'sms_template_code' : "SMS_25781236"
    }, function(err, body) {
        if(err) return callback(err);
        callback(null, body);
    });
};

var make_phone_call = function() {

};

amqp.connect(uri, function(err, conn) {
    conn.createChannel(function(err, ch) {
        ch.assertExchange(ex, 'fanout', { durable: false });
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            ch.bindQueue(q.queue, ex, '');
            ch.consume(q.queue, function(msg) {
                //console.log(" [x] %s", msg.content.toString());
                var data = JSON.parse(msg.content);
                var level = data.level;
                var address = data.address;
                if(level == 1) {

                } else if(level == 2) {

                } else if(level == 3) {

                } else {
                    //TODO
                }
            }, { noAck: true });
        });
    });
});