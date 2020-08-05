//SDM////////////////+++++++++++++++#
// Enumerations ///++++++++++++++++#
/////////////////+++++++++++++++++#
let Instance = {
      MANDANT: 1,
      ORGANISATION: 2,
      LIEGENSCHAFT: 3,
      BEREICH: 4,
      MESSSTELLE: 5,
      ANLAGE: 6,
      MESSMITTEL: 7
    },
    GetValueMode ={
      SIMPLE: 1,
      COMPARISON: 2
    }
    ReadInstance = {
      INTERNE_ENERGIEDATEN: 1,
      INTERNE_BETRIEBSDATEN: 2,
      EXTERNE_RECHNUNGEN: 3,
      ANLAGEN: 4
    },
    InstanciationMode = {
      EMPTY: 1,
      OBJECT: 2
    },
    TrackValue = {
      LABEL: 1,
      FIELD_ID: 2,
      OLD_VALUE: 3,
      NEW_VALUE: 4
    },
    Operator = {
      PLUS: 1,
      MINUS: 2,
      TIMES: 3,
      DIVIDE: 4,
      POWER_OF: 5
    },
    OperandType = {
      MEASUREMENT_POINT: 1,
      MACHINE_PARAMETER: 2,
      NUMERIC_OPERAND: 3
    },
    LocationParentheses = {
      BEGINNING: 1,
      END: 2,
      NONE: 3
    },
    FilterBy = {
      ID: 1,
      NAME: 2,
      DATETIME: 3,
      VALUE: 4
    },
    FormulaProperty = {
      OPERATOR: 1,
      PARENTHESES: 2,
      MEASUREMENT_POINT: 3,
      NUMERIC_OPERAND: 4
    },
    DbTable = {
      MESSSTELLEN: 1,
      KENNZAHLEN: 2
    },
    DisplayMode = {
      STRING: 1,
      ID: 2
    },
    Month = {
      JANUARY: 1,
      FEBRUARY: 2,
      MARCH: 3,
      APRIL: 4,
      MAY: 5,
      JUNE: 6,
      JULY: 7,
      AUGUST: 8,
      SEPTEMBER: 9,
      OCTOBER:10,
      NOVEMBER: 11,
      DECEMBER: 12
    },
    TimeInterval = {
      NONE: 0,
      DAY: 1,
      WEEK: 2,
      MONTH: 3,
      YEAR: 4
    },
    InstanceMode = {
      ENERGY: 1,
      BDE: 2
    },
    MeasurementMethod = {
      NONE: 1,
      AUTOMATIC: 2,
      MANUALLY: 3,
      CALCULATED: 4
    },
    ObjectCopyMode = {
      SHALLOW: 1,         // Copy by reference --> A new reference gets returned
      DEEP: 2,            // Copy by value --> A new object gets returned
      FUSION_SHALLOW: 3,  // N objects get fused and returned as a new reference
      FUSION_DEEP: 4      // N objects get fused and returned as a new object
    }

//SDM///////////////////+++++++++++++++#
// Class equivalents //+++++++++++++++#
//////////////////////+++++++++++++++#

// Navigation info
function LastNavInfo(){
  this.path = {
    db: "",
    organisation: "",
    liegenschaft: "",
    bereich: "",
  };
  this.instance = "";
  this.record = {
    navID: ""
  };
  this.fields = [{
    type: "",
    id: ""
  }];
  this.returnVals = "";
  this.argVal = "";
  this.jumpIsAktiv = false;
  }
  LastNavInfo.prototype.jump = function(){
    $(".orgPath").val(this.path.organisation);
    $(".orgPath").trigger("change");
    this.jumpIsActive = false;
    $("#" + this.instance + "Menu").trigger("click");
    readInstanzen(this.instance + "First", this.record.navID);

    //Determine the correct behavior depending on the field types
    for (var i = 0; i < this.fields.length; i++) {
      if(this.fields[i].type == "textbox"){
        $("#" + this.fields[i].id)
          .val(this.returnVals[i])
          .focus();
      }
      else{
        $("#" + this.fields[i].id)
          .val(this.returnVals[i])
          .focus();
      }
    }
  }
  LastNavInfo.prototype.setBasicNavInfo = function(path, instance){
    if(!this.jumpIsActive){
      this.path = {
        db: path[0],
        organisation: path[1],
        liegenschaft: path[2],
        bereich: path[3]
      };
      this.instance = instance;
    }
  }
  LastNavInfo.prototype.getBasicNavInfo = function(){
      var navInfoArr = [this.path, this.instance];
      return navInfoArr;
  }
  LastNavInfo.prototype.setRecordsNavID = function(recordNavID){
    if(!this.jumpIsActive){
      this.record.navID = recordNavID;
    }
  }
  LastNavInfo.prototype.getRecordsNavID = function(recordNavID){
      return this.record.navID;
  }
  LastNavInfo.prototype.setFieldsNavInfo = function(fields){
    if(!this.jumpIsActive){
      this.fields = fields;
    }
  }
  LastNavInfo.prototype.getFieldsNavInfo = function(){
    return this.fields;
  }
  LastNavInfo.prototype.setReturnValues = function(returnVals){
    this.returnVals = returnVals;
  }
  LastNavInfo.prototype.getReturnValues = function(){
    return this.returnVals;
  }
  LastNavInfo.prototype.enableJump = function(jumpIsActive){
    this.jumpIsActive = jumpIsActive;
  }

