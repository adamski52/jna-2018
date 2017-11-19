import {Item} from "../Item/Item";
import {ILanguage} from "../interfaces/language";

export class RepoLanguage extends Item {
    private _language:ILanguage;

    constructor() {
        super("span");
        this.getContainer().classList.add("repo-language");
    }

    public setLanguage(language:ILanguage):void {
        this._language = language;
        this.getContainer().innerText = this._language.name + " (" + this._language.percentage + "%)";

        for (let obj in this.getContainer().classList) {
            this.getContainer().classList.remove(obj);
        }

        this.getContainer().classList.add(this._language.iconClass);
    }
}
