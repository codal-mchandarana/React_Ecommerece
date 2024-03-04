const calculateOriginalPrice = (price:string,discountPercentage:string)=>{
    let Price:number = parseInt(price);

    if(discountPercentage){
        let percentage = parseInt(discountPercentage);

        Price = Price-Price*(percentage/100)
    }
    return Price
}

export default calculateOriginalPrice;