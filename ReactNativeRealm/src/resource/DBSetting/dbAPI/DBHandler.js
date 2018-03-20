

import Schema from '../constraint/Schema'
const Realm = require('realm')
var _instance = null

const TableSentence = 'Sentence'

export default class DBHandler {
    
    constructor(props){
        if (!_instance) {
            _instance=this;
            this.db = new Realm(
                {
                    path: 'Bible.realm',
                    schema:[Schema.Annotation, Schema.Sentence]
                }
            )
        }
    }

   static sharedInstace(){
        let singleton = new DBHandler()
        return singleton
    }


    // insert 
    insertSent = sentence =>{
        this.db.write(()=>{
            this.db.create(TableSentence,sentence, false)
        })
    }

    updateSent = sentence => {
        this.db.write(()=>{
            this.db.create(TableSentence, sentence, true)
        })
    }



    fetchAllBooks= ()=> {
        let bookList = this.db.write(()=>{
            
        })
    }

    fetchAllChapters = (book_id)=>{

    }

    fetchAllSentences = (book_id, chapter_id)=>{

    }

    // update book with sql






}