import events from 'events';
import util from 'util';

function HandlerFiles ()
{
  events.EventEmitter.call(this);
  const self = this;
  this.loadFiles = (files) =>{
    const promiseReadCsv = new Promise( (resolve, reject) => {
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    self.emit('startLoad');
    if (regex.test(files.name.toLowerCase()))
    {
        if (typeof (FileReader) !== 'undefined') {

          var reader = new FileReader();

          reader.onload = function (e) {

            var rows = e.target.result;
            resolve(rows);

          };
          reader.readAsText(files);

        } else {

          self.emit('loadError', 'This browser does not support HTML5.');
          console.error('This browser does not support HTML5.');

        }
    }
    else
    {
      self.emit('loadError', 'Please upload a valid CSV file.');
      reject('Please upload a valid CSV file.');
    }
    });
    return promiseReadCsv;
  };
  this.digestData = async (files) => {
    const loadingFiles = await self.loadFiles(files);
    if (loadingFiles){
      let result = {};
      let arrayOfFiles = loadingFiles.split('\n');
      let indx = 0;
      let headerFiles = arrayOfFiles[0].replace(/\n\r/gmi,'');
          headerFiles = arrayOfFiles[0].split(',');
      self.emit('loadingHeaders', headerFiles);
      arrayOfFiles.shift()  ;
      result.headers = headerFiles;
      result.contacts = [];
      if (headerFiles.includes('phone')||headerFiles.includes('phone\n')){
        // self.emit('loadSuccess', arrayOfFiles[0]);
        for (let rows of arrayOfFiles) {
          if (rows === ' ' || rows === ''){
            continue;
          }
          indx++;
          const cols = rows.split(',');
          let auxCotacs={}, indexCol= 0;
          for (const cell of cols) {
            auxCotacs[headerFiles[indexCol]] = cell;
            self.emit('loading', cell);
            indexCol++;
          }
          result.contacts.push(auxCotacs);
        }
        result.total = indx;
        self.emit('loadSuccess', result);
      } else {
        self.emit('loadError', 'Not found the col phone');
        throw new Error('Not found the col phone');
      }
    } else {
      self.emit('loadError', 'Error on load data');
      throw new Error('Error on load data');
    }
  };
  return this;
}

util.inherits(HandlerFiles, events.EventEmitter);

export default HandlerFiles;