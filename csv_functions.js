const fs = require('fs');
const csv = require('csv-parse');



const parseCSV = (filePath) => {

    return new Promise ((resolve, reject) => {
        let test = []

        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', function (data) {
            try {
                if(data[0].toLowerCase() !== 'inactive'){
                    var obj = {
                        status: data[0],
                        program: data[1].split(" ")[1],
                        set: data[1].split(" ")[2] + data[1].split(" ")[3],
                        crn: data[2],
                        course: data[3],
                        type: data[4],
                        day: data[5],
                        stime: data[6],
                        etime: data[7],
                        instructor: data[8],
                        room: data[9],
                        sdate: data[10],
                        edate: data[11],
                        max: data[12],
                        act: data[13],
                        hrs: data[14]
                    }
        
                    test.push(obj);
                }
            }
            catch (err) {
                reject(err);
            }
        })
        .on('end', function () {
            test.shift();
    
            console.log('File parsed successfully\n')
            console.log('First Entry: \n')
            console.log(JSON.stringify(test[0], undefined, 2))
    
            console.log("Last Entry: \n")
            console.log(JSON.stringify(test[test.length - 1], undefined, 2));
            // process.exit()
    
            resolve (test);
        });
    })

}

module.exports = { parseCSV }