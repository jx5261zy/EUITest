var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *''"
 * @author
 *
 */
var GameViewBase = (function (_super) {
    __extends(GameViewBase, _super);
    function GameViewBase(table, gameType, maxPlayerCount) {
        var _this = _super.call(this, table) || this;
        /**
         * 创建一个游戏timer
         */
        // private _gameTimer: GameTimer;
        _this._timerDic = {};
        /**
         * 本地位置编号
         */
        _this._localIdxArr = [];
        _this._maxPlayerCount = 0;
        GlobalPara.gameType = gameType;
        _this._maxPlayerCount = maxPlayerCount;
        _this._myWorldIdx = UserData.chairID;
        _this.setLocalIdxs();
        pool.ObjectPool.instance.createObjectPool(GameViewBase.POOL_BITMAP_LABEL, eui.BitmapLabel, 30);
        return _this;
    }
    Object.defineProperty(GameViewBase.prototype, "myWorldIdx", {
        set: function (val) {
            if (this._myWorldIdx == val)
                return;
            this._myWorldIdx = val;
            this.setLocalIdxs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameViewBase.prototype, "playerCount", {
        get: function () {
            return this._maxPlayerCount;
        },
        enumerable: true,
        configurable: true
    });
    GameViewBase.prototype.initComponent = function () {
        _super.prototype.initComponent.call(this);
        // 发送Frame_Enter消息
        // AppFacade.getInstance().sendNotification(PublicNotification.GAME_SUB_CS_FRAME_ENTER);
    };
    GameViewBase.prototype.setFrameRate = function () {
        var fr = 60;
        if (Utils.isNative()) {
            fr = 30;
        }
        egret.MainContext.instance.stage.frameRate = fr;
    };
    GameViewBase.prototype.clear = function () {
    };
    /**
     * 创建一个游戏timer 唯一的
     * @param chairID
     * @param timerID
     * @param time
     */
    GameViewBase.prototype.setGameTimer = function (chairID, timerID, time) {
        // if(this._gameTimer == null)
        // {
        // 	this._gameTimer = new GameTimer(1000/30);
        // 	this._gameTimer.addEventListener(egret.TimerEvent.TIMER,this.onGameTimerEvent,this);
        // }
        // this._gameTimer.chairID = chairID;
        // this._gameTimer.timerID = timerID;
        // this._gameTimer.totalTime = time;
        // this._gameTimer.start();
    };
    /**
     * 停止游戏timer
     */
    GameViewBase.prototype.stopGameTimer = function () {
        // if(this._gameTimer) {
        // 	this._gameTimer.stop();
        // }
    };
    GameViewBase.prototype.onGameTimerEvent = function (e) {
        // var remainTime: number = this._gameTimer.remainTime;
        // if(remainTime == 0)
        // {
        // 	this._gameTimer.stop();
        // }
        // this.onGameTimer(this._gameTimer.chairID,this._gameTimer.timerID,remainTime);
    };
    /**
     * 创建一个计时器
     */
    GameViewBase.prototype.setTimer = function (timerID, time) {
        // var timer:GameTimer = this._timerDic[timerID];
        // if(timer == null)
        // {
        // 	timer = new GameTimer(1000/30);
        // 	timer.addEventListener(egret.TimerEvent.TIMER,this.onTimerEvent,this);
        // 	this._timerDic[timerID] = timer;
        // }
        // timer.timerID = timerID;
        // timer.totalTime = time;
        // timer.start();
    };
    GameViewBase.prototype.onTimerEvent = function (e) {
        // var timer: GameTimer = e.currentTarget;
        // if(timer.remainTime == 0)
        // {
        // 	timer.stop();
        // }
        // this.onTimer(timer.timerID,timer.remainTime);
    };
    /**
     * 停止timer
     * @param timerID
     */
    GameViewBase.prototype.stopTimer = function (timerID) {
        // var timer: GameTimer = this._timerDic[timerID];
        // if(timer)
        // {
        // 	timer.stop();
        // }
    };
    /**
     * 计时器处理
     * @param timerID
     */
    GameViewBase.prototype.onTimer = function (timerID, remainTime) {
    };
    /**
     * 游戏计时器处理
     * @param timerID
     */
    GameViewBase.prototype.onGameTimer = function (chairID, timerID, remainTime) {
    };
    GameViewBase.prototype.getLocalPos = function (worldPos) {
        if (this._localIdxArr[worldPos] == undefined)
            return -1;
        return this._localIdxArr[worldPos];
    };
    GameViewBase.prototype.setLocalIdxs = function () {
        this._localIdxArr[this._myWorldIdx] = 0;
        for (var i = 1; i < this._maxPlayerCount; i++) {
            this._localIdxArr[(this._myWorldIdx + i) % this._maxPlayerCount] = i;
        }
    };
    GameViewBase.prototype.showTipView = function (str) {
        // var tipView:TipView = new TipView(str);
        // Main.getInstance().addTopUi(tipView);
    };
    GameViewBase.prototype.alphaAniImg = function (disObj, duration, completeIsVisible, aniTime, aniDelay) {
        if (duration === void 0) { duration = 0; }
        if (completeIsVisible === void 0) { completeIsVisible = false; }
        if (aniTime === void 0) { aniTime = 400; }
        if (aniDelay === void 0) { aniDelay = 100; }
        if (duration > 0) {
            egret.Tween.get(disObj).wait(duration).call(this.alphaAniImgComplete, this, [disObj, completeIsVisible]);
        }
        disObj.alpha = .2;
        egret.Tween.get(disObj, { loop: true }).to({ alpha: 1 }, aniTime).wait(aniDelay).to({ alpha: .2 }, aniTime);
    };
    GameViewBase.prototype.alphaAniImgComplete = function (img, isVisible) {
        egret.Tween.removeTweens(img);
        img.alpha = 1;
        img.visible = isVisible;
    };
    GameViewBase.prototype.checkBetLimit = function (userGold, chipValue, curTotalBet, goldRange1, betLimit1, goldRange2, betLimit2, isTip) {
        if (isTip === void 0) { isTip = true; }
        if (userGold + curTotalBet < goldRange1) {
            if (curTotalBet >= betLimit1 || chipValue > betLimit1) {
                if (isTip)
                    this.showTipView("当前金币小于" + goldRange1 + "，最大押注为" + betLimit1 + "金币");
                return false;
            }
            return true;
        }
        // if(userGold + curTotalBet < goldRange2)
        // {
        //      if(curTotalBet >= betLimit2 || chipValue > betLimit2)
        //     {
        //         if(isTip) this.showTipView("当前金币小于"+goldRange2+"，最大押注为"+betLimit2+"金币");
        //         return false;
        //     }
        //     return true;
        // }
        return true;
    };
    GameViewBase.prototype.forceLeaveGame = function () {
        if (!UserData.roomMoneyNotEnough) {
            this.showTipView("由于你长时间没有操作，以为你退出游戏房间！");
        }
    };
    GameViewBase.prototype.componentDispose = function () {
        _super.prototype.componentDispose.call(this);
        this.dispose();
    };
    GameViewBase.prototype.dispose = function () {
        // if(this._gameTimer != null) {
        // 	this._gameTimer.removeEventListener(egret.TimerEvent.TIMER,this.onGameTimerEvent,this);
        // 	this._gameTimer.stop();
        // 	this._gameTimer = null;
        // }
        var timer;
        for (var k in this._timerDic) {
            timer = this._timerDic[k];
            timer.stop();
            timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerEvent, this);
            delete this._timerDic[k];
        }
        this._timerDic = null;
        this.removeChildren();
        // Utils.safeRemove(this);
        pool.ObjectPool.instance.cleanObjectPool(GameViewBase.POOL_BITMAP_LABEL);
    };
    GameViewBase.createBitmapLabel = function () {
        var bitmapLabel = pool.ObjectPool.instance.getObj(GameViewBase.POOL_BITMAP_LABEL);
        bitmapLabel.alpha = 1;
        return bitmapLabel;
    };
    GameViewBase.pushBitmapLabel = function (obj) {
        egret.Tween.removeTweens(obj);
        pool.ObjectPool.instance.pushObj(GameViewBase.POOL_BITMAP_LABEL, obj);
    };
    return GameViewBase;
}(BaseComponent));
GameViewBase.POOL_BITMAP_LABEL = "poolBitmapLabel";
__reflect(GameViewBase.prototype, "GameViewBase");
//# sourceMappingURL=GameViewBase.js.map