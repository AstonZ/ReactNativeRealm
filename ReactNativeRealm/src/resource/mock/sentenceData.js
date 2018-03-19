export default {
    sentenceData: {
        sen_index:{
            title:"1:1",
            articleID:"article001" //
        },
        anotationArticleID:"1",//※ 跳转文章ID
        sentence:{
            raw:"",//原始文本
            isHighlighted:true,//是否高亮,
            noteID:"note001",//笔记后台ID
            anotaitons:[//注释，蓝色字体可点击
                {
                    range:'5,2',
                    articleID:'article002'
                },
                {
                    range:'11,3',
                    articleID:'article003'
                }
            ],
        },
        indexList:['希 5:15','福 1:11','咏 148']
    }
}
/**
 * sen_index: 每句标题及跳转的文章ID
 * anotationArticleID: 标题后面是否有※及点击跳转的文章id
 * isHighlighted 是否给文字增加高亮背景色
 * noteID 是否有笔记，表现形式及跳转形式待定
 * anotaitons 蓝色可点击文本的初始位置，长度
 */