// Change info
function ChangeTracker(){
  this.instance = "";
  this.record = {
    navID: ""
  };
  this.change = {
    label: "",
    fieldID: "",
    oldValue: "",
    newValue: ""
  };
  this.changes = [];
  }
  ChangeTracker.prototype.setInstance = function(instance){
    this.resetChanges();
    this.instance = instance;
  }
  ChangeTracker.prototype.getInstance = function(){
    return this.instance;
  }
  ChangeTracker.prototype.setRecordsNavID = function(recordsNavID){
    this.resetChanges();
    this.record.navID = recordsNavID;
  }
  ChangeTracker.prototype.getRecordsNavID = function(){
    return this.record.navID;
  }
  ChangeTracker.prototype.setChange = function(what, value){
    switch(what){
      case TrackValue.LABEL:
        this.change.label = value;
        break;
      case TrackValue.FIELD_ID:
        this.change.fieldID = value;
        break;
      case TrackValue.OLD_VALUE:
        this.change.oldValue = value;
        break;
      case TrackValue.NEW_VALUE:
        this.change.newValue = value;
        break;
    }
  }
  ChangeTracker.prototype.setChanges = function(){
    if(this.change.newValue != this.change.oldValue){
      this.changes.push(this.change);
    }
    this.change = {
      label: "",
      fieldID: "",
      oldValue: "",
      newValue: ""
    };
  }
  ChangeTracker.prototype.getChanges = function(){
    return this.changes;
  }
  ChangeTracker.prototype.resetChanges = function(){
    this.change = {
      label: "",
      fieldID: "",
      oldValue: "",
      newValue: ""
    };
    this.changes = [];
  }

// Json manipulation
function SpreadsheetJSON(jsonString){
    this.jsonData = JSON.parse(jsonString);
  }

  //Done
  SpreadsheetJSON.prototype.getWorkbookJSON = function(){
    return this.jsonData;
  }

  // SheetJSON has to be finished before Done
  SpreadsheetJSON.prototype.addSheets = function(mode, sheetNamesOrObjectsArr){
    var sheets;
    if(mode == InstanciationMode.EMPTY){
      var sheetNames = sheetNamesOrObjectsArr;
      for(var index = 0; index < sheetNames.length; index++){
        var sheet = new SheetJSON();
        sheet.setName(sheetNames[index]);
        sheets[sheet.name] = sheet;
      }
    }
    else if (mode == InstanciationMode.OBJECT) {
      var sheetObjects = sheetNamesOrObjectsArr;
      for(var index = 0; index < sheetObjects.length;index++){
        sheets[sheetObjects[index].name] = sheetObjects[index];
      }
    }
    this.jsonData.sheets = sheets;
  }
  //Done
  SpreadsheetJSON.prototype.addSheet = function(mode, sheetNameOrObject){
    var sheet;
    var sheetName;
    if(mode == InstanciationMode.EMPTY){
      sheetName = sheetNameOrObject
      sheet = new SheetJSON();
      sheet.setName(sheetName);
    }
    else if (mode == InstanciationMode.OBJECT) {
      sheetName = sheetNameOrObject.name;
      sheet = sheetNameOrObject;
    }
    this.jsonData.sheets[sheetName] = sheet;
  }
  //Done
  SpreadsheetJSON.prototype.setAllSheets = function(sheets){
    this.jsonData.sheets = sheets;
  }
  //Done
  SpreadsheetJSON.prototype.setSheets = function(sheetsObjectsArr){
      for(var index = 0; index < sheetsObjectsArr.length; index++){
        this.jsonData.sheets[sheetsObjectsArr[index][0]] = sheetsObjectsArr[index][1];
      }
  }
  //Done
  SpreadsheetJSON.prototype.setSheet = function(nameSheet, sheetObject){
      this.jsonData.sheets[nameSheet] = sheetObject;
  }
  //Done
  SpreadsheetJSON.prototype.getAllSheets = function(){
      return this.sheets;
  }
  //Done
  SpreadsheetJSON.prototype.getSheets = function(namesSheetsArr){
    var sheets = [];

    for(var index = 0; index < namesSheetsArr.length; index++){
      sheets.push(this.sheets[namesSheetsArr[index]]);
    }
      return sheets;
  }
  //Done
  SpreadsheetJSON.prototype.getSheet = function(nameSheet){
    var sheet = this.sheets[nameSheet];

    return sheet;
  }
  // Done
  SpreadsheetJSON.prototype.setCellValues = function(nameSheet, indicesValueArr){
    var indexRow;
    var indexColumn;
    var value;

    for(var index = 0; index < indicesValueArr.length; index++){
      indexRow = indicesValueArr[index][0];
      indexColumn = indicesValueArr[index][1];
      value = indicesValueArr[index][2];

      this.jsonData.sheets[nameSheet].data.dataTable[indexRow][indexColumn].value = value;
    }

  }
  // Done
  SpreadsheetJSON.prototype.setCellValue = function(nameSheet, indexRow, indexColumn, value){
    this.cellData[indexRow][indexColumn] = value;
  }
  // Done
  SpreadsheetJSON.prototype.getCellValues = function(nameSheet, indicesArr){
    var indexRow;
    var indexColumn;
    var values;

    for(var index = 0; index < indicesArr.length; index++){
      indexRow = indicesArr[index][0];
      indexColumn = indicesArr[index][1];

      values.push(this.cellData[indexRow][indexColumn]);
    }
    return values;
  }
  // Done
  SpreadsheetJSON.prototype.getCellValue = function(nameSheet, indexRow, indexColumn){
    var value;
    value = this.cellData[indexRow][indexColumn];

    return value;
  }
  // Done
  SpreadsheetJSON.prototype.setAllRows = function(nameSheet, rowsArr){
    this.rows = rowsArr;
  }
  SpreadsheetJSON.prototype.setRows = function(nameSheet, indexRow, indexColumn){
  }
  SpreadsheetJSON.prototype.setRow = function(nameSheet, indexRow, indexColumn){

  }
  // Done
  SpreadsheetJSON.prototype.getAllRows = function(nameSheet, indexRow, indexColumn){
    return this.rows;
  }
  SpreadsheetJSON.prototype.getRows = function(nameSheet, rowsArr){

    return
  }
  // Done
  SpreadsheetJSON.prototype.getRow = function(indexRow){
    return this.rows[indexRow];
  }
  function SheetJSON(){

  }
  function RowJSON(){

  }
  function ChartJSON(){

  }

