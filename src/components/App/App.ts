import {autoPlay} from 'es6-tween'

import "./App.scss";
import {PortfolioItem} from "../PortfolioItem/PortfolioItem";
import {Item} from "../Item/Item";
import {IVisualBound} from "../Interfaces";
import {PortfolioItemService} from "../PortfolioItem/PortfolioItem.service";
import {ErrorService} from "../Error.service";

export class App extends Item {
    private _prevY:number = 0;
    private _items:PortfolioItem[] = [];

    constructor() {
        super("div");
        this.getContainer().classList.add("app");

        this.addItems();

        this.setupScrolling();

        autoPlay(true);

        PortfolioItemService.subscribe((response:any) => {
            console.log("success", response);
        });

        ErrorService.subscribe((err:any) => {
            console.log("err", err);
        });

        PortfolioItemService.get();
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
        for(let i:number = 0; i < 100; i++) {
            let item:PortfolioItem = new PortfolioItem(),
                scale:number = .1 + (Math.random() *.8);

            item.setScale(scale);

            let left:number = Math.max(0, -item.getVisualBounds().width + Math.random() * (window.innerWidth)),
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
