import {Item} from "../Item/Item";
import {ReposEventsService} from "./ReposEvents.service";
import {IRepo} from "../interfaces/repo";
import {ICommit} from "../interfaces/commit";
import {RepoCommitItem} from "./RepoCommitItem";

export class RepoEventsContainer extends Item {
    private _repoEventsService:ReposEventsService;
    private _commits:RepoCommitItem[] = [];

    constructor() {
        super("ul");

        this._repoEventsService = new ReposEventsService();
        this.getContainer().classList.add("repo-events-container");

        this._repoEventsService.subscribe((commits:ICommit[]) => {
            this._commits.forEach((item:RepoCommitItem) => {
                this.getContainer().removeChild(item.getContainer());
            });

            this._commits = [];

            commits.forEach((commit:ICommit) => {
                let commitItem = new RepoCommitItem(commit);
                this._commits.push(commitItem);
                this.getContainer().appendChild(commitItem.getContainer());
            });
        });
    }

    public load(repo:IRepo):void {
        this._repoEventsService.get(repo);
    }
}