// Instance info to re-assign the path
function ChangePath(){
  // Change path instances
  this.instance = "";
  this.id = {
    anlID: "",
    msmID: ""
  }

  // Path to change to
  this.liegID = "";
  }
  ChangePath.prototype.setInstanceInfo = function(instance, id){
    this.instance = instance;
    switch (this.instance) {
      case Instance.ANLAGE:
        this.id.anlID = id;
        break;
      case Instance.MESSMITTEL:
        this.id.msmID = id;
        break;
    }
  }
  ChangePath.prototype.getInstanceInfo = function(){
    var instanceInfo = [this.instance, this.id];
    return instanceInfo;
  }
  ChangePath.prototype.getAnlagenID = function(){
    return this.id.anlID;
  }
  ChangePath.prototype.setLiegenschaftsID = function(liegID){
    this.liegID = liegID;
  }
  ChangePath.prototype.getLiegenschaftsID = function(){
    return this.liegID;
  }
  ChangePath.prototype.resetInfos = function(){
    // Change path instances
    this.instance = "";
    this.id = {
      anlID: "",
      msmID: ""
    }

    // Path to change to
    this.liegID = "";
  }

function MeasurementPoint(id, name, nValues){
  this.id = id;
  this.name = name;
  this.values = [];
  this.isSaved;

  for(let i = 0; i < nValues; i++){
    this.values[i] = 0;
  }
  }
  MeasurementPoint.prototype.setID = function (id){
    this.id = id;
  }
  MeasurementPoint.prototype.getID = function(){
    return this.id;
  }
  MeasurementPoint.prototype.setName = function(name){
    this.name = name;
  }
  MeasurementPoint.prototype.getName = function(){
    return this.name;
  }
  MeasurementPoint.prototype.setValues = function(values){
    this.values = [];
    this.values.push(values);
  }
  MeasurementPoint.prototype.getValues = function(pars){
    return this.values;
  }
  MeasurementPoint.prototype.setValue = function(index, value){
    this.values[index] = value;
  }
  MeasurementPoint.prototype.getValue = function(pars){           // 2 x Overloading(pars has to be array) 1: get current property value , 2: compare to other value and if different, change value and return changed value
    let nPars = 0,
        idx = 0,
        val = 0;
    if(pars instanceof Array){
      nPars = pars.length;
      if(nPars == GetValueMode.SIMPLE){
        idx = pars[0];
        return this.values[idx];
      }
      else if(nPars == GetValueMode.COMPARISON){
        idx = pars[0];
        val = Number(pars[1]);
        if($.isNumeric(val)){
          this.values[idx] = val;
          return this.values[idx];
        }
        else {
          return 0;
        }
      }
    }
    else{
      console.log("The getValue method only accepts arrays as parameters.");
      return;
    }
  }
  MeasurementPoint.prototype.setIsSaved = function(isSaved){
    this.isSaved = isSaved;
  }
  MeasurementPoint.prototype.getIsSaved = function(){
    return this.isSaved;
  }
  MeasurementPoint.prototype.getSum = function(){
    var values = this.values;
    var nValues = values.length;
    var sum = 0;

    for(var value = 0; value < nValues; value++){
      sum += parseFloat(values[value].value);
    }
    return sum;
  }
  MeasurementPoint.prototype.logObjToConsole = function(){
    console.log(this);
  }

function Machine(id, name, nValues){
    this.id = id;
    this.name = name;
    this.values = [];
    this.isSaved;

    for(let i = 0; i < nValues; i++){
      this.values[i] = 0;
    }
    }
    Machine.prototype.setID = function (id){
      this.id = id;
    }
    Machine.prototype.getID = function(){
      return this.id;
    }
    Machine.prototype.setName = function(name){
      this.name = name;
    }
    Machine.prototype.getName = function(){
      return this.name;
    }
    Machine.prototype.setValues = function(values){
      this.values = [];
      this.values.push(values);
    }
    Machine.prototype.getValues = function(pars){
      return this.values;
    }
    Machine.prototype.setValue = function(index, value){
      this.values[index] = value;
    }
    Machine.prototype.getValue = function(pars){           // 2 x Overloading(pars has to be array) 1: get current property value , 2: compare to other value and if different, change value and return changed value
      let nPars = 0,
          idx = 0,
          val = 0;
      if(pars instanceof Array){
        nPars = pars.length;
        if(nPars == GetValueMode.SIMPLE){
          idx = pars[0];
          return this.values[idx];
        }
        else if(nPars == GetValueMode.COMPARISON){
          idx = pars[0];
          val = Number(pars[1]);
          if($.isNumeric(val)){
            this.values[idx] = val;
            return this.values[idx];
          }
          else {
            return 0;
          }
        }
      }
      else{
        console.log("The getValue method only accepts arrays as parameters.");
        return;
      }
    }
    Machine.prototype.setIsSaved = function(isSaved){
      this.isSaved = isSaved;
    }
    Machine.prototype.getIsSaved = function(){
      return this.isSaved;
    }
    Machine.prototype.getSum = function(){
      var values = this.values;
      var nValues = values.length;
      var sum = 0;

      for(var value = 0; value < nValues; value++){
        sum += parseFloat(values[value].value);
      }
      return sum;
    }
    Machine.prototype.logObjToConsole = function(){
      console.log(this);
    }

function NumericOperand(value){
  this.value = value;
  }
  NumericOperand.prototype.setValue = function(){
    this.value = value;
  }
  NumericOperand.prototype.getValue = function(){
    return this.value;
  }

