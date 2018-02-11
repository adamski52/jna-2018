import "./ViewButtonsContainer.scss";

import {GenericItem} from "./GenericItem";
import {IRepo} from "../interfaces/Repo.interface";
import {ViewButton} from "./ViewButton";

export class ViewButtonsContainer extends GenericItem {
    private _siteButton:ViewButton;
    private _codeButton:ViewButton;

    constructor(repo:IRepo) {
        super("div");

        if(repo.homepage) {
            this._siteButton = new ViewButton(repo.homepage, false);
            this.addChild(this._siteButton);
        }

        this._codeButton = new ViewButton(repo.html_url, true);
        this.addChild(this._codeButton);
    }
}