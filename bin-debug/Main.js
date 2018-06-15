//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isThemeLoadEnd = false;
        _this.isResourceLoadEnd = false;
        return _this;
        //class end
    }
    /**底池的值 */
    // public 
    Main.getInstance = function () {
        if (Main._instance != null)
            return Main._instance;
    };
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    Main.prototype.onThemeLoadComplete = function () {
        this.isThemeLoadEnd = true;
        this.createScene();
    };
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    };
    Main.prototype.createScene = function () {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            this.startCreateScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    Object.defineProperty(Main, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Main.prototype.OnKeyDown = function (key) {
        switch (key.keyCode) {
            //W
            case 87:
                Main._instance.ShowOperateBtns();
                console.log("显示按钮组");
                break;
            //S
            case 83:
                Main._instance.HideOperateBtns();
                console.log("隐藏按钮组");
                break;
            //space
            case 32:
                var poker = Main._instance.SendPubCard();
                if (poker != null) {
                    var value = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
                    var type = Math.round(Math.random() * 10 % 3);
                    // var type = CardType.DIAMONDS;
                    poker.SetData(value, type, false);
                    poker.SetDisplay();
                    console.log("发一张公共牌");
                }
                break;
            //U
            case 85:
                Main._instance.mainUser.StartOperationBarAnim(DZDefine.iOperateTime);
                Main._instance.chairID_User.forEach(function (element) {
                    element.StartOperationBarAnim(DZDefine.iOperateTime);
                });
                console.log("开始玩家操作倒计时");
                break;
            //F
            case 70:
                for (var i = 0; i < Main._instance._pubCardContainer.length; i++) {
                    if (!Main._instance._pubCardContainer[i].isFront) {
                        Main._instance.TurnPubCardAnim(i, PokerDir.B2F);
                        break;
                    }
                }
                break;
            //C
            case 67:
                Main._instance.SendUsersCardsAnim();
                console.log("发送所有玩家的手牌");
                break;
            //X
            case 88:
                for (var i = 0; i < 6; i++) {
                    Main._instance.TurnCardAnim(i);
                    var value = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
                    var type = Math.round(Math.random() * 10 % 3);
                    var value1 = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
                    var type1 = Math.round(Math.random() * 10 % 3);
                    var _value = [value, value1];
                    var _type = [type, type1];
                    Main._instance.SetUserCardData(i, _value, _type);
                }
                console.log("翻开主玩家手牌");
                break;
            //Z
            case 90:
                Main._instance.TurnCardAnim(Main._instance.mainUser.chairID);
                var value = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
                var type = Math.round(Math.random() * 10 % 3);
                var value1 = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
                var type1 = Math.round(Math.random() * 10 % 3);
                var _value = [value, value1];
                var _type = [type, type1];
                Main._instance.SetUserCardData(Main._instance.mainUser.chairID, _value, _type);
                break;
            //B
            case 66:
                var bankerID = Math.round(Math.random() * 10 % Main._instance.chairID_User.length);
                if (bankerID == 6)
                    bankerID--;
                // var bankerID = 2;
                console.log("bankerID:" + bankerID);
                Main._instance.chairID_User[bankerID].isBanker = true;
                Main._instance.SendBankerLogoAnim(bankerID);
                break;
            //I
            case 73:
                Main._instance.SetOperationBtnsDisplay(DZDefine.Q_CINGL_ADD);
                break;
            //O
            case 79:
                Main._instance.SetOperationBtnsDisplay(DZDefine.Q_CINGL_ALLIN);
                break;
            //P
            case 80:
                Main._instance.SetOperationBtnsDisplay(DZDefine.Q_PASS_ADD);
                break;
            //D
            case 68:
                // Main.instance.mainUser.Bet(1000);
                Main.betValue += 50;
                Main.instance.chairID_User.forEach(function (ele) {
                    ele.Bet(Main.betValue);
                });
                break;
            //E
            case 69:
                DZChipController.MoveAllChipsToPot();
                break;
        }
    };
    Main.prototype.OnBtnClick = function (evt) {
        switch (evt.data) {
            case this._btn_add:
                console.log("点击了加注按钮");
                break;
            case this._btn_abandon:
                console.log("点击了放弃按钮");
                break;
            case this._btn_allin:
                console.log("点击了全下按钮");
                break;
            case this._btn_drop_down:
                console.log("点击了下拉菜单按钮");
                break;
            case this._btn_pass:
                console.log("点击了过牌按钮");
                break;
            case this._btn_return:
                console.log("点击了返回按钮");
                break;
            case this._gp_cingl:
                console.log("点击了跟按钮");
                break;
        }
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.startCreateScene = function () {
        Main._instance = this;
        document.onkeydown = this.OnKeyDown;
        this._bg = new eui.Component();
        this._bg.skinName = "resource/dezhoupoker/eui_skin/game/DZPokerOnGameSkin.exml";
        this._bg.createChildren();
        this.addChild(this._bg);
        this._pubCardContainer = new Array();
        this._userCardContainer = new Array();
        this._cardStartPos = this._bg["pos_send_card"];
        this.chairID_User = new Array();
        //循环将桌子上的所有玩家头像框，下注框隐藏
        for (var i = 0; i < 6; i++) {
            this._bg["user_" + i].visible = false;
            this._bg["gp_chip_" + i].visible = false;
            this._bg["gp_pub_chip"].visible = false;
        }
        //创建扑克牌对象池
        pool.ObjectPool.instance.createObjectPool(DZCardController.DZ_CARD_POOLNAME, DZCardView);
        pool.ObjectPool.instance.createObjectPool(DZChipController.DZ_CHIP_POOLNAME, DZChipView);
        DZCardController.tableComponent = this._bg;
        DZChipController.tableComponent = this._bg;
        //获取皮肤中的组件
        this._btn_return = this._bg["btn_return"];
        this._btn_drop_down = this._bg["btn_drop_down"];
        this._btn_abandon = this._bg["btn_abandon"];
        this._btn_pass = this._bg["btn_pass"];
        this._btn_add = this._bg["btn_add"];
        this._btn_allin = this._bg["btn_allin"];
        this._gp_cingl = this._bg["gp_cingl"];
        //增加按钮
        this._btnContainer = new ButtonContainer();
        this._btnContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnBtnClick, this);
        this._btnContainer.addButton(this._btn_abandon);
        this._btnContainer.addButton(this._btn_add);
        this._btnContainer.addButton(this._btn_allin);
        this._btnContainer.addButton(this._btn_drop_down);
        this._btnContainer.addButton(this._btn_pass);
        this._btnContainer.addButton(this._btn_return);
        this._btnContainer.addButton(this._gp_cingl);
        this._bg["gp_operation_btns"].y = 750;
        this.SetUsers();
        this.StartGame();
        //加注滑动条测试
        // var slider:eui.Component = new eui.Component();
        // slider.skinName = "resource/dezhoupoker/eui_skin/view/DZAddChipView.exml";
        // this.addChild(slider);
    };
    /**翻单个用户的手牌动画
     * @param chairID : 需要翻牌的椅子号
     */
    Main.prototype.TurnCardAnim = function (chairID) {
        var user = this.chairID_User[chairID];
        var turnPoint = this.GetUserFrontCardPos(chairID);
        DZCardController.TurnCardAnim(user, turnPoint);
    };
    /**翻公共牌动画
     * @param index:牌在组里的下标
     * @param direction:翻转的方向，1由正->反  2由反->正
     */
    Main.prototype.TurnPubCardAnim = function (index, direction) {
        if (direction === void 0) { direction = PokerDir.B2F; }
        var poker = this._pubCardContainer[index];
        if (poker == null || poker.isFront || poker.isAction)
            return;
        DZCardController.TurnPubCardAnim(poker);
    };
    /**发庄logo */
    Main.prototype.SendBankerLogoAnim = function (chairID) {
        var start = new egret.Point(this._bg.width / 2, this._bg.height / 2);
        var logo = new eui.Image("dz_zhuang_png");
        this._bg.addChild(logo);
        logo.x = start.x;
        logo.y = start.y;
        logo.width = logo.height = 20;
        logo.name = "img_zhuang";
        var target = this.GetBankerLogoPos(chairID);
        egret.Tween.get(logo).to({ x: target.x, y: target.y }, DZDefine.sendBankerTime);
    };
    /**获得庄logo该去的位置
     * @param chairID ： 椅子号
     */
    Main.prototype.GetBankerLogoPos = function (chairID) {
        //在桌子右边的玩家特殊处理
        if (chairID == 1) {
            return new egret.Point(1095, 428);
        }
        //约束后会让获得的组件的坐标为零，所以要用帧末的数据，傻逼设计
        this.validateNow();
        var user = this.chairID_User[chairID].headComponent;
        console.log("x:" + user.x + "  y:" + user.y);
        var point = new egret.Point(user.x + DZDefine.b_logoOffsetHeadX, user.y + DZDefine.b_logoOffsetHeadY);
        return point;
    };
    /**播放发所有玩家手牌的动画 */
    Main.prototype.SendUsersCardsAnim = function () {
        var _this = this;
        var start = new egret.Point(this._cardStartPos.x, this._cardStartPos.y);
        this.chairID_User.forEach(function (element) {
            var target = _this.GetUserBackCardPos(element.chairID);
            var userCard = DZCardController.SendUserCardsAnim(start, target);
            element.cardArr = userCard;
        });
    };
    /**为玩家的手牌赋值 */
    Main.prototype.SetUserCardData = function (chairID, cardValue, cardType) {
        var user = this.chairID_User[chairID];
        DZCardController.SetUserCardData(user, cardValue, cardType);
    };
    /**获取玩家的手牌发送目标位置 背面 */
    Main.prototype.GetUserBackCardPos = function (chairID, isMainUser) {
        if (isMainUser === void 0) { isMainUser = false; }
        // var chair = this._bg["user_" + chairID];
        //约束后会让获得的组件的坐标为零，所以要用帧末的数据，傻逼设计
        this.validateNow();
        var chair = this.chairID_User[chairID].headComponent;
        if (chair == null)
            return null;
        var point = new egret.Point(chair.x + DZDefine.b_cardOffsetHeadX, chair.y + DZDefine.b_cardOffsetHeadY);
        return point;
    };
    /**获取玩家的展示手牌时的位置 */
    Main.prototype.GetUserFrontCardPos = function (chairID, isMainUser) {
        if (isMainUser === void 0) { isMainUser = false; }
        // var chair = this._bg["user_" + chairID];
        //约束后会让获得的组件的坐标为零，所以要用帧末的数据，傻逼设计
        this.validateNow();
        var user = this.chairID_User[chairID];
        if (user == null)
            return;
        var chair = this.chairID_User[chairID].headComponent;
        if (chair == null)
            return null;
        var point = new egret.Point(chair.x + DZDefine.f_cardOffsetHeadX, chair.y + DZDefine.f_cardOffsetHeadY);
        return point;
    };
    /**根据情况显示不同的操作按钮
     * @param status:不同情况
     */
    Main.prototype.SetOperationBtnsDisplay = function (status) {
        //先把所有的按钮都隐藏
        this._btn_add.visible = false;
        this._btn_allin.visible = false;
        this._btn_pass.visible = false;
        this._gp_cingl.visible = false;
        //然后根据传入的状态显示该显示的按钮
        switch (status) {
            case DZDefine.Q_CINGL_ADD:
                this._gp_cingl.visible = true;
                //将之前无效化过的按钮激活
                if (!this._gp_cingl.touchEnabled)
                    this._btnContainer.setBtnEnabled(this._gp_cingl, true);
                this._btn_add.visible = true;
                break;
            case DZDefine.Q_CINGL_ALLIN:
                this._gp_cingl.visible = true;
                //全下的状态下是不可以选择跟注的，所以无效化按钮
                this._btnContainer.setBtnEnabled(this._gp_cingl, false, true);
                this._btn_allin.visible = true;
                break;
            case DZDefine.Q_PASS_ADD:
                this._btn_pass.visible = true;
                this._btn_add.visible = true;
                break;
        }
    };
    /**底部操作条上升 */
    Main.prototype.ShowOperateBtns = function () {
        var bottom = this._bg["gp_operation_btns"];
        egret.Tween.get(bottom).to({ x: 0, y: 650 }, DZDefine.operationBtns)
            .call(function () { bottom.touchChildren = true; });
    };
    /**隐藏底部操作按钮 按钮下沉*/
    Main.prototype.HideOperateBtns = function () {
        var bottom = this._bg["gp_operation_btns"];
        bottom.touchChildren = false;
        egret.Tween.get(bottom).to({ x: 0, y: 750 }, DZDefine.operationBtns);
    };
    /**往公共牌区域发一张牌的动画 */
    Main.prototype.SendPubCard = function () {
        if (this._pubCardContainer.length >= 5)
            return null;
        var start = new egret.Point(this._cardStartPos.x, this._cardStartPos.y);
        var target = this.GetPubTargetPos();
        var poker = DZCardController.SendPubCard(start, target);
        this._pubCardContainer.push(poker);
        return poker;
    };
    /**公共牌的数量，由于没有获得子节点的方法，所以申请变量自行控制 */
    /**获取公共牌发送的目标点，用于Tween动画 */
    Main.prototype.GetPubTargetPos = function () {
        var point = new egret.Point;
        point.x = this._bg["gp_public_cards"].x;
        point.y = this._bg["gp_public_cards"].y;
        var cardW = 116;
        point.x = point.x + cardW * this._pubCardContainer.length;
        return point;
    };
    /**
     * 创建一个游戏timer 唯一的
     * @param chairID
     * @param timerID
     * @param time
     */
    Main.prototype.SetGameTimer = function (chairID, timerID, time) {
        if (this._timer == null) {
            this._timer = new GameTimer(1000 / 30);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.onGameTimerEvent, this);
        }
        this._timer.chairID = chairID;
        this._timer.timerID = timerID;
        this._timer.totalTime = time;
        this._timer.start();
    };
    Main.prototype.onGameTimerEvent = function (e) {
        var remainTime = this._timer.remainTime;
        if (remainTime == 0) {
            this._timer.stop();
        }
        this.OnGameTimer(this._timer.chairID, this._timer.timerID, remainTime);
    };
    Main.prototype.OnGameTimer = function (chairID, timerID, remainTime) {
        switch (timerID) {
            case DZDefine.Operation_Timer:
                if (remainTime == 0)
                    console.log("Time Over");
                else
                    console.log(remainTime);
                break;
        }
    };
    /**获得盲注位 */
    Main.prototype.GetBland = function () {
        var index = this._banker.chairID;
        index++;
        //获得小盲位
        while (true) {
            if (index > 5)
                index = 0;
            var _low = this.chairID_User[index];
            if (_low != null) {
                this._lowBland = _low;
                break;
            }
            index++;
        }
        index++;
        //获得大盲位
        while (true) {
            if (index > 5)
                index = 0;
            var _high = this.chairID_User[index];
            if (_high != null) {
                this._highBland = _high;
                break;
            }
        }
    };
    //测试代码
    Main.prototype.StartGame = function () {
        //先给一个庄
        while (true) {
            var bankerID = Math.round(Math.random() * 10 % this.chairID_User.length);
            if (bankerID == 6)
                bankerID--;
            var user = this.chairID_User[bankerID];
            if (user == null)
                continue;
            else {
                this.chairID_User[bankerID].isBanker = true;
                this._banker = this.chairID_User[bankerID];
                break;
            }
        }
        this.SendBankerLogoAnim(bankerID);
        //获得盲注位
        this.GetBland();
        console.log("Banker : " + this._banker.nickname);
        console.log("lowBland : " + this._lowBland.nickname);
        console.log("highBland : " + this._highBland.nickname);
        //下盲注
        this._highBland.Bet(20);
        this._lowBland.Bet(20);
        // //发所有人的手牌
        // this.SendUsersCardsAnim();
    };
    /**测试使用的玩家 */
    Main.prototype.SetUsers = function () {
        this.mainUser = new DZUser(111, 10, 0, UserData, this._bg["gp_chip_" + 0]);
        this.mainUser.nickname = "绘图铅笔2B";
        this.mainUser.gold = 11111;
        this.mainUser.InitFaceGroup(this._bg["user_" + this.mainUser.chairID]);
        this.chairID_User[this.mainUser.chairID] = this.mainUser;
        var user1 = new DZUser(112, 10, 1, UserData, this._bg["gp_chip_" + 1]);
        user1.nickname = "Holly";
        user1.gold = 10000;
        user1.InitFaceGroup(this._bg["user_" + user1.chairID]);
        this.chairID_User[user1.chairID] = user1;
        var user2 = new DZUser(112, 10, 2, UserData, this._bg["gp_chip_" + 2]);
        user2.nickname = "Shit";
        user2.gold = 10000;
        user2.InitFaceGroup(this._bg["user_" + user2.chairID]);
        this.chairID_User[user2.chairID] = user2;
        var user3 = new DZUser(112, 10, 3, UserData, this._bg["gp_chip_" + 3]);
        user3.nickname = "Mother";
        user3.gold = 10000;
        user3.InitFaceGroup(this._bg["user_" + user3.chairID]);
        this.chairID_User[user3.chairID] = user3;
        var user4 = new DZUser(112, 10, 4, UserData, this._bg["gp_chip_" + 4]);
        user4.nickname = "Fucker";
        user4.gold = 10000;
        user4.InitFaceGroup(this._bg["user_" + user4.chairID]);
        this.chairID_User[user4.chairID] = user4;
        var user5 = new DZUser(112, 10, 5, UserData, this._bg["gp_chip_" + 5]);
        user5.nickname = "Stupid";
        user5.gold = 10000;
        user5.InitFaceGroup(this._bg["user_" + user5.chairID]);
        this.chairID_User[user5.chairID] = user5;
    };
    return Main;
}(eui.UILayer));
Main.betValue = 0;
__reflect(Main.prototype, "Main");
var PokerDir;
(function (PokerDir) {
    PokerDir[PokerDir["F2B"] = 0] = "F2B";
    PokerDir[PokerDir["B2F"] = 1] = "B2F";
})(PokerDir || (PokerDir = {}));
var CardType;
(function (CardType) {
    CardType[CardType["DIAMONDS"] = 0] = "DIAMONDS";
    CardType[CardType["CLUB"] = 1] = "CLUB";
    CardType[CardType["HEART"] = 2] = "HEART";
    CardType[CardType["SPADE"] = 3] = "SPADE";
})(CardType || (CardType = {}));
//# sourceMappingURL=Main.js.map