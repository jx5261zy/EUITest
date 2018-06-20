
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/game/game.js",
	"polyfill/promise.js",
	"bin-debug/refScript/BaseComponent.js",
	"bin-debug/refScript/GameUser.js",
	"bin-debug/refScript/GameViewBase.js",
	"bin-debug/refScript/ModuleBase.js",
	"bin-debug/refScript/MoveObject.js",
	"bin-debug/refScript/WindowBase.js",
	"bin-debug/refScript/ButtonContainer.js",
	"bin-debug/dezhoupoker/src/control/DZGameModule.js",
	"bin-debug/dezhoupoker/src/control/DZPokerOnMediator.js",
	"bin-debug/dezhoupoker/src/control/DZViewController.js",
	"bin-debug/dezhoupoker/src/view/component/DZBetSlider.js",
	"bin-debug/dezhoupoker/src/view/component/DZCardView.js",
	"bin-debug/dezhoupoker/src/view/component/DZChipView.js",
	"bin-debug/dezhoupoker/src/view/DZAudioSetView.js",
	"bin-debug/dezhoupoker/src/view/DZDropDownView.js",
	"bin-debug/dezhoupoker/src/view/DZHelpView.js",
	"bin-debug/dezhoupoker/src/view/DZPlayerInfoView.js",
	"bin-debug/dezhoupoker/src/view/DZPokerOnGameView.js",
	"bin-debug/dezhoupoker/src/view/DZPopWindowView.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/reference/NiuniuGameOnView.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/refScript/BorderProgressBarDraw.js",
	"bin-debug/dezhoupoker/base/DZGameState.js",
	"bin-debug/refScript/data/Brige.js",
	"bin-debug/refScript/data/BuymentManage.js",
	"bin-debug/refScript/data/GameRoomRule.js",
	"bin-debug/refScript/data/GlobalPara.js",
	"bin-debug/refScript/data/LocalConfigInfo.js",
	"bin-debug/refScript/data/MJGameData.js",
	"bin-debug/refScript/data/PublicNotifications.js",
	"bin-debug/refScript/data/ResGroupManage.js",
	"bin-debug/refScript/data/UserData.js",
	"bin-debug/refScript/data/VersionManage.js",
	"bin-debug/refScript/GameTable.js",
	"bin-debug/refScript/GameTimer.js",
	"bin-debug/dezhoupoker/base/DZUserOperation.js",
	"bin-debug/dezhoupoker/shared/DZDefine.js",
	"bin-debug/dezhoupoker/shared/DZUser.js",
	"bin-debug/dezhoupoker/src/control/DZCardController.js",
	"bin-debug/refScript/ObjectPool.js",
	"bin-debug/refScript/utils/EffectUtils.js",
	"bin-debug/refScript/utils/NativeCall.js",
	"bin-debug/refScript/utils/NetProxy.js",
	"bin-debug/refScript/utils/Utils.js",
	"bin-debug/dezhoupoker/src/control/DZChipController.js",
	"bin-debug/ThemeAdapter.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 1334,
		contentHeight: 750,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};