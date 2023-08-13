const fs=require('fs')

module.exports=class Product{
    constructor(title){
        this.title=title;
    }

    save(){
        var data=this.title+';'
        fs.writeFileSync('./Database/Products.txt',data,{flag:'a'})
        
    }
    static fetchAll(){
        var data=fs.readFileSync('./Database/Products.txt','utf-8').split(';')
        console.log(data)
        return data.slice(0,data.length-1);

    }

}