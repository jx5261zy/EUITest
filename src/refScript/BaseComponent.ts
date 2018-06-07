/**
 *
 * @author 
 *
 */
class BaseComponent extends eui.Component {
	
    public needShow : boolean = true;
    public inited : boolean = false;
    // public scrollerView : ScrollerNotificationView = null;
    public _gameTable : GameTable = null;
    public constructor(table : GameTable = null) {
        super();
        this._gameTable = table;
	}
	
    protected selfStage:egret.Stage;
    protected isDispose:boolean;
    protected createChildren() {
        super.createChildren();
        this.selfStage = this.stage;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.componentDispose, this);
    }

	protected load(skinName:string) {

        if (this["__class__"] != "IndexView" &&
            this["__class__"] != "IndexViewReview") {
            ResGroupManage.loadViewGroup(this["__class__"], (err, groupname) => {
                if(!this.isDispose)//外部主动调用 componentDispose 保证不在执行initComponent
                {
                    this.addEventListener(eui.UIEvent.COMPLETE, this.onUIComplete, this);
                    this.skinName = skinName;
                    if (this.stage) {
                        this.onUIComplete();
                    }
                }
            }, this, this['kindID']);

        } else {
            this.addEventListener(eui.UIEvent.COMPLETE, this.onUIComplete, this);
            this.skinName = skinName;
        }
	}
	
    protected onUIComplete(ev:eui.UIEvent = null){
         this.removeEventListener(eui.UIEvent.COMPLETE, this.onUIComplete, this);
         if(!this.inited)
         {
             if(this.stage)
             {
                this.initComponent();
             }else
             {
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onUIComplete, this);//这里回调用onUIComplete 保证inited判断
             }
         }
	}
	
    protected initComponent() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onUIComplete, this)

        if (!GlobalPara.isNative) {
            ResGroupManage.loadGameResBackground(this['__class__']);
        }

        //TODO
        this.inited = true;

        if ([null, undefined].indexOf(this['group_notify']) == -1) {
            // this.scrollerView = new ScrollerNotificationView(GlobalPara.gScrollerNotify);
            // this.scrollerView.horizontalCenter = this.scrollerView.verticalCenter = 0;
            //  this.scrollerView.width =  this['group_notify'].width;

            // this['group_notify'].addChild(this.scrollerView);
            // if(MessageManage.noticeMessages.length > 0){
            //     var msg: any = MessageManage.noticeMessages.splice(0,1);
            //    	GlobalPara.gScrollerNotify = msg[0].content;
            //   //  this.scrollerView._color = MessageManage.getNoticeMsgColorByType(msg[0].type); //颜色

            //     this.scrollerView.showNotification(GlobalPara.gScrollerNotify);
            
            //     this.scrollerView._isFloat = true;
           	// }

            // if (GlobalPara.packageState == 2) {
            //     this.scrollerView.visible = false;
            // }
        }

        this.checkResize();
        if (!Utils.isNative()) {
            this.stage.addEventListener(egret.Event.RESIZE, this.checkResize, this);           
        }

        if ([null, undefined].indexOf(this['touch_rect']) == -1) {
            this['touch_rect'].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchRectToClose, this);
        }
    }

    public touchRectToClose(event : any) : void {
        if (!this['group'].hitTestPoint(event.stageX, event.stageY)) {
            this.animalDisapear();
        }
    }

    // 显示顶部的公告内容
    // 设置富文本
    public showNotification(text : string,color:string = null) : void {

        // if (GlobalPara.packageState == 2) {
        //     return;
        // }

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
    }
    /**
     * 设置当前滚动信息文字颜色
     */
    public setNotificationTextColor(color : any) : void {
        // this.scrollerView.label_notify.textColor = color;
    }

      /**
     * 设置当前滚动信息 在可以改变状态 
     * (true 可以改变， false 不可以改变（主页面永远不消失）)
     */
    public setCanChangeShowState(state : boolean) : void {
    //    this.scrollerView.isCanChangeShowState = state;
    }    

     /**
     * 设置当前滚动信息背景颜色
     */
    public setNotificationBg(source : string) : void {
      //this.scrollerView["img_back"].source = source;
        // this.scrollerView.updateImgBack(source);
    }

    public checkResize():void {

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
                } else {
                    height = 750;
                    egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
                }

                if (this.height != height) {
                    this.height = height;
                }

            } else if (egret.MainContext.instance.stage.scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
                this.width = Math.min(1334, Math.floor(GlobalPara.screenWidth * 750 / GlobalPara.screenHeight));
            }

            // Utils.showLog('---scale---height---', scale, this.height);
            GlobalPara.componentFullScreenOffset = (this.height - 750) / 2;
        }
    }

    public updateChairInfo(table : GameTable) : void {

    }

    public quiteGameTable() : void {
        // AppFacade.getInstance().sendNotification(UnloadGame_Command.NAME, {name: GlobalPara.gameType});
    }

    // 界面展示完毕后
    public shown() : void {

    }

    public animalShow(cb : Function = null) : void {
        if ([null, undefined].indexOf(this['group']) == -1) {
            this['group'].scaleX = 0;
            this['group'].scaleY = 0;
            egret.Tween.get(this['group']).to({scaleX: 1, scaleY: 1}, 300, egret.Ease.backOut);
        }

        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = this.anchorOffsetX;
        this.y = this.anchorOffsetY;
    }

    public animalDisapear(cb : Function = null) : void {
        // if ([null, undefined].indexOf(this['touch_rect']) == -1) {
        //     this['touch_rect'].visible = false;
        // }
        egret.Tween.get(this["touch_rect"])
                   .to({alpha: 0, scaleY: 0.4}, 300, egret.Ease.backIn)

        egret.Tween.get(this["group"])
                   .to({scaleX: 0.4, scaleY: 0.4}, 300, egret.Ease.backIn)
                   .call(() => {
                        
                       Utils.safeRemove(this);
                       if (cb) {
                           cb();
                       }
                   }, this);
    }

    /**设置视图可见性 为false 停止所有动画*/
    public setVisible(val:boolean):void
    {
        this.visible = val;
    }

    public componentDispose() : void {
        this.isDispose = true;
        this._gameTable = null;
        if(this.selfStage)
        {
            this.selfStage.removeEventListener(egret.Event.RESIZE, this.checkResize, this);
            this.selfStage = null;
        }
        // if(this.scrollerView)
        // {
        //     this.scrollerView.componentDispose();
        //     this.scrollerView = null;
        // }
        if(this['touch_rect']) 
        {
            egret.Tween.removeTweens(this['touch_rect']);
            this['touch_rect'].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchRectToClose, this);
        }
        if(this["group"])
        {
            egret.Tween.removeTweens(this["group"]);
        }
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onUIComplete, this);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onUIComplete, this)
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.componentDispose, this);
        this.removeChildren();
        egret.Tween.removeTweens(this);
        if(this.parent) this.parent.removeChild(this);
    }
}