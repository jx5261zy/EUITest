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
        /**上一个操作的椅子号 */
        _this.lastOpChairID = -1;
        _this.isBlindEnd = false;
        _this.isUserOpEnd = true;
        _this.isSendUserCard = false;
        return _this;
        //class end
    }
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
            //W 开始盲注 庄的椅子号/用户id，小盲注的量
            case 87:
                if (Main.instance.isBlindEnd)
                    return;
                DZPokerOnGameView.instance.SC_StartGame({
                    iBankerID: 0,
                    iLowBetValue: 10
                });
                break;
            //S
            case 83:
                break;
            //space 发一张公共牌
            case 32:
                DZPokerOnGameView.instance.SC_SendPubCard();
                break;
            //U 玩家操作
            case 85:
                while (true) {
                    if (!Main.instance.isBlindEnd || !Main.instance.isUserOpEnd)
                        return;
                    var curChairID;
                    if (Main.instance.lastOpChairID == 5)
                        curChairID = Main.instance.lastOpChairID = 0;
                    else
                        curChairID = Main.instance.lastOpChairID + 1;
                    var user = DZPokerOnGameView.instance.GetUserByChairID(curChairID);
                    if (user.isAbandon) {
                        Main.instance.lastOpChairID = curChairID;
                        continue;
                    }
                    else
                        break;
                }
                var opType;
                var addValue = 0;
                var random = Math.random();
                if (random <= 0.1) {
                    opType = UserOp.ADD;
                    addValue = 20;
                }
                else if (random > 0.1 && random < 0.7)
                    opType = UserOp.CINGL;
                else if (random >= 0.7)
                    opType = UserOp.ABANDON;
                DZPokerOnGameView.instance.SC_User_Operation({
                    iCurChairID: curChairID,
                    iOpType: opType,
                    iAddValue: addValue,
                });
                Main.instance.isUserOpEnd = false;
                Main.instance.lastOpChairID = curChairID;
                break;
            //F
            case 70:
                break;
            //C 翻开所有手牌
            case 67:
                DZPokerOnGameView.instance.SC_TurnAllUserCards();
                break;
            //X 发手牌
            case 88:
                if (Main.instance.isSendUserCard)
                    return;
                DZPokerOnGameView.instance.SC_Blind_END_SendCard({
                    iCard0: Main.instance.userCards[0],
                    iCard1: Main.instance.userCards[1],
                });
                break;
            //Z
            case 90:
                break;
            //B
            case 66:
                break;
            //I
            case 73:
                break;
            //O
            case 79:
                break;
            //P
            case 80:
                break;
            //D
            case 68:
                break;
            //E 一轮下注结束，移动所有玩家筹码入底池
            case 69:
                DZPokerOnGameView.instance.SC_BetEnd();
                break;
            //M 输出重点参数的信息
            case 77:
                DZPokerOnGameView.instance.PrintInfo();
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
        this.SetUsers();
        var dzGame = new DZPokerOnGameView(this._table);
        this.addChild(dzGame);
        this.RandomCards();
        //加注滑动条测试
        // var slider:eui.Component = new eui.Component();
        // slider.skinName = "resource/dezhoupoker/eui_skin/view/DZAddChipView.exml";
        // this.addChild(slider);
    };
    /**测试使用的玩家 */
    Main.prototype.SetUsers = function () {
        this._table = new GameTable(10);
        var mainUser = new DZUser(111, 10, 0, UserData);
        UserData.userID = 111;
        mainUser.nickname = "绘图铅笔2B";
        mainUser.gold = 11111;
        this._table.addUser(mainUser);
        var user1 = new DZUser(112, 10, 1, UserData);
        user1.nickname = "Holly";
        user1.gold = 10000;
        this._table.addUser(user1);
        var user2 = new DZUser(113, 10, 2, UserData);
        user2.nickname = "Shit";
        user2.gold = 10000;
        this._table.addUser(user2);
        var user3 = new DZUser(114, 10, 3, UserData);
        user3.nickname = "Mother";
        user3.gold = 10000;
        this._table.addUser(user3);
        var user4 = new DZUser(115, 10, 4, UserData);
        user4.nickname = "Fucker";
        user4.gold = 10000;
        this._table.addUser(user4);
        var user5 = new DZUser(116, 10, 5, UserData);
        user5.nickname = "Stupid";
        user5.gold = 10000;
        this._table.addUser(user5);
    };
    /**循环随机玩家手牌和5张公共牌 */
    Main.prototype.RandomCards = function () {
        this.userCards = new Array();
        this.pubCards = new Array();
        var maxLoop = this._table.getUserCount() * 2; //每个人两张牌
        var count = 0;
        var isHave = false;
        while (count < maxLoop) {
            var cardType = Math.round(Math.random() * 10 % 4);
            var cardValue = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
            if (cardValue > 13)
                cardValue = 13;
            var card = new DZCardView();
            card.SetData(cardValue, cardType);
            for (var i = 0; i < this.userCards.length; i++) {
                var _card = this.userCards[i];
                if (_card.value == card.value && _card.type == card.type) {
                    isHave = true;
                    break;
                }
            }
            if (isHave) {
                isHave = false;
                continue;
            }
            this.userCards.push(card);
            count = this.userCards.length;
        }
        count = 0;
        isHave = false;
        while (count < 5) {
            var cardType = Math.round(Math.random() * 10 % 4);
            var cardValue = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
            if (cardValue > 13)
                cardValue = 13;
            var card = new DZCardView();
            card.SetData(cardValue, cardType);
            for (var i = 0; i < this.userCards.length; i++) {
                var _card = this.userCards[i];
                if (_card.value == card.value && _card.type == card.type) {
                    isHave = true;
                    break;
                }
            }
            if (isHave) {
                isHave = false;
                continue;
            }
            for (var i = 0; i < this.pubCards.length; i++) {
                var _card = this.pubCards[i];
                if (_card.value == card.value && _card.type == card.type) {
                    isHave = true;
                    break;
                }
            }
            if (isHave) {
                isHave = false;
                continue;
            }
            this.pubCards.push(card);
            count = this.pubCards.length;
        }
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map