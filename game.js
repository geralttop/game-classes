class User {
    constructor(name) {
        this.name = name;
        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.maxDamage = 20;
        this.balance = 100;
        this.income = 10;
        this.priceIncreaseIncome = 40;
    }
    strike(target) {
        let damage = Math.floor(Math.random() * (this.maxDamage) + 1)
        target.health -= damage;
        console.log(`${this.name} нанес ${damage} урона ${target.name} \n Здоровье ${target.name}: ${target.health}`);
    }
    regen() {
        if (this.balance >= this.maxHealth - this.health){
            this.balance -= this.maxHealth - this.health;
            this.health = this.maxHealth;
        }
        else {
            console.log(`Недостаточно денег у ${this.name}`);
            turn == 1 ? turn = 0 : turn++;;
        }
    }
    increaseIncome() {
        if (this.balance >= this.priceIncreaseIncome){
            this.balance -= this.priceIncreaseIncome;
            this.priceIncreaseIncome = Math.floor(this.priceIncreaseIncome * 1.2);
            this.income += 20;
        }
        else {
            console.log(`Недостаточно денег у ${this.name}`);
            ;
        }
    }
    incomePerMove() {
        this.balance += this.income;
    }

    info() {
        console.log(`${this.name}
    Максимальное здоровье:       ${this.maxHealth}
    Здоровье:                    ${this.health}
    Максимальный урон:           ${this.maxDamage}
    Баланас:                     ${this.balance}
    Доход:                       ${this.income}
    Стоимость увеличения дохода: ${this.priceIncreaseIncome}`);
    }
}

let user1 = new User('Путин');
let user2 = new User('Зеленский');

let users = [user1, user2];
// user1.strike(user2);
// console.log(0/0);

let turn = 0;
let a = 0;
flag = confirm('Начать игру');
while (flag){
    users[turn].incomePerMove()
    action = prompt(`Ходит ${users[turn].name} \n Выберите действие (напишите номер действия)\n 1. Атаковать\n 2. Регенерация здоровья\n 3. Увеличить доход`)
    switch(+action){
        case 1:
            users[turn].strike(users[Math.abs(turn - 1)]);
            break;
        case 2:
            users[turn].regen();
            break;
        case 3:
            users[turn].increaseIncome()
            break;
        default:
            flag = false;
            break;
    }
    users[turn].info();
    turn == 1 ? turn = 0 : turn++;
}





