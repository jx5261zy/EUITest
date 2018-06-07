var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//
// IAP购买
// 
var BuymentManage = (function () {
    function BuymentManage() {
    }
    BuymentManage.init = function () {
        BuymentManage.loadUnCompleteProduct();
        if (BuymentManage.checkTimer) {
            BuymentManage.checkTimer.stop();
            BuymentManage.checkTimer = null;
        }
        BuymentManage.checkTimer = new egret.Timer(10000, -1);
        BuymentManage.checkTimer.addEventListener(egret.TimerEvent.TIMER, BuymentManage.timerFunc, BuymentManage);
        BuymentManage.checkTimer.start();
    };
    BuymentManage.timerFunc = function (event) {
        BuymentManage.checkLeftTimes -= 10;
        if (BuymentManage.checkLeftTimes < 0 && UserData.gameState == 0) {
            BuymentManage.checkLeftTimes = BuymentManage.maxLeftTimes;
            if (Object.keys(BuymentManage.purchasedProductWithOutReturn).length > 0) {
                BuymentManage.checkOneTimeUnCompletePurchase();
            }
        }
    };
    BuymentManage.dispose = function () {
        if (BuymentManage.checkTimer) {
            BuymentManage.checkTimer.stop();
            BuymentManage.checkTimer = null;
        }
        BuymentManage.purchasedProductWithOutReturn = {};
    };
    BuymentManage.buyDiamond = function (productid, id) {
        if (GlobalPara.isNative) {
            NativeCall.buyDiamond(productid);
        }
        else {
            // 审核
            BuymentManage.buyDiamondReturn(JSON.stringify({
                product_id: productid,
                transaction_id: '123123123' + Utils.rand(0, 10000),
                receipt_data: '1230912391029' + Utils.rand(0, 10000),
                id: id
            }));
        }
    };
    // 检查一次未完成的购买
    BuymentManage.checkOneTimeUnCompletePurchase = function () {
        for (var mainkey in BuymentManage.purchasedProductWithOutReturn) {
            var data = JSON.parse(BuymentManage.purchasedProductWithOutReturn[mainkey]);
            if (data) {
                if ([null, undefined].indexOf(data['id']) != -1) {
                    for (var key in GlobalPara.configs['props']) {
                        if (GlobalPara.configs['props'][key]['canbuy'] == 3) {
                            // goldbuy.push(GlobalPara.configs['props'][key]);
                            if (data['product_id'] == GlobalPara.configs['props'][key]['productid']) {
                                data['id'] = GlobalPara.configs['props'][key]['ID'];
                                break;
                            }
                        }
                    }
                }
            }
        }
        BuymentManage.maxLeftTimes += 30;
    };
    BuymentManage.buyDiamondReturn = function (data) {
        var ret = JSON.parse(data);
        if (ret) {
            if ([null, undefined].indexOf(ret['id']) != -1) {
                for (var key in GlobalPara.configs['props']) {
                    if (GlobalPara.configs['props'][key]['canbuy'] == 3) {
                        if (ret['product_id'] == GlobalPara.configs['props'][key]['productid']) {
                            ret['id'] = GlobalPara.configs['props'][key]['ID'];
                            break;
                        }
                    }
                }
            }
            BuymentManage.purchasedProductWithOutReturn[ret.transaction_id] = JSON.stringify(ret);
            BuymentManage.saveUncompleteProduct();
        }
    };
    BuymentManage.saveUncompleteProduct = function () {
        egret.localStorage.setItem(UserData.userID + "purchasedProductWithOutReturn", JSON.stringify(BuymentManage.purchasedProductWithOutReturn));
    };
    BuymentManage.loadUnCompleteProduct = function () {
        var item = egret.localStorage.getItem(UserData.userID + "purchasedProductWithOutReturn");
        if ([null, undefined].indexOf(item) == -1) {
            BuymentManage.purchasedProductWithOutReturn = JSON.parse(item);
        }
        else {
            BuymentManage.purchasedProductWithOutReturn = {};
        }
    };
    BuymentManage.buyComplete = function (transaction_id) {
        BuymentManage.purchasedProductWithOutReturn[transaction_id] = null;
        delete BuymentManage.purchasedProductWithOutReturn[transaction_id];
        BuymentManage.saveUncompleteProduct();
        BuymentManage.maxLeftTimes = 30;
    };
    return BuymentManage;
}());
BuymentManage.purchasedProductWithOutReturn = {}; //iap购买成功，但是服务器没有返回的
BuymentManage.inProcessing = [];
BuymentManage.checkTimer = null;
BuymentManage.checkLeftTimes = 0;
BuymentManage.maxLeftTimes = 30;
__reflect(BuymentManage.prototype, "BuymentManage");
//# sourceMappingURL=BuymentManage.js.map