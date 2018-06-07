var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//
// 游戏版本控制
// 包括大厅以及游戏的版本
// create at 2017-6-17 16:52:07
// 
var VersionManage = (function () {
    function VersionManage() {
    }
    VersionManage.convertToDot = function (v, len) {
        if (len === void 0) { len = 3; }
        //每个版本都用2位表示 比如010000=1.0.0
        var ret = [];
        for (var i = 0; i < 3; ++i) {
            ret.splice(0, 0, v % 100);
            v = Math.floor(v / 100);
        }
        for (var i = len; i < 3; ++i) {
            ret.pop();
        }
        return ret.join('.');
    };
    VersionManage.initVersions = function () {
        // 看本地是否有存储
        var versions = egret.localStorage.getItem("versions");
        if ([null, undefined].indexOf(versions) != -1) {
            if ([null, undefined].indexOf(GlobalPara.gamesconfig)) {
                for (var key in GlobalPara.gamesconfig['games']) {
                    var game = GlobalPara.gamesconfig['games'][key];
                    VersionManage.versions[key] = game['version'];
                }
            }
        }
        else {
            try {
                VersionManage.versions = JSON.parse(versions);
            }
            catch (err) {
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
    };
    VersionManage.getLocalLatestVersion = function (game, resname, cb) {
        // RES.getResByUrl(Utils.cryptPath("resource/" + resname + "/resource/version.json"), (result) => {
        //     if (result && result['version'] > VersionManage.versions[game]) {
        //         VersionManage.versions[game] = result['version'];
        //     }
        //     if (cb) {
        //         cb();
        //     }
        // }, this, RES.ResourceItem.TYPE_JSON);
    };
    VersionManage.saveVersions = function () {
        egret.localStorage.setItem("versions", JSON.stringify(VersionManage.versions));
    };
    VersionManage.getFullVersion = function (gamename, cb) {
        if (Utils.isNative()) {
            var request = new NetProxy();
            // Main.getInstance().display(new AlterView("url:--"+GlobalPara.updateURL + "/" + gamename + ".json?v=" + Utils.rand(0, 10000)));
            request.request(GlobalPara.updateURL + "/" + gamename + ".json?v=" + Utils.rand(0, 10000), "", function (d, e) {
                //  Main.getInstance().display(new AlterView("进入请求回调!"));                
                if (e) {
                    // Main.getInstance().display(new AlterView("请求回调----false!"));                    
                    cb(false);
                }
                else {
                    // Main.getInstance().display(new AlterView("请求回调----true!"));                    
                    var v = JSON.parse(d);
                    cb(true, v);
                }
            }, this);
        }
        else {
            cb(false);
        }
    };
    // 获取新版本
    VersionManage.checkNewVersion = function (gamename, cb) {
        // 热更新启用
        if (GlobalPara.hotUpdateSwitch && Utils.isNative()) {
            var request = new NetProxy();
            request.request(GlobalPara.updateURL + "/" + gamename + ".json?v=" + Utils.rand(0, 10000), "", function (d, e) {
                // Utils.showLog('---new version---data---' + d + 'eee---' + e);
                if (e) {
                    cb(false);
                }
                else {
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
                    }
                    else {
                        cb(false);
                    }
                }
            }, this);
        }
        else {
            cb(false);
        }
    };
    VersionManage.removeFromDownloadingGames = function (name) {
        var find = false;
        for (var i = 0; i < VersionManage.downloadingGames.length; ++i) {
            var g = VersionManage.downloadingGames[i];
            if (g.name == name) {
                VersionManage.downloadingGames.splice(i, 1);
                return;
            }
        }
    };
    // 下载新版本
    VersionManage.downloadNewVersion = function (data, name) {
        if (VersionManage.downloadingGames.length == 0) {
            NativeCall.downloadGame(data, name);
            GlobalPara.currentDownloadGame = name;
            // Main.getInstance().addTopUi(new TipView("游戏开始下载"));
            VersionManage.downloadingGames.push({ name: name, data: data });
        }
        else {
            var find = false;
            for (var i = 0; i < VersionManage.downloadingGames.length; ++i) {
                var g = VersionManage.downloadingGames[i];
                if (g.name == name) {
                    find = true;
                }
            }
            if (!find) {
                VersionManage.downloadingGames.push({ name: name, data: data });
            }
            else {
            }
        }
    };
    VersionManage.downloadComplete = function (success, version) {
        VersionManage.removeFromDownloadingGames(GlobalPara.currentDownloadGame);
        var gameinfo = GlobalPara.getGameInfoByName(GlobalPara.currentDownloadGame);
        if (success) {
            UserData.gameDownloaded[GlobalPara.currentDownloadGame] = 1;
            VersionManage.versions[GlobalPara.currentDownloadGame] = version;
            VersionManage.saveVersions();
        }
        else {
        }
        if (VersionManage.downloadingGames.length > 0) {
            var game = VersionManage.downloadingGames[0];
            NativeCall.downloadGame(game.data, game.name);
            GlobalPara.currentDownloadGame = game.name;
        }
        else {
            GlobalPara.currentDownloadGame = "";
        }
    };
    return VersionManage;
}());
VersionManage.versions = {};
VersionManage.downloadingGames = [];
__reflect(VersionManage.prototype, "VersionManage");
//# sourceMappingURL=VersionManage.js.map