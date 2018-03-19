import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import Schema from './src/resource/DBSetting/constraint/Schema'

const Realm = require('realm')


export default class ListDividerExample extends Component {

 constructor(props){
   super(props)
   this.db=null
   this._initialState()
 }

 _initialState =()=>{
  let AnnoSchema = scheme.Annotation
  let SentenceSchema = scheme.Sentence
  this.db=new Realm({schema:[AnnoSchema, SentenceSchema]})
 }

 _onAddSingleData = ()=>{
  this.db.write(()=>{
    this.db.create('Sentence',{
      book_type:0,
      book_index:1,
      chapter_index:1,
      bible_index:"创 1:1",
      raw_content:'',
      note_id:'',
      title_to:'',
      star_to:'',
      is_hl:0,
      annos:[{
        location:1,
        length:2,
        article_id:'article001'
      }],
      other_links:'创 1:10,咏 148,'
    })
  })
 }

 _onAddMultipleData = ()=>{

 }

 _onFetchSingelData = ()=>{

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
              <Text>A</Text>
            </ListItem>                    
            <ListItem >
              <Text> add </Text>
            </ListItem>
            <ListItem>
              <Text>Ali Connors</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text>B</Text>
            </ListItem>  
            <ListItem>
              <Text>Bradley Horowitz</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
