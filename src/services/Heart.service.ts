import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {IRepo} from "../interfaces/Repo.interface";
import {HttpService} from "./Http.service";

export class HeartService {
    private subject:BehaviorSubject<number> = new BehaviorSubject(0);
    private repo:IRepo;

    constructor(repo:IRepo) {
        this.repo = repo;
    }

    public subscribe(callback:(response:number) => void):Subscription {
        return this.subject.subscribe(callback);
    }

    public get():void {
        HttpService.get("http://www.maintaincomposure.com/api/repos/" + this.repo.name, (response: any) => {
            if(!response || !response.data) {
                this.subject.next(0);
                return;
            }
            this.subject.next(parseInt(response.data.hearts));
        });
    }

    public post():void {
        HttpService.post("http://www.maintaincomposure.com/api/repos/" + this.repo.name, (response:any) => {
            if(!response || !response.data) {
                this.subject.next(0);
                return;
            }
            this.subject.next(parseInt(response.data.hearts));
        });
    }
}
