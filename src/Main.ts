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

class Main extends eui.UILayer {

    public static getInstance():Main
    {
        if(Main._instance != null)
            return Main._instance;
    }

    private _table:GameTable;

    /**
     * 加载进度界面
     * loading process interface
     */
    private _bg:any;
    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren();
        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter",assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }
    private createScene(){
        if(this.isThemeLoadEnd && this.isResourceLoadEnd){
            this.startCreateScene();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    private textfield:egret.TextField;

    private static _instance:Main;
    public static get instance():Main
    {
        return this._instance;
    }
    // private OnKeyDown(key)
    // {
    //     switch(key.keyCode)
    //     {
    //         //W
    //         case 87:
    //             Main._instance.ShowOperateBtns();
    //             console.log("显示按钮组");
    //         break;

    //         //S
    //         case 83:
    //             Main._instance.HideOperateBtns();
    //             console.log("隐藏按钮组");
    //         break;

    //         //space
    //         case 32:
    //             var poker:DZCardView = Main._instance.SendPubCard();
    //             if(poker != null)
    //             {
    //                 var value = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
    //                 var type = Math.round(Math.random() * 10 % 3);
    //                 // var type = CardType.DIAMONDS;
    //                 poker.SetData(value,type,false);
    //                 poker.SetDisplay();
    //                 console.log("发一张公共牌");
    //             }
    //         break;

    //         //U
    //         case 85:
    //             Main._instance.mainUser.StartOperationBarAnim(DZDefine.iOperateTime);
    //             Main._instance.chairID_User.forEach(element=>{
    //                 element.StartOperationBarAnim(DZDefine.iOperateTime);
    //             })
    //             console.log("开始玩家操作倒计时");
    //         break;

    //         //F
    //         case 70:
    //             for(let i = 0; i < Main._instance._pubCardContainer.length; i++)
    //             {
    //                 if(!Main._instance._pubCardContainer[i].isFront)
    //                 {
    //                     Main._instance.TurnPubCardAnim(i,PokerDir.B2F);
    //                     break;
    //                 }
    //             }
    //         break;

    //         //C
    //         case 67:
    //             Main._instance.SendUsersCardsAnim();
    //             console.log("发送所有玩家的手牌");
    //         break;

    //         //X
    //         case 88:
    //             for(let i = 0; i < 6; i++)
    //             {
    //                 Main._instance.TurnCardAnim(i);
    //                 var value = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
    //                 var type = Math.round(Math.random() * 10 % 3);
    //                 var value1 = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
    //                 var type1 = Math.round(Math.random() * 10 % 3);
    //                 var _value = [value,value1];
    //                 var _type = [type,type1];
    //                 Main._instance.SetUserCardData(i,_value,_type);
    //             }
                
                
    //             console.log("翻开主玩家手牌");
    //         break;

    //         //Z
    //         case 90:
    //             Main._instance.TurnCardAnim(Main._instance.mainUser.chairID);
    //             var value = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
    //             var type = Math.round(Math.random() * 10 % 3);
    //             var value1 = Math.round(Math.random() * 10 + Math.random() * 10 % 4);
    //             var type1 = Math.round(Math.random() * 10 % 3);
    //             var _value = [value,value1];
    //             var _type = [type,type1];
    //             Main._instance.SetUserCardData(Main._instance.mainUser.chairID,_value,_type);
    //         break;

    //         //B
    //         case 66:
    //             var bankerID = Math.round(Math.random() * 10 % Main._instance.chairID_User.length);
    //             if(bankerID == 6)
    //                 bankerID--;
    //             // var bankerID = 2;
    //             console.log("bankerID:" + bankerID);
    //             Main._instance.chairID_User[bankerID].isBanker = true;
    //             Main._instance.SendBankerLogoAnim(bankerID);

    //         break;


    //         //I
    //         case 73:
    //             Main._instance.SetOperationBtnsDisplay(DZDefine.Q_CINGL_ADD);
    //         break;

    //         //O
    //         case 79:
    //             Main._instance.SetOperationBtnsDisplay(DZDefine.Q_CINGL_ALLIN);
    //         break;

    //         //P
    //         case 80:
    //             Main._instance.SetOperationBtnsDisplay(DZDefine.Q_PASS_ADD);
    //         break;


    //         //D
    //         case 68:
    //             // Main.instance.mainUser.Bet(1000);
    //             Main.betValue += 50;
    //             Main.instance.chairID_User.forEach(ele=>{
    //                 ele.Bet(Main.betValue);
    //             });
    //         break;

    //         //E
    //         case 69:
    //             DZChipController.MoveAllChipsToPot();
    //         break;

    //     }
    // }

    private static betValue:number = 0;




    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        Main._instance = this;
        // document.onkeydown = this.OnKeyDown;

        this.SetUsers();
        var dzGame = new DZPokerOnGameView(this._table);
        this.addChild(dzGame);

        //加注滑动条测试
        // var slider:eui.Component = new eui.Component();
        // slider.skinName = "resource/dezhoupoker/eui_skin/view/DZAddChipView.exml";
        // this.addChild(slider);

    }




















    /**底部操作条上升 */
    public ShowOperateBtns():void
    {
        var bottom:eui.Group = this._bg["gp_operation_btns"];
        egret.Tween.get(bottom).to({x:0,y:650},DZDefine.operationBtns)
                            .call(()=>{bottom.touchChildren = true});
    }
    /**隐藏底部操作按钮 按钮下沉*/
    private HideOperateBtns():void
    {
        var bottom:eui.Group = this._bg["gp_operation_btns"]; 
        bottom.touchChildren = false;
        egret.Tween.get(bottom).to({x:0,y:750},DZDefine.operationBtns);
    }













    /**测试使用的玩家 */
    private SetUsers()
    {
        this._table = new GameTable(10);
        var mainUser = new DZUser(111,10,0,UserData);
        mainUser.nickname = "绘图铅笔2B";
        mainUser.gold = 11111;
        this._table.addUser(mainUser)

        var user1 = new DZUser(112,10,1,UserData);
        user1.nickname = "Holly";
        user1.gold = 10000;
        this._table.addUser(user1);

        var user2 = new DZUser(113,10,2,UserData);
        user2.nickname = "Shit";
        user2.gold = 10000;
        this._table.addUser(user2);

        var user3 = new DZUser(114,10,3,UserData);
        user3.nickname = "Mother";
        user3.gold = 10000;
                this._table.addUser(user3);

        var user4 = new DZUser(115,10,4,UserData);
        user4.nickname = "Fucker";
        user4.gold = 10000;
                this._table.addUser(user4);

        var user5 = new DZUser(116,10,5,UserData);
        user5.nickname = "Stupid";
        user5.gold = 10000;
                this._table.addUser(user5);


    }



//class end
}


enum PokerDir
{
    F2B,
    B2F,
}

enum CardType
{
    DIAMONDS,
    CLUB,
    HEART,
    SPADE,
}


