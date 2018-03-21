import React,{Component} from 'react';
import{
  ToastAndroid,
} from 'react-native';
import SQLiteStorage from 'react-native-sqlite-storage';
SQLiteStorage.DEBUG(true);
var database_name = "Bible.db";//数据库文件
var database_version = "1.0";//版本号
var database_displayname = "Bible_LocalDB";
var database_size = -1;//-1应该是表示无限制
var db;
export default class  SQLite extends Component{
	componentWillUnmount(){
    if(db){
        this._successCB('close');
        db.close();
    }else {
        console.log("SQLiteStorage not open");
    }
  }

  open(){
    db = SQLiteStorage.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size,
      ()=>{
          this._successCB('open');
      },
      (err)=>{
          this._errorCB('open',err);
      });
    return db;
  }

    //创建用户表
  createTable(){
        if (!db) {
            this.open();
        }

        db.transaction((tx)=> {
        tx.executeSql('CREATE TABLE IF NOT EXISTS USER(' +
            'id INTEGER PRIMARY KEY  AUTOINCREMENT,' +
            'name varchar,'+
            'qq VARCHAR)'
            , [], ()=> {
                this._successCB('executeSql');
            }, (err)=> {
                this._errorCB('executeSql', err);
            });
        }, (err)=> {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, ()=> {
            this._successCB('transaction');
        })
    }
  deleteData(){
    if (!db) {
        this.open();
    }
    db.transaction((tx)=>{
      tx.executeSql('delete from user',[],()=>{

      });
    });
  }
  dropTable(){
    db.transaction((tx)=>{
      tx.executeSql('drop table user',[],()=>{});
    },(err)=>{
      this._errorCB('transaction', err);
    },()=>{
      this._successCB('transaction');
    });
  }

insertUserData(userData){
    let len = userData.length;
    if (!db) {
        this.open();
    }
    this.createTable();
    this.deleteData();
    db.transaction((tx)=>{
       for(let i=0; i<len; i++){
        var user = userData[i];
        let name= user.name;
        let qq = user.qq;
        let sql = "INSERT INTO user(name,qq)"+
        "values(?,?)";
        tx.executeSql(sql,[name,age,sex,phone,email,qq],()=>{},
        (err)=>{
            console.log(err);
          }
        );
      }
    },(error)=>{
      this._errorCB('transaction', error);
      console.log("数据插入失败",ToastAndroid.SHORT);
    },()=>{
      this._successCB('transaction insert data');
      console.log("成功插入 "+len+" 条用户数据");
    });
  }
  close(){
      if(db){
          this._successCB('close');
          db.close();
      }else {
          console.log("SQLiteStorage not open");
      }
      db = null;
  }
  _successCB(name){
    console.log("SQLiteStorage "+name+" success");
  }
  _errorCB(name, err){
    console.log("SQLiteStorage "+name);
    console.log(err);
  }
	render(){
		return null;
	}
};
