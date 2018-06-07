//
//游戏桌子 主要用来表现房间中桌子的信息
//created at 2017-2-28 16:57:35
//
class GameTable {
	
	public tableID : number = 0;
	public users : any = {};    

	constructor(tableid : number) {
		this.tableID = tableid;
	}

	public existUser(userid : number) : boolean {
        return [null, undefined].indexOf(this.users['' + userid]) == -1;
    }

    public getUser(userid : number) : GameUser {
        return this.users['' + userid];
    }

    public addUser(user : GameUser) : boolean {
        if ([null, undefined].indexOf(this.users['' + user.userID]) != -1) {
            this.users['' + user.userID] = user;
            return true;
        }

        return false;
    }

    public deleteUser(userid : number) : void {

        if ([null, undefined].indexOf(this.users['' + userid]) == -1) {
            this.users['' + userid] = null;
            delete this.users['' + userid];
        }
    }

    public getUserCount():number
    {
        var count:number = 0;
        for(var k in this.users)
        {
            count ++;
        }
        return count;
    }
    public dispose() : void {
        for (var key in this.users) {
            delete this.users[key];
        }
        
        this.users = {};        
    }


}