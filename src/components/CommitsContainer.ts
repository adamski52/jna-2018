import "./CommitsContainer.scss";

import {CommitsService} from "../services/Commits.service";
import {Commit} from "./Commit";
import {IRepo} from "../interfaces/Repo.interface";
import {ICommit} from "../interfaces/Commit.interface";
import {AsyncItem} from "./AsyncItem";

export class CommitsContainer extends AsyncItem {
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
            this.hideSpinner();

            commits.forEach((commit:ICommit) => {
                let item:Commit = new Commit(commit);
                this._children.push(item);
                this.getContainer().appendChild(item.getContainer());
            });
        });
    }

    protected onLoadStart():void {
        this._commitsService.get(this._repo);
    }
}
