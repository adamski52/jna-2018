import "./PortfolioItem.scss";

import {StyledItem} from "../StyledItem/StyledItem";

export class PortfolioItem extends StyledItem {
    constructor() {
        super("div");
        this.getContainer().classList.add("portfolio-item");
    }
}
