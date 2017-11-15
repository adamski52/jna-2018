export class StyleUtils {
    public static blur(element:HTMLElement, amount:number):void {
        let blur:string = "blur(" + amount + "px)";
        element.style.webkitFilter = blur;
        element.style.filter = blur;
    }

    public static left(element:HTMLElement, amount:number):void {
        element.style.left = amount + "px";
    }

    public static top(element:HTMLElement, amount:number):void {
        element.style.top = amount + "px";
    }

    public static height(element:HTMLElement, amount:number):void {
        element.style.height = amount + "px";
    }

    public static width(element:HTMLElement, amount:number):void {
        element.style.width = amount + "px";
    }
}