function Formula() {
  this.measurementObjectToCalculate = "";
  this.formula = [{
    operator: null,
    parentheses: {
      location: LocationParentheses.NONE,
      number: 0
    },
    operand: {
      type: null,
      operandObject: null
    }
  }]
  }
  Formula.prototype.setMeasurementObjectToCalculate = function(measurementObject){
    this.measurementObjectToCalculate = measurementObject;
  }
  Formula.prototype.getMeasurementObjectToCalculate = function(){
    return this.measurementObjectToCalculate;
  }
  Formula.prototype.setFirstElement = function(locationParentheses, number, operandType, operandObject){
    this.formula[0] = {
      parentheses: {
        location: locationParentheses,
        number: number
      },
      operand: {
        type: operandType,
        operandObject: operandObject
      }
    }
  }
  Formula.prototype.getFirstElement = function(){
    return this.formula[0];
  }
  Formula.prototype.setElement = function(operator, locationParentheses, number, operandType, operandObject){
    var element = {
      operator: operator,
      parentheses: {
        location: locationParentheses,
        number: number
      },
      operand: {
        type: operandType,
        operandObject: operandObject
      }
    }
    this.formula.push(element);
  }
  Formula.prototype.alterElementProperty = function(elementIndex, property, newValue){
    switch (property) {
      case FormulaProperty.OPERATOR:
        this.formula[elementIndex].operator = newValue;
        break;
      case FormulaProperty.PARENTHESES:
        this.formula[elementIndex].parentheses = newValue;
        break;
      case FormulaProperty.MEASUREMENT_POINT:
      case FormulaProperty.NUMERIC_OPERAND:
        this.formula[elementIndex].operand = newValue;
        break;
    }
  }
  Formula.prototype.getLastElement = function(){
    return this.formula[this.formula.length - 1];
  }
  Formula.prototype.setFormulaObject = function(formulaObject){
    this.formula = formulaObject;
  }
  Formula.prototype.getFormulaObject = function(){
    return this.formula;
  }
  Formula.prototype.getEncodedFormulaString = function(){
    var jsonString = JSON.stringify(this.formula);

    return btoa(jsonString);
  }
  Formula.prototype.getFormulaString = function(){
    var formulaString = "";
    var formula = this.formula;

    console.log("FormulaString");
    console.log(formula);

    var nElementsFormula = formula.length;

    if(formula[0].operand.type == OperandType.MEASUREMENT_POINT){
      formulaString = "[" + formula[0].operand.operandObject.name + "]";
    }
    else if (formula[0].operand.type == OperandType.NUMERIC_OPERAND) {
      formulaString = formula[0].operand.operandObject.value;
    }

    for(var n = 1; n < nElementsFormula; n++){
      formulaString += formula[n].operator;
      if (formula[n].parentheses.location == LocationParentheses.BEGINNING) {
        for(var i = 0; i < formula[n].parentheses.number; i++){
          formulaString += "( ";
        }
      }
      switch (formula[n].operand.type) {
        case OperandType.MEASUREMENT_POINT:
          formulaString += "[" + formula[n].operand.operandObject.name + "]";
          break;
        case OperandType.NUMERIC_OPERAND:
          formulaString += formula[n].operand.operandObject.value;
          break;
      }
      if (formula[n].parentheses.location == LocationParentheses.END) {
        for(var i = 0; i < formula[n].parentheses.number; i++){
          formulaString += " )";
        }
      }
    }
    return formulaString;
  }
  Formula.prototype.removeLastElement = function (){
    this.formula.pop();
  }
  Formula.prototype.resetFormula = function(){
    this.measurementObjectToCalculate = null;
    this.formula = [];
  }
  Formula.prototype.writeToDB = function(table, formulaString, type){
    var queryString = "";
    switch (table) {
      case DbTable.MESSSTELLEN:
        queryString = "UPDATE messstellen ";
        queryString += "SET messmittelBerechnungslogikMst = '" + btoa(formulaString) + "' ";
        queryString += "WHERE mst_ID = " + this.measurementObjectToCalculate.id + " ";
      case DbTable.KENNZAHLEN:
        queryString =  "INSERT INTO formeln(typ, formel) ";
        queryString += "VALUES('" + type + "', '" + btoa(formulaString) + "') ";
    }
    var dataMachine = new DataMachine();
    dataMachine.runQuery("write", $("#nameDB").val(), queryString)
      .then(function(){
        alert("Formel erfolgreich gespeichert!");
      });
    console.log(queryString);
  }
  Formula.prototype.readFromDB = function(table){
    var queryString = null;
    var dataFormula = null;
    switch (table) {
      case DbTable.MESSSTELLEN:
        queryString = "SELECT messmittelBerechnungslogikMst ";
        queryString += "FROM messstellen ";
        queryString += "WHERE mst_ID = " + this.measurementObjectToCalculate.id + " ";
      case DbTable.KENNZAHLEN:
    }
    var dataMachine = new DataMachine();
    let promise = new Promise(function(resolve, reject){
      dataMachine.runQuery("read", $("#nameDB").val(), queryString)
        .then(function(data){
          console.log("Promise returned");
          console.log(data);
          dataFormula = JSON.parse(data);
          dataFormula = JSON.parse(atob(dataFormula[0].messmittelBerechnungslogikMst));
        })
        .then(function(){
          if(dataFormula != null){
            resolve(dataFormula);
          }
          else {
            reject("No fitting data were returned!");
          }
        });
    });
    return promise;
  }

