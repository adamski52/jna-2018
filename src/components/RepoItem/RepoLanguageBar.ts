import {Item} from "../Item/Item";
import {IRepo} from "../interfaces/repo";
import {ReposLanguagesService} from "./RepoLanguages.service";
import {ILanguage} from "../interfaces/language";
import {RepoLanguage} from "./RepoLanguage";

export class RepoLanguageBar extends Item {
    private _languages:RepoLanguage[] = [];
    private _items:Item[] = [];

    constructor() {
        super("div");
    }

    private updateItems():void {
        this._items.forEach((item:Item) => {
            this.getContainer().removeChild(item.getContainer());
        });

        this._items = [].concat(this._languages);

        this._items.forEach((item:Item) => {
            this.getContainer().appendChild(item.getContainer());
        });
    }

    public setRepo(repo:IRepo):void {
        ReposLanguagesService.subscribe((languages:ILanguage[]) => {
            this._languages = [];
            languages.forEach((language:ILanguage) => {
                let languageItem:RepoLanguage = new RepoLanguage();
                languageItem.setLanguage(language);
                this._languages.push();
            });

            this.updateItems();
        });

        ReposLanguagesService.get(repo);
    }
}
