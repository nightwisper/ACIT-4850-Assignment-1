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

        return (test);
    });
}

module.exports = { parseCSV }