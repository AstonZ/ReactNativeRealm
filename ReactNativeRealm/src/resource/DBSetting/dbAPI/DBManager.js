
var _instance = null
import SQLiteStorage from 'react-native-sqlite-storage'
import Sentence from '../model/Sentence'
import Book from '../model/Book'
import Chapter from '../model/Chapter'
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
        console.err("SQLiteStorage "+name);
        console.log(err);
    }

    /**
     * Open Database Must be called before any db actions
     */
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

    closeDB(){

    }


    /**
     * Create Table
     */
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
    
    /**
     * Tool, Turn sentence object to insert sql
     * @param {*} sentence 
     */
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
            // array to json string
            let annoList = sentence.annos
            var annos = null;
            if(annoList.length>0){
                annos = JSON.stringify(annoList)
            }
            let other_links=sentence.other_links

            let sql = 'insert or replace into '+ kTableSentence +
            '(id,book_type,book_index,chapter_index,sent_index,'+
            'bible_index,book_name,chapter_name,raw_content,note_id,'+
            'title_to,star_to,is_hl,annos,other_links)'+
            `values(${id},${book_type},${book_index},${chapter_index},${sent_index},`+
            `"${bible_index}","${book_name}","${chapter_name}","${raw_content}","${note_id}",`+
            `"${title_to}","${star_to}",${is_hl},'${annos}',"${other_links}")`

            return sql
    }

    /**
     * Interface insert or replace Sentence Object
     * @param {} sentence 
     * @param {*} sucCB 
     * @param {*} failCB 
     */
    insertSentence(sentence,sucCB,failCB){
        if (sentence===null || sentence === undefined) return;
        if (!db) openDB()

        db.transaction( (tx) =>{
            sql=this._sqlToInsertSingleSentence(sentence)
            tx.executeSql(sql,[],()=>{
                // execute success
                if(sucCB)sucCB("insert single sentence success")
            },err=>{
                if(failCB)failCB("insert singel sentence failed: " + err)
                console.log("Execute insert sentence error = ", err)
            })
        },error=>{
            this._errorCB('Insert user', error)
        },()=>{
            this._successCB('Insert user')
        })
    }

    /**
     * insert sentence list 
     * @param {*} sentList must be [Sentence]
     * @param {*} onCompletion (isAllSuc=是否全部插入成功, failedIndexes=插入失败的索引)
     */
    insertSentenceList(sentList,onCompletion){
        if (sentList===null || sentList === undefined || sentList.length==0) return;
        if (!db) openDB()
        console.log("Start inset " + sentList)
        db.transaction( (tx) =>{
            let len = sentList.length
            let sucNum=0 //record sucnum
            let failIndexes=[]//record failed indexes
            for (let i=0; i<len; i++){
                let sentence=sentList[i]
                let sql=this._sqlToInsertSingleSentence(sentence)
                tx.executeSql(sql,[],()=>{
                    // execute success
                    sucNum+=1
                    if (sucNum+failIndexes.length==len){
                        if(onCompletion){
                            if(sucNum==len) onCompletion(true,null)
                            else onCompletion(false,failIndexes)
                        }
                    }
                },err=>{
                    failIndexes.push(i)
                    console.log("Execute insert sentence error = ", err)
                    if (sucNum+failIndexes.length==len){
                        if(onCompletion){
                            if(sucNum==len) onCompletion(true,null)
                            else onCompletion(false,failIndexes)
                        }
                    }
                })

            }
            
        },error=>{
            this._errorCB('Insert user', error)
        },()=>{
            this._successCB('Insert user')
        })
    }

    /**
     * 直接执行服务器下发的sqlList
     * @param {*} sql 
     */
    insertSentenceWithSqlList(sqlList,sucCB,failCB){
        if (sqlList===null || sqlList === undefined || sqlList.length==0) return;
        if (!db) openDB()
        console.log("Start inset " + sqlList)
        db.transaction( (tx) =>{
            let len = sqlList.length
            let sucNum=0 //record sucnum
            let failIndexes=[]//record failed indexes
            for (let i=0; i<len; i++){
                let sql=sqlList[i]
                tx.executeSql(sql,[],()=>{
                    // execute success
                    sucNum+=1
                    if (sucNum+failIndexes.length==len){
                        if(onCompletion){
                            if(sucNum==len) onCompletion(true,null)
                            else onCompletion(false,failIndexes)
                        }
                    }
                },err=>{
                    failIndexes.push(i)
                    console.log("Execute insert sentence error = ", err)
                    if (sucNum+failIndexes.length==len){
                        if(onCompletion){
                            if(sucNum==len) onCompletion(true,null)
                            else onCompletion(false,failIndexes)
                        }
                    }
                })

            }
            
        },error=>{
            this._errorCB('Insert user', error)
        },()=>{
            this._successCB('Insert user')
        })
    }

    /**
     * Fetch All Books
     * return [Book] 
     * property: book_type, book_index, book_name
     * @param {} sucCB 
     * @param {*} failCB 
     */
    fetchAllBooks(sucCB,failCB){
        if (!db) this.openDB()
        let sql = `select distinct book_type, book_index, book_name from ${kTableSentence}`
        console.log("Fetch all books sql: "+ sql)
        db.transaction(tx =>{
            tx.executeSql(sql,[],(tx,results)=>{
                console.log("Query Complete find results = %o", results)
                let allBooks = []
                let rows=results.rows.raw()
                rows.map(row=>{
                    let aBook = this._rowDataToBook(row)
                    allBooks.push(aBook)
                    console.log(`Find a Book Book_index ${row.book_index} name: ${row.book_name}`)
                })
                if (sucCB) sucCB(allBooks)
            }, error=>{
                console.log("Fetch All Book Failed: ", error)
                if (failCB) failCB("Fetch All Book Failed: ", error)
            })
        },err=>{
            this._errorCB('fetchAllBooks',err)
        },()=>{
            this._successCB('fetchAllBooks')
        })
    }

    /**
     * Find chapters of a book, without sentence data
     * @param {*} book_index 
     * @param {*} sucCB 
     * @param {*} failCB 
     */
    fetchChapters(book_index, sucCB, failCB){
        if (!db) this.openDB()
        let sql = `select distinct chapter_index, chapter_name, book_name from ${kTableSentence} where book_index = ${book_index}`
        db.transaction(tx => {
            
            tx.executeSql(sql,[],(tx, results)=>{
                    let allChapters = []
                    let rows = results.rows.raw()
                    rows.map(data=>{
                        let aChap = this._rowDataToChapter(data,book_index)
                        allChapters.push(aChap)
                    })
                    sucCB(allChapters)
                }, error=>{
                    console.log("Fetch All Book Failed: "+ error)
                    failCB("Fetch All Chapters Failed: "+error)
                })

            },err=>{
                this._errorCB('Fetch All Chapter',err)
            },()=>{
                this._successCB('Fetch All Chapter')
            })
    }

    /**
     * Fetch chapter data with sentences fullfilled
     * @param {*} book_index 
     * @param {*} chapter_index 
     * @param {*} sucCB a Chapter Object with sentences as [Sentences]
     * @param {*} failCB 
     */
    fetchChapterWithSentences(book_index,chapter_index,sucCB,failCB){
        if (!db) this.openDB()
        let sql = `select * from ${kTableSentence} where book_index = ${book_index} and chapter_index = ${chapter_index}`
        db.transaction(tx => {
            
            tx.executeSql(sql,[],(tx, results)=>{
                    let allSentences = []
                    let rows = results.rows.raw()
                    var aChapter = null
                    rows.map(data=>{
                        let aSent = this._rowDataToSentence(data)
                        if(aChapter===null){
                            aChapter = new Chapter()
                            aChapter.book_index = book_index
                            aChapter.book_name = aSent.book_name
                            aChapter.book_type = aSent.book_type
                            aChapter.chapter_index=chapter_index
                            aChapter.chapter_name = aSent.chapter_name
                            aChapter.sentences=[]
                        }
                        aChapter.sentences.push(aSent)
                    })
                    if(sucCB) sucCB(aChapter)
                }, error=>{
                    console.log("Fetch chapter with fulldata Failed: "+ error)
                    if(failCB) failCB("Fetch chapter with fulldata Failed: "+error)
                })

            },err=>{
                this._errorCB('Fetch chapter with fulldata',err)
            },()=>{
                this._successCB('Fetch chapter with fulldata')
            })
    }

    /**
     * fetchSenteces of a chapter
     * @param {*} book_index 
     * @param {*} chapter_index 
     * @param {*} sucCB 
     * @param {*} failCB 
     */
    fetchSentences(book_index,chapter_index,sucCB,failCB){
        if(!db) this.openDB()
        let sql= `select * from ${kTableSentence} where book_index = ${book_index} and chapter_index = ${chapter_index}`
        db.transaction(tx=>{

            tx.executeSql(sql,[],(tx,results)=>{
                let allSents=[]
                let rows=results.rows.raw()
                rows.map(data=>{
                    let aSent = this._rowDataToSentence(data)
                    allSents.push(aSent)
                })
                if(sucCB)sucCB(allSents)
            },err=>{
                if(failCB)failCB("fetch sentence failed error: "+err)
            })//end execution

        },error=>{
            this._errorCB("Fetch sentences ", error)
        },()=>{
            this._successCB("Fetch sentences")
        })        
    }


    /**
     * Fetch the Chapter with sentence data using book_prefix and chapterID
     * @returns a Chapter Object. With its sentences fullfilled as property
     * @param {} book_prefix like '咏' or '创一'
     * @param {*} chapter_index  
     * @param {*} sucCB 
     * @param {*} failCB 
     */
    fetchChapterWithBibleIndex(book_prefix,chapter_index,sucCB, failCB){
        if(!db) this.openDB()
        let sql = `select * from ${kTableSentence} where bible_index like '${book_prefix}%' and chapter_index = ${chapter_index}`

        // 执行数据库操作
        db.transaction(tx=>{

            tx.executeSql(sql,[],(tx,results)=>{
                let allSentences = []
                let rows = results.rows.raw()
                var aChapter = null
                rows.map(data=>{
                    let aSent = this._rowDataToSentence(data)
                    if(aChapter===null){
                        aChapter = new Chapter()
                        aChapter.book_index = aSent.book_index
                        aChapter.book_name = aSent.book_name
                        aChapter.book_type = aSent.book_type
                        aChapter.chapter_index=chapter_index
                        aChapter.chapter_name = aSent.chapter_name
                        aChapter.sentences=[]
                    }
                    aChapter.sentences.push(aSent)
                })
                if(sucCB) sucCB(aChapter)
            },err=>{
                if(failCB) failCB('Fetch Chapter with bible_index error: ', err)
            })
            
        },error=>{
            this._errorCB('Transaction Error', error)
        },()=>{
            this._successCB('Transaction Success')
        })  
    }

    updateNote


    /**
     * 便利方法 数据库行数据转化成Book对象
     * @param {*} rowData 
     */
    _rowDataToBook=rowData=>{
        let aBook = new Book()
        aBook.book_index=row.book_index
        aBook.book_name=row.book_name
        aBook.book_type=row.book_type
        return aBook
    }
    /**
     * 便利方法 数据库行数据转化成Chapter对象
     * @param {*} rowData 
     */
    _rowDataToChapter=(rowData, book_index)=>{
        let aChap = new Chapter()
        aChap.book_index=book_index
        aChap.chapter_index=data.chapter_index
        aChap.chapter_name=data.chapter_name
        aChap.book_name=data.book_name
        return aChap
    }
    /**
     * 便利方法 数据库行数据转化成Sentence对象
     * @param {*} rowData 
     */
    _rowDataToSentence(rowData){
        let aSent = new Sentence()
        aSent.id=rowData.id
        aSent.book_type=rowData.book_type
        aSent.book_index=rowData.book_index
        aSent.chapter_index=rowData.chapter_index
        aSent.sent_index=rowData.sent_index

        aSent.bible_index=rowData.bible_index
        aSent.book_name=rowData.book_name
        aSent.chapter_name=rowData.chapter_name
        aSent.raw_content=rowData.raw_content
        aSent.note_id=rowData.note_id

        aSent.title_to=rowData.title_to
        aSent.star_to=rowData.star_to
        aSent.is_hl=rowData.is_hl
        annoJsonStr = rowData.annos
        if(annoJsonStr.length>2){
            aSent.annos= JSON.parse(annoJsonStr)
        }else{
            aSent.annos=null;
        }
        aSent.other_links=rowData.other_links
        return aSent
    }


    __placeholder=()=>{

        if(!db) this.openDB
        let sql= `select * from ${kTableSentence} where book_index = ${book_index} and chapter_index = ${chapter_index}`
        db.transaction(tx=>{

            tx.executeSql(sql,[],(tx,results)=>{
                
            },err=>{

            })
            
        },error=>{
            this._errorCB('Transaction Error', error)
        },()=>{
            this._successCB('Transaction Success')
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