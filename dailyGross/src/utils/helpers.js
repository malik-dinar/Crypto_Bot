

exports.sumOfAnArray = (array)=>{
    if(array.length==0) return 0;
    
    let sum=0;
    for(i=0;i<array.length;i++){
        sum=sum+array[i];
    }
    return sum
}