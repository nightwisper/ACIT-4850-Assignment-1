const fs = require('fs');
const csv = require('csv-parse');



const parseCSV = (filePath) => {
    let test = []

    fs.createReadStream(filePath)
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

        console.log('File parsed successfully\n')
        console.log('First Entry: \n')
        console.log(JSON.stringify(test[0], undefined, 2))

        console.log("Last Entry: \n")
        console.log(JSON.stringify(test[test.length - 1], undefined, 2));
        process.exit()
    });
}

module.exports = { parseCSV }