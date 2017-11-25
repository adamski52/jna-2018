import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {HttpService} from "./Http.service";
import {ICommit} from "../interfaces/Commit.interface";
import {IRepo} from "../interfaces/Repo.interface";

export class CommitsService {
    private subject:BehaviorSubject<ICommit[]> = new BehaviorSubject([]);

    public subscribe(callback:(response:ICommit[]) => void):Subscription {
        return this.subject.subscribe(callback);
    }

    public get(repo:IRepo):void {
        HttpService.get("/api/repos/adamski52/" + repo.name + "/commits", (response: ICommit[]) => {
            this.subject.next(response);
        });
    }
}
