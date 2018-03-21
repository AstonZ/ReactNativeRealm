## Create local table
CREATE TABLE IF NOT EXISTS SentenceTable (id integer PRIMARY KEY AUTOINCREMENT,book_type integer,book_index integer,chapter_index integer,sent_index integer,bible_index text,book_name text,chapter_name text,raw_content text,note_id integer,title_to text,star_to text,is_hl integer,annos text,other_links text)

## Insert or replace sentence
insert or replace into SentenceTable(id,book_type,book_index,chapter_index,sent_index,bible_index,book_name,chapter_name,raw_content,note_id,title_to,star_to,is_hl,annos,other_links)values(1,0,1,1,1,\"创 1:1\",\"创世纪\",\"神的创造\",\"起初，神创造天地。\",\"note001\",\"article001\",\"article002\",0,\"[{'location':'1','length':'2','article_id':'article0001',{'location':'5','length':'2','article_id':'article0002'}]\",\"创 1:10,咏 148\")

## 直接插入完整句子列表数据结构


```
DBManager.sharedInstace().insertSentenceList(sentList)
```

```
[
    {
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
    },
    {
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
            other_links:'创 1:10,咏 148'
       }
]
```