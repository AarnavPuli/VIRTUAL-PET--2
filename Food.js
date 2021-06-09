class Food{
    constructor (){
        this.image=loadImage("Milk.png")
        this.lastfeed
        this.foodstock=0
    }
    updatefoodstock (foodstock){
        this.foodstock=foodstock
    }
    getfeedtime(lastfeed){
        this.lastfeed=lastfeed
    }
    deductfood(){
     if (this.foodstock>0){
         this.foodstock=this.foodstock-1
     }   
    }
    getfoodstock(){
        return this.foodstock
    }
    display(){
        var x = 80, y = 100
        imageMode(CENTER)
        image(this.image,720,220,70,70)
        if(this.foodstock!=0){
            for(var i = 0;i<this.foodstock;i++){
                if(i%10==0){
                    x=80
                    y=y+50
                }
                image(this.image,x,y,70,70)
                x=x+30
            }
        }
    }
}