export default {
    sentenceData: {
        sen_index:{//BB
            title:"1:1",
            articleID:"1-1-1" //can be nil
        },
        anotationArticleID:"1",//※ 跳转文章ID
        sentence:{
            raw:"",//原始文本
            isHighlighted:true,//是否高亮
            namesIndex:['1,3','5,6'],//人名、地名、下划线
            anotaitons:[//注释，蓝色字体可点击
                {
                    index:'5,7',
                    articleID:''
                },
                {
                    index:'11,15',
                    articleID:''
                }
            ],
        },
        indexList:[
            {
                BB_index:'希 5:15',
                sentence_id:'1-3-1'
            },
            {
                BB_index:'福 1:11',
                sentence_id:'5-1-11'
            },
        ]


    }
}