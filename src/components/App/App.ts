import {autoPlay} from 'es6-tween/src'

import "./App.scss";
import {PortfolioItem} from "../PortfolioItem/PortfolioItem";
import {Item} from "../Item/Item";
import {IVisualBound} from "../Interfaces";

export class App extends Item {
    private _prevY:number = 0;
    private _items:PortfolioItem[] = [];

    constructor() {
        super("div");
        this.getContainer().classList.add("app");

        this.addItems();

        this.setupScrolling();

        autoPlay(true);
    }

    private figureTop():number {
        let sum:number = 0;
        this._items.forEach((item:PortfolioItem) => {
            let bounds:IVisualBound = item.getVisualBounds();
            sum += bounds.height * bounds.scale;
        });

        return sum;
    }

    private addItems():void {
        for(let i:number = 0; i < 10; i++) {
            let item:PortfolioItem = new PortfolioItem(),
                scale:number = Math.random()+.5;

            item.setScale(scale);

            let left:number = Math.max(0, Math.random() * (window.innerWidth - item.getVisualBounds().width)),
                top:number = this.figureTop();

            item.setPosition(left, top);
            this.getContainer().appendChild(item.getContainer());

            this._items.push(item);
        }
    }

    private setupScrolling():void {
        document.addEventListener("scroll", () => {
            let delta:number = window.scrollY - this._prevY;
            this._prevY = window.scrollY;

            this._items.forEach((item:PortfolioItem) => {
                item.move(delta);
            })
        });
    }
}
