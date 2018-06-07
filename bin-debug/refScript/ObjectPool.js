var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var pool;
(function (pool) {
    /**
     *
     * @author ''"
     *
     */
    var ObjectPool = (function () {
        function ObjectPool() {
            this._poolDic = {};
            this._classObjDic = {};
            this._cacheCountDic = {};
        }
        Object.defineProperty(ObjectPool, "instance", {
            get: function () {
                if (ObjectPool._instance == null)
                    ObjectPool._instance = new ObjectPool();
                return ObjectPool._instance;
            },
            enumerable: true,
            configurable: true
        });
        ObjectPool.prototype.createObjectPool = function (poolName, classObj, cacheCount) {
            if (!this._poolDic[poolName]) {
                this._poolDic[poolName] = [];
                this._classObjDic[poolName] = classObj;
                if (cacheCount > 0) {
                    this._cacheCountDic[poolName] = cacheCount;
                }
            }
        };
        ObjectPool.prototype.cleanObjectPool = function (poolName) {
            if (this._poolDic[poolName]) {
                var arr = this._poolDic[poolName];
                var l = arr.length;
                for (var i = 0; i < l; i++) {
                    this.disposeObj(arr.pop());
                }
                arr.length = 0;
                delete this._poolDic[poolName];
                delete this._classObjDic[poolName];
                delete this._cacheCountDic[poolName];
            }
        };
        ObjectPool.prototype.pushObj = function (poolName, obj) {
            if (obj == null)
                return;
            if (!this._poolDic[poolName]) {
                this.disposeObj(obj);
                return;
            }
            var arr = this._poolDic[poolName];
            var maxCount = this._cacheCountDic[poolName] ? this._cacheCountDic[poolName] : ObjectPool.CACHE_COUNT;
            if (arr.length >= maxCount) {
                this.disposeObj(obj);
                return;
            }
            if (obj.recycle) {
                obj.recycle();
            }
            if (obj.parent)
                obj.parent.removeChild(obj);
            arr.push(obj);
        };
        ObjectPool.prototype.getObj = function (poolName, paramArr) {
            if (paramArr === void 0) { paramArr = null; }
            if (!this._poolDic[poolName]) {
                // Utils.showLog("没有创建对象池 " + poolName);
                return;
            }
            var obj = null;
            var arr = this._poolDic[poolName];
            if (arr.length > 0) {
                obj = arr.shift();
                if (obj.reset) {
                    obj.reset();
                }
            }
            else {
                if (paramArr != null) {
                    obj = new this._classObjDic[poolName](paramArr);
                }
                else {
                    obj = new this._classObjDic[poolName]();
                }
            }
            return obj;
        };
        ObjectPool.prototype.disposeObj = function (obj) {
            if (obj == null)
                return;
            if (obj.dispose) {
                obj.dispose();
            }
            else {
                if (obj.stop) {
                    obj.stop();
                }
                if (obj.texture) {
                    obj.texture = null;
                }
            }
        };
        ObjectPool.prototype.printObjCount = function (poolName) {
            if (this._poolDic[poolName]) {
            }
        };
        return ObjectPool;
    }());
    ObjectPool.CACHE_COUNT = 100;
    pool.ObjectPool = ObjectPool;
    __reflect(ObjectPool.prototype, "pool.ObjectPool");
})(pool || (pool = {}));
//# sourceMappingURL=ObjectPool.js.map