var playerName = window.prompt("What is your robot's name");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName){
    while(enemyHealth > 0 && playerHealth > 0){
        // ask player if they would like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        // if player chooese to "skip" confirm and then stop the loop
        if(promptFight === "SKIP" || promptFight === "skip"){
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            
            // if yes (true), leave fight
            if(confirmSkip){
                window.alert(playerName + " has decided to skip this fight. Goodbye");
                // subtract money from playerMoney for skipping the round.
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney);
                break;
            }
        }
        
        // generate a random damage value based on player's attack power
        var damage = randomNumber(playerAttack - 3, playerAttack);

        //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
        enemyHealth = Math.max(0 , enemyHealth - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
        
        // check enemy's health
        if(enemyHealth <= 0){
            window.alert(enemyName + " has died!");

            // award player money for winning
            playerMoney = playerMoney + 20;

            // leave while loop since player is dead
            break;
        }else{
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
    
        var damage = randomNumber(enemyAttack - 3, enemyAttack);
        // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
        playerHealth = Math.max(0, playerHealth - damage);
        
        // Log a resulting message to the console so we know that it worked.
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

        // check player's health 
        if(playerHealth <= 0){
            window.alert(playerName + " has died!");
            // leave loop is player is dead
            break;
        }else{
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};

// function to start game
var startGame = function(){
    // reset player stats 
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    for(var i = 0; i < enemyNames.length; i++){
        if (playerHealth >0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robort Gladiators! Round" + (i + 1));
            
            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];
    
            // reset enemyHealth before starting new fight
            enemyHealth = randomNumber(40, 60);
            console.log(enemyHealth);
    
            // use debugger to pasue scrip from running and check what's going on at that moment in the code
            // debugger;
            
            // passs the pickedEnemyName variable's value into the fight function where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);
            
            // if we are not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1){
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
    if (playerHealth > 0) {
        window.alert("Great job, you survived the game! You now have a score of score of " + playerHealth + ".");
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
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
        );
    
    // use switch to carry out functions
    switch (shopOptionPrompt){
        case "REFILL":
        case "refill":
            if (playerMoney >= 7){
                window.alert("Refilling player's health by 20 for 7 dollars.");
    
                // increase player health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else{
                window.alert("You don't have enought money")
            }

            break;
        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7){
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // increase player attach and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enought money")
            }
            break;
        case "LEAVE":
        case "leave":
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

var randomNumber = function(min, max){
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
}

startGame();
// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

