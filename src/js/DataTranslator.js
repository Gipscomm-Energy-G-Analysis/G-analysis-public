let TranslationType = {
  ENERGY_DATA_01: 1,
  ENERGY_DATA_02: 2
}

function DataTranslator(translationType, inData){
  this.translationType = translationType;
  this.inData = inData;
  this.data = inData;
  this.outData = [];
  }
  DataTranslator.prototype.sumMonths = function(){
    let summedData = [],
        nMonth = 12,
        month = "",
        monthYear = "",
        startVal = 0,
        endVal = 0,
        currentDay = new Date();
    for(let x = 0; x < nMonth; x++){
      summedData[x] = {
        Name: "" ,
        Time: "",
        Phase: 0,
        Value: 0,
        ConvFactor: 1
      }
    }
    switch (this.translationType) {
      case TranslationType.ENERGY_DATA_01:
        for(let i = 0; i < nMonth; i++){
          if(i < 9){
            monthYear = "0" + (i + 1);
          }
          else {
            monthYear = (i + 1);
          }
          for(let j = 0; j < this.data.length; j++){
            month = this.data[j].Time;
            month =  month.slice(3, 5);
            if(month == monthYear){
              summedData[i].Value += Number(this.data[j].Value);
              summedData[i].Time = month;
              summedData[i].Name = this.data[0].Name;
              summedData[i].ConvFactor = this.data[0].ConvFactor;
            }
          }
        }
        this.data = summedData;
        break;
      case TranslationType.ENERGY_DATA_02:
          for(let i = 0; i < nMonth; i++){
            if(i < 9){
              monthYear = "0" + (i);
            }
            else {
              monthYear = i;
            }
            for(let j = 0; j < this.data.length; j++){
              month = this.data[j].Time;
              month =  month.slice(3, 5);
              if(month == monthYear){
                if(startVal == 0){
                  startVal = Number(this.data[j].Value);
                }
              }
              else {
                if(startVal != 0 && endVal == 0){
                  endVal = Number(this.data[j].Value);
                  if(Math.round(endVal - startVal) < 0){
                    summedData[i].Value = 0;
                  }
                  else {
                    summedData[i].Value = endVal - startVal;
                  }
                  summedData[i].Time = month;
                  summedData[i].Name = this.data[j].Name;
                  summedData[i].ConvFactor = this.data[0].ConvFactor;

                  startVal = 0;
                  endVal = 0;

                  break;
                }
              }
            }
          }
          this.data = summedData;
          break;
    }

    return this.data;
  }
  DataTranslator.prototype.sumDays = function(year, month){
    let summedData = [],
        nDays = new Date(year, month, 0).getDate(),
        dayMonth = "",
        day = "",
        startVal = 0,
        endVal = 0;

    for(let x = 0; x < nDays; x++){
      summedData[x] = {
        Name: "" ,
        Time: "",
        Phase: 0,
        Value: 0,
        ConvFactor: 1
      }
    }
    switch (this.translationType) {
      case TranslationType.ENERGY_DATA_01:
        for(let i = 0; i < nDays; i++){
          if(i < 9){
            dayMonth = "0" + (i + 1);
          }
          else {
            dayMonth = (i + 1);
          }
          for(let j = 0; j < this.data.length; j++){
            day = this.data[j].Time;
            day =  day.slice(0, 2);
            if(day == dayMonth){
              summedData[i].Value += Number(this.data[j].Value);
              summedData[i].Time = day;//+ " " + getWeekday(year, month, day, "short");
              summedData[i].Name = this.data[0].Name;
              summedData[i].ConvFactor = this.data[0].ConvFactor;
            }
          }
        }
        this.data = summedData;
        break;
      case TranslationType.ENERGY_DATA_02:
        for(let i = 0; i < nDays; i++){
          if(i < 9){
            dayMonth = "0" + (i);
          }
          else {
            dayMonth = i;
          }
          //startVal = Number(this.data[0].Value);
          for(let j = 0; j < this.data.length; j++){
            day = this.data[j].Time;
            day =  day.slice(0, 2);
            if(day == dayMonth){
              if(startVal == 0){
                startVal = Number(this.data[j].Value);
              }
            }
            else {
              if(startVal != 0 && endVal == 0){
                endVal = Number(this.data[j].Value);
                if(Math.round(endVal - startVal) < 0){
                  summedData[i].Value = 0;
                }
                else {
                  summedData[i].Value = endVal - startVal;
                }
                summedData[i].Time = day;
                summedData[i].Name = this.data[0].Name;
                summedData[i].ConvFactor = this.data[0].ConvFactor;


                startVal = 0;
                endVal = 0;

                break;
              }
            }
          }
        }
        this.data = summedData;
        break;
    }

    return this.data;
  }
  DataTranslator.prototype.sumHours = function(){
    let summedData = [],
        nHours = 24,
        hour = "",
        hourDay = "",
        startVal = 0,
        endVal = 0;
    for(let x = 0; x < nHours; x++){
      summedData[x] = {
        Name: "",
        Time: "",
        Phase: 0,
        Value: 0,
        ConvFactor: 1
      }
    }
    switch (this.translationType) {
      case TranslationType.ENERGY_DATA_01:
        for(let i = 0; i < nHours; i++){
          if(i < 9){
            hourDay = "0" + i;
          }
          else {
            hourDay = i;
          }
          for(let j = 0; j < this.data.length; j++){
            hour = this.data[j].Time;
            hour =  hour.slice(11, 13);
            if(hour == hourDay){
              summedData[i].Value += Number(this.data[j].Value);
              summedData[i].Time = hour + ":00";
              summedData[i].Name = this.data[0].Name;
              summedData[i].ConvFactor = this.data[0].ConvFactor;
            }
          }
        }
        this.data = summedData;
        break;
      case TranslationType.ENERGY_DATA_02:
        for(let i = 0; i < nHours; i++){
          if(i < 9){
            hourDay = "0" + i;
          }
          else {
            hourDay = i;
          }
          for(let j = 0; j < this.data.length; j++){
            hour = this.data[j].Time;
            hour =  hour.slice(11, 13);
            if(hour == hourDay){
              if(startVal == 0){
                startVal = Number(this.data[j].Value);
              }
            }
            else {
              if(startVal != 0 && endVal == 0){
                endVal = Number(this.data[j].Value);
                if(Math.round(endVal - startVal) < 0){
                  summedData[i].Value = 0;
                }
                else {
                  summedData[i].Value = endVal - startVal;
                }
                summedData[i].Time = hour + ":00";
                summedData[i].Name = this.data[j].Name;
                summedData[i].ConvFactor = this.data[0].ConvFactor;

                startVal = 0;
                endVal = 0;

                break;
              }
            }
          }
        }
        this.data = summedData;
        break;
      }

    return this.data;
  }
  DataTranslator.prototype.sum15minsDay = function(){
    let summedData = [],
    nHours = 24,
    timeArray = [ "00", "15", "30", "45"],
    fullTime = "",
    hourDay = "",
    minHour = "",
    startVal = 0,
    endVal = 0,
    n = 0;
    for(let x = 0; x < nHours * 4; x++){
      summedData[x] = {
        Name: "",
        Time: "",
        Phase: 0,
        Value: 0,
        ConvFactor: 1
      }
    }
    switch (this.translationType) {
      case TranslationType.ENERGY_DATA_01:
      for(let i = 0; i < nHours; i++){
        if(i < 10){
          hourDay = "0" + i;
        }
        else {
          hourDay = i;
        }
        for(let l = 0; l < timeArray.length; l++){
          minHour = hourDay + ":" + timeArray[l];
          for(let j = 0; j < this.data.length; j++){
            fullTime = this.data[j].Time;
            fullTime =  fullTime.slice(11, 16);
            if(fullTime == minHour){
              summedData[n].Value += Number(this.data[j].Value);
              summedData[n].Time = fullTime;
              summedData[n].Name = this.data[0].Name;
              summedData[n].ConvFactor = this.data[0].ConvFactor;
            }
          }
          n++;
        }
      }
      this.data = summedData;
      break;
      case TranslationType.ENERGY_DATA_02:
      break;
    }
    this.data = summedData;

    return this.data;
  }
  DataTranslator.prototype.sum15minsMonth = function(year, month){
    let summedData = [],
    nDays = new Date(year, month, 0).getDate(),
    day = "",
    nHours = 24,
    hour = "",
    subHourArray = ["00", "15", "30", "45"],
    nSubHourArray = subHourArray.length,
    n = 0;

    for(let i = 0; i < nDays; i++){
      if(i < 9){
        day = "0" + (i + 1);
      }
      else {
        day = (i + 1);
      }
      for(let j = 0; j < nHours; j++){
        if(j < 10){
          hour = "0" + j;
        }
        else {
          hour = j;
        }
        for(let k = 0; k < nSubHourArray; k++){
          summedData[n] = {
            Name: "",
            Time: day + "." + month + "." + year + " " + hour + ":" + subHourArray[k] + ":00",
            Phase: 0,
            Value: 0,
            ConvFactor: 1
          }
          n++;
        }
      }
    }
    for(let l = 0; l < summedData.length; l++){
      for(let m = 0; m < this.data.length; m++){
        if(this.data[m].Time == summedData[l].Time){
          summedData[l].Value += Number(this.data[m].Value);
          summedData[l].Name = this.data[0].Name;
          summedData[l].ConvFactor = this.data[0].ConvFactor;
        }
      }
    }

    this.data = summedData;

    return this.data;
  }
  DataTranslator.prototype.sum15minsBenDef = function(){
    let summedData = [],
    lastVal = "";

    summedData.push(this.data[0]);
    lastVal = this.data[0].Time;
    for(let i = 1; i < this.data.length; i++){
      if(this.data[i].Time === lastVal){
        summedData[summedData.length - 1].Value = Number(summedData[summedData.length - 1].Value) + Number(this.data[i].Value);
        summedData[summedData.length - 1].Name = this.data[0].Name;
        summedData[summedData.length - 1].ConvFactor = this.data[0].ConvFactor;
      }
      else {
        summedData.push(this.data[i]);
        lastVal = this.data[i].Time;
      }
    }

    this.data = summedData;

    return this.data;
  }
  DataTranslator.prototype.translate = function(divideBy){
    this.outData.name = this.data[0].Name;
    switch (this.translationType) {
      case TranslationType.ENERGY_DATA_01:
        for(let i = 0; i < this.data.length; i++){
          let val = 0;
          if(this.data[i].Value != 0){
            val = Math.round(this.data[i].Value / divideBy * this.data[i].ConvFactor * 100) / 100;
          }
          else {
            val = 0;
          }
          this.outData.push({
            name: this.data[i].Name,
            x: this.data[i].Time,
            y: val
          });
        }
        break;
      case TranslationType.ENERGY_DATA_02:
        for(let i = 0; i < this.data.length; i++){
          let val = 0;
          if(this.data[i].Value != 0){
            val = Math.round(this.data[i].Value / divideBy * this.data[i].ConvFactor * 100) / 100;
          }
          else {
            val = 0;
          }
          this.outData.push({
            name: this.data[i].Name,
            x: this.data[i].Time,
            y: val
          });
        }
        break;
      }

      return this.outData;
  }

  function getWeekday(year, month, day, mode){
    let weekDays = [];
    if(mode === "long"){
      weekDays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    }
    else {
      weekDays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    }
    return weekDays[new Date(year, month, day).getDay()];
  }
