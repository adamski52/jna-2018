import "./Item.scss";

export class Item {
    private _container:HTMLElement;

    constructor(type:string = "div") {
        this._container = document.createElement(type);
    }

    public getContainer():HTMLElement {
        return this._container;
    }
}
