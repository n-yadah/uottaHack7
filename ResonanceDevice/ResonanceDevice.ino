/**
* Code for device that amplifies ambiant sounds through vibrations
* This iteration of the project uses a 5v relay as the vibration device
* and the XIAO_ESP32S3 devKit with a I2S microphone
*/
#include <arduinoFFT.h>
#include <ESP_I2S.h>

#define SAMPLES 256  
#define SAMPLING_FREQUENCY 40000 
#define VIBRATOR_PIN 1
#define INPUTAMPLITUDETHRESH 0.30

I2SClass I2S;
ArduinoFFT<double> FFT = ArduinoFFT<double>();

double vReal[SAMPLES];        // Real part of the signal
double vImag[SAMPLES];        // Imaginary part of the signal



void setup() {
  pinMode(VIBRATOR_PIN,OUTPUT);

  Serial.begin(115200);
  
  while(!Serial) {//Wait for serial connection
    ;
  }
  
  I2S.setPinsPdmRx(42, 41);

  if (!I2S.begin(I2S_MODE_PDM_RX, 16000, I2S_DATA_BIT_WIDTH_16BIT, I2S_SLOT_MODE_MONO)) {
    Serial.println("Failed to initialize I2S!");
    while (1); // do nothing
  }

}

void loop() {
    
    //Signal acquisition
    for (int i = 0; i < SAMPLES; i++) {
    double sample = I2S.read();
    if (sample && sample != -1 && sample != 1) {
      vReal[i] = (sample/6553.0)-0.5;
      vImag[i] = 0.0;
      delayMicroseconds(1000000 / SAMPLING_FREQUENCY);
    }
  }

  //Compute FFT
  FFT.windowing(vReal, SAMPLES, FFT_WIN_TYP_HAMMING, FFT_FORWARD); // Apply window function
  FFT.compute(vReal, vImag, SAMPLES, FFT_FORWARD);                // Compute FFT
  FFT.complexToMagnitude(vReal, vImag, SAMPLES); 

  //Signal processing: Finding frequency with highest amplitude.
  int maxFrequency=0;
  double maxFrequencyAmplitude=0;
  
  for(int i=2; i<(SAMPLES/2); i++){
    double frequency = i*(SAMPLING_FREQUENCY /SAMPLES);
    //Only considering frequencies within human hearing
    if(frequency>=20 && frequency<=20000){
      if(maxFrequencyAmplitude<=vReal[i]){
        maxFrequency=frequency;
        maxFrequencyAmplitude=vReal[i];
      }
    }
  }

  //Compute delay time between vibrating pulses
  //Using discontinuous function to give more contrast between high/low pitch noises.
  int blinkDelay;
  if(maxFrequency<3000){
    //Polynomial estimate of log function 
    blinkDelay = (int) (9E-14)*pow(maxFrequency,4) -(3E-9)*pow(maxFrequency,3) +4*pow(maxFrequency,2)-0.147*maxFrequency+230,05 ;
  }else{
    blinkDelay = (int) (-0.0029412*maxFrequency + 58.8236);
  }
  blinkDelay= constrain(blinkDelay,10,250);
  //Output the value if amplitude of source sound is significant.
  //Pulsing the vibrator
  if(maxFrequencyAmplitude >INPUTAMPLITUDETHRESH){
    digitalWrite(VIBRATOR_PIN, HIGH);
    delay(blinkDelay / 2); 
    digitalWrite(VIBRATOR_PIN, LOW);
    delay(blinkDelay / 2); 
  }
}
