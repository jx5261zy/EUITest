// /**
//  *
//  * @author sjyt-yan-9-h5 slot 
//  * 2017-4-10 10:30:04
//  */

// class NiuniuGameOnView extends GameViewBase {
    
//     public static ThemePath = "resource/niuniu/";

//     public static MAX_AUTO_READY_TIME = 1000000;

//     //gametimer 类型
//     /**准备时间*/
//     public static GAME_TIME_OUT_TYPE_READY = 1; //准备时间
//     public static TIMER_TIME_OUT_TYPE_READY:number = 11;

//     /**下注时间*/
//     public static GAME_TYPE_OUT_TYPE_CHIP = 2; //下注时间
//     /**开牌时间*/
//     public static GAME_TYPE_OUT_TYPE_OPEN = 3; //开牌时间
//     /**抢庄时间*/
//     public static GAME_TYPE_ROB_ZJ_TIME = 4; //抢庄时间

//     /**开始动画*/
//     private static TIMER_ID_START_ANI:number = 10;
//     /**开始动画时长*/
//     public static TIMER_TIME_START_ANI:number = 1;

//     /**亮牌*/
//     private static TIMER_ID_SHOW_CARD:number = 11;

//     /**自动准备*/
//     private static TIMER_ID_AUTO_READY:number = 12;

//      /**自动押注*/
//     private static TIMER_ID_AUTO_MAX_BET:number = 13;

//     private static TIMER_TIME_AUTO:number = 2;

//     /**发牌*/
//     private static TIMER_ID_SEND_CARD:number = 14;
//     private static TIMER_TIME_SEND_CARD:number = .6;


//     private _users_id_chair_map : any = {};
//     private _gameStart : boolean = false;
//     private table : GameTable = null;
//     private chairs : any = [];

//     private _cellGold : number = 1;

//     public iChipTime : number = 0; //下注时间
//     public iOutCardTime : number = 0; //开牌时间
//     public iRobZJTime : number = 0; // 抢庄时

//     /**游戏状态*/
//     public gameState : number = NiuNiuGameState.GAME_STATE_END;

//     private _minChip : number = 0; //最小下注
//     private _maxChip : number = 0; //最大下注
//     private _banker : number = -1; //当前的庄
//     private _forceLeave : boolean = false;
//     private _autoReadyTime : number = NiuniuGameOnView.MAX_AUTO_READY_TIME; // 自动准备次数

//     private setToggleBtn:eui.ToggleButton;
//     private _btnContainer:ButtonContainer;
//     private _niuniuSetView:NiuNiuSetView;
//     private group_tips:eui.Group;

//     // private tipsLabel:eui.Label;
//     private tipsImage:eui.Image;
    

//     private startGameView:NiuNiuStartGameView;
//     private autoReadyCheckBox:eui.CheckBox;
//     private autoMaxBetCheckBox:eui.CheckBox;
//     private _isAutoReady:boolean;
//     private _isAutoMaxBet:boolean;
//     public constructor(table : GameTable) {
//         super(table,"niuniu",5);
//         this.load(NiuniuGameOnView.ThemePath + "resource/eui_skins/game/NiuniuGameSkin.exml");
//     }
//     private showStartGameView():void
//     {
//         if(!this.startGameView)
//         {
//             this.startGameView = new NiuNiuStartGameView();
//             this.startGameView.show(this);
//         }else
//         {
//             this.startGameView.visible = true;
//         }
//         this.startGameView.play();
//     }
//     private hideStartGameView():void
//     {
//         if(this.startGameView) this.startGameView.visible = false;
//     }
//     private removeStartGameView():void
//     {
//         if(this.startGameView)
//         {
//             this.startGameView.dispose();
//             this.startGameView = null;
//         }
//     }
//     public showCenterMessageTips(str:string):void
//     {
//         this.group_tips.visible = true;
//         this.group_tips.alpha = 0;
//         egret.Tween.removeTweens(this.group_tips);
//         egret.Tween.get(this.group_tips).to({alpha:1},200);
//         // this.tipsLabel.text = str;
//         this.tipsImage.source="niuniu_img_msg_"+str+"_png";
//     }
//     public hideCenterMessageTips():void
//     {
//         egret.Tween.removeTweens(this.group_tips);
//         egret.Tween.get(this.group_tips).to({alpha:0},200).call(()=>{
//              this.group_tips.visible = false;
//         },this);
//     }
//     private addEvents():void
//     {
//         this._btnContainer = new ButtonContainer();
//         this._btnContainer.addButton(this.setToggleBtn);
//         this._btnContainer.addButton(this['btn_ok']);//分牌 完成按钮
//         this._btnContainer.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClick,this);
//         this._btnContainer.addButton(this.autoReadyCheckBox);
//         this._btnContainer.addButton(this.autoMaxBetCheckBox);
//     }
//     private removeEvents():void
//     {
//         this._btnContainer.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClick,this);
//         this._btnContainer.dispose();
//         this._btnContainer = null;
//     }
//     private showSetView():void
//     {
//         if(this._niuniuSetView == null)
//         {
//             this._niuniuSetView = new NiuNiuSetView(this);
//             this.addChild(this._niuniuSetView);
//             this._niuniuSetView.x = this.setToggleBtn.x-132;
//             this._niuniuSetView.y = this.setToggleBtn.y+83;
//             this._niuniuSetView.addEventListener(egret.Event.CLOSE,this.removeSetView,this);
//         }
//         this._niuniuSetView.ani();
//     }
//     private removeSetView():void
//     {
//         if(this._niuniuSetView)
//         {
//             this._niuniuSetView.dispose();
//             this._niuniuSetView.removeEventListener(egret.Event.CLOSE,this.removeSetView,this);            
//             this._niuniuSetView = null;
//             this.setToggleBtn.selected = false;
//         }
//     }
//     protected clear():void
//     {
//         super.clear();
//         this.hideCenterMessageTips();
//         this.hideCenterTime();
//         this.stopGameTimer();
//         this.stopTimer(NiuniuGameOnView.TIMER_ID_SEND_CARD);
//         this.stopTimer(NiuniuGameOnView.TIMER_ID_AUTO_READY);
//         this.stopTimer(NiuniuGameOnView.TIMER_ID_START_ANI);
//         this.stopTimer(NiuniuGameOnView.TIMER_ID_AUTO_MAX_BET);
//         this.stopTimer(NiuniuGameOnView.TIMER_ID_SHOW_CARD);
//         if(this.table)
//         {
//             for (var key in this.table.users) {
//                 this.table.users[key].resetUserData();
//             }
//         }
//         if(NiuniuUser.niuniuOKBtn) NiuniuUser.niuniuOKBtn.visible = false;
//         this._gameStart = false;
//         if(NiuniuUser.niuniuOperate) NiuniuUser.niuniuOperate.visible = false;
//     }
//     private onBtnClick(e:egret.Event):void
//     {
//         switch(e.data)
//         {
//             case this.setToggleBtn:
//             SoundManager.instance.playSound(NiuNiuSoundType.getSoundPath(NiuNiuSoundType.OPEN_VIEW));
//             if(this.setToggleBtn.selected)
//             {
//                 this.showSetView();
//             }else
//             {
//                 this.removeSetView();
//             }
//             break;
//             case this['btn_ok']:
//             SoundManager.instance.playSound(NiuNiuSoundType.getSoundPath(NiuNiuSoundType.BTN_CLICK));
//             this.openCards();
//             break;
//             case this.autoReadyCheckBox:
//                 SoundManager.instance.playSound(NiuNiuSoundType.getSoundPath(NiuNiuSoundType.SELECT));
//                 this._isAutoReady = this.autoReadyCheckBox.selected;
//                 egret.localStorage.setItem("isAutoReady",this._isAutoReady ? "true" : "false");
//             break;
//             case this.autoMaxBetCheckBox:
//                 SoundManager.instance.playSound(NiuNiuSoundType.getSoundPath(NiuNiuSoundType.SELECT));
//                 this._isAutoMaxBet = this.autoMaxBetCheckBox.selected;
//                 egret.localStorage.setItem("isAutoMaxBet",this._isAutoMaxBet ? "true" : "false");
//             break;
//         }
//     }

