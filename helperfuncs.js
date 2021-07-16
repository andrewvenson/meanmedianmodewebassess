// mean median mode in seperate es6 arrow functions within exports object for scalability
module.exports = {
    mean: (data) => {
        const mean = data.reduce((a,b) => a+b,0) / data.length;
        return mean.toFixed(2);
    },
    median: (data) => {
        const median = data[Math.floor(data.length / 2)];
        return median;
    },
    mode: (data) => {
        let occurrences = {};

        data.forEach(num => {
            if(num in occurrences){
                occurrences[num] = occurrences[num] + 1;
            }else{
                occurrences[num] = 0;
            }
        });
        const mode = Object.keys(occurrences).reduce((a,b) => occurrences[a] > occurrences[b] ? a : b);
    
        // if given mode value == 0 then there is no mode
        return occurrences[mode] === 0 ? "no mode" : mode;
    }
}
