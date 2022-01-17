var WebSocket = require('ws');
let ws = new WebSocket('wss://api.p2pquake.net/v2/ws');
 
// 接続時にお呼び出し
ws.addEventListener('open', e => {
    console.log('connected!');
})

// サーバからのデータ受信時に召喚
ws.addEventListener('message', e => {
    const obj = JSON.parse(e.data);

    console.log('=======new event=======');
    console.log(obj.time);
    console.log('コード：' + obj.code);

    var eventCode = obj.code;

    switch (eventCode) {
        case 551:
            var eqScale=obj.earthquake.maxScale / 10;
            console.log('地震情報');
            console.log(obj.earthquake.hypocenter.name + ' 最大震度' + eqScale);
            break;

        case 552:
            console.log('警告。津波の情報を受信');
            console.log(obj.areas[0].grade + '(' + obj.areas[0].name +')');
            break;

        case 554:
            console.log('緊急地震速報(EEW)の発表を検知。今後の情報に注意');
            break;

        case 555:
            console.log('各地域ピア数を受信');
            break;

        case 561:
            console.log('地震感知情報受信');
            break;

        case 9611:
            console.log('地震感知情報の解析結果を受信');
            break;

        default:
            console.log('不明な情報');
    }

})
