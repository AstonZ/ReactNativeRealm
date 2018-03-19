export default {

    Annotation:{
        name:'Annotation',
        properties:{
            location:'int',
            length:'int',
            article_id:'string'
        }
    },

    Sentence: {
        name: 'Sentence',
        primaryKey: 'id',
        properties:{
            id:'int',
            book_type:'int',
            book_index:'int',
            chapter_index:'int',
            bible_index:'string',
            book_name:'string',
            chapter_name:'string',
            sent_index:'int',
            raw_content:'string',
            note_id:'string?',
            title_to:'string?',
            star_to:'string?',
            is_hl:{type:'bool', default:false},
            annos:'Annotaion[]?',
            other_links:'string?'
        }
    }
}