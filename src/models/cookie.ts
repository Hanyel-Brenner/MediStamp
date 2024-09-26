export class Cookie{
    sessionId : string;
    email : string;
    date : Date;

    constructor(email : string, sessionId : string){
        this.sessionId = sessionId;
        this.email = email;
        this.date = new Date();
    }
}