//     public dispose():void
//     {
//         // // // Utils.showLog("销毁 main");
//         AppFacade.getInstance().removeMediator(NiuniuGameOnMediator.NAME);
//         egret.MainContext.instance.stage.frameRate = 30;
//         if(this.group_tips) egret.Tween.removeTweens(this.group_tips);
//         this.removeEvents();
//         this.removeSetView();
//          if(this.table && this.table.users)
//          {
//              var user:NiuniuUser;
//              for(var k in this.table.users)
//              {
//                  user = this.table.users[k];
//                  user.dispose();
//              }
//              this.table = null;
//          }
//          this.removeStartGameView();
//          if(this._winView) egret.Tween.removeTweens(this._winView);
//          if(this._lostView) egret.Tween.removeTweens(this._lostView);
//          this._showCardUserIDArr = null;
//          this._winView = null;
//          this._lostView = null;
//         egret.Tween.removeTweens(this);
//         pool.ObjectPool.instance.cleanObjectPool(NiuNiuCardView.NIU_NIU_CARD_POOLNAME);
//         SoundManager.instance.clearGameSounds();
//         NiuNiuViewController.removeAllWindow();

//         this.hideWxlEffect();

//         NiuniuUser.operateGroup = null;
//         NiuniuUser.niuniuOKBtn = null;
//         NiuniuUser.niuniuOperate = null;
//         super.dispose();
//     }
//     private hideView():void
//     {
//         for(var i:number = 0;i<this._maxPlayerCount;i++)
//         {
//             this["player"+i+"_stateGroup"].visible = false;
//             this["player"+i+"_betBitmapLabel"].visible = false;
//         }
//     }
//     protected initComponent() {

//         super.initComponent();
//         this.setNotificationBg("niuniu_notification_bg_png");
//         UserData.changeTable = false;
//        //  this.scrollerView["img_back"].source = "niuniu_notification_bg_png";

//         this.setFrameRate();
//         pool.ObjectPool.instance.createObjectPool(NiuNiuCardView.NIU_NIU_CARD_POOLNAME,NiuNiuCardView,50);
//         SoundManager.instance.readLocalData();

//         SoundManager.instance.playSound(NiuNiuSoundType.getSoundPath(NiuNiuSoundType.BG_MUSIC),0,0,false,true);

//         this.addEvents();
//         this.hideView();

//         this._isAutoReady = egret.localStorage.getItem("isAutoReady") == "true";
//         this._isAutoMaxBet = egret.localStorage.getItem("isAutoMaxBet") == "true";
//         this.autoReadyCheckBox.selected = this._isAutoReady;
//         this.autoMaxBetCheckBox.selected = this._isAutoMaxBet;

//         for (var i = 0; i < 5; ++i) {
//             this.chairs.push(new NiuniuChair(i, this['user' + i]));
//             this.chairs[i].resetChair();
//         }

//         AppFacade.getInstance().registerMediator(new NiuniuGameOnMediator(this));


//         NiuniuUser.operateGroup = this['group_operate'];
//         NiuniuUser.STARTX = this.width / 2;
//         NiuniuUser.STARTY = this.height / 2;
//         var p:egret.Point = this.localToGlobal(NiuniuUser.STARTX,NiuniuUser.STARTY);
//         NiuniuUser.STAGE_STARTX = p.x;
//         NiuniuUser.STAGE_STARTY = p.y;

//         NiuniuUser.niuniuOperate = this['niuniu_operate'];//点数计算 显示
//         NiuniuUser.niuniuOKBtn = this['btn_ok'];
//         NiuniuUser.niuniuOKBtn.visible = false;


//         this['btn_back'].addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
// 			if(this.mainUser)
// 			{
// 				if(!this.mainUser.used || this.gameState == NiuNiuGameState.GAME_STATE_NoStart || this.gameState == NiuNiuGameState.GAME_STATE_END)
// 				{
// 					NiuNiuViewController.showMessagePop("你确定退出牛牛游戏吗？",this.quiteGameTable,this,true);
// 				}else
// 				{``
// 					NiuNiuViewController.showMessagePop("你正在游戏中,不能退出游戏。",null,null,false);
// 					//NiuNiuViewController.showMessagePop("你正在游戏中，退出游戏会扣除部分金币。你确定退出吗？",this._gameView.quiteGameTable,this._gameView,true);
// 				}
// 			}else
// 			{
// 				this.quiteGameTable();
// 			}
//         },this)

//         this.clear();
        
//         this.updateChairInfo(this._gameTable);

//         //得到此房间的底分 @author 刘念 2018/5/15
//         if([null, undefined].indexOf(this.table) == -1){
//             for (var key in this.table.users) {
//                 var user_tmp:NiuniuUser = this.table.users[key];
//                 break;
//             }        
//             for(var i=0;i<GlobalPara.roomsData.mRoomList.length;i++){
//                 if(user_tmp.roomID == GlobalPara.roomsData.mRoomList[i]['iRoomID']){
//                     this.icellgold = Utils.numberFormat3(GlobalPara.roomsData.mRoomList[i]['iCellGold']/100.00,2);    //转换为元单位
//                     break;
//                 }
//             }
//         }
//         //////
//     }
//     private openCards(isAuto?:boolean):void
//     {
//         var user = this.table.users['' + UserData.userID];
//         if (user) {
//             var three = [];
//             var two = [];
//             var selectCard:Array<number> = user.selectedCard;
//             if(isAuto) selectCard = null;
//             for (var i = 0; i < user.paiFive.length; ++i) {
//                 if (selectCard && selectCard.indexOf(i) != -1) {
//                     three.push(user.paiFive[i]);
//                 } else {
//                     two.push(user.paiFive[i]);
//                 }
//             }
//             AppFacade.getInstance().sendNotification(NiuniuGameOnMediator.CS_OutCard, {byTwoCard: two, byThreeCard: three});
//         }
//     }
//     public quiteGameTable() : void {
//         this.stopGameTimer();
//         this.hideWxlEffect();

//         UserData.userState = 0;
//         AppFacade.getInstance().sendNotification(PublicNotification.GAME_SUB_CS_USER_STANDUP);

//         AppFacade.getInstance().sendNotification(PublicNotification.GAME_SUB_CS_USER_LEAVE_GAME);

//         super.quiteGameTable();
//     }

//     public showCellScore() : void {
//         this['label_cell']['text'] = this._cellGold;
//     }

//     public showReadyBtns() : void {
//         var user:NiuniuUser = this.table.users['' + UserData.userID];
//         if(!user || !user.used) 
//         {
//             // // Utils.showLog("显示准备按钮 失败 " + user + "  " + user.used);
//             return;
//         }
//         user.setOperateBtns(1); //显示准备按钮
//         // this.showCenterMessageTips("游戏即将开始");
//         this.showCenterMessageTips("game_starting");
        
//         if(this._isAutoReady)
//         {
//             this.setTimer(NiuniuGameOnView.TIMER_ID_AUTO_READY,NiuniuGameOnView.TIMER_TIME_AUTO);
//         }
//     }

//     public setBanker(chairid : number,isAni:boolean = true) : void {
//         var user:NiuniuUser;
//         for (var key in this.table.users) {
//             user = this.table.users[key];
//             user.setBanker(chairid,isAni);
//         }
//         this._banker = chairid;
//     }

//     // 强制离开游戏
//     public forceLeaveGame() : void {
//         this._forceLeave = true;
//         if (UserData.roomMoneyNotEnough || !UserData.changeTable) {
//             this.quiteGameTable();
//         }
//     }

//     public getIdxByChairID(chairid : number) : number {
//         var offset = UserData.chairID - chairid;
//         var idx = 0;
//         if (offset > 0) {
//             idx += offset;
//         } else if (offset < 0) {
//             if (offset == -1) {
//                 idx = 4;
//             } else if (offset == -2) {
//                 idx = 3;
//             } else if (offset == -3) {
//                 idx = 2;
//             } else if (offset == -4) {
//                 idx = 1;
//             }
//         }

