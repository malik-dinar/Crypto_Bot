const axios = require('axios');
const { sort } = require('./utils/insertionSort');
require('dotenv').config();

const sellPoint=async (req,res)=>{
    const { coin } = req.params;
    axios.get(`${process.env.OPTIMAL_SELL_POINT_URL}${coin.toUpperCase()}&interval=1h&limit=1000`)
    .then(response => {
        let redCandleCount=0;
        let data = response.data;
        let percentDecrease;
        let median;
        let bucketlist=[];
        let optimizedSellPoint ;
        for(i=0;i<data.length;i++){
            if(data[i][1]>data[i][4]){
                redCandleCount++;                
            }else{
                if(redCandleCount!=0){
                    percentDecrease=((data[i-redCandleCount][2]-data[i-1][3])/data[i-redCandleCount][2])*100;   
                    sort(bucketlist,percentDecrease)
                }
                redCandleCount=0;
            }
        } 
        
        if(bucketlist.length % 2 !==0){     
            median=bucketlist[Math.floor(bucketlist.length/2)];
        }else{
            median=(bucketlist[Math.floor(bucketlist.length/2)]+bucketlist[Math.floor(((bucketlist.length-1)/2))])/2;
        }

        optimizedSellPoint = (data[data.length-1][4] * (1-(median/100)))
        console.log(optimizedSellPoint);

        res.send({ message: `${optimizedSellPoint}`})
    })
    .catch(error => {
       console.error('error')
    });
}

module.exports = { sellPoint }
