var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
* 网络通信代理
*/
var NetProxy = (function () {
    function NetProxy() {
        this._request = null;
        this._callBack = null;
        this._timer = 0;
    }
    NetProxy.prototype.request = function (url, query, callBack, thisObject, params, method, dataFormat) {
        if (callBack === void 0) { callBack = null; }
        if (thisObject === void 0) { thisObject = null; }
        if (params === void 0) { params = null; }
        if (method === void 0) { method = egret.HttpMethod.GET; }
        if (dataFormat === void 0) { dataFormat = egret.URLLoaderDataFormat.TEXT; }
        if (callBack) {
            this._callBack = callBack.bind(thisObject);
        }
        this._request = new egret.HttpRequest();
        this._request.responseType = egret.HttpResponseType.TEXT;
        this._request.open(url, method);
        this._request.send(params);
        this._request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        this._request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
    };
    NetProxy.prototype.setTimeout = function (timeout) {
        var _this = this;
        this._timer = egret.setTimeout(function () {
            _this._request.abort();
            if (_this._callBack) {
                _this._callBack(null, 'request time out');
            }
            // Utils.showLog("net proxy time out---");
        }, this, timeout);
    };
    NetProxy.prototype.onPostComplete = function (event) {
        if (this._timer != 0) {
            egret.clearTimeout(this._timer);
        }
        var request = event.currentTarget;
        if (this._callBack) {
            this._callBack(request.response, null);
        }
    };
    NetProxy.prototype.onPostIOError = function (event) {
        console.log("IOError:" + event);
        // console.log("-----head----"+this._request.getAllResponseHeaders);
        // Main.getInstance().display(new TipView("request error"));
        if (this._callBack) {
            this._callBack(null, "request error");
        }
        if (this._timer != 0) {
            egret.clearTimeout(this._timer);
        }
    };
    return NetProxy;
}());
__reflect(NetProxy.prototype, "NetProxy");
//# sourceMappingURL=NetProxy.js.map