/**
 * Created by bin.shen on 17/11/2016.
 */

module.exports = {
    topClientOption: {
        'appkey': 'appkey',
        'appsecret': 'appsecret',
        'REST_URL': 'http://gw.api.taobao.com/router/rest'
    },
    rabbitMQ: {
        'ex': 'ex_alert',
        'uri': 'amqp://guest:guest@host'
    },
    smtpOption: {
        host: 'smtp.163.com',
        port: 25,
        auth: {
            user: 'xxx@163.com',
            pass: 'xxx'
        }
    }
};