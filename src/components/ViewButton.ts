import "./ViewButton.scss";

import {GenericItem} from "./GenericItem";
import {LanguageMap} from "../services/LanguageMap.service";

export class ViewButton extends GenericItem {
    constructor(url:string, isCode:boolean = true) {
        super("a");

        this.setAttribute("href", url);
        this.setAttribute("target", "_jna");

        if(isCode) {
            this.addClass("view-code");
            this.addClass(LanguageMap.getIconClass("github"));
            this.setText("View Code");
        }
        else {
            this.addClass("view-live");
            this.addClass("jna-icon-arrow-circle-o-right");
            this.setText("View Live");
        }
    }
}
