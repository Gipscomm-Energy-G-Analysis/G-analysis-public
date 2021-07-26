"use strict"
// Distribution Configuration
//
// Testing Configuration

const scpCore =
Object
.freeze(
    new function () {
        this.split_ = a => a.split("");
        this.splt = this.split_;
        this.join_ = a => b => b.join(a);
        this.jn = this.join_;
        this.length_ = a => a.length;
        this.len = this.length_;
        this.trim_ = a => a.trim();
        this.trm = a => a.trim();
        this.id = a => a;
        this.flip = fn => a => b => fn(b)(a);
        this.first = a => b => a;
        this.second = a => b => b;
        this.apply = fn => a => fn(a);
        this.not = a => !a
        this.equal = a => b => a === b;
        this.equalsZero = a => a === 0;
        this.unequal = a => b => this.not(this.equal(a)(b));
        this.greater = a => b => a > b;
        this.greaterZero = this.flip(this.greater)(0);
        this.greaterOne = this.flip(this.greater)(1);
        this.smaller = this.flip(this.greater);
        this.applyRv = this.flip(this.apply);
        this.compose = fn => gn => a => fn(gn(a));
        this.singleton = a => [].concat([a]);
        this.isSingleton = a => equal(a.length)(1);
        this.array = n => m => (x = this.singleton(m)) => this.greater(n)(1) ? x.concat(this.array(n - 1)(m)(this.singleton(m))) : x;
        this.head = arr => arr[0];
        this.arrayFrom = a => a.split(",").map(this.trim_);
        this.isDefined = a => this.not(this.equal(a, null) || this.equal(a, undefined) || this.equal(a, ""));
        this.tail = arr => arr.slice(1);
        this.last = arr => arr[arr.length - 1];
        this.flatten = arr => arr.reduce((acc, val) => acc.concat(val), []);
        this.altFuse = arr1 => arr2 => this.flatten(arr1.map((x, i) => (i <= arr2.length - 1) ? [x, arr2[i]] : x));
        this.incr = a => Number(a) + 1,
        this.decr = a => a - 1,
        this.sum = (a, b, castNum = false) => castNum ? Number(a) + Number(b) : a + b;
        this.subtract = (a, b, castNum = false) => castNum ? Number(a) - Number(b) : a - b;
        this.devide = (a, b) => a / b;
        this.multiply = (a, b) => a * b;
        this.round = a => b => Math.round(a * Math.pow(10, b)) / Math.pow(10, b);
        this.roundWithZeros = val => digits => String(this.round(val)(digits)) .split(".") .length === 2 ? this.round(val)(digits) + "0" .repeat(this.subtract(digits, String(this.round(val)(digits)).split(".")[1].length) ) : val;
        this.doOperation = op => a => b => {
            const val1 = Number(String(a) .replace(",", ".")), val2 = Number(String(b) .replace(",", "."));
            switch (op) {
                case "(": return this.opnPths(a, b); // opening parentheses
                break;
                case ")": return this.clsPths(a, b); // closing parentheses
                break;
                case "/": return this.devide(val1, val2);
                break;
                case "+": return this.sum(val1, val2);
                break;
                case "*": return this.multiply(val1, val2);
                break;
                case "-": return this.subtract(val1, val2);
                break;
                default: alert("doOperation(a, b) : \nAn invalid operator was found!")
            }};
        this.average = list => list.reduce(sum) / list.length;
        this.exclude = exclVals => val => exclVals.filter(this.equal(val)).length > 0;
        this.get = cdnFn => str => str.split(" ").filter(cdnFn);
        this.toObject = str => obj => replace(str)(["{", "}"]).split(",").map(split_(":")).forEach((x) => this.set(this.makeProperty(obj)(x[0])(x[1])));
        this.emptyString = str => this.equal(str)("");
        this.replace = str => (repl, wth = "") => repl.reduce((lastStr = str, x) => lastStr.replace(x, wth));
        this.makeRecord = a => new Object(a);
        this.addField = rec => prop => value => rec[prop] = value;
        this.field = obj => name => obj[name];
        this.decode = this.id;
        this.json = a => { try { JSON.parse(a); } catch (e) { return false; } return JSON.parse(a); };
        this.freeze = obj => Object.freeze(obj);
        this.exists = obj => prop => obj.hasOwnProperty(prop);
        this.deepFreeze = obj => { this.freeze(obj); Object.getOwnPropertyNames(obj).forEach(prop => {if (exists(obj)(prop) && obj[prop] !== null && (typeof obj[prop] === "object" || typeof obj[prop] === "function") && !Object.isFrozen(obj[prop])) {this.deepFreeze(obj[prop])}});return obj;};
        this.callAjax = type => url => data => {

            const filterRecord =
                record =>
                Object
                .values(record)
                .filter(a => this.emptyString(String(a)))
            , containsEmptyFields =
                record =>
                this.not( this.equalsZero( this.len( filterRecord ) ) )

            this.emptyString(url) ?
            () => {throw new Error("\n\nfpCore.ajaxPost : \n-->\nThe arg for 'url' contains an empty string instead of a server path !\n\n" )} :
            console.log() // console.log(`\n\nurl : ${url}\n\n`)

            containsEmptyFields(data) ?
            () => {throw new Error(`\n\nfpCore.ajaxPost : \n-->\n Record 'data', contains ${this.len(filterRecord)} empty string/s !\n-->\ndata : ${data}\n\n` )} :
            console.log() // console.log(`\n\ndata : ${data}\n\n`)

            return new Promise((resolve,reject)=>$.ajax({type,url,data,fail:()=>reject(()=>{throw new Error("Ajax Post failed!" )}),success:records=>{resolve(this.json(records))}}))
        };
        this.ajaxPost = this.callAjax("POST");
        this.ajaxGet = this.callAjax("GET");
        this.pipe = (...fns) => {
            results = [this.head(fns)]
            for(k=1;this.smaller(k)(fns.length);k++) {
                results = this.push(results)(fns[k](results[this.decr(k)]))
            }
            return results
        };
        this.itemSessionSet = key => value => sessionStorage.setItem(key, value);
        this.itemSessionGet = key => sessionStorage.getItem(key);
        this.push = a => b => { a[a.length] = b;return a };
        this.leftRight = fn => val => fn(val) ? { left : val } :  { right : val }
        this.partition =
            fn =>    
            acc =>
            arr => {
                
                let newAcc = acc

                if(arr.length > 0) {
        
                    const selected_ = this.leftRight(fn)(head(arr))
        
                    const newAcc =
                        exists(selected_)("left") ?
                        { unselected : acc.unselected, selected : push(acc.selected)(selected_.left) } :
                        { unselected : push(acc.unselected)(selected_.right), selected : acc.selected } 
                        
        
                    return partition(fn)(newAcc)(tail(arr))
                }
                else {
                    return newAcc
                }
            }
    }
);
const { split_
      , splt
      , join_
      , jn
      , length_
      , len
      , trim_
      , trm
      , id
      , first
      , second
      , apply
      , not
      , flip
      , equal
      , equalsZero
      , unequal
      , greater
      , greaterZero
      , greaterOne
      , smaller
      , applyRv
      , compose
      , singleton
      , isSingleton
      , array
      , head
      , arrayFrom
      , isDefined
      , tail
      , last
      , flatten
      , altFuse
      , incr
      , decr
      , sum
      , subtract
      , devide
      , multiply
      , round
      , roundWithZeros
      , doOperation
      , average
      , exclude
      , get
      , toObject
      , emptyString
      , replace
      , makeRecord
      , addField
      , field
      , decode
      , json
      , freeze
      , exists
      , deepFreeze
      , ajaxPost
      , ajaxGet
      , pipe
      , itemSessionSet
      , itemSessionGet
      , push
      , partition
      } = scpCore;
    // module.exports = scpCore;
