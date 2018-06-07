/**
 * crated at 2017-5-27 13:50:45 by pujunji
 * native通讯调用的接口
 */
module NativeCall {

    //native调用的
    export function updateDeviceString(struuid : string):void {
        GlobalPara.deviceUUID = struuid;
        egret.localStorage.setItem("devicestring", GlobalPara.deviceUUID);
    }

    export function closeSocket() : void {
        // GateClient.getInstance().close();
        // UserData.isRoomLogon = false;
        // GateClient.getInstance().shouldReconnect = false;
    }

    export function updateScreenSize(strSize : string) {
        var sizes = strSize.split(':');
        GlobalPara.screenWidth = parseInt(sizes[0]);
        GlobalPara.screenHeight = parseInt(sizes[1]);
    }

    // 重连
    export function reconnect() : void {
        // //断开再重连
        // UserData.isRoomLogon = false;
        
        // GateClient.getInstance().shouldReconnect = true;
        // GateClient.getInstance().reconnectTimes = Network.MAX_RECONNECT_TIME;
        // if (UserData.loginIn) {
        //     Main.getInstance().show(new ReconnectView(8, true), false);    
        // }        
    }

    export function uploadFileResult(result : string) : void {

        if ([null, undefined].indexOf(BrowserBrige.browserCB) == -1) {
            BrowserBrige.browserCB(result);
            BrowserBrige.browserCB = null;
        }
    }

    // 获取native设备信息返回
    export function deviceInfoReturn(result : string) : void {
        if (result == '1') {
            GlobalPara.bReleaseLobby = false;
        } else {
            GlobalPara.bReleaseLobby = true;
        }
    }

    // 下载游戏或者更新的进度
    export function downloadProcess(value : string) : void {
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

    // 判断游戏是否存在返回
    export function checkGameExistReturn(value : string) : void {
        // var data = value.split(":");
        // UserData.gameDownloaded[data[0]] = parseInt(data[1]);
        // AppFacade.getInstance().sendNotification(IndexViewMediator.CHECK_GAME_EXITS);
    }

    export function getAllGamesReturn(value : string) : void {
        // var data = value.split(':');
        // for (var i = 0; i < data.length; ++i) {
        //     UserData.gameDownloaded[Utils.decryptFileName(data[i])] = 1;
        // }

        // AppFacade.getInstance().sendNotification(IndexViewMediator.UPDATE_GAME_STATE);
    }

    export function buyDiamondReturn(value : string) : void {
        BuymentManage.buyDiamondReturn(value);
    }

    export function getLoginInfoReturn(value : string) : void {
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

    // 通过3dtouch触发的快速游戏
    export function quickStartGame(kindID : string) : void {
        // GlobalPara.quickStartGameKindID = parseInt(kindID);
    }

    export function myipReturn(myip : string) : void {

        if (myip && myip.length > 0) {
            var ip = myip.split(':');
            GlobalPara.myip = ip[0];
            if (ip.length >= 2 && ip[1] == "US") {
                GlobalPara.packageStateTest = 2;
            }
        }
    }

    //----------------------egret----调用------------------

    //获取device string
    export function getDeviceString():void {
        egret.ExternalInterface.call("getDeviceString", "null");
    }

    export function gamePresented() : void {
        if (GlobalPara.isNative) {
            egret.ExternalInterface.call("presented", "null");    
        } else {
            if (window && window['presented']) {
                window['presented']();
            }
        }        
    }

    // 选择头像
    export function choosePic(headName : string) : void {
        egret.ExternalInterface.call("choosePic", headName);
    }

    // 获取设备尺寸
    export function getDeviceSize() : void {
         egret.ExternalInterface.call("getDeviceSize", "null");
    }

    // 获取设备信息 主要是设备内存情况
    export function getDeviceInfo() : void {
        egret.ExternalInterface.call("getDeviceInfo", "null");
    }

    export function openURL(url : string) : void {
        if (GlobalPara.isNative) {
             egret.ExternalInterface.call("openURL", url);
        } else {
            if (window['openURL']) {
                window['openURL'](url);
            }
        }
    }

    // 下载更新
    export function downloadGame(data : string, name : string) : void {
        if (GlobalPara.isNative) {
            egret.ExternalInterface.call("downloadGame", JSON.stringify({data: data, name: name}));
        }
    }

    // 重新启动游戏
    // 如果更新的是大厅 需要重启游戏
    export function restartGame() : void {
        egret.ExternalInterface.call("restart", "null");
    }

    // 判断游戏是否已经下载
    export function gameExists(game : string) : void {
        if (GlobalPara.isNative) {
            egret.ExternalInterface.call("gameExists", game);
        } else {
            UserData.gameDownloaded[game] = 1;
            // AppFacade.getInstance().sendNotification(IndexViewMediator.CHECK_GAME_EXITS);
        }
    }

    export function getAllGames() : void {
        if (GlobalPara.isNative) {
            egret.ExternalInterface.call("getAllGames", "null");
        }
    }

    export function buyDiamond(productid : string) : void {
        if (GlobalPara.isNative) {
            egret.ExternalInterface.call("buyDiamond", productid);
        }
    }

    export function buyDiamondSuccess(transaction_id : string) : void {

        egret.ExternalInterface.call("buyDiamondSuccess", transaction_id);
    }

    export function getLoginInfo() : void {
        egret.ExternalInterface.call("getLoginInfo", "null");
    }

    export function getMyIP() : void {
        if (GlobalPara.myip == "unknown" || GlobalPara.isNative) {
            egret.ExternalInterface.call("myip", "null");    
        }
    }

}