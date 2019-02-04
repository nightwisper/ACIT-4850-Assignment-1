const fs = require('fs');
const csv = require('csv-parse');

let test = []

fs.createReadStream('./data.csv')
    .pipe(csv())
    .on('data', function (data) {
        try {
            var obj = {
                status: data[0],
                block: data[1],
                crn: data[2],
                course: data[3],
                type: data[4],
                stime: data[5],
                etime: data[6],
                instructor: data[7],
                room: data[8],
                sdate: data[9],
                edate: data[10],
                max: data[11],
                act: data[12],
                hrs: data[13]
            }

            test.push(obj);
        }
        catch (err) {
            console.log(err)
        }
    })
    .on('end', function () {
        test.shift();
        console.log(test[0]);
        console.log(test[test.length - 1])
        process.exit()
    }); 