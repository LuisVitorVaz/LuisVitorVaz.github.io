import serial
import time

# Configura a porta serial e a taxa de transmissão (deve ser a mesma definida no Arduino)
arduino = serial.Serial('COM6', 9600, timeout=1)  # Substitua 'COM6' pela porta correta do seu Arduino
time.sleep(2)  # Espera 2 segundos para garantir que a conexão serial esteja estabelecida

def send_date(date):
    arduino.write((date + '\n').encode())  # Envia a data para o Arduino


def read_response():
    response = arduino.readline().decode().strip()  # Lê a resposta do Arduino
    return response

print("Digite uma data no formato DD/MM/AAAA ou 'sair' para terminar:")

while True:
    # Lê a data do usuário
    date_to_send = input("Data: ")

    if date_to_send.lower() == 'sair':
        break

    send_date(date_to_send)

    while True:
        response = read_response()
        if response:
            print(response)  # Imprime a resposta do Arduino no terminal
            if "Digite uma nova data:" in response:
                break

# Fecha a conexão serial
arduino.close()
