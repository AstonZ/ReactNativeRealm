export default class Sentence {
    constructor(props){
        // this.id=1
        // this.book_type=0
        // this.book_index=1
        // this.chapter_index=1
        // this.sent_index=1

        // this.bible_index="创 1:1",
        // this.book_name="创世纪"
        // this.chapter_name='起初'
        // this.raw_content='嘿哈嘿看接口就'
        // this.note_id='note001'

        // this.title_to='article001'
        // this.star_to='article002'
        // this.is_hl=false,
        // this.annos="[{'location':'1','length':'2','article_id':'article0001',{'location':'5','length':'2','article_id':'article0002'}]"
        // this.other_links='创 1:10,咏 148,'
    }

    static mockSentList(){
        let aSent = {
            id: 1,
            book_type:0,
            book_index:1,
            chapter_index:1,
            sent_index:1,
            bible_index:"创 1:1",
            book_name:"创世纪",
            chapter_name:'神的创造',
            raw_content:'起初，神创造天地。',
            note_id:'note001',
            title_to:'article001',
            star_to:'article002',
            is_hl:false,
            annos:"[{'location':'1','length':'2','article_id':'article0001',{'location':'5','length':'2','article_id':'article0002'}]",
            other_links:'创 1:10,咏 148'
        }

       let bSent = {
            id: 2,
            book_type:0,
            book_index:1,
            chapter_index:1,
            sent_index:2,
            bible_index:"创 1:2",
            book_name:"创世纪",
            chapter_name:'神的创造',
            raw_content:'地是空虚混沌，渊面黑暗；神的灵运行在水面上。',
            is_hl:true,
            annos:"[{'location':'1','length':'2','article_id':'article0001',{'location':'5','length':'2','article_id':'article0002'}]",
            other_links:'创 1:10,咏 148,'
       }

       return [aSent,bSent]
    }

}