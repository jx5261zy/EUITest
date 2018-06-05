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
        _this.pubCardNum = 0;
        return _this;
    }
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
            case 87:
                Main.instance.ShowOperateBtns();
                break;
            case 83:
                Main.instance.HideOperateBtns();
                break;
            case 32:
                Main.instance.SendPubCard();
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
        this._bg.skinName = "resource/eui_skin/game/DZPokerOnGameSkin.exml";
        this._bg.createChildren();
        this.addChild(this._bg);
        // var targetPos = new egret.Point();
        // targetPos.x = this._bg["gp_user_0"].x;
        // targetPos.y = this._bg["gp_user_0"].y;
        // this._bg["gp_user_0"].x = 1124;
        // this._bg["gp_user_0"].y = -242;
        // this._bg["gp_user_0"].alpha = 0;
        // this._bg["gp_user_0"].visible = true;
        // egret.Tween.get(this._bg["gp_user_0"]).to({x:targetPos.x,y:targetPos.y,alpha:1},700);
        //傻逼引擎的坐标转换
        // for(let i = 0; i < 6; i++)
        // {
        //     let point = new egret.Point();
        //     let parent:egret.DisplayObjectContainer = this._bg;
        //     this.localToGlobal(this._bg["zhuang_" + i].x,this._bg["zhuang_" + i].y,point);
        //     console.log("user_" + i + "x:" + point.x + ",y:" + point.y);
        // }
        //装到组件中就可以转换坐标了
        // for(let i = 0; i < 6; i++)
        // {
        //     let point:egret.Point = new egret.Point();
        //     var logo = this._bg["user_" + i]["img_zhuang"];
        //     // var parent:egret.DisplayObjectContainer = logo.parent;
        //     point = logo.parent.localToGlobal(logo.x,logo.y);
        //     console.log("user_" + i + "x:" + point.x + ",y:" + point.y);
        // }
        // var poker = new eui.Image();
        // poker.source = RES.getRes("dz_back_bg_png");
        // poker.x = 600;
        // poker.y = 350;
        // console.log("未加入组x:" + poker.x + ",y:" + poker.y);
        // var gp = new eui.Group();
        // this._bg.addChild(gp);
        // gp.x = 200;
        // gp.y = 100;
        // gp.addChild(poker);
        // console.log("加入组x:" + poker.x + ",y:" + poker.y);
        // let point = new egret.Point();
        // point = this.localToGlobal(poker.x,poker.y);
        // console.log("加入组转换世界坐标x:" + poker.x + ",y:" + poker.y);        
        // console.log(this._bg["img_bg"].name);
        // this._bg["img_bg"].visible = false;
        // var poker = new eui.Component();
        // poker.skinName = "resource/eui_skin/component/DZPokerSkin.exml";
        // this._bg["gp_public_cards"].addChild(poker);
        // poker["gp_poker_forward"].visible = false;
        // poker["img_poker_back"].visible = true;
        // poker.anchorOffsetX = poker.width * 0.5;
        // poker.anchorOffsetY = poker.height * 0.5;
        // poker["img_poker_back"].visible = true;
        // poker["gp_poker_forward"].visible = false;
        // poker.skewY = 180;
        // egret.Tween.get(poker).to({skewY:90},200,egret.Ease.quadOut).call(()=>{poker["gp_poker_forward"].visible = true;poker["img_poker_back"].visible = false;})
        //     .to({skewY:180},200,egret.Ease.quadOut);
        // egret.Tween.get(poker).to({scaleX:0}, 300, egret.Ease.sineOut).call(()=>{poker["gp_poker_forward"].visible = false;poker["img_poker_back"].visible = true;})
        //     .to({scaleX:1}, 300, egret.Ease.sineIn);
        //最终效果的翻牌动画
        // egret.Tween.get(poker["gp_poker"]).to({skewY:90},300,egret.Ease.quadOut).call(()=>{poker["gp_poker_forward"].visible = false;poker["img_poker_back"].visible = true;})
        //     .to({skewY:180},300,egret.Ease.quadOut);
        // this.TurnPubCardAnim(0,PokerDir.F2B);
        // this.TurnPubCardAnim(1,PokerDir.B2F);
        // this.SendBankerLogoAnim(0);
        // this.SendPubCard();
    };
    /**翻牌动画
     * @param index : 牌在组里的下表
     * @param direction : 翻转的方向，1由正-》反  2由反-》正
     */
    Main.prototype.TurnPubCardAnim = function (index, direction) {
        var poker = this._bg["gp_public_cards"].getChildAt(index);
        switch (direction) {
            case PokerDir.F2B:
                {
                    egret.Tween.get(poker["gp_poker"]).to({ skewY: 90 }, 1000, egret.Ease.quadOut)
                        .call(function () { poker["gp_poker_forward"].visible = false; poker["img_poker_back"].visible = true; })
                        .to({ skewY: 180 }, 1000, egret.Ease.quadOut);
                }
                break;
            case PokerDir.B2F:
                {
                    poker["gp_poker"].skewY = 180;
                    egret.Tween.get(poker["gp_poker"]).to({ skewY: 270 }, 1000, egret.Ease.quadOut)
                        .call(function () { poker["gp_poker_forward"].visible = true; poker["img_poker_back"].visible = false; })
                        .to({ skewY: 360 }, 1000, egret.Ease.quadOut);
                }
                break;
        }
    };
    /**发庄logo */
    Main.prototype.SendBankerLogoAnim = function (chairID) {
    };
    /**底部操作条上升 */
    Main.prototype.ShowOperateBtns = function () {
        var bottom = this._bg["gp_operation_btns"];
        //TODO：下沉之前要无效话按钮
        egret.Tween.get(bottom).to({ x: 0, y: 650 }, 500);
    };
    /**隐藏底部操作按钮 按钮下沉*/
    Main.prototype.HideOperateBtns = function () {
        var bottom = this._bg["gp_operation_btns"];
        //TODO：上升之前要激活按钮
        egret.Tween.get(bottom).to({ x: 0, y: 750 }, 500);
    };
    /**往公共牌区域发一张牌的动画 */
    Main.prototype.SendPubCard = function () {
        var _this = this;
        var start = this._bg["pos_send_card"];
        var poker = new eui.Component();
        poker.skinName = "resource/eui_skin/component/DZPokerSkin.exml";
        poker.scaleX = poker.scaleY = 0.1;
        poker.x = start.x;
        poker.y = start.y;
        this._bg.addChild(poker);
        var target = this.GetPubTargetPos();
        egret.Tween.get(poker).to({ x: target.x, y: target.y, scaleX: 1, scaleY: 1 }, 1000)
            .call(function () { _this._bg["gp_public_cards"].addChild(poker); _this.pubCardNum++; });
    };
    Main.prototype.GetPubTargetPos = function () {
        var point = new egret.Point;
        point.x = this._bg["gp_public_cards"].x;
        point.y = this._bg["gp_public_cards"].y;
        var cardW = 116;
        point.x = point.x + cardW * this.pubCardNum;
        return point;
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
//# sourceMappingURL=Main.js.map