//
// 游戏版本控制
// 包括大厅以及游戏的版本
// create at 2017-6-17 16:52:07
// 
class VersionManage {

    public static versions = {};

    public static downloadingGames : any = [];

    public static convertToDot(v : number, len : number = 3) : string {
        //每个版本都用2位表示 比如010000=1.0.0
        var ret = [];
        for (var i = 0; i < 3; ++i) {
            ret.splice(0, 0, v % 100);
            v = Math.floor(v / 100);
        }

        for (var i = len; i < 3; ++i) {
            ret.pop();
        }

        return  ret.join('.');
    }

    public static initVersions() : void {

        // 看本地是否有存储
        var versions = egret.localStorage.getItem("versions");
        if ([null, undefined].indexOf(versions) != -1) {
            if ([null, undefined].indexOf(GlobalPara.gamesconfig)) {
                for (var key in GlobalPara.gamesconfig['games']) {
                    var game = GlobalPara.gamesconfig['games'][key];
                    VersionManage.versions[key] = game['version'];
                }
            }
        } else {
            try {

                VersionManage.versions = JSON.parse(versions);

            } catch(err) {
                if ([null, undefined].indexOf(GlobalPara.gamesconfig)) {
                    for (var key in GlobalPara.gamesconfig['games']) {
                        var game = GlobalPara.gamesconfig['games'][key];
                        VersionManage.versions[key] = game['version'];
                    }
                }
            }
        }

        // egret.localStorage.setItem("versions", JSON.stringify(VersionManage.versions));
        VersionManage.saveVersions();
    }

    public static getLocalLatestVersion(game : string, resname, cb : Function) : void {

        // RES.getResByUrl(Utils.cryptPath("resource/" + resname + "/resource/version.json"), (result) => {
    
        //     if (result && result['version'] > VersionManage.versions[game]) {
        //         VersionManage.versions[game] = result['version'];
        //     }
        //     if (cb) {
        //         cb();
        //     }

        // }, this, RES.ResourceItem.TYPE_JSON);
    }

    public static saveVersions() : void {
         egret.localStorage.setItem("versions", JSON.stringify(VersionManage.versions));   
    }

    public static getFullVersion(gamename : string, cb : Function) : void {
        if (Utils.isNative()) {

            var request = new NetProxy();
            // Main.getInstance().display(new AlterView("url:--"+GlobalPara.updateURL + "/" + gamename + ".json?v=" + Utils.rand(0, 10000)));
            
            request.request(GlobalPara.updateURL + "/" + gamename + ".json?v=" + Utils.rand(0, 10000), "", (d, e) => {
                //  Main.getInstance().display(new AlterView("进入请求回调!"));                
                if (e) {
                    // Main.getInstance().display(new AlterView("请求回调----false!"));                    
                    cb(false);
                } else {
                    // Main.getInstance().display(new AlterView("请求回调----true!"));                    
                    var v = JSON.parse(d);
                    cb(true, v);
                }
            }, this);
        } else {
            cb(false);
        }
    }

    // 获取新版本
    public static checkNewVersion(gamename : string, cb : Function) : void {

        // 热更新启用
        if (GlobalPara.hotUpdateSwitch && Utils.isNative()) {

            var request = new NetProxy();
            request.request(GlobalPara.updateURL + "/" + gamename + ".json?v=" + Utils.rand(0, 10000), "", (d, e) => {

                // Utils.showLog('---new version---data---' + d + 'eee---' + e);
                if (e) {
                    cb(false);
                } else {
                    var v = JSON.parse(d);
                    var versions = v.versions;
                    var ret = [];
                    for (var i = 0; i < versions.length; ++i) {
                        if (versions[i].version > VersionManage.versions[gamename]) {
                            ret.push(versions[i]);
                        }
                    }
                    if (ret.length > 0) {
                        // Utils.showLog('-----new version---is comming----' + gamename);
                        cb(true, ret);
                    } else {
                        cb(false);
                    }
                }
            }, this);
        } else {
            cb(false);
        }
    }

    public static removeFromDownloadingGames(name : string) : void {
        var find = false;
        for (var i = 0; i < VersionManage.downloadingGames.length; ++i) {
            var g = VersionManage.downloadingGames[i];
            if (g.name == name) {
                VersionManage.downloadingGames.splice(i, 1);
                return;
            }
        }
    }

    // 下载新版本
    public static downloadNewVersion(data : string, name : string) : void {

        if (VersionManage.downloadingGames.length == 0) {

            NativeCall.downloadGame(data, name);
            GlobalPara.currentDownloadGame = name;
            // Main.getInstance().addTopUi(new TipView("游戏开始下载"));
            VersionManage.downloadingGames.push({name: name, data: data});

        } else {

            var find = false;
            for (var i = 0; i < VersionManage.downloadingGames.length; ++i) {
                var g = VersionManage.downloadingGames[i];
                if (g.name == name) {
                    find = true;
                }
            }

            if (!find) {
                VersionManage.downloadingGames.push({name: name, data: data});
                // Main.getInstance().addTopUi(new TipView("加入下载队列中"));
            } else {
                // Main.getInstance().addTopUi(new TipView("游戏已经在下载队列中"));
            }
        }
    }

    public static downloadComplete(success : boolean, version : number) : void {

        VersionManage.removeFromDownloadingGames(GlobalPara.currentDownloadGame);
        var gameinfo = GlobalPara.getGameInfoByName(GlobalPara.currentDownloadGame);
        if (success) {

            UserData.gameDownloaded[GlobalPara.currentDownloadGame] = 1;
            VersionManage.versions[GlobalPara.currentDownloadGame] = version;            
            VersionManage.saveVersions();
            // Main.getInstance().addTopUi(new TipView(gameinfo['szname'] + "下载成功"));
        } else {
            // Main.getInstance().addTopUi(new TipView(gameinfo['szname'] + "下载失败,请稍后重试"));
        }

        if (VersionManage.downloadingGames.length > 0) {
            var game = VersionManage.downloadingGames[0];
            NativeCall.downloadGame(game.data, game.name);
            GlobalPara.currentDownloadGame = game.name;
        } else {
            GlobalPara.currentDownloadGame = "";
        }
    }
    
}