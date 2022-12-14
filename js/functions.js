//defining stringchecking class
class StringChecker {
    constructor(){
        this.letterArray = [];
        this.guessString = "";
        this.toExclude = [];
        this.outputs = []; 
        this.filteredStrings = [];
    }
    setLetterArray(){
        this.letterArray = makeArray();
        console.log(this.letterArray)
    }

    setOutputs(){
        this.outputs = this.get7LetterStrings();
        // show this to me in UI
        const outputList = document.querySelector('#outputs');
        outputList.innerText = this.outputs.join(', ');
        const numResults = document.querySelector('#numResults');
        numResults.innerText = `${this.outputs.length} results!`;

        if (this.outputs) {
            document.querySelector('#guessContainer').classList.remove('hide');
        }
    }

    setGuess(){
        // clear previous
        this.guessString = "";

        console.log('setting a guess')
        if (guessBox.value !== "") this.guessString = guessBox.value; //a string value
        else console.log('no guesses made')
    }

    setExclude(){
        //clear previous
        this.toExclude = [];

        console.log('excluding...')
        if (remInput.value !== ""){ //otherwise, empty strings are converted into arrays with empty string at [0] and counted as having a length of 1.
            this.toExclude = remInput.value.split(',') //array to exclude
        } else {
            console.log('no exclusions added')
        }
    }

    setAndRunFilter(){
        this.setGuess();
        this.setExclude();

        this.guess(); //this sets filteredStrings

        //show this to me in UI
        const outputList = document.querySelector('#outputs');
        outputList.innerText = this.filteredStrings.join(', ')

        const numResults = document.querySelector('#numResults');
        numResults.innerText = `${this.filteredStrings.length} results!`;
    }

    get7LetterStrings(){
        let wordLength = 7 //where we will stop as maximum guess
        let bucket = []; 
        let subBucket = [];

        bucket = [...this.letterArray] //we will reassign values
        return buildStrings(this.letterArray, bucket, subBucket, wordLength, 1);

        // helper function called recursively as needed 
        function buildStrings(refArray, arr, subArray, length, index) {
            for (let k = 0; k < arr.length; k++) {
                //for each letter in the letter array, create and add substring to the sub array. 
                for (let m = 0; m < refArray.length; m++) {
                    let subString = `${arr[k]}${refArray[m]}`

                    //earlier filtering point: 
                    if (narrowDown(subString)) subArray.push(subString) 
                }
            }
            arr = [...subArray] //letters might repeat so we can't eliminate anything blindly
            subArray.length = 0; //reset the subbucket
        
            //check word length of substrings contained by the bucket. if not right, call buildStrings again
            if (arr[0].length < length) {
                return buildStrings(refArray, arr, subArray, length, ++index);
            }
            return arr
        }
    }
    guess(){
        //guessString is a fragment from viewing the letters to filter
        if (this.guessString==="") {
                if (!this.toExclude === []) {
                    console.log('no guess string or exclusions') //this never runs...
                    this.filteredStrings = this.outputs;
                } else if (this.toExclude[0] !== ""){
                    this.filteredStrings = this.outputs.filter(string => !(this.toExclude.some(ex => string.includes(ex))))
                }
        } else if (this.guessString && this.toExclude === []){
            console.log('filtering against ' + this.guessString)
            this.filteredStrings = this.outputs.filter(string => string.includes(this.guessString))
        } else if (this.guessString && this.toExclude[0] !== ""){
            console.log(`filtering against ${this.guessString} and excluding all containing ${this.toExclude.join(', ')}`)

            this.filteredStrings = this.outputs.filter(string => string.includes(this.guessString))
                                                .filter(string => !(this.toExclude.some(ex => string.includes(ex))))
        } 
    }
}


//create obj instance
const stringChecker = new StringChecker();

//dictionary url
const DICT_URL='https://api.dictionaryapi.dev/api/v2/entries/en'


//UI 
const inputForm = document.querySelector('#lettersOfDay')
inputForm.addEventListener('submit', e =>e.preventDefault())

