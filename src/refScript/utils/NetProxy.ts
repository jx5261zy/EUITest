/*
* 网络通信代理
*/
class NetProxy {

    private _request: egret.HttpRequest = null;
    private _callBack: Function = null;
    private _timer : any = 0;

    public request(url: string, query:string, callBack: Function = null, thisObject: any = null, params: any = null, method: string = egret.HttpMethod.GET, dataFormat: string = egret.URLLoaderDataFormat.TEXT): void {

        if (callBack) {
            this._callBack = callBack.bind(thisObject);
        }

        this._request = new egret.HttpRequest();
        this._request.responseType = egret.HttpResponseType.TEXT;
        this._request.open(url, method);
        this._request.send(params);
        this._request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
        this._request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
    }

    public setTimeout(timeout : number) : void {

        this._timer = egret.setTimeout(() => {

            this._request.abort();
            if (this._callBack) {
                this._callBack(null, 'request time out');
            }

            // Utils.showLog("net proxy time out---");

        }, this, timeout);

    }

    private onPostComplete(event:egret.Event):void {

        if (this._timer != 0) {
            egret.clearTimeout(this._timer);
        }
        var request = <egret.HttpRequest>event.currentTarget;
        if (this._callBack) {
            this._callBack(request.response, null);
        }
    }
    private onPostIOError(event:egret.IOErrorEvent):void {
        console.log("IOError:"+event);
        // console.log("-----head----"+this._request.getAllResponseHeaders);
        // Main.getInstance().display(new TipView("request error"));
        
        if (this._callBack) {
            this._callBack(null, "request error");
        }
        if (this._timer != 0) {
            egret.clearTimeout(this._timer);
        }
    }
}