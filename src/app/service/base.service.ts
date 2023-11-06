import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  addMessage(_arg0: string) {
    throw new Error('Method not implemented.');
  }

  eventsData: AngularFireList<Event>

  constructor(private db:AngularFireDatabase) { 
    this.eventsData=this.db.list('/events')
  }

  getData(){
    return this.eventsData
  }

  getFeaturedData(){
    return this.db.list('/featured');
  }

  getSelfImprovementData(){
    return this.db.list('/selfImprovement');
  }

  getTechnologyData(){
    return this.db.list('/technology')
  }

  getSportsAndHealthData(){
    return this.db.list('/sportsAndHealth')
  }

   deleteData(key:any){
    return this.eventsData.remove(key)
  }

  newData(body:any){
    return this.eventsData.push(body)
  }

}