//         return idx % 5;
//     }
//     public mainUser:NiuniuUser;
//     /**更新 桌子信息 创建NiuNiuUser*/
//      public updateTable(table : GameTable) : void {
//         if (table) {

//             if ([null, undefined].indexOf(this.table) != -1) {
//                 this.table = new GameTable(table.tableID);
//             }
//             if(this.table.tableID != table.tableID)
//             {
//                 this.table.tableID = table.tableID;
//             }

//             for (var key in table.users) {
//                 var g_user:GameUser = table.users[key];
//                 var nn_user:NiuniuUser = this.table.users[key];
//                 if (nn_user && nn_user.chairID == g_user.chairID) {
//                     nn_user.status = g_user.status;
//                     nn_user.tableID = g_user.tableID;
//                     nn_user.chairID = g_user.chairID;                    
//                     nn_user.nickname = g_user.nickname;
//                     nn_user.role = g_user.role;
//                 } else {
//                     if(nn_user)
//                     {
//                         nn_user.dispose();
//                         delete this.table.users[key];
//                     }
//                     nn_user = new NiuniuUser(g_user.userID, g_user.tableID, g_user.chairID,g_user.role);
//                     nn_user.gold = g_user.gold;
//                     nn_user.nickname = g_user.nickname;
//                     nn_user.status = g_user.status;
//                     nn_user.updateGold(g_user.gold);
//                     this.table.addUser(nn_user);

//                     if(g_user.userID == UserData.userID) this.mainUser = nn_user;
//                     if (this._gameStart) {
//                         nn_user.setEnabled(false);
//                     }
//                 }
//             }

//             var user:NiuniuUser;
//             for (var key in this.table.users) {
//                 user = this.table.users[key];
//                 if (!table.users[key]) {
//                     //说明某个用户不存在了，删除
//                     if(user.userID == UserData.userID)
//                     {
//                         // // Utils.showLog("删除主玩家");
//                         continue;
//                     }
//                     user.dispose();
//                     this.table.users[key] = null;
//                     delete this.table.users[key];
//                 }
//             }
//             this.startReady();
//         }
//     }

//     private startReady():void
//     {
//         if(this.gameState != NiuNiuGameState.GAME_STATE_END && this.gameState != NiuNiuGameState.GAME_STATE_NoStart) return;
//         var count:number = this.table.getUserCount();
//         if(count < 2)
//         {
//             // this.showCenterMessageTips("正在等待其他玩家");
//             this.showCenterMessageTips("wait_others_player");
            
//             this.hideCenterTime();
//             if(this.gameState == NiuNiuGameState.GAME_STATE_NoStart)
//             {
//                 this.gameState = NiuNiuGameState.GAME_STATE_END;
//                 this._gameStart = false;
//                 this.stopGameTimer();
//                 if(this.mainUser) this.mainUser.removeOperateBtns();
//             }
//             return;
//         }
//         if(!this._gameStart && this.gameState == NiuNiuGameState.GAME_STATE_END)
//         {
//             // // Utils.showLog("开始准备  " + this.table.tableID);
//             this.gameState = NiuNiuGameState.GAME_STATE_NoStart;
//             this.setGameTimer(0,NiuniuGameOnView.GAME_TIME_OUT_TYPE_READY,NiuniuGameOnView.TIMER_TIME_OUT_TYPE_READY);
//             this.showReadyBtns();
//         }
//     }
//     /**
// 	 * 计时器处理
// 	 * @param timerID
// 	 */
// 	protected onTimer(timerID: number,remainTime:number): void {
// 		switch(timerID)
//         {
//             case NiuniuGameOnView.TIMER_ID_START_ANI:
//                 if(remainTime == 0)
//                 {
//                     this.startAniShowComplete = true;
//                     this.startQiangZhuang();
//                 }
//             break;
//             case NiuniuGameOnView.TIMER_ID_AUTO_READY:
//                 if(remainTime == 0)
//                 {
//                    AppFacade.getInstance().sendNotification(PublicNotification.FRAME_READY);
//                 }
//             break;
//             case NiuniuGameOnView.TIMER_ID_AUTO_MAX_BET:
//                 if(remainTime == 0)
//                 {
//                      AppFacade.getInstance().sendNotification(NiuniuGameOnMediator.CS_StopChip, {dwChipInMoney: this._maxChip});
//                 }
//             break;
//             case  NiuniuGameOnView.TIMER_ID_SEND_CARD:
//                 if(remainTime == 0)
//                 {
//                     this.sendCards();
//                 }
//             break;
//             case NiuniuGameOnView.TIMER_ID_SHOW_CARD:
//                 if(remainTime == 0)
//                 {
//                     this.showCards();
//                 }
//             break;
//         }
// 	}
//     private _isSendOpenCard:boolean;
//     private _isSendReady:boolean;
//     /**
// 	 * 游戏计时器处理
// 	 * @param timerID
// 	 */
// 	protected onGameTimer(chairID:number,timerID: number,remainTime:number):void
// 	{
//         var isShowTime:boolean = true;
// 		switch(timerID)
//         {
//             case NiuniuGameOnView.GAME_TIME_OUT_TYPE_READY:
//                 if(remainTime < 3 && !this._isSendReady)
//                 {
//                     this._isSendReady = true;
//                     if(this.mainUser.used) AppFacade.getInstance().sendNotification(PublicNotification.FRAME_READY);
//                 }
//             break;
//             case NiuniuGameOnView.GAME_TYPE_OUT_TYPE_CHIP:
//                 if(remainTime == 0 && this.mainUser.used) 
//                 {
//                     AppFacade.getInstance().sendNotification(NiuniuGameOnMediator.CS_StopChip, {dwChipInMoney: this._minChip});
//                 }
//             break;
//             case NiuniuGameOnView.GAME_TYPE_OUT_TYPE_OPEN:
//                 if(remainTime < 6 && this.mainUser.used && !this._isSendOpenCard) 
//                 {
//                     if(this._isAutoMaxBet || remainTime == 0)
//                     {
//                         this._isSendOpenCard = true;
//                         if(!this.mainUser.isOpenCard) this.openCards(true);
//                     }
//                 }
//             break;
//             case NiuniuGameOnView.GAME_TYPE_ROB_ZJ_TIME:
//               isShowTime = this.startAniShowComplete;
//               if(remainTime == 0 && this.curBySign == this.mainUser.chairID) 
//               {
//                   AppFacade.getInstance().sendNotification(NiuniuGameOnMediator.CS_RobZJ, {iRobZJGold: 0});
//               }
//             break;
//         }
//         if(isShowTime)
//         {
//             remainTime = Math.floor(remainTime);
//             this.showCenterTime(remainTime);
//         }else
//         {
//             this.hideCenterTime();
//         }
// 	}
//     private group_center:eui.Group;
//     private label_time:eui.Label;
//     private showCenterTime(time:number):void
//     {
//         this.group_center.visible = true;
       
//         if(parseInt(this.label_time.text) != time){

//             // // // Utils.showLog("倒计时Timer:" + time);
//             if(time == 2 ){ 
//                // SoundManager.instance.playSound(NiuNiuSoundType.getSoundPath(NiuNiuSoundType.TIME_TO_ONE));
//             }
//             else{
//                // SoundManager.instance.playSound(NiuNiuSoundType.getSoundPath(NiuNiuSoundType.TIME_TO_OTHER));
//             }

//             if(time <= 3 && time > 0){
//                 this.showWxlEffect();
//                // this['clockImg'].visible = false;
//             }
//             else{
//                 this.hideWxlEffect();
//                 this['clockImg'].visible = true;
//             }
//         }

//          this.label_time.text = time + "";
//     }

//     private _wxlEffect:SMovieclip;
//     private showWxlEffect():void
// 	{
// 		if(this._wxlEffect == null)
// 		{
            
