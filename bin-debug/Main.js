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
    }
    Main.getInstance = function () {
        if (Main.instance == null)
            Main.instance = this;
        return Main.instance;
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
    Main.prototype.OnKeyDown = function (key) {
        switch (key.keyCode) {
            //W
            case 87:
                Main.instance.ShowOperateBtns();
                console.log("显示按钮组");
                break;
            //S
            case 83:
                Main.instance.HideOperateBtns();
                console.log("隐藏按钮组");
                break;
            //space
            case 32:
                var poker = Main.instance.SendPubCard();
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
                Main.instance.mainUser.StartOperationBarAnim(DZDefine.iOperateTime);
                Main.instance.chairID_User.forEach(function (element) {
                    element.StartOperationBarAnim(DZDefine.iOperateTime);
                });
                console.log("开始玩家操作倒计时");
                break;
            //F
            case 70:
                for (var i = 0; i < Main.instance._pubCardContainer.length; i++) {
                    if (!Main.instance._pubCardContainer[i].isFront) {
                        Main.instance.TurnPubCardAnim(i, PokerDir.B2F);
                        break;
                    }
                }
                break;
            //C
            case 67:
                Main.instance.SendUsersCardsAnim();
                console.log("发送所有玩家的手牌");
                break;
            //X
            case 88:
                Main.instance.TurnCardAnim(Main.instance.mainUser.chairID);
                var value = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
                var type = Math.round(Math.random() * 10 % 3);
                var value1 = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
                var type1 = Math.round(Math.random() * 10 % 3);
                var _value = [value, value1];
                var _type = [type, type1];
                Main.instance.SetUserCardData(Main.instance.mainUser.chairID, _value, _type);
                console.log("翻开主玩家手牌");
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
        Main.instance = this;
        document.onkeydown = this.OnKeyDown;
        this._bg = new eui.Component();
        this._bg.skinName = "resource/dezhoupoker/eui_skin/game/DZPokerOnGameSkin.exml";
        this._bg.createChildren();
        this.addChild(this._bg);
        this._pubCardContainer = new Array();
        this._userCardContainer = {};
        this._cardStartPos = this._bg["pos_send_card"];
        this.chairID_User = new Array();
        //循环将桌子上的所有玩家头像框隐藏
        for (var i = 0; i < 6; i++) {
            this._bg["user_" + i].visible = false;
        }
        //创建扑克牌对象池
        pool.ObjectPool.instance.createObjectPool(DZCardController.DZ_CARD_POOLNAME, DZCardView);
        pool.ObjectPool.instance.createObjectPool(DZChipController.DZ_CHIP_POOLNAME, DZChipView);
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
        this.mainUser = new DZUser(111, 10, 0, UserData);
        this.mainUser.nickname = "绘图铅笔2B";
        this.mainUser.gold = 11111;
        this.mainUser.InitFaceGroup(this._bg["user_" + this.mainUser.chairID]);
        this.chairID_User[this.mainUser.chairID] = this.mainUser;
        for (var i = 1; i < 6; i = i + 2) {
            var user = new DZUser(111 + i, 10, i, UserData);
            user.nickname = "匿名用户_" + i;
            user.gold = 11111;
            user.InitFaceGroup(this._bg["user_" + user.chairID]);
            this.chairID_User[user.chairID] = user;
        }
        var chip = DZChipController.CreateChipFormPool();
        this._bg.addChild(chip);
    };
    /**翻单个用户的手牌动画
     * @param _user : 需要翻牌的用户
     */
    Main.prototype.TurnCardAnim = function (chairID) {
        var userCardArr = this._userCardContainer["user_" + chairID];
        if (userCardArr == null)
            return;
        var firstCard = userCardArr[0];
        var secondCard = userCardArr[1];
        if (firstCard == null || secondCard == null)
            return;
        if (firstCard.isFront || secondCard.isFront)
            return;
        firstCard.isFront = true;
        secondCard.isFront = true;
        firstCard["gp_poker"].skewY = 180;
        secondCard["gp_poker"].skewY = 180;
        var turnPoint = this.GetUserFrontCardPos(chairID);
        firstCard.x = turnPoint.x;
        firstCard.y = turnPoint.y;
        secondCard.x = turnPoint.x + DZDefine.cardDis;
        secondCard.y = turnPoint.y;
        firstCard.rotation = secondCard.rotation = 0;
        firstCard.scaleX = firstCard.scaleY = DZDefine.f_scale;
        secondCard.scaleX = secondCard.scaleY = DZDefine.f_scale;
        egret.Tween.get(firstCard["gp_poker"]).to({ skewY: 270 }, DZDefine.turnCardTime, egret.Ease.quadOut)
            .call(function () { firstCard["gp_poker_forward"].visible = true; firstCard["img_poker_back"].visible = false; })
            .to({ skewY: 360 }, DZDefine.turnCardTime, egret.Ease.quadOut);
        egret.Tween.get(secondCard["gp_poker"]).to({ skewY: 270 }, DZDefine.turnCardTime, egret.Ease.quadOut)
            .call(function () { secondCard["gp_poker_forward"].visible = true; secondCard["img_poker_back"].visible = false; })
            .to({ skewY: 360 }, DZDefine.turnCardTime, egret.Ease.quadOut);
    };
    /**翻牌动画
     * @param index:牌在组里的下表
     * @param direction:翻转的方向，1由正-》反  2由反-》正
     */
    Main.prototype.TurnPubCardAnim = function (index, direction) {
        // var poker = this._bg["gp_public_cards"].getChildAt(index);
        var poker = this._pubCardContainer[index];
        if (poker == null || poker.isFront)
            return;
        switch (direction) {
            case PokerDir.F2B:
                {
                    poker.isFront = false;
                    egret.Tween.get(poker["gp_poker"]).to({ skewY: 90 }, DZDefine.turnCardTime, egret.Ease.quadOut)
                        .call(function () { poker["gp_poker_forward"].visible = false; poker["img_poker_back"].visible = true; })
                        .to({ skewY: 180 }, DZDefine.turnCardTime, egret.Ease.quadOut);
                }
                break;
            case PokerDir.B2F:
                {
                    poker.isFront = true;
                    poker["gp_poker"].skewY = 180;
                    egret.Tween.get(poker["gp_poker"]).to({ skewY: 270 }, DZDefine.turnCardTime, egret.Ease.quadOut)
                        .call(function () { poker["gp_poker_forward"].visible = true; poker["img_poker_back"].visible = false; })
                        .to({ skewY: 360 }, DZDefine.turnCardTime, egret.Ease.quadOut);
                }
                break;
        }
    };
    /**发庄logo */
    Main.prototype.SendBankerLogoAnim = function (chairID) {
    };
    /**播放发所有玩家手牌的动画 */
    Main.prototype.SendUsersCardsAnim = function () {
        var _this = this;
        var start = this._cardStartPos;
        this.chairID_User.forEach(function (element) {
            //创建两张牌
            var firstCard = DZCardController.CreatePokerFormPool();
            firstCard.x = start.x;
            firstCard.y = start.y;
            firstCard.alpha = 0;
            firstCard.scaleX = firstCard.scaleY = 0.01;
            var secondCard = DZCardController.CreatePokerFormPool();
            secondCard.x = start.x;
            secondCard.y = start.y;
            secondCard.alpha = 0;
            secondCard.scaleX = secondCard.scaleY = 0.01;
            firstCard.isFront = false;
            secondCard.isFront = false;
            _this._bg.addChild(firstCard);
            _this._bg.addChild(secondCard);
            var userCard = [firstCard, secondCard];
            _this._userCardContainer["user_" + element.chairID] = userCard;
            if (element == _this.mainUser) {
                var target = _this.GetUserBackCardPos(element.chairID);
                egret.Tween.get(firstCard).to({ x: target.x, y: target.y, rotation: DZDefine.firstCardAngle, scaleX: DZDefine.b_scale, scaleY: DZDefine.b_scale, alpha: 1 }, DZDefine.sendCardTime);
                egret.Tween.get(secondCard).to({ x: (target.x + DZDefine.cardDis), y: target.y, rotation: DZDefine.secondCardAngle, scaleX: DZDefine.b_scale, scaleY: DZDefine.b_scale, alpha: 1 }, DZDefine.sendCardTime);
            }
            else {
                var target = _this.GetUserBackCardPos(element.chairID);
                egret.Tween.get(firstCard).to({ x: target.x, y: target.y, rotation: DZDefine.firstCardAngle, scaleX: DZDefine.b_scale, scaleY: DZDefine.b_scale, alpha: 1 }, DZDefine.sendCardTime);
                egret.Tween.get(secondCard).to({ x: (target.x + DZDefine.cardDis), y: target.y, rotation: DZDefine.secondCardAngle, scaleX: DZDefine.b_scale, scaleY: DZDefine.b_scale, alpha: 1 }, DZDefine.sendCardTime);
            }
        });
    };
    /**为玩家的手牌赋值 */
    Main.prototype.SetUserCardData = function (chairID, cardValue, cardType) {
        var userCardArr = this._userCardContainer["user_" + chairID];
        if (userCardArr == null)
            return;
        var firstCard = userCardArr[0];
        var secondCard = userCardArr[1];
        if (firstCard == null || secondCard == null)
            return;
        firstCard.SetData(cardValue[0], cardType[0], false);
        firstCard.SetDisplay();
        secondCard.SetData(cardValue[1], cardType[1], false);
        secondCard.SetDisplay();
    };
    /**获取玩家的手牌发送目标点 背面 */
    Main.prototype.GetUserBackCardPos = function (chairID, isMainUser) {
        if (isMainUser === void 0) { isMainUser = false; }
        var chair = this._bg["user_" + chairID];
        if (chair == null)
            return null;
        var point = new egret.Point(chair.x + DZDefine.b_cardOffsetHeadX, chair.y + DZDefine.b_cardOffsetHeadY);
        return point;
    };
    /**获取玩家的展示手牌时的点 */
    Main.prototype.GetUserFrontCardPos = function (chairID, isMainUser) {
        if (isMainUser === void 0) { isMainUser = false; }
        var chair = this._bg["user_" + chairID];
        if (chair == null)
            return null;
        var point = new egret.Point(chair.x + DZDefine.f_cardOffsetHeadX, chair.y + DZDefine.f_cardOffsetHeadY);
        return point;
    };
    /**底部操作条上升 */
    Main.prototype.ShowOperateBtns = function () {
        var bottom = this._bg["gp_operation_btns"];
        //TODO：下沉之前要无效化按钮
        egret.Tween.get(bottom).to({ x: 0, y: 650 }, DZDefine.operationBtns);
    };
    /**隐藏底部操作按钮 按钮下沉*/
    Main.prototype.HideOperateBtns = function () {
        var bottom = this._bg["gp_operation_btns"];
        //TODO：上升之前要激活按钮
        egret.Tween.get(bottom).to({ x: 0, y: 750 }, DZDefine.operationBtns);
    };
    /**往公共牌区域发一张牌的动画 */
    Main.prototype.SendPubCard = function () {
        var _this = this;
        if (this._pubCardContainer.length >= 5)
            return null;
        var start = this._cardStartPos;
        var poker = DZCardController.CreatePokerFormPool();
        poker.isFront = false; //先设置为反面
        poker.alpha = 0;
        poker.scaleX = poker.scaleY = 0.1;
        poker.x = start.x;
        poker.y = start.y;
        this._bg.addChild(poker);
        var target = this.GetPubTargetPos();
        this._pubCardContainer.push(poker);
        egret.Tween.get(poker).to({ x: target.x, y: target.y, scaleX: 1, scaleY: 1, alpha: 1 }, DZDefine.sendCardTime)
            .call(function () { _this._bg["gp_public_cards"].addChild(poker); });
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
    /**给卡牌赋值
     * @param
     */
    Main.prototype.SendPubCardData = function (_cardType, _cardValue, _poker, _isFront) {
        _poker.SetData(_cardValue, _cardType, _isFront);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    /**
     * 点击按钮
     * Click the button
     */
    Main.prototype.onButtonClick = function (e) {
        var panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    };
    return Main;
}(eui.UILayer));
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