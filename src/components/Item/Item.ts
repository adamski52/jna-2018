import "./Item.scss";

export class Item {
    private _container:HTMLElement;

    constructor(type:string = "div") {
        this._container = document.createElement("div");
    }

    public getContainer():HTMLElement {
        return this._container;
    }
}
