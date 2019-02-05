function longSMS (req, res, next) {
  let message = req.body.message,
      long = message.length, 
      chip = [],
      chipIni = 0, 
      chipCut = 160,
      repeatNumber = Math.ceil(long/160);
  for (var i = 0; i < repeatNumber; i++) {
    if (long>160) {
      chip[i] = message.substring(chipIni, chipCut)
    }
    chipIni = chipIni +160;
    chipCut = chipCut +160;
  }
  
  if (long>160){
    req.body.message = chip;
  }
  
  next()
}

module.exports = longSMS  