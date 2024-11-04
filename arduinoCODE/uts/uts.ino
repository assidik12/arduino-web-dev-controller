#include <LiquidCrystal_I2C.h>

const int led_yellow = 8;
const int led_red =10;

const int col = 16; 
const int row = 2; 
LiquidCrystal_I2C lcd(0x27, col, row);


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(led_yellow, OUTPUT);  //inisiasi setup led kuning
  pinMode(led_red, OUTPUT);  //inisiasi setup OUPUT led merah
  pinMode(A3, INPUT);  //inisiasi sensor cahaya

  lcd.init();
  lcd.backlight();

  lcd.setCursor(0, 1);
  lcd.print("ahmad sofi sidik");  

  digitalWrite(led_red, HIGH);
  digitalWrite(led_yellow, HIGH);
}

void siwtch_led(int speed){
  digitalWrite(led_red, HIGH);
  delay(speed);
  digitalWrite(led_red, LOW);
  delay(speed);
  digitalWrite(led_yellow, HIGH);
  delay(speed);
  digitalWrite(led_yellow, LOW);
}

void displayWeb(char data){
  if(!data) Serial.end();

  if(data == '1'){
    digitalWrite(led_red, HIGH);
    digitalWrite(led_yellow, HIGH);
  }

  if(data == '0'){
    digitalWrite(led_red, LOW);
    digitalWrite(led_yellow, LOW);
    }
}

void displayLcd(int sensor){
  if(sensor < 50) {
  siwtch_led(500);
  lcd.setCursor(0, 0);
  lcd.print("waktu sudah malam");
  }else {
  lcd.setCursor(0, 0);
  lcd.print("waktu sudah pagi");
  }
  delay(500); 
}


void loop() {
  // put your main code here, to run repeatedly:
  int sensor = analogRead(A3);
  
  if(Serial.available() > 0){
    char data = Serial.read();
    displayWeb(data);
  }else {
    displayLcd(sensor);
  
  }

}
 