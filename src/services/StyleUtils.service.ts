import {GenericItem} from "../components/GenericItem";

export class StyleUtils {
    public static blur(item:GenericItem, amount:number):void {
        let element:HTMLElement = item.getContainer(),
            blur:string = "blur(" + amount + "px)";

        element.style.webkitFilter = blur;
        element.style.filter = blur;
    }

    public static left(item:GenericItem, amount:number):void {
        let element:HTMLElement = item.getContainer();
        element.style.left = amount + "px";
    }

    public static top(item:GenericItem, amount:number):void {
        let element:HTMLElement = item.getContainer();
        element.style.top = amount + "px";
    }

    public static height(item:GenericItem, amount:number):void {
        let element:HTMLElement = item.getContainer();
        element.style.height = amount + "px";
    }

    public static width(item:GenericItem, amount:number):void {
        let element:HTMLElement = item.getContainer();
        element.style.width = amount + "px";
    }

    public static scale(item:GenericItem, amount:number):void {
        let element:HTMLElement = item.getContainer(),
            zIndex:number = (Math.round(10*amount)*100);

        element.style.transform = "scale(" + amount + ")";
        element.style.zIndex = zIndex.toString();
    }
}
