import { Component } from '@angular/core';

@Component({
  selector:    'animation',
  templateUrl: './animation.component.html',
  styles:      [`./animation.component.css`]
})

export class AnimationComponent {
    Images: string[] = ["img1", "img2", "img3", "img4", "img6"];
    position : string;
    srcBackPosition: number = 0;
    srcFrontPosition: number = 1;
    area: number = 30;//width    

    getPosition(e: MouseEvent){
        this.srcBackPosition= this.randomInteger(0, this.Images.length-1);
        this.srcFrontPosition= this.randomInteger(1, this.Images.length-1);
        this.position = "";
        let container = document.getElementById("container");             
        let cardRotate = document.getElementById("card"); 

        let y = e.pageY, x = e.pageX;       
        
        let topX0 = +container.offsetLeft;
        let topY0 = +container.offsetTop;
        
        let topX = +container.offsetWidth;
        let bottomY = container.offsetHeight + topY0;

        let ruleTop = (x >= topX0 || x <= topX) && (y <= (topY0 + this.area));
        let ruleLeft = (x > topX0 && x < (topX0+this.area)) && (y > (topY0 + this.area) && (y < (bottomY - this.area)));
        let ruleRight  = (x < topX && x > (topX-this.area)) && (y > (topY0 + this.area) && (y < (bottomY - this.area)));
        let ruleBottom = (x >= topX0 || x <= topX) && (y >= (bottomY - this.area) && (y <= bottomY));  
        
        if(ruleTop ){
            this.position = "top";
            cardRotate.style.transform = "rotateX(180deg)";            
        } else if(ruleLeft ){
            this.position = "left";
            cardRotate.style.transform = "rotateY(0deg)";            
        } else if(ruleRight){
            this.position = "right";
            cardRotate.style.transform = "rotateY(180deg )";            
        } else if(ruleBottom){
            cardRotate.style.transform = "rotateX(0deg)";
            this.position = "bottom";            
        } else this.position = "middle";       
        
    }

    randomInteger(min, max):number {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }
}
