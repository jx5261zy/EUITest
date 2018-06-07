module pool {
/**
 *
 * @author ''"
 *
 */
    export class ObjectPool {
    private static _instance:ObjectPool;
    public static get instance():ObjectPool
    {
        if(ObjectPool._instance == null) ObjectPool._instance = new ObjectPool();
        return ObjectPool._instance;
    }
    private static CACHE_COUNT:number = 100;
    private _poolDic:Object = {};
    private _classObjDic:Object = {};
    private _cacheCountDic:Object = {};
	public constructor() {
	}
	public createObjectPool(poolName:string,classObj:any,cacheCount?:number):void
	{
        if(!this._poolDic[poolName])
        {
             this._poolDic[poolName] = [];
             this._classObjDic[poolName] = classObj;
             if(cacheCount > 0)
             {
                 this._cacheCountDic[poolName] = cacheCount;
             }
        }
	}
	public cleanObjectPool(poolName:string):void
	{
        if(this._poolDic[poolName])
        {
            var arr: Array<any> = this._poolDic[poolName];
            var l:number = arr.length;
            for(var i:number = 0;i<l;i++)
            {
                this.disposeObj(arr.pop());
            }
            arr.length = 0;
            delete this._poolDic[poolName];
            delete this._classObjDic[poolName];
            delete this._cacheCountDic[poolName];
        }
	}
	public pushObj(poolName:string,obj:any):void
	{
        if(obj == null) return;
        if(!this._poolDic[poolName]) 
        {
            this.disposeObj(obj);
            return;
        }
        var arr: Array<any> = this._poolDic[poolName];
        var maxCount: number = this._cacheCountDic[poolName] ? this._cacheCountDic[poolName] : ObjectPool.CACHE_COUNT;
        if(arr.length >= maxCount)
        {
            this.disposeObj(obj);
            return;
        }
        if(obj.recycle)
        {
            obj.recycle();
        }
        if(obj.parent) obj.parent.removeChild(obj);
        arr.push(obj);
	}
	public getObj(poolName:string,paramArr:Array<any> = null):any
	{
        if(!this._poolDic[poolName]) 
        {
            // Utils.showLog("没有创建对象池 " + poolName);
            return;
        }
        var obj = null;
        var arr: Array<any> = this._poolDic[poolName];
        if(arr.length > 0)
        {
            obj = arr.shift();
            if(obj.reset)
            {
                obj.reset();
            }
        }else
        {
            if(paramArr != null)
            {
                obj = new this._classObjDic[poolName](paramArr);
            }else
            {
                obj = new this._classObjDic[poolName]();
            }
        }
        return obj;
	}
	private disposeObj(obj:any):void
	{
	    if(obj == null) return;
	    if(obj.dispose)
         {
            obj.dispose();
         }else
         {
             if(obj.stop)
             {
                 obj.stop();
             }
             if(obj.texture)
             {
                 obj.texture = null;
             }
         }
	}
	public printObjCount(poolName:string):void
	{
        if(this._poolDic[poolName])
        {
            // Utils.showLog(poolName + " 对象池中包含对象数量 " + this._poolDic[poolName].length);
        }
	}
	}
}

