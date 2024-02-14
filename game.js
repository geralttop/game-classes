'use strict'

const inp = document.querySelector('input');
const btn = document.querySelector('button');
const actionText = document.querySelector('.actions');
const text_value = document.querySelectorAll('.text_value');
const value = document.querySelectorAll('.value');

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
        let damage = Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1) + this.minDamage)
        let crit = Math.random().toFixed(2) < this.critChance ? true : false;

        if (crit) {
            damage = Math.floor(damage * this.multiplierCritDamage)
            target.armor -= damage;
            actionText.innerHTML += '<br>Критический удар!'
        }
        else target.armor -= damage;

        if (target.armor < 0) {
            target.health += target.armor;
            target.armor = 0;
        }
        actionText.innerHTML += `<br>${this.name} нанес ${damage} урона ${target.name}`;
    }

    ///increase max health
    increaseMaxHealth() {
        if (this.balance >= this.priceIncreaseMaxHealth) {
            this.balance -= this.priceIncreaseMaxHealth;
            this.priceIncreaseMaxHealth = Math.floor(this.priceIncreaseMaxHealth * 1.5);
            this.maxHealth += 10;
            this.health = Math.floor((this.maxHealth - this.health) * 0.2 + this.health);
            actionText.innerHTML += `<br>${this.name} увеличино максимальное здоровье на 10`;
        }
        else {
            actionText.innerHTML += `<br>Недостаточно денег у ${this.name}`;
        }
    }

    //Health regeneration to maximum health
    regen(target) {
        if (this.balance >= Math.floor((this.maxHealth - this.health) * this.priceRegen)) {
            actionText.innerHTML += `<br>${this.name} восстановил ${this.maxHealth - this.health}`;
            this.balance -= Math.floor((this.maxHealth - this.health) * this.priceRegen);
            if (this.health != this.maxHealth) {
                this.priceRegen = (this.priceRegen * 1.3).toFixed(2);
                target.priceRegen = (target.priceRegen * 1.3).toFixed(2);
            }
            this.health = this.maxHealth;

        }
        else {
            actionText.innerHTML += `<br>Недостаточно денег у ${this.name}`;
        }
    }

    //increase max armor
    increaseMaxArmor() {
        if (this.balance >= this.priceIncreaseMaxArmor) {
            this.balance -= this.priceIncreaseMaxArmor;
            this.priceIncreaseMaxArmor = Math.floor(this.priceIncreaseMaxArmor * 2);
            this.maxArmor += 10;
            actionText.innerHTML += `<br>${this.name} увеличино максимальное броян на 10`;
        }
        else {
            actionText.innerHTML += `<br>Недостаточно денег у ${this.name}`;
        }
    }

    //increase armor regeneration
    increaseRegenArmor() {
        if (this.balance >= this.priceIncreaseArmorRegenPerMove) {
            this.balance -= this.priceIncreaseArmorRegenPerMove;
            this.priceIncreaseArmorRegenPerMove = Math.floor(this.priceIncreaseArmorRegenPerMove * 2);
            this.regenArmor += 5;
            actionText.innerHTML += `<br>${this.name} увеличино реген брони на 5`;
        }
        else {
            actionText.innerHTML += `<br>Недостаточно денег у ${this.name}`;
        }
    }

    //increase min damage
    increaseMinDamage() {
        if (this.minDamage + 5 <= this.maxDamage && this.balance >= this.priceIncreaseMinDamage) {
            this.balance -= this.priceIncreaseMinDamage;
            this.priceIncreaseMinDamage = Math.floor(this.priceIncreaseMinDamage * 1.5);
            this.minDamage += 5;
            actionText.innerHTML += `<br>${this.name} увеличил минимальный урон на 5`;
        }
        else {
            actionText.innerHTML += `<br>Недостаточно денег у ${this.name} или Минимальный урон уже равен максимальному`;
        }
    }

    //increase max damage
    increaseMaxDamage() {
        if (this.balance >= this.priceIncreaseMaxDamage) {
            this.balance -= this.priceIncreaseMaxDamage;
            this.priceIncreaseMaxDamage = Math.floor(this.priceIncreaseMaxDamage * 1.5);
            this.maxDamage += 5;
            actionText.innerHTML += `<br>${this.name} увеличил максимальный урон на 5`;
        }
        else {
            actionText.innerHTML += `<br>Недостаточно денег у ${this.name}`;
        }
    }

    //increasing income
    increaseIncome() {
        if (this.balance >= this.priceIncreaseIncome) {
            this.balance -= this.priceIncreaseIncome;
            this.priceIncreaseIncome = Math.floor(this.priceIncreaseIncome * 1.5);
            this.income += 20;
            actionText.innerHTML += `<br>${this.name} увеличил доход на 20`;
        }
        else {
            actionText.innerHTML += `<br>Недостаточно денег у ${this.name}`;
        }
    }

    increaseMultiplierCritDamage() {
        if (this.balance >= this.priceIncreaseMultiplierCritDamage) {
            this.balance -= this.priceIncreaseMultiplierCritDamage;
            this.priceIncreaseMultiplierCritDamage = Math.floor(this.priceIncreaseMultiplierCritDamage * 2);
            this.multiplierCritDamage = Math.floor(this.multiplierCritDamage + 0.2);
            actionText.innerHTML += `<br>${this.name} увеличил множитель на 0.2`;
        }
        else {
            actionText.innerHTML += `<br>Недостаточно денег у ${this.name}`;
        }
    }

    increaseCritChance() {
        if (this.balance >= this.priceIncreaseCritChance && this.critChance < 0.25) {
            this.balance -= this.priceIncreaseCritChance;
            this.priceIncreaseCritChance = Math.floor(this.priceIncreaseCritChance * 2);
            this.critChance = (this.critChance + 0.05).toFixed(2);
            actionText.innerHTML += `<br>${this.name} увеличил шанс крита на 0.05`;
        }
        else {
            actionText += `<br>Недостаточно денег или достигнут максимальный шанс ${this.name}`;
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
        text_value[turn].innerHTML = `
        <p class='text_value'>${this.name}<br>
        Максимальное здоровье:<br>
        Здоровье:<br>Броня:<br>
        Максимальная броня:<br>
        Восстановление брони за ход:<br>
        Максимальный урон:<br>Минимальный урон:<br>
        Баланас:<br>
        Доход:<br>
        Множитель критического урона:<br>
        Шанс критического урона:<br>
        Стоимость увеличения дохода:<br>
        Стоимость 1 хп:<br>
        Стоимость увеличения мин. урона:<br>
        Стоимость увеличения макс. урона:<br>
        Стоимость увеличения здоровья:<br>
        Стоимость увеличения реген брони:<br>
        Стоимость увеличения макс брони:<br>
        Стоимость увелич множителя крита:<br>
        Стоимость увеличения шанса:</p>`;

        value[turn].innerHTML = `<br>`;
        for (let i in users[turn]) {
            value[turn].innerHTML += `<br>${users[turn][i]}`;
        }
        console.log(turn);
    }
}


