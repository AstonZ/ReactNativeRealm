import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import DBHander from './src/resource/DBSetting/dbAPI/DBHandler'

export default class App extends Component {

 constructor(props){
   super(props)
 }

 _initialState =()=>{
  // let AnnoSchema = Schema.Annotation
  // let SentenceSchema = Schema.Sentence
  // this.db=new Realm({schema:[AnnoSchema, SentenceSchema]})
 }

 _onAddSingleData = ()=>{
  let sentence = {
    id: 1,
    book_type:0,
    book_index:1,
    chapter_index:1,
    sent_index:1,
    bible_index:"创 1:1",
    book_name:"创世纪",
    chapter_name:'起初',
    raw_content:'嘿哈嘿看接口就',
    note_id:'note001',
    title_to:'article001',
    star_to:'article002',
    is_hl:false,
    annos:[{
        location:1,
        length:2,
        article_id:'article001'
    }],
    other_links:'创 1:10,咏 148,'
    }
  DBHander.sharedInstace().insertSent(sentence);
 }

 _onAddMultipleData = ()=>{

 }

 _onFetchSingelData = ()=>{
  // let allSents = this.db.objects('Sentence')
  // let theSent = allSents.filtered('bible_index = "创 1:1"')
  // console.log(theSent.raw_content)
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
            <ListItem>
              <Text>Add Multiple</Text>
            </ListItem>

            <ListItem itemDivider>
              <Text>Fetch</Text>
            </ListItem>  
            <ListItem onPress={this._onFetchSingelData}>
              <Text>Fetch One</Text>
            </ListItem>
            <ListItem>
              <Text>Fetch All</Text>
            </ListItem>
            <ListItem>
              <Text>Fetch Filtered</Text>
            </ListItem>


          </List>
        </Content>
      </Container>
    );
  }
}
