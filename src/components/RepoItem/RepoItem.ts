import "./RepoItem.scss";

import {IRepo} from "../interfaces/repo";
import {RepoLanguageBar} from "./RepoLanguageBar";
import {StyledItem} from "../StyledItem/StyledItem";
import {Item} from "../Item/Item";
import {RepoEventsContainer} from "./RepoEventsContainer";

export class RepoItem extends StyledItem {
    private _languages:RepoLanguageBar;
    private _commits:RepoEventsContainer;

    private _title:Item;

    constructor(repo:IRepo) {
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

        this._commits = new RepoEventsContainer();
        this.getContainer().appendChild(this._commits.getContainer());

        this._title.getContainer().innerText = repo.name;
        this.getContainer().style.backgroundImage = "url(https://github.com/adamski52/" + repo.name + "/blob/master/thumbnail.jpg?raw=true)";

        this.getContainer().addEventListener("mouseenter", (e:MouseEvent) => {
            this._languages.load(repo);
            this._commits.load(repo);
        });
    }
}