// 			this._wxlEffect = new SMovieclip("niuniu_clock_effect_json","clock_");
// 			this._wxlEffect.frameRate = 33;
// 			//this._wxlEffect.addEventListener(egret.Event.COMPLETE,this.onWxlEffectComplete,this);
//             this['group_clock_eff'].addChild(this._wxlEffect);
//             this._wxlEffect.isLoop = true;
//             this._wxlEffect.x = 0;
//             this._wxlEffect.y = 0;
// 		}
//          this._wxlEffect.play(1);
//          this['clockImg'].visible = false;
        
// 	}
// 	private onWxlEffectComplete():void{
//       //  this['clockImg'].visible = true;
// 	}
// 	private hideWxlEffect():void
// 	{
// 		if(this._wxlEffect)
// 		{
// 			this._wxlEffect.stop();
// 			this._wxlEffect.visible = false;
// 		}
// 	}

//     private hideCenterTime():void
//     {
//         this.group_center.visible = false;
//     }
//     //-----------------------------用户消息----------------------------
//     public updateUserGold(userid : number, gold : number) : void {
//         var user:NiuniuUser = this.table.users['' + userid];
//         if ([null, undefined].indexOf(user) == -1) {
//             user.updateGold(gold);
//         }
//     }
//     /**
//      * 更新桌子信息
//     */
//     public updateChairInfo(gametable : GameTable) : void {
//         var count = 0;
//         this.updateTable(gametable);
//         if ([null, undefined].indexOf(this.table) == -1) {

//             var count = 0;
//             var notreadyMan = [];

//             this._users_id_chair_map = {};
//             for (var key in this.table.users) {

//                 this._users_id_chair_map['' + this.table.users[key]['chairID']] = this.table.users[key]['userID'];

//                 // var old_user = this._in_game_users['' + table.users[key]['chairID']];
//                 if (this.inited) {
//                     var idx = this.getIdxByChairID(this.table.users[key]['chairID']);
//                     var user:NiuniuUser = this.table.users[key];

//                     user.direction = idx;
//                     // // // Utils.showLog('--chariid---', idx, user.chairID, user.userID);
//                     // user.initHead(this['user' + idx]);
//                     if(idx >= 0 && idx <= 4)
//                     {
//                         user.initGroups(this['group_' + idx], this['user' + idx],this);
//                     }

//                     if (user.status < 3 && !this._gameStart) {
//                         notreadyMan.push(user);
//                         user.showUserState(2);
//                     } else if (user.status == 3 && !this._gameStart) {
//                         user.showUserState(3);
//                     }

//                 }
//             }

//             if (this.inited) {
//                 for (var i = 0; i < 5; ++i) {
//                     if ([null, undefined].indexOf(this._users_id_chair_map['' + i]) != -1 && i != UserData.chairID) {
//                         // // Utils.showLog('---the reset-chair--info----');

//                         var idx = this.getIdxByChairID(i);
//                         this.chairs[idx].resetChair();
//                         var chipComponent = this.getChildByName("chip_" + idx);
//                         if (chipComponent != null) {
//                             this.removeChild(chipComponent);
//                         }
//                     }
//                 }

//                 // if (notreadyMan.length == 1 && count == 4 && !this._gameStart) {
//                 //     // this.timeOutType = MJGameData.TIME_OUT_TYPE_READY;
//                 //     // this.startTimer();
//                 //     this.resetTimer(NiuniuGameOnView.GAME_TIME_OUT_TYPE_READY);
//                 // } else if (notreadyMan.length == 0 && count == 4) {
//                 //     // this.resetAllTurn();
//                 // }
//             }
            
//         }

//         // var user = this.table.users['' + UserData.userID];
//         // if ([null, undefined].indexOf(user) == -1) {
//         //     // // Utils.showLog('---user---myself', user);
//         //     this._userGold = user.gold;
//         // }
//     }

//     //--------------------------游戏消息--------------------------
//     /**
//      * 游戏开始 暂时未使用
//      */
//     public SC_Game_Start(data : any) : void {
//          // // Utils.showLog("游戏开始");
//     }

//     private clearStates():void
//     {
//         var user:NiuniuUser;
//         for(var k in this.table.users)
//         {
//             user = this.table.users[k];
//             user.clearState();
//         }
//     }
//     private startAniShowComplete:boolean = false;
//     /**
//      * 开始抢庄
//     */
//     public SC_RobZJ(data : any) : void {
//         // // // Utils.showLog("开始抢庄 " + this.table.tableID);
//         this.clearStates();
//         this.mainUser.removeOperateBtns();
//         if(this.mainUser.used) this.hideCenterMessageTips();
//         this.stopTimer(NiuniuGameOnView.TIMER_ID_AUTO_READY);

//         this.curBySign = data.bySign;

//         this.setGameTimer(0,NiuniuGameOnView.GAME_TYPE_ROB_ZJ_TIME,this.iRobZJTime);
//         this.gameState = NiuNiuGameState.GAME_STATE_RobZJ;

//         if(!this._gameStart)
//         {
//             this.startAniShowComplete = false;
//             this.setTimer(NiuniuGameOnView.TIMER_ID_START_ANI,NiuniuGameOnView.TIMER_TIME_START_ANI);
//             this.showStartGameView();
            
//             this._gameStart = true;
//         }else
//         {
//             // // // Utils.showLog("开始抢庄 SC_RobZJ");
//             this.startQiangZhuang();
//         }
//     }
//     private curBySign:number = 0;
//     private startQiangZhuang():void
//     {
//         // 通知用户开始抢庄
//         var user:NiuniuUser = this.table.users['' + this._users_id_chair_map['' + this.curBySign]];
//         if(!user) return;
//         if(this.mainUser.used)
//         {
//             if (this.curBySign == UserData.chairID) {
//                 // this.showCenterMessageTips("请选择是否叫庄");
//                 this.showCenterMessageTips("shifou_jiaozhuang");
                
//                 user.setOperateBtns(2);
//             }else
//             {
//                 // this.showCenterMessageTips("请等待其他玩家抢庄");
//                 this.showCenterMessageTips("wait_others_qiangzhuang");
                
//             }
//         }
//         // 显示抢庄中
//         user.showUserState(4);
//     }

//     /**
//      * 用户抢庄结果
//     */
//     public SC_UserRobZJ(data : any) : void {
//         //  // // Utils.showLog("用户抢庄结果");
//         var user:NiuniuUser = this.table.users['' + this._users_id_chair_map['' + data.byChairID]];
//         if(user) user.setUserRobZJ(data.m_iRobZJGold == 1||data.m_iRobZJGold == 2||data.m_iRobZJGold == 4);
//         if(user.userID==15753){
//             // Utils.showLog("----user.userID:"+user.userID+"--抢庄--data.m_iRobZJGold--"+data.m_iRobZJGold);
//         } 
//         Utils.showLog("----user.nickname:"+user.nickname+"-----服务器回复用户抢庄----data.m_iRobZJGold:"+data.m_iRobZJGold);

//         if(data.m_iRobZJGold == 1||data.m_iRobZJGold == 2||data.m_iRobZJGold == 4){
//             this['label_cheng'].visible=true;
//             this['label_jiaozhuang_beishu'].text=data.m_iRobZJGold+'';
//             this['label_jiaozhuang_beishu'].visible=true;            
//         }else{
//             this['label_cheng'].visible=true;
//             this['label_jiaozhuang_beishu'].text=user.jiaoZhuang_beishu+'';
//             this['label_jiaozhuang_beishu'].visible=true;
//         }

               
//     }

//     public banker_jiaozhuang_beishu:number = 1;  //最终庄家的叫庄倍数
    
//     /**
//      * 游戏的抢庄结果
//     */
//     public SC_NewZJ(data : any) : void {
//          // // Utils.showLog("游戏抢庄结果");
//         this.gameState = NiuNiuGameState.GAME_STATE_ChipIn;
//         this.stopTimer(NiuniuGameOnView.TIMER_ID_START_ANI);
//         this.setGameTimer(0,NiuniuGameOnView.GAME_TYPE_OUT_TYPE_CHIP,this.iChipTime);
//         this.setBanker(data.dwNewBanker);
//         this.banker_jiaozhuang_beishu = data.iRobZJGold;

