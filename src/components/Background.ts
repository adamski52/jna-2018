import "./Background.scss";

import {GenericItem} from "./GenericItem";
import {IRepo} from "../interfaces/Repo.interface";

export class Background extends GenericItem {
    constructor(repo:IRepo) {
        super("div");
        this.setStyle("backgroundImage", "url(https://github.com/adamski52/" + repo.name + "/blob/master/thumbnail.jpg?raw=true)");
    }
}
