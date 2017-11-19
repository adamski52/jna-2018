import {IRepo} from "../interfaces/repo";
import {RepoLanguageBar} from "./RepoLanguageBar";
import {StyledItem} from "../StyledItem/StyledItem";
import {Item} from "../Item/Item";

export class RepoItem extends StyledItem {
    private _languages:RepoLanguageBar;
    private _title:Item;

    constructor() {
        super();
        for (let obj in this.getContainer().classList) {
            this.getContainer().classList.remove(obj);
        }

        this.getContainer().classList.add("repo-item");

        this._title = new Item("h3");
        this._title.getContainer().classList.add("repo-item-title");
        this.getContainer().appendChild(this._title.getContainer());

        this._languages = new RepoLanguageBar();
        this.getContainer().appendChild(this._languages.getContainer());
    }

    private setTitle(title:string):void {
        this._title.getContainer().innerText = title;
    }

    public setContent(repo:IRepo):void {
        this.setTitle(repo.name);
        this._languages.setRepo(repo);
    }
}
