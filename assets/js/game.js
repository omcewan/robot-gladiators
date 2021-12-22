// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
};

var fightOrSkip = function() {
     // ask player if they would like to fight or run
     var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
     
     if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
     }
     
     promptFight = promptFight.toLowerCase();

     // if player chooese to "skip" confirm and then stop the loop
     if(promptFight === "skip"){
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        if(confirmSkip){
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye");
            // subtract money from playerInfo.money for skipping the round.
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            return true;
        }
    }
    return false;
}
// fight function (now with parameter for enemy's object holding name, health, and attack values)
var fight = function(enemy){
    while(enemy.health > 0 && playerInfo.health > 0){
        // ask player if they would like to fight or run using fightOrSkip function
        if (fightOrSkip()){
            break;
        }
        
        // generate a random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        //Subtract the value of `playerInfo.attack` from the value of `enemy.health` and use that result to update the value in the `enemy.health` variable
        enemy.health = Math.max(0 , enemy.health - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
        
        // check enemy's health
        if(enemy.health <= 0){
            window.alert(enemy.name + " has died!");

            // award player money for winning
            playerInfo.money = playerInfo.money + 20;

            // leave while loop since player is dead
            break;
        }else{
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
    
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        
        // Log a resulting message to the console so we know that it worked.
        console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

        // check player's health 
        if(playerInfo.health <= 0){
            window.alert(playerInfo.name + " has died!");
            // leave loop is player is dead
            break;
        }else{
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};

// function to start game
var startGame = function(){
    // reset player stats 
    playerInfo.reset();
    
    for(var i = 0; i < enemyInfo.length; i++){
        if (playerInfo.health >0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robort Gladiators! Round" + (i + 1));
            
            // pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];
    
            // reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
    
            // passs the pickedenemy.name variable's value into the fight function where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);
            
            // if we are not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1){
                // ask if the player wants to use the store before the next round
                var storeConfirm = window.confirm("The fight is over. Visit the store before the next round?");

                // if yes take them to the store.
                if (storeConfirm){
                    shop();
                }
            };

        }else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    // after the game ends the player is either out of health or enemies to fight, so run the end game function
    endGame();
}

// function to end the game entirely
var endGame = function(){
    window.alert("The game has ended. Let's see how you did!");
    // if the player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle!");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm){
        // start the game over
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

var shop = function (){
    var shopOptionPrompt = window.prompt(
        "Would you like to refill your health, upgrade your attack or leave the store? Please enter one: 1 to refill, 2 to upgrade, or 3 to leave."
        );
    shopOptionPrompt = parseInt(shopOptionPrompt);
    // use switch to carry out functions
    switch (shopOptionPrompt){
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            // you did nothing so you will leave the store
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            // you did not pick an option. call shop() again to start the process over again
            shop();
            break;
    }
}
// End game functions

// Game information/varialbles

//  Player information
var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
       name =  window.prompt("What is your robots name?")
    }
}
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function(){
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function(){
        if (this.health >= 7){
            window.alert("Refilling the player's health by 20 for 7 dollars.")
            this.health += 20;
            this.money -= 7;
        }
        else{
            window.alert("You don't have enought money!")
        }
    },
    upgradeAttack: function(){
        if (this.money >= 7){
            window.alert("Refilling the player'a hwalth by 6 for 7 dollars.")
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
};

var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14),
    },
    {
        name:"Robo Trumble",
        attack: randomNumber(10, 14),
    },
];

startGame();
// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

