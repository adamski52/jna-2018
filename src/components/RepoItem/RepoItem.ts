import {PortfolioItem} from "../PortfolioItem/PortfolioItem";
import {IRepo} from "../interfaces/repo";
import {RepoLanguageBar} from "./RepoLanguageBar";

export class RepoItem extends PortfolioItem {
    private _languages:RepoLanguageBar;

    constructor() {
        super();
        for (let obj in this.getContainer().classList) {
            this.getContainer().classList.remove(obj);
        }

        this.getContainer().classList.add("repo-item");

        this._languages = new RepoLanguageBar();

        this.getContainer().appendChild(this._languages.getContainer());
    }

    public setContent(repo:IRepo):void {
        this.setTitle(repo.name);
        this._languages.setRepo(repo);
    }
}