let flag = confirm('Начать игру (чтобы видеть события игры откройте консоль браузера(нажмите f12 на клавиатуре))'); //flag to start game
let countOfPlayers;
let users = []
if (flag) {

    countOfPlayers = +prompt('1 или 2 человек играет. Если 1, то второй игрок будет ботом')
    //player generation
    let user1 = new User(prompt('Введите имя первого игрока'));
    let user2 = new User(prompt('Введите имя второго игрока'));

    users = [user1, user2];

    alert('Чтобы прокачать ваши показатели, вы обращаетесь к Богу и платите ему деньги. И Бог очень не любит, когда его лишний раз беспокоят. Поэтому, если вы не можете прокачать, потому что у вас нет денег или потому что вы нарушите законы физики, и все равно обращаетесь к Богу, он вас накажет. Наказание заключается в том, что он вам ничего не прокочает и ход перейдет к другому игроку.')

}


let bot;
if (countOfPlayers == 1) bot = true;
//Game cycle
let turn = 0;

document.querySelector('.rules').innerHTML = `  Выберите действие (напишите номер действия)<br>
                                                1.  Атаковать <br>
                                                2.  Регенерация здоровья <br>
                                                3.  Увеличить доход<br>
                                                4.  Увеличить мин. урон на 5<br>
                                                5.  Увеличить макс. урон на 5<br>
                                                6.  Увеличить макс здоровье на 10<br>
                                                7.  Увеличить реген брони на 5<br>
                                                8.  Увеличить макс броню на 10<br>
                                                9.  Увеличить множитель крита на 0.2<br>
                                                0. Увеличить шанс крита на 0.05`
//TODO 
function nextTurn() {
    if (users[turn].health < 0) {
        alert(`${users[Math.abs(turn - 1)].name} Победил`);
    }

    document.querySelector('.ktohodit').innerHTML = `Ходит ${users[Math.abs(turn - 1)].name}`
    //user choose action
    let action;
    if (bot && turn == 1) {
        action = Math.floor(Math.random() * (9 - 0 + 1) + 0)
    }
    else {
        action = inp.value;
    };
    //action is doing
    switch (+action) {
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
        case 73:
            flag = false;
            break;
        default:
            actionText.innerHTML += "<br>Нет такого действия. Бог вас прощает, но его терпение не вечно";
    }

    users[turn].incomePerMove()
    users[turn].armorPerMove()

    users[turn].info();
    turn == 1 ? turn = 0 : turn++;
    users[turn].info();
}