//         this.mainUser.removeOperateBtns();
//         if(this.mainUser.used) 
//          {
//             this.hideCenterMessageTips();
//          }
//     }

//     /**
//      * 提醒用户下注
//     */
//     public SC_ChipIn(data : any) : void {
//          // // Utils.showLog("提醒用户下注");
//         //@author 刘念 2018/5/9 由分——>元		Utils.numberFormat3(XXX/100.00,2)
//         // this._maxChip = Utils.numberFormat3(data.dwChipMax/100.00,2);
//         // this._minChip = Utils.numberFormat3(data.dwChipMin/100.00,2);
//         this._maxChip = data.dwChipMax;
//         this._minChip = data.dwChipMin;

//         this.showBetBts();
//     }
//     private icellgold:number = 1;  //单位为元
//     private showBetBts():void
//     {
//         if(this.gameState == NiuNiuGameState.GAME_STATE_ChipIn && this.mainUser.used)
//         {
//             var user:NiuniuUser = this.table.users['' + UserData.userID];
//             var self = this;
//             // 得到可以下注的倍率
//             var gold=[5,10,15,20];
//             for(var i=0;i<4;i++){
//                 if(gold[i]>this._maxChip){
//                     gold[i]=0;
//                 }
//             }
//             // //得到此房间的底分
//             // for(var i=0;i<GlobalPara.roomsData.mRoomList.length;i++){
//             //     if(user.roomID == GlobalPara.roomsData.mRoomList[i]['iRoomID']){
//             //         this.icellgold = Utils.numberFormat3(GlobalPara.roomsData.mRoomList[i]['iCellGold']/100.00,2);    //转换为元单位
//             //         return;
//             //     }
//             // }
//             user.showChipBtns(['5', '10', '15','20'], gold, (idx) => {

//                 if(idx == 3){
//                     SoundManager.instance.playSound(NiuNiuSoundType.getSoundPath(NiuNiuSoundType.MAX_BET));
//                 }
//                 else{
//                     SoundManager.instance.playSound(NiuNiuSoundType.getSoundPath(NiuNiuSoundType.OTEHR_BET));
//                 }
//                 //点击下注操作，发送协议CS_StopChip; 发送金额,转换为分------此处不用转换
//                 AppFacade.getInstance().sendNotification(NiuniuGameOnMediator.CS_StopChip, {dwChipInMoney: self.icellgold*this.banker_jiaozhuang_beishu*gold[idx]});

//                 // // // Utils.showLog("-------用户下注----底分----",self._cellGold[0]);
//                 // // // Utils.showLog("-------用户下注----抢庄倍数----",user.jiaoZhuang_beishu[0]);
//                 // // // Utils.showLog("-------用户下注----下注倍数----",gold[idx][0]);
//                 // // // Utils.showLog("-------用户下注----下注金额----",self._cellGold*user.jiaoZhuang_beishu*gold[idx][0]);
//                 // // // Utils.showLog("-------用户下注----底分--抢庄倍数--下注倍数----下注金额--",self._cellGold,user.jiaoZhuang_beishu,gold[idx],self._cellGold*user.jiaoZhuang_beishu*gold[idx]);
//                 Utils.showLog("----user.nickname:" + user.nickname + "---用户下注：--底分--"+self.icellgold +"--庄家抢庄倍数--" + this.banker_jiaozhuang_beishu + "--下注倍数--" + gold[idx] + "--下注金额--" + self.icellgold*this.banker_jiaozhuang_beishu*gold[idx]);


//             });

//             SoundManager.instance.playSound(NiuNiuSoundType.getSoundPath(NiuNiuSoundType.START_BET));
//             // this.showCenterMessageTips("请选择下注倍数");
//             this.showCenterMessageTips("select_xiazhu_beishu");
            
            
//             if(this._isAutoMaxBet)
//             {
//                 this.setTimer(NiuniuGameOnView.TIMER_ID_AUTO_MAX_BET,NiuniuGameOnView.TIMER_TIME_AUTO);
//             }
//         }
//     }

//     /** 
//      * 玩家下注结果
//     */
//     public SC_PlayerChipIn(data : any) : void {
//         // // Utils.showLog("玩家下注结果");
//         var user:NiuniuUser = this.table.users['' + this._users_id_chair_map['' + data.dwChairPlayer]];
//         if ([null, undefined].indexOf(user) == -1) {
//             //@author 刘念 2018/5/9 由分——>元		Utils.numberFormat3(XXX/100.00,2)
//             user.userChip(Utils.numberFormat3(data.dwChipInValue/100.00,2));
//             Utils.showLog("-----user.nickname:" + user.nickname + "-------服务器回复下注金额:"+Utils.numberFormat3(data.dwChipInValue/100.00,2));
            
//             if(user.userID == UserData.userID)
//             {
//                 this.stopTimer(NiuniuGameOnView.TIMER_ID_AUTO_MAX_BET);
//             }
//         }
//     }

//     private _sendPosArr:Array<number> = [];
//     private _sendMyCard:Array<number>;
//     /**
//      * 分发牌
//     */
//     public SC_DispatchCard(data : any) : void {
//         this.gameState = NiuNiuGameState.GAME_STATE_OutCard;
//         // // Utils.showLog("开始发牌" + data.toString());
//         this.mainUser.removeOperateBtns();
//         if(this.mainUser.used) this.hideCenterMessageTips();
//         this.stopTimer(NiuniuGameOnView.TIMER_ID_AUTO_MAX_BET);
//         this._isSendOpenCard = false;

//         this._sendMyCard = data.byUserCard;
        
//         // 从庄家开始发牌
//         var n = this._banker;
//         this._sendPosArr.length = 0;
//         //发牌位置
//         this._sendPosArr.push(n);
//         do {
//             n --;
//             if (n < 0) {
//                 n = 4;
//             }
//             this._sendPosArr.push(n);
//         } while (this._sendPosArr.length < 5);
//         this.sendCards();
//         this.setGameTimer(0,NiuniuGameOnView.GAME_TYPE_OUT_TYPE_OPEN,this.iOutCardTime);
//     }
//     private sendCards():void
//     {
//         if(this._sendPosArr.length == 0)
//         {
//             if(this.mainUser) 
//             {
//                 this.mainUser.displayUserPai();
//             }
//             return;
//         }
//         var pos:number = this._sendPosArr.shift();
//         var user:NiuniuUser = this.table.users['' + this._users_id_chair_map['' + pos]];
//         if (user) {
//             if (user.userID == UserData.userID) {
//                 user.addFivePai(this._sendMyCard);
//             } else {
//                 var pais = [0, 0, 0, 0, 0];
//                 user.addFivePai(pais);
//             }
//             SoundManager.instance.playSound(NiuNiuSoundType.getSoundPath(NiuNiuSoundType.SEND_CARD));
//         } else {
//             if(this._sendPosArr.length > 0){
//                 this.sendCards();
//                 return;
//             }
//         }
//         var time:number = NiuniuGameOnView.TIMER_TIME_SEND_CARD;
//         if(this._sendPosArr.length == 0)
//         {
//             time -= 0.1;
//         }
//         this.setTimer(NiuniuGameOnView.TIMER_ID_SEND_CARD,time);
//     }

//     /**
//      * 开牌 准备
//     */
//     public SC_OutCard(data : any) : void {
//         //  // // Utils.showLog("开牌");
//         var user:NiuniuUser = this.table.users['' + this._users_id_chair_map['' + data.wUserChair]];
//         if (user) {
//             user.openPai(data.byThreeCard, data.byTwoCard, data.byOutCode, data.byPoint);
//         }
//     }
//     private completeOpenCards():void
//     {
//         var nnUser:NiuniuUser;
//         for(var k in this.table.users)
//         {
//             nnUser = this.table.users[k];
//             nnUser.completeSendCard();
//         }
//         this.stopTimer(NiuniuGameOnView.TIMER_ID_SEND_CARD);
//     }
//     private _showCardUserIDArr:Array<number> = [];
//     private _startTime:number = 0;
//     /**亮牌*/
//     public SC_OUTCARD_SHOW(data:any):void
//     {
//         // // Utils.showLog("亮牌" + this.iOutCardShowTime + "  亮牌时间 ");
//         this.completeOpenCards();

