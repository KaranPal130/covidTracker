import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { dataSummary } from'../models/data'
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private dataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-01-2021.csv"
  constructor(private http: HttpClient) { }

  getData(){
      return this.http.get(this.dataUrl, {responseType: 'text'}).pipe(
        map(result => {
            let data: dataSummary[] = [];
            let raw:any = {}
            let rows = result.split('\n');
            rows.splice(0, 1);
            // console.log(rows);
            rows.forEach(row=>{
              let cols = row.split(/,(?=\S)/)

              let cs = {
                country : cols[3],
                confirmed : +cols[7],
                deaths: +cols[8],
                recovered: +cols[9],
                active: +cols[10], 
              };
              let flag: dataSummary = raw [cs.country];
              let temp: dataSummary = raw[cs.country];
              if(flag){
                temp.active = cs.active
                flag.active = cs.active + temp.active
                temp.confirmed = cs.confirmed 
                flag.confirmed = cs.confirmed + temp.confirmed
                temp.deaths = cs.deaths 
                flag.deaths = cs.deaths + temp.deaths
                temp.recovered = cs.recovered 
                flag.recovered = cs.recovered + temp.recovered
               
                raw[cs.country] = flag
              }else {
                raw[cs.country] = cs;
              }
              
            })

            
            return <dataSummary[]> Object.values(raw);
        })
      )
  }
}
