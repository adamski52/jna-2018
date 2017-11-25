import "./CommitsContainer.scss";

import {GenericItem} from "./GenericItem";
import {CommitsService} from "../services/Commits.service";
import {Commit} from "./Commit";
import {IRepo} from "../interfaces/Repo.interface";
import {ICommit} from "../interfaces/Commit.interface";

export class CommitsContainer extends GenericItem {
    private _commitsService:CommitsService = new CommitsService();
    private _repo:IRepo;

    constructor(repo:IRepo) {
        super("ul");

        this._repo = repo;

        this.setupSubscriptions();
    }

    private setupSubscriptions():void {
        this._commitsService.subscribe((commits:ICommit[]) => {
            this.removeAllChildren();

            commits.forEach((commit:ICommit) => {
                let item:Commit = new Commit(commit);
                this._children.push(item);
                this.getContainer().appendChild(item.getContainer());
            });
        });
    }

    public load():void {
        this._commitsService.get(this._repo);
    }
}
