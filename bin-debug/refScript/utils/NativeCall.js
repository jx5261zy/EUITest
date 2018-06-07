/**
 * crated at 2017-5-27 13:50:45 by pujunji
 * native通讯调用的接口
 */
var NativeCall;
(function (NativeCall) {
    //native调用的
    function updateDeviceString(struuid) {
        GlobalPara.deviceUUID = struuid;
        egret.localStorage.setItem("devicestring", GlobalPara.deviceUUID);
    }
    NativeCall.updateDeviceString = updateDeviceString;
    function closeSocket() {
        // GateClient.getInstance().close();
        // UserData.isRoomLogon = false;
        // GateClient.getInstance().shouldReconnect = false;
    }
    NativeCall.closeSocket = closeSocket;
    function updateScreenSize(strSize) {
        var sizes = strSize.split(':');
        GlobalPara.screenWidth = parseInt(sizes[0]);
        GlobalPara.screenHeight = parseInt(sizes[1]);
    }
    NativeCall.updateScreenSize = updateScreenSize;
    // 重连
    function reconnect() {
        // //断开再重连
        // UserData.isRoomLogon = false;
        // GateClient.getInstance().shouldReconnect = true;
        // GateClient.getInstance().reconnectTimes = Network.MAX_RECONNECT_TIME;
        // if (UserData.loginIn) {
        //     Main.getInstance().show(new ReconnectView(8, true), false);    
        // }        
    }
    NativeCall.reconnect = reconnect;
    function uploadFileResult(result) {
        if ([null, undefined].indexOf(BrowserBrige.browserCB) == -1) {
            BrowserBrige.browserCB(result);
            BrowserBrige.browserCB = null;
        }
    }
    NativeCall.uploadFileResult = uploadFileResult;
    // 获取native设备信息返回
    function deviceInfoReturn(result) {
        if (result == '1') {
            GlobalPara.bReleaseLobby = false;
        }
        else {
            GlobalPara.bReleaseLobby = true;
        }
    }
    NativeCall.deviceInfoReturn = deviceInfoReturn;
    // 下载游戏或者更新的进度
    function downloadProcess(value) {
        // // Utils.showLog('---download--process--value----' + value);
        // var data = JSON.parse(value);
        // if (data.state == 0) {
        //     AppFacade.getInstance().sendNotification(CommonMessageMediator.UPDATE_DOWNLOAD_COMPLETE, {version: data.version});
        // } else if (data.state == 2) {
        //     AppFacade.getInstance().sendNotification(CommonMessageMediator.UPDATE_DOWNLOAD_ERROR);
        // } else if (data.state == 1) {
        //     AppFacade.getInstance().sendNotification(CommonMessageMediator.UPDATE_DOWNLOAD_PROCESS, {data: {value: parseInt(data.value)}});
        //     if (GlobalPara.currentDownloadGame != "lobby") {
        //         AppFacade.getInstance().sendNotification(IndexViewMediator.GAME_DOWNLOAD_PROCESS, {data: {value: parseInt(data.value)}});    
        //     }            
        // }
    }
    NativeCall.downloadProcess = downloadProcess;
    // 判断游戏是否存在返回
    function checkGameExistReturn(value) {
        // var data = value.split(":");
        // UserData.gameDownloaded[data[0]] = parseInt(data[1]);
        // AppFacade.getInstance().sendNotification(IndexViewMediator.CHECK_GAME_EXITS);
    }
    NativeCall.checkGameExistReturn = checkGameExistReturn;
    function getAllGamesReturn(value) {
        // var data = value.split(':');
        // for (var i = 0; i < data.length; ++i) {
        //     UserData.gameDownloaded[Utils.decryptFileName(data[i])] = 1;
        // }
        // AppFacade.getInstance().sendNotification(IndexViewMediator.UPDATE_GAME_STATE);
    }
    NativeCall.getAllGamesReturn = getAllGamesReturn;
    function buyDiamondReturn(value) {
        BuymentManage.buyDiamondReturn(value);
    }
    NativeCall.buyDiamondReturn = buyDiamondReturn;
    function getLoginInfoReturn(value) {
        // try {
        //     // var json_d = JSON.parse(Utils.Base64Parse(value));
        //     // Utils.showLog('--the json_d', json_d);
        // //     if ([null, undefined].indexOf(json_d) == -1) {
        // //         GlobalPara.myip = json_d['myRemoteIpNumStr'];
        // //         GlobalPara.loginhost = json_d['proxyIp'];
        // //         if (GlobalPara.loginhost == '0.0.0.0') {
        // //             GlobalPara.loginhost = '';
        // //         }
        // //         GlobalPara.loginport = json_d['port'];
        // //         // GlobalPara.packageState = json_d['packageState'];
        // //         // GlobalPara.hotUpdateSwitch = json_d['packageResourceUpdate'] == 1;
        // //         // GlobalPara.updateURL = json_d['packageResourceUrl'];
        // //         if (GlobalPara.getLoginInfoCB) {
        // //             GlobalPara.getLoginInfoCB();   
        // //         }
        // //     } else {
        // //         GlobalPara.getLoginInfoCB("error");
        // //     }
        // // } catch(err) {
        // //     GlobalPara.getLoginInfoCB("error");
        // }
    }
    NativeCall.getLoginInfoReturn = getLoginInfoReturn;
    // 通过3dtouch触发的快速游戏
    function quickStartGame(kindID) {
        // GlobalPara.quickStartGameKindID = parseInt(kindID);
    }
    NativeCall.quickStartGame = quickStartGame;
    function myipReturn(myip) {
        if (myip && myip.length > 0) {
            var ip = myip.split(':');
            GlobalPara.myip = ip[0];
            if (ip.length >= 2 && ip[1] == "US") {
                GlobalPara.packageStateTest = 2;
            }
        }
    }
    NativeCall.myipReturn = myipReturn;
    //----------------------egret----调用------------------
    //获取device string
    function getDeviceString() {
        egret.ExternalInterface.call("getDeviceString", "null");
    }
    NativeCall.getDeviceString = getDeviceString;
    function gamePresented() {
        if (GlobalPara.isNative) {
            egret.ExternalInterface.call("presented", "null");
        }
        else {
            if (window && window['presented']) {
                window['presented']();
            }
        }
    }
    NativeCall.gamePresented = gamePresented;
    // 选择头像
    function choosePic(headName) {
        egret.ExternalInterface.call("choosePic", headName);
    }
    NativeCall.choosePic = choosePic;
    // 获取设备尺寸
    function getDeviceSize() {
        egret.ExternalInterface.call("getDeviceSize", "null");
    }
    NativeCall.getDeviceSize = getDeviceSize;
    // 获取设备信息 主要是设备内存情况
    function getDeviceInfo() {
        egret.ExternalInterface.call("getDeviceInfo", "null");
    }
    NativeCall.getDeviceInfo = getDeviceInfo;
    function openURL(url) {
        if (GlobalPara.isNative) {
            egret.ExternalInterface.call("openURL", url);
        }
        else {
            if (window['openURL']) {
                window['openURL'](url);
            }
        }
    }
    NativeCall.openURL = openURL;
    // 下载更新
    function downloadGame(data, name) {
        if (GlobalPara.isNative) {
            egret.ExternalInterface.call("downloadGame", JSON.stringify({ data: data, name: name }));
        }
    }
    NativeCall.downloadGame = downloadGame;
    // 重新启动游戏
    // 如果更新的是大厅 需要重启游戏
    function restartGame() {
        egret.ExternalInterface.call("restart", "null");
    }
    NativeCall.restartGame = restartGame;
    // 判断游戏是否已经下载
    function gameExists(game) {
        if (GlobalPara.isNative) {
            egret.ExternalInterface.call("gameExists", game);
        }
        else {
            UserData.gameDownloaded[game] = 1;
        }
    }
    NativeCall.gameExists = gameExists;
    function getAllGames() {
        if (GlobalPara.isNative) {
            egret.ExternalInterface.call("getAllGames", "null");
        }
    }
    NativeCall.getAllGames = getAllGames;
    function buyDiamond(productid) {
        if (GlobalPara.isNative) {
            egret.ExternalInterface.call("buyDiamond", productid);
        }
    }
    NativeCall.buyDiamond = buyDiamond;
    function buyDiamondSuccess(transaction_id) {
        egret.ExternalInterface.call("buyDiamondSuccess", transaction_id);
    }
    NativeCall.buyDiamondSuccess = buyDiamondSuccess;
    function getLoginInfo() {
        egret.ExternalInterface.call("getLoginInfo", "null");
    }
    NativeCall.getLoginInfo = getLoginInfo;
    function getMyIP() {
        if (GlobalPara.myip == "unknown" || GlobalPara.isNative) {
            egret.ExternalInterface.call("myip", "null");
        }
    }
    NativeCall.getMyIP = getMyIP;
})(NativeCall || (NativeCall = {}));
//# sourceMappingURL=NativeCall.js.map