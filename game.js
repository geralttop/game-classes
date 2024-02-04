class User {
    constructor(name) {
        this.name = name;
        
        //User metrics
        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.maxArmor = 50;
        this.armor = this.maxArmor;
        this.regenArmor = 5;
        this.maxDamage = 20;
        this.minDamage = 10;
        this.balance = 100;
        this.income = 10;
        this.multiplierCritDamage = 1.4;
        this.critChance = 0.05;

        //The cost of pumping up user metrics
        this.priceIncreaseMaxHealth = 20;
        this.priceRegen = 1;
        this.priceIncreaseMaxArmor = 50;
        this.priceIncreaseArmorRegenPerMove = 50;
        this.priceIncreaseMinDamage = 25;
        this.priceIncreaseMaxDamage = 25;
        this.priceIncreaseIncome = 40;
        this.priceIncreaseMultiplierCritDamage = 100;//2
        this.priceIncreaseCritChance = 100;//2
    }

    //user beats up another user
    strike(target) {
        let damage = Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1)  + this.minDamage)
        let crit = Math.random().toFixed(2) < this.critChance ? true : false; 

        if (crit) {
            damage = Math.floor(damage * this.multiplierCritDamage)
            target.armor -= damage;
            console.log('Критический удар!');
        }
        else target.armor -= damage;

        if (target.armor < 0) {
            target.health += target.armor;
            target.armor = 0;
        }
        console.log(`${this.name} нанес ${damage} урона ${target.name}`);
    }

    ///increase max health
    increaseMaxHealth() {
        if (this.balance >= this.priceIncreaseMaxHealth){
            this.balance -= this.priceIncreaseMaxHealth;
            this.priceIncreaseMaxHealth = Math.floor(this.priceIncreaseMaxHealth * 1.5);
            this.maxHealth += 10;
            this.health = ((this.maxHealth - this.health) * 0.2 + this.health).toFixed(2);
            console.log(`${this.name} увеличино максимальное здоровье на 10`);
        }
        else {
            console.log(`Недостаточно денег у ${this.name}`);
        }
    }

    //Health regeneration to maximum health
    regen(target) {
        if (this.balance >= Math.floor((this.maxHealth - this.health)*this.priceRegen)){
            console.log(`${this.name} восстановил ${this.maxHealth - this.health}`);
            this.balance -= Math.floor((this.maxHealth - this.health)*this.priceRegen);
            if (this.health != this.maxHealth) {
                this.priceRegen = (this.priceRegen*1.3).toFixed(2);
                target.priceRegen = (target.priceRegen*1.3).toFixed(2);
            }
            this.health = this.maxHealth;
            
        }
        else {
            console.log(`Недостаточно денег у ${this.name}`);
        }
    }

    //increase max armor
    increaseMaxArmor() {
        if (this.balance >= this.priceIncreaseMaxArmor){
            this.balance -= this.priceIncreaseMaxArmor;
            this.priceIncreaseMaxArmor = Math.floor(this.priceIncreaseMaxArmor * 2);
            this.maxArmor += 10;
            console.log(`${this.name} увеличино максимальное броян на 10`);
        }
        else {
            console.log(`Недостаточно денег у ${this.name}`);
        }
    }

    //increase armor regeneration
    increaseRegenArmor() {
        if (this.balance >= this.priceIncreaseArmorRegenPerMove){
            this.balance -= this.priceIncreaseArmorRegenPerMove;
            this.priceIncreaseArmorRegenPerMove = Math.floor(this.priceIncreaseArmorRegenPerMove * 2);
            this.regenArmor += 5;
            console.log(`${this.name} увеличино реген брони на 5`);
        }
        else {
            console.log(`Недостаточно денег у ${this.name}`);
        }
    }
    
    //increase min damage
    increaseMinDamage() {
        if (this.minDamage+5 <= this.maxDamage && this.balance >= this.priceIncreaseMinDamage){
            this.balance -= this.priceIncreaseMinDamage;
            this.priceIncreaseMinDamage = Math.floor(this.priceIncreaseMinDamage * 1.5);
            this.minDamage += 5;
            console.log(`${this.name} увеличил минимальный урон на 5`);
        }
        else {
            console.log(`Недостаточно денег у ${this.name} или Минимальный урон уже равен максимальному`);
        }
    }

    //increase max damage
    increaseMaxDamage() {
        if (this.balance >= this.priceIncreaseMaxDamage){
            this.balance -= this.priceIncreaseMaxDamage;
            this.priceIncreaseMaxDamage = Math.floor(this.priceIncreaseMaxDamage * 1.5);
            this.maxDamage += 5;
            console.log(`${this.name} увеличил максимальный урон на 5`);
        }
        else {
            console.log(`Недостаточно денег у ${this.name}`);
        }
    }

    //increasing income
    increaseIncome() {
        if (this.balance >= this.priceIncreaseIncome){
            this.balance -= this.priceIncreaseIncome;
            this.priceIncreaseIncome = Math.floor(this.priceIncreaseIncome * 1.5);
            this.income += 20;
            console.log(`${this.name} увеличил доход на 20`);
        }
        else {
            console.log(`Недостаточно денег у ${this.name}`);
        }
    }

    increaseMultiplierCritDamage() {
        if (this.balance >= this.priceIncreaseMultiplierCritDamage){
            this.balance -= this.priceIncreaseMultiplierCritDamage;
            this.priceIncreaseMultiplierCritDamage = Math.floor(this.priceIncreaseMultiplierCritDamage * 2);
            this.multiplierCritDamage += 0.2;
            console.log(`${this.name} увеличил множитель на 0.2`);
        }
        else {
            console.log(`Недостаточно денег у ${this.name}`);
        }
    }

    increaseCritChance() {
        if (this.balance >= this.priceIncreaseCritChance && this.critChance < 0.25){
            this.balance -= this.priceIncreaseCritChance;
            this.priceIncreaseCritChance = Math.floor(this.priceIncreaseCritChance * 2);
            this.critChance += 0.05;
            console.log(`${this.name} увеличил шанс крита на 0.05`);
        }
        else {
            console.log(`Недостаточно денег или достигнут максимальный шанс ${this.name}`);
        }
    }
    incomePerMove() {
        this.balance += this.income;
    }

    armorPerMove() {
        this.armor += this.regenArmor;
        if (this.armor > this.maxArmor) this.armor = this.maxArmor;
    }

    info() {
        console.log(`${this.name}
    Максимальное здоровье:            ${this.maxHealth}
    Здоровье:                         ${this.health}
    Броня:                            ${this.armor}
    Максимальная броня:               ${this.maxArmor}
    Восстановление брони за ход:      ${this.regenArmor}
    Максимальный урон:                ${this.maxDamage}
    Минимальный урон:                 ${this.minDamage}
    Баланас:                          ${this.balance}
    Доход:                            ${this.income}
    Множитель критического урона      ${this.multiplierCritDamage}
    Шанс критического урона           ${this.critChance}

    Стоимость увеличения дохода:      ${this.priceIncreaseIncome}
    Стоимость 1 хп:                   ${this.priceRegen}
    Стоимость увеличения мин. урона:  ${this.priceIncreaseMinDamage}
    Стоимость увеличения макс. урона: ${this.priceIncreaseMaxDamage}
    Стоимость увеличения здоровья:    ${this.priceIncreaseMaxHealth}
    Стоимость увеличения реген брони: ${this.priceIncreaseArmorRegenPerMove}
    Стоимость увеличения макс брони:  ${this.priceIncreaseMaxArmor}
    Стоимость увелич множителя крита: ${this.priceIncreaseMultiplierCritDamage}
    Стоимость увеличения шанса:       ${this.priceIncreaseCritChance}`);
    }
}