function MassInputMatrix(){
  this.engOrBde = undefined;
  this.year = undefined;
  this.timeInterval = 0;
  this.columns = 0;
  this.startPos = 0;
  this.measurementObjects = [];
  }
  MassInputMatrix.prototype.setModusEngOrBde = function(engOrBde){
    this.engOrBde = engOrBde;
  }
  MassInputMatrix.prototype.getModusEngOrBde = function(){
    return this.engOrBde;
  }
  MassInputMatrix.prototype.setYear = function(year){
    this.year = year;
  }
  MassInputMatrix.prototype.getYear = function(){
    return this.year;
  }
  MassInputMatrix.prototype.setTimeInterval = function(timeInterval){
    this.timeInterval = timeInterval;
    switch (this.timeInterval) {
      case TimeInterval.DAY:
        this.startPos = 0;
        this.columns = 366;
        break;
      case TimeInterval.WEEK:
        this.startPos = 0;
        this.columns = 52;
        break;
      case TimeInterval.MONTH:
        this.startPos = 0;
        this.columns = 12;
        break;
      case TimeInterval.YEAR:
        this.startPos = 2009;
        this.columns = 2025;
        break;
    }
    let nMeasurementObjects = this.measurementObjects.length;
    for(let i = 0; i < nMeasurementObjects; i++){
      for(let j = 0; j < this.columns; j++){
        this.measurementObjects[i].values[j] = 0;
      }
    }
  }
  MassInputMatrix.prototype.addMeasurementObject = function(measurementPoint){
    this.measurementObjects.push(measurementPoint);
  }
  MassInputMatrix.prototype.setMeasurementObjects = function(measurementPoints){
    this.measurementObjects = measurementPoints;
  }
  MassInputMatrix.prototype.getMeasurementObjects = function(){
    return this.measurementObjects;
  }
  MassInputMatrix.prototype.setMeasurementObject = function(index, measurementPoint){
    this.measurementObjects[index] = measurementPoint;
  }
  MassInputMatrix.prototype.getMeasurementObject = function(index){
    return this.measurementPoints[index];
  }
  MassInputMatrix.prototype.setValue = function(mpIndex, column, value){
    this.measurementObjects[mpIndex].setValue(column, value);
  }
  MassInputMatrix.prototype.getValue = function(mpIndex, column){
    let selectorString = "#masseneingabeInputIMw div:nth-child(" + (mpIndex + 1) + ") input:nth-child(" + (column + 1) + ")";
    return this.measurementObjects[mpIndex].getValue([column, $(selectorString).val()]);
  }
  MassInputMatrix.prototype.createNew = function(measurementObject){

  }
  MassInputMatrix.prototype.loadFromDB = function(){
    let tableName = "",
        nMeasurementObjects = this.measurementObjects.length,
        queryString = "",
        firstTimeUnit = 0,
        lastTimeUnit = 0,
        prependQueryString = "",
        month = $("#monatMasseneingabeIMw option:selected").index(),
        lenIndex = 0;

    switch (this.timeInterval) {
      case TimeInterval.DAY:
        tableName = "masseneingabeTage";
        prependQueryString = "t_";
        firstTimeUnit = 1;
        lastTimeUnit = 366;
        lenIndex = 3;
        break;
      case TimeInterval.WEEK:
        tableName = "masseneingabeWochen";
        prependQueryString = "w_";
        firstTimeUnit = 1;
        lastTimeUnit = 52;
        lenIndex = 2;
        break;
      case TimeInterval.MONTH:
        tableName = "masseneingabeMonate";
        prependQueryString = "m_";
        firstTimeUnit = 1;
        lastTimeUnit = 12;
        lenIndex = 2;
        break;
      case TimeInterval.YEAR:
        tableName = "masseneingabeJahre";
        prependQueryString = "j_";
        firstTimeUnit = 2010;
        lastTimeUnit = 2025;
        lenIndex = 0;
        break;
    }
    queryString += "SELECT * FROM " + tableName + " ";
    if(this.timeInterval == TimeInterval.YEAR){
        queryString += "WHERE engOderBde = " + this.engOrBde + " ";
    }
    else {
      queryString += "WHERE year = '" + this.year + "' AND engOderBde = " + this.engOrBde + " ";
    }
    if(this.engOrBde == ReadInstance.INTERNE_BETRIEBSDATEN){
      queryString += "AND einheit = '" + $("#einheitMasseneingabeIMw").val() + "' ";
    }
    console.log(queryString);
    let dataMachine = new DataMachine();

    let mode = this.engOrBde;
    let measurementObjects = this.measurementObjects;


    dataMachine.runQuery("read", $("#nameDB").val(), queryString)
    .then(function(data){
      let jsonData = JSON.parse(data);
      let  nJsonData = jsonData.length;
      let  jsonIndex = undefined;
      let  selectorString = "";
      let  zeroPart = "";

      // Loop that iterates through every input field of a mst
      for(let ins = 0; ins < nJsonData; ins++){
        for(let n = 0; n < lastTimeUnit; n++){
          jsonIndex = n + firstTimeUnit;
          if(jsonIndex < 10){
            if(lenIndex == 3){
              zeroPart = "00";
            }
            else {
              zeroPart = "0";
            }
          }
          else if (jsonIndex < 100) {
            if(lenIndex == 3){
              zeroPart = "0";
            }
            else {
              zeroPart = "";
            }
          }
          else if (jsonIndex < 1000){
            zeroPart = "";
          }
          else {
            zeroPart = "";
          }
          selectorString = "#masseneingabeInputIMw div:nth-child(" + (ins + 1) + ") input:nth-child(" + (n + 1) + ")";
          $(selectorString).val(Math.round(jsonData[ins][prependQueryString + zeroPart + jsonIndex], 2));
        }
      }
    });
  }
  MassInputMatrix.prototype.saveToDB = function(){
    let tableName = "",
        nMeasurementObjects = this.measurementObjects.length,
        prependPart = "",
        lenIndex = 0,
        zeroPart = "",
        conditionString = "",
        queryString = "",
        selectorString = "";
    switch (this.timeInterval) {
      case TimeInterval.DAY:
        tableName = "masseneingabeTage";
        prependPart = "t_";
        lenIndex = 3;
        break;
      case TimeInterval.WEEK:
        tableName = "masseneingabeWochen";
        prependPart = "w_";
        lenIndex = 2;
        break;
      case TimeInterval.MONTH:
        tableName = "masseneingabeMonate";
        prependPart = "m_";
        lenIndex = 2;
        break;
      case TimeInterval.YEAR:
        tableName = "masseneingabeJahre";
        prependPart = "j_";
        break;
    }
    for(let i = 0; i < nMeasurementObjects; i++){
      queryString += "UPDATE " + tableName + " SET ";
      if(this.engOrBde == InstanceMode.ENERGY){
        conditionString = "WHERE mst_ID = " + this.measurementObjects[i].getID() + " ";
      }
      else if (this.engOrBde == InstanceMode.BDE){
        conditionString = "WHERE anl_ID = " + this.measurementObjects[i].getID() + " ";
        conditionString += "AND einheit = '" + $("#einheitMasseneingabeIMw").val() + "' ";
        if(this.timeInterval !== TimeInterval.YEAR){
          conditionString += "AND year = '" + $("#jahrMasseneingabeIMw").val() + "' ";
        }
      }
      for(let j = this.startPos; j < this.columns; j++){
        if(j + 1 < 10){
          if(lenIndex == 3){
            zeroPart = "00";
          }
          else {
            zeroPart = "0";
          }
        }
        else if (j + 1 < 100) {
          if(lenIndex == 3){
            zeroPart = "0";
          }
          else {
            zeroPart = "";
          }
        }
        else if (j + 1 < 1000){
          zeroPart = "";
        }
        else {
          zeroPart = "";
        }
        if(this.timeInterval === TimeInterval.YEAR){
          selectorString = "#masseneingabeInputIMw div:nth-child(" + (i + 1) + ") input:nth-child(" + (j + 1 - 2009) + ")";
        }
        else {
          selectorString = "#masseneingabeInputIMw div:nth-child(" + (i + 1) + ") input:nth-child(" + (j + 1) + ")";
        }
        queryString += prependPart + zeroPart + (j + 1) + " ";
        queryString += " = " + this.measurementObjects[i].getValue([j, $(selectorString).val()]) + " ";
        if(j < this.columns - 1){
          queryString += ", ";
        }
      }
      queryString += conditionString;
    }
    // console.log("queryString: " + queryString);

    let dataMachine = new DataMachine();

    dataMachine.runQuery("write", $("#nameDB").val(), queryString)
    .then(function(){
      alert("Datenmatrix wurde gespeichert!");
    });
  }
  MassInputMatrix.prototype.resetObj = function(){
    this.year = undefined;
    this.timeInterval = 0;
    this.columns = 0;
    this.measurementObjects = [];
  }

