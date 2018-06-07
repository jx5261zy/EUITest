class LocalConfigInfo {
	private _effect:boolean =  true;
	/**特效声音配置*/
	public get effect():boolean
	{
		return this._effect;
	}
	public set effect(val:boolean)
	{
		this._effect = val;
		egret.localStorage.setItem("effectsound",val?"true":"false");
	}

	private _music:boolean = true;
	/**背景音乐配置*/
	public get music():boolean
	{
		return this._music;
	}
	public set music(val:boolean)
	{
		this._music = val;
		egret.localStorage.setItem("musicsound",val?"true":"false");
	}
	public constructor() {
		var music:string = egret.localStorage.getItem("musicsound");
        var effect:string = egret.localStorage.getItem("effectsound");
        this._music = music == "false"?false:true;
		this._effect = effect == "false"?false:true;
	}
}