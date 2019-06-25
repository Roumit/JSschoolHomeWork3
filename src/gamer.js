export var Gamer = function(name, vins=0, score=0) {
    this.name = name;
    this.vins = vins;
    this.score = score; 
  };
  
  Gamer.prototype.getScore = function() {
    return this.score;
  };
  Gamer.prototype.setScore = function(score) {
    return this.score += score;  //add new score to scores
  }; 
  Gamer.prototype.resetScore = function() {
    return this.score = 0;
  };