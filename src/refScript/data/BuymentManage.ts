//
// IAP购买
// 
class BuymentManage {

    public static purchasedProductWithOutReturn = {}; //iap购买成功，但是服务器没有返回的
    
    public static inProcessing = [];
    public static checkTimer : egret.Timer = null;
    public static checkLeftTimes : number = 0;
    public static maxLeftTimes : number = 30;

    public static init() : void {

        BuymentManage.loadUnCompleteProduct();

        if (BuymentManage.checkTimer) {
            BuymentManage.checkTimer.stop();
            BuymentManage.checkTimer = null;
        }

        BuymentManage.checkTimer = new egret.Timer(10000, -1);
        BuymentManage.checkTimer.addEventListener(egret.TimerEvent.TIMER, BuymentManage.timerFunc, BuymentManage);
        BuymentManage.checkTimer.start();
    }

    public static timerFunc(event: egret.TimerEvent) {

        BuymentManage.checkLeftTimes -= 10;
        if (BuymentManage.checkLeftTimes < 0 && UserData.gameState == 0) {
            BuymentManage.checkLeftTimes = BuymentManage.maxLeftTimes;

            if (Object.keys(BuymentManage.purchasedProductWithOutReturn).length > 0) {
                BuymentManage.checkOneTimeUnCompletePurchase();    
            }            
        }
    }

    public static dispose() : void {
        if (BuymentManage.checkTimer) {
            BuymentManage.checkTimer.stop();
            BuymentManage.checkTimer = null;
        }

        BuymentManage.purchasedProductWithOutReturn = {};
    }

    public static buyDiamond(productid : string, id : number) : void {
        
        if (GlobalPara.isNative) {
            NativeCall.buyDiamond(productid);
        } else {        
            // 审核
            BuymentManage.buyDiamondReturn(JSON.stringify({
                product_id: productid,
                transaction_id: '123123123' + Utils.rand(0, 10000),
                receipt_data: '1230912391029' + Utils.rand(0, 10000),
                id: id
            }));
        
        }
    }

    // 检查一次未完成的购买
    public static checkOneTimeUnCompletePurchase() : void {
        for (var mainkey in BuymentManage.purchasedProductWithOutReturn) {

            var data = JSON.parse(BuymentManage.purchasedProductWithOutReturn[mainkey]);
            if (data) {

                if ([null,undefined].indexOf(data['id']) != -1) {
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
                // AppFacade.getInstance().sendNotification(CommonMessageMediator.CS_Request_IAP_Purchase,
                //                                       {
                //                                           userID: UserData.userID,
                //                                           product_id: data['product_id'],
                //                                           transaction_id: data['transaction_id'],
                //                                           recipt_data: data['receipt_data'],
                //                                           id: data['id']
                //                                       });
            }
        }

        BuymentManage.maxLeftTimes += 30;
    }

    public static buyDiamondReturn(data : string) : void {

        var ret = JSON.parse(data);
        if (ret) {
            if ([null,undefined].indexOf(ret['id']) != -1) {
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
            // AppFacade.getInstance().sendNotification(CommonMessageMediator.CS_Request_IAP_Purchase,
            //                                           {
            //                                               userID: UserData.userID,
            //                                               product_id: ret['product_id'],
            //                                               transaction_id: ret['transaction_id'],
            //                                               recipt_data: ret['receipt_data'],
            //                                               id: ret['id']
            //                                           });

            // Main.getInstance().display(new TipView("服务器添加钻石中,请等待...", 
            //                                        "提示", null, 0, 0, 5000));
        }
    }

    public static saveUncompleteProduct() : void {
        egret.localStorage.setItem(UserData.userID + "purchasedProductWithOutReturn", JSON.stringify(BuymentManage.purchasedProductWithOutReturn));
    }

    public static loadUnCompleteProduct() : void {
        var item = egret.localStorage.getItem(UserData.userID + "purchasedProductWithOutReturn");
        if ([null, undefined].indexOf(item) == -1) {
            BuymentManage.purchasedProductWithOutReturn = JSON.parse(item);
        } else {
            BuymentManage.purchasedProductWithOutReturn = {};
        }
    }

    public static buyComplete(transaction_id : string) : void {

        BuymentManage.purchasedProductWithOutReturn[transaction_id] = null;
        delete BuymentManage.purchasedProductWithOutReturn[transaction_id];

        BuymentManage.saveUncompleteProduct();

        BuymentManage.maxLeftTimes = 30;
    }
    
}