alert('Из-за особенностей работы хромиума, чтобы игра заработала в окне "Начать игру" нажимаете отмена, потом обновляете страницу и теперь в окне "Начать игру" нажимаете "Ок". Если вы пользуетесь горящей лисой, то эти манипуляции можно не совершать, можете сразу начинать игру. \n Игра рассчитана на двоих человек. Приятной игры!')
flag = confirm('Начать игру (чтобы видеть события игры откройте консоль браузера(нажмите f12 на клавиатуре))'); //flag to start game
flag == false ? location.reload() : true;

let users = []
if (flag){
    let countOfPlayers = +prompt('1 или 2 человек играет. Если 1, то второй игрок будет ботом')

    // if (countOfPlayers == 1 || countOfPlayers == 2);
    // else flag == false;
    //player generation
    let user1 = new User(prompt('Введите имя первого игрока'));
    let user2 = new User(prompt('Введите имя второго игрока'));
    users = [user1, user2];
    
    alert('Чтобы прокачать ваши показатели, вы обращаетесь к Богу и платите ему деньги. И Бог очень не любит, когда его лишний раз беспокоят. Поэтому, если вы не можете прокачать, потому что у вас нет денег или потому что вы нарушите законы физики, и все равно обращаетесь к Богу, он вас накажет. Наказание заключается в том, что он вам ничего не прокочает и ход перейдет к другому игроку.')
    
}

//Game cycle
let turn = 0;
while (flag){
    //game over
    if (users[turn].health < 0){
        alert(`${users[Math.abs(turn - 1)].name} Победил`);
        break;
    }

    users[turn].info();
    
    //user choose action
    action = prompt(`Ходит ${users[turn].name}
    Выберите действие (напишите номер действия)
    1.  Атаковать
    2.  Регенерация здоровья
    3.  Увеличить доход
    4.  Увеличить мин. урон на 5
    5.  Увеличить макс. урон на 5
    6.  Увеличить макс здоровье на 10
    7.  Увеличить реген брони на 5
    8.  Увеличить макс броню на 10
    9.  Увеличить множитель крита на 0.2
    0. Увеличить шанс крита на 0.05`)

    //action is doing
    switch(+action){
        case 1:
            users[turn].strike(users[Math.abs(turn - 1)]);
            break;
        case 2:
            users[turn].regen(users[Math.abs(turn - 1)]);
            break;
        case 3:
            users[turn].increaseIncome()
            break;
        case 4:
            users[turn].increaseMinDamage();
            break;
        case 5:
            users[turn].increaseMaxDamage();
            break;
        case 6:
            users[turn].increaseMaxHealth();
            break;
        case 7:
            users[turn].increaseRegenArmor();
            break;
        case 8:
            users[turn].increaseMaxArmor();
            break;
        case 9:
            users[turn].increaseMultiplierCritDamage();
            break;
        case 0:
            users[turn].increaseCritChance();
            break;
        default:
            // alert('Вы побеспокоили бога без какой либо цели, поэтому он вас убил')
            // alert(`${users[Math.abs(turn - 1)].name} Победил`);
            // flag = false;
            break;
    }
    
    users[turn].incomePerMove()
    users[turn].armorPerMove()

    turn == 1 ? turn = 0 : turn++; //The turn passes to the next player
}



// console.log(Math.random().toFixed(2));


