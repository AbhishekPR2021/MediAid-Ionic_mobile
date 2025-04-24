import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import * as  DBConfig from '../models/db-config';
import { Statement } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  createTableScripts:any;
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db:SQLiteDBConnection | null = null;
  constructor() { }

  // db operations
  intiDb(){
    try{
      this.createTables();
    }catch(err){
      console.log('sql init error',err)
    }
  }

  async createTables(){
    const statements = DBConfig.CREATE_TABLES.map(qry=>({
      statement:qry,
      values:[]
    }));
    const db = await this.sqlite.createConnection('userdb',false,'no-encryption',1,false);
    await db.open();
    const result = await db.executeSet(statements);
    console.log('tables created in batch',result);
    this.db =db
  }

  // User operations
  async addUser(name:string, email:string, age:number, bloodGroup:string, phoneNumber:string, password:string){
    if(!this.db){
      return;
    } 
    try{
      let insertQry = 'INSERT OR REPLACE INTO USER(NAME,EMAIL,AGE,BLOOD_GROUP,PHONE_NUMBER,PASSWORD) VALUES (?,?,?,?,?,?)';
      await this.db.run(insertQry,[name, email,age,bloodGroup,phoneNumber,password]);
    } catch(err){
      console.log(err)
    } 
  }
  getAuth(email:string,password:string):Promise<boolean>{
    return new Promise(async (resolve, reject)=>{
      let getQuery = 'SELECT * FROM USER WHERE EMAIL = ? AND PASSWORD = ?';
      let result = await this.db!.query(getQuery,[email,password]);
      console.log('db resp',result.values)
      if(result.values?.length && result.values.length>0){
        resolve(true)
      }else{
        resolve(false)
      }
      
    })

  }
  async getUser(){
    if(!this.db){
      console.log('db not initialized');
      return;
    } 

  }
  async editUser(){}
  async deleteUser(){}

  // Medicone operations
  async addMedicine(){}
  async editMedicine(){}
  async deleteMedicine(){}

  // doctor operations
  async addDoctors(){}
  async editDoctors(){}
  async deleteDoctors(){}

// diet operations
  async addDiet(){}
  async editDiet(){}
  async deleteDiet(){}

  // emergency operations
  async addEmergency(){}
  async editEmergency(){}
  async deleteEmergency(){}

}
