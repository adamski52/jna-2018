import "./LanguagesContainer.scss";

import {LanguagesService} from "../services/Languages.service";
import {IRepo} from "../interfaces/Repo.interface";
import {ILanguage} from "../interfaces/Language.interface";
import {Language} from "./Language";
import {AsyncItem} from "./AsyncItem";

export class LanguagesContainer extends AsyncItem {
    private _languagesService:LanguagesService = new LanguagesService();
    private _repo:IRepo;
    private _languages:ILanguage[] = [];

    constructor(repo:IRepo) {
        super("div");

        this._repo = repo;

        this.setupSubscriptions();
    }

    public getLanguages():ILanguage[] {
        return this._languages;
    }

    private setupSubscriptions():void {
        this._languagesService.subscribe((languages:ILanguage[]) => {
            this._languages = languages;

            this.removeAllChildren();
            this.hideSpinner();

            languages.forEach((language:ILanguage) => {
                let languageItem:Language = new Language(language);
                this.addChild(languageItem);
            });
        });
    }

    protected onLoadStart():void {
        this._languagesService.get(this._repo);
    }
}
