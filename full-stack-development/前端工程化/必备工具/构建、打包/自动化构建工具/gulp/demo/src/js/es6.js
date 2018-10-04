let id = document.getElementById('btn');
var name = 'person'
export{
    name as persoName
} 
var sort = (a=3, b=2) => a-b;
class person{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    talk(){
        console.log('I can talk');
    }
    walk(){
        console.log('I can walk');
    }
}