//         this._startTime = egret.getTimer();
//         this.stopGameTimer();
//         this.hideCenterTime();
//         if(this.mainUser.used) this.hideCenterMessageTips();
//         this.gameState = NiuNiuGameState.GAME_STATE_OUTCARD_SHOW;

//         this._showCardUserIDArr.length = 0;
//         var showCardUserArr:Array<NiuniuUser> = [];
        
//         var user:NiuniuUser;
//         var bankerUser:NiuniuUser;
//         for(var k in this.table.users)
//         {
//             user = this.table.users[k];
//             if(user && user.used)
//             {
//                 user.openCardImmediatelyComplete(); 
//                 if(user.isBanker)
//                 {
//                     bankerUser = user;
//                 }else
//                 {
//                     showCardUserArr.push(user);
//                 }
//             }
//         }
//         showCardUserArr.sort(function (a:NiuniuUser,b:NiuniuUser):number{
//             if(a.outCode > b.outCode)
//             {
//                 return 1;
//             }else if(a.outCode < b.outCode)
//             {
//                 return -1;
//             }
//             if(a.point > b.point)
//             {
//                 return 1;
//             }else if(a.point < b.point)
//             {
//                 return -1;
//             }
//             return 0;
//         });

//         if(bankerUser) showCardUserArr.push(bankerUser);
//         var l:number = showCardUserArr.length;
//         var niuniuUser:NiuniuUser;
//         for(var i:number = 0;i<l;i++)
//         {
//             niuniuUser = showCardUserArr[i];
//             this._showCardUserIDArr.push(niuniuUser.userID);
//         }
//         this.showCards();
//     }
//     /**亮牌*/
//     private showCards():void
//     {
//         if(this._showCardUserIDArr.length == 0)
//         {
//             // // Utils.showLog((egret.getTimer() - this._startTime) + " 亮牌结束" );
//             return;
//         }
//         var userID:number = this._showCardUserIDArr.shift();
//         var user:NiuniuUser = this.table.users[userID];
//         if(user)
//         {
//             user.showPai(true);
//             this.setTimer(NiuniuGameOnView.TIMER_ID_SHOW_CARD,1.2);
//             SoundManager.instance.playSound(NiuNiuSoundType.getCardSound(user.outCode,user.point,user.role.iGender));
//         }else
//         {
//             this.showCards();
//         }
//     }

//     /**显示牛牛 牌型*/
//     private showNiuResult():void
//     {
//         var user:NiuniuUser;
//         for(var k in this.table.users)
//         {
//             user = this.table.users[k];
//             if(!user.isShowResult)
//             {
//                 user.showPai(false);
//             }
//         }
//     }


//     private _winView:NiuNiuWinView;
//     private showWinView():void
//     {
//         if(this._winView == null)
//         {
//             this._winView = new NiuNiuWinView();
//             this._winView.touchEnabled = this._winView.touchChildren = false;
//             this._winView.show(this);
//         }
//         SoundManager.instance.playSound(NiuNiuSoundType.getSoundPath(NiuNiuSoundType.WIN));
//         this._winView.play();
//         egret.Tween.get(this._winView).wait(2300).call(this.sendShowWinLostComplete,this);
//     }
//     private hideWinView():void
//     {
//           if(this._winView && this._winView.parent)
//         {
//             this.removeChild(this._winView);
//             this._winView.dispose();
//             this._winView = null;
//         }
//     }
//     private _lostView:NiuNiuLostView;
//     private showLostView():void
//     {
//         if(this._lostView == null)
//         {
//             this._lostView = new NiuNiuLostView();
//             this._lostView.touchEnabled = this._lostView.touchChildren = false;
//             this._lostView.show(this);
//         }
//          SoundManager.instance.playSound(NiuNiuSoundType.getSoundPath(NiuNiuSoundType.LOST));
//         this._lostView.play();
//          egret.Tween.get(this._lostView).wait(1500).call(this.sendShowWinLostComplete,this);
//     }
//     private hideLostView():void
//     {
//         if(this._lostView && this._lostView.parent)
//         {
//             this.removeChild(this._lostView);
//             this._lostView.dispose();
//             this._lostView = null;
//         }
//     }







//     // private _winView:eui.Component;
//     // private showWinView():void
//     // {
//     //     if(this._winView == null)
//     //     {
//     //         this._winView = new eui.Component();
//     //         this._winView.skinName = "NiuNiuResultWinSkin";
//     //         this._winView.touchEnabled = this._winView.touchChildren = false;
//     //         this._winView.horizontalCenter = 0;
//     //         this._winView.verticalCenter = 0;
//     //     }
//     //     this.addChild(this._winView);
//     //     this._winView.scaleX = this._winView.scaleY = 0;
//     //     SoundManager.instance.playSound(NiuNiuSoundType.getSoundPath(NiuNiuSoundType.WIN));
//     //     egret.Tween.get(this._winView).to({scaleX:1,scaleY:1},200,egret.Ease.backOut).wait(1500).call(this.sendShowWinLostComplete,this);
//     // }
//     // private hideWinView():void
//     // {
//     //     if(this._winView && this._winView.parent)
//     //     {
//     //         egret.Tween.removeTweens(this._winView);
//     //         egret.Tween.get(this._winView).to({scaleX:0,scaleY:0},200,egret.Ease.backIn).call(function ():void{
//     //             this.removeChild(this._winView);
//     //         },this);
//     //     }
//     // }
//     // private _lostView:eui.Component;
//     // private showLostView():void
//     // {
//     //     if(this._lostView == null)
//     //     {
//     //         this._lostView = new eui.Component();
//     //         this._lostView.skinName = "NiuNiuResultLostSkin";
//     //         this._lostView.touchEnabled = this._lostView.touchChildren = false;
//     //         this._lostView.horizontalCenter = 0;
//     //         this._lostView.verticalCenter = 0;
//     //     }
//     //     this.addChild(this._lostView);
//     //     this._lostView.scaleX = this._lostView.scaleY = 0;
//     //      SoundManager.instance.playSound(NiuNiuSoundType.getSoundPath(NiuNiuSoundType.LOST));
//     //     egret.Tween.get(this._lostView).to({scaleX:1,scaleY:1},200,egret.Ease.backOut).wait(1500).call(this.sendShowWinLostComplete,this);
//     // }
//     // private hideLostView():void
//     // {
//     //     if(this._lostView && this._lostView.parent)
//     //     {
//     //         egret.Tween.removeTweens(this._lostView);
//     //         egret.Tween.get(this._lostView).to({scaleX:0,scaleY:0},200,egret.Ease.backIn).call(function ():void{
//     //             this.removeChild(this._lostView);
//     //         },this);
//     //     }
//     // }



