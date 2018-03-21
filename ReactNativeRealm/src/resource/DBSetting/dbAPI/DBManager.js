
var _instance = null
import SQLiteStorage from 'react-native-sqlite-storage'
import Sentence from '../model/Sentence'
SQLiteStorage.DEBUG(true)

const database_name = "Bible.db"
const database_version = '1.0'
const database_displayname = 'Bible_localDB'
const database_size = -1

// table names
const kTableSentence = 'SentenceTable'
// DB 
var db;

export default class DBHandler {
    
    // define callbacks
    _successCB(name){
        console.log("SQLiteStorage "+name+" success");
    }

    _errorCB(name, err){
        console.log("SQLiteStorage "+name);
        console.log(err);
    }

    // Open DB
    openDB(){
        db = SQLiteStorage.openDatabase(
          database_name,
          database_version,
          database_displayname,
          database_size,
          ()=>{
              this._successCB('open DB ');
          },
          (err)=>{
              this._errorCB('open DB ',err);
          });
        return db;
      }


    //   Create Table
    createTable(){
        if(!db) this.openDB()
        db.transaction((tx)=>{
            let createSentenceTable = 'CREATE TABLE IF NOT EXISTS SentenceTable ('+
            'id integer PRIMARY KEY AUTOINCREMENT,' +
            'book_type integer,' +
            'book_index integer,' +
            'chapter_index integer,' +
            'sent_index integer,' +

            'bible_index text,' +
            'book_name text,' +
            'chapter_name text,' +
            'raw_content text,' +
            'note_id integer,' +

            'title_to text,' +
            'star_to text,' +
            'is_hl integer,' +
            'annos text,' +
            'other_links text)'
            console.log('Create table SQL: ' + createSentenceTable)
            tx.executeSql(createSentenceTable,[],()=>{
                this._successCB('Create Table')
            }, err=>{
                this._errorCB('Create Table', err)
            })
        },err=>{
            this._errorCB('Transaction', err)
        },()=>{
            this._successCB('Transaction')
        })
    }

    // Drop Table
    dropSentenceTable(){
        if (!db) this.openDB()
        db.transaction((tx)=>{
            tx.executeSql('drop table '+kTableSentence,[],()=>{});
          },(err)=>{
            this._errorCB('drop table', err);
          },()=>{
            this._successCB('drop table');
          });
    }
    
    // Generate sql to insert singel sentence
    _sqlToInsertSingleSentence(sentence){
        let id = sentence.id
            let book_type=sentence.book_type
            let book_index=sentence.book_index
            let chapter_index=sentence.chapter_index
            let sent_index=sentence.sent_index
    
            let bible_index=sentence.bible_index
            let book_name=sentence.book_name
            let chapter_name=sentence.chapter_name
            let raw_content=sentence.raw_content
            let note_id=sentence.note_id
    
            let title_to=sentence.title_to
            let star_to=sentence.star_to
            let is_hl=sentence.is_hl? 1:0
            let annos=sentence.annos
            let other_links=sentence.other_links

            let sql = 'insert or replace into '+ kTableSentence +
            '(id,book_type,book_index,chapter_index,sent_index,'+
            'bible_index,book_name,chapter_name,raw_content,note_id,'+
            'title_to,star_to,is_hl,annos,other_links)'+
            `values(${id},${book_type},${book_index},${chapter_index},${sent_index},`+
            `"${bible_index}","${book_name}","${chapter_name}","${raw_content}","${note_id}",`+
            `"${title_to}","${star_to}",${is_hl},"${annos}","${other_links}")`

            // This can not be excuted
            // 'values(?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?)'
            return sql
    }

    // insert singel sentence
    insertSentence(sentence){
        if (sentence===null || sentence === undefined) return;
        if (!db) openDB()

        db.transaction( (tx) =>{
            sql=this._sqlToInsertSingleSentence(sentence)
            tx.executeSql(sql,[],()=>{
                // execute success
            },err=>{
                console.log("Execute insert sentence error = ", err)
            })
        },error=>{
            this._errorCB('Insert user', error)
        },()=>{
            this._successCB('Insert user')
        })
    }

    // insert sentence list as dict array
    insertSentenceList(sentList){
        if (sentList===null || sentList === undefined || sentList.length==0) return;
        if (!db) openDB()
        console.log("Start inset " + sentList)
        db.transaction( (tx) =>{
            for (let i=0; i<sentList.length; i++){
                sentence=sentList[i]
                sql=this._sqlToInsertSingleSentence(sentence)
                tx.executeSql(sql,[],()=>{
                    // execute success
                },err=>{
                    console.log("Execute insert sentence error = ", err)
                })
            }
        },error=>{
            this._errorCB('Insert user', error)
        },()=>{
            this._successCB('Insert user')
        })
    }


    // fetch all books
    fetchAllBooks(){
        if (!db) this.openDB()
        let sql = `select book_index, book_name from ${kTableSentence}`
        console.log("Fetch all books sql: "+ sql)
        db.transaction(tx =>{
            tx.executeSql(sql,[],(tx,result)=>{
                let len = result.length

                for(let i=0;i<len;i++){
                    let row=result.rows.item(i)
                    console.log('Find book %o', row)
                }
            })

        },err=>{
            this._errorCB('fetchAllBooks',err)
        },()=>{
            this._successCB('fetchAllBooks')
        })
    }


    // Constructor
    constructor(props){
        if (!_instance) {
            _instance=this;

        }
    }

   static sharedInstace(){
        let singleton = new DBHandler()
        return singleton
    }


}