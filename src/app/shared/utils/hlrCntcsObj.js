class handlerContactsObj {
  constructor(fl){
    this.csvFile=fl;
  }
  readCsvFile()
  {
    var promiseReadCsv = new Promise( (resolve, reject) => {
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
      if (regex.test(this.csvFile.name.toLowerCase())) 
      {
          if (typeof (FileReader) != "undefined") {

            var reader = new FileReader();

            reader.onload = function (e) {

              var rows = e.target.result;
              resolve(rows)

            }

            reader.readAsText(this.csvFile);

          } else {

            console.error("This browser does not support HTML5.");

          }
      } 
      else 
      {
        reject("Please upload a valid CSV file.")
      }
    })
    return promiseReadCsv
  }
}

export default handlerContactsObj