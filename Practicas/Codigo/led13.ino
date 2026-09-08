// Parpadeo del LED integrado (pin 13)
// El delay determina qué tan notorio es el efecto

const int LED = 13;

void setup() {
  pinMode(LED, OUTPUT);  // Configuramos el pin 13 como salida
}

void loop() {
  digitalWrite(LED, HIGH);  // Encendemos el LED
  delay(1000);              // Esperamos 1 segundo (1000 ms)

  digitalWrite(LED, LOW);   // Apagamos el LED
  delay(1000);              // Esperamos 1 segundo (1000 ms)
}
