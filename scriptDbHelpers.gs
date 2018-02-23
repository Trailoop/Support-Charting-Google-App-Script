function dumpDatabaseIntoSheet(result) {
  var db = ScriptDb.getMyDb();
  // Change the query to restrict which records to copy, or change ordering, etc.
  var result = db.query({});
  var data = [];
  var keys = {};

  // Load in data and find out the object keys.
  while (result.hasNext()) {
    var item = result.next();
    var itemKeys = Object.keys(item);
    for (var i = 0; i < itemKeys.length; i++) {
      if (typeof(item[itemKeys[i]]) != 'function') {
        keys[itemKeys[i]] = true;
      }
    }
    data.push(item);
  }

  var headings = Object.keys(keys);
  var values = [headings];
  // Produce the values array containing the bits from the result objects.
  for (var rownum = 0 ; rownum < data.length; rownum++) {
    var thisRow = [];
    var item = data[rownum];
    for (var i = 0; i < headings.length; i++) {
      var field = headings[i];
      var thisValue = item[field];
      if (thisValue == undefined || typeof(thisValue) == 'function') {
        thisValue = null;
      }
      thisRow.push(thisValue);
    }
    values.push(thisRow);
  }

  var ss = SpreadsheetApp.openById('0Av8vyeCfOHNZdFBSaDRONkwyZ2pyX0dWcnlxVlU3TkE');
  var newSheet = ss.insertSheet();
  var range = newSheet.getRange(1, 1, values.length, headings.length);
  range.setValues(values);
}


function showAll() {
  var db = ScriptDb.getMyDb();
  var results = db.query({});

  while (results.hasNext()) {
    var result = results.next();
    Logger.log(JSON.stringify(result));
  }
}

function deleteAll() {
  var db = ScriptDb.getMyDb();
  while (true) {
    var result = db.query({}); // Get everything, up to limit.
    if (result.getSize() == 0) {
      break;
    }
    while (result.hasNext()) {
      db.remove(result.next());
    }
  }
}