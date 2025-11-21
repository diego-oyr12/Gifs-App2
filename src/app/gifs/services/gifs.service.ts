import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Gif, SearchResponse } from "../interfaces/gifs.interfaces";

@Injectable({providedIn: 'root'})
export class GifsService{

    public gifList: Gif[] = [];
    private _tagsHistory:string[]=[];
    private GIPHY_API_KEY:string = 'YMcPD4YWTM3dYeDMZ0Ppo5xybjxTgvTy';
    private serviceURL:string = 'https://api.giphy.com/v1/gifs';
    
    constructor(
        private http: HttpClient
    ){
        this.loadLocalStorage();
        console.log("GifsService READY");
    }

    get tagsHistory(){
        return [...this._tagsHistory];
    }

    private organizeHistory(tag:string){
        tag = tag.toLowerCase();
        if(this.tagsHistory.includes(tag)){
            this._tagsHistory = this._tagsHistory.filter((oldtag)=>oldtag!=tag);
        }
        this._tagsHistory.unshift(tag.trim());
        this._tagsHistory = this._tagsHistory.splice(0,10);
        this.saveLocalStorage();
    }

    private saveLocalStorage():void{
        localStorage.setItem('history',JSON.stringify(this._tagsHistory));
    }

    private loadLocalStorage(){
        if(!localStorage.getItem('history'))return;
        this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
        if(this._tagsHistory.length === 0)return;
        this.searchTag(this._tagsHistory[0]);//Carga el primer elemento apenas se ejecute
    }

    searchTag(tag:string):void{
        if(tag.length == 0) return;
        this.organizeHistory(tag);

        //Se definen los parametros a enviar (los parametros que se suelen enviar asi ...?api_key=---)
        const params = new HttpParams()
        .set('api_key',this.GIPHY_API_KEY)
        .set('limit','50')
        .set('q',tag)

        //Se hace la consulta http a la ruta /search y se envian los parametros, tambien se pueden enviar header y otros elementos
        this.http.get<SearchResponse>(`${this.serviceURL}/search`,{params})
        .subscribe((resp) => {
            this.gifList = resp.data;
            console.log({gifs: this.gifList});
        })
    }
}