//     private _zjWinPlayerUserIDs:Array<number> = [];
//     private _zjLostPlayerUserIDs:Array<number> = [];
//     private _zjLost:number = 0;
//     private _zjWin:number = 0;
//     private _zjUser:NiuniuUser;
//     private showZJWin():void
//     {
//         if(this._zjWinPlayerUserIDs.length == 0 || !this._zjUser)
//         {
//             this.showZJLost();
//             return;
//         }
//         var l:number = this._zjWinPlayerUserIDs.length;
//         var user:NiuniuUser;
//         var moveTime:number = 0;
//         var t:number = 0;
//         var userID:number = 0;
//         for(var i:number = 0;i<l;i++)
//         {
//             userID = this._zjWinPlayerUserIDs[i];
//             user = this.table.users[userID];
//             if(user)
//             {
//                 t = user.moveGoldToUser(user.win,this._zjUser);
//                 user.showLostWinGold(user.win,null);
//                 if(moveTime < t)
//                 {
//                     moveTime = t;
//                 }
//             }
//         }
//         this._zjUser.showLostWinGold(this._zjWin,null,moveTime - 100);
//         egret.Tween.get(this).wait(moveTime).call(this.showZJLost,this);
//     }
//     private showZJLost():void
//     {
//         if(this._zjLostPlayerUserIDs.length == 0 || !this._zjUser)
//         {
//             this.showWinLostResultView();
//             return;
//         }
//         this._zjUser.showLostWinGold(this._zjLost);
//         var l:number = this._zjLostPlayerUserIDs.length;
//         var user:NiuniuUser;
//         var moveTime:number = 0;
//         var t:number = 0;
//         var userid:number;
//         for(var i:number = 0;i<l;i++)
//         {
//             userid = this._zjLostPlayerUserIDs[i];
//             user = this.table.users[userid];
//             if(user)
//             {
//                 t = this._zjUser.moveGoldToUser(-user.win,user);
//                 user.showLostWinGold(user.win,null,t);
//                 if(moveTime < t) moveTime = t;
//             }
//         }
//         egret.Tween.get(this).wait(moveTime).call(this.showWinLostResultView,this);
//     }
//     private showWinLostResultView():void
//     {
//         if(!this.mainUser.used)
//         {
//             // AppFacade.getInstance().sendNotification(NiuniuGameOnMediator.CS_Dispath_Gold);
//             return;
//         }
//         if(this.mainUser.win > 0)
//         {
//             this.showWinView();
//         }else
//         {
//             this.showLostView();
//         }
//     }
//     private sendShowWinLostComplete():void
//     {
//         // AppFacade.getInstance().sendNotification(NiuniuGameOnMediator.CS_Dispath_Gold);
//         this.hideWinView();
//         this.hideLostView();
//     }
//      /**
//      * 下发分数
//     */
//     public SC_USER_SCORE(data : any) : void {
//         // // Utils.showLog("下发金币");
//          // // Utils.showLog((egret.getTimer() - this._startTime) + " 亮牌总时间" );
//          this.gameState = NiuNiuGameState.GAME_STATE_DisPath;
//          this.stopTimer(NiuniuGameOnView.TIMER_ID_SHOW_CARD);
//          this.showNiuResult();

//         this._zjWinPlayerUserIDs.length = 0;
//         this._zjLostPlayerUserIDs.length = 0;

//         var user:NiuniuUser;
//         var l:number = data.byUserIsValid.length;
//         var gold:number;
//         this._zjUser = null;
//         this._zjWin = 0;
//         this._zjLost = 0;
//         this.mainUser.win = 0;
//         for(var i:number = 0;i<l;i++)
//         {
//             if(data.byUserIsValid[i] == 1)
//             {
//                 //@author 刘念 2018/5/9 由分——>元		Utils.numberFormat3(XXX/100.00,2)
//                 gold = Utils.numberFormat3(data.dwUserWinValue[i]/100.00,2);
                
//                 user = this.table.users['' + this._users_id_chair_map['' + i]];
//                 if(!user) continue;
//                 user.win = gold;
//                 if(user.isBanker) 
//                 {
//                     this._zjUser = user;
//                     continue;
//                 }
//                 if(gold > 0)
//                 {
//                     this._zjLostPlayerUserIDs.push(user.userID);
//                     this._zjLost -= gold;
//                 }else
//                 {
//                     this._zjWinPlayerUserIDs.push(user.userID);
//                     this._zjWin += Math.abs(gold);
//                 }
//             }
//         }
//         this.showZJWin();

//         // var step1 = [];
//         // var step2 = [];
//         // var step3 = [];
//         // var win = false;
//         // var self = this;
//         // var user:NiuniuUser;
//         // //data.byUserIsValid 用户是否有效  1 是 其他不是
//         // for (var i = 0; i < data.byUserIsValid.length; ++i) {
//         //     if (data.byUserIsValid[i] == 1) {
//         //         user = this.table.users['' + this._users_id_chair_map['' + i]];
//         //         user.win = data.dwUserWinValue[i];
//         //         if (data.dwUserWinValue[i] > 0) {
//         //             // 赢
//         //             if (!user.isBanker) {
//         //                 step2.push({chairid: i, gold: data.dwUserWinValue[i]});
//         //             }
//         //             if (i == UserData.chairID) {
//         //                 win = true;
//         //             }
//         //         } else {
//         //            // 输
//         //            if (!user.isBanker) {
//         //                step1.push({chairid: i,gold: data.dwUserWinValue[i]});
//         //            }
//         //         }

//         //         if (user.isBanker) {
//         //             step3.push({chairid: i, gold: data.dwUserWinValue[i]});
//         //         }
//         //     }
//         // }

//         // //显示 输赢界面
//         // var showLose = function(cb : Function) {
//         //     var effect = Utils.createMovieClipByName("niuniu_effect_1", "lose");
//         //     effect.anchorOffsetY = effect.height / 2;
//         //     effect.anchorOffsetX = effect.width / 2;
//         //     effect.x = self.width / 2;
//         //     effect.y = self.height / 2;
//         //     self.addChild(effect);
//         //     effect.play();
//         //     effect.addEventListener(egret.Event.COMPLETE, () => {
//         //         effect.parent.removeChild(effect);
//         //         cb();
//         //     }, self);

//         // }
//         // var showWin = function(cb : Function) {
//         //     var win = new eui.Image();
//         //     win.source = 'niuniu_win_png';
//         //     win.anchorOffsetX = 240;
//         //     win.anchorOffsetY = 170;
//         //     win.x = self.width / 2;
//         //     win.y = self.height / 2 - 100;
//         //     self.addChild(win);
//         //     egret.Tween.get(win).to({y: self.height / 2}, 500)
//         //                         .call(() => {
//         //                             self.removeChild(win);
//         //                             cb();
//         //                         }, self);
//         // }


//         // // 显示输赢
//         // var uu = this.table.users['' + UserData.userID];
//         // var showResult = function(cb : Function) {
//         //     if (win) {
//         //         showWin(cb);
//         //     } else if(!win && uu.used) {
//         //         showLose(cb);
//         //     } else {
//         //         cb();
//         //     }
//         // }

//         // // 显示庄家的输赢 仅仅飘字
//         // var step3func = function() {
//         //     var user = self.table.users['' + self._users_id_chair_map['' + self._banker]];
//         //     user.showGold(step3[0].gold);
//         // }

//         // var step2func = function() {
//         //     if (step2.length > 0) {
//         //         for (var i = 0; i < step2.length; ++i) {
//         //             var user = self.table.users['' + self._users_id_chair_map['' + step2[i].chairid]];
//         //             var from = self.table.users['' + self._users_id_chair_map['' + self._banker]];
//         //             user.winScore(step2[i].gold, from, (pos) => {
//         //                 if (pos == step2.length - 1) {
//         //                     step3func();
//         //                 }
//         //             }, i);
//         //         }
//         //     } else {
//         //         step3func();
//         //     }            
//         // }

//         // showResult(() => {

//         //     AppFacade.getInstance().sendNotification(NiuniuGameOnMediator.CS_Dispath_Gold);
//         //     // 飞金币
//         //     if (step1.length > 0) {
//         //         for (var i = 0; i < step1.length; ++i) {
//         //             var user = self.table.users['' + self._users_id_chair_map['' + step1[i].chairid]];
//         //             var to = self.table.users['' + self._users_id_chair_map['' + self._banker]];
//         //             user.loseScore(step1[i].gold, to, (pos) => {
//         //                 if (pos == step1.length - 1) {
//         //                     step2func();
//         //                 }
//         //             }, i);
//         //         }
//         //     } else {
//         //         step2func();
//         //     }
//         // });        
//     }

//     /**
//      * 游戏结算
//     */
//     public SC_GameResult(data : any) : void {

//     }

//     /**
//      * 游戏结束
//     */
//     public SC_GameEnd(data : any) : void {
//         this['label_cheng'].visible=false;
//         this['label_jiaozhuang_beishu'].text='';
//         this['label_jiaozhuang_beishu'].visible=false;    

