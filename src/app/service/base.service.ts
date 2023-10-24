import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  addMessage(arg0: string) {
    throw new Error('Method not implemented.');
  }

  eventsData: AngularFireList<Event>

  constructor(private db:AngularFireDatabase) { 
    this.eventsData=this.db.list('/events')
  }

  getData(){
    return this.eventsData
  }

  deleteData(key:any){
    return this.eventsData.remove(key)
  }

  newData(body:any){
    return this.eventsData.push(body)
  }
}
