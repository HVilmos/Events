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
  featuredData: AngularFireList<Event>
  SelfImprovementData: AngularFireList<Event>
  TechnologyData: AngularFireList<Event>
  sportsAndHealthData: AngularFireList<Event>

  constructor(private db:AngularFireDatabase) { 
    this.eventsData=this.db.list('/events')
    this.featuredData=this.db.list('/featured')
    this.SelfImprovementData=this.db.list('/selfImprovement')
    this.TechnologyData=this.db.list('/technology')
    this.sportsAndHealthData=this.db.list('/sportsAndHealth')
  }

  getData(){
    return this.eventsData
  }

  getFeaturedData(){
    return this.featuredData
  }

  getSelfImprovementData(){
    return this.SelfImprovementData
  }

  getTechnologyData(){
    return this.TechnologyData
  }

  getSportsAndHealthData(){
    return this.sportsAndHealthData
  }



  //business
  deleteData(key:any){
    return this.eventsData.remove(key)
  }

  newData(body: any) {
    return this.eventsData.push(body)
  }


  //featured
  deleteDataFeatured(key:any){
    return this.featuredData.remove(key)
  }

  newDataFeatured(body:any){
    return this.featuredData.push(body)
  }


  //SelfImprovement
  deleteDataSelfImprovement(key:any){
    return this.SelfImprovementData.remove(key)
  }

  newDataSelfImprovement(body:any){
    return this.SelfImprovementData.push(body)
  }


  //TechnologyData
  deleteDataTechnology(key:any){
    return this.TechnologyData.remove(key)
  }

  newDataTechnology(body:any){
    return this.TechnologyData.push(body)
  }


  //sportsAndHealthData
  deleteDatasportsAndHealth(key:any){
    return this.sportsAndHealthData.remove(key)
  }

  newDatasportsAndHealth(body:any){
    return this.sportsAndHealthData.push(body)
  }

  

  getEventById(eventId: string): AngularFireList<Event> {
    return this.db.list(`/events/${eventId}`);
  }

 
}
