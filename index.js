const { parseCSV } = require('./csv_functions');
const fs = require('fs');
const http = require('http');
var program = process.argv[2].toUpperCase();
var out = `<h1> Program: ${program} </h1><br>`;
var xml = `<?xml version="1.0"?>
<!DOCTYPE term SYSTEM "schedules.dtd">
<term>`
var instructorXML = `<?xml version="1.0"?>
<instructors xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:noNamespaceSchemaLocation='instructor.xsd'>`

var xmldoc = require('xmldoc')

parseCSV('./data.csv').then((data) => {

    var valid_entries = data.filter((entry)=>{
        return entry.program === program;
    });

    var instructors = []; valid_entries.forEach((entry) => {
        instructors.push( entry.instructor )
    })

    var unique_instructors = instructors.filter((v, i, a) => a.indexOf(v) === i);
    // console.log(unique_instructors)

    var index = unique_instructors.indexOf(" ,");
    if (index !== -1) unique_instructors.splice(index, 1);

    var instructorData = [];

    unique_instructors.forEach((instructor) => {
        var rows = data.filter((entry) => {
            return entry.instructor === instructor
        })
        x = {
            name:instructor,
            rows
        }

        instructorData.push(x);
    });

    instructorData.forEach((entry) => {
        var outhtml = `<h2>${entry.name}</h2><br>`
        var outXML = `<instructor name="${entry.name}">`;

        entry.rows.forEach(line => {
            outhtml+=`${JSON.stringify(line)}<br>`
            outXML += `<course crn="${line.crn}">
                        <day>${line.day}</day>
                        <name>${line.course}</name>
                        <type>${line.type}</type>
                        <times start="${line.stime}" end="${line.etime}"></times>
                        <dates start="${line.sdate}" end="${line.edate}"></dates>
                        <max>${line.max}</max>
                        <act>${line.act}</act>
                        <hrs>${line.hrs}</hrs>
                    </course>`
        })

        outXML += `</instructor>`
        out += outhtml;
        instructorXML += outXML;
    });
    instructorXML += `</instructors>`

    fs.writeFileSync(`instructor.xml`, instructorXML);

    // console.log(valid_entries)
    var mon = valid_entries.filter((entry) => {
        return entry.day.toLowerCase() === 'mon';
    });

    var tue = valid_entries.filter((entry) => {
        return entry.day.toLowerCase() === 'tue';
    });
    var wed = valid_entries.filter((entry) => {
        return entry.day.toLowerCase() === 'wed';
    });
    var thu = valid_entries.filter((entry) => {
        return entry.day.toLowerCase() === 'thu';
    });
    var fri = valid_entries.filter((entry) => {
        return entry.day.toLowerCase() === 'fri';
    });
    outXML(mon);
    outXML(tue);
    outXML(wed);
    outXML(thu);
    outXML(fri);
    xml += `</term>`
    fs.writeFileSync(`${program}.xml`, xml)
    outHTML(mon);
    outHTML(tue);
    outHTML(wed);
    outHTML(thu);
    outHTML(fri);
}).catch(e => console.log(e));

const outHTML = (dayArray) => {
    out += `<h2>${dayArray[0].day}</h2>`;
    out += `set,course,Start Time,End Time,Instructor,room <br>`


    dayArray.forEach(entry => {
        out += `${entry.set},${entry.course},${entry.stime},${entry.etime},${entry.instructor},${entry.room}<br>`;
    })
}

const outXML = (dayArray) => {
    dayArray.forEach(entry => {
        xml += `
        <set program="${entry.program}" set="${entry.set}">
            <day code="${entry.day}">
                <course crn="${entry.crn}">
                    <name>${entry.course}</name>
                    <type>${entry.type}</type>
                    <times start="${entry.stime}" end="${entry.etime}"></times>
                    <instructor>"${entry.instructor}"</instructor>
                    <dates start="${entry.sdate}" end="${entry.edate}"></dates>
                    <max>${entry.max}</max>
                    <act>${entry.act}</act>
                    <hrs>${entry.hrs}</hrs>
                </course>
            </day>
        </set>
        `;
    });  

}



http.createServer(function (req, res) {
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(out);
    res.end(); //end the response
}).listen(8080); //the server object listens on port 8080 





