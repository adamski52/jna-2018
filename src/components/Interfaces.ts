export interface IVisualBound {
    top:number;
    left:number;
    right:number;
    bottom:number;
    height:number;
    width:number;
    scale:number;
}

export interface ILanguage {
    name: string;
    iconClass: string;
    percentage: number;
};

export interface ILanguageMeta {
    [key: string]: number;
};
