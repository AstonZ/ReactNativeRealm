import Schema from '../constraint/Schema'
// const Realm = require('realm')
var _instance = null

const TableSentence = 'Sentence'

export default class DBHandler {
    
    constructor(props){
        if (!_instance) {
            _instance=this;

        }
    }

   static sharedInstace(){
        let singleton = new DBHandler()
        return singleton
    }


    // insert 
    insertSent = sentence =>{

    }

    updateSent = sentence => {

    }



    fetchAllBooks= ()=> {

    }

    fetchAllChapters = (book_id)=>{

    }

    fetchAllSentences = (book_id, chapter_id)=>{

    }

    // update book with sql






}