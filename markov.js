// super mini markov chain library
window.Markov = class Markov {
    constructor(string) {
        this.strings = {
            beginning: [],
            ending: [],
            mappings: {}
        }

        if(Array.isArray(string)) this.addArray(string); else this.add(string);
    }

    addArray(strArray) {
        strArray.forEach(z => this.add(z))
    }

    add(str) {
        const string = str.trim()
        if(string.length == 0) {
            return false;
        }

        const words = string.split(" ")
        this.strings.beginning.push(words[0])
        this.strings.ending.push(words.at(-1))
        
        words.forEach((v,i,a) => {
            const nextWord = a[i+1]

            if(nextWord) {
                if(!this.strings.mappings[v]) 
                    this.strings.mappings[v] = []
                
                this.strings.mappings[v].push(nextWord)
            }
        })

        return true;
    }

    generate() {
        if(Object.values(this.strings.mappings).length == 0) {
            console.error("A generate call was executed while no mappings existed (did you forget a load() call?)")
            return false;
        }

        let word = this.#getRandomString(this.strings.beginning);
        let string = [word]
        
        while(this.strings.mappings.hasOwnProperty(word)) {
            word = this.#getRandomString(this.strings.mappings[word]);
            string.push(word);
        }

        return string.join(" ")

    }

    #getRandomString(array) {
        return array[Math.floor(array.length * Math.random())];
    }
}