//         // // Utils.showLog("游戏结束 " + this.table.tableID);
//         this._gameStart = false;
//         this._isSendReady = false;
//         // egret.Tween.removeTweens(this);

//          NiuniuUser.niuniuOKBtn.visible = false;
//          this.hideCenterTime();

//         this.gameState = NiuNiuGameState.GAME_STATE_END;

//         //显示准备按钮
//         // 设置所有用户为可用状态
//         var user:NiuniuUser;
//         for (var key in this.table.users) {
//             user = this.table.users[key];
//             user.setEnabled(true);
//             user.showNewGold();
//         }

//         for (var key in this.table.users) {
//             this.table.users[key].resetUserData();
//         }
//         if(this._cellGold == 1 && UserData.gold < 50){
//             this.quiteGameTable();
//             return;
//         }else if(this._cellGold == 5 && UserData.gold < 250){
//             this.quiteGameTable();
//             return;            
//         }else if(this._cellGold == 10 && UserData.gold < 500){
//             this.quiteGameTable();
//             return;            
//         }else if(this._cellGold == 20 && UserData.gold < 1000){
//             this.quiteGameTable();
//             return;            
//         }
//         //显示结束动画 动画完成后显示开始准备
//         this.startReady();
//    }

//     /**
//      * 客户端播放动画
//     */
//     public SC_START_CARDMOVE(data:any):void
//     {

//     }

//     /**
//      *  输赢信息
//     */
//     public SC_USER_DISPATCH_SCORE(data : any) : void {

//     }

//     /**
//      * 所有操作完成，暂时无用
//     */
//     public SC_ALLPALER_END(data:any):void
//     {

//     }

//     //------------------------场景消息----------------------------
//     /**空闲状态*/
//     public SC_StatusFree(data : any) : void {
//         // // Utils.showLog("游戏free状态");
//         this.clear();

//         // this.iReadyTime = 10;// data.iReadyTime;
//         this.iChipTime = data.iChipTime + 1;
//         this.iOutCardTime = data.iOutCardTime + 1;
//         this.iRobZJTime = data.iRobZJTime + 1;
//         //@author 刘念 2018/5/9 由分——>元		Utils.numberFormat3(XXX/100.00,2)
//         this._cellGold = Utils.numberFormat3(data.lCellScore/100.00,2);

//         this.iOutCardShowTime = data.iOutCardShowTime;
//         this.gameState = NiuNiuGameState.GAME_STATE_END;

//         this.showCellScore();

//         // var user = this.table.users['' + UserData.userID];
//         // if ([null, undefined].indexOf(user) == -1) {
//         //     user.setStatusFree();
//         // }
//         this.startReady();
//     }
//     /**亮牌时间*/
//     private iOutCardShowTime:number = 0;
//     /**
//      * 场景play状态
//     */
//     public SC_StatusPlay(data : any) : void {
//         this.clear();
        
//         this._gameStart = true;

//         this.iChipTime = data.iChipTime + 1;
//         this.iOutCardTime = data.iOutCardTime + 1;
//         this.iRobZJTime = data.iRobZJTime + 1;

//         //@author 刘念 2018/5/9 由分——>元		Utils.numberFormat3(XXX/100.00,2)
//         this._cellGold = Utils.numberFormat3(data.lCellScore/100.00,2);

//         this.iOutCardShowTime = data.iOutCardShowTime;

//         //状态剩余时间
//         var lLeftTime:number = data.lLeftTime;
//         var lMin:number = data.lMin;
//         var lMax:number = data.lMax;

//         this.gameState = data.byGameState;
//         var byGameState:number = data.byGameState;//游戏状态 （ GAME_STATE_NoStart-0 抢庄-1, 下注-2, 比牌-3 ）
        
//         this.showCellScore();

//         // // Utils.showLog("游戏play状态 " + data.byGameState + " lLeftTime" + lLeftTime);

//         var localIndex:number = 0;
//         // 是否参与当局游戏
//         var isEnabled:boolean;
//         var user:NiuniuUser;
//         for (var i = 0; i < data.bChairUsed.length; ++i) {
//             localIndex = this.getIdxByChairID(i);
//             if(localIndex == 0)
//             {
//                 isEnabled = data.bChairUsed[i] == 1;
//                 this.mainUser.setEnabled(isEnabled);
//                 if(!isEnabled)
//                 {
//                     // this.showCenterMessageTips("当前游戏未结束，请等待下一局");
//                     this.showCenterMessageTips("wait_next");
                    
//                 }
//             }else
//             {
//                  user = this.table.users['' + this._users_id_chair_map['' + i]];
//                  if (user) {
//                     user.setEnabled(data.bChairUsed[i] == 1);
//                  }
//             }
//         }

//         this.setBanker(data.wBankerUser,false);

//         var mainUserIsBet:boolean;
//         // 下注
//         for (var i = 0; i < data.dwChipInValue.length; ++i) {
//             user = this.table.users['' + this._users_id_chair_map['' + i]];
//             localIndex = this.getIdxByChairID(i);
//             if (user && data.dwChipInValue[i] > 0) {
//                 //玩家下注
//                 //@author 刘念 2018/5/9 由分——>元		Utils.numberFormat3(XXX/100.00,2)
//                 user.userChip(Utils.numberFormat3(data.dwChipInValue[i]/100.00,2));
//             }
//             if(localIndex == 0)
//             {
//                 mainUserIsBet = data.dwChipInValue[i] > 0;
//             }
//         }

//          // 添加5张牌
//         if (byGameState >= 0) {
//             for (var i = 0; i < 5; ++i) {
//                 user = this.table.users['' + this._users_id_chair_map['' + i]];
//                 if ([null, undefined].indexOf(user) == -1 && data['cbHandCardData' + i][0] != 0) {
//                     user.addFivePai(data['cbHandCardData' + i],null,null,false);
//                 }
//             }
//             for (var i = 0; i < data.bCardStatus.length; ++i) {
//                 if (data.bCardStatus[i] == 1) {
//                     user = this.table.users['' + this._users_id_chair_map['' + i]];
//                     if ([null, undefined].indexOf(user) == -1 && data['cbHandThreeCardData' + i][0] != 0) {
//                         user.openPai(data['cbHandThreeCardData' + i], 
//                                     data['cbHandTwoCardData' + i],
//                                     data.byOutCode[i],
//                                     data.byPoint[i]);
//                     }
//                 }
//             }
//         }

//         switch(byGameState)
//         {
//             case NiuNiuGameState.GAME_STATE_RobZJ:
//                 // 抢庄
//                 for (var i = 0; i < data.bIsRobZJ.length; ++i) {
//                     if (data.bIsRobZJ[i] == 1) {
//                         this.setBanker(i,false);
//                     }
//                 }
//                 if(data.CurRobZJUser >= 0 && data.CurRobZJUser != GlobalPara.INVALID_CHAIR)
//                 {
//                     this.curBySign = data.CurRobZJUser;
//                     this.startQiangZhuang();
//                 }
//                 this.setGameTimer(0,NiuniuGameOnView.GAME_TYPE_ROB_ZJ_TIME,lLeftTime);
//             break;
//             case NiuNiuGameState.GAME_STATE_ChipIn:
//                 if(!this.mainUser.isBanker && !mainUserIsBet)
//                 {
//                     this.showBetBts();
//                 }
//                 this.setGameTimer(0,NiuniuGameOnView.GAME_TYPE_OUT_TYPE_CHIP,lLeftTime);
//             break;
//             case NiuNiuGameState.GAME_STATE_OutCard:
//                 if(this.mainUser && this.mainUser.used && lLeftTime > 5 && this._isAutoMaxBet)
//                 {

//                 }
//             break;
//             case NiuNiuGameState.GAME_STATE_OUTCARD_SHOW:
//                 this.showNiuResult();
//             break;
//             case NiuNiuGameState.GAME_STATE_OutChip:
//             case NiuNiuGameState.GAME_STATE_DisPath:
//                 this.showNiuResult();
//             break;
//         }
//     }
// }