// // Abstract class
// class DataStorageObject{
//   constructor(id, name, nValues){
//     this.id = id;
//     this.name = name;
//     this.values = [];
//     this.isSaved;
//
//     for(let i = 0; i < nValues; i++){
//       this.values[i] = 0;
//     }
//   }
//   setID(id){
//     this.id = id;
//   }
//   getID(){
//     return this.id;
//   }
//   setName(name){
//     this.name = name;
//   }
//   getName(){
//     return this.name;
//   }
//   setValues(values){
//     this.values = [];
//     this.values.push(values);
//   }
//   getValues(pars){
//     return this.values;
//   }
//   setValue(index, value){
//     this.values[index] = value;
//   }
//   getValue(pars){           // 2 x Overloading(pars has to be array) 1: get current property value , 2: compare to other value and if different, change value and return changed value
//     let nPars = 0,
//         idx = 0,
//         val = 0;
//     if(pars instanceof Array){
//       nPars = pars.length;
//       if(nPars == GetValueMode.SIMPLE){
//         idx = pars[0];
//         return this.values[idx];
//       }
//       else if(nPars == GetValueMode.COMPARISON){
//         idx = pars[0];
//         val = Number(pars[1]);
//         if($.isNumeric(val)){
//           this.values[idx] = val;
//           return this.values[idx];
//         }
//         else {
//           return 0;
//         }
//       }
//     }
//     else{
//       console.log("The getValue method only accepts arrays as parameters.");
//       return;
//     }
//   }
//   setIsSaved(isSaved){
//     this.isSaved = isSaved;
//   }
//   getIsSaved(){
//     return this.isSaved;
//   }
//   getSum(){
//     var values = this.values;
//     var nValues = values.length;
//     var sum = 0;
//
//     for(var value = 0; value < nValues; value++){
//       sum += parseFloat(values[value].value);
//     }
//     return sum;
//   }
//   logObjToConsole(){
//     console.log(this);
//   }
// }
//
// // MP class
// class MeasurementPoint extends DataStorageObject{
//   constructor(id, name, nValues){
//     super(id, name, nValues);
//     this.measuringDevice = undefined;
//   }
// }
//
// // Machine data
// class Machine extends DataStorageObject{
//   constructor(id, name, nValues){
//     super(id, name, nValues);
//     this.machineType = undefined;
//   }
// }
//
// // A numeric operand is simply a usual number
// class NumericOperand{
//   constructor(value){
//     this.value = value;
//   }
//   setValue(value){
//     this.value = value;
//   }
//   getValue(){
//     return this.value;
//   }
// }
//
// // Formula to calculate computed measurement point
// class Formula(){
//   constructor(){
//     this.measurementObjectToCalculate = "";
//     this.formula = [{
//       operator: null,
//       parentheses: {
//         location: LocationParentheses.NONE,
//         number: 0
//       },
//       operand: {
//         type: null,
//         operandObject: null
//       }
//     }]
//   }
//   setMeasurementObjectToCalculate(measurementObject){
//     this.measurementObjectToCalculate = measurementPoint;
//   }
//   getMeasurementObjectToCalculate(){
//     return this.measurementObjectToCalculate;
//   }
//   setFirstElement(locationParentheses, number, operandType, operandObject){
//     this.formula[0] = {
//       parentheses: {
//         location: locationParentheses,
//         number: number
//       },
//       operand: {
//         type: operandType,
//         operandObject: operandObject
//       }
//     }
//   }
//   getFirstElement(){
//     return this.formula[0];
//   }
//   setElement(operator, locationParentheses, number, operandType, operandObject){
//     var element = {
//       operator: operator,
//       parentheses: {
//         location: locationParentheses,
//         number: number
//       },
//       operand: {
//         type: operandType,
//         operandObject: operandObject
//       }
//     }
//     this.formula.push(element);
//   }
//   alterElementProperty(elementIndex, property, newValue){
//     switch (property) {
//       case FormulaProperty.OPERATOR:
//         this.formula[elementIndex].operator = newValue;
//         break;
//       case FormulaProperty.PARENTHESES:
//         this.formula[elementIndex].parentheses = newValue;
//         break;
//       case FormulaProperty.MEASUREMENT_POINT:
//       case FormulaProperty.NUMERIC_OPERAND:
//         this.formula[elementIndex].operand = newValue;
//         break;
//     }
//   }
//   getLastElement(){
//     return this.formula[this.formula.length - 1];
//   }
//   setFormulaObject(formulaObject){
//     this.formula = formulaObject;
//   }
//   getFormulaObject(){
//     return this.formula;
//   }
//   getEncodedFormulaString(){
//     var jsonString = JSON.stringify(this.formula);
//
//     return btoa(jsonString);
//   }
//   getFormulaString(){
//     var formulaString = "";
//     var formula = this.formula;
//
//     console.log("FormulaString");
//     console.log(formula);
//
//     var nElementsFormula = formula.length;
//
//     if(formula[0].operand.type == OperandType.MEASUREMENT_POINT){
//       formulaString = "[" + formula[0].operand.operandObject.name + "]";
//     }
//     else if (formula[0].operand.type == OperandType.NUMERIC_OPERAND) {
//       formulaString = formula[0].operand.operandObject.value;
//     }
//
//     for(var n = 1; n < nElementsFormula; n++){
//       formulaString += formula[n].operator;
//       if (formula[n].parentheses.location == LocationParentheses.BEGINNING) {
//         for(var i = 0; i < formula[n].parentheses.number; i++){
//           formulaString += "(";
//         }
//       }
//       switch (formula[n].operand.type) {
//         case OperandType.MEASUREMENT_POINT:
//           formulaString += "[" + formula[n].operand.operandObject.name + "]";
//           break;
//         case OperandType.NUMERIC_OPERAND:
//           formulaString += formula[n].operand.operandObject.value;
//           break;
//       }
//       if (formula[n].parentheses.location == LocationParentheses.END) {
//         for(var i = 0; i < formula[n].parentheses.number; i++){
//           formulaString += ")";
//         }
//       }
//     }
//     return formulaString;
//   }
//   removeLastElement (){
//     this.formula.pop();
//   }
//   calculate(){
//
//   }
//   getResult(){
//
//   }
//   resetFormula(){
//     this.measurementObjectToCalculate = null;
//     this.formula = [];
//   }
//   writeToDB(table, formulaString){
//     var jsonString = JSON.stringify(this.formula);
//     var queryString = "";
//     switch (table) {
//       case DbTable.MESSSTELLEN:
//         queryString = "UPDATE messstellen ";
//         queryString += "SET messmittelBerechnungslogikMst = '" + btoa(jsonString) + "' ";
//         queryString += "WHERE mst_ID = " + this.measurementObjectToCalculate.id + " ";
//         queryString;
//       case DbTable.KENNZAHLEN:
//     }
//
//     var dataMachine = new DataMachine();
//     dataMachine.setQueryString(queryString);
//     dataMachine.runQuery("write", queryString)
//       .then(function(){
//         alert("Formel erfolgreich gespeichert!");
//       });
//     console.log(queryString);
//     console.log(jsonString);
//
//   }
//   readFromDB(table){
//     var queryString = null;
//     var dataFormula = null;
//     switch (table) {
//       case DbTable.MESSSTELLEN:
//         queryString = "SELECT messmittelBerechnungslogikMst ";
//         queryString += "FROM messstellen ";
//         queryString += "WHERE mst_ID = " + this.measurementObjectToCalculate.id + " ";
//       case DbTable.KENNZAHLEN:
//     }
//     var dataMachine = new DataMachine();
//     var promise = new Promise(function(resolve, reject){
//       dataMachine.runQuery("read",queryString)
//         .then(function(data){
//           console.log("Promise returned");
//           console.log(data);
//           dataFormula = JSON.parse(data);
//           dataFormula = JSON.parse(atob(dataFormula[0].messmittelBerechnungslogikMst));
//         })
//         .then(function(){
//           if(dataFormula != null){
//             resolve(dataFormula);
//           }
//           else {
//             reject("No fitting data were returned!");
//           }
//         });
//     });
//     return promise;
//   }
// }
//
// // Mass input matrix
// class MassInputMatrix {
//   constructor() {
//     this.engOrBde = undefined;
//     this.year = undefined;
//     this.timeInterval = 0;
//     this.columns = 0;
//     this.startPos = 0;
//     this.measurementObjects = [];
//   }
//   setModusEngOrBde(engOrBde){
//     this.engOrBde = engOrBde;
//   }
//   getModusEngOrBde(){
//     return this.engOrBde;
//   }
//   setYear(year){
//     this.year = year;
//   }
//   getYear(){
//     return this.year;
//   }
//   setTimeInterval(timeInterval){
//     this.timeInterval = timeInterval;
//     switch (this.timeInterval) {
//       case TimeInterval.DAY:
//         this.startPos = 0;
//         this.columns = 366;
//         break;
//       case TimeInterval.WEEK:
//         this.startPos = 0;
//         this.columns = 52;
//         break;
//       case TimeInterval.MONTH:
//         this.startPos = 0;
//         this.columns = 12;
//         break;
//       case TimeInterval.YEAR:
//         this.startPos = 2009;
//         this.columns = 2025;
//         break;
//     }
//     let nMeasurementObjects = this.measurementObjects.length;
//     for(let i = 0; i < nMeasurementObjects; i++){
//       for(let j = 0; j < this.columns; j++){
//         this.measurementObjects[i].values[j] = 0;
//       }
//     }
//   }
//   addMeasurementObject(measurementPoint){
//     this.measurementObjects.push(measurementPoint);
//   }
//   setMeasurementObjects(measurementPoints){
//     this.measurementObjects = measurementPoints;
//   }
//   getMeasurementObjects(){
//     return this.measurementObjects;
//   }
//   setMeasurementObject(index, measurementPoint){
//     this.measurementObjects[index] = measurementPoint;
//   }
//   getMeasurementObject(index){
//     return this.measurementPoints[index];
//   }
//   setValue(mpIndex, column, value){
//     this.measurementObjects[mpIndex].setValue(column, value);
//   }
//   getValue(mpIndex, column){
//     let selectorString = "#masseneingabeInputIMw div:nth-child(" + (mpIndex + 1) + ") input:nth-child(" + (column + 1) + ")";
//     return this.measurementObjects[mpIndex].getValue([column, $(selectorString).val()]);
//   }
//   createNew(measurementObject){
//
//   }
//   loadFromDB(){
//     let tableName = "",
//         nMeasurementObjects = this.measurementObjects.length,
//         queryString = "",
//         firstTimeUnit = 0,
//         lastTimeUnit = 0,
//         prependQueryString = "",
//         month = $("#monatMasseneingabeIMw option:selected").index(),
//         lenIndex = 0;
//
//     switch (this.timeInterval) {
//       case TimeInterval.DAY:
//         tableName = "masseneingabeTage";
//         prependQueryString = "t_";
//         firstTimeUnit = 1;
//         lastTimeUnit = 366;
//         lenIndex = 3;
//         break;
//       case TimeInterval.WEEK:
//         tableName = "masseneingabeWochen";
//         prependQueryString = "w_";
//         firstTimeUnit = 1;
//         lastTimeUnit = 52;
//         lenIndex = 2;
//         break;
//       case TimeInterval.MONTH:
//         tableName = "masseneingabeMonate";
//         prependQueryString = "m_";
//         firstTimeUnit = 1;
//         lastTimeUnit = 12;
//         lenIndex = 2;
//         break;
//       case TimeInterval.YEAR:
//         tableName = "masseneingabeJahre";
//         prependQueryString = "j_";
//         firstTimeUnit = 2010;
//         lastTimeUnit = 2025;
//         lenIndex = 0;
//         break;
//     }
//     queryString += "SELECT * FROM " + tableName + " ";
//     if(this.timeInterval == TimeInterval.YEAR){
//         queryString += "WHERE engOderBde = " + this.engOrBde + " ";
//     }
//     else {
//       queryString += "WHERE year = '" + this.year + "' AND engOderBde = " + this.engOrBde + " ";
//     }
//     if(this.engOrBde == ReadInstance.INTERNE_BETRIEBSDATEN){
//       queryString += "AND einheit = '" + $("#einheitMasseneingabeIMw").val() + "' ";
//     }
//     console.log(queryString);
//     let dataMachine = new DataMachine();
//
//     let mode = this.engOrBde;
//     let measurementObjects = this.measurementObjects;
//
//
//     dataMachine.runQuery("read", queryString)
//     .then(function(data){
//       let jsonData = JSON.parse(data),
//           nJsonData = jsonData.length,
//           jsonIndex = undefined,
//           selectorString = "",
//           zeroPart = "";
//
//       // Loop that iterates through every input field of a mst
//       for(let ins = 0; ins < nJsonData; ins++){
//         for(let n = 0; n < lastTimeUnit; n++){
//           jsonIndex = n + firstTimeUnit;
//           if(jsonIndex < 10){
//             if(lenIndex == 3){
//               zeroPart = "00";
//             }
//             else {
//               zeroPart = "0";
//             }
//           }
//           else if (jsonIndex < 100) {
//             if(lenIndex == 3){
//               zeroPart = "0";
//             }
//             else {
//               zeroPart = "";
//             }
//           }
//           else if (jsonIndex < 1000){
//             zeroPart = "";
//           }
//           else {
//             zeroPart = "";
//           }
//           selectorString = "#masseneingabeInputIMw div:nth-child(" + (ins + 1) + ") input:nth-child(" + (n + 1) + ")";
//           $(selectorString).val(Math.round(jsonData[ins][prependQueryString + zeroPart + jsonIndex], 2));
//         }
//       }
//     });
//     //
//     /*queryString = "";
//     if(mode == InstanceMode.ENERGY){
//       queryString += "INSERT INTO " + tableName + " (mst_ID, year, engOderBde) ";
//     }
//     else if (mode == InstanceMode.BDE) {
//       queryString += "INSERT INTO " + tableName + " (anl_ID, year, engOderBde) ";
//     }
//     queryString += "VALUES ";
//     for(let j = 0; j < nMeasurementObjects; j++){
//       queryString += "(" + this.measurementObjects[j].getID() + ", " + this.year + ", " + this.engOrBde + ") ";
//       if(j < nMeasurementObjects - 1){
//         queryString += ", ";
//       }
//     }
//     //
//
//     console.log("queryString new records:" + queryString);
//     //dataMachine.runQuery("write", queryString);
//     //});
//     */
//   }
//   saveToDB(){
//     let tableName = "",
//         nMeasurementObjects = this.measurementObjects.length,
//         prependPart = "",
//         lenIndex = 0,
//         zeroPart = "",
//         conditionString = "",
//         queryString = "",
//         selectorString = "";
//     switch (this.timeInterval) {
//       case TimeInterval.DAY:
//         tableName = "masseneingabeTage";
//         prependPart = "t_";
//         lenIndex = 3;
//         break;
//       case TimeInterval.WEEK:
//         tableName = "masseneingabeWochen";
//         prependPart = "w_";
//         lenIndex = 2;
//         break;
//       case TimeInterval.MONTH:
//         tableName = "masseneingabeMonate";
//         prependPart = "m_";
//         lenIndex = 2;
//         break;
//       case TimeInterval.YEAR:
//         tableName = "masseneingabeJahre";
//         prependPart = "j_";
//         break;
//     }
//     for(let i = 0; i < nMeasurementObjects; i++){
//       queryString += "UPDATE " + tableName + " SET ";
//       if(this.engOrBde == InstanceMode.ENERGY){
//         conditionString = "WHERE mst_ID = " + this.measurementObjects[i].getID() + " ";
//       }
//       else if (this.engOrBde == InstanceMode.BDE){
//         conditionString = "WHERE anl_ID = " + this.measurementObjects[i].getID() + " ";
//         conditionString += "AND einheit = '" + $("#einheitMasseneingabeIMw").val() + "'";
//       }
//       for(let j = this.startPos; j < this.columns; j++){
//         if(j + 1 < 10){
//           if(lenIndex == 3){
//             zeroPart = "00";
//           }
//           else {
//             zeroPart = "0";
//           }
//         }
//         else if (j + 1 < 100) {
//           if(lenIndex == 3){
//             zeroPart = "0";
//           }
//           else {
//             zeroPart = "";
//           }
//         }
//         else if (j + 1 < 1000){
//           zeroPart = "";
//         }
//         else {
//           zeroPart = "";
//         }
//         selectorString = "#masseneingabeInputIMw div:nth-child(" + (i + 1) + ") input:nth-child(" + (j + 1) + ")";
//         queryString += prependPart + zeroPart + (j + 1) + " ";
//         queryString += " = " + this.measurementObjects[i].getValue([j, $(selectorString).val()]) + " ";
//         if(j < this.columns - 1){
//           queryString += ", ";
//         }
//       }
//       queryString += conditionString;
//     }
//     console.log("queryString: " + queryString);
//
//     let dataMachine = new DataMachine();
//
//     dataMachine.runQuery("write", queryString)
//     .then(function(){
//       alert("Datenmatrix wurde gespeichert!");
//     });
//   }
//   resetObj(){
//     this.year = undefined;
//     this.timeInterval = 0;
//     this.columns = 0;
//     this.measurementObjects = [];
//   }
// }
