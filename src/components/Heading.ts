import "./Heading.scss";
import {GenericItem} from "./GenericItem";

export class Heading extends GenericItem {
    constructor() {
        super("h1");
        this.setText("jonathan adamski");
    }
}
