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
        HttpService.get("/jna/repos/" + this.repo.name, (response: number) => {
            this.subject.next(response);
        });
    }

    public post():void {
        HttpService.post("/jna/repos/" + this.repo.name, (response:number) => {
            this.subject.next(response);
        });
    }
}
