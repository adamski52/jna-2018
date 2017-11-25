import "./LanguagesContainer.scss";

import {GenericItem} from "./GenericItem";
import {LanguagesService} from "../services/Languages.service";
import {IRepo} from "../interfaces/Repo.interface";
import {ILanguage} from "../interfaces/Language.interface";
import {Language} from "./Language";

export class LanguagesContainer extends GenericItem {
    private _languagesService:LanguagesService = new LanguagesService();
    private _repo:IRepo;

    constructor(repo:IRepo) {
        super("div");

        this._repo = repo;

        this.setupSubscriptions();
    }

    private setupSubscriptions():void {
        this._languagesService.subscribe((languages:ILanguage[]) => {
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
