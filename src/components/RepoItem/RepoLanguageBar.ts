import {Item} from "../Item/Item";
import {IRepo} from "../interfaces/repo";
import {ReposLanguagesService} from "./RepoLanguages.service";
import {ILanguage} from "../interfaces/language";
import {RepoLanguage} from "./RepoLanguage";

export class RepoLanguageBar extends Item {
    private _languages:RepoLanguage[] = [];
    private _repoLanguagesService:ReposLanguagesService;

    constructor() {
        super("div");
        this.getContainer().classList.add("repo-language-bar");
        this._repoLanguagesService = new ReposLanguagesService();

        this._repoLanguagesService.subscribe((languages:ILanguage[]) => {
            this._languages.forEach((item:Item) => {
                this.getContainer().removeChild(item.getContainer());
            });

            this._languages = [];

            languages.forEach((language:ILanguage) => {
                let languageItem:RepoLanguage = new RepoLanguage();
                languageItem.setLanguage(language);
                this._languages.push(languageItem);
                this.getContainer().appendChild(languageItem.getContainer());
            });
        });
    }

    public load(repo:IRepo):void {
        this._repoLanguagesService.get(repo);
    }
}
