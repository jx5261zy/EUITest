var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var Utils = (function () {
    function Utils() {
    }
    Utils.trim = function (value) {
        return value.replace(/(^\s*)|(\s*$)/g, '');
    };
    Utils.rand = function (a, b) {
        var diff = b - a - 1;
        var r = Math.random() * diff;
        return Math.round(r) + a;
    };
    Utils.removeComponentTween = function (parent) {
        if (parent) {
            var count = parent.numChildren || 0;
            for (var i = 0; i < count; ++i) {
                Utils.removeComponentTween(parent.$children[i]);
            }
            egret.Tween.removeTweens(parent);
        }
    };
    Utils.safeRemove = function (obj) {
        if (obj && obj.parent) {
            obj.parent.removeChild(obj);
        }
        Utils.removeComponentTween(obj);
        obj = null;
    };
    Utils.formatDate = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    Utils.playMusic = function (resname, looptime) {
        if (looptime === void 0) { looptime = -1; }
        if (!GlobalPara.localConfig.music) {
            return null;
        }
        if ([null, undefined].indexOf(GlobalPara.localConfig['music']) == -1 && GlobalPara.localConfig['music']) {
            var sound = RES.getRes(resname);
            if (sound) {
                sound.type = egret.Sound.MUSIC;
                return sound.play(0, looptime);
            }
            return null;
        }
        else {
            return null;
        }
    };
    /**
     * @param {label 显示label}
     * @param {currenteNumber 当前数字}
     * @param {addNumber 需要增加的数值}
     */
    Utils.numberRoation = function (label, currenteNumber, addNumber) {
        // if(Utils.objectAttriUpdate == null){
        //     Utils.objectAttriUpdate = new ObjectAttriUpdate(label,"text",1,Utils.numberFormat);
        //     Utils.objectAttriUpdate.time = 1.5;
        // }
        // Utils.objectAttriUpdate.totalVal = addNumber;
        // Utils.objectAttriUpdate.curVal = currenteNumber;
        // Utils.objectAttriUpdate.start();
    };
    /**
     * @param {obj 灰化对象}
     */
    Utils.ColorGrey = function (obj, isShow, isTouch) {
        if (isShow === void 0) { isShow = true; }
        if (isTouch === void 0) { isTouch = true; }
        var colorMatrix = [0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        if (isTouch)
            obj["enabled"] = !isShow;
        if (isShow) {
            obj.filters = [colorFlilter];
        }
        else {
            obj.filters = [];
        }
    };
    Utils.soundPlay = function (res, isBGM, loops, volume) {
        if (isBGM === void 0) { isBGM = false; }
        if (loops === void 0) { loops = 1; }
        if (volume === void 0) { volume = 1; }
        var sound = RES.getRes(res);
        if (!sound)
            return;
        sound.type = egret.Sound.EFFECT;
        var sChannel;
        if (isBGM && GlobalPara.localConfig.music) {
            sChannel = sound.play(0, loops);
            sChannel.volume = volume;
        }
        else if (!isBGM && GlobalPara.localConfig.effect) {
            sChannel = sound.play(0, loops);
            sChannel.volume = volume;
        }
        return sChannel;
    };
    Utils.getSoundObject = function () {
        return Utils.soundArray;
    };
    Utils.showLog = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (true) {
            egret.log(message, optionalParams);
        }
    };
    // 1代表麻将 2代表碰杠胡等 
    Utils.playMahjEffect = function (source, sex, name, type, value) {
        // var key = 'Mahj' + source + sex + name;
        // if (type + value > 0) {
        //     key += ('' + type + value);
        // }
        if (source === void 0) { source = 1; }
        if (sex === void 0) { sex = 1; }
        if (name === void 0) { name = ''; }
        if (type === void 0) { type = 0; }
        if (value === void 0) { value = 0; }
        // var files = GlobalPara.configs['musicconf'][key];
        // if (files.length == 1) {
        //     Utils.playEffect(files[0]);
        // } else {
        //     Utils.playEffect(files[Utils.rand(0, files.length)]);
        // }
    };
    /**1,000,000,000*/
    Utils.numberFormat2 = function (num, isUseLetter) {
        if (isUseLetter === void 0) { isUseLetter = false; }
        if (isNaN(num))
            return "";
        var str = num.toString();
        if (str.length < 4)
            return str;
        var l = str.length;
        var p = ",";
        if (isUseLetter)
            p = "p";
        var newStr = "";
        var j = 0;
        var countStr = "";
        for (var i = l - 1; i >= 0; i--) {
            countStr += str.charAt(i);
            newStr = str.charAt(i) + newStr;
            if ((countStr.length % 3 == 0) && i != 0) {
                newStr = p + newStr;
            }
        }
        return newStr;
    };
    /**
     * @param {data 数字}
     * @param {subIndex 小数位数,默认不保留小数位}
     * @param isQ 是否缩写千
     */
    Utils.numberFormat = function (data, subIndex, isUseLetter, isQ) {
        if (subIndex === void 0) { subIndex = 0; }
        if (isUseLetter === void 0) { isUseLetter = false; }
        if (isQ === void 0) { isQ = false; }
        var data_str = data + "";
        if (subIndex == 0) {
            var numberText = parseInt(data + "");
        }
        else if (subIndex > 0) {
            var dian_index = -1;
            for (var i = 0; i < data_str.length; i++) {
                if (data_str[i] == ".") {
                    dian_index = i;
                }
            }
            if (dian_index == -1) {
                var str = ".";
                for (var i = 0; i < subIndex; i++) {
                    str += "0";
                }
                // if(!isQ){
                //     return data_str+str;
                // }
                var numberText = parseFloat(data_str);
            }
            else if ((dian_index + subIndex) == data_str.length - 1) {
                var numberText = parseFloat(data_str.substring(0));
            }
            else {
                var numberText = parseFloat(data_str.substring(0, dian_index + subIndex + 1));
            }
        }
        var reString = "";
        var minNum;
        var qian = 1000;
        var wan = 10000;
        var thousand = 100000;
        var Must = 100000000;
        var q;
        var w;
        var y;
        var b;
        var p;
        if (isUseLetter) {
            q = "q";
            w = "w";
            y = "y";
            p = "p";
        }
        else {
            q = "千";
            w = "万";
            y = "亿";
            p = ".";
        }
        if (isQ) {
            if (numberText < qian) {
                reString = numberText + "";
            }
            else if (numberText < wan) {
                var num = parseInt(numberText / qian + "") + "";
                if (subIndex == 0 || numberText % qian == 0) {
                    reString = num + q;
                }
                else {
                    reString = numberText + "";
                }
            }
            else if (numberText < thousand) {
                var num = parseInt(numberText / wan + "") + "";
                if (subIndex == 0 || numberText % wan == 0) {
                    reString = num + w;
                }
                else {
                    reString = numberText + "";
                }
            }
        }
        else {
            if (numberText < thousand) {
                reString = numberText + "";
            }
        }
        if (numberText >= thousand && numberText < Must) {
            var num = parseInt(numberText / wan + "") + "";
            if (isQ) {
                if (num.length > 3 && numberText % 10000000 == 0) {
                    num = num.substring(0, num.length - 3) + q;
                    b = true;
                }
            }
            var num1 = (numberText + "").substring(num.length, num.length + subIndex);
            if (subIndex == 0 || b) {
                reString = num + w;
            }
            else {
                reString = num + p + num1 + w;
            }
        }
        if (numberText >= Must) {
            var num = parseInt(numberText / Must + "") + "";
            if (isQ) {
                if (num.length > 3 && numberText % 100000000000 == 0) {
                    num = num.substring(0, num.length - 3) + q;
                    b = true;
                }
            }
            var num1 = (numberText + "").substring(num.length, num.length + subIndex);
            if (subIndex == 0 || b) {
                reString = num + y;
            }
            else {
                reString = num + p + num1 + y;
            }
        }
        return reString;
    };
    /**
     * @param {data 数字}
     * @param {subIndex 小数位数,默认不保留小数位}
     */
    Utils.numberFormat3 = function (data, subIndex) {
        if (subIndex === void 0) { subIndex = 0; }
        var data_str = data + "";
        var numberData = 0.00;
        if (subIndex == 0) {
            numberData = parseInt(data + "");
        }
        else if (subIndex > 0) {
            var numberData = parseFloat(data);
            var dian_index = data_str.length;
            for (var i = 0; i < data_str.length; i++) {
                if (data_str[i] == ".") {
                    dian_index = i;
                }
            }
            //整数
            if ((dian_index + subIndex) >= data_str.length) {
                var point = 0;
                if (subIndex == 0) {
                }
                else if (subIndex == 1) {
                    point = 0.0;
                }
                else if (subIndex == 2) {
                    point = 0.00;
                }
                else if (subIndex == 3) {
                    point = 0.000;
                }
                else if (subIndex == 4) {
                    point = 0.0000;
                }
                else {
                    point = 0.00000;
                }
                numberData = numberData + point;
            }
            else if ((dian_index + subIndex) <= data_str.length - 1) {
                if (subIndex == 0) {
                    numberData = parseFloat(data_str.substring(0, dian_index));
                }
                else {
                    numberData = parseFloat(data_str.substring(0, dian_index + subIndex + 1));
                }
            }
        }
        return numberData;
    };
    Utils.numberFormat4 = function (data, subIndex) {
        if (subIndex === void 0) { subIndex = 0; }
        var string = parseFloat(data).toFixed(subIndex);
        return string;
    };
    Utils.loadSoundFile = function (resname, cb, thisobj) {
        if (RES.getRes(resname)) {
            cb.call(thisobj);
        }
        else {
            var complete = function (result) {
                cb.call(thisobj);
            };
            RES.getResAsync(resname, complete, null);
        }
    };
    // 删除default.res.json里面的所有资源
    Utils.removeDefaultResFile = function (resfile) {
        // RES.getResByUrl(resfile, function (json : any) {
        //     var resources = json['resources'];
        //     for (var i = 0; i < resources.length; ++i) {
        //         RES.destroyRes(resources[i].name, true);
        //     }
        //     RES.destroyRes(resfile);
        // }, this, RES.ResourceItem.TYPE_JSON);
    };
    Utils.playEffect = function (resname, looptime) {
        if (looptime === void 0) { looptime = 1; }
        if (!GlobalPara.localConfig.effect) {
            return null;
        }
        if ([null, undefined].indexOf(GlobalPara.localConfig['effect']) == -1 && GlobalPara.localConfig['effect']) {
            var sound = RES.getRes(resname);
            if (sound) {
                sound.type = egret.Sound.EFFECT;
                return sound.play(0, looptime);
            }
            else {
                var complete = function (result) {
                    result.type = egret.Sound.EFFECT;
                    result.play(0, looptime);
                };
                RES.getResAsync(resname, complete, null);
            }
            return null;
        }
        else {
            return null;
        }
    };
    Utils.imageProxyUrl = function (url) {
        return (egret.Capabilities.renderMode == "webgl") ?
            "http://" + location.host + "/api.php?cmd=image_proxy&url=" + encodeURIComponent(url) :
            url;
    };
    //重新设置按钮锚点
    Utils.resetAnchor = function (obj) {
        obj.anchorOffsetX = obj.width / 2;
        obj.anchorOffsetY = obj.height / 2;
        obj.x += obj.width / 2;
        obj.y += obj.height / 2;
    };
    //  放大缩小按钮
    Utils.scaleButton = function (obj) {
        var t = egret.Tween.get(obj);
        t.to({ scaleX: 1.05, scaleY: 1.05 }, 100).wait(0).to({ scaleX: 1., scaleY: 1. }, 100);
    };
    // public static checkPrevent() : boolean {
    //     return [null, undefined].indexOf(Main.getInstance().mainUi.getChildByName("prevent")) == -1;
    // }
    // 按钮事件的处理
    // btn 图片按钮或者按钮
    // cb 按钮的处理事件
    // that 传递this进来
    // obj 传递参数
    // type 按钮的动作类型
    // sound 是否播放音响，为空表示播放默认音效
    Utils.addBtnEvent = function (btn, cb, that, obj, type, sound, delay, preventall) {
        if (type === void 0) { type = 1; }
        if (sound === void 0) { sound = ''; }
        if (delay === void 0) { delay = 0; }
        if (preventall === void 0) { preventall = false; }
        if (delay == 0) {
            delay = 200;
        }
        if ([null, undefined].indexOf(btn) != -1 || btn.parent == null) {
            return;
        }
        if (btn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            return;
        }
        var original = btn.scaleX;
        var prevent = function (delay) {
            var group = new eui.Group();
            group.width = GlobalPara.screenWidth;
            group.height = GlobalPara.screenHeight;
            group.touchEnabled = true;
            group.touchThrough = false;
            group.name = "prevent";
            // Main.getInstance().display(group);
            egret.setTimeout(function () {
                Utils.safeRemove(group);
            }, this, delay);
        };
        var callcb = function (event) {
            egret.Tween.get(btn).to({ scaleX: original * 1.0, scaleY: original * 1.0 }, 100).call(function () {
                if (cb != null) {
                    cb.call(that, that, obj, event);
                }
                egret.setTimeout(function () {
                    btn.touchEnabled = true;
                }, this, 200);
            });
        };
        var taped = function (type, event) {
            // if (Utils.checkPrevent()) {
            //     btn.touchEnabled = true;
            //     return;
            // }
            if (preventall) {
                prevent(delay);
            }
            if (type == 1) {
                egret.Tween.get(btn).to({ scaleX: original * 0.95, scaleY: original * 0.95 }, 100).call(function () {
                    callcb(event);
                });
            }
            else {
                if (cb != null) {
                    cb.call(that, that, obj, event);
                }
                egret.setTimeout(function () {
                    btn.touchEnabled = true;
                }, this, 200);
            }
        };
        var listenerTap = function (event) {
            if (btn.touchEnabled) {
                btn.touchEnabled = false;
                taped(type, event);
            }
        };
        var lisenerRemoved = function () {
            btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, listenerTap, that);
        };
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, listenerTap, that);
    };
    // 判断是否是Native还是H5
    Utils.isNative = function () {
        var type = egret.Capabilities.runtimeType;
        if (type == egret.RuntimeType.WEB) {
            GlobalPara.isNative = false;
            return false;
        }
        else {
            GlobalPara.isNative = true;
            return true;
        }
    };
    // 根据设备类型是否释放大厅的游戏资源
    // pc native在iphone5s以上的设备都暂不释放 只是停止动画等 内存1g以上的都不释放
    // android 内存一G的都不释放
    // 移动浏览器都释放
    Utils.checkReleaseLobbyRes = function () {
        GlobalPara.bReleaseLobby = false;
        // if (GlobalPara.isNative) {
        // NativeCall.getDeviceInfo();
        // } else {
        //     if (egret.Capabilities.isMobile) {
        //         GlobalPara.bReleaseLobby = true;
        //     } else {
        //         GlobalPara.bReleaseLobby = true;
        //     }
        // }
    };
    // public static createArmature(resname:string):dragonBones.Armature {
    //     //获取动画数据
    //     var dragonbonesData = RES.getRes(resname + "_ske_json");
    //     //获取纹理集数据
    //     var textureData = RES.getRes(resname + "_tex_json");
    //     //获取纹理集图片
    //     var texture = RES.getRes(resname + "_tex_png");
    //     //创建一个工厂，用来创建Armature
    //     var factory:dragonBones.EgretFactory = new dragonBones.EgretFactory();
    //     //把动画数据添加到工厂里
    //     factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
    //     //把纹理集数据和图片添加到工厂里
    //     factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
    //     //获取Armature的名字，dragonBones4.0的数据可以包含多个骨架，这里取第一个Armature
    //     var armatureName:string = dragonbonesData.armature[0].name;
    //     //从工厂里创建出Armature
    //     var armature:dragonBones.Armature = factory.buildArmature(armatureName);
    //     dragonBones.WorldClock.clock.add(armature);
    //     return armature;
    // }
    Utils.loadMovieClipFile = function (resname, cb, thisobj) {
        if (RES.getRes(resname + "_json") && RES.getRes(resname + "_png")) {
            cb.call(thisobj);
        }
        else {
            var mc = null;
            var texture = null;
            var complete = function (result) {
                if (result['mc']) {
                    mc = result;
                }
                else {
                    texture = result;
                }
                if (mc && texture) {
                    cb.call(thisobj);
                }
            };
            RES.getResAsync(resname + "_json", complete, null);
            RES.getResAsync(resname + "_png", complete, null);
        }
    };
    Utils.destroyMovieClipFile = function (resname) {
        RES.destroyRes(resname + "_json");
        RES.destroyRes(resname + "_png");
    };
    Utils.createMovieClipByName = function (resname, clipname) {
        var data = RES.getRes(resname + "_json");
        var tex = RES.getRes(resname + "_png");
        var mcf = new egret.MovieClipDataFactory(data, tex);
        mcf.enableCache = true;
        var mcDataSet = mcf.mcDataSet;
        var clip = new egret.MovieClip(mcf.generateMovieClipData(clipname));
        return clip;
    };
    Utils.getScreenSize = function () {
        if (!Utils.isNative()) {
            var wid, hei; //宽,高,像素比  
            //获取窗口宽度 
            if (!egret.Capabilities.isMobile) {
                //不是mobile 就是pc
                if ((document.body) && (document.body.clientWidth)) {
                    wid = document.body.clientWidth;
                }
                else if (window && window.innerWidth) {
                    wid = window.innerWidth;
                }
                if ((document.body) && (document.body.clientHeight)) {
                    hei = document.body.clientHeight;
                }
                else if (window && window.innerHeight) {
                    hei = window.innerHeight;
                }
                var w, h;
                w = wid;
                h = hei;
                var rotate = false;
                if (w < h) {
                    wid = h;
                    hei = w;
                    rotate = true;
                }
                return { w: wid, h: hei, r: rotate };
            }
            if (window && window.innerWidth) {
                wid = window.innerWidth;
            }
            else if ((document.body) && (document.body.clientWidth)) {
                wid = document.body.clientWidth;
            }
            //获取窗口高度  
            if (window && window.innerHeight) {
                hei = window.innerHeight;
            }
            else if ((document.body) && (document.body.clientHeight)) {
                hei = document.body.clientHeight;
            }
            //通过深入Document内部对body进行检测，获取窗口大小  
            if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
                wid = document.documentElement.clientWidth;
                hei = document.documentElement.clientHeight;
            }
            var w, h;
            w = wid;
            h = hei;
            var rotate = false;
            if (w < h) {
                wid = h;
                hei = w;
                rotate = true;
            }
            return { w: wid, h: hei, r: rotate };
        }
        else {
            return { w: 0, h: 0 };
        }
    };
    // 计算番型
    // 平胡    1    1
    // 对对胡    2    2
    // 清一色    3    4
    // 带幺九    3    4
    // 暗七对    3    4
    // 清对    4    8
    // 将对    4    8
    // 龙七对    5    16
    // 清七对    5    16
    // 清幺九    5    16
    // 天胡    6    32
    // 地胡    6    32
    // 清龙七对    6    32
    // 杠上花    +1番
    // 杠上炮    +1番
    // 根    +1番
    // 杠    +1番
    // 从大的开始计算
    Utils.caculateFan = function (pais) {
        // 获取花色数量
        // 万 1-9 条 17-25 //筒 33-41
        var getHuase = function (pais) {
            var count = [0, 0, 0];
            for (var i = 0; i < pais.length; ++i) {
                if (pais[i] >= 1 && pais[i] <= 9) {
                    count[0] = 1;
                }
                else if (pais[i] >= 17 && pais[i] <= 25) {
                    count[1] = 1;
                }
                else if (pais[i] >= 33 && pais[i] <= 41) {
                    count[2] = 1;
                }
            }
            return count[0] + count[1] + count[2];
        };
        var huase = getHuase(pais);
        //1. 判断是否是清龙对
        //2. 判断清一色
        //3. 判断根
        //4. 判断七对
        var duizi = Utils.getDuizi(pais);
        // 计算三个一样的个数
        var count3 = 0;
        var count4 = 0;
        var count2 = 0;
        for (var i = 0; i < duizi.length; ++i) {
            if (duizi[i].count == 2) {
                count2++;
            }
            else if (duizi[i].count == 3) {
                count3++;
            }
            else if (duizi[i].count == 4) {
                count4++;
            }
        }
        var fan = 1; //默认一番 平胡
        var qidui = false;
        if (count2 + count4 * 2 == 7) {
            //七对无疑
            fan += 2;
            qidui = true;
        }
        if (huase == 1) {
            fan += 2;
        }
        //判断根
        if (count4 >= 1) {
            if (qidui) {
                fan += 2;
            }
            else {
                fan += count4;
            }
        }
        //大对子
        if (count3 == 4) {
            fan += 1;
        }
        // 判断带幺九
        // 先不处理
        //判断将对
        if (count3 == 4) {
            var keys = ['2', '5', '8'];
            var jiangdui = 2;
            for (var i = 0; i < duizi.length; ++i) {
                var idx = keys.indexOf(duizi[i].key);
                if (idx != -1) {
                    jiangdui = 0;
                    break;
                }
            }
            fan += 2;
        }
        return Math.min(6, fan);
    };
    // 获取牌里面有哪些对子
    Utils.getDuizi = function (pais) {
        var ret = [];
        var temp = {};
        for (var i = 0; i < pais.length; ++i) {
            if ([null, undefined].indexOf(temp['' + pais[i]]) != -1) {
                temp['' + pais[i]] = { count: 1, idx: [i] };
            }
            else {
                temp['' + pais[i]].count += 1;
                temp['' + pais[i]].idx.push(i);
            }
        }
        // return temp;
        for (var key in temp) {
            if (temp[key].count >= 2) {
                ret.push({ idx: temp[key].idx, count: temp[key].count, k: key });
            }
        }
        return ret;
    };
    Utils.checkHuPrompt = function (pais) {
        var card = [1, 2, 3, 4, 5, 6, 7, 8, 9, 17, 18, 19, 20, 21, 22, 23, 24, 25, 33, 34, 35, 36, 37, 38, 39, 40, 41];
        var hu = [];
        for (var i = 0; i < card.length; ++i) {
            var newpai = pais.concat();
            newpai.push(card[i]);
            newpai.sort(function (a, b) {
                return a - b;
            });
            if (Utils.CheckHuPai(newpai)) {
                hu.push(card[i]);
            }
        }
        //// Utils.showLog('hu----', hu);
        return hu;
    };
    // 查看是否副牌
    Utils.CheckHuPai = function (pais) {
        pais.sort(function (a, b) {
            return a - b;
        });
        // 默认情况是排序了的
        var checkPai = function (leftpai) {
            // 这时不用考虑碰牌等情况 因为碰、杠不在牌序列里面
            // 判断是否满足n（ABC）的规则()
            var getThree = function (pp, sp, start) {
                var ret = { same: [], delta: [] };
                for (var i = start; i < pp.length; ++i) {
                    if (pp[i] == sp) {
                        ret.same.push(i);
                        if (ret.delta.length == 0) {
                            ret.delta.push(i);
                        }
                    }
                    else if (pp[i] == sp + 1 && ret.delta.length == 1) {
                        ret.delta.push(i);
                    }
                    else if (pp[i] == sp + 2 && ret.delta.length == 2) {
                        ret.delta.push(i);
                    }
                }
                return ret;
            };
            if (leftpai.length == 0) {
                return true;
            }
            else if (leftpai.length == 1 || leftpai.length == 2) {
                return false;
            }
            else {
                //查找3个连续的或者3个相同的
                for (var i = 0; i < leftpai.length; ++i) {
                    var ret = getThree(leftpai, leftpai[i], i);
                    if (ret.same.length >= 3) {
                        //移除掉
                        // for (var l = ret.same.length - 1; l > )
                        var leftpai2 = leftpai.concat();
                        for (var l = ret.same.length - 1; l >= ret.same.length - 3; --l) {
                            leftpai2.splice(ret.same[l], 1);
                        }
                        if (checkPai(leftpai2)) {
                            return true;
                        }
                    }
                    else if (ret.delta.length == 3) {
                        var leftpai2 = leftpai.concat();
                        for (var l = ret.delta.length - 1; l >= ret.delta.length - 3; --l) {
                            leftpai2.splice(ret.delta[l], 1);
                        }
                        if (checkPai(leftpai2)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        var duis = Utils.getDuizi(pais);
        var count3 = 0;
        var count4 = 0;
        var count2 = 0;
        for (var i = 0; i < duis.length; ++i) {
            if (duis[i].count == 2) {
                count2++;
            }
            else if (duis[i].count == 3) {
                count3++;
            }
            else if (duis[i].count == 4) {
                count4++;
            }
        }
        if (count2 + count4 * 2 == 7) {
            return true;
        }
        else if (count3 == 4 && count2 == 1) {
            return true;
        }
        for (var i = 0; i < duis.length; ++i) {
            var leftpai = pais.concat();
            for (var n = 1; n >= 0; --n) {
                leftpai.splice(duis[i].idx[n], 1);
            }
            if (checkPai(leftpai)) {
                return true;
            }
        }
        return false;
    };
    // 5      4     3    2      1
    // AAA > ABC > AAB > ABD > ACE
    Utils.getPaiWeight = function (pais) {
        pais.sort(function (a, b) {
            return a - b;
        });
        // 判断相同
        var weight = 0;
        var same = {};
        for (var i = 0; i < pais.length; ++i) {
            if ([null, undefined].indexOf(same['' + pais[i]]) == -1) {
                same['' + pais[i]] += 1;
            }
            else {
                same['' + pais[i]] = 1;
            }
        }
        //// Utils.showLog('---same---', same);
        for (var key in same) {
            if (same[key] >= pais.length || same[key] >= 3) {
                weight = 5;
            }
            else if (same[key] >= 2) {
                weight += 3;
            }
        }
        // 判断连子
        // 查找最大的莲子
        var lian = {};
        for (var i = 0; i < pais.length; ++i) {
            lian['' + i] = 1;
            for (var n = i + 1; n < pais.length; ++n) {
                if (Math.abs(pais[i] - pais[n]) == 1 && lian['' + i] == 1) {
                    lian['' + i] += 1;
                }
                else if (Math.abs(pais[i] - pais[n]) == 2 && lian['' + i] == 2) {
                    lian['' + i] += 1;
                }
                else if (Math.abs(pais[i] - pais[n]) == 3 && lian['' + i] == 3) {
                    lian['' + i] += 1;
                }
            }
        }
        for (var key in lian) {
            if (lian[key] >= 3 && weight < 4) {
                weight = 4;
            }
            else if (lian[key] >= 2 && weight < 2) {
                weight = 2;
            }
        }
        return weight;
    };
    Utils.getRealLen = function (str) {
        return str.replace(/[^\x00-\xff]/g, '__').length; //这个把所有双字节的都给匹配进去了
    };
    Utils.cutStrWithDot = function (str, len) {
        var char_length = 0;
        for (var i = 0; i < str.length; i++) {
            var son_str = str.charAt(i);
            encodeURI(son_str).length > 2 ? char_length += 2 : char_length += 1;
            if (char_length >= len) {
                var sub_len = char_length == len ? i + 1 : i;
                return str.substr(0, sub_len) + (Utils.getRealLen(str) > char_length ? '..' : '');
            }
        }
        return str;
    };
    // 发送过来的通知消息转换为textFlow
    Utils.convertToTextFlow = function (textStr) {
        var size = 24;
        var textflow = [];
        var splited = textStr.split('$');
        // Utils.showLog('--splited--', splited);
        for (var i = 0; i < splited.length; ++i) {
            var text = splited[i];
            if (i % 2 == 1) {
                // var color = '0x00ff00';// + text.substr(0, 3) + splited[i + 1].substr(0, 3);
                // text = text.substr(3, text.length - 3);
                var color = "0xffffff";
                if (text && splited[i + 1]) {
                    color = text.substr(0, 3) + splited[i + 1].substr(0, 3);
                }
                text = text.substr(3, text.length - 3);
                textflow.push({ text: text, style: { size: size, textColor: parseInt(color, 16) } });
            }
            else {
                if (i > 1) {
                    text = text.substr(3, text.length - 3);
                }
                textflow.push({ text: text, style: { size: size } });
            }
        }
        return textflow;
    };
    Utils.checkMobile = function (phone) {
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            return false;
        }
        return true;
    };
    // public static Base64Parse(data : string) : string {
    //     var base64 = CryptoJS['enc'].Base64;
    //     var utf8 = CryptoJS['enc'].Utf8;
    //     return utf8.stringify(base64.parse(data));
    // }
    // public static Base64Stringify(data : any) : string {
    //     var base64 = CryptoJS['enc'].Base64;
    //     var utf8 = CryptoJS['enc'].Utf8;
    //     return base64.stringify(utf8.parse(JSON.stringify(data))).toString();
    // }
    // public static Base64(data : any) : string {
    //     var base64 = CryptoJS['enc'].Base64;
    //     var utf8 = CryptoJS['enc'].Utf8;
    //     var ret = base64.stringify(utf8.parse(data)).toString();
    //     if (ret.indexOf('/') != -1) {
    //         return Utils.Base64(ret);
    //     } else {
    //         return ret;
    //     }
    // }
    // proto文件解密
    Utils.decryptProtoFile = function (data, force) {
        if (force === void 0) { force = false; }
        if (data) {
            if (GlobalPara.releaseMode == 0 && !force) {
                return data;
            }
            else {
                var s = 0;
                for (var i = 0; i < GlobalPara.gameUiSTyle.length; ++i) {
                    s += GlobalPara.gameUiSTyle.charCodeAt(i);
                }
                s = s % 128;
                var len = data.length;
                var temp = "";
                for (var i = 0; i < len; i += 8) {
                    temp += String.fromCharCode(parseInt(data.substr(i, 8), 2) ^ s);
                }
                return temp;
            }
        }
        else {
            return data;
        }
    };
    // public static setConfigLoadState(resFile:string,isLoad:boolean):void
    // {
    //     this._configIsLoadDic[resFile] = isLoad;
    // }
    // public static getConfigLoadState(resFile:string):boolean
    // {
    //     return this._configIsLoadDic[resFile];
    // }
    // public static loadConfig(resfile) : void {
    //     RES.loadConfig(resfile + GlobalPara.webresver, Utils.cryptFileName("resource") + '/');
    // }
    // public static cryptPath(path : string) : string {
    //     var paths = path.split('/');
    //     for (var i = 0; i < paths.length - 1; ++i) {
    //         paths[i] = Utils.cryptFileName(paths[i]);
    //     }
    //     return paths.join('/');
    // }
    // public static cryptFileName(filename : string) : string {
    //     if (GlobalPara.releaseMode == 0) {
    //         return filename;
    //     } else {
    //         var d = filename + GlobalPara.gameUiSTyle;
    //         return Utils.Base64(d);
    //     }
    // }
    // public static decryptFileName(filename : string) : string {
    //     if (GlobalPara.releaseMode == 0) {
    //         return filename;
    //     } else {
    //         var base64 = CryptoJS['enc'].Base64;
    //         var utf8 = CryptoJS['enc'].Utf8;
    //         var d = utf8.stringify(base64.parse(filename));
    //         return d.replace(GlobalPara.gameUiSTyle, "");
    //     }
    // }
    // public static MD5(data : string) : string {
    //     var utf8 = CryptoJS['enc'].Utf8;
    //     return utf8.stringify(utf8.parse(CryptoJS['MD5'](data)))
    // }
    Utils.loadRemoteSource = function (url, cb) {
        var imageLoader = new egret.ImageLoader();
        imageLoader.crossOrigin = "anonymous";
        imageLoader.addEventListener(egret.Event.COMPLETE, function (event) {
            var texture = new egret.Texture();
            texture.bitmapData = imageLoader.data;
            cb(texture);
        }, this);
        imageLoader.load(url);
    };
    Utils.GetQueryString = function (name, href) {
        var reg = new RegExp("[\?\&]" + name + "=([^\&]*)(\&?)", "i");
        var r = href.substr(1).match(reg);
        if (r != null)
            return r[1];
        return null;
    };
    Utils.loadHeadImg = function (strfaceid, headimg) {
        if (strfaceid == '' || strfaceid == '0' || [null, undefined].indexOf(strfaceid) != -1) {
            strfaceid = '0';
        }
        var faceid = parseInt(strfaceid);
        if (strfaceid.length <= 2) {
            if (isNaN(faceid)) {
                faceid = 0;
                strfaceid = '0';
            }
            else {
                faceid %= 20;
                if (faceid == 0) {
                    // faceid = 1;   
                    faceid = 0;
                }
                strfaceid = '' + faceid;
            }
        }
        // var self = this;
        if ('' + faceid == strfaceid) {
            //userhead中只有20张图片
            headimg['source'] = "head_" + (faceid % 20) + "_png";
            headimg.visible = true;
        }
        else {
            // maybe network source
            Utils.loadRemoteSource(GlobalPara.STATIC_HEAD_URL + "/image/" + strfaceid + ".png?v=" + Utils.rand(100000, 1000000), function (texture) {
                // if(headimg.texture)
                // {
                //     headimg.texture.dispose();
                //     headimg.texture = null;
                // }
                // if(!headimg.parent)
                // {
                //     if(texture) texture.dispose();
                //     return;
                // }
                if (texture) {
                    headimg.texture = texture;
                    headimg.visible = true;
                }
                // headimg.addEventListener(egret.Event.REMOVED_FROM_STAGE,function onHeadImgRemove():void{
                //      if(headimg.texture) 
                //      {
                //         headimg.texture.dispose();
                //         headimg.texture = null;
                //      }
                //      headimg.removeEventListener(egret.Event.REMOVED_FROM_STAGE,onHeadImgRemove,null);
                //      headimg = null;
                // },null);
            });
        }
    };
    // public static uuid() {
    //     var s = [];
    //     var hexDigits = "0123456789abcdef";
    //     for (var i = 0; i < 32; i++) {
    //         s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    //     }
    //     s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    //     s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    //     s[8] = s[13] = s[18] = s[23] = "-";
    //     var uuid = s.join("") + new Date().getTime();
    //     return Utils.MD5(uuid);
    // }
    // 窗口加载动作 滑动
    // direction == 0表示从右到左 1表示从左到右
    // remove 表示是否删除或者关闭
    Utils.sliderView = function (view, direction, remove, cb) {
        if (cb === void 0) { cb = null; }
        var start = egret.MainContext.instance.stage.stageWidth;
        var end = 0;
        if (direction == 1) {
            end = start;
            start = 0;
        }
        view.x = start;
        egret.Tween.get(view).to({ x: end }, 200, egret.Ease.quadIn)
            .call(function () {
            if (remove && view.parent != null) {
                view.parent.removeChild(view);
            }
            if (cb) {
                cb();
            }
        }, null);
    };
    Utils.getHeadRes = function (strfaceid) {
        if (strfaceid == '' || strfaceid == '0') {
            strfaceid = '1';
        }
        var faceid = parseInt(strfaceid);
        if (isNaN(faceid) && strfaceid.length < 5) {
            faceid = 0;
            strfaceid = '0';
        }
        if ('' + faceid == strfaceid) {
            return "head_" + (faceid % 14) + "_png";
        }
        return GlobalPara.STATIC_HEAD_URL + "/image/" + strfaceid + ".png?v=" + Utils.rand(100000, 1000000);
    };
    Utils.playUIAnimation = function (target, isLoop) {
        if (isLoop) {
            for (var key in target.items) {
                target.items[key].props = { loop: true };
            }
        }
        target.play();
    };
    /**字节数*/
    Utils.getStrByteCount = function (str) {
        if (!str || typeof (str) != "string")
            return 0;
        var byteCount = 0;
        var re = /^[\u0000-\u00ff]$/;
        for (var i = 0; i < str.length; i++) {
            var c = str.charAt(i);
            if (re.test(c)) {
                byteCount += 1;
            }
            else {
                byteCount += 2;
            }
        }
        return byteCount;
    };
    /**
     * 循环缓动
     */
    Utils.loopTween = function (target, props1, duration1, props2, duration2, waitTime, ease1, ease2) {
        if (waitTime === void 0) { waitTime = 0; }
        if (ease1 === void 0) { ease1 = null; }
        if (ease2 === void 0) { ease2 = null; }
        //奔驰宝马
        egret.Tween.removeTweens(target);
        egret.Tween.get(target)
            .to(props1, duration1, ease1)
            .wait(waitTime)
            .to(props2, duration2, ease2)
            .call(function () {
            Utils.loopTween(target, props1, duration1, props2, duration2, waitTime, ease1, ease2);
        }, this);
    };
    /**
     * 带权值随机 ------ 返回权重对应的下标
     */
    Utils.randomByWeight = function (weightArr) {
        var len = weightArr.length;
        if (len < 2) {
            return -1;
        }
        var sum = 0;
        for (var i = 0; i < len; i++) {
            sum += weightArr[i];
        }
        //随机出1 --sum 的一个随机数
        var hbIndex = Math.floor(Math.random() * sum + 1);
        var index = 0;
        for (var idx = 0; idx < len; idx++) {
            hbIndex -= weightArr[idx];
            if (hbIndex <= 0) {
                index = idx;
                break;
            }
        }
        return index;
    };
    // 获取外网ip地址
    Utils.getRemoteIp = function () {
        var _this = this;
        if (GlobalPara.isNative && GlobalPara.myip == "unknown") {
            var request = new NetProxy();
            request.request('http://ip.taobao.com/service/getIpInfo.php?ip=myip', null, function (data, error) {
                var success = false;
                try {
                    if (data) {
                        var d_json = JSON.parse(data);
                        if (d_json['code'] == 0) {
                            NativeCall.myipReturn(d_json["data"]["ip"] + ":" + d_json["data"]["country_id"]);
                            success = true;
                        }
                    }
                }
                catch (error3) {
                }
                if (!success) {
                    egret.setTimeout(function () {
                        Utils.getRemoteIp();
                    }, _this, 2000);
                }
            }, this);
        }
    };
    Utils.checkDateIsSame = function (date1, date2) {
        if (date1 <= 0 || date2 <= 0)
            return false;
        var num1 = Math.floor(date1 / (24 * 60 * 60));
        var num2 = Math.floor(date2 / (24 * 60 * 60) / 1000);
        if (num1 == num2)
            return true;
        return false;
    };
    return Utils;
}());
// public static objectAttriUpdate:ObjectAttriUpdate;
Utils.isShowLog = false;
/**
 * @param {res 播放资源}
 * @param {isBGM 是否是背景音乐，默认值是 false}
 * @param {loops 播放次数，默认值是 0，循环播放。 大于 0 为播放次数，如 1 为播放 1 次；小于等于 0，为循环播放。}
 * @param {volume 音量范围从 0（静音）至 1（最大音量）}
 */
Utils.soundArray = [];
Utils._configIsLoadDic = {};
__reflect(Utils.prototype, "Utils");
//# sourceMappingURL=Utils.js.map