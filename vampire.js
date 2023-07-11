class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.creator = null;
    this.offspring = [];
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator =  this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let a = this.numberOfVampiresFromOriginal;
    let b = vampire.numberOfVampiresFromOriginal;
    if (a < b) {
      return true;
    }
    return this.creator === vampire.creator;
  }


  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    const rec = function (vampire) {
      let offsprings = vampire.offspring;  //array(multiple children)
      console.log(vampire);
      if (vampire.name === name) {
        return vampire;
      } else {
        for (let offspring of offsprings) {
          const returnedValue = rec(offspring);
          if (returnedValue) {
            return returnedValue;
          }
        }
      };
      return null;
    }
    return rec(this);
  }

  
  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 1;   //make sure count starts with 1 for current vampire
    let offsprings = this.offspring; //array
    for (let offspring of offsprings) {
      total++; // Count the current offspring
      total += offspring.totalDescendents;
    }
    return total - 1;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let results = [];
    let offsprings = this.offspring; //array
    for (let offspring of offsprings) {
      if (offspring.yearConverted > 1980) {
        console.log(offspring.yearConverted);
        results.push(offspring);
      }
      //We want to join the return value of recursive function too
      const offspringMillennialVampires = offspring.allMillennialVampires;
      results = results.concat(offspringMillennialVampires);
    }
    return results;
  }

  /** Tree traversal methods **/


  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    
  }
}

module.exports = Vampire;

