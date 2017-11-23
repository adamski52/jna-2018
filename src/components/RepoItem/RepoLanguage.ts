import {Item} from "../Item/Item";
import {ILanguage} from "../interfaces/language";

export class RepoLanguage extends Item {
    private _language:ILanguage;
    private _text:Item;

    constructor() {
        super("span");

        this._text = new Item("span");

        this.getContainer().classList.add("repo-language");
        this.getContainer().classList.add("colored");
    }

    public setLanguage(language:ILanguage):void {
        this._language = language;

        this._text.getContainer().innerText = this._language.name + " (" + this._language.percentage + "%)";
        this.getContainer().appendChild(this._text.getContainer());

        this.getContainer().classList.add(this._language.iconClass);
    }
}
