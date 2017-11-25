import "./Title.scss";

import {GenericItem} from "./GenericItem";
import {IRepo} from "../interfaces/Repo.interface";

export class Title extends GenericItem {
    constructor(repo:IRepo) {
        super("h3");
        this.setText(repo.name);
    }
}
