import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import * as  DBConfig from '../models/db-config';
import { Statement } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  createTableScripts: any;
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db: SQLiteDBConnection | null = null;
  constructor() { }

  // db operations
  intiDb() {
    try {
      this.createTables();
    } catch (err) {
      console.log('sql init error', err)
    }
  }

  async createTables() {
    const statements = DBConfig.CREATE_TABLES.map(qry => ({
      statement: qry,
      values: []
    }));
    const db = await this.sqlite.createConnection('userdb', false, 'no-encryption', 1, false);
    await db.open();
    const result = await db.executeSet(statements);
    console.log('tables created in batch', result);
    this.db = db
  }

  // User operations
  async addUser(name: string, email: string, age: number, bloodGroup: string, phoneNumber: string, password: string) {
    if (!this.db) {
      return;
    }
    try {
      let insertQry = 'INSERT OR REPLACE INTO USER(NAME,EMAIL,AGE,BLOOD_GROUP,PHONE_NUMBER,PASSWORD,IS_AUTH) VALUES (?,?,?,?,?,?,?)';
      await this.db.run(insertQry, [name, email, age, bloodGroup, phoneNumber, password, 0]);
    } catch (err) {
      console.log(err)
    }
  }
  getAuth(email: string, password: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let getQuery = 'SELECT * FROM USER WHERE EMAIL = ? AND PASSWORD = ?';
      let result = await this.db!.query(getQuery, [email, password]);
      console.log('user details db resp', result.values)
      if (result.values?.length && result.values.length > 0) {
        resolve(result.values)
      } else {
        resolve(false)
      }
    })
  }
  getUser():Promise<any>{
    return new Promise(async(resolve, reject)=>{
      try{
        let qry = 'SELECT * FROM USER';
        let result = await this.db!.query(qry);
        if(result.values?.length && result.values.length>0){
          resolve(result.values);
        }
      }catch(err){
        reject(false)
      }
    })
  }
  setAuth(email: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let updateQry = 'UPDATE USER SET IS_AUTH = ? WHERE EMAIL = ?';
      let result = await this.db!.query(updateQry, [1, email]);
      resolve(true);

    })
  }
  logOut(email: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const statements = DBConfig.CLEAR_TABLES.map(qry => ({
        statement: qry,
        values: []
      }));
      const result = await this.db?.executeSet(statements);
      console.log('tables removed in batch', result);
      resolve(true);
    })
  }

  async editUser() { }

  // Medicone operations
  async addMedicine(name:string,time:string, completion:number) :Promise<any>{
    return new Promise(async(resolve,reject)=>{
    try{
      let insertQry = 'INSERT OR REPLACE INTO MEDICINES(MEDICINE_NAME,TIME_TO_TAKE, COMPLETION) VALUES (?,?,?)';
      let result = await this.db!.run(insertQry, [name, time, completion]);
      resolve(result.changes?.lastId);

    } catch(err){
      console.log('add medicine err', err)
    } 
    })
   }
  async editMedicine(name:string,time:string, completion:number):Promise<boolean> {
    return new Promise(async(resolve,reject)=>{
    try{
      let insertQry = 'UPDATE MEDICINES SET NAME = ?, TIME = ?, COMPLETION = ?';
      await this.db!.run(insertQry, [name, time, completion]);
      resolve(true);

    }catch(err){
      console.log('edit medicine err',err)
    }
    })
  
  }
  async deleteMedicine(id:number):Promise<any> {
    return new Promise(async(resolve,reject)=>{
    try{
      let insertQry = 'DELETE FROM MEDICINES WHERE MEDICINE_ID = ?';
      let result = await this.db!.run(insertQry, [id])  ;
      resolve(true);
    }catch(err){
      console.log('delete medicines error',err);
      reject(false);
    }

    })
  
  }
  async getMedicine():Promise<any> {
    return new Promise(async(resolve,reject)=>{
    try{
      let insertQry = 'SELECT * FROM MEDICINES';
      const result = await this.db!.query(insertQry);

      resolve(result.values);
    }catch(err){
      console.log('get medicine error',err);
      reject(false);
    }
    })
  
  }

  // doctor operations
  async addDoctors(name: any, address: any, phoneNumber: any, specialized: any):Promise<any> {
    return new Promise(async(resolve, reject)=>{
      try {
        let insertQry = 'INSERT OR REPLACE INTO DOCTORS(NAME,ADDRESS,PHONE_NUMBER,SPECIALIZED) VALUES (?,?,?,?)';
        let result = await this.db!.run(insertQry, [name, address, phoneNumber, specialized]);
        resolve(result.changes?.lastId);
      } catch (err) {
        reject(false);
        console.log('add doc err',err)
      }
    } )
  }
  async editDoctors(name: any, address: any, phoneNumber: any, specialized: any, id: number):Promise<boolean> {
    return new Promise(async (resolve, reject)=>{
      try {
        let insertQry = 'UPDATE DOCTORS SET NAME = ?,ADDRESS = ?,PHONE_NUMBER = ?,SPECIALIZED = ? WHERE DOCT_ID = ?';
        await this.db!.run(insertQry, [name, address, phoneNumber, specialized, id]);
        resolve(true);
      } catch (err) {
        console.log('edit doc error',err);
        reject(false);
      }
  
    })

  }
  async deleteDoctors(id:number):Promise<boolean> { 
    return new Promise(async (resolve, reject)=>{
      try{
        let insertQry = 'DELETE FROM DOCTORS WHERE DOCT_ID = ?';
        await this.db!.run(insertQry, [id])  ;
        resolve(true);
      }catch(err){
        console.log('delete doctos error',err);
        reject(false);
      }
  
    })
  }

  async getDoctors():Promise<any>{
    return new Promise(async (resolve, reject)=>{
      try{
        let insertQry = 'SELECT * FROM DOCTORS';
        const result = await this.db!.query(insertQry);

        resolve(result.values);
      }catch(err){
        console.log('get doctos error',err);
        reject(false);
      }

    })
  }

  // diet operations
  async addDiet() { }
  async editDiet() { }
  async deleteDiet() { }

  // emergency operations 
  async addEmergency(name:string, phoneNumber:string, altPhoneNumber:string, age:string, address:string,hospitalContact:string, location:string, report:string):Promise<any> { 
    return new Promise(async(resolve, reject)=>{
      try {
        let insertQry = 'INSERT OR REPLACE INTO EMERGENCY(NAME,PHONE_NUMBER,ALTERNATE_PHONE_NUMBER,AGE, ADDRESS, HOSPITAL_CONTACT, LOCATION, REPORT) VALUES (?,?,?,?,?,?,?,?)';
        let result = await this.db!.run(insertQry, [name, phoneNumber, altPhoneNumber, age, address, location, report]);
        resolve(result.changes?.lastId);
      } catch (err) {
        console.log('add emergency err',err);
        reject(false);
      }
    })


  }
  async editEmergency(name: string, phoneNumber: string, altPhoneNumber: string, age:number, address: string, hospitalContact:string,  location: string, report: string, id:number):Promise<any> { 
    return new Promise(async(resolve, reject)=>{
      try{
        let updateQry = 'UPDATE EMERGENCY SET NAME = ?,PHONE_NUMBER = ?, ALTERNATE_PHONE_NUMBER = ?, AGE = ?, ADDRESS = ?, HOSPITAL_CONTACT = ?, LOCATION = ?, REPORT = ? WHERE ID = ?';
        await this.db!.run(updateQry, [name, phoneNumber, altPhoneNumber, age, address, hospitalContact, location, report, id]);
        resolve(true);
      }catch(err){
        console.log('edit emergency err',err);
        reject(false);
      }
  
    })
  }
  async deleteEmergency(id: number):Promise<boolean>  { 
    return new Promise(async(resolve, reject)=>{
      try{
        let updateQry = 'DELETE FROM EMERGENCY WHERE ID=?';
        await this.db!.run(updateQry, [id]);
        resolve(true);
      }catch(err){
        console.log('delete emergency err',err);
        reject(false);
      }

    })
  }
  async getEmergency(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let insertQry = 'SELECT * FROM EMERGENCY';
        const result = await this.db!.query(insertQry);

        resolve(result.values);
      } catch (err) {
        console.log('get emergency error', err);
        reject(false);
      }

    })
  }

}
