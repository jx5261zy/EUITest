var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var BaseComponent = (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent(table) {
        if (table === void 0) { table = null; }
        var _this = _super.call(this) || this;
        _this.needShow = true;
        _this.inited = false;
        // public scrollerView : ScrollerNotificationView = null;
        /**游戏桌子信息，包括桌子号，玩家信息等 */
        _this._gameTable = null;
        _this._gameTable = table;
        return _this;
    }
    BaseComponent.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.selfStage = this.stage;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.componentDispose, this);
    };
    BaseComponent.prototype.load = function (skinName) {
        var _this = this;
        if (this["__class__"] != "IndexView" &&
            this["__class__"] != "IndexViewReview") {
            ResGroupManage.loadViewGroup(this["__class__"], function (err, groupname) {
                if (!_this.isDispose) {
                    _this.addEventListener(eui.UIEvent.COMPLETE, _this.onUIComplete, _this);
                    _this.skinName = skinName;
                    if (_this.stage) {
                        _this.onUIComplete();
                    }
                }
            }, this, this['kindID']);
        }
        else {
            this.addEventListener(eui.UIEvent.COMPLETE, this.onUIComplete, this);
            this.skinName = skinName;
        }
    };
    BaseComponent.prototype.onUIComplete = function (ev) {
        if (ev === void 0) { ev = null; }
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onUIComplete, this);
        if (!this.inited) {
            if (this.stage) {
                this.initComponent();
            }
            else {
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onUIComplete, this); //这里回调用onUIComplete 保证inited判断
            }
        }
    };
    BaseComponent.prototype.initComponent = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onUIComplete, this);
        if (!GlobalPara.isNative) {
            ResGroupManage.loadGameResBackground(this['__class__']);
        }
        //TODO
        this.inited = true;
        if ([null, undefined].indexOf(this['group_notify']) == -1) {
        }
        this.checkResize();
        if (!Utils.isNative()) {
            this.stage.addEventListener(egret.Event.RESIZE, this.checkResize, this);
        }
        if ([null, undefined].indexOf(this['touch_rect']) == -1) {
            this['touch_rect'].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchRectToClose, this);
        }
    };
    BaseComponent.prototype.touchRectToClose = function (event) {
        if (!this['group'].hitTestPoint(event.stageX, event.stageY)) {
            this.animalDisapear();
        }
    };
    // 显示顶部的公告内容
    // 设置富文本
    BaseComponent.prototype.showNotification = function (text, color) {
        // if (GlobalPara.packageState == 2) {
        //     return;
        // }
        if (color === void 0) { color = null; }
        // if (this.scrollerView && !this.scrollerView._isFloat){
        //     this.scrollerView.visible = true;
        //     this.scrollerView._isFloat = true;
        //     if(MessageManage.noticeMessages.length > 0){
        //         var msg: any = MessageManage.noticeMessages.splice(0,1);
        //        	GlobalPara.gScrollerNotify = msg[0].content;
        //       //  this.scrollerView._color = MessageManage.getNoticeMsgColorByType(msg[0].type); //颜色
        //    	}
        //     if(!text){
        //          this.scrollerView.showNotification(GlobalPara.gScrollerNotify);
        //     }
        //     else{
        //          this.scrollerView.showNotification(text,color);
        //     }           
        // }
    };
    /**
     * 设置当前滚动信息文字颜色
     */
    BaseComponent.prototype.setNotificationTextColor = function (color) {
        // this.scrollerView.label_notify.textColor = color;
    };
    /**
   * 设置当前滚动信息 在可以改变状态
   * (true 可以改变， false 不可以改变（主页面永远不消失）)
   */
    BaseComponent.prototype.setCanChangeShowState = function (state) {
        //    this.scrollerView.isCanChangeShowState = state;
    };
    /**
    * 设置当前滚动信息背景颜色
    */
    BaseComponent.prototype.setNotificationBg = function (source) {
        //this.scrollerView["img_back"].source = source;
        // this.scrollerView.updateImgBack(source);
    };
    BaseComponent.prototype.checkResize = function () {
        if (this.height >= 750) {
            var size = Utils.getScreenSize();
            if (size.w != 0 && size.h != 0) {
                GlobalPara.screenHeight = size.h;
                GlobalPara.screenWidth = size.w;
            }
            var scale1 = 0.75; //4:3
            var scale2 = 0.562218; //16:9
            var scale = GlobalPara.screenHeight / GlobalPara.screenWidth;
            var height = this.height;
            if (egret.MainContext.instance.stage.scaleMode == egret.StageScaleMode.FIXED_WIDTH ||
                egret.MainContext.instance.stage.scaleMode == egret.StageScaleMode.SHOW_ALL) {
                if (scale >= scale2 && scale <= scale1) {
                    height = Math.min(1000, Math.floor(GlobalPara.screenHeight * 1334 / GlobalPara.screenWidth));
                    egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
                }
                else {
                    height = 750;
                    egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
                }
                if (this.height != height) {
                    this.height = height;
                }
            }
            else if (egret.MainContext.instance.stage.scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                this.width = Math.min(1334, Math.floor(GlobalPara.screenWidth * 750 / GlobalPara.screenHeight));
            }
            // Utils.showLog('---scale---height---', scale, this.height);
            GlobalPara.componentFullScreenOffset = (this.height - 750) / 2;
        }
    };
    BaseComponent.prototype.updateChairInfo = function (table) {
    };
    BaseComponent.prototype.quiteGameTable = function () {
        // AppFacade.getInstance().sendNotification(UnloadGame_Command.NAME, {name: GlobalPara.gameType});
    };
    // 界面展示完毕后
    BaseComponent.prototype.shown = function () {
    };
    BaseComponent.prototype.animalShow = function (cb) {
        if (cb === void 0) { cb = null; }
        if ([null, undefined].indexOf(this['group']) == -1) {
            this['group'].scaleX = 0;
            this['group'].scaleY = 0;
            egret.Tween.get(this['group']).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
        }
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = this.anchorOffsetX;
        this.y = this.anchorOffsetY;
    };
    BaseComponent.prototype.animalDisapear = function (cb) {
        var _this = this;
        if (cb === void 0) { cb = null; }
        // if ([null, undefined].indexOf(this['touch_rect']) == -1) {
        //     this['touch_rect'].visible = false;
        // }
        egret.Tween.get(this["touch_rect"])
            .to({ alpha: 0, scaleY: 0.4 }, 300, egret.Ease.backIn);
        egret.Tween.get(this["group"])
            .to({ scaleX: 0.4, scaleY: 0.4 }, 300, egret.Ease.backIn)
            .call(function () {
            Utils.safeRemove(_this);
            if (cb) {
                cb();
            }
        }, this);
    };
    /**设置视图可见性 为false 停止所有动画*/
    BaseComponent.prototype.setVisible = function (val) {
        this.visible = val;
    };
    BaseComponent.prototype.componentDispose = function () {
        this.isDispose = true;
        this._gameTable = null;
        if (this.selfStage) {
            this.selfStage.removeEventListener(egret.Event.RESIZE, this.checkResize, this);
            this.selfStage = null;
        }
        // if(this.scrollerView)
        // {
        //     this.scrollerView.componentDispose();
        //     this.scrollerView = null;
        // }
        if (this['touch_rect']) {
            egret.Tween.removeTweens(this['touch_rect']);
            this['touch_rect'].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchRectToClose, this);
        }
        if (this["group"]) {
            egret.Tween.removeTweens(this["group"]);
        }
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onUIComplete, this);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onUIComplete, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.componentDispose, this);
        this.removeChildren();
        egret.Tween.removeTweens(this);
        if (this.parent)
            this.parent.removeChild(this);
    };
    return BaseComponent;
}(eui.Component));
__reflect(BaseComponent.prototype, "BaseComponent");
//# sourceMappingURL=BaseComponent.js.map