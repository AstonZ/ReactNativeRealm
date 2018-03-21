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

 _initialState =()=>{
  // let AnnoSchema = Schema.Annotation
  // let SentenceSchema = Schema.Sentence
  // this.db=new Realm({schema:[AnnoSchema, SentenceSchema]})
 }

 _onAddSingleData = ()=>{
  DBManager.sharedInstace().dropSentenceTable()
  DBManager.sharedInstace().createTable()
  let aSent = Sentence.mockSentList()[0]
  DBManager.sharedInstace().insertSentence(aSent)
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
