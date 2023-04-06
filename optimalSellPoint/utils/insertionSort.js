exports.sort = (bucketlist, percentDecrease)=> {
    bucketlist.push(percentDecrease); 
    for (let i = 1; i < bucketlist.length; i++) {
      const currentValue = bucketlist[i];
      let j = i - 1;
      while (j >= 0 && bucketlist[j] > currentValue) {
        bucketlist[j + 1] = bucketlist[j];
        j--;
      }
      bucketlist[j + 1] = currentValue;
    }
    return bucketlist;
}