const sendLetters = document.querySelector('#sendLetters')
sendLetters.addEventListener('click', function(){stringChecker.setLetterArray()})
const lettersInput = document.querySelector('#letters')

const generateStringsButton = document.querySelector('#generateStrings')
generateStringsButton.addEventListener('click', function(){stringChecker.setOutputs()})

const guessForm = document.querySelector('#guessTime')
guessForm.addEventListener('submit', e=> e.preventDefault())

const guessBox = document.querySelector('#guessInput')
const remInput = document.querySelector('#remInput')

const sendGuess = document.querySelector('#sendGuess')
sendGuess.addEventListener('click', function(){stringChecker.setAndRunFilter()}) 


//helpers
function makeArray(){
    if (!validateInput(lettersInput.value)){
        alert('Please submit a valid seven-lettered string with no spaces or repeated letters')
    } else {
        console.log('letters submitted!')
        if (stringChecker.letterArray) document.querySelector('#outputContainer').classList.remove('hide');

        return lettersInput.value.toLowerCase().split(''); //returns array of 7 lowercase letters
    }
}

function validateInput(str){
    let string = str.toLowerCase();
    return /^[a-zA-Z]+$/.test(string) && string.length === 7 && [...new Set(string.split(''))].length === 7
}

//cut down on bloat before chucking at a dictionary, to be expanded
function narrowDown(string){ 
    let arrCheck = string.split('')

    // combos that are unlikely in valid English words - could likely be added more programmatically
    // with partial credits to https://www.quora.com/What-consonant-combinations-do-not-appear-in-English-words - apparently looping over MacOS X. Some letters are also less likely to show up in Spelling Bee but included anyway.
    let unlikely = [
        'aa', 'jj', 'kk','qq','yy',
        'tk',
        'tlt','ctc','tct','tzt', 'mlm','nln','dld','czc',
        'dll','tll','ztt','nll',
        'aoi','uoi',
        'eei','aee','eea','oou','aoo',
        'bx', 'cj', 'cv', 'cx', 'dx', 'fq', 'fx', 'gq', 'gx', 'hx', 'jc', 'jf', 'jg', 'jq', 'js', 'jv', 'jx', 'jz', 'kq', 'kx', 'mx', 'px', 'pz', 'qb', 'qc', 'qd', 'qf', 'qg', 'qh', 'qj', 'qk', 'ql', 'qm', 'qn', 'qp', 'qs', 'qt', 'qv', 'qx', 'qz', 'sx', 'vb', 'vf', 'vh', 'vj', 'vm', 'vp', 'vq', 'vt', 'vx', 'xj', 'xx', 'zj', 'zq', 'zx'
    ]
    
    for (let i=0; i< arrCheck.length; i++){
        // if same letter is repeated three times in a row, likely a invalid word
        let rep = arrCheck[i].repeat(3) 
        if (string.includes(rep)) return false;
    }

    return true && !unlikely.some(ex => string.includes(ex))
}


//API CALL https://dictionaryapi.dev/
// not currently implemented above
//NOT foolproof as: a pangram can exceed 7 letters and not include all required letters within the first 7 either.
async function inDictionary(str){
    try{
        const response = await fetch(`${DICT_URL}/${str}`)
        const data = await response.json()
        return data[0].word === str   //returns a boolean. if word, returns true
        //false would receive a json with the keys 
            //title, message, resolution
            //title = "No Definitions Found"
    }catch(error){
        console.log(error)
    }
}

/******************************** */
//to be continued:
//validation logic
// maxes out at 2500 calls/day: https://www.wordsapi.com/ 
// free api: https://dictionaryapi.dev/


// example set:
// [ 'o','n','i','r','d','l','a']
//btw "ordinal" and "doornail" would be the pangrams
// try these exclusions: ooi,aai,nr,nird,dla,dlr,rld,rlod,oido,rii,nra,rnr,iod


/*==================THE VERSION WITH https://dictionaryapi.dev/ =============*/
//with annotations
/*
function get7LetterStrings(letterArray) {
   //...
      return arr.filter(string => narrowDown(string)) //reduce req number slightly
                .filter(string => inDictionary(string))
    }
  }
*/