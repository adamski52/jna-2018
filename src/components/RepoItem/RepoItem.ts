import {PortfolioItem} from "../PortfolioItem/PortfolioItem";
import {IRepo} from "../interfaces/repo";

export class RepoItem extends PortfolioItem {
    private _content:IRepo;

    constructor() {
        super();
        this.getContainer().classList.add("repo-item");
    }

    public setContent(repo:IRepo):void {
        this._content = repo;
        this.setTitle(repo.name);
    }
}
