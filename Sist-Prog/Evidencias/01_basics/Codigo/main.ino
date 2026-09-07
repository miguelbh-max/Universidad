/*
 * Proyecto: Parpadeo del LED integrado (Pin 13)
 * Placa: Arduino Uno R3
 */

const int ledPin = 13;


void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH); // Enciende el LED
  delay(1000);               // Espera 1000 milisegundos (1 segundo)
  digitalWrite(ledPin, LOW);  // Apaga el LED
  delay(1000);               // Espera 1 segundo
}
