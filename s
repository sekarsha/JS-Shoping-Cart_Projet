<div class="container img">
    <div class="row">
      <div class="col">

        <div class="box" data-item="samsung" > <img src="./img/1.jpg" alt=""> </div>
          
        <div class="box"  data-item="apple"> <img src="./img/8.webp" alt=""> </div> 
             
         <div class="box"  data-item="samsung"><img src="./img/9.webp" alt=""></div>
          
        <div class="box"  data-item="mi"> <img src="./img/4.jpg" alt=""> </div>
         
      </div>
    </div>
  </div>


  let button=document.querySelectorAll(".btnn");
let boxs=document.querySelectorAll(".box");
let searchbox=document.querySelector(".input");

searchbox.addEventListener('keyup',(e)=>{

       text=e.target.value.toLowerCase().trim();

  boxs.forEach((box)=>{
     
  let data=box.dataset.item;

     if(data.includes(text)){

            box.style.display='block'
           }

     else{
            box.style.display='none'
        }

    })
   
});
