const container = document.querySelector(".container");
const count =document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll(".seat:not(.reserved)"); // classı seat oluğ reserved olmayanları aldık

runEvents();

function runEvents(){

    container.addEventListener("click",getSeat);
    select.addEventListener("change",selectMovie);
    getFromLocalStorage();
    calculateTotal();
}

function getSeat(e){
    if(e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) /*class ı seat olan ve reserved olmayan koltuklar seçili ise*/ 
    {
       e.target.classList.toggle("selected"); // seçili olan classta selected clası varsa kaldırır yoksa ekler (toggle ile)

       calculateTotal();    
       
    }
}

function selectMovie(e){
    calculateTotal();   
}

function calculateTotal(){
    
    const selectedSeats =container.querySelectorAll(".seat.selected");

    const selectedSeatsArr = [];
    const seatsArr=[];

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function(seat){
        seatsArr.push(seat);
    });

    let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    });


    let selectedSeatCount = container.querySelectorAll(".seat.selected").length; // seçili olanların sayısını almamızı sağlar
    count.innerText=selectedSeatCount;
    amount.innerText=selectedSeatCount*select.value;

    savetoLocalStorage(selectedSeatIndexs);
}

function savetoLocalStorage(indexs){
    localStorage.setItem("selectedSeats",JSON.stringify(indexs));
    localStorage.setItem("selectedmovieIndex",select.selectedIndex);
}

function getFromLocalStorage(){
    const selectedSeats=JSON.parse(localStorage.getItem("selectedSeats"));


    if(selectedSeats != null && selectedSeats.length>0){
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add("selected");
            }
        });
    }


    const selectedMovieIndex = localStorage.getItem("selectedmovieIndex");

    if(selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex;
    }
}