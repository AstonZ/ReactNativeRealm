import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
// import DBHander from './src/resource/DBSetting/dbAPI/DBHandler'
// import SQLite from './src/resource/DBSetting/dbAPI/SQLite'
import DBManager from './src/resource/DBSetting/dbAPI/DBManager'
import Sentence from './src/resource/DBSetting/model/Sentence'

export default class App extends Component {

 constructor(props){
   super(props)
 }

 _onAddSingleData = ()=>{
  DBManager.sharedInstace().dropSentenceTable()
  DBManager.sharedInstace().createTable()
  let aSent = Sentence.mockSentList()[0]
  DBManager.sharedInstace().insertSentence(aSent)
 }

 _onAddMultipleData = ()=>{
  DBManager.sharedInstace().dropSentenceTable()
  DBManager.sharedInstace().createTable()
  let sentList = Sentence.mockSentList()
  DBManager.sharedInstace().insertSentenceList(sentList,(isAllSuc, failedIndexes)=>{
    if(isAllSuc) console.log("Insert Sentence List Success")
    else console.log("insert sentence failed indexes %o", failedIndexes)
  })
 }

 _onFetchSingelData = ()=>{

  // let allSents = this.db.objects('Sentence')
  // let theSent = allSents.filtered('bible_index = "创 1:1"')
  // console.log(theSent.raw_content)
 }

 _onFetchAllBooks =()=>{
  DBManager.sharedInstace().fetchAllBooks(bookList=>{
    console.log("Find All book result %o", bookList)
  },error=>{
    console.log("Find all book error: " + error)
  })
 }

 _onFetchChaptersOfBook = ()=> {
   DBManager.sharedInstace().fetchChapters(1, chapters=>{
    console.log("Find All Chapters result %o", chapters)
   }, error=>{
    console.log("Find All Chapters result: " + error)
   })
 }
 _onFetchAllSentences=()=>{
   DBManager.sharedInstace().fetchSentences(1,1,sentList=>{
    console.log("Fetch Sent List = %o", sentList)
   },error=>{
    console.log("Fetch Sent List error:", error)
   })
 }

//  获取某个book_index,chapter_index 的完整Chapter
 _onFetchChapterFullData=()=>{
  DBManager.sharedInstace().fetchChapterWithSentences(1,1,aChapter=>{
    console.log("Fetch Full Chapter Success: %o", aChapter)
  },error=>{
    console.log("Fetch Full Chapter  error:", error)
  })
 }

//  用于跳转 根据BibleIndex获取完整Chapter
 _onFetchChapterWithBibleIndex(){
  let bible_index = "创 1:1"
  // 如果是本书跳转，比如只有"1:10" 补充完整后再调用这个接口

  // 格式校验 目前只做了"咏 1:10"格式的，
  if (bible_index.indexOf(' ')==-1 || bible_index.indexOf(':')==-1){
    console.log('Type error: ' + bible_index + ' is not standard bible index')
    return
  }

  // 待补充 "咏 148"格式的

  //切割 bible_index "咏 1:1"{
  let firArr = bible_index.split(' ')
  let prefix = firArr[0]
  let numbers = firArr[1]

  let numArr= numbers.split(':')
  let chapter_index = numArr[0]
  let sentence_index = numArr[1]

  DBManager.sharedInstace().fetchChapterWithBibleIndex(prefix,
    chapter_index,
    aChapter=>{
    console.log("Fetch Full Chapter Success: %o", aChapter)
    },error=>{
    console.log("Fetch Full Chapter  error:", error)
    })
 }


 _onFetchMutipleData =()=>{

 }

 _onDeleateData = ()=>{

 }


  render() {
    return (
      <Container>
        <Header />
        <Content>
          <List>
            <ListItem itemDivider>
              <Text>Add</Text>
            </ListItem>                    
            <ListItem onPress={this._onAddSingleData}>
              <Text>Add One</Text>
            </ListItem>
            <ListItem onPress={this._onAddMultipleData}>
              <Text>Add Multiple</Text>
            </ListItem>

            <ListItem itemDivider>
              <Text>Fetch</Text>
            </ListItem>  
            <ListItem onPress={this._onFetchSingelData}>
              <Text>Fetch One</Text>
            </ListItem>
            <ListItem onPress={this._onFetchAllBooks}>
              <Text>Fetch All Books</Text>
            </ListItem>
            <ListItem onPress={this._onFetchChaptersOfBook}>
              <Text>Fetch Chapters of Book</Text>
            </ListItem>
            <ListItem onPress={this._onFetchAllSentences}>
              <Text>Fetch Sentences of Chapter 1 Book 1</Text>
            </ListItem>
            <ListItem onPress={this._onFetchChapterFullData}>
              <Text>Fetch Chapter 1 Full Data of Book 1</Text>
            </ListItem>
            <ListItem onPress={this._onFetchChapterWithBibleIndex}>
              <Text>Fetch Chapter With "创 